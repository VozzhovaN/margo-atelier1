import {
  OccasionType,
} from '../types';
import { SupportedLanguage } from './translations';

// Campaign Assets
import bridalImg from '../assets/images/margo_bridal_editorial_1789726696806.jpg';
import eveningImg from '../assets/images/margo_evening_editorial_1789726710943.jpg';
import specialOccasionImg from '../assets/images/margo_special_occasion_1789726725864.jpg';
import customDressImg from '../assets/images/margo_custom_dress_1789726740808.jpg';
import columnImg from '../assets/images/margo_silhouette_column_1789726757308.jpg';
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
  image: string;
  characteristics: Record<SupportedLanguage, string[]>;
}

export const SILHOUETTES_DATA: LocalizedSilhouette[] = [
  {
    id: 'architectural_column',
    name: {
      ru: 'Архитектурная Колонна',
      en: 'Architectural Column',
    },
    subtitle: {
      ru: 'Статусные и Чистые Геометрические Линии',
      en: 'Statuesque & Pure Geometric Lines',
    },
    description: {
      ru: 'Лаконичный вертикальный крой в пол, визуально вытягивающий осанку, со скрытым разрезом или шлейфом.',
      en: 'Clean, floor-length vertical drape sculpted to elongate posture with subtle rear slit or detached train.',
    },
    image: columnImg,
    characteristics: {
      ru: ['Вытягивающая вертикаль', 'Тяжелый шелковый креп', 'Лаконичный подол'],
      en: ['Elongating verticality', 'Heavyweight silk crêpe', 'Clean minimalist hem'],
    },
  },
  {
    id: 'ethereal_aline',
    name: {
      ru: 'Воздушный Драпированный А-Силуэт',
      en: 'Ethereal Draped A-Line',
    },
    subtitle: {
      ru: 'Летящий Объем & Женственная Пластика',
      en: 'Floating Volume & Feminine Movement',
    },
    description: {
      ru: 'Мягкий скульптурный корсетный лиф со струящимися слоями шифона или органзы, оживающими в движении.',
      en: 'Soft structural bodice with layered fluid chiffon or organza that catches natural breeze and sunlight.',
    },
    image: customDressImg,
    characteristics: {
      ru: ['Невесомая шелковая органза', 'Свободное парящее движение', 'Скульптурная естественная талия'],
      en: ['Airy silk organza', 'Floating movement', 'Sculpted natural waist'],
    },
  },
  {
    id: 'sensual_bias_slip',
    name: {
      ru: 'Чувственный Slip по Косой',
      en: 'Sensual Bias-Cut Slip',
    },
    subtitle: {
      ru: 'Жидкий Шелк & Эстетика 90-х',
      en: 'Liquid Fluidity & 90s Couture Ease',
    },
    description: {
      ru: 'Крой по косой нити для идеального мягкого облегания тела, с глубокой открытой спиной и тонкими бретелями.',
      en: 'Cut on the true fabric bias to mold softly over curves, featuring low open back and effortless shoulder straps.',
    },
    image: eveningImg,
    characteristics: {
      ru: ['Текучая пластика шелка', 'Скульптурная открытая спина', 'Двусторонний шелковый атлас'],
      en: ['Diagonal liquid drape', 'Sculptural open back', 'Double-faced silk satin'],
    },
  },
  {
    id: 'tailored_couture_suit',
    name: {
      ru: 'Кутюрное Платье-Жакет / Смокинг',
      en: 'Tailored Coat Dress / Tux',
    },
    subtitle: {
      ru: 'Современный Тейлоринг & Решительные Линии',
      en: 'Sharp Modern Tailoring & Decisive Lines',
    },
    description: {
      ru: 'Структурированные плечи, ручные вспушные швы лацканов и внутренний корсетный пояс из шелкового репса.',
      en: 'Structured shoulders, hand-stitched lapels and corseted internal waist balancing feminine authority with luxury.',
    },
    image: specialOccasionImg,
    characteristics: {
      ru: ['Четкая линия плеч', 'Внутренний репсовый корсет', 'Шелк с добавлением шерсти'],
      en: ['Sharp shoulder line', 'Concealed silk grosgrain waist', 'Raw silk & wool blend'],
    },
  },
  {
    id: 'sculptural_mermaid',
    name: {
      ru: 'Скульптурная Русалка / Годе',
      en: 'Sculptural Trumpet / Mermaid',
    },
    subtitle: {
      ru: 'Прецизионный Анатомический Контур',
      en: 'Precision Tailored Contour',
    },
    description: {
      ru: 'Точно посаженный лиф с мягким расширением выше колена, создающий статусные пропорции высокого кутюра.',
      en: 'Close-fitting bodice gently fluting outward above the knee, creating statuesque dramatic proportions.',
    },
    image: bridalImg,
    characteristics: {
      ru: ['Анатомический контур', 'Архитектурные рельефы', 'Деликатный шлейф'],
      en: ['Contoured silhouette', 'Architectural seamlines', 'Subtle flared train'],
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
  description: Record<SupportedLanguage, string>;
  includes: Record<SupportedLanguage, string[]>;
}

export const BUDGET_TIERS_DATA: LocalizedBudget[] = [
  {
    id: 'tier_signature',
    range: '€2,500 – €4,000',
    tier: {
      ru: 'Atelier Essential · Базовый Кутюр',
      en: 'Atelier Essential',
    },
    description: {
      ru: 'Индивидуальная адаптация знаковых архивных силуэтов MARGO из благородного шелкового крепа.',
      en: 'Made-to-measure adaptation of signature MARGO silhouette archives with noble silk crêpe.',
    },
    includes: {
      ru: [
        'Выбор из знаковых силуэтов архива ателье',
        'Итальянский шелковый креп или тяжелый крепдешин',
        '2 индивидуальные примерки с подгонкой по осанке',
        'Фирменный чехол ателье и набор для ухода за шелком',
      ],
      en: [
        'Selection of signature silhouettes',
        'Italian silk crêpe or heavy crêpe de chine',
        '2 bespoke fitting sessions',
        'Standard atelier garment bag & care kit',
      ],
    },
  },
  {
    id: 'tier_couture',
    range: '€4,000 – €7,000',
    tier: {
      ru: 'Couture Bespoke · Индивидуальный Крой',
      en: 'Couture Bespoke',
    },
    description: {
      ru: 'Индивидуальная линия декольте, драпировки и подбор эксклюзивных отрезов шелка с фабрик озера Комо.',
      en: 'Custom neckline, individualized drapery, and dedicated fabric sourcing from Lake Como mills.',
    },
    includes: {
      ru: [
        'Индивидуальный архитектурный вырез и конструкция шлейфа',
        'Премиальный шелковый атлас дюшес и органза (Комо)',
        '3 примерки, включая черновой хлопковый макет (toile)',
        'Личное ведение проекта креативным директором ателье',
      ],
      en: [
        'Customized architectural neckline & train',
        'Premium Como double-faced satin & organza',
        '3 precision fittings including cotton toile prototype',
        'Dedicated atelier design director guidance',
      ],
    },
  },
  {
    id: 'tier_haute',
    range: '€7,000 – €12,000',
    tier: {
      ru: 'Haute Couture Sur-Mesure · Эксклюзив',
      en: 'Haute Couture Sur-Mesure',
    },
    description: {
      ru: 'Полностью оригинальное изделие, рожденное на вашей фигуре, с тончайшей ручной отделкой швов.',
      en: 'Entirely original design sculpted on client proportions with artisanal hand-finished craftsmanship.',
    },
    includes: {
      ru: [
        'Полностью индивидуальный авторский эскиз и макет',
        'Эксклюзивные винтажные полотна или шелк индивидуального крашения',
        '4-5 примерок в закрытом салоне ателье',
        'Возможность выезда главного кутюрье на площадку в день события',
      ],
      en: [
        'Completely bespoke one-off design sketch & toile',
        'Exclusive vintage textile or custom dyed silks',
        '4-5 dedicated atelier fitting sessions',
        'Atelier Master Couturier direct styling on event day option',
      ],
    },
  },
  {
    id: 'tier_atelier_private',
    range: '€12,000+',
    tier: {
      ru: 'Private Wardrobe · Частная Капсула',
      en: 'Private Wardrobe & High Bespoke',
    },
    description: {
      ru: 'Капсульный гардероб из нескольких изделий, закрытые салонные примерки с шампанским и кутюрная вышивка.',
      en: 'Multi-look wedding/gala capsule, private salon fittings, and bespoke embroidery/draping.',
    },
    includes: {
      ru: [
        'Комплекс из нескольких образов (Платье + Вечерний кейп/пальто)',
        'Ткани индивидуального ткачества и ручные французские подгибы',
        'VIP-примерки в закрытом салоне с сервисом консьержа',
        'Международные выездные примерки (Милан / Париж / Дубай)',
      ],
      en: [
        'Multi-piece capsule (Gown + Reception or Coat)',
        'Custom loom textile weaving & hand-rolled hems',
        'Private salon appointments with champagne service',
        'International fitting availability (Milan / Paris / Dubai)',
      ],
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
    id: '1-2m',
    label: { ru: '1 – 2 Месяца', en: '1 – 2 Months' },
    note: { ru: 'Приоритетный график ателье', en: 'Priority Atelier Schedule' },
  },
  {
    id: '3-5m',
    label: { ru: '3 – 5 Месяцев', en: '3 – 5 Months' },
    note: { ru: 'Идеальный кутюрный срок', en: 'Ideal Couture Timeline' },
  },
  {
    id: '6-9m',
    label: { ru: '6 – 9 Месяцев', en: '6 – 9 Months' },
    note: { ru: 'Размеренный индивидуальный процесс', en: 'Unrushed Bespoke Process' },
  },
  {
    id: '10m+',
    label: { ru: '10+ Месяцев', en: '10+ Months' },
    note: { ru: 'Заблаговременная подготовка', en: 'Advance Bridal Planning' },
  },
];

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
    description: b.description[lang],
    includes: b.includes[lang],
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
    note: t.note[lang],
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

