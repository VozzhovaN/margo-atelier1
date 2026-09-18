import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { getBudgetTiers } from '../data/atelierContent';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { staggerContainer, microFadeUp, microFadeUpSubtle } from '../utils/motion';

interface StepBudgetProps {
  selected: string;
  onSelect: (budget: string) => void;
  onNext: () => void;
  lang: SupportedLanguage;
}

export const StepBudget: React.FC<StepBudgetProps> = ({ selected, onSelect, onNext, lang }) => {
  const t = TRANSLATIONS[lang];
  const budgetTiers = getBudgetTiers(lang);

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
          {t.step03Badge}
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1816] tracking-tight">
          {t.step03Title} <span className="italic font-normal">{t.step03TitleItalic}</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#706459] mt-1 font-light">
          {t.step03Subtitle}
        </p>
      </motion.div>

      {/* Budget Tiers List */}
      <div className="space-y-3.5 mb-8">
        {budgetTiers.map((tier) => {
          const isSelected = selected === tier.range;
          return (
            <motion.div
              key={tier.id}
              id={`budget-${tier.id}`}
              variants={microFadeUp}
              whileHover={{ y: -3, transition: { duration: 0.22, ease: 'easeOut' } }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelect(tier.range)}
              className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-colors duration-300 border ${
                isSelected
                  ? 'bg-[#FAF6F0] border-[#1A1816] ring-1 ring-[#1A1816] shadow-lg'
                  : 'bg-[#FAF8F5] border-[#E8E1D6] hover:border-[#BDB0A2] shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#867B71] block font-medium">
                    {tier.tier}
                  </span>
                  <div className="font-serif text-xl sm:text-2xl font-light text-[#1A1816] tracking-wide mt-0.5">
                    {tier.range}
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-[#1A1816] border-[#1A1816] text-[#FAF8F5]'
                      : 'border-[#D9D1C5] bg-[#FAF8F5]'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>

              <p className="text-xs text-[#63574D] leading-relaxed font-light mb-3">
                {tier.description}
              </p>

              {/* What is included */}
              <div className="pt-2.5 border-t border-[#EAE3D9] grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {tier.includes.map((inc, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#786D62]">
                    <Sparkles className="w-2.5 h-2.5 text-[#B8A793] shrink-0" />
                    <span className="truncate">{inc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <motion.div variants={microFadeUpSubtle} className="sticky bottom-4 z-20 w-full pt-2">
        <button
          id="budget-continue-btn"
          type="button"
          disabled={!selected}
          onClick={onNext}
          className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-all duration-200 shadow-md ${
            selected
              ? 'bg-[#1A1816] text-[#FAF8F5] hover:bg-[#2C2723] active:scale-[0.99] cursor-pointer'
              : 'bg-[#E5DDD2] text-[#9E9488] cursor-not-allowed'
          }`}
        >
          {selected ? t.step03Continue : (lang === 'ru' ? 'Выберите категорию' : 'Select Budget Tier')}
        </button>
      </motion.div>
    </motion.div>
  );
};

