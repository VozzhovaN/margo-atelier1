type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * Simple in-memory rate limiter (per process / serverless instance).
 * Enough to blunt casual brute-force; not a substitute for WAF/CDN limits.
 */
export function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; retryAfterSec: number } {
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

export function clientIpFromHeaders(
  headers: Record<string, string | string[] | undefined> | undefined,
  fallback = 'unknown'
): string {
  if (!headers) return fallback;
  const forwarded = headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim().slice(0, 64);
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return String(forwarded[0]).split(',')[0].trim().slice(0, 64);
  }
  const realIp = headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) return realIp.trim().slice(0, 64);
  return fallback;
}
