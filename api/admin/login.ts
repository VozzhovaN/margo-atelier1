import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, timingSafeEqual } from 'node:crypto';

/** Keep in sync with lib/admin-auth.ts (inlined so Vercel login never depends on broken imports). */
const BUILTIN_ADMIN_PASSWORD = 'margo-admin';
const SESSION_PURPOSE = 'margo-admin-session-v3';
const MAX_AGE_SEC = 90 * 24 * 60 * 60;

function normalizeSecret(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.normalize('NFKC').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
}

function adminSecret(): string {
  return normalizeSecret(process.env.ADMIN_PASSWORD) || BUILTIN_ADMIN_PASSWORD;
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function createAdminToken(secret: string): string {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = `${SESSION_PURPOSE}.${issuedAt}`;
  const sig = createHmac('sha256', secret).update(payload).digest('hex');
  return `${issuedAt}.${sig}`;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const secret = adminSecret();
    const password = normalizeSecret(
      typeof req.body === 'object' && req.body
        ? (req.body as { password?: unknown }).password
        : typeof req.body === 'string'
          ? (() => {
              try {
                return (JSON.parse(req.body) as { password?: unknown }).password;
              } catch {
                return '';
              }
            })()
          : ''
    );

    if (!password || !safeEqual(password, secret)) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    return res.status(200).json({
      success: true,
      token: createAdminToken(secret),
      expiresInDays: Math.floor(MAX_AGE_SEC / 86400),
    });
  } catch (error: any) {
    console.error('[admin/login]', error?.message || error);
    return res.status(500).json({ error: 'Login failed' });
  }
}
