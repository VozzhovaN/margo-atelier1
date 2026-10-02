import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  createAdminToken,
  isAdminPasswordConfigured,
  verifyAdminPassword,
} from '../../lib/admin-auth';
import { clientIpFromHeaders, consumeRateLimit } from '../../lib/rate-limit';

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const ip = clientIpFromHeaders(req.headers as Record<string, string | string[] | undefined>);
    const limit = consumeRateLimit(`admin-login:${ip}`, 8, 15 * 60 * 1000);
    if (!limit.allowed) {
      res.setHeader('Retry-After', String(limit.retryAfterSec));
      return res.status(429).json({ error: 'Too many login attempts. Try again later.' });
    }

    if (!isAdminPasswordConfigured()) {
      return res.status(503).json({
        error: 'Admin password is not configured. Set ADMIN_PASSWORD in environment.',
      });
    }

    let passwordRaw: unknown = '';
    if (typeof req.body === 'object' && req.body) {
      passwordRaw = (req.body as { password?: unknown }).password;
    } else if (typeof req.body === 'string') {
      try {
        passwordRaw = (JSON.parse(req.body) as { password?: unknown }).password;
      } catch {
        passwordRaw = '';
      }
    }

    if (!verifyAdminPassword(String(passwordRaw || ''))) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    return res.status(200).json({
      success: true,
      token: createAdminToken(),
      expiresInDays: 90,
    });
  } catch (error: any) {
    console.error('[admin/login]', error?.message || error);
    return res.status(500).json({ error: 'Login failed' });
  }
}
