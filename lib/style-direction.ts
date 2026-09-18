import { GoogleGenAI } from '@google/genai';

export function generateInternalCoutureDirection(params: {
  occasion?: string;
  silhouette?: string;
  style?: string;
  colors?: string[];
  measurements?: any;
  priorities?: string[];
  referenceNotes?: string;
  isRussian: boolean;
}) {
  const { occasion, silhouette, style, colors, isRussian } = params;

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
  }

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

export async function createStyleDirection(body: any) {
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
  } = body || {};

  const isRussian = lang !== 'en';
  const fallback = () =>
    generateInternalCoutureDirection({
      occasion,
      silhouette,
      style,
      colors,
      measurements,
      priorities,
      referenceNotes,
      isRussian,
    });

  const ai = getGeminiClient();
  if (!ai) {
    return fallback();
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
  "consultationFocus": ["${isRussian ? '3 ключевые темы и тактильные тесты, которые кутюрье подготовит к первой очной консультации' : "3 specific discussion points and tactile draping tests the Master Couturier will prepare for the client's first consultation"}"]
}`;

  const systemInstruction = isRussian
    ? 'Вы — Главный Кутюрье MARGO Atelier. Ваш тон — теплый, уверенный, безупречно знающий современную высокую моду (quiet luxury, haute couture), сдержанный и поэтичный. Пишите на изысканном русском языке высокой моды.'
    : 'You are the Master Couturier of MARGO Atelier. Your tone is warm, confident, deeply knowledgeable in contemporary luxury fashion, refined, and editorial. Never sound robotic or generic.';

  try {
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
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    }

    if (!parsed) {
      throw new Error('Failed to parse style direction response');
    }

    return parsed;
  } catch (error: any) {
    console.info('[MARGO Internal Engine] Using internal couture direction synthesizer:', error?.message || error);
    return fallback();
  }
}
