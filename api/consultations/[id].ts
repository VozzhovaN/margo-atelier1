import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  archiveConsultation,
  permanentlyDeleteConsultation,
  updateConsultationStatus,
} from '../../lib/consultations';
import {
  isAdminPasswordConfigured,
  requireAdminAuth,
  verifyAdminPassword,
} from '../../lib/admin-auth';
import type { Consultation } from '../../lib/types';

function deny(req: VercelRequest, res: VercelResponse): boolean {
  if (!isAdminPasswordConfigured()) {
    res.status(503).json({
      error: 'Admin password is not configured. Set ADMIN_PASSWORD in environment.',
    });
    return true;
  }
  if (!requireAdminAuth(req.headers.authorization)) {
    res.status(401).json({ error: 'Unauthorized' });
    return true;
  }
  return false;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const id = String(req.query.id || '');

  if (req.method === 'PATCH') {
    if (deny(req, res)) return;
    if (req.body?.archive === true) {
      const archived = archiveConsultation(id);
      if (!archived) return res.status(404).json({ error: 'Consultation not found' });
      return res.status(200).json({ success: true, consultation: archived });
    }
    const status = req.body?.status as Consultation['status'] | undefined;
    const item = updateConsultationStatus(id, status as Consultation['status']);
    if (!item) return res.status(404).json({ error: 'Consultation not found' });
    return res.status(200).json({ success: true, consultation: item });
  }

  if (req.method === 'DELETE') {
    if (deny(req, res)) return;
    const password = String(req.body?.password || '');
    if (!verifyAdminPassword(password)) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const result = permanentlyDeleteConsultation(id);
    if (result === 'not_found') return res.status(404).json({ error: 'Consultation not found' });
    if (result === 'not_archived') {
      return res.status(400).json({ error: 'Archive the request before permanent deletion' });
    }
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', 'PATCH, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
