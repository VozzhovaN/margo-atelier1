import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Send,
  MessageCircle,
  CheckCircle2,
  Share2,
  Check,
} from 'lucide-react';
import { ConsultationDossier } from '../types';
import { CAMPAIGN_ASSETS, getColours, getFitPreferences, getSilhouettes, getStyles } from '../data/atelierContent';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { staggerContainer, microFadeUp, microFadeUpSubtle } from '../utils/motion';

interface SummaryViewProps {
  dossier: ConsultationDossier;
  onEditStep: (step: any) => void;
  onReset: () => void;
  lang: SupportedLanguage;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  dossier,
  onEditStep,
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
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittingChannel, setSubmittingChannel] = useState<'whatsapp' | 'telegram' | null>(null);
  const [dossierId, setDossierId] = useState<string>(dossier.id || 'MARGO-8492');
  const [copiedLink, setCopiedLink] = useState(false);

  // Submit dossier server-side — no redirect to WhatsApp / Telegram apps
  const handleSendToAtelier = async (preferredChannel: 'whatsapp' | 'telegram') => {
    if (submitting || submissionSuccess) return;
    setSubmitting(true);
    setSubmittingChannel(preferredChannel);
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dossier,
          preferredChannel,
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
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.consultation?.id) {
          setDossierId(data.consultation.id);
        }
        setSubmissionSuccess(true);
        setShowThankYou(true);
      }
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
      setSubmittingChannel(null);
    }
  };

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

      {showThankYou && (
        <div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-[#1A1816]/45 backdrop-blur-[2px] p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="thank-you-message"
        >
          <div className="w-full max-w-md rounded-2xl bg-[#FAF8F5] border border-[#E8E1D6] shadow-2xl p-6 sm:p-7 text-center">
            <div className="mx-auto mb-4 w-10 h-10 rounded-full bg-[#F0F7F2] border border-[#C8E1CE] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#2E8B4A]" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#7D7267] mb-1">
              {t.thankYouOrderLabel}
            </p>
            <p className="font-serif text-2xl text-[#1A1816] tracking-wide mb-4">{dossierId}</p>
            <p id="thank-you-message" className="text-sm text-[#544B43] font-light leading-relaxed mb-6">
              {t.thankYouMessage}
            </p>
            <button
              type="button"
              onClick={() => setShowThankYou(false)}
              className="w-full py-3 rounded-full bg-[#1A1816] text-[#FAF8F5] text-xs uppercase tracking-[0.18em]"
            >
              {t.thankYouClose}
            </button>
          </div>
        </div>
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

      {/* PRIMARY CTA ACTIONS */}
      <motion.div variants={microFadeUp} className="space-y-3 mb-8">
        <p className="text-center text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#6B5E53] font-medium">
          {t.sendDossierChoice}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* WhatsApp — server delivery, no wa.me redirect */}
          <button
            id="whatsapp-booking-cta"
            type="button"
            disabled={submitting || submissionSuccess}
            onClick={() => handleSendToAtelier('whatsapp')}
            className={`w-full py-4 px-5 rounded-full text-xs font-medium tracking-[0.14em] uppercase transition-all flex items-center justify-center gap-2.5 border cursor-pointer ${
              submissionSuccess
                ? 'bg-[#EAE2D6] text-[#61564C] border-[#D9D1C5]'
                : 'bg-[#25D366] text-white border-[#25D366] hover:bg-[#20BE5C] active:scale-[0.99] shadow-lg shadow-green-900/10'
            }`}
          >
            {submissionSuccess ? (
              <>
                <Check className="w-4 h-4 shrink-0 text-[#2E8B4A]" />
                <span>{t.btnSent}</span>
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>
                  {submitting && submittingChannel === 'whatsapp' ? t.btnSending : t.btnBookWhatsapp}
                </span>
              </>
            )}
          </button>

          {/* Telegram */}
          <button
            id="telegram-dossier-btn"
            type="button"
            disabled={submitting || submissionSuccess}
            onClick={() => handleSendToAtelier('telegram')}
            className={`w-full py-4 px-5 rounded-full text-xs font-medium tracking-[0.14em] uppercase transition-all flex items-center justify-center gap-2.5 border cursor-pointer ${
              submissionSuccess
                ? 'bg-[#EAE2D6] text-[#61564C] border-[#D9D1C5]'
                : 'bg-[#229ED9] text-white border-[#229ED9] hover:bg-[#1B8BC0] active:scale-[0.99] shadow-lg shadow-sky-900/10'
            }`}
          >
            {submissionSuccess ? (
              <>
                <Check className="w-4 h-4 shrink-0 text-[#2E8B4A]" />
                <span>{t.btnSent}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 shrink-0" />
                <span>
                  {submitting && submittingChannel === 'telegram' ? t.btnSending : t.btnSendTelegram}
                </span>
              </>
            )}
          </button>
        </div>

        <button
          id="share-dossier-btn"
          type="button"
          onClick={handleShare}
          className="w-full py-2.5 px-4 rounded-xl bg-[#FAF8F5] border border-[#D9D1C5] text-xs text-[#54493F] hover:bg-[#F2EDE5] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copiedLink ? t.btnCopied : t.btnShare}</span>
        </button>
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

