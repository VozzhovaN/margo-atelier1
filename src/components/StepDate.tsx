import React from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { getTimelineOptions } from '../data/atelierContent';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { staggerContainer, microFadeUp, microFadeUpSubtle } from '../utils/motion';

interface StepDateProps {
  date: string;
  timeline: string;
  setting?: string;
  onUpdate: (data: { date: string; timeline: string; setting?: string }) => void;
  onNext: () => void;
  lang: SupportedLanguage;
}

const SETTINGS_LOCALIZED: Record<SupportedLanguage, string[]> = {
  ru: [
    'Средиземноморская вилла / Морское побережье',
    'Историческое итальянское палаццо / Замок',
    'Метрополитен Black Tie / Гала-вечер',
    'Камерный сад / Виноградное поместье',
    'Современное архитектурное пространство',
    'Еще выбираем / Гибкий формат',
  ],
  en: [
    'Mediterranean Villa / Seaside',
    'Historic Italian Palace / Castello',
    'Metropolitan Black Tie / Gala',
    'Intimate Garden / Vineyard Estate',
    'Modern Architectural Venue',
    'Still Deciding / Flexible',
  ],
};

export const StepDate: React.FC<StepDateProps> = ({
  date,
  timeline,
  setting = '',
  onUpdate,
  onNext,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const timelineOptions = getTimelineOptions(lang);
  const settingsList = SETTINGS_LOCALIZED[lang];
  const isValid = !!timeline || !!date;

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
          {t.step02Badge}
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1816] tracking-tight">
          {t.step02Title} <span className="italic font-normal">{t.step02TitleItalic}</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#706459] mt-1 font-light">
          {t.step02Subtitle}
        </p>
      </motion.div>

      {/* Specific Date Picker Input */}
      <motion.div variants={microFadeUp} className="mb-6 p-4 rounded-2xl bg-[#F6F1EA] border border-[#E9E2D8]">
        <label htmlFor="event-date-input" className="block text-xs font-medium uppercase tracking-[0.15em] text-[#544B43] mb-2 flex items-center gap-1.5">
          <CalendarIcon className="w-3.5 h-3.5 text-[#8C7D70]" />
          {t.step02DateLabel}
        </label>
        <input
          id="event-date-input"
          type="date"
          value={date}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => onUpdate({ date: e.target.value, timeline, setting })}
          className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#D9D1C5] text-[#1A1816] text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1816] focus:border-[#1A1816] transition-all font-sans"
        />
      </motion.div>

      {/* Or Timeline Estimate Chips */}
      <motion.div variants={microFadeUp} className="mb-6">
        <span className="block text-xs font-medium uppercase tracking-[0.15em] text-[#544B43] mb-2.5 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#8C7D70]" />
          {t.step02TimelineLabel}
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          {timelineOptions.map((item) => {
            const isSelected = timeline === item.label;
            return (
              <motion.button
                key={item.id}
                id={`timeline-${item.id}`}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onUpdate({ date, timeline: item.label, setting })}
                className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#1A1816] text-[#FAF8F5] border-[#1A1816] shadow-md'
                    : 'bg-[#FAF8F5] text-[#2D2823] border-[#E8E1D6] hover:border-[#BDB0A2]'
                }`}
              >
                <div className="font-medium text-xs sm:text-sm tracking-wide">
                  {item.label}
                </div>
                <div
                  className={`text-[10px] mt-0.5 tracking-wider uppercase ${
                    isSelected ? 'text-[#D8CEBF]' : 'text-[#877C72]'
                  }`}
                >
                  {item.note}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Setting / Atmosphere */}
      <motion.div variants={microFadeUp} className="mb-8">
        <span className="block text-xs font-medium uppercase tracking-[0.15em] text-[#544B43] mb-2.5 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#8C7D70]" />
          {t.step02SettingLabel}
        </span>
        <div className="flex flex-wrap gap-2">
          {settingsList.map((loc) => {
            const isSelected = setting === loc;
            return (
              <motion.button
                key={loc}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onUpdate({ date, timeline, setting: loc })}
                className={`px-3.5 py-2 rounded-full text-xs transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#EAE2D6] text-[#1A1816] font-medium border-[#B8AA99]'
                    : 'bg-[#FAF8F5] text-[#61564C] border-[#E8E1D6] hover:border-[#CEC2B4]'
                }`}
              >
                {loc}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Navigation Footer */}
      <motion.div variants={microFadeUpSubtle} className="sticky bottom-4 z-20 w-full pt-2">
        <button
          id="date-continue-btn"
          type="button"
          disabled={!isValid}
          onClick={onNext}
          className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-all duration-200 shadow-md ${
            isValid
              ? 'bg-[#1A1816] text-[#FAF8F5] hover:bg-[#2C2723] active:scale-[0.99] cursor-pointer'
              : 'bg-[#E5DDD2] text-[#9E9488] cursor-not-allowed'
          }`}
        >
          {t.step02Continue}
        </button>
      </motion.div>
    </motion.div>
  );
};

