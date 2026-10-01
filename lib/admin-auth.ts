import crypto from 'crypto';

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
  return crypto.timingSafeEqual(left, right);
}

export function isAdminPasswordConfigured(): boolean {
  return adminSecret().length > 0;
}

export function verifyAdminPassword(password: string): boolean {
  const expected = adminSecret();
  const given = normalizeSecret(password);
  if (!expected || !given) return false;
  return safeEqual(given, expected);
}

export function createAdminToken(): string {
  const secret = adminSecret();
  return crypto.createHmac('sha256', secret).update('margo-admin-session-v2').digest('hex');
}

export function verifyAdminToken(token: string | undefined | null): boolean {
  const given = normalizeSecret(token);
  const secret = adminSecret();
  if (!given || !secret) return false;
  return safeEqual(given, createAdminToken());
}

export function getBearerToken(authHeader: string | undefined | null): string | undefined {
  if (!authHeader || typeof authHeader !== 'string') return undefined;
  if (!authHeader.startsWith('Bearer ')) return undefined;
  return authHeader.slice(7).trim() || undefined;
}

export function requireAdminAuth(authHeader: string | undefined | null): boolean {
  return verifyAdminToken(getBearerToken(authHeader));
}
