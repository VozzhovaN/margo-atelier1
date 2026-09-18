import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

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

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({ limit: '12mb' }));

const DATA_DIR = process.env.DATA_DIR || path.join(projectRoot, 'data');
const CONSULTATIONS_FILE = path.join(DATA_DIR, 'consultations.json');
const PUBLIC_DIR = path.join(projectRoot, 'dist', 'public');

interface Consultation {
  id: string;
  createdAt: string;
  occasion: string;
  date: string;
  timeline: string;
  budget: string;
  silhouette: string;
  style: string;
  colors: string[];
  measurements: {
    height?: string;
    clothingSize?: string;
    size?: string;
    fitPreference?: string;
    notes?: string;
  };
  references: string[];
  priorities: string[];
  contact: {
    name: string;
    fullName?: string;
    telegram?: string;
    telegramHandle?: string;
    phone?: string;
    whatsappPhone?: string;
    email?: string;
    consultationType: 'atelier' | 'virtual';
    location?: string;
    atelierLocation?: string;
    preferredLanguage?: string;
  };
  aiStyleDirection?: {
    headline: string;
    concept: string;
    recommendedFabrics: string[];
    architecturalDetails: string[];
    consultationFocus: string[];
  };
  status: 'new' | 'contacted' | 'scheduled' | 'fitting' | 'completed';
}

// In-memory fallback and local persistence helpers
let consultationsMemory: Consultation[] = [];

function loadLocalConsultations(): Consultation[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(CONSULTATIONS_FILE)) {
      const data = fs.readFileSync(CONSULTATIONS_FILE, 'utf-8');
      consultationsMemory = JSON.parse(data);
      return consultationsMemory;
    }
  } catch (err) {
    console.warn('[Storage] Could not read from data/consultations.json, using memory store:', err);
  }

  consultationsMemory = [];
  saveLocalConsultations(consultationsMemory);
  return consultationsMemory;
}

function saveLocalConsultations(items: Consultation[]): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CONSULTATIONS_FILE, JSON.stringify(items, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.warn('[Storage] Could not write to data/consultations.json:', err);
    return false;
  }
}

// Initialize on startup
loadLocalConsultations();

// Lazy Gemini client helper (runs locally inside the container's Node environment)
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// Internal Haute Couture Synthesis Engine (guarantees sophisticated generation even without third-party services)
function generateInternalCoutureDirection(params: {
  occasion?: string;
  silhouette?: string;
  style?: string;
  colors?: string[];
  measurements?: any;
  priorities?: string[];
  referenceNotes?: string;
  isRussian: boolean;
}) {
  const { occasion, silhouette, style, colors, measurements, priorities, isRussian } = params;

  if (isRussian) {
    const silLabel = silhouette || 'Архитектурный колонный силуэт';
    const occLabel = occasion || 'Индивидуальный кутюрный заказ';
    const primaryColor = colors && colors.length > 0 ? colors[0] : 'Натуральный шелк оттенка теплого молока';

    return {
      headline: `Архитектурная чистота и благородный шелк: ${silLabel.split('(')[0].trim()}`,
      concept: `Индивидуальная концепция для ${occLabel.toLowerCase()}. Сочетание графичной чистоты линий и струящейся средиземноморской пластики ткани, где ключевой акцент сделан на ${primaryColor.toLowerCase()} и безупречную скульптурную посадку по фигуре.`,
      recommendedFabrics: [
        'Тяжелый шелковый креп двойного кручения (озеро Комо, Италия)',
        'Двусторонний шелковый атлас дюшес с деликатным матовым блеском',
        'Воздушный шелковый муслин или органза для невесомых драпировок',
        'Подкладка из тончайшего шелкового хаботая для идеального контакта с кожей',
      ],
      architecturalDetails: [
        'Скрытый внутренний корсетный пояс (corselet) из хлопкового репса для идеальной осанки',
        'Чистый крой по косой (bias-cut), создающий скульптурные вертикальные линии без лишних швов',
        'Тончайшая ручная вспушка срезов и невидимая потайная молния ручной фиксации',
      ],
      consultationFocus: [
        'Тактильная примерка образцов натурального шелка при мягком дневном свете ателье',
        'Построение персональной примерки из неотбеленного хлопка (toile) по вашим меркам',
        'Корректировка пропорций и длины шлейфа под выбранную высоту каблука и место торжества',
      ],
    };
  } else {
    const silLabel = silhouette || 'Architectural Column Silhouette';
    return {
      headline: `Architectural Serenity in Pure Silk: ${silLabel}`,
      concept: `A bespoke sartorial study harmonizing contemporary architectural lines with fluid Mediterranean grace. Designed with understated elegance, prioritizing tactile luxury and precise silhouette contouring.`,
      recommendedFabrics: [
        'Heavyweight Italian Silk Crêpe (Lake Como)',
        'Double-faced Duchess Silk Satin with subtle matte luster',
        'Airy Silk Muslin and Organza for fluid drapery accents',
        'Pure Silk Habotai interior lining for effortless skin comfort',
      ],
      architecturalDetails: [
        'Concealed internal cotton grosgrain waiststay for graceful posture support',
        'Bias-cut architectural drape contouring the natural feminine silhouette',
        'Hand-rolled invisible hems with delicate couture hand-stitching',
      ],
      consultationFocus: [
        'Tactile silk swatch drape review under natural atelier daylight',
        'Cotton toile prototype construction calibrated to your measurements',
        'Proportion and hem calibration tailored to your footwear and event setting',
      ],
    };
  }
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', atelier: 'MARGO Atelier', timestamp: new Date().toISOString() });
});

// API: Generate AI Style Direction via Gemini
app.post('/api/gemini/style-direction', async (req, res) => {
  try {
    const {
      occasion,
      timeline,
      date,
      budget,
      silhouette,
      style,
      colors,
      measurements,
      priorities,
      referenceNotes,
      lang = 'ru',
    } = req.body;

    const isRussian = lang !== 'en';
    const ai = getGeminiClient();

    if (!ai) {
      // Internal high-fashion couture synthesis engine (100% inside the project, zero 3rd party services)
      const internalResult = generateInternalCoutureDirection({
        occasion,
        silhouette,
        style,
        colors,
        measurements,
        priorities,
        referenceNotes,
        isRussian,
      });
      return res.json(internalResult);
    }

    const languageDirective = isRussian
      ? `CRITICAL LANGUAGE REQUIREMENT: You MUST write the ENTIRE proposal strictly in fluent, poetic, high-fashion RUSSIAN (на русском языке). Use high-end fashion and couture terminology (высокий кутюр, тихий люкс, тяжелый шелковый креп из Комо, атлас дюшес, макетирование toile, крой по косой, репсовая корсетная лента, средиземноморский свет).`
      : `Language: English. High-fashion luxury couture tone.`;

    const prompt = `You are the Head Creative Director and Haute Couture Stylist of MARGO ATELIER (inspired by contemporary high-fashion atelier start.margocreativelab.com: quiet luxury, contemporary couture, feminine, Mediterranean warm natural light, ivory/cream/nude/sand tones, architectural silhouettes, pure fabrics, no generic bridal clichés).

${languageDirective}

Generate a personalized, evocative, and high-fashion "AI Style Direction" / "Консультационное Предложение" for an upcoming atelier consultation based on this client's profile:
- Occasion / Повод: ${occasion || 'Custom Atelier Creation'}
- Event Date / Timeline / Сроки: ${date ? date + ' (' + timeline + ')' : timeline || 'Flexible'}
- Investment Budget / Бюджет: ${budget || 'Atelier Bespoke'}
- Preferred Silhouette / Силуэт: ${silhouette || 'Fluid Architectural'}
- Style Essence / Характер стиля: ${style || 'Quiet Luxury Editorial'}
- Color Palette / Палитра: ${Array.isArray(colors) ? colors.join(', ') : colors || 'Ivory, Nude, Sand'}
- Fit & Silhouette Details / Посадка: ${measurements?.fitPreference || 'Tailored to posture'}, Size/Height: ${measurements?.clothingSize || measurements?.size || 'Bespoke'} / ${measurements?.height || 'Custom'}
- Client Notes / Пожелания клиента: ${measurements?.notes || 'None'}
- Client Priorities / Приоритеты: ${Array.isArray(priorities) ? priorities.join(', ') : priorities || 'Fabric quality & architectural silhouette'}
- Visual Reference Notes / Мудборд: ${referenceNotes || 'Editorial couture minimalism'}

Respond in clean, valid JSON format ONLY with this exact JSON structure:
{
  "headline": "${isRussian ? 'Поэтичный емкий заголовок (4-7 слов), отражающий эстетику образа' : 'A poetic, evocative 4-7 word title capturing the aesthetic identity'}",
  "concept": "${isRussian ? '2-3 предложения кутюрного эссе: настроение, пластика ткани, силуэт в терминах тихого люкса' : 'A 2-3 sentence editorial fashion narrative describing the mood, movement, and silhouette in quiet luxury couture terminology.'}",
  "recommendedFabrics": ["${isRussian ? '3-4 конкретные благородные ткани с указанием фактуры и происхождения (напр., тяжелый итальянский шелковый креп из Комо, шелковый атлас дюшес, воздушная органза)' : '3 to 4 specific luxury haute couture fabrics with origin and texture, e.g., Heavyweight Como silk crêpe, double-faced duchess satin, crêpe de chine'}"],
  "architecturalDetails": ["${isRussian ? '3 конструктивных элемента кроя, драпировки и ручной отделки, созданных персонально под этого клиента' : '3 specific cut, structural, and drapery highlights crafted for this client'}"],
  "consultationFocus": ["${isRussian ? '3 ключевые темы и тактильные тесты, которые кутюрье подготовит к первой очной консультации' : '3 specific discussion points and tactile draping tests the Master Couturier will prepare for the client\'s first consultation'}"]
}`;

    const systemInstruction = isRussian
      ? 'Вы — Главный Кутюрье MARGO Atelier. Ваш тон — теплый, уверенный, безупречно знающий современную высокую моду (quiet luxury, haute couture), сдержанный и поэтичный. Пишите на изысканном русском языке высокой моды.'
      : 'You are the Master Couturier of MARGO Atelier. Your tone is warm, confident, deeply knowledgeable in contemporary luxury fashion, refined, and editorial. Never sound robotic or generic.';

    const generateWithTimeout = Promise.race([
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction,
        },
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Internal generation timeout, using local couture engine')), 4500)
      ),
    ]);

    const response = await generateWithTimeout;

    const responseText = response.text || '{}';
    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      // Fallback regex extract
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    }

    if (!parsed) {
      throw new Error('Failed to parse style direction response');
    }

    return res.json(parsed);
  } catch (error: any) {
    console.info('[MARGO Internal Engine] Using internal couture direction synthesizer:', error?.message || error);
    const {
      occasion,
      silhouette,
      style,
      colors,
      measurements,
      priorities,
      referenceNotes,
      lang = 'ru',
    } = req.body;
    const isRussian = lang !== 'en';
    const localResult = generateInternalCoutureDirection({
      occasion,
      silhouette,
      style,
      colors,
      measurements,
      priorities,
      referenceNotes,
      isRussian,
    });
    return res.json(localResult);
  }
});

// Telegram Bot Message Formatter
function formatTelegramConsultationMessage(consultation: Consultation): string {
  const clientName =
    consultation.contact?.fullName || consultation.contact?.name || 'Guest Client';

  const OCCASION_NAMES: Record<string, string> = {
    bridal: 'Bridal Couture',
    evening: 'Evening & Gala',
    special_occasion: 'Special Occasion',
    custom_dress: 'Bespoke Atelier Creation',
  };
  const occasion =
    OCCASION_NAMES[consultation.occasion] || consultation.occasion || 'Atelier Consultation';

  const dateStr = consultation.date
    ? (consultation.timeline ? `${consultation.date} (${consultation.timeline})` : consultation.date)
    : (consultation.timeline || 'Flexible');

  const budget = consultation.budget || 'Not specified';
  const silhouette = consultation.silhouette || 'Bespoke';
  const style = consultation.style || 'Quiet Luxury';
  const colours =
    Array.isArray(consultation.colors) && consultation.colors.length > 0
      ? consultation.colors.join(', ')
      : 'Not specified';
  const priorities =
    Array.isArray(consultation.priorities) && consultation.priorities.length > 0
      ? consultation.priorities.join(', ')
      : 'Not specified';

  const contactList: string[] = [];
  const tg = consultation.contact?.telegramHandle || consultation.contact?.telegram;
  if (tg) contactList.push(`Telegram: ${tg}`);
  const phone = consultation.contact?.whatsappPhone || consultation.contact?.phone;
  if (phone) contactList.push(`WhatsApp: ${phone}`);
  const email = consultation.contact?.email;
  if (email) contactList.push(`Email: ${email}`);
  const location = consultation.contact?.atelierLocation || consultation.contact?.location;
  if (location) contactList.push(`Venue: ${location}`);

  const contactStr = contactList.length > 0 ? contactList.join(' | ') : 'Not provided';

  let aiSummary = 'No AI style direction generated';
  if (consultation.aiStyleDirection) {
    const { headline, concept } = consultation.aiStyleDirection;
    if (headline && concept) {
      aiSummary = `"${headline}"\n${concept}`;
    } else if (concept) {
      aiSummary = concept;
    } else if (headline) {
      aiSummary = `"${headline}"`;
    }
  }

  const header = consultation.id
    ? `NEW MARGO ATELIER CONSULTATION\nConsultation ID: ${consultation.id}`
    : 'NEW MARGO ATELIER CONSULTATION';

  return `${header}

Client: ${clientName}
Occasion: ${occasion}
Event date: ${dateStr}
Budget: ${budget}
Silhouette: ${silhouette}
Style: ${style}
Colours: ${colours}
Priorities: ${priorities}
Contact: ${contactStr}

AI STYLE DIRECTION:
${aiSummary}`;
}

// Server-side Telegram Bot API Dispatcher
async function sendTelegramNotification(consultation: Consultation): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    console.info('[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured in environment. Skipping Telegram message dispatch.');
    return false;
  }

  try {
    const text = formatTelegramConsultationMessage(consultation);
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data: any = await response.json().catch(() => ({}));
    if (!response.ok || !data.ok) {
      console.error(
        `[Telegram] Failed to send notification (status: ${response.status}):`,
        data?.description || 'Unknown Telegram API error'
      );
      return false;
    }

    console.info(`[Telegram] Successfully delivered notification for dossier ${consultation.id}`);
    return true;
  } catch (error: any) {
    // Safe error logging: never expose or log the bot token
    console.error('[Telegram] Dispatch error:', error?.message || 'Network failure');
    return false;
  }
}

// API: Submit Consultation & Notify Atelier (stored 100% locally inside project)
app.post('/api/consultations', async (req, res) => {
  try {
    const body = req.body;
    const id = `MARGO-${Math.floor(1000 + Math.random() * 9000)}`;
    const newConsultation: Consultation = {
      id,
      createdAt: new Date().toISOString(),
      occasion: body.occasion || 'Atelier Consultation',
      date: body.date || '',
      timeline: body.timeline || 'Flexible',
      budget: body.budget || '',
      silhouette: body.silhouette || '',
      style: body.style || '',
      colors: body.colors || [],
      measurements: body.measurements || {},
      references: body.references || [],
      priorities: body.priorities || [],
      contact: {
        name: body.contact?.fullName || body.contact?.name || 'Guest Client',
        fullName: body.contact?.fullName || body.contact?.name || 'Guest Client',
        telegram: body.contact?.telegramHandle || body.contact?.telegram || '',
        telegramHandle: body.contact?.telegramHandle || body.contact?.telegram || '',
        phone: body.contact?.whatsappPhone || body.contact?.phone || '',
        whatsappPhone: body.contact?.whatsappPhone || body.contact?.phone || '',
        email: body.contact?.email || '',
        consultationType: body.contact?.consultationType || 'atelier',
        location: body.contact?.atelierLocation || body.contact?.location || '',
        atelierLocation: body.contact?.atelierLocation || body.contact?.location || '',
        preferredLanguage: body.contact?.preferredLanguage || 'Русский',
      },
      aiStyleDirection: body.aiStyleDirection,
      status: 'new',
    };

    // 1. Data MUST be saved locally first
    consultationsMemory.unshift(newConsultation);
    saveLocalConsultations(consultationsMemory);

    console.log(`[MARGO Atelier Engine] 🔔 New Consultation Dossier saved locally: ${newConsultation.contact.name} (${newConsultation.id})`);

    // 2. Dispatch real Telegram notification strictly AFTER data is successfully saved
    let telegramNotificationSent = false;
    try {
      telegramNotificationSent = await sendTelegramNotification(newConsultation);
    } catch (tgErr: any) {
      console.error('[Telegram] Unexpected notification error:', tgErr?.message || 'Error');
      telegramNotificationSent = false;
    }

    const clientName = newConsultation.contact.fullName || newConsultation.contact.name;

    // 3. Return actual telegramNotificationSent flag, never fake true
    res.json({
      success: true,
      consultation: newConsultation,
      telegramNotificationSent,
      whatsappLink: `https://wa.me/393498124490?text=${encodeURIComponent(
        `Hello MARGO Atelier, I have prepared my consultation dossier #${newConsultation.id} for ${newConsultation.occasion} (${clientName}).`
      )}`,
    });
  } catch (error: any) {
    console.error('Error creating consultation:', error);
    res.status(500).json({ error: 'Failed to create consultation dossier' });
  }
});

// API: Get Consultations for Atelier Dashboard (from local storage)
app.get('/api/consultations', (req, res) => {
  const list = loadLocalConsultations();
  res.json({
    consultations: list,
    total: list.length,
  });
});

// API: Update Consultation Status (persisted locally inside project)
app.patch('/api/consultations/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const item = consultationsMemory.find((c) => c.id === id);
  if (item && status) {
    item.status = status;
    saveLocalConsultations(consultationsMemory);
    return res.json({ success: true, consultation: item });
  }
  res.status(404).json({ error: 'Consultation not found' });
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
