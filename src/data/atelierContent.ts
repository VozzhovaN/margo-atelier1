import {
  OccasionType,
} from '../types';
import { SupportedLanguage } from './translations';

// Campaign Assets
import bridalImg from '../assets/images/margo_bridal_editorial_1789726696806.jpg';
import eveningImg from '../assets/images/margo_evening_editorial_1789726710943.jpg';
import specialOccasionImg from '../assets/images/margo_special_occasion_1789726725864.jpg';
import customDressImg from '../assets/images/margo_custom_dress_1789726740808.jpg';
import columnImg from '../assets/images/margo_silhouette_column.png';
import alineImg from '../assets/images/margo_silhouette_aline.jpg';
import slipImg from '../assets/images/margo_silhouette_slip.png';
import coatDressImg from '../assets/images/margo_silhouette_coatdress.jpg';
import mermaidImg from '../assets/images/margo_silhouette_mermaid.jpg';
import fabricImg from '../assets/images/margo_fabric_detail_1789726769694.jpg';

export const CAMPAIGN_ASSETS = {
  bridal: bridalImg,
  evening: eveningImg,
  specialOccasion: specialOccasionImg,
  customDress: customDressImg,
  column: columnImg,
  fabric: fabricImg,
};

export interface LocalizedOccasion {
  id: OccasionType;
  title: Record<SupportedLanguage, string>;
  subtitle: Record<SupportedLanguage, string>;
  description: Record<SupportedLanguage, string>;
  image: string;
  tag: string;
}

export const OCCASIONS_DATA: LocalizedOccasion[] = [
  {
    id: 'bridal',
    title: {
      ru: 'Свадебный Кутюр',
      en: 'Bridal Couture',
    },
    subtitle: {
      ru: 'Современная Свадебная Эстетика',
      en: 'Contemporary Wedding Vision',
    },
    description: {
      ru: 'Скульптурные архитектурные платья и струящиеся шелковые силуэты, переосмысляющие свадебную чистоту.',
      en: 'Sculptural architectural gowns and fluid silk silhouettes that redefine modern bridal serenity.',
    },
    image: bridalImg,
    tag: 'Haute Mariée',
  },
  {
    id: 'evening',
    title: {
      ru: 'Вечерний Образ',
      en: 'Evening Gown',
    },
    subtitle: {
      ru: 'Gala, Black Tie & Красная Дорожка',
      en: 'Gala, Black Tie & Red Carpet',
    },
    description: {
      ru: 'Эффектные и одновременно непринужденные платья с открытой спиной, итальянским шелком и мягким сиянием.',
      en: 'Dramatic yet effortless evening wear created with low backs, noble Italian textiles and Mediterranean warmth.',
    },
    image: eveningImg,
    tag: 'Soirée Couture',
  },
  {
    id: 'special_occasion',
    title: {
      ru: 'Особый Повод',
      en: 'Special Occasion',
    },
    subtitle: {
      ru: 'Знаковые События & Камерные Торжества',
      en: 'Milestone Celebrations & Intimate Events',
    },
    description: {
      ru: 'Четкий тейлоринг, платья-жакеты и драпированные комплекты, сочетающие женственность и статусность.',
      en: 'Sharp tailoring, coat dresses and draped ensembles balancing feminine ease with high-fashion presence.',
    },
    image: specialOccasionImg,
    tag: 'Événement',
  },
  {
    id: 'custom_dress',
    title: {
      ru: 'Индивидуальный Пошив',
      en: 'Custom Dress',
    },
    subtitle: {
      ru: 'Ателье Sur-Mesure под Ключ',
      en: 'Bespoke Atelier Creation',
    },
    description: {
      ru: 'Абсолютно уникальное кутюрное изделие, спроектированное и отшитое вручную точно по вашим меркам.',
      en: 'A completely unique couture piece designed and sculpted directly on your proportions from sketch to final stitch.',
    },
    image: customDressImg,
    tag: 'Sur-Mesure',
  },
];

export interface LocalizedSilhouette {
  id: string;
  name: Record<SupportedLanguage, string>;
  subtitle: Record<SupportedLanguage, string>;
  description: Record<SupportedLanguage, string>;
  image?: string;
  characteristics: Record<SupportedLanguage, string[]>;
}

export const SILHOUETTES_DATA: LocalizedSilhouette[] = [
  {
    id: 'column',
    name: {
      ru: 'Прямой силуэт / Колонна',
      en: 'Straight silhouette / Column',
    },
    subtitle: {
      ru: 'Чистые линии',
      en: 'Clean lines',
    },
    description: {
      ru: 'Лаконичное платье с узкой, почти прямой юбкой. Мягко следует линиям фигуры и создаёт спокойный, элегантный образ.',
      en: 'A laconic dress with a narrow, almost straight skirt. It softly follows the body’s lines and creates a calm, elegant look.',
    },
    image: columnImg,
    characteristics: {
      ru: ['Прямая юбка', 'Минимум объёма', 'Лаконичный крой'],
      en: ['Straight skirt', 'Minimal volume', 'Laconic cut'],
    },
  },
  {
    id: 'aline',
    name: {
      ru: 'А-силуэт',
      en: 'A-line',
    },
    subtitle: {
      ru: 'Мягкий объём',
      en: 'Soft volume',
    },
    description: {
      ru: 'Прилегающий лиф, подчёркнутая талия и юбка, постепенно расширяющаяся книзу. Сатин создаёт красивые складки и выразительный силуэт.',
      en: 'A fitted bodice, defined waist and a skirt that gradually widens toward the hem. Satin creates beautiful folds and a clear silhouette.',
    },
    image: alineImg,
    characteristics: {
      ru: ['Подчёркнутая талия', 'Расширение от талии', 'Мягкие складки'],
      en: ['Defined waist', 'Flare from the waist', 'Soft folds'],
    },
  },
  {
    id: 'slip_bias',
    name: {
      ru: 'Платье-комбинация / Крой по косой',
      en: 'Slip dress / Bias cut',
    },
    subtitle: {
      ru: 'Плавные линии',
      en: 'Fluid lines',
    },
    description: {
      ru: 'Платье на тонких бретелях с мягко струящейся юбкой. Крой по косой позволяет ткани плавно следовать линиям фигуры.',
      en: 'A thin-strap dress with a softly flowing skirt. The bias cut lets the fabric follow the body’s lines smoothly.',
    },
    image: slipImg,
    characteristics: {
      ru: ['Тонкие бретели', 'Мягкая драпировка', 'Струящаяся юбка'],
      en: ['Thin straps', 'Soft draping', 'Fluid skirt'],
    },
  },
  {
    id: 'coat_dress',
    name: {
      ru: 'Платье-жакет',
      en: 'Coat dress',
    },
    subtitle: {
      ru: 'Структура и элегантность',
      en: 'Structure & elegance',
    },
    description: {
      ru: 'Выразительная линия плеч, лацканы и приталенный крой. Современный вариант для регистрации брака, торжества или особенной встречи.',
      en: 'A clear shoulder line, lapels and a fitted cut. A modern option for a marriage registration, celebration or special meeting.',
    },
    image: coatDressImg,
    characteristics: {
      ru: ['Чёткая линия плеч', 'Лацканы', 'Приталенный крой'],
      en: ['Clear shoulder line', 'Lapels', 'Fitted cut'],
    },
  },
  {
    id: 'mermaid',
    name: {
      ru: 'Русалка / Юбка годе',
      en: 'Mermaid / Godet skirt',
    },
    subtitle: {
      ru: 'Выразительный силуэт',
      en: 'Expressive silhouette',
    },
    description: {
      ru: 'Платье облегает фигуру в области талии и бёдер, затем расширяется ближе к коленям. Выразительный силуэт с эффектной линией юбки.',
      en: 'The dress fits the waist and hips, then flares closer to the knees. An expressive silhouette with a striking skirt line.',
    },
    image: mermaidImg,
    characteristics: {
      ru: ['Прилегание по бёдрам', 'Расширение ближе к коленям', 'Шлейф — по желанию'],
      en: ['Fitted through the hips', 'Flare near the knees', 'Train — optional'],
    },
  },
  {
    id: 'undecided',
    name: {
      ru: 'Пока не определилась',
      en: 'Not decided yet',
    },
    subtitle: {
      ru: 'Дополнительный вариант',
      en: 'Additional option',
    },
    description: {
      ru: 'Хочу попробовать разные силуэты на примерке.',
      en: 'I want to try different silhouettes at the fitting.',
    },
    characteristics: {
      ru: [],
      en: [],
    },
  },
];

export interface LocalizedStyle {
  id: string;
  name: Record<SupportedLanguage, string>;
  subtitle: Record<SupportedLanguage, string>;
  description: Record<SupportedLanguage, string>;
  image: string;
  moodWords: Record<SupportedLanguage, string[]>;
}

export const STYLES_DATA: LocalizedStyle[] = [
  {
    id: 'quiet_luxury',
    name: {
      ru: 'Тихий Люкс и Минимализм',
      en: 'Quiet Luxury Minimalist',
    },
    subtitle: {
      ru: 'Сдержанное Благородство & Чистые Ткани',
      en: 'Understated Nobility & Pure Fabrics',
    },
    description: {
      ru: 'Никаких лишних деталей. Роскошь выражается в безупречной линии, плотности шелка и невидимой ручной обработке.',
      en: 'Zero excess. The luxury resides in the perfection of line, weight of silk, and invisible couture finishing.',
    },
    image: columnImg,
    moodWords: {
      ru: ['Чистая линия', 'Тяжелый шелк', 'Потайные стежки', 'Архитектура'],
      en: ['Pure line', 'Heavy silk', 'Invisible stitches', 'Architectural'],
    },
  },
  {
    id: 'contemporary_romantic',
    name: {
      ru: 'Современная Романтика',
      en: 'Contemporary Romantic',
    },
    subtitle: {
      ru: 'Мягкие Драпировки & Средиземноморская Поэзия',
      en: 'Soft Draping & Mediterranean Poetry',
    },
    description: {
      ru: 'Текучие силуэты с тактильными слоями, мягкими сборками и чарующей игрой естественного солнечного света.',
      en: 'Fluid, poetic silhouettes with tactile layers, gentle gathers, and soft natural light interaction.',
    },
    image: customDressImg,
    moodWords: {
      ru: ['Шифоновые слои', 'Непринужденность', 'Мягкие складки', 'Поэтичный свет'],
      en: ['Chiffon layers', 'Effortless grace', 'Gentle gathers', 'Poetic light'],
    },
  },
  {
    id: 'sculptural_avantgarde',
    name: {
      ru: 'Скульптурный & Архитектурный',
      en: 'Sculptural & Architectural',
    },
    subtitle: {
      ru: 'Геометрическая Строгость & Пропорции',
      en: 'Geometric Rigor & Modern Proportions',
    },
    description: {
      ru: 'Смелые срезы, асимметричный вырез и структурные объемы, вдохновленные средиземноморским модернизмом.',
      en: 'Daring cuts, asymmetrical necklines, and structured volumes influenced by Mediterranean modernism.',
    },
    image: specialOccasionImg,
    moodWords: {
      ru: ['Асимметрия', 'Высокий воротник', 'Структурный объем', 'Высокая мода'],
      en: ['Asymmetry', 'High collar', 'Structured volume', 'High fashion'],
    },
  },
  {
    id: 'sensual_siren',
    name: {
      ru: 'Чувственный с Открытой Спиной',
      en: 'Sensual & Open-Back',
    },
    subtitle: {
      ru: 'Интимная Элегантность & Жидкий Атлас',
      en: 'Intimate Elegance & Fluid Contour',
    },
    description: {
      ru: 'Глубокий открытый вырез на спине, лаконичный фронт и тактильный атлас, струящийся по телу с абсолютной уверенностью.',
      en: 'Deep plunging back, clean front, and tactile liquid satin draping against the skin with effortless confidence.',
    },
    image: eveningImg,
    moodWords: {
      ru: ['Открытая спина', 'Жидкий атлас', 'Деликатный разрез', 'Магнетизм'],
      en: ['Low back', 'Liquid satin', 'Subtle slit', 'Effortless allure'],
    },
  },
];

export interface LocalizedColor {
  id: string;
  name: Record<SupportedLanguage, string>;
  hex: string;
  secondaryHex?: string;
  description: Record<SupportedLanguage, string>;
  paletteMood: Record<SupportedLanguage, string>;
}

export const COLOURS_DATA: LocalizedColor[] = [
  {
    id: 'ivory_warm_milk',
    name: {
      ru: 'Айвори и Теплое Молоко',
      en: 'Ivory & Warm Milk',
    },
    hex: '#F9F7F2',
    secondaryHex: '#EDE8DF',
    description: {
      ru: 'Чистый, мягкий и лучистый оттенок в лучах средиземноморского солнца.',
      en: 'Pure, radiant and luminous under Mediterranean sunlight.',
    },
    paletteMood: {
      ru: 'Вне времени · Основа Свадебного Кутюра',
      en: 'Timeless Bridal & Atelier Core',
    },
  },
  {
    id: 'sand_champagne',
    name: {
      ru: 'Песок и Теплое Шампанское',
      en: 'Sand & Warm Champagne',
    },
    hex: '#E7DFD4',
    secondaryHex: '#D8CCBD',
    description: {
      ru: 'Натуральные минеральные тона теплого прибрежного известняка и дюн.',
      en: 'Muted natural desert and seaside limestone mineral tones.',
    },
    paletteMood: {
      ru: 'Современный Нейтралитет & Глубина',
      en: 'Contemporary Neutral & Subtle Depth',
    },
  },
  {
    id: 'terracotta_rose',
    name: {
      ru: 'Пудровый и Тосканская Терракота',
      en: 'Blush & Tuscan Terracotta',
    },
    hex: '#EAD7CD',
    secondaryHex: '#D7B4A4',
    description: {
      ru: 'Теплые землистые полутона, напоминающие залитые солнцем итальянские виллы.',
      en: 'Warm earthy undertones reminiscent of sun-baked Italian villas.',
    },
    paletteMood: {
      ru: 'Чувственный & Теплый Минеральный',
      en: 'Sensual & Warm Earthy',
    },
  },
  {
    id: 'mediterranean_olive',
    name: {
      ru: 'Приглушенная Олива и Селадон',
      en: 'Muted Olive & Celadon',
    },
    hex: '#D7DDD4',
    secondaryHex: '#BFC8BA',
    description: {
      ru: 'Мягкий органический серебристо-зеленый оттенок средиземноморских оливковых рощ.',
      en: 'Soft organic silver-green honoring Mediterranean flora.',
    },
    paletteMood: {
      ru: 'Редакционный & Утонченный Ботанический',
      en: 'Editorial & Refined Botanical',
    },
  },
  {
    id: 'noir_midnight',
    name: {
      ru: 'Глубокий Ночной Нуар и Эспрессо',
      en: 'Midnight Noir & Deep Espresso',
    },
    hex: '#1E1B18',
    secondaryHex: '#2B2622',
    description: {
      ru: 'Высококонтрастная бархатная глубина для драматической Black Tie элегантности.',
      en: 'High-contrast velvet darkness for dramatic black-tie elegance.',
    },
    paletteMood: {
      ru: 'Скульптурный Black Tie & Высокий Кутюр',
      en: 'Sculptural Black Tie & Sharp Couture',
    },
  },
];

export interface LocalizedBudget {
  id: string;
  range: string;
  tier: Record<SupportedLanguage, string>;
  prices: Record<SupportedLanguage, string[]>;
  description: Record<SupportedLanguage, string>;
  includes: Record<SupportedLanguage, string[]>;
  note: Record<SupportedLanguage, string>;
}

export const BUDGET_TIERS_DATA: LocalizedBudget[] = [
  {
    id: 'tier_signature',
    range: 'MARGO Signature',
    tier: {
      ru: 'MARGO Signature · Наша коллекция',
      en: 'MARGO Signature · Our Collection',
    },
    prices: {
      ru: ['Вечерние платья: R4 500–R9 000', 'Свадебные платья: R10 000–R18 000'],
      en: ['Evening dresses: R4 500–R9 000', 'Bridal dresses: R10 000–R18 000'],
    },
    description: {
      ru: 'Фирменные модели MARGO из сатина и других выбранных тканей — чистые линии, женственные силуэты и выразительные драпировки.',
      en: 'Signature MARGO designs in satin and other selected fabrics — clean lines, feminine silhouettes and expressive draping.',
    },
    includes: {
      ru: [
        'Выбор модели из коллекции MARGO.',
        'Подбор доступной ткани и цвета.',
        'Обсуждение посадки и возможных изменений.',
        'Готовое платье или изготовление по выбранной модели.',
      ],
      en: [
        'Choosing a design from the MARGO collection.',
        'Selecting available fabric and colour.',
        'Discussing fit and possible adjustments.',
        'A ready dress or made-to-order from a chosen model.',
      ],
    },
    note: {
      ru: 'Наличие, возможность изменений и стоимость подгонки уточняются для конкретного платья.',
      en: 'Availability, possible alterations and fitting costs are confirmed for each specific dress.',
    },
  },
  {
    id: 'tier_bespoke',
    range: 'MARGO Bespoke',
    tier: {
      ru: 'MARGO Bespoke · Индивидуальный дизайн',
      en: 'MARGO Bespoke · Individual Design',
    },
    prices: {
      ru: ['Вечерние платья: R12 000–R25 000', 'Свадебные платья: R18 000–R35 000'],
      en: ['Evening dresses: R12 000–R25 000', 'Bridal dresses: R18 000–R35 000'],
    },
    description: {
      ru: 'Платье, разработанное с учётом вашего события, фигуры и личного стиля.',
      en: 'A dress developed around your event, figure and personal style.',
    },
    includes: {
      ru: [
        'Обсуждение идеи и разработка дизайна.',
        'Подбор силуэта, декольте, рукавов и деталей.',
        'Выбор тканей в рамках согласованного бюджета.',
        'Изготовление по меркам и примерки по плану заказа.',
      ],
      en: [
        'Discussing the idea and developing the design.',
        'Choosing silhouette, neckline, sleeves and details.',
        'Selecting fabrics within the agreed budget.',
        'Made-to-measure production and fittings as planned.',
      ],
    },
    note: {
      ru: 'Дизайн, состав работ и сроки согласовываются индивидуально.',
      en: 'Design, scope of work and timelines are agreed individually.',
    },
  },
  {
    id: 'tier_couture',
    range: 'MARGO Couture',
    tier: {
      ru: 'MARGO Couture · Эксклюзивный проект',
      en: 'MARGO Couture · Exclusive Project',
    },
    prices: {
      ru: ['Ориентировочно R30 000–R60 000+', 'По индивидуальному запросу.'],
      en: ['Approximately R30 000–R60 000+', 'By individual request.'],
    },
    description: {
      ru: 'Для особенного образа со сложной конструкцией, выразительными деталями и тщательно продуманной отделкой.',
      en: 'For a special look with complex construction, expressive details and carefully considered finishing.',
    },
    includes: {
      ru: [
        'Индивидуальная разработка модели.',
        'Работа с объёмом, драпировками и конструкцией.',
        'Подбор тканей и декоративных элементов.',
        'Макет и дополнительные примерки при необходимости.',
      ],
      en: [
        'Individual model development.',
        'Work with volume, draping and construction.',
        'Selecting fabrics and decorative elements.',
        'A toile and additional fittings when needed.',
      ],
    },
    note: {
      ru: 'Возможность реализации, материалы, отделка и стоимость определяются после обсуждения проекта.',
      en: 'Feasibility, materials, finishing and cost are defined after discussing the project.',
    },
  },
];

export interface LocalizedPriority {
  id: string;
  label: Record<SupportedLanguage, string>;
  description: Record<SupportedLanguage, string>;
}

export const PRIORITIES_DATA: LocalizedPriority[] = [
  {
    id: 'fabric_quality',
    label: {
      ru: 'Благородные Ткани и Тактильность',
      en: 'Noble Fabrics & Tactile Luxury',
    },
    description: {
      ru: 'Чувственное прикосновение 100% плотного шелка, крепдешина из Комо и чистой органзы.',
      en: 'The sensual touch of 100% heavy silk, Como crêpe, and pure organza.',
    },
  },
  {
    id: 'architectural_silhouette',
    label: {
      ru: 'Архитектурный Крой и Точность Линий',
      en: 'Architectural Cut & Precision Line',
    },
    description: {
      ru: 'Безупречная скульптурная осанка, чистые рельефные линии и выразительный силуэт.',
      en: 'Flawless geometric posture, clean seamlines, and striking profile.',
    },
  },
  {
    id: 'effortless_comfort',
    label: {
      ru: 'Комфорт и Естественная Свобода Движений',
      en: 'Comfort & Fluid Ease of Movement',
    },
    description: {
      ru: 'Свобода естественно двигаться, танцевать и дышать без жесткого дискомфорта.',
      en: 'Freedom to walk, dance, and breathe naturally without rigid discomfort.',
    },
  },
  {
    id: 'timeless_elegance',
    label: {
      ru: 'Вне Времени: Долговечность Стиля',
      en: 'Timelessness Over Passing Trends',
    },
    description: {
      ru: 'Образ, который будет выглядеть так же величественно и чисто через 30 лет.',
      en: 'A look that will appear just as striking and pure in 30 years.',
    },
  },
  {
    id: 'hand_craftsmanship',
    label: {
      ru: 'Артизанальное Ручное Мастерство',
      en: 'Artisanal Hand-Finishing',
    },
    description: {
      ru: 'Невидимые ручные подгибы, внутренняя корсетная лента и ювелирная точность швов.',
      en: 'Invisible hand-stitched hems, bespoke interior corsetry, and artisanal details.',
    },
  },
];

export const TIMELINE_OPTIONS_DATA = [
  {
    id: 'under1m',
    label: { ru: 'Меньше месяца', en: 'Less than a month' },
  },
  {
    id: '1-2m',
    label: { ru: '1–2 месяца', en: '1–2 months' },
  },
  {
    id: '3-5m',
    label: { ru: '3–5 месяцев', en: '3–5 months' },
  },
  {
    id: '6m+',
    label: { ru: '6 месяцев и более', en: '6 months or more' },
  },
  {
    id: 'undecided',
    label: { ru: 'Дата пока не определена', en: 'Date not yet decided' },
  },
];

export const EVENT_SETTINGS_DATA = [
  {
    id: 'coast',
    label: { ru: 'На побережье / На пляже', en: 'Coastal / Beach' },
  },
  {
    id: 'garden',
    label: { ru: 'В саду / На открытом воздухе', en: 'Garden / Outdoors' },
  },
  {
    id: 'wine_estate',
    label: { ru: 'На винной ферме / В загородном поместье', en: 'Wine farm / Country estate' },
  },
  {
    id: 'hotel',
    label: { ru: 'В отеле / Ресторане / Банкетном зале', en: 'Hotel / Restaurant / Banquet hall' },
  },
  {
    id: 'black_tie',
    label: { ru: 'Официальный вечер / Black Tie', en: 'Formal evening / Black Tie' },
  },
  {
    id: 'family',
    label: { ru: 'Небольшое семейное торжество', en: 'Small family celebration' },
  },
  {
    id: 'other',
    label: { ru: 'Другой вариант', en: 'Other' },
  },
  {
    id: 'undecided',
    label: { ru: 'Место пока не выбрано', en: 'Venue not chosen yet' },
  },
];

/** Derive timeline label from an exact event date so we don't ask twice. */
export function timelineLabelFromDate(dateStr: string, lang: SupportedLanguage): string {
  if (!dateStr) return '';
  const event = new Date(`${dateStr}T12:00:00`);
  if (Number.isNaN(event.getTime())) return '';

  const now = new Date();
  now.setHours(12, 0, 0, 0);
  const days = Math.ceil((event.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const months = days / 30.4375;

  let id: string;
  if (months < 1) id = 'under1m';
  else if (months < 3) id = '1-2m';
  else if (months < 6) id = '3-5m';
  else id = '6m+';

  return TIMELINE_OPTIONS_DATA.find((t) => t.id === id)?.label[lang] ?? '';
}

export const ATELIER_LOCATIONS_DATA = [
  {
    id: 'south_africa',
    name: { ru: 'Южная Африка', en: 'South Africa' },
    type: 'in_person',
  },
  {
    id: 'online',
    name: { ru: 'Онлайн', en: 'Online' },
    type: 'virtual',
  },
];

export const FIT_PREFERENCES_DATA = [
  {
    id: 'sculpted',
    title: { ru: 'Скульптурная талия и осанка', en: 'Sculpted Waist & Structure' },
    desc: {
      ru: 'Анатомическая внутренняя поддержка, формирующая осанку, оставаясь дышащей и легкой.',
      en: 'Contoured internal support shaping posture while remaining breathable.',
    },
  },
  {
    id: 'fluid',
    title: { ru: 'Текучая пластика и крой по косой', en: 'Fluid & Liquid Bias Ease' },
    desc: {
      ru: 'Неструктурированный струящийся шелк, следующий за пластикой тела без жестких косточек.',
      en: 'Unstructured liquid drape following body motion without restrictive boning.',
    },
  },
  {
    id: 'tailored',
    title: { ru: 'Архитектурный четкий тейлоринг', en: 'Architectural Tailored Fit' },
    desc: {
      ru: 'Четкая линия плеч и чистое вертикальное падение ткани, соединяющие строгость и легкость.',
      en: 'Crisp shoulder lines and clean vertical drape balancing structure and lightness.',
    },
  },
];

export const INSPIRATION_TAGS_DATA = {
  ru: [
    'Архитектурный вырез-лодочка',
    'Низкая чувственная спина',
    'Струящееся платье-комбинация',
    'Тяжелый шелковый креп (Комо)',
    'Съемный шелковый шлейф',
    'Микроплиссированный шифон',
    'Минималистичное платье-пальто',
    'Мягкая драпировка-водопад',
  ],
  en: [
    'Architectural Boatneck',
    'Low Sensual Back',
    'Fluid Bias Slip',
    'Como Heavy Silk Crêpe',
    'Detachable Silk Train',
    'Micro-Pleated Chiffon',
    'Minimalist Tailored Coat',
    'Soft Draped Cowl',
  ],
};

export const SIZES_DATA = [
  'EU 34 (RU 40 / US 2)',
  'EU 36 (RU 42 / US 4)',
  'EU 38 (RU 44 / US 6)',
  'EU 40 (RU 46 / US 8)',
  'EU 42 (RU 48 / US 10)',
  'EU 44 (RU 50 / US 12)',
  'Индивидуальный пошив (Bespoke)',
];

// Helper getters for backwards compatibility
export const getOccasions = (lang: SupportedLanguage) =>
  OCCASIONS_DATA.map((o) => ({
    id: o.id,
    title: o.title[lang],
    subtitle: o.subtitle[lang],
    description: o.description[lang],
    image: o.image,
    tag: o.tag,
  }));

export const getSilhouettes = (lang: SupportedLanguage) =>
  SILHOUETTES_DATA.map((s) => ({
    id: s.id,
    name: s.name[lang],
    subtitle: s.subtitle[lang],
    description: s.description[lang],
    image: s.image,
    characteristics: s.characteristics[lang],
  }));

export const getStyles = (lang: SupportedLanguage) =>
  STYLES_DATA.map((s) => ({
    id: s.id,
    name: s.name[lang],
    subtitle: s.subtitle[lang],
    description: s.description[lang],
    image: s.image,
    moodWords: s.moodWords[lang],
  }));

export const getColours = (lang: SupportedLanguage) =>
  COLOURS_DATA.map((c) => ({
    id: c.id,
    name: c.name[lang],
    hex: c.hex,
    secondaryHex: c.secondaryHex,
    description: c.description[lang],
    paletteMood: c.paletteMood[lang],
  }));

export const getBudgetTiers = (lang: SupportedLanguage) =>
  BUDGET_TIERS_DATA.map((b) => ({
    id: b.id,
    range: b.range,
    tier: b.tier[lang],
    prices: b.prices[lang],
    description: b.description[lang],
    includes: b.includes[lang],
    note: b.note[lang],
  }));

export const getPriorities = (lang: SupportedLanguage) =>
  PRIORITIES_DATA.map((p) => ({
    id: p.id,
    label: p.label[lang],
    description: p.description[lang],
  }));

export const getTimelineOptions = (lang: SupportedLanguage) =>
  TIMELINE_OPTIONS_DATA.map((t) => ({
    id: t.id,
    label: t.label[lang],
  }));

export const getEventSettings = (lang: SupportedLanguage) =>
  EVENT_SETTINGS_DATA.map((s) => ({
    id: s.id,
    label: s.label[lang],
  }));

export const getAtelierLocations = (lang: SupportedLanguage) =>
  ATELIER_LOCATIONS_DATA.map((l) => ({
    id: l.id,
    name: l.name[lang],
    type: l.type,
  }));

export const getFitPreferences = (lang: SupportedLanguage) =>
  FIT_PREFERENCES_DATA.map((f) => ({
    id: f.id,
    title: f.title[lang],
    desc: f.desc[lang],
  }));

// Default exports in Russian
export const OCCASIONS = getOccasions('ru');
export const SILHOUETTES = getSilhouettes('ru');
export const STYLES = getStyles('ru');
export const COLOURS = getColours('ru');
export const BUDGET_TIERS = getBudgetTiers('ru');
export const PRIORITIES = getPriorities('ru');
export const TIMELINE_OPTIONS = getTimelineOptions('ru');
export const ATELIER_LOCATIONS = getAtelierLocations('ru');
export const FIT_PREFERENCES = getFitPreferences('ru');

