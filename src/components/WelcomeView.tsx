import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Clock, ShieldCheck, Compass } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { staggerContainer, microFadeUp, microFadeUpSubtle } from '../utils/motion';
import welcomeHeroImg from '../assets/images/margo_welcome_hero.png';

interface WelcomeViewProps {
  onStart: () => void;
  lang: SupportedLanguage;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onStart, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <motion.div
      variants={staggerContainer(0.04, 0.02)}
      initial="initial"
      animate="animate"
      className="w-full max-w-xl mx-auto px-3 sm:px-4 py-1 sm:py-10 flex flex-col items-center text-center h-full min-h-0 sm:h-auto sm:min-h-0 overflow-hidden sm:overflow-visible justify-between gap-1 sm:gap-0"
    >
      <div className="w-full flex flex-col items-center shrink-0">
        {/* Editorial Badge */}
        <motion.div
          variants={microFadeUpSubtle}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF5EE] border border-[#E5DDD2] text-[8px] sm:text-[11px] tracking-[0.2em] text-[#6B5E53] uppercase mb-1 sm:mb-6 font-medium"
        >
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#A89684]" />
          {t.badge}
        </motion.div>

        {/* Main Title */}
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

      {/* Editorial Hero — keep portrait ratio, never squash into a strip */}
      <motion.div
        variants={microFadeUp}
        className="relative aspect-[3/4] h-[min(36vh,300px)] w-auto max-w-full mx-auto sm:h-auto sm:w-full sm:max-w-md sm:max-h-none rounded-lg sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl my-1 sm:mb-8 border border-[#E8E2D9] shrink-0"
      >
        <img
          src={welcomeHeroImg}
          alt="MARGO Bridal & Special Occasion"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-contain object-center"
        />
      </motion.div>

      <div className="w-full flex flex-col items-center shrink-0">
        {/* Key Guarantees */}
        <motion.div
          variants={microFadeUp}
          className="grid grid-cols-3 gap-1 sm:gap-3 w-full max-w-md mb-1.5 sm:mb-8 text-left"
        >
          <div className="p-1 sm:p-3 rounded-md sm:rounded-xl bg-[#F6F1EA] border border-[#E9E2D8] transition-transform duration-200 hover:-translate-y-0.5">
            <Clock className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-[#8C7D70] mb-0.5 sm:mb-1.5" />
            <div className="text-[7px] sm:text-[11px] font-semibold text-[#1A1816] uppercase tracking-wider leading-tight">{t.stats.time.title}</div>
            <div className="text-[7px] sm:text-[11px] text-[#786D63] leading-tight">{t.stats.time.desc}</div>
          </div>
          <div className="p-1 sm:p-3 rounded-md sm:rounded-xl bg-[#F6F1EA] border border-[#E9E2D8] transition-transform duration-200 hover:-translate-y-0.5">
            <Compass className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-[#8C7D70] mb-0.5 sm:mb-1.5" />
            <div className="text-[7px] sm:text-[11px] font-semibold text-[#1A1816] uppercase tracking-wider leading-tight">{t.stats.ai.title}</div>
            <div className="text-[7px] sm:text-[11px] text-[#786D63] leading-tight">{t.stats.ai.desc}</div>
          </div>
          <div className="p-1 sm:p-3 rounded-md sm:rounded-xl bg-[#F6F1EA] border border-[#E9E2D8] transition-transform duration-200 hover:-translate-y-0.5">
            <ShieldCheck className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-[#8C7D70] mb-0.5 sm:mb-1.5" />
            <div className="text-[7px] sm:text-[11px] font-semibold text-[#1A1816] uppercase tracking-wider leading-tight">{t.stats.privacy.title}</div>
            <div className="text-[7px] sm:text-[11px] text-[#786D63] leading-tight">{t.stats.privacy.desc}</div>
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
  );
};
