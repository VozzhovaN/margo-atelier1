import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, timingSafeEqual } from 'node:crypto';

function normalizeSecret(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.normalize('NFKC').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
}

function adminSecret(): string {
  return normalizeSecret(process.env.ADMIN_PASSWORD);
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function createAdminToken(secret: string): string {
  return createHmac('sha256', secret).update('margo-admin-session-v2').digest('hex');
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const secret = adminSecret();
    if (!secret) {
      return res.status(503).json({
        error: 'Admin password is not configured. Set ADMIN_PASSWORD in environment.',
      });
    }

    const password = normalizeSecret(
      typeof req.body === 'object' && req.body
        ? (req.body as { password?: unknown }).password
        : ''
    );

    if (!password || !safeEqual(password, secret)) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    return res.status(200).json({
      success: true,
      token: createAdminToken(secret),
    });
  } catch (error: any) {
    console.error('[admin/login]', error?.message || error);
    return res.status(500).json({ error: 'Login failed' });
  }
}
