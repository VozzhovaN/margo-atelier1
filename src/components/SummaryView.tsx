import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Send,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Share2,
  ChevronRight,
  Layers,
  Scissors,
  Check,
  RotateCcw,
} from 'lucide-react';
import { ConsultationDossier, AIStyleDirection } from '../types';
import { CAMPAIGN_ASSETS, getColours, getFitPreferences, getSilhouettes, getStyles } from '../data/atelierContent';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { staggerContainer, microFadeUp, microFadeUpSubtle } from '../utils/motion';

interface SummaryViewProps {
  dossier: ConsultationDossier;
  onEditStep: (step: any) => void;
  onViewDashboard: () => void;
  onReset: () => void;
  lang: SupportedLanguage;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  dossier,
  onEditStep,
  onViewDashboard,
  onReset,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const silhouetteLabel = (() => {
    const selected = Array.isArray(dossier.silhouette) ? dossier.silhouette : [];
    if (selected.length === 0) return lang === 'ru' ? 'Не выбран' : 'Not selected';
    const map = Object.fromEntries(getSilhouettes(lang).map((s) => [s.id, s.name]));
    return selected.map((id) => map[id] || id).join(', ');
  })();
  const styleLabel = (() => {
    const selected = Array.isArray(dossier.style) ? dossier.style : [];
    if (selected.length === 0) return lang === 'ru' ? 'Не выбран' : 'Not selected';
    const map = Object.fromEntries(getStyles(lang).map((s) => [s.id, s.name]));
    return selected.map((id) => map[id] || id).join(', ');
  })();
  const colourItems = (() => {
    const selected = Array.isArray(dossier.colors) ? dossier.colors : [];
    const map = Object.fromEntries(getColours(lang).map((c) => [c.id, c]));
    return selected.map((id) => map[id] || { id, name: id, hex: '#B8A896' });
  })();
  const colourLabel =
    colourItems.length === 0
      ? lang === 'ru'
        ? 'Не выбран'
        : 'Not selected'
      : colourItems.map((c) => c.name).join(', ');
  const fitLabel = (() => {
    const selected = Array.isArray(dossier.measurements.fitPreferences)
      ? dossier.measurements.fitPreferences
      : [];
    if (selected.length === 0) return lang === 'ru' ? 'Не выбрана' : 'Not selected';
    const map = Object.fromEntries(getFitPreferences(lang).map((f) => [f.id, f.title]));
    return selected.map((id) => map[id] || id).join(', ');
  })();
  const sizeLabel = (() => {
    if (!dossier.measurements.clothingSize) return lang === 'ru' ? 'Не указан' : 'Not specified';
    if (dossier.measurements.clothingSize === 'dont_know') {
      return lang === 'ru' ? 'Не знаю' : 'Not sure';
    }
    return dossier.measurements.clothingSize;
  })();
  const [aiDirection, setAiDirection] = useState<AIStyleDirection | null>(
    dossier.aiStyleDirection || null
  );
  const [loadingAI, setLoadingAI] = useState<boolean>(!dossier.aiStyleDirection);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [dossierId, setDossierId] = useState<string>(dossier.id || 'MARGO-8492');
  const [copiedLink, setCopiedLink] = useState(false);

  // Generate Gemini AI Style Direction on mount or when language changes if not generated
  useEffect(() => {
    generateStyleDirection();
  }, [lang]);

  const generateStyleDirection = async () => {
    setLoadingAI(true);
    try {
      const res = await fetch('/api/gemini/style-direction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion: dossier.occasion,
          date: dossier.date,
          timeline: dossier.timeline,
          budget: dossier.budget,
          silhouette: silhouetteLabel === (lang === 'ru' ? 'Не выбран' : 'Not selected')
            ? ''
            : silhouetteLabel,
          style: styleLabel === (lang === 'ru' ? 'Не выбран' : 'Not selected') ? '' : styleLabel,
          colors: colourLabel === (lang === 'ru' ? 'Не выбран' : 'Not selected') ? [] : colourItems.map((c) => c.name),
          customColorNote: dossier.customColorNote,
          measurements: dossier.measurements,
          priorities: dossier.priorities,
          referenceNotes: dossier.referenceNotes,
          lang,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiDirection(data);
      }
    } catch (err) {
      console.error('Error fetching style direction:', err);
    } finally {
      setLoadingAI(false);
    }
  };

  // Submit Consultation to Backend & Trigger Telegram Bot notification
  const handleSendToAtelier = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dossier,
          silhouetteLabel:
            silhouetteLabel === (lang === 'ru' ? 'Не выбран' : 'Not selected')
              ? ''
              : silhouetteLabel,
          styleLabel:
            styleLabel === (lang === 'ru' ? 'Не выбран' : 'Not selected') ? '' : styleLabel,
          colourLabel:
            colourLabel === (lang === 'ru' ? 'Не выбран' : 'Not selected') ? '' : colourLabel,
          colors:
            colourLabel === (lang === 'ru' ? 'Не выбран' : 'Not selected')
              ? []
              : colourItems.map((c) => c.name),
          aiStyleDirection: aiDirection,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.consultation?.id) {
          setDossierId(data.consultation.id);
        }
        setSubmissionSuccess(true);
      }
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Generate WhatsApp prefilled message
  const whatsappMessage = encodeURIComponent(
    lang === 'ru'
      ? `Здравствуйте, MARGO Atelier!

Я заполнила консультационное досье [#${dossierId}]:
• Повод: ${dossier.occasion || 'Индивидуальный заказ'}
• Дата: ${dossier.date || dossier.timeline || 'В ближайшие месяцы'}
• Формат: ${[...(dossier.settings || []), dossier.settingOther, dossier.eventCity].filter(Boolean).join(', ') || '—'}
• Силуэт: ${silhouetteLabel}
• Эстетика: ${styleLabel}
• Палитра: ${colourLabel}${dossier.customColorNote ? `\n• Пожелания по цвету: ${dossier.customColorNote}` : ''}
• Бюджетная категория: ${dossier.budget || 'Couture Bespoke'}
• Имя клиента: ${dossier.contact.fullName}
• Локация: ${dossier.contact.atelierLocation}

Хочу согласовать дату и время первой примерки / консультации в салоне.`
      : `Hello MARGO Atelier,

I have completed my consultation preparation dossier [#${dossierId}]:
• Occasion: ${dossier.occasion || 'Atelier Consultation'}
• Target Date: ${dossier.date || dossier.timeline || 'Upcoming'}
• Format: ${[...(dossier.settings || []), dossier.settingOther, dossier.eventCity].filter(Boolean).join(', ') || '—'}
• Preferred Silhouette: ${silhouetteLabel}
• Style Essence: ${styleLabel}
• Palette: ${colourLabel}${dossier.customColorNote ? `\n• Colour notes: ${dossier.customColorNote}` : ''}
• Budget Tier: ${dossier.budget || 'Couture Bespoke'}
• Client Name: ${dossier.contact.fullName}
• Location: ${dossier.contact.atelierLocation}

I would like to book my first private consultation appointment.`
  );

  const whatsappUrl = `https://wa.me/393498124490?text=${whatsappMessage}`;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Find occasion image
  const occasionImg =
    dossier.occasion === 'bridal'
      ? CAMPAIGN_ASSETS.bridal
      : dossier.occasion === 'evening'
      ? CAMPAIGN_ASSETS.evening
      : dossier.occasion === 'special_occasion'
      ? CAMPAIGN_ASSETS.specialOccasion
      : CAMPAIGN_ASSETS.customDress;

  return (
    <motion.div
      variants={staggerContainer(0.06, 0.04)}
      initial="initial"
      animate="animate"
      className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-8 flex flex-col"
    >
      {/* Editorial Header */}
      <motion.div variants={microFadeUp} className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E5DDD2] text-[10px] sm:text-[11px] tracking-[0.25em] text-[#6B5E53] uppercase mb-3 font-medium">
          <Sparkles className="w-3 h-3 text-[#A89684]" />
          {t.summaryRef} {dossierId}
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1816] tracking-tight leading-tight">
          {t.summaryTitle} <br />
          <span className="italic font-normal">{t.summaryTitleItalic}</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#706459] mt-2 font-light max-w-md mx-auto">
          {t.summaryPreparedFor(dossier.contact.fullName, dossier.contact.atelierLocation)}
        </p>
      </motion.div>

      {/* Success Banner if submitted */}
      {submissionSuccess && (
        <motion.div variants={microFadeUp} className="mb-6 p-4 rounded-2xl bg-[#F0F7F2] border border-[#C8E1CE] text-[#205A32] flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#2E8B4A] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <div className="font-semibold uppercase tracking-wider text-[11px]">
              {t.summaryTransmittedBannerTitle}
            </div>
            <p className="mt-0.5 text-[#2C6E3E] font-light">
              {t.summaryTransmittedBannerText}
            </p>
          </div>
        </motion.div>
      )}

      {/* Primary Hero Moodboard Card */}
      <motion.div variants={microFadeUp} className="relative rounded-3xl overflow-hidden border border-[#E8E1D6] shadow-xl bg-[#FAF8F5] mb-6 sm:mb-8">
        {/* Split Visual Top */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#EAE2D8]">
          <img
            src={occasionImg}
            alt="Atelier Campaign Visual"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181512]/90 via-[#181512]/30 to-transparent" />

          {/* Top Pill Tags */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md text-[#1A1816] text-[10px] uppercase tracking-[0.2em] font-medium border border-white/50">
              {dossier.occasion ? dossier.occasion.replace('_', ' ') : 'Bespoke Atelier'}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FAF8F5] text-[10px] uppercase tracking-[0.2em] font-medium">
              {dossier.budget || 'Couture'}
            </span>
          </div>

          {/* Bottom Overlay Title */}
          <div className="absolute bottom-4 left-4 right-4 text-[#FAF8F5]">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#D8CEBF] block mb-0.5">
              {t.aestheticDirection}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light tracking-wide leading-tight">
              {silhouetteLabel}
            </h2>
            <p className="text-xs text-[#EAE2D8] font-light mt-0.5">
              {styleLabel}
            </p>
          </div>
        </div>

        {/* Curation Details Grid */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Key Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-[#F6F1EA] border border-[#E9E2D8]">
              <span className="text-[9px] uppercase tracking-widest text-[#877C72] block">{t.specTimeline}</span>
              <span className="font-serif text-sm text-[#1A1816] font-medium block truncate">
                {dossier.date || dossier.timeline || 'Flexible'}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F6F1EA] border border-[#E9E2D8]">
              <span className="text-[9px] uppercase tracking-widest text-[#877C72] block">{t.specProportions}</span>
              <span className="font-serif text-sm text-[#1A1816] font-medium block truncate">
                {sizeLabel}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F6F1EA] border border-[#E9E2D8]">
              <span className="text-[9px] uppercase tracking-widest text-[#877C72] block">{t.specFit}</span>
              <span className="font-serif text-sm text-[#1A1816] font-medium block truncate">
                {fitLabel}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F6F1EA] border border-[#E9E2D8]">
              <span className="text-[9px] uppercase tracking-widest text-[#877C72] block">{t.specVenue}</span>
              <span className="font-serif text-sm text-[#1A1816] font-medium block truncate">
                {dossier.contact.atelierLocation || (lang === 'ru' ? 'Южная Африка' : 'South Africa')}
              </span>
            </div>
          </div>

          {/* Color Palette Swatches */}
          {(colourItems.length > 0 || dossier.customColorNote) && (
            <div className="pt-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#63574D] block mb-2">
                {t.selectedPalette}
              </span>
              {colourItems.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {colourItems.map((c) => (
                    <span
                      key={c.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5EFE8] border border-[#DFD6C9] text-xs text-[#2D2823] font-light"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      {c.name}
                    </span>
                  ))}
                </div>
              )}
              {dossier.customColorNote && (
                <p className="text-xs text-[#63574D] font-light mt-2 leading-relaxed">
                  {dossier.customColorNote}
                </p>
              )}
            </div>
          )}

          {/* Core Priorities */}
          {dossier.priorities.length > 0 && (
            <div className="pt-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#63574D] block mb-2">
                {t.clientPriorities}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dossier.priorities.map((p, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-[#EFE8DF] text-[11px] text-[#4A4036] tracking-wide"
                  >
                    • {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Uploaded Client References */}
          {dossier.references.length > 0 && (
            <div className="pt-3 border-t border-[#EAE3D9]">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#63574D] block mb-2">
                {t.clientReferencesTitle(dossier.references.length)}
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {dossier.references.map((img, i) => (
                  <div key={i} className="aspect-[3/4] rounded-xl overflow-hidden border border-[#D9D1C5] bg-[#ECE5DA]">
                    <img src={img} alt={`Reference ${i + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-contain object-center" />
                  </div>
                ))}
              </div>
              {dossier.referenceNotes && (
                <p className="text-xs italic text-[#706459] mt-2 font-light">
                  “{dossier.referenceNotes}”
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* GEMINI AI STYLE DIRECTION */}
      <motion.div variants={microFadeUp} className="relative rounded-3xl p-6 sm:p-7 bg-[#1A1816] text-[#FAF8F5] shadow-2xl mb-8 border border-[#2D2823]">
        {/* Subtle Luxury Pattern Accent */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#352F2B] flex items-center justify-center text-[#D8CEBF]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#B8AA99] block font-medium">
                {t.aiGeminiBadge}
              </span>
              <span className="font-serif text-sm tracking-widest uppercase text-[#FAF8F5]">
                {t.aiDirectionTitle}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={generateStyleDirection}
            disabled={loadingAI}
            className="text-[10px] tracking-widest uppercase text-[#B8AA99] hover:text-[#FAF8F5] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className={`w-3 h-3 ${loadingAI ? 'animate-spin' : ''}`} />
            {t.aiRegenerate}
          </button>
        </div>

        {loadingAI ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#D8CEBF] border-t-transparent animate-spin mx-auto" />
            <p className="font-serif text-lg font-light text-[#EAE2D8] italic">
              {t.aiLoadingTitle}
            </p>
            <p className="text-[11px] text-[#A89886] tracking-wider uppercase">
              {t.aiLoadingSub}
            </p>
          </div>
        ) : aiDirection ? (
          <div className="space-y-5">
            {/* Headline */}
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#A89886] block mb-1">
                {t.aiAestheticVision}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF8F5] tracking-wide leading-snug italic">
                “{aiDirection.headline}”
              </h3>
            </div>

            {/* Concept */}
            <p className="text-xs sm:text-sm text-[#D8CEBF] font-light leading-relaxed">
              {aiDirection.concept}
            </p>

            {/* Fabrics & Architectural details in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
              {/* Fabrics */}
              <div>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B8AA99] block mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#D8CEBF]" />
                  {t.aiRecommendedFabrics}
                </span>
                <ul className="space-y-1.5 text-xs text-[#EAE2D8] font-light">
                  {aiDirection.recommendedFabrics?.map((fab, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#D8CEBF] mt-1.5 shrink-0" />
                      <span>{fab}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architectural Details */}
              <div>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B8AA99] block mb-2 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-[#D8CEBF]" />
                  {t.aiArchitecturalDetails}
                </span>
                <ul className="space-y-1.5 text-xs text-[#EAE2D8] font-light">
                  {aiDirection.architecturalDetails?.map((det, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#D8CEBF] mt-1.5 shrink-0" />
                      <span>{det}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Consultation Focus */}
            {aiDirection.consultationFocus && (
              <div className="pt-3 border-t border-white/10">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B8AA99] block mb-2">
                  {t.aiConsultationFocus}
                </span>
                <div className="space-y-1 text-xs text-[#D8CEBF] font-light">
                  {aiDirection.consultationFocus.map((foc, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[10px] font-mono text-[#A89886]">0{i + 1}.</span>
                      <span>{foc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </motion.div>

      {/* PRIMARY CTA ACTIONS */}
      <motion.div variants={microFadeUp} className="space-y-3 mb-8">
        {/* Book / WhatsApp Atelier Button */}
        <a
          id="whatsapp-booking-cta"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (!submissionSuccess) handleSendToAtelier();
          }}
          className="w-full py-4 px-6 rounded-full bg-[#25D366] text-white hover:bg-[#20BE5C] active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-xs sm:text-sm font-medium tracking-[0.18em] uppercase shadow-lg shadow-green-900/10 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t.btnBookWhatsapp}</span>
        </a>

        {/* Transmit to Telegram Bot & Save */}
        <button
          id="telegram-dossier-btn"
          type="button"
          disabled={submitting || submissionSuccess}
          onClick={handleSendToAtelier}
          className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-medium tracking-[0.18em] uppercase transition-all flex items-center justify-center gap-2.5 border cursor-pointer ${
            submissionSuccess
              ? 'bg-[#EAE2D6] text-[#61564C] border-[#D9D1C5]'
              : 'bg-[#1A1816] text-[#FAF8F5] border-[#1A1816] hover:bg-[#2C2723] active:scale-[0.99]'
          }`}
        >
          {submissionSuccess ? (
            <>
              <Check className="w-4 h-4 text-[#2E8B4A]" />
              <span>{t.btnSent}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-[#D8CEBF]" />
              <span>{submitting ? t.btnSending : t.btnSendTelegram}</span>
            </>
          )}
        </button>

        {/* Secondary Links: Share & Atelier Dashboard */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <button
            id="share-dossier-btn"
            type="button"
            onClick={handleShare}
            className="py-2.5 px-4 rounded-xl bg-[#FAF8F5] border border-[#D9D1C5] text-xs text-[#54493F] hover:bg-[#F2EDE5] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? t.btnCopied : t.btnShare}</span>
          </button>

          <button
            id="view-in-dashboard-btn"
            type="button"
            onClick={onViewDashboard}
            className="py-2.5 px-4 rounded-xl bg-[#FAF8F5] border border-[#D9D1C5] text-xs text-[#54493F] hover:bg-[#F2EDE5] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.btnDashboard}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </motion.div>

      {/* Edit Options / Restart */}
      <motion.div variants={microFadeUpSubtle} className="text-center pt-2 pb-8 border-t border-[#EAE3D9]">
        <button
          id="restart-consultation-btn"
          type="button"
          onClick={onReset}
          className="text-xs tracking-wider uppercase text-[#867B71] hover:text-[#1A1816] transition-colors cursor-pointer"
        >
          {t.btnRestart}
        </button>
      </motion.div>
    </motion.div>
  );
};

