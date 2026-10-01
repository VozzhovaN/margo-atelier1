import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Clock, ShieldCheck, Compass, X } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { staggerContainer, microFadeUp, microFadeUpSubtle } from '../utils/motion';
import welcomeHeroImg from '../assets/images/margo_welcome_hero.jpg';

export const CONSENT_VERSION = '2026-09-30';

export interface ConsentPayload {
  consentAccepted: boolean;
  consentAcceptedAt: string;
  consentVersion: string;
}

interface WelcomeViewProps {
  onStart: (consent: ConsentPayload) => void;
  lang: SupportedLanguage;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onStart, lang }) => {
  const t = TRANSLATIONS[lang];
  const [showConsent, setShowConsent] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  useEffect(() => {
    if (!showConsent) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showConsent]);

  const canAccept = acceptTerms && acceptPrivacy;

  const handleAccept = () => {
    if (!canAccept) return;
    onStart({
      consentAccepted: true,
      consentAcceptedAt: new Date().toISOString(),
      consentVersion: CONSENT_VERSION,
    });
  };

  return (
    <>
      <motion.div
        variants={staggerContainer(0.04, 0.02)}
        initial="initial"
        animate="animate"
        className="w-full max-w-xl mx-auto px-3 sm:px-4 py-1 sm:py-10 flex flex-col items-center text-center h-full min-h-0 sm:h-auto sm:min-h-0 overflow-hidden sm:overflow-visible justify-between gap-1 sm:gap-0"
      >
        <div className="w-full flex flex-col items-center shrink-0">
          <motion.div
            variants={microFadeUpSubtle}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF5EE] border border-[#E5DDD2] text-[8px] sm:text-[11px] tracking-[0.2em] text-[#6B5E53] uppercase mb-1 sm:mb-6 font-medium"
          >
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#A89684]" />
            {t.badge}
          </motion.div>

          <motion.h1
            variants={microFadeUp}
            className="font-serif text-[1.15rem] sm:text-5xl font-light text-[#1A1816] tracking-tight leading-[1.15] mb-1 sm:mb-4"
          >
            {t.appTitle}
          </motion.h1>

          <motion.div
            variants={microFadeUp}
            className="text-[9px] sm:text-base text-[#61574D] font-light leading-[1.25] sm:leading-relaxed max-w-md mb-0 sm:mb-8 space-y-0.5 sm:space-y-3"
          >
            {t.appIntro.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </motion.div>
        </div>

        <motion.div variants={microFadeUp} className="mx-auto my-1 sm:mb-8 w-full max-w-md shrink-0 flex justify-center">
          <img
            src={welcomeHeroImg}
            alt="MARGO Bridal & Special Occasion"
            className="block h-auto w-auto max-w-full max-h-[min(36vh,300px)] sm:max-h-[min(56vh,640px)] object-contain object-center rounded-lg sm:rounded-2xl shadow-lg sm:shadow-2xl border border-[#E8E2D9] bg-[#F3EEE6]"
          />
        </motion.div>

        <div className="w-full flex flex-col items-center shrink-0">
          <motion.div
            variants={microFadeUp}
            className="grid grid-cols-3 gap-1 sm:gap-3 w-full max-w-md mb-1.5 sm:mb-8 text-left"
          >
            <div className="p-1 sm:p-3 rounded-md sm:rounded-xl bg-[#F6F1EA] border border-[#E9E2D8]">
              <Clock className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-[#8C7D70] mb-0.5 sm:mb-1.5" />
              <div className="text-[7px] sm:text-[11px] font-semibold text-[#1A1816] uppercase tracking-wider leading-tight">
                {t.stats.time.title}
              </div>
              <div className="text-[7px] sm:text-[11px] text-[#786D63] leading-tight">{t.stats.time.desc}</div>
            </div>
            <div className="p-1 sm:p-3 rounded-md sm:rounded-xl bg-[#F6F1EA] border border-[#E9E2D8]">
              <Compass className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-[#8C7D70] mb-0.5 sm:mb-1.5" />
              <div className="text-[7px] sm:text-[11px] font-semibold text-[#1A1816] uppercase tracking-wider leading-tight">
                {t.stats.ai.title}
              </div>
              <div className="text-[7px] sm:text-[11px] text-[#786D63] leading-tight">{t.stats.ai.desc}</div>
            </div>
            <div className="p-1 sm:p-3 rounded-md sm:rounded-xl bg-[#F6F1EA] border border-[#E9E2D8]">
              <ShieldCheck className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-[#8C7D70] mb-0.5 sm:mb-1.5" />
              <div className="text-[7px] sm:text-[11px] font-semibold text-[#1A1816] uppercase tracking-wider leading-tight">
                {t.stats.privacy.title}
              </div>
              <div className="text-[7px] sm:text-[11px] text-[#786D63] leading-tight">
                {t.stats.privacy.desc}
              </div>
            </div>
          </motion.div>

          <motion.button
            variants={microFadeUp}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            id="start-consultation-btn"
            type="button"
            onClick={() => {
              setAcceptTerms(false);
              setAcceptPrivacy(false);
              setShowConsent(true);
            }}
            className="w-full max-w-md py-2.5 sm:py-4 px-6 rounded-full bg-[#1A1816] text-[#FAF8F5] hover:bg-[#2C2723] transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 text-[9px] sm:text-sm font-medium tracking-[0.18em] uppercase shadow-lg shadow-black/10 cursor-pointer"
          >
            <span>{t.startBtn}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D8CEBF]" />
          </motion.button>

          <motion.div
            variants={microFadeUpSubtle}
            className="text-[7px] sm:text-[11px] tracking-wider text-[#988E84] mt-1 sm:mt-4 uppercase space-y-0 sm:space-y-1"
          >
            <div>{t.citiesFooter}</div>
            <div>{t.citiesFooterSub}</div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showConsent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-[#1A1816]/45 backdrop-blur-[2px] p-3 sm:p-6"
            onClick={() => setShowConsent(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[88dvh] overflow-hidden rounded-2xl bg-[#FAF8F5] border border-[#E8E1D6] shadow-2xl flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="consent-title"
            >
              <div className="flex items-start justify-between gap-3 px-4 sm:px-5 pt-4 pb-3 border-b border-[#EAE3D9]">
                <div>
                  <h2
                    id="consent-title"
                    className="font-serif text-xl sm:text-2xl font-light text-[#1A1816] tracking-tight"
                  >
                    {t.consentTitle}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#706459] font-light mt-1 leading-relaxed">
                    {t.consentIntro}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowConsent(false)}
                  className="w-8 h-8 rounded-full border border-[#E2DAD0] flex items-center justify-center text-[#6B6157] hover:bg-[#EFE9E1] shrink-0"
                  aria-label={t.consentCancelBtn}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto px-4 sm:px-5 py-4 space-y-4 text-left">
                <section>
                  <h3 className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#544B43] mb-1.5">
                    {t.consentTermsTitle}
                  </h3>
                  <div className="space-y-1.5 text-xs text-[#63574D] font-light leading-relaxed">
                    {t.consentTermsBody.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>
                <section>
                  <h3 className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#544B43] mb-1.5">
                    {t.consentPrivacyTitle}
                  </h3>
                  <div className="space-y-1.5 text-xs text-[#63574D] font-light leading-relaxed">
                    {t.consentPrivacyBody.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-0.5 accent-[#1A1816]"
                  />
                  <span className="text-xs text-[#1A1816] leading-snug">{t.consentTermsCheck}</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptPrivacy}
                    onChange={(e) => setAcceptPrivacy(e.target.checked)}
                    className="mt-0.5 accent-[#1A1816]"
                  />
                  <span className="text-xs text-[#1A1816] leading-snug">{t.consentPrivacyCheck}</span>
                </label>
              </div>

              <div className="px-4 sm:px-5 py-3 border-t border-[#EAE3D9] flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => setShowConsent(false)}
                  className="flex-1 py-3 rounded-full border border-[#D9D1C5] text-xs uppercase tracking-[0.16em] text-[#54493F] hover:bg-[#F2EDE5]"
                >
                  {t.consentCancelBtn}
                </button>
                <button
                  type="button"
                  disabled={!canAccept}
                  onClick={handleAccept}
                  className={`flex-1 py-3 rounded-full text-xs uppercase tracking-[0.16em] ${
                    canAccept
                      ? 'bg-[#1A1816] text-[#FAF8F5] hover:bg-[#2C2723] cursor-pointer'
                      : 'bg-[#E5DDD2] text-[#9E9488] cursor-not-allowed'
                  }`}
                >
                  {t.consentAcceptBtn}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
