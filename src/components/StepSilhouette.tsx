import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { getSilhouettes } from '../data/atelierContent';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { staggerContainer, microFadeUp, microFadeUpSubtle } from '../utils/motion';

interface StepSilhouetteProps {
  selected: string;
  onSelect: (silhouette: string) => void;
  onNext: () => void;
  lang: SupportedLanguage;
}

export const StepSilhouette: React.FC<StepSilhouetteProps> = ({ selected, onSelect, onNext, lang }) => {
  const t = TRANSLATIONS[lang];
  const silhouettes = getSilhouettes(lang);

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
          {t.step04Badge}
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1816] tracking-tight">
          {t.step04Title} <span className="italic font-normal">{t.step04TitleItalic}</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#706459] mt-1 font-light">
          {t.step04Subtitle}
        </p>
      </motion.div>

      {/* Silhouette Cards */}
      <div className="space-y-4 mb-8">
        {silhouettes.map((item) => {
          const isSelected = selected === item.name || selected === item.id;
          return (
            <motion.div
              key={item.id}
              id={`silhouette-${item.id}`}
              variants={microFadeUp}
              whileHover={{ y: -3, transition: { duration: 0.22, ease: 'easeOut' } }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelect(item.name)}
              className={`group flex flex-col sm:flex-row rounded-2xl overflow-hidden cursor-pointer transition-colors duration-300 border ${
                isSelected
                  ? 'bg-[#FAF6F0] border-[#1A1816] ring-1 ring-[#1A1816] shadow-lg'
                  : 'bg-[#FAF8F5] border-[#E8E1D6] hover:border-[#BDB0A2] shadow-sm'
              }`}
            >
              {/* Image preview thumbnail (3:4 or 4:5 on mobile, 1:1 or 3:4 on desktop) */}
              <div className="relative sm:w-44 aspect-[4/3] sm:aspect-[3/4] overflow-hidden bg-[#ECE6DD] shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                    isSelected ? 'scale-105' : 'group-hover:scale-105'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:hidden" />
              </div>

              {/* Text content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#867B71] block font-medium">
                        {item.subtitle}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-light text-[#1A1816] tracking-wide mt-0.5">
                        {item.name}
                      </h3>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 transition-all ${
                        isSelected
                          ? 'bg-[#1A1816] border-[#1A1816] text-[#FAF8F5]'
                          : 'border-[#D9D1C5] bg-[#FAF8F5]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>

                  <p className="text-xs text-[#63574D] mt-2 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Characteristics tags */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#EAE3D9]">
                  {item.characteristics.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full bg-[#EFE9E0] text-[10px] text-[#61564C] tracking-wider"
                    >
                      {tag}
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
          id="silhouette-continue-btn"
          type="button"
          disabled={!selected}
          onClick={onNext}
          className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-all duration-200 shadow-md ${
            selected
              ? 'bg-[#1A1816] text-[#FAF8F5] hover:bg-[#2C2723] active:scale-[0.99] cursor-pointer'
              : 'bg-[#E5DDD2] text-[#9E9488] cursor-not-allowed'
          }`}
        >
          {selected ? t.step04Continue : (lang === 'ru' ? 'Выберите силуэт' : 'Select a Silhouette')}
        </button>
      </motion.div>
    </motion.div>
  );
};

