import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { getStyles } from '../data/atelierContent';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { staggerContainer, microFadeUp, microFadeUpSubtle } from '../utils/motion';

interface StepStyleProps {
  selected: string;
  onSelect: (style: string) => void;
  onNext: () => void;
  lang: SupportedLanguage;
}

export const StepStyle: React.FC<StepStyleProps> = ({ selected, onSelect, onNext, lang }) => {
  const t = TRANSLATIONS[lang];
  const styles = getStyles(lang);

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
          {t.step05Badge}
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1816] tracking-tight">
          {t.step05Title} <span className="italic font-normal">{t.step05TitleItalic}</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#706459] mt-1 font-light">
          {t.step05Subtitle}
        </p>
      </motion.div>

      {/* Style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
        {styles.map((item) => {
          const isSelected = selected === item.name || selected === item.id;
          return (
            <motion.div
              key={item.id}
              id={`style-${item.id}`}
              variants={microFadeUp}
              whileHover={{ y: -3, transition: { duration: 0.22, ease: 'easeOut' } }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelect(item.name)}
              className={`group flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-colors duration-300 border ${
                isSelected
                  ? 'bg-[#FAF6F0] border-[#1A1816] ring-1 ring-[#1A1816] shadow-lg'
                  : 'bg-[#FAF8F5] border-[#E8E1D6] hover:border-[#BDB0A2] shadow-sm'
              }`}
            >
              {/* Image Header */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ECE6DD]">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                    isSelected ? 'scale-105' : 'group-hover:scale-105'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#1A1816] text-[#FAF8F5] flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className="absolute bottom-2.5 left-3 text-white">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#E0D7CC] font-medium block">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-light text-[#1A1816] tracking-wide mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#63574D] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Mood Keywords */}
                <div className="flex flex-wrap gap-1 mt-3 pt-2.5 border-t border-[#EAE3D9]">
                  {item.moodWords.map((word, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full bg-[#EFE9E0] text-[9px] tracking-wider text-[#61564C] uppercase"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <motion.div variants={microFadeUpSubtle} className="sticky bottom-4 z-20 w-full pt-2">
        <button
          id="style-continue-btn"
          type="button"
          disabled={!selected}
          onClick={onNext}
          className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-all duration-200 shadow-md ${
            selected
              ? 'bg-[#1A1816] text-[#FAF8F5] hover:bg-[#2C2723] active:scale-[0.99] cursor-pointer'
              : 'bg-[#E5DDD2] text-[#9E9488] cursor-not-allowed'
          }`}
        >
          {selected ? t.step05Continue : (lang === 'ru' ? 'Выберите стиль' : 'Select a Style')}
        </button>
      </motion.div>
    </motion.div>
  );
};

