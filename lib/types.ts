export interface Consultation {
  id: string;
  createdAt: string;
  occasion: string;
  date: string;
  timeline: string;
  settings?: string[];
  settingOther?: string;
  eventCity?: string;
  budget: string;
  silhouette: string;
  style: string;
  colors: string[];
  customColorNote?: string;
  measurements: {
    height?: string;
    clothingSize?: string;
    size?: string;
    fitPreference?: string;
    fitPreferences?: string[];
    notes?: string;
  };
  references: string[];
  referenceNotes?: string;
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
  consentAccepted?: boolean;
  consentAcceptedAt?: string;
  consentVersion?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'fitting' | 'completed';
}
