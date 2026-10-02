import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.SUPABASE_URL?.trim() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  );
}

/** Server-only Supabase client (service role). Never import this from frontend. */
export function getSupabaseAdmin(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw Object.assign(new Error('Supabase is not configured'), { statusCode: 503 });
  }
  if (cached) return cached;

  cached = createClient(
    process.env.SUPABASE_URL!.trim(),
    process.env.SUPABASE_SERVICE_ROLE_KEY!.trim(),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );
  return cached;
}

export function assertProductionStorageReady(): void {
  const isProd = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);
  if (!isProd) return;
  if (!isSupabaseConfigured()) {
    throw Object.assign(
      new Error(
        'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in production for durable dossier storage.'
      ),
      { statusCode: 503 }
    );
  }
  if (!process.env.ADMIN_PASSWORD?.trim()) {
    throw Object.assign(
      new Error('ADMIN_PASSWORD is required in production.'),
      { statusCode: 503 }
    );
  }
}
