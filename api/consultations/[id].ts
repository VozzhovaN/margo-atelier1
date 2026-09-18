import type { VercelRequest, VercelResponse } from '@vercel/node';
import { updateConsultationStatus } from '../../lib/consultations';
import type { Consultation } from '../../lib/types';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', 'PATCH');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const id = String(req.query.id || '');
  const status = req.body?.status as Consultation['status'] | undefined;
  const item = updateConsultationStatus(id, status as Consultation['status']);

  if (!item) {
    return res.status(404).json({ error: 'Consultation not found' });
  }

  return res.status(200).json({ success: true, consultation: item });
}
