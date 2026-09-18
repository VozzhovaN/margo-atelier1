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

  const toggleColor = (name: string) => {
    let next: string[];
    if (selectedColors.includes(name)) {
      next = selectedColors.filter((c) => c !== name);
    } else {
      // Allow up to 2 complementary colors
      if (selectedColors.length >= 2) {
        next = [selectedColors[1], name];
      } else {
        next = [...selectedColors, name];
      }
    }
    onUpdate({ colors: next, customColorNote: note });
  };

  const handleNoteChange = (val: string) => {
    setNote(val);
    onUpdate({ colors: selectedColors, customColorNote: val });
  };

  const isValid = selectedColors.length > 0 || note.trim().length > 0;

  return (
    <motion.div
      variants={staggerContainer(0.05, 0.03)}
      initial="initial"
      animate="animate"
      className="w-full max-w-xl mx-auto px-4 py-4 flex flex-col"
    >
      {/* Header */}
      <motion.div variants={microFadeUp} className="text-center mb-6">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#968A7F] block mb-1">
          {t.step06Badge}
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1816] tracking-tight">
          {t.step06Title} <span className="italic font-normal">{t.step06TitleItalic}</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#706459] mt-1 font-light">
          {t.step06Subtitle}
        </p>
      </motion.div>

      {/* Swatches List */}
      <div className="space-y-3 mb-6">
        {colours.map((item) => {
          const isSelected = selectedColors.includes(item.name) || selectedColors.includes(item.id);
          return (
            <motion.div
              key={item.id}
              id={`color-${item.id}`}
              variants={microFadeUp}
              whileHover={{ y: -2, transition: { duration: 0.2, ease: 'easeOut' } }}
              whileTap={{ scale: 0.985 }}
              onClick={() => toggleColor(item.name)}
              className={`p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-colors duration-300 border ${
                isSelected
                  ? 'bg-[#FAF6F0] border-[#1A1816] ring-1 ring-[#1A1816] shadow-md'
                  : 'bg-[#FAF8F5] border-[#E8E1D6] hover:border-[#BDB0A2]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                {/* Visual Swatch Pill with gradient dual-tone */}
                <div
                  className="w-12 h-12 rounded-xl shadow-inner border border-black/10 shrink-0 flex overflow-hidden"
                  style={{
                    background: item.secondaryHex
                      ? `linear-gradient(135deg, ${item.hex} 0%, ${item.secondaryHex} 100%)`
                      : item.hex,
                  }}
                />

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base sm:text-lg font-light text-[#1A1816] tracking-wide">
                      {item.name}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-[#8A7D71] px-2 py-0.5 rounded-full bg-[#EFE9E0]">
                      {item.paletteMood}
                    </span>
                  </div>
                  <p className="text-xs text-[#63574D] font-light mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Check indicator */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 ml-2 transition-all ${
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

      {/* Custom Swatch Note */}
      <motion.div variants={microFadeUp} className="mb-8 p-4 rounded-2xl bg-[#F6F1EA] border border-[#E9E2D8]">
        <label htmlFor="custom-color-input" className="block text-xs font-medium uppercase tracking-[0.15em] text-[#544B43] mb-1.5 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-[#8C7D70]" />
          {t.step06CustomLabel}
        </label>
        <input
          id="custom-color-input"
          type="text"
          placeholder={t.step06CustomPlaceholder}
          value={note}
          onChange={(e) => handleNoteChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D9D1C5] text-xs sm:text-sm text-[#1A1816] focus:outline-none focus:ring-1 focus:ring-[#1A1816]"
        />
      </motion.div>

      {/* Navigation Footer */}
      <motion.div variants={microFadeUpSubtle} className="sticky bottom-4 z-20 w-full pt-2">
        <button
          id="color-continue-btn"
          type="button"
          disabled={!isValid}
          onClick={onNext}
          className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-all duration-200 shadow-md ${
            isValid
              ? 'bg-[#1A1816] text-[#FAF8F5] hover:bg-[#2C2723] active:scale-[0.99] cursor-pointer'
              : 'bg-[#E5DDD2] text-[#9E9488] cursor-not-allowed'
          }`}
        >
          {isValid ? t.step06Continue : (lang === 'ru' ? 'Выберите хотя бы 1 оттенок' : 'Select at Least 1 Tone')}
        </button>
      </motion.div>
    </motion.div>
  );
};

