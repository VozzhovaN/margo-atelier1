import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  createAdminToken,
  isAdminPasswordConfigured,
  verifyAdminPassword,
} from '../lib/admin-auth';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAdminPasswordConfigured()) {
    return res.status(503).json({
      error: 'Admin password is not configured. Set ADMIN_PASSWORD in environment.',
    });
  }

  const password = String(req.body?.password || '');
  if (!verifyAdminPassword(password)) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  return res.status(200).json({
    success: true,
    token: createAdminToken(),
  });
}
