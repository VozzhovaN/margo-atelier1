import React from 'react';
import { motion } from 'motion/react';
import { Ruler, Sparkles } from 'lucide-react';
import { ClientMeasurements } from '../types';
import { getFitPreferences } from '../data/atelierContent';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { staggerContainer, microFadeUp, microFadeUpSubtle } from '../utils/motion';

interface StepMeasurementsProps {
  measurements: ClientMeasurements;
  onUpdate: (measurements: ClientMeasurements) => void;
  onNext: () => void;
  lang: SupportedLanguage;
}

const SIZES_LOCALIZED: Record<SupportedLanguage, string[]> = {
  ru: ['EU 34 (RU 40)', 'EU 36 (RU 42)', 'EU 38 (RU 44)', 'EU 40 (RU 46)', 'EU 42 (RU 48)', 'EU 44 (RU 50)', 'Индивидуальные мерки / Bespoke'],
  en: ['EU 34 (US 2)', 'EU 36 (US 4)', 'EU 38 (US 6)', 'EU 40 (US 8)', 'EU 42 (US 10)', 'EU 44 (US 12)', 'Bespoke Custom Size'],
};

export const StepMeasurements: React.FC<StepMeasurementsProps> = ({
  measurements,
  onUpdate,
  onNext,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const fitPreferences = getFitPreferences(lang);
  const sizeOptions = SIZES_LOCALIZED[lang];

  const handleChange = (field: keyof ClientMeasurements, value: string) => {
    onUpdate({
      ...measurements,
      [field]: value,
    });
  };

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
          {t.step07Badge}
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1816] tracking-tight">
          {t.step07Title} <span className="italic font-normal">{t.step07TitleItalic}</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#706459] mt-1 font-light">
          {t.step07Subtitle}
        </p>
      </motion.div>

      {/* Sizing & Height inputs */}
      <motion.div variants={microFadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
        <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D6]">
          <label htmlFor="height-input" className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#61564C] mb-1.5 flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-[#8C7D70]" />
            {t.step07HeightLabel}
          </label>
          <input
            id="height-input"
            type="text"
            placeholder={t.step07HeightPlaceholder}
            value={measurements.height}
            onChange={(e) => handleChange('height', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#F6F1EA] border border-[#D9D1C5] text-xs sm:text-sm text-[#1A1816] focus:outline-none focus:ring-1 focus:ring-[#1A1816]"
          />
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D6]">
          <label htmlFor="clothing-size-select" className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#61564C] mb-1.5">
            {t.step07SizeLabel}
          </label>
          <select
            id="clothing-size-select"
            value={measurements.clothingSize}
            onChange={(e) => handleChange('clothingSize', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#F6F1EA] border border-[#D9D1C5] text-xs sm:text-sm text-[#1A1816] focus:outline-none focus:ring-1 focus:ring-[#1A1816]"
          >
            <option value="">{t.step07SizeDefault}</option>
            {sizeOptions.map((sz) => (
              <option key={sz} value={sz}>
                {sz}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Fit Sensation Preference */}
      <motion.div variants={microFadeUp} className="mb-6">
        <span className="block text-xs font-medium uppercase tracking-[0.15em] text-[#544B43] mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#8C7D70]" />
          {t.step07FitLabel}
        </span>
        <div className="space-y-2.5">
          {fitPreferences.map((fit) => {
            const isSelected = measurements.fitPreference === fit.title;
            return (
              <motion.div
                key={fit.id}
                id={`fit-${fit.id}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => handleChange('fitPreference', fit.title)}
                className={`p-3.5 rounded-xl cursor-pointer transition-colors border ${
                  isSelected
                    ? 'bg-[#FAF6F0] border-[#1A1816] ring-1 ring-[#1A1816] shadow-sm'
                    : 'bg-[#FAF8F5] border-[#E8E1D6] hover:border-[#BDB0A2]'
                }`}
              >
                <div className="font-serif text-base font-light text-[#1A1816]">
                  {fit.title}
                </div>
                <div className="text-xs text-[#6B5F54] font-light mt-0.5">
                  {fit.desc}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Special focal points / notes */}
      <motion.div variants={microFadeUp} className="mb-8 p-4 rounded-2xl bg-[#F6F1EA] border border-[#E9E2D8]">
        <label htmlFor="fit-notes-textarea" className="block text-xs font-medium uppercase tracking-[0.15em] text-[#544B43] mb-1.5">
          {t.step07NotesLabel}
        </label>
        <textarea
          id="fit-notes-textarea"
          rows={2}
          placeholder={t.step07NotesPlaceholder}
          value={measurements.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D9D1C5] text-xs sm:text-sm text-[#1A1816] focus:outline-none focus:ring-1 focus:ring-[#1A1816] resize-none"
        />
      </motion.div>

      {/* Navigation Footer */}
      <motion.div variants={microFadeUpSubtle} className="sticky bottom-4 z-20 w-full pt-2">
        <button
          id="measurements-continue-btn"
          type="button"
          onClick={onNext}
          className="w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-all duration-200 shadow-md bg-[#1A1816] text-[#FAF8F5] hover:bg-[#2C2723] active:scale-[0.99] cursor-pointer"
        >
          {t.step07Continue}
        </button>
      </motion.div>
    </motion.div>
  );
};

