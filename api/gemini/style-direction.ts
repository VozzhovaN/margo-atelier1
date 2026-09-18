import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createStyleDirection } from '../lib/style-direction';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await createStyleDirection(req.body || {});
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('[style-direction]', error?.message || error);
    return res.status(500).json({ error: 'Failed to generate style direction' });
  }
}
