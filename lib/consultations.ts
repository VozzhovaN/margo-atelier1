import fs from 'fs';
import path from 'path';
import { sendAdminDossierEmail } from './admin-mail';
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

function asJoined(value: unknown): string {
  if (Array.isArray(value)) return value.filter(Boolean).join(', ');
  if (typeof value === 'string') return value;
  return '';
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
    silhouette: body.silhouetteLabel || asJoined(body.silhouette) || '',
    style: body.styleLabel || asJoined(body.style) || '',
    colors: Array.isArray(body.colors)
      ? body.colors
      : body.colourLabel
        ? String(body.colourLabel)
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean)
        : [],
    customColorNote: typeof body.customColorNote === 'string' ? body.customColorNote : '',
    measurements: body.measurements || {},
    references: Array.isArray(body.references) ? body.references.slice(0, 3) : [],
    referenceNotes: typeof body.referenceNotes === 'string' ? body.referenceNotes : '',
    priorities: Array.isArray(body.priorities) ? body.priorities : [],
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
    consentAccepted: Boolean(body.consentAccepted),
    consentAcceptedAt: body.consentAcceptedAt || '',
    consentVersion: body.consentVersion || '',
    preferredChannel:
      body.preferredChannel === 'whatsapp' || body.preferredChannel === 'telegram'
        ? body.preferredChannel
        : undefined,
    status: 'new',
  };
}

export function formatConsultationMessage(consultation: Consultation): string {
  const clientName =
    consultation.contact?.fullName || consultation.contact?.name || 'Guest Client';

  const OCCASION_NAMES: Record<string, string> = {
    bridal: 'Свадебный образ',
    evening: 'Вечерний образ',
    special_occasion: 'Особое событие',
    custom_dress: 'Платье на заказ',
  };
  const occasion =
    OCCASION_NAMES[consultation.occasion] || consultation.occasion || 'Atelier Consultation';

  const dateStr = consultation.date
    ? consultation.timeline
      ? `${consultation.date} (${consultation.timeline})`
      : consultation.date
    : consultation.timeline || 'Flexible';

  const settingsParts = [
    ...(Array.isArray(consultation.settings) ? consultation.settings : []),
    consultation.settingOther,
    consultation.eventCity ? `Город/регион: ${consultation.eventCity}` : '',
  ].filter(Boolean);
  const settingsStr = settingsParts.length > 0 ? settingsParts.join('; ') : '';

  const budget = consultation.budget || 'Не указан';
  const silhouette = consultation.silhouette || 'Не выбран';
  const style = consultation.style || 'Не выбран';
  const colours =
    Array.isArray(consultation.colors) && consultation.colors.length > 0
      ? consultation.colors.join(', ')
      : 'Не указаны';
  const colorNote = consultation.customColorNote?.trim()
    ? `\nПожелания по цвету: ${consultation.customColorNote.trim()}`
    : '';
  const priorities =
    Array.isArray(consultation.priorities) && consultation.priorities.length > 0
      ? consultation.priorities.join(', ')
      : 'Не указаны';

  const m = consultation.measurements || {};
  const fit =
    Array.isArray(m.fitPreferences) && m.fitPreferences.length > 0
      ? m.fitPreferences.join(', ')
      : m.fitPreference || '—';
  const measurementsStr = [
    m.height ? `Рост: ${m.height}` : '',
    m.clothingSize ? `Размер: ${m.clothingSize}` : '',
    `Посадка: ${fit}`,
    m.notes ? `Заметки: ${m.notes}` : '',
  ]
    .filter(Boolean)
    .join(' | ');

  const refNotes = consultation.referenceNotes?.trim()
    ? `\nЗаметки к референсам: ${consultation.referenceNotes.trim()}`
    : '';
  const refsCount = Array.isArray(consultation.references) ? consultation.references.length : 0;

  const contactList: string[] = [];
  const tg = consultation.contact?.telegramHandle || consultation.contact?.telegram;
  if (tg) contactList.push(`Telegram: ${tg}`);
  const phone = consultation.contact?.whatsappPhone || consultation.contact?.phone;
  if (phone) contactList.push(`WhatsApp: ${phone}`);
  const email = consultation.contact?.email;
  if (email) contactList.push(`Email: ${email}`);
  const location = consultation.contact?.atelierLocation || consultation.contact?.location;
  if (location) contactList.push(`Локация: ${location}`);
  const lang = consultation.contact?.preferredLanguage;
  if (lang) contactList.push(`Язык: ${lang}`);
  const contactStr = contactList.length > 0 ? contactList.join(' | ') : 'Не указаны';

  let aiSummary = 'Не сгенерировано';
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

  const consentLine = consultation.consentAccepted
    ? `Согласие: да (${consultation.consentAcceptedAt || '—'}; v${consultation.consentVersion || '—'})`
    : 'Согласие: не отмечено';

  const channelLine =
    consultation.preferredChannel === 'whatsapp'
      ? 'Канал отправки: WhatsApp'
      : consultation.preferredChannel === 'telegram'
        ? 'Канал отправки: Telegram'
        : '';

  const header = consultation.id
    ? `NEW MARGO ATELIER CONSULTATION\nID: ${consultation.id}`
    : 'NEW MARGO ATELIER CONSULTATION';

  return `${header}

Клиент: ${clientName}
Повод: ${occasion}
Дата: ${dateStr}${settingsStr ? `\nФормат события: ${settingsStr}` : ''}
Бюджет: ${budget}
Силуэт: ${silhouette}
Стиль: ${style}
Цвета: ${colours}${colorNote}
Посадка: ${measurementsStr || '—'}
Приоритеты: ${priorities}
Фото-референсы: ${refsCount}${refNotes}
Контакты: ${contactStr}
${consentLine}${channelLine ? `\n${channelLine}` : ''}

AI STYLE DIRECTION:
${aiSummary}`;
}

async function sendTelegramPhoto(
  token: string,
  chatId: string,
  source: string,
  caption?: string
): Promise<boolean> {
  try {
    const form = new FormData();
    form.append('chat_id', chatId);
    if (caption) form.append('caption', caption.slice(0, 1024));

    if (source.startsWith('data:')) {
      const match = source.match(/^data:([^;]+);base64,(.+)$/);
      if (!match) return false;
      const mime = match[1] || 'image/jpeg';
      const buffer = Buffer.from(match[2], 'base64');
      const ext = mime.includes('png') ? 'png' : mime.includes('webp') ? 'webp' : 'jpg';
      const blob = new Blob([buffer], { type: mime });
      form.append('photo', blob, `reference.${ext}`);
    } else if (/^https?:\/\//i.test(source)) {
      form.append('photo', source);
    } else if (source.startsWith('/')) {
      const appUrl = process.env.APP_URL?.replace(/\/$/, '');
      if (!appUrl) return false;
      form.append('photo', `${appUrl}${source}`);
    } else {
      return false;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    const response = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: 'POST',
      body: form,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const data: any = await response.json().catch(() => ({}));
    if (!response.ok || !data.ok) {
      console.error('[Telegram] sendPhoto failed:', data?.description || response.status);
      return false;
    }
    return true;
  } catch (err: any) {
    console.error('[Telegram] sendPhoto error:', err?.message || err);
    return false;
  }
}

export async function sendTelegramNotification(consultation: Consultation): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    console.info('[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured. Skipping.');
    return false;
  }

  try {
    const text = formatConsultationMessage(consultation);
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

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

    const refs = Array.isArray(consultation.references) ? consultation.references.slice(0, 3) : [];
    for (let i = 0; i < refs.length; i++) {
      await sendTelegramPhoto(
        token,
        chatId,
        refs[i],
        `Референс ${i + 1}/${refs.length} · ${consultation.id}`
      );
    }

    console.info(`[Telegram] Successfully delivered notification for dossier ${consultation.id}`);
    return true;
  } catch (error: any) {
    console.error('[Telegram] Dispatch error:', error?.message || 'Network failure');
    return false;
  }
}

export async function sendWhatsAppNotification(consultation: Consultation): Promise<boolean> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  const notifyTo = (process.env.WHATSAPP_NOTIFY_TO || '393498124490').replace(/\D/g, '');

  if (!token || !phoneNumberId) {
    console.info(
      '[WhatsApp] WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID not configured. Skipping.'
    );
    return false;
  }

  if (!notifyTo) {
    console.info('[WhatsApp] WHATSAPP_NOTIFY_TO is empty. Skipping.');
    return false;
  }

  try {
    const text = formatConsultationMessage(consultation);
    // WhatsApp text body limit is 4096 characters
    const body = text.length > 4000 ? `${text.slice(0, 3990)}\n…` : text;
    const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: notifyTo,
        type: 'text',
        text: { preview_url: false, body },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data: any = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error(
        `[WhatsApp] Failed to send notification (status: ${response.status}):`,
        data?.error?.message || data || 'Unknown WhatsApp API error'
      );
      return false;
    }

    console.info(`[WhatsApp] Successfully delivered notification for dossier ${consultation.id}`);
    return true;
  } catch (error: any) {
    console.error('[WhatsApp] Dispatch error:', error?.message || 'Network failure');
    return false;
  }
}

export async function submitConsultation(body: any) {
  const newConsultation = createConsultationFromBody(body);
  const list = loadConsultations();
  list.unshift(newConsultation);
  saveConsultations(list);

  console.log(
    `[MARGO Atelier Engine] New Consultation Dossier: ${newConsultation.contact.name} (${newConsultation.id})`
  );

  const channel = newConsultation.preferredChannel;
  let telegramNotificationSent = false;
  let whatsappNotificationSent = false;
  let emailNotificationSent = false;

  // Deliver to the channel the client chose; always keep email as atelier backup.
  if (channel === 'whatsapp') {
    try {
      whatsappNotificationSent = await sendWhatsAppNotification(newConsultation);
    } catch (waErr: any) {
      console.error('[WhatsApp] Unexpected notification error:', waErr?.message || 'Error');
      whatsappNotificationSent = false;
    }
    // Fallback: if WhatsApp Cloud API is not wired yet, still ping Telegram so the lead is not lost.
    if (!whatsappNotificationSent) {
      try {
        telegramNotificationSent = await sendTelegramNotification(newConsultation);
      } catch (tgErr: any) {
        console.error('[Telegram] Fallback notification error:', tgErr?.message || 'Error');
      }
    }
  } else {
    try {
      telegramNotificationSent = await sendTelegramNotification(newConsultation);
    } catch (tgErr: any) {
      console.error('[Telegram] Unexpected notification error:', tgErr?.message || 'Error');
      telegramNotificationSent = false;
    }
  }

  try {
    emailNotificationSent = await sendAdminDossierEmail(newConsultation);
  } catch (mailErr: any) {
    console.error('[Email] Unexpected notification error:', mailErr?.message || 'Error');
    emailNotificationSent = false;
  }

  return {
    success: true,
    consultation: newConsultation,
    telegramNotificationSent,
    whatsappNotificationSent,
    emailNotificationSent,
    persisted: !isVercel,
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

export function archiveConsultation(id: string) {
  const list = loadConsultations();
  const item = list.find((c) => c.id === id);
  if (!item) return null;
  item.archived = true;
  item.archivedAt = new Date().toISOString();
  saveConsultations(list);
  return item;
}

export function permanentlyDeleteConsultation(id: string): 'not_found' | 'not_archived' | 'deleted' {
  const list = loadConsultations();
  const item = list.find((c) => c.id === id);
  if (!item) return 'not_found';
  if (!item.archived) return 'not_archived';
  saveConsultations(list.filter((c) => c.id !== id));
  return 'deleted';
}
