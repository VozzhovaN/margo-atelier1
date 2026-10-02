import type { VercelRequest, VercelResponse } from '@vercel/node';
import { loadConsultations, submitConsultation } from '../lib/consultations';
import { isAdminPasswordConfigured, requireAdminAuth } from '../lib/admin-auth';
import { clientIpFromHeaders, consumeRateLimit } from '../lib/rate-limit';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    if (!isAdminPasswordConfigured()) {
      return res.status(503).json({
        error: 'Admin password is not configured. Set ADMIN_PASSWORD in environment.',
      });
    }
    if (!requireAdminAuth(req.headers.authorization)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const list = await loadConsultations();
      return res.status(200).json({
        consultations: list,
        total: list.length,
      });
    } catch (error: any) {
      const status = Number(error?.statusCode) || 500;
      return res.status(status).json({ error: error?.message || 'Failed to load consultations' });
    }
  }

  if (req.method === 'POST') {
    const ip = clientIpFromHeaders(req.headers as Record<string, string | string[] | undefined>);
    const limit = consumeRateLimit(`consult-post:${ip}`, 20, 60 * 60 * 1000);
    if (!limit.allowed) {
      res.setHeader('Retry-After', String(limit.retryAfterSec));
      return res.status(429).json({ error: 'Too many submissions. Try again later.' });
    }
    try {
      const result = await submitConsultation(req.body || {});
      return res.status(200).json(result);
    } catch (error: any) {
      const status = Number(error?.statusCode) || 500;
      if (status >= 400 && status < 500) {
        return res.status(status).json({ error: error?.message || 'Invalid request' });
      }
      console.error('Error creating consultation:', error);
      return res.status(status).json({ error: error?.message || 'Failed to create consultation dossier' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}
