import crypto from 'crypto';

export function isAdminPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD?.trim());
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (!expected || typeof password !== 'string' || !password) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createAdminToken(password: string): string {
  const secret = process.env.ADMIN_PASSWORD?.trim() || 'margo';
  return crypto.createHmac('sha256', secret).update(`margo-admin-v1:${password}`).digest('hex');
}

export function verifyAdminToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== 'string') return false;
  const secret = process.env.ADMIN_PASSWORD?.trim();
  if (!secret) return false;
  const expected = createAdminToken(secret);
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function getBearerToken(authHeader: string | undefined | null): string | undefined {
  if (!authHeader || typeof authHeader !== 'string') return undefined;
  if (!authHeader.startsWith('Bearer ')) return undefined;
  return authHeader.slice(7).trim() || undefined;
}

export function requireAdminAuth(authHeader: string | undefined | null): boolean {
  return verifyAdminToken(getBearerToken(authHeader));
}
