import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Self-contained Vercel login handler.
 * Do not import from ../../lib here — parent-lib imports currently crash
 * this project's Vercel functions (FUNCTION_INVOCATION_FAILED).
 * Keep crypto/rules in sync with lib/admin-auth.ts + lib/rate-limit.ts.
 */

const SESSION_PURPOSE = 'margo-admin-session-v3';
const buckets = new Map<string, { count: number; resetAt: number }>();

function normalizeSecret(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.normalize('NFKC').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
}

function adminSecret(): string {
  const fromEnv = normalizeSecret(process.env.ADMIN_PASSWORD);
  if (fromEnv) return fromEnv;
  // Never use a hardcoded password on Vercel / production.
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') return '';
  return 'margo-admin';
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

function clientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim().slice(0, 64);
  }
  return 'unknown';
}

function consumeRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }
  if (existing.count >= limit) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }
  existing.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const limit = consumeRateLimit(`admin-login:${clientIp(req)}`, 20, 15 * 60 * 1000);
    if (!limit.allowed) {
      res.setHeader('Retry-After', String(limit.retryAfterSec));
      return res.status(429).json({ error: 'Too many login attempts. Try again later.' });
    }

    const secret = adminSecret();
    if (!secret) {
      return res.status(503).json({
        error: 'Admin password is not configured. Set ADMIN_PASSWORD in Vercel Environment Variables and redeploy.',
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

    const password = normalizeSecret(passwordRaw);
    if (!password || !safeEqual(password, secret)) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    return res.status(200).json({
      success: true,
      token: createAdminToken(secret),
      expiresInDays: 90,
    });
  } catch (error: any) {
    console.error('[admin/login]', error?.message || error);
    return res.status(500).json({ error: 'Login failed' });
  }
}
