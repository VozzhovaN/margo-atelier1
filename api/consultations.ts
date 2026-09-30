import type { VercelRequest, VercelResponse } from '@vercel/node';
import { loadConsultations, submitConsultation } from '../lib/consultations';
import { isAdminPasswordConfigured, requireAdminAuth } from '../lib/admin-auth';

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
    const list = loadConsultations();
    return res.status(200).json({
      consultations: list,
      total: list.length,
    });
  }

  if (req.method === 'POST') {
    try {
      const result = await submitConsultation(req.body || {});
      return res.status(200).json(result);
    } catch (error: any) {
      console.error('Error creating consultation:', error);
      return res.status(500).json({ error: 'Failed to create consultation dossier' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}
