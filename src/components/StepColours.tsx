import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Palette } from 'lucide-react';
import { getColours } from '../data/atelierContent';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { staggerContainer, microFadeUp, microFadeUpSubtle } from '../utils/motion';

interface StepColoursProps {
  selectedColors: string[];
  customColorNote?: string;
  onUpdate: (data: { colors: string[]; customColorNote?: string }) => void;
  onNext: () => void;
  lang: SupportedLanguage;
}

export const StepColours: React.FC<StepColoursProps> = ({
  selectedColors,
  customColorNote = '',
  onUpdate,
  onNext,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const colours = getColours(lang);
  const [note, setNote] = useState(customColorNote);
  const undecidedId = 'undecided';
  const isValid = selectedColors.length > 0;

  const toggleColor = (id: string) => {
    let next: string[];

    if (id === undecidedId) {
      next = selectedColors.includes(undecidedId) ? [] : [undecidedId];
    } else {
      const withoutUndecided = selectedColors.filter((c) => c !== undecidedId);
      if (withoutUndecided.includes(id)) {
        next = withoutUndecided.filter((c) => c !== id);
      } else if (withoutUndecided.length >= 2) {
        next = [withoutUndecided[1], id];
      } else {
        next = [...withoutUndecided, id];
      }
    }

    onUpdate({ colors: next, customColorNote: note });
  };

  const handleNoteChange = (val: string) => {
    setNote(val);
    onUpdate({ colors: selectedColors, customColorNote: val });
  };

  return (
    <motion.div
      variants={staggerContainer(0.05, 0.03)}
      initial="initial"
      animate="animate"
      className="w-full max-w-xl mx-auto px-3 sm:px-4 pt-2 sm:pt-4 pb-44 sm:pb-36 flex flex-col min-w-0"
    >
      <motion.div variants={microFadeUp} className="text-center mb-5 sm:mb-6 px-0.5">
        <span className="text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#968A7F] block mb-1">
          {t.step06Badge}
        </span>
        <h2 className="font-serif text-[1.35rem] sm:text-4xl font-light text-[#1A1816] tracking-tight leading-snug break-words">
          {t.step06Title} <span className="italic font-normal">{t.step06TitleItalic}</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#706459] mt-2 font-light leading-relaxed max-w-md mx-auto break-words">
          {t.step06Subtitle}
        </p>
      </motion.div>

      <div className="space-y-3 mb-5">
        {colours.map((item) => {
          const isSelected = selectedColors.includes(item.id);
          const isLight = ['white', 'ivory', 'light_champagne', 'sand', 'powder_rose', 'rose_lilac', 'peach', 'soft_blue', 'undecided'].includes(item.id);

          return (
            <motion.div
              key={item.id}
              id={`color-${item.id}`}
              variants={microFadeUp}
              whileHover={{ y: -2, transition: { duration: 0.2, ease: 'easeOut' } }}
              whileTap={{ scale: 0.985 }}
              onClick={() => toggleColor(item.id)}
              className={`p-4 rounded-2xl flex items-start sm:items-center justify-between gap-3 cursor-pointer transition-colors duration-300 border min-w-0 ${
                isSelected
                  ? 'bg-[#FAF6F0] border-[#1A1816] ring-1 ring-[#1A1816] shadow-md'
                  : 'bg-[#FAF8F5] border-[#E8E1D6] hover:border-[#BDB0A2]'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <div
                  className={`w-12 h-12 rounded-xl shrink-0 flex overflow-hidden border ${
                    isLight ? 'border-black/10 shadow-inner' : 'border-white/15 shadow-sm'
                  }`}
                  style={{
                    background: item.secondaryHex
                      ? `linear-gradient(135deg, ${item.hex} 0%, ${item.secondaryHex} 100%)`
                      : item.hex,
                  }}
                />

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-serif text-base sm:text-lg font-light text-[#1A1816] tracking-wide leading-snug break-words">
                      {item.name}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-[#8A7D71] px-2 py-0.5 rounded-full bg-[#EFE9E0] leading-snug">
                      {item.paletteMood}
                    </span>
                  </div>
                  <p className="text-xs text-[#63574D] font-light mt-1 leading-relaxed break-words">
                    {item.description}
                  </p>
                </div>
              </div>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 mt-0.5 transition-all ${
                  isSelected
                    ? 'bg-[#1A1816] border-[#1A1816] text-[#FAF8F5]'
                    : 'border-[#D9D1C5] bg-[#FAF8F5]'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div variants={microFadeUp} className="mb-4 p-4 rounded-2xl bg-[#F6F1EA] border border-[#E9E2D8]">
        <label
          htmlFor="custom-color-input"
          className="block text-xs font-medium uppercase tracking-[0.15em] text-[#544B43] mb-1 flex items-center gap-1.5"
        >
          <Palette className="w-3.5 h-3.5 text-[#8C7D70]" />
          {t.step06CustomLabel}
        </label>
        <span className="block text-[10px] text-[#8A7D71] mb-2 font-light">
          {t.step06CustomOptional}
        </span>
        <input
          id="custom-color-input"
          type="text"
          placeholder={t.step06CustomPlaceholder}
          value={note}
          onChange={(e) => handleNoteChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D9D1C5] text-xs sm:text-sm text-[#1A1816] placeholder:text-[#A3988C] focus:outline-none focus:ring-1 focus:ring-[#1A1816]"
        />
      </motion.div>

      <motion.p
        variants={microFadeUp}
        className="text-[10px] sm:text-[11px] text-[#8A7D71] font-light leading-relaxed mb-6 text-center max-w-md mx-auto"
      >
        {t.step06Disclaimer}
      </motion.p>

      <motion.div
        variants={microFadeUpSubtle}
        className="fixed bottom-0 inset-x-0 z-20 px-3 sm:px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/95 to-transparent"
      >
        <div className="w-full max-w-xl mx-auto">
          <button
            id="color-continue-btn"
            type="button"
            disabled={!isValid}
            onClick={onNext}
            className={`w-full py-3.5 px-4 sm:px-6 rounded-full text-[10px] sm:text-sm font-medium tracking-[0.14em] sm:tracking-[0.2em] uppercase transition-all duration-200 shadow-md break-words leading-snug ${
              isValid
                ? 'bg-[#1A1816] text-[#FAF8F5] hover:bg-[#2C2723] active:scale-[0.99] cursor-pointer'
                : 'bg-[#E5DDD2] text-[#9E9488] cursor-not-allowed'
            }`}
          >
            {t.step06Continue}
          </button>

          <div className="mt-3 mb-1 text-center uppercase text-[#9A9085]">
            <div className="font-serif text-[8px] sm:text-[9px] tracking-[0.12em] text-[#6F655C] leading-snug">
              {t.step06PageFooterBrand}
            </div>
            <div className="text-[7px] sm:text-[8px] tracking-[0.1em] mt-0.5 leading-snug">
              {t.step06PageFooterPlace}
              <span className="mx-1.5">·</span>
              {t.step06PageFooterMode}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
