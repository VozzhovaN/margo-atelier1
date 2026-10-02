# Supabase setup (MARGO Atelier)

## 1. Create project
1. Open https://supabase.com/dashboard
2. Create a project
3. Copy **Project URL** and **service_role** key from Project Settings → API

## 2. Apply schema
1. Open SQL Editor
2. Paste and run `migrations/001_consultations.sql`

## 3. Env (server only)
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
```
Never put `SUPABASE_SERVICE_ROLE_KEY` in frontend code or `VITE_*` variables.

## 4. Vercel
Add the same variables in Vercel → Project → Settings → Environment Variables → Production, then Redeploy.
