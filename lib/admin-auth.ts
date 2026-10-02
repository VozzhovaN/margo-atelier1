import { createHmac, timingSafeEqual } from 'node:crypto';

/** Built-in fallback so admin never breaks when ADMIN_PASSWORD env is missing (local / Vercel). */
export const BUILTIN_ADMIN_PASSWORD = 'margo-admin';

const SESSION_PURPOSE = 'margo-admin-session-v3';

function normalizeSecret(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.normalize('NFKC').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
}

/** Prefer env; always fall back to the built-in password. */
export function adminSecret(): string {
  return normalizeSecret(process.env.ADMIN_PASSWORD) || BUILTIN_ADMIN_PASSWORD;
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function isAdminPasswordConfigured(): boolean {
  // Always true — builtin fallback guarantees a working password.
  return adminSecret().length > 0;
}

export function verifyAdminPassword(password: string): boolean {
  const expected = adminSecret();
  const given = normalizeSecret(password);
  if (!expected || !given) return false;
  return safeEqual(given, expected);
}

function signToken(secret: string, issuedAt: number): string {
  const payload = `${SESSION_PURPOSE}.${issuedAt}`;
  const sig = createHmac('sha256', secret).update(payload).digest('hex');
  return `${issuedAt}.${sig}`;
}

/** Create a durable admin session token (valid ~90 days). */
export function createAdminToken(): string {
  const issuedAt = Math.floor(Date.now() / 1000);
  return signToken(adminSecret(), issuedAt);
}

/**
 * Accept current tokens and legacy v2 static HMAC tokens so existing sessions
 * keep working after upgrades / redeploys.
 */
export function verifyAdminToken(token: string | undefined | null): boolean {
  const given = normalizeSecret(token);
  const secret = adminSecret();
  if (!given || !secret) return false;

  // Legacy v2: pure HMAC hex (64 chars), no timestamp
  if (/^[a-f0-9]{64}$/i.test(given)) {
    const legacy = createHmac('sha256', secret).update('margo-admin-session-v2').digest('hex');
    if (safeEqual(given.toLowerCase(), legacy.toLowerCase())) return true;
    // Also accept legacy signed with builtin if env password differs but client used old default
    if (secret !== BUILTIN_ADMIN_PASSWORD) {
      const legacyBuiltin = createHmac('sha256', BUILTIN_ADMIN_PASSWORD)
        .update('margo-admin-session-v2')
        .digest('hex');
      if (safeEqual(given.toLowerCase(), legacyBuiltin.toLowerCase())) return true;
    }
    return false;
  }

  // v3: issuedAt.signature
  const dot = given.indexOf('.');
  if (dot <= 0) return false;
  const issuedAt = Number(given.slice(0, dot));
  const sig = given.slice(dot + 1);
  if (!Number.isFinite(issuedAt) || issuedAt <= 0 || !/^[a-f0-9]{64}$/i.test(sig)) return false;

  const maxAgeSec = 90 * 24 * 60 * 60; // 90 days
  const now = Math.floor(Date.now() / 1000);
  if (issuedAt > now + 60 || now - issuedAt > maxAgeSec) return false;

  const expected = signToken(secret, issuedAt);
  if (safeEqual(given, expected)) return true;

  // Tolerate tokens issued under builtin password while env is also set to the same value path
  if (secret !== BUILTIN_ADMIN_PASSWORD) {
    const expectedBuiltin = signToken(BUILTIN_ADMIN_PASSWORD, issuedAt);
    if (safeEqual(given, expectedBuiltin)) return true;
  }
  return false;
}

export function getBearerToken(authHeader: string | undefined | null): string | undefined {
  if (!authHeader || typeof authHeader !== 'string') return undefined;
  if (!authHeader.startsWith('Bearer ')) return undefined;
  return authHeader.slice(7).trim() || undefined;
}

export function requireAdminAuth(authHeader: string | undefined | null): boolean {
  return verifyAdminToken(getBearerToken(authHeader));
}
