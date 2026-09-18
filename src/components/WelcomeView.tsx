import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Clock, ShieldCheck, Compass } from 'lucide-react';
import { CAMPAIGN_ASSETS } from '../data/atelierContent';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { staggerContainer, microFadeUp, microFadeUpSubtle } from '../utils/motion';

interface WelcomeViewProps {
  onStart: () => void;
  lang: SupportedLanguage;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onStart, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <motion.div
      variants={staggerContainer(0.06, 0.04)}
      initial="initial"
      animate="animate"
      className="w-full max-w-xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center text-center"
    >
      {/* Editorial Badge */}
      <motion.div
        variants={microFadeUpSubtle}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E5DDD2] text-[11px] tracking-[0.25em] text-[#6B5E53] uppercase mb-6 font-medium"
      >
        <Sparkles className="w-3 h-3 text-[#A89684]" />
        {t.badge}
      </motion.div>

      {/* Main Title */}
      <motion.h1
        variants={microFadeUp}
        className="font-serif text-3xl sm:text-5xl font-light text-[#1A1816] tracking-tight leading-[1.15] mb-4"
      >
        {t.appTitlePart1} <br />
        <span className="italic font-normal">{t.appTitlePart2}</span>
      </motion.h1>

      <motion.p
        variants={microFadeUp}
        className="text-sm sm:text-base text-[#61574D] font-light leading-relaxed max-w-md mb-8"
      >
        {t.appDescription}
      </motion.p>

      {/* Editorial Hero Visual Card */}
      <motion.div
        variants={microFadeUp}
        className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-w-md rounded-2xl overflow-hidden shadow-2xl mb-8 border border-[#E8E2D9]"
      >
        <img
          src={CAMPAIGN_ASSETS.bridal}
          alt="MARGO Atelier Editorial Couture"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181512]/75 via-[#181512]/20 to-transparent" />

        {/* Floating Atelier Quote in Mediterranean light */}
        <div className="absolute bottom-6 left-6 right-6 text-left text-[#FAF8F5]">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#D8CEBF] block mb-1">
            {t.campaignQuoteBadge}
          </span>
          <p className="font-serif text-base sm:text-lg italic font-light leading-snug">
            {t.campaignQuote}
          </p>
        </div>
      </motion.div>

      {/* Key Guarantees */}
      <motion.div
        variants={microFadeUp}
        className="grid grid-cols-3 gap-3 w-full max-w-md mb-8 text-left"
      >
        <div className="p-3 rounded-xl bg-[#F6F1EA] border border-[#E9E2D8] transition-transform duration-200 hover:-translate-y-0.5">
          <Clock className="w-4 h-4 text-[#8C7D70] mb-1.5" />
          <div className="text-[11px] font-semibold text-[#1A1816] uppercase tracking-wider">{t.stats.time.title}</div>
          <div className="text-[11px] text-[#786D63]">{t.stats.time.desc}</div>
        </div>
        <div className="p-3 rounded-xl bg-[#F6F1EA] border border-[#E9E2D8] transition-transform duration-200 hover:-translate-y-0.5">
          <Compass className="w-4 h-4 text-[#8C7D70] mb-1.5" />
          <div className="text-[11px] font-semibold text-[#1A1816] uppercase tracking-wider">{t.stats.ai.title}</div>
          <div className="text-[11px] text-[#786D63]">{t.stats.ai.desc}</div>
        </div>
        <div className="p-3 rounded-xl bg-[#F6F1EA] border border-[#E9E2D8] transition-transform duration-200 hover:-translate-y-0.5">
          <ShieldCheck className="w-4 h-4 text-[#8C7D70] mb-1.5" />
          <div className="text-[11px] font-semibold text-[#1A1816] uppercase tracking-wider">{t.stats.privacy.title}</div>
          <div className="text-[11px] text-[#786D63]">{t.stats.privacy.desc}</div>
        </div>
      </motion.div>

      {/* Primary CTA */}
      <motion.button
        variants={microFadeUp}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        id="start-consultation-btn"
        type="button"
        onClick={onStart}
        className="w-full max-w-md py-4 px-6 rounded-full bg-[#1A1816] text-[#FAF8F5] hover:bg-[#2C2723] transition-all duration-200 flex items-center justify-center gap-3 text-xs sm:text-sm font-medium tracking-[0.18em] uppercase shadow-lg shadow-black/10 cursor-pointer"
      >
        <span>{t.startBtn}</span>
        <ArrowRight className="w-4 h-4 text-[#D8CEBF]" />
      </motion.button>

      <motion.span
        variants={microFadeUpSubtle}
        className="text-[11px] tracking-wider text-[#988E84] mt-4 uppercase"
      >
        {t.citiesFooter}
      </motion.span>
    </motion.div>
  );
};

