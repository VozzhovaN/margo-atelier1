export type SupportedLanguage = 'ru' | 'en';

export interface TranslationDict {
  brandName: string;
  brandTagline: string;
  badge: string;
  appTitle: string;
  appIntro: string[];
  stats: {
    time: { title: string; desc: string };
    ai: { title: string; desc: string };
    privacy: { title: string; desc: string };
  };
  startBtn: string;
  citiesFooter: string;
  citiesFooterSub: string;

  // Header
  atelierDeskBtn: string;
  clientAppBtn: string;
  stepIndicator: (current: number, total: number) => string;
  headerSub: string;

  // Step Occasion
  step01Badge: string;
  step01Title: string;
  step01TitleItalic: string;
  step01Subtitle: string;
  step01Continue: string;

  // Step Date
  step02Badge: string;
  step02Title: string;
  step02TitleItalic: string;
  step02Subtitle: string;
  step02DateLabel: string;
  step02DatePlaceholder: string;
  step02TimelineLabel: string;
  step02TimelineNote: string;
  step02TimelineAutoHint: string;
  step02SettingLabel: string;
  step02SettingHint: string;
  step02OtherLabel: string;
  step02OtherPlaceholder: string;
  step02CityLabel: string;
  step02CityPlaceholder: string;
  step02Continue: string;
  step02PageFooterBrand: string;
  step02PageFooterPlace: string;
  step02PageFooterMode: string;

  // Step Budget
  step03Badge: string;
  step03Title: string;
  step03TitleItalic: string;
  step03Subtitle: string;
  step03Disclaimer: string;
  step03IncludedBadge: string;
  step03Continue: string;
  step03SelectHint: string;
  step03PageFooterBrand: string;
  step03PageFooterPlace: string;
  step03PageFooterMode: string;

  // Step Silhouette
  step04Badge: string;
  step04Title: string;
  step04TitleItalic: string;
  step04Subtitle: string;
  step04Note: string;
  step04Continue: string;
  step04SelectHint: string;
  step04PageFooterBrand: string;
  step04PageFooterPlace: string;
  step04PageFooterMode: string;
  step04PageFooterTag: string;

  // Step Style
  step05Badge: string;
  step05Title: string;
  step05TitleItalic: string;
  step05Subtitle: string;
  step05Continue: string;

  // Step Colours
  step06Badge: string;
  step06Title: string;
  step06TitleItalic: string;
  step06Subtitle: string;
  step06CustomLabel: string;
  step06CustomPlaceholder: string;
  step06Continue: string;

  // Step Measurements
  step07Badge: string;
  step07Title: string;
  step07TitleItalic: string;
  step07Subtitle: string;
  step07HeightLabel: string;
  step07HeightPlaceholder: string;
  step07SizeLabel: string;
  step07SizeDefault: string;
  step07FitLabel: string;
  step07NotesLabel: string;
  step07NotesPlaceholder: string;
  step07Continue: string;

  // Step References
  step08Badge: string;
  step08Title: string;
  step08TitleItalic: string;
  step08Subtitle: string;
  step08UploadTitle: (count: number) => string;
  step08UploadSubtitle: string;
  step08UploadLimits: string;
  step08CuratedLabel: string;
  step08LinkNotesLabel: string;
  step08LinkNotesPlaceholder: string;
  step08Continue: string;

  // Step Priorities
  step09Badge: string;
  step09Title: string;
  step09TitleItalic: string;
  step09Subtitle: string;
  step09Continue: (count: number) => string;

  // Step Contacts
  step10Badge: string;
  step10Title: string;
  step10TitleItalic: string;
  step10Subtitle: string;
  step10NameLabel: string;
  step10NamePlaceholder: string;
  step10TgLabel: string;
  step10TgHint: string;
  step10WaLabel: string;
  step10VenueLabel: string;
  step10LangLabel: string;
  step10GenerateBtn: string;

  // Summary (Proposal / Досье)
  summaryRef: string;
  summaryTitle: string;
  summaryTitleItalic: string;
  summaryPreparedFor: (name: string, location: string) => string;
  summaryTransmittedBannerTitle: string;
  summaryTransmittedBannerText: string;
  aestheticDirection: string;
  specTimeline: string;
  specProportions: string;
  specFit: string;
  specVenue: string;
  selectedPalette: string;
  clientPriorities: string;
  clientReferencesTitle: (count: number) => string;

  // AI Style Direction Card
  aiGeminiBadge: string;
  aiDirectionTitle: string;
  aiRegenerate: string;
  aiLoadingTitle: string;
  aiLoadingSub: string;
  aiAestheticVision: string;
  aiRecommendedFabrics: string;
  aiArchitecturalDetails: string;
  aiConsultationFocus: string;

  // CTAs in Proposal
  btnBookWhatsapp: string;
  btnSendTelegram: string;
  btnSending: string;
  btnSent: string;
  btnShare: string;
  btnCopied: string;
  btnDashboard: string;
  btnRestart: string;

  // Dashboard
  dashConsoleBadge: string;
  dashTitle: string;
  dashBackBtn: string;
  dashTotal: string;
  dashNew: string;
  dashScheduled: string;
  dashTgSync: string;
  dashConnected: string;
  dashSearchPlaceholder: string;
  dashNoDossiers: string;
  dashNoDossiersSub: string;
  dashFilterAll: string;
  dashFilterNew: string;
  dashFilterScheduled: string;
  dashFilterFitting: string;
  statusNew: string;
  statusContacted: string;
  statusScheduled: string;
  statusFitting: string;
  statusCompleted: string;

  // Footer
  footerSlogan: string;
  footerWords: string[];
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDict> = {
  ru: {
    brandName: 'MARGO Bridal & Special Occasion',
    brandTagline: 'Свадебные и вечерние платья · Ткани · Аксессуары',
    badge: 'Подбор образа',
    appTitle: 'Ваш образ для особенного события',
    appIntro: [
      'Свадебные и вечерние платья, красивые ткани и аксессуары — в MARGO Bridal & Special Occasion в Onrus, Western Cape, South Africa.',
      'Этот короткий опрос поможет вам определиться с пожеланиями, а нам — подготовиться к вашей первой встрече.',
      'Расскажите о событии и выберите образы, которые вам нравятся. На консультации мы обсудим подходящие силуэты, ткани и детали — для выбора готового платья или заказа по выбранной модели.',
      'Встречи в ателье — по предварительной записи. Онлайн-консультации также доступны.',
    ],
    stats: {
      time: { title: 'Короткий опрос', desc: 'Ваше событие и пожелания' },
      ai: { title: 'Ваш стиль', desc: 'Силуэты, ткани и детали' },
      privacy: { title: 'Личная встреча', desc: 'В ателье или онлайн' },
    },
    startBtn: 'Начать подбор образа',
    citiesFooter: 'Onrus · Western Cape · South Africa',
    citiesFooterSub: 'В ателье и онлайн',

    atelierDeskBtn: 'Консоль Ателье',
    clientAppBtn: 'Досье Клиента',
    stepIndicator: (current, total) => `Шаг ${String(current).padStart(2, '0')} из ${String(total).padStart(2, '0')}`,
    headerSub: 'Консультация',

    step01Badge: 'Шаг 01 · Повод и Формат',
    step01Title: 'Ваш особенный',
    step01TitleItalic: 'повод',
    step01Subtitle: 'Каждое кутюрное изделие начинается с контекста атмосферы и света предстоящего события.',
    step01Continue: 'Перейти к Дате и Атмосфере',

    step02Badge: 'Шаг 02 · Ваше событие',
    step02Title: 'Когда и где состоится',
    step02TitleItalic: 'ваше событие?',
    step02Subtitle:
      'Расскажите о дате и месте проведения. Это поможет нам предложить подходящий образ и обсудить время на выбор платья, возможную подгонку или изготовление на заказ.',
    step02DateLabel: 'Дата события — если уже известна',
    step02DatePlaceholder: 'Выберите дату',
    step02TimelineLabel: 'Сколько времени осталось до события?',
    step02TimelineNote: 'Возможность заказа и сроки изготовления уточняются на консультации.',
    step02TimelineAutoHint: 'Срок рассчитан по выбранной дате',
    step02SettingLabel: 'Где и в каком формате пройдёт событие?',
    step02SettingHint: 'Выберите подходящие варианты.',
    step02OtherLabel: 'Расскажите коротко о месте или формате события.',
    step02OtherPlaceholder: 'Кратко опишите место или формат',
    step02CityLabel: 'В каком городе или регионе состоится событие?',
    step02CityPlaceholder: 'Укажите город или регион.',
    step02Continue: 'Далее: ваш бюджет и пожелания',
    step02PageFooterBrand: 'MARGO Bridal & Special Occasion',
    step02PageFooterPlace: 'Onrus, Western Cape, South Africa',
    step02PageFooterMode: 'В ателье и онлайн',

    step03Badge: 'Шаг 03 · Формат и бюджет',
    step03Title: 'Какой вариант',
    step03TitleItalic: 'вам ближе?',
    step03Subtitle:
      'Выберите направление и комфортный ориентир бюджета. Это поможет нам подготовить подходящие предложения к консультации.',
    step03Disclaimer:
      'Указанные цены являются предварительными ориентирами. Итоговая стоимость зависит от модели, ткани, конструкции и отделки и согласовывается до начала изготовления. Все цены указываются в южноафриканских рандах — ZAR / R.',
    step03IncludedBadge: 'Что входит:',
    step03Continue: 'Перейти к Выбору Силуэта',
    step03SelectHint: 'Выберите вариант',
    step03PageFooterBrand: 'MARGO Bridal & Special Occasion',
    step03PageFooterPlace: 'Onrus, Western Cape, South Africa',
    step03PageFooterMode: 'Консультации в ателье и онлайн.',

    step04Badge: 'Шаг 04 · Выбор силуэта',
    step04Title: 'Какой силуэт',
    step04TitleItalic: 'вам нравится?',
    step04Subtitle:
      'Выберите один или несколько вариантов, которые вам близки. На примерке мы поможем уточнить форму, посадку и детали с учётом ваших пожеланий.',
    step04Note:
      'Изображения помогают выбрать направление стиля. Ткань, цвет, детали и возможность изготовления обсуждаются на консультации.',
    step04Continue: 'Далее: стиль и детали',
    step04SelectHint: 'Выберите силуэт',
    step04PageFooterBrand: 'MARGO Bridal & Special Occasion',
    step04PageFooterPlace: 'Onrus, Western Cape, South Africa',
    step04PageFooterMode: 'В ателье и онлайн',
    step04PageFooterTag: 'Платья · Ткани · Аксессуары',

    step05Badge: 'Шаг 05 · Эстетический Дух',
    step05Title: 'Стилевой',
    step05TitleItalic: 'характер изделия',
    step05Subtitle: 'Определение эмоциональной тональности, легкости и настроения вашего кутюра.',
    step05Continue: 'Перейти к Палитре Тканей',

    step06Badge: 'Шаг 06 · Средиземноморские Оттенки',
    step06Title: 'Благородная палитра',
    step06TitleItalic: 'натурального шелка',
    step06Subtitle: 'Теплые минералы, невыбеленный молочный шелк и мягкие тени. Выберите до 2 оттенков.',
    step06CustomLabel: 'Пожелание по индивидуальному оттенку (по желанию)',
    step06CustomPlaceholder: 'Например, приглушенный жемчужный с золотистым отливом или под тон фамильного кружева...',
    step06Continue: 'Перейти к Пропорциям и Посадке',

    step07Badge: 'Шаг 07 · Пропорции и Ощущения',
    step07Title: 'Как вы хотите себя',
    step07TitleItalic: 'чувствовать?',
    step07Subtitle: 'Кутюр ателье создается вокруг вашей естественной осанки, а не шаблонных стандартов.',
    step07HeightLabel: 'Примерный рост',
    step07HeightPlaceholder: 'например, 172 см',
    step07SizeLabel: 'Ориентировочный размер одежды',
    step07SizeDefault: 'Выберите размер...',
    step07FitLabel: 'Желаемое ощущение посадки',
    step07NotesLabel: 'Личные пожелания для закройщика и кутюрье (по желанию)',
    step07NotesPlaceholder: 'Например, люблю открытую спину, важна свобода движений в танце, акцент на талии...',
    step07Continue: 'Перейти к Референсам',

    step08Badge: 'Шаг 08 · Визуальные Референсы',
    step08Title: 'Мудборд и',
    step08TitleItalic: 'вдохновение',
    step08Subtitle: 'Загрузите до 3 фотографий, эскизов или прикрепите ссылку на ваш мудборд.',
    step08UploadTitle: (count) => `Загрузить изображения (${count}/3)`,
    step08UploadSubtitle: 'Перетащите сюда или выберите из галереи устройства.',
    step08UploadLimits: 'JPG, PNG, WebP до 8 МБ',
    step08CuratedLabel: 'Или добавьте фирменные кутюрные акценты MARGO',
    step08LinkNotesLabel: 'Ссылка на Pinterest / Instagram или заметки о стиле',
    step08LinkNotesPlaceholder: 'Вставьте ссылку на доску или опишите элементы, которые вам близки...',
    step08Continue: 'Перейти к Приоритетам',

    step09Badge: 'Шаг 09 · Творческие Приоритеты',
    step09Title: 'Что для вас',
    step09TitleItalic: 'важнее всего?',
    step09Subtitle: 'Подскажите нашему главному кутюрье главные ценности изделия. Выберите от 1 до 3 пунктов.',
    step09Continue: (count) => count > 0 ? `Продолжить (выбрано: ${count})` : 'Выберите хотя бы 1 приоритет',

    step10Badge: 'Шаг 10 · Досье Клиента',
    step10Title: 'Как к вам',
    step10TitleItalic: 'обращаться?',
    step10Subtitle: 'Ваши контакты хранятся в строжайшей конфиденциальности координатором ателье.',
    step10NameLabel: 'Ваше имя и фамилия *',
    step10NamePlaceholder: 'например, Анна Воронова',
    step10TgLabel: 'Никнейм в Telegram (@username)',
    step10TgHint: 'Координатор ателье свяжется с вами напрямую в Telegram с деталями предложения.',
    step10WaLabel: 'Номер телефона в WhatsApp',
    step10VenueLabel: 'Желаемый формат / салон консультации',
    step10LangLabel: 'Язык консультации',
    step10GenerateBtn: 'Сформировать Предложение и AI Style Direction',

    summaryRef: 'Досье Ателье №',
    summaryTitle: 'Ваше Консультационное',
    summaryTitleItalic: 'Предложение',
    summaryPreparedFor: (name, loc) => `Подготовлено для: ${name || 'Клиент'} · ${loc}`,
    summaryTransmittedBannerTitle: 'Досье передано в Telegram-систему Ателье',
    summaryTransmittedBannerText: 'Данные вашей консультации синхронизированы. Главный кутюрье получил ваши мерки, палитру и визуальные референсы.',
    aestheticDirection: 'Эстетическое Направление',
    specTimeline: 'Сроки',
    specProportions: 'Размер',
    specFit: 'Посадка',
    specVenue: 'Салон',
    selectedPalette: 'Выбранная палитра натурального шелка',
    clientPriorities: 'Приоритеты клиента',
    clientReferencesTitle: (count) => `Ваши загруженные референсы (${count})`,

    aiGeminiBadge: 'Интеллект Gemini',
    aiDirectionTitle: 'AI Style Direction · Стилистическая Концепция',
    aiRegenerate: 'Обновить',
    aiLoadingTitle: 'Синтез индивидуальной кутюрной концепции...',
    aiLoadingSub: 'Подбор шелков из Комо и выверенных средиземноморских линий',
    aiAestheticVision: 'Художественное Видение',
    aiRecommendedFabrics: 'Рекомендуемые Благородные Ткани',
    aiArchitecturalDetails: 'Архитектурные Особенности Кроя',
    aiConsultationFocus: 'Фокус Первой Консультации в Ателье',

    btnBookWhatsapp: 'Записаться на консультацию',
    btnSendTelegram: 'Отправить досье в Ателье через Telegram',
    btnSending: 'Отправка в Ателье...',
    btnSent: 'Досье отправлено в Telegram-бот',
    btnShare: 'Поделиться предложением',
    btnCopied: 'Ссылка скопирована',
    btnDashboard: 'Консоль Ателье',
    btnRestart: 'Создать Новое Консультационное Досье',

    dashConsoleBadge: 'Консоль Управления Ателье',
    dashTitle: 'Досье Консультаций',
    dashBackBtn: 'Вернуться в приложение',
    dashTotal: 'Всего Досье',
    dashNew: 'Новые Заявки',
    dashScheduled: 'Назначены Примерки',
    dashTgSync: 'Telegram Bot Sync',
    dashConnected: 'Подключено',
    dashSearchPlaceholder: 'Поиск по имени, номеру, поводу...',
    dashNoDossiers: 'Консультационные досье не найдены',
    dashNoDossiersSub: 'Создайте досье через приложение, чтобы увидеть его здесь.',
    dashFilterAll: 'Все',
    dashFilterNew: 'Новые',
    dashFilterScheduled: 'Назначенные',
    dashFilterFitting: 'Примерки',
    statusNew: 'Новое обращение',
    statusContacted: 'Связались',
    statusScheduled: 'Примерка назначена',
    statusFitting: 'Макетирование (Toile)',
    statusCompleted: 'В производстве',

    footerSlogan: 'MARGO Bridal & Special Occasion · Onrus',
    footerWords: ['Свадебные платья', 'Вечерние образы', 'Ткани и аксессуары'],
  },
  en: {
    brandName: 'MARGO Bridal & Special Occasion',
    brandTagline: 'Bridal & Evening Dresses · Fabrics · Accessories',
    badge: 'Look selection',
    appTitle: 'Your look for a special occasion',
    appIntro: [
      'Bridal and evening dresses, beautiful fabrics and accessories — at MARGO Bridal & Special Occasion in Onrus, Western Cape, South Africa.',
      'This short questionnaire helps you clarify your wishes and helps us prepare for your first appointment.',
      'Tell us about your event and choose looks you like. At the consultation we will discuss suitable silhouettes, fabrics and details — to select a ready dress or order from a chosen model.',
      'Atelier appointments are by prior booking. Online consultations are also available.',
    ],
    stats: {
      time: { title: 'Short survey', desc: 'Your event and wishes' },
      ai: { title: 'Your style', desc: 'Silhouettes, fabrics & details' },
      privacy: { title: 'Private meeting', desc: 'In atelier or online' },
    },
    startBtn: 'Start look selection',
    citiesFooter: 'Onrus · Western Cape · South Africa',
    citiesFooterSub: 'In atelier and online',

    atelierDeskBtn: 'Atelier Desk',
    clientAppBtn: 'Client App',
    stepIndicator: (current, total) => `Step ${String(current).padStart(2, '0')} of ${String(total).padStart(2, '0')}`,
    headerSub: 'Consultation',

    step01Badge: 'Step 01 · Occasion & Setting',
    step01Title: 'Your distinct',
    step01TitleItalic: 'occasion',
    step01Subtitle: 'Every couture creation begins with the context, light, and atmosphere of your event.',
    step01Continue: 'Continue to Date & Atmosphere',

    step02Badge: 'Step 02 · Your Event',
    step02Title: 'When and where is',
    step02TitleItalic: 'your event?',
    step02Subtitle:
      'Tell us about the date and venue. This helps us suggest a suitable look and discuss time for dress selection, possible alterations, or made-to-order.',
    step02DateLabel: 'Event date — if already known',
    step02DatePlaceholder: 'Select a date',
    step02TimelineLabel: 'How much time is left until the event?',
    step02TimelineNote: 'Order options and production timelines are confirmed at the consultation.',
    step02TimelineAutoHint: 'Timeline calculated from the selected date',
    step02SettingLabel: 'Where and in what format will the event take place?',
    step02SettingHint: 'Select all that apply.',
    step02OtherLabel: 'Briefly describe the place or format of the event.',
    step02OtherPlaceholder: 'Short description of place or format',
    step02CityLabel: 'In which city or region will the event take place?',
    step02CityPlaceholder: 'Enter a city or region.',
    step02Continue: 'Next: your budget and preferences',
    step02PageFooterBrand: 'MARGO Bridal & Special Occasion',
    step02PageFooterPlace: 'Onrus, Western Cape, South Africa',
    step02PageFooterMode: 'In atelier and online',

    step03Badge: 'Step 03 · Format & Budget',
    step03Title: 'Which option feels',
    step03TitleItalic: 'closer to you?',
    step03Subtitle:
      'Choose a direction and a comfortable budget guide. This helps us prepare suitable proposals for your consultation.',
    step03Disclaimer:
      'The prices shown are preliminary guides. The final cost depends on the model, fabric, construction and finishing, and is agreed before production begins. All prices are shown in South African rand — ZAR / R.',
    step03IncludedBadge: 'Included:',
    step03Continue: 'Continue to Silhouette Line',
    step03SelectHint: 'Select an option',
    step03PageFooterBrand: 'MARGO Bridal & Special Occasion',
    step03PageFooterPlace: 'Onrus, Western Cape, South Africa',
    step03PageFooterMode: 'Consultations in atelier and online.',

    step04Badge: 'Step 04 · Silhouette Choice',
    step04Title: 'Which silhouette',
    step04TitleItalic: 'do you like?',
    step04Subtitle:
      'Choose one or more options that feel close to you. At the fitting we will help refine the shape, fit and details around your wishes.',
    step04Note:
      'Images help you choose a style direction. Fabric, colour, details and production options are discussed at the consultation.',
    step04Continue: 'Next: style and details',
    step04SelectHint: 'Select a silhouette',
    step04PageFooterBrand: 'MARGO Bridal & Special Occasion',
    step04PageFooterPlace: 'Onrus, Western Cape, South Africa',
    step04PageFooterMode: 'In atelier and online',
    step04PageFooterTag: 'Dresses · Fabrics · Accessories',

    step05Badge: 'Step 05 · Style Essence',
    step05Title: 'Your aesthetic',
    step05TitleItalic: 'spirit',
    step05Subtitle: 'Defining the emotional resonance and atmosphere of your couture piece.',
    step05Continue: 'Continue to Colour Palette',

    step06Badge: 'Step 06 · Mediterranean Tones',
    step06Title: 'Noble fabric',
    step06TitleItalic: 'palette',
    step06Subtitle: 'Warm minerals, unbleached silks, and soft Mediterranean shadows. Select up to 2 shades.',
    step06CustomLabel: 'Custom Swatch Request or Nuance (Optional)',
    step06CustomPlaceholder: 'e.g. Muted oyster with antique golden reflection, or match my family heirloom lace...',
    step06Continue: 'Continue to Measurements & Fit',

    step07Badge: 'Step 07 · Proportions & Fit',
    step07Title: 'How do you wish to',
    step07TitleItalic: 'feel?',
    step07Subtitle: 'Atelier couture is sculpted around your natural proportions, not standard molds.',
    step07HeightLabel: 'Height (approx.)',
    step07HeightPlaceholder: 'e.g. 173 cm / 5\'8"',
    step07SizeLabel: 'Approximate Sizing',
    step07SizeDefault: 'Select current size...',
    step07FitLabel: 'Preferred Fit Sensation',
    step07NotesLabel: 'Personal Notes for Couturier (Optional)',
    step07NotesPlaceholder: 'e.g. I love open-back details, need freedom for dancing, prefer natural waistline...',
    step07Continue: 'Continue to References',

    step08Badge: 'Step 08 · Visual References',
    step08Title: 'Moodboard &',
    step08TitleItalic: 'inspiration',
    step08Subtitle: 'Upload up to 3 photographs, sketches, or link your private moodboard.',
    step08UploadTitle: (count) => `Upload Reference Images (${count}/3)`,
    step08UploadSubtitle: 'Drag & drop here or click to select from your device.',
    step08UploadLimits: 'JPG, PNG, WebP up to 8MB',
    step08CuratedLabel: 'Or Click to Add Signature Atelier Details',
    step08LinkNotesLabel: 'Pinterest / Instagram Link or Aesthetic Notes',
    step08LinkNotesPlaceholder: 'Paste Pinterest / Instagram link or describe silhouettes you love...',
    step08Continue: 'Continue to Priorities',

    step09Badge: 'Step 09 · Creative Priorities',
    step09Title: 'What matters',
    step09TitleItalic: 'most?',
    step09Subtitle: 'Guide our Master Couturier on the core values of your piece. Select 1 to 3 priorities.',
    step09Continue: (count) => count > 0 ? `Continue (${count} Selected)` : 'Select at Least 1 Priority',

    step10Badge: 'Step 10 · Client Dossier',
    step10Title: 'How shall we',
    step10TitleItalic: 'address you?',
    step10Subtitle: 'Your details are treated with the highest discretion by our atelier team.',
    step10NameLabel: 'Your Full Name *',
    step10NamePlaceholder: 'e.g. Elena Rostova',
    step10TgLabel: 'Telegram Handle (@username)',
    step10TgHint: 'Our atelier coordinator will connect with you directly in Telegram.',
    step10WaLabel: 'WhatsApp Phone Number',
    step10VenueLabel: 'Preferred Consultation Venue',
    step10LangLabel: 'Consultation Language',
    step10GenerateBtn: 'Generate Consultation Summary & AI Direction',

    summaryRef: 'Dossier Ref:',
    summaryTitle: 'Your Consultation',
    summaryTitleItalic: 'Summary',
    summaryPreparedFor: (name, loc) => `Prepared for ${name || 'Client'} · ${loc}`,
    summaryTransmittedBannerTitle: 'Dossier Transmitted to Atelier Team',
    summaryTransmittedBannerText: 'Your consultation file has been synchronized via Telegram Bot. Our Head Couturier has received your measurements, palette, and references.',
    aestheticDirection: 'Aesthetic Direction',
    specTimeline: 'Timeline',
    specProportions: 'Proportions',
    specFit: 'Fit Sensation',
    specVenue: 'Venue',
    selectedPalette: 'Selected Mediterranean Palette',
    clientPriorities: 'Client Priorities',
    clientReferencesTitle: (count) => `Your Uploaded References (${count})`,

    aiGeminiBadge: 'Gemini Intelligence',
    aiDirectionTitle: 'AI Style Direction',
    aiRegenerate: 'Regenerate',
    aiLoadingTitle: 'Synthesizing bespoke couture architecture...',
    aiLoadingSub: 'Curating noble Como silks & Mediterranean lines',
    aiAestheticVision: 'Aesthetic Vision',
    aiRecommendedFabrics: 'Recommended Noble Fabrics',
    aiArchitecturalDetails: 'Architectural Cut Details',
    aiConsultationFocus: 'Atelier Consultation Focus Points',

    btnBookWhatsapp: 'Book a consultation',
    btnSendTelegram: 'Send to Atelier via Telegram',
    btnSending: 'Transmitting Dossier...',
    btnSent: 'Dossier Sent via Telegram Bot',
    btnShare: 'Share Dossier',
    btnCopied: 'Link Copied',
    btnDashboard: 'Atelier Dashboard',
    btnRestart: 'Create Another Consultation Dossier',

    dashConsoleBadge: 'Live Atelier Console',
    dashTitle: 'Consultation Dossiers',
    dashBackBtn: 'Back to Mini App',
    dashTotal: 'Total Dossiers',
    dashNew: 'New Inquiries',
    dashScheduled: 'Scheduled Fittings',
    dashTgSync: 'Telegram Bot Sync',
    dashConnected: 'Connected',
    dashSearchPlaceholder: 'Search client, ID, occasion...',
    dashNoDossiers: 'No consultation dossiers found',
    dashNoDossiersSub: 'Submit a consultation via the client app to see it populate here.',
    dashFilterAll: 'all',
    dashFilterNew: 'new',
    dashFilterScheduled: 'scheduled',
    dashFilterFitting: 'fitting',
    statusNew: 'New Inbound',
    statusContacted: 'Contacted',
    statusScheduled: 'Fitting Scheduled',
    statusFitting: 'Toile Prototype',
    statusCompleted: 'In Production',

    footerSlogan: 'MARGO Bridal & Special Occasion · Onrus',
    footerWords: ['Bridal dresses', 'Evening looks', 'Fabrics & accessories'],
  },
};
