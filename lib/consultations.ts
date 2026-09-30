import fs from 'fs';
import path from 'path';
import { Consultation } from './types';

/**
 * Persistence:
 * - Locally: data/consultations.json (durable for npm run dev)
 * - On Vercel: in-memory + /tmp best-effort. Serverless instances do not share
 *   durable disk. Ready to swap this module for Supabase later without changing
 *   the frontend.
 */
const isVercel = Boolean(process.env.VERCEL);

type GlobalStore = typeof globalThis & { __margoConsultations?: Consultation[] };

function memoryStore(): Consultation[] {
  const g = globalThis as GlobalStore;
  if (!g.__margoConsultations) {
    g.__margoConsultations = [];
  }
  return g.__margoConsultations;
}

function consultationsFilePath(): string {
  if (isVercel) {
    return path.join('/tmp', 'margo-consultations.json');
  }
  return process.env.DATA_DIR
    ? path.join(process.env.DATA_DIR, 'consultations.json')
    : path.join(process.cwd(), 'data', 'consultations.json');
}

function readFileStore(): Consultation[] | null {
  try {
    const file = consultationsFilePath();
    if (!fs.existsSync(file)) return null;
    const data = fs.readFileSync(file, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : null;
  } catch (err) {
    console.warn('[Storage] Could not read consultations file, using memory store:', err);
    return null;
  }
}

function writeFileStore(items: Consultation[]): boolean {
  try {
    const file = consultationsFilePath();
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(file, JSON.stringify(items, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.warn('[Storage] Could not write consultations file:', err);
    return false;
  }
}

export function loadConsultations(): Consultation[] {
  const mem = memoryStore();
  if (mem.length > 0) return mem;

  const fromFile = readFileStore();
  if (fromFile) {
    mem.splice(0, mem.length, ...fromFile);
    return mem;
  }

  return mem;
}

export function saveConsultations(items: Consultation[]): boolean {
  const mem = memoryStore();
  mem.splice(0, mem.length, ...items);
  return writeFileStore(items);
}

export function createConsultationFromBody(body: any): Consultation {
  return {
    id: `MARGO-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    occasion: body.occasion || 'Atelier Consultation',
    date: body.date || '',
    timeline: body.timeline || 'Flexible',
    settings: Array.isArray(body.settings) ? body.settings : [],
    settingOther: body.settingOther || '',
    eventCity: body.eventCity || '',
    budget: body.budget || '',
    silhouette: body.silhouette
      ? Array.isArray(body.silhouette)
        ? body.silhouette.join(', ')
        : body.silhouette
      : '',
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
}

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

  const settingsParts = [
    ...(Array.isArray(consultation.settings) ? consultation.settings : []),
    consultation.settingOther,
    consultation.eventCity ? `City/region: ${consultation.eventCity}` : '',
  ].filter(Boolean);
  const settingsStr = settingsParts.length > 0 ? settingsParts.join('; ') : '';

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
Event date: ${dateStr}${settingsStr ? `\nEvent setting: ${settingsStr}` : ''}
Budget: ${budget}
Silhouette: ${silhouette}
Style: ${style}
Colours: ${colours}
Priorities: ${priorities}
Contact: ${contactStr}

AI STYLE DIRECTION:
${aiSummary}`;
}

export async function sendTelegramNotification(consultation: Consultation): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    console.info('[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured. Skipping.');
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
    console.error('[Telegram] Dispatch error:', error?.message || 'Network failure');
    return false;
  }
}

export async function submitConsultation(body: any) {
  const newConsultation = createConsultationFromBody(body);
  const list = loadConsultations();
  list.unshift(newConsultation);
  saveConsultations(list);

  console.log(`[MARGO Atelier Engine] New Consultation Dossier: ${newConsultation.contact.name} (${newConsultation.id})`);

  let telegramNotificationSent = false;
  try {
    telegramNotificationSent = await sendTelegramNotification(newConsultation);
  } catch (tgErr: any) {
    console.error('[Telegram] Unexpected notification error:', tgErr?.message || 'Error');
    telegramNotificationSent = false;
  }

  const clientName = newConsultation.contact.fullName || newConsultation.contact.name;

  return {
    success: true,
    consultation: newConsultation,
    telegramNotificationSent,
    persisted: !isVercel,
    whatsappLink: `https://wa.me/393498124490?text=${encodeURIComponent(
      `Hello MARGO Atelier, I have prepared my consultation dossier #${newConsultation.id} for ${newConsultation.occasion} (${clientName}).`
    )}`,
  };
}

export function updateConsultationStatus(id: string, status: Consultation['status']) {
  const list = loadConsultations();
  const item = list.find((c) => c.id === id);
  if (!item || !status) return null;
  item.status = status;
  saveConsultations(list);
  return item;
}
