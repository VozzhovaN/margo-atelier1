import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel-safe consultations API (no parent-lib / supabase-js imports).
 * Uses Supabase REST + Web Crypto token verify compatible with /api/login.
 */

const SESSION_PURPOSE = 'margo-admin-session-v3';
const MAX_AGE_SEC = 90 * 24 * 60 * 60;

function normalizeSecret(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.normalize('NFKC').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
}

function adminSecret(): string {
  return normalizeSecret(process.env.ADMIN_PASSWORD) || 'margo-admin';
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function signToken(secret: string, issuedAt: number): Promise<string> {
  const payload = `${SESSION_PURPOSE}.${issuedAt}`;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return `${issuedAt}.${toHex(sig)}`;
}

async function verifyAdminToken(token: string | undefined): Promise<boolean> {
  const given = normalizeSecret(token);
  const secret = adminSecret();
  if (!given || !secret) return false;

  if (/^[a-f0-9]{64}$/i.test(given)) {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, enc.encode('margo-admin-session-v2'));
    return safeEqual(given.toLowerCase(), toHex(sig));
  }

  const dot = given.indexOf('.');
  if (dot <= 0) return false;
  const issuedAt = Number(given.slice(0, dot));
  if (!Number.isFinite(issuedAt) || issuedAt <= 0) return false;
  const now = Math.floor(Date.now() / 1000);
  if (issuedAt > now + 60 || now - issuedAt > MAX_AGE_SEC) return false;
  const expected = await signToken(secret, issuedAt);
  return safeEqual(given, expected);
}

function bearer(req: VercelRequest): string | undefined {
  const h = req.headers.authorization;
  if (!h || typeof h !== 'string' || !h.startsWith('Bearer ')) return undefined;
  return h.slice(7).trim() || undefined;
}

function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return null;
  return { url, key };
}

function rowToConsultation(row: any) {
  const contact = row.contact && typeof row.contact === 'object' ? row.contact : {};
  return {
    id: row.id,
    createdAt: row.created_at,
    occasion: row.occasion || '',
    date: row.event_date || '',
    timeline: row.timeline || '',
    settings: Array.isArray(row.settings) ? row.settings : [],
    settingOther: row.setting_other || '',
    eventCity: row.event_city || '',
    budget: row.budget || '',
    silhouette: row.silhouette || '',
    style: row.style || '',
    colors: Array.isArray(row.colors) ? row.colors : [],
    customColorNote: row.custom_color_note || '',
    measurements: row.measurements && typeof row.measurements === 'object' ? row.measurements : {},
    references: Array.isArray(row.reference_images) ? row.reference_images : [],
    referenceNotes: row.reference_notes || '',
    priorities: Array.isArray(row.priorities) ? row.priorities : [],
    contact: {
      name: contact.name || contact.fullName || 'Guest Client',
      fullName: contact.fullName || contact.name || 'Guest Client',
      telegram: contact.telegram || contact.telegramHandle || '',
      telegramHandle: contact.telegramHandle || contact.telegram || '',
      phone: contact.phone || contact.whatsappPhone || '',
      whatsappPhone: contact.whatsappPhone || contact.phone || '',
      email: contact.email || '',
      consultationType: contact.consultationType === 'virtual' ? 'virtual' : 'atelier',
      location: contact.location || contact.atelierLocation || '',
      atelierLocation: contact.atelierLocation || contact.location || '',
      preferredLanguage: contact.preferredLanguage || 'Русский',
    },
    aiStyleDirection: row.ai_style_direction || undefined,
    consentAccepted: Boolean(row.consent_accepted),
    consentAcceptedAt: row.consent_accepted_at || '',
    consentVersion: row.consent_version || '',
    preferredChannel: row.preferred_channel || undefined,
    status: row.status || 'new',
    archived: Boolean(row.archived),
    archivedAt: row.archived_at || undefined,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const ok = await verifyAdminToken(bearer(req));
      if (!ok) return res.status(401).json({ error: 'Unauthorized' });

      const sb = supabaseConfig();
      if (!sb) {
        return res.status(503).json({
          error:
            'Supabase is not configured on Vercel. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, run the SQL migration, then redeploy.',
        });
      }

      const response = await fetch(
        `${sb.url}/rest/v1/consultations?select=*&order=created_at.desc`,
        {
          headers: {
            apikey: sb.key,
            Authorization: `Bearer ${sb.key}`,
            Accept: 'application/json',
          },
        }
      );
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        return res.status(500).json({
          error: typeof payload?.message === 'string' ? payload.message : 'Failed to load consultations',
        });
      }
      const list = Array.isArray(payload) ? payload.map(rowToConsultation) : [];
      return res.status(200).json({ consultations: list, total: list.length });
    }

    if (req.method === 'POST') {
      // Heavy create/notify path — load local module only when invoked.
      const mod = await import('../lib/consultations');
      const result = await mod.submitConsultation(req.body || {});
      return res.status(200).json(result);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    const status = Number(error?.statusCode) || 500;
    console.error('[api/consultations]', error?.message || error);
    return res.status(status).json({ error: error?.message || 'Request failed' });
  }
}
