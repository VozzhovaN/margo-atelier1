import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { createStyleDirection } from './lib/style-direction';
import {
  loadConsultations,
  submitConsultation,
  updateConsultationStatus,
} from './lib/consultations';
import {
  createAdminToken,
  isAdminPasswordConfigured,
  requireAdminAuth,
  verifyAdminPassword,
} from './lib/admin-auth';
import type { Consultation } from './lib/types';

const runningFromDist = /dist[/\\]server\.cjs$/.test(process.argv[1] || '');
const isProduction =
  process.env.NODE_ENV === 'production' || runningFromDist;

const projectRoot = runningFromDist
  ? path.resolve(path.dirname(path.resolve(process.argv[1])), '..')
  : process.cwd();

dotenv.config({ path: path.join(projectRoot, '.env') });
dotenv.config({ path: path.join(projectRoot, '.env.local') });

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const PUBLIC_DIR = path.join(projectRoot, 'dist');

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({ limit: '12mb' }));

function denyUnlessAdmin(req: express.Request, res: express.Response): boolean {
  if (!isAdminPasswordConfigured()) {
    res.status(503).json({
      error: 'Admin password is not configured. Set ADMIN_PASSWORD in environment.',
    });
    return false;
  }
  if (!requireAdminAuth(req.headers.authorization)) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', atelier: 'MARGO Atelier', timestamp: new Date().toISOString() });
});

app.post('/api/admin/login', (req, res) => {
  if (!isAdminPasswordConfigured()) {
    return res.status(503).json({
      error: 'Admin password is not configured. Set ADMIN_PASSWORD in environment.',
    });
  }
  const password = String(req.body?.password || '');
  if (!verifyAdminPassword(password)) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  return res.json({ success: true, token: createAdminToken(password) });
});

app.post('/api/gemini/style-direction', async (req, res) => {
  try {
    const result = await createStyleDirection(req.body || {});
    return res.json(result);
  } catch (error: any) {
    console.error('[style-direction]', error?.message || error);
    return res.status(500).json({ error: 'Failed to generate style direction' });
  }
});

app.post('/api/consultations', async (req, res) => {
  try {
    const result = await submitConsultation(req.body || {});
    return res.json(result);
  } catch (error: any) {
    console.error('Error creating consultation:', error);
    return res.status(500).json({ error: 'Failed to create consultation dossier' });
  }
});

app.get('/api/consultations', (req, res) => {
  if (!denyUnlessAdmin(req, res)) return;
  const list = loadConsultations();
  res.json({
    consultations: list,
    total: list.length,
  });
});

app.patch('/api/consultations/:id', (req, res) => {
  if (!denyUnlessAdmin(req, res)) return;
  const { id } = req.params;
  const { status } = req.body as { status?: Consultation['status'] };
  const item = updateConsultationStatus(id, status as Consultation['status']);
  if (!item) {
    return res.status(404).json({ error: 'Consultation not found' });
  }
  return res.json({ success: true, consultation: item });
});

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    if (!fs.existsSync(path.join(PUBLIC_DIR, 'index.html'))) {
      console.error(`[Server] Frontend build not found in ${PUBLIC_DIR}. Run npm run build first.`);
      process.exit(1);
    }
    app.use(express.static(PUBLIC_DIR, { index: false, maxAge: '7d' }));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
    });
  }

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err?.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
    console.error('[Server]', err?.message || err);
    return res.status(500).json({ error: 'Internal server error' });
  });

  const server = app.listen(PORT, HOST, () => {
    console.log(`MARGO ATELIER listening on http://${HOST}:${PORT} (${isProduction ? 'production' : 'development'})`);
  });

  const shutdown = () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 8000).unref();
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

startServer().catch((err) => {
  console.error('[Server] Failed to start:', err);
  process.exit(1);
});
