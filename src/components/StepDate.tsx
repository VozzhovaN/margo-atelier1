import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import {
  getEventSettings,
  getTimelineOptions,
  timelineLabelFromDate,
} from '../data/atelierContent';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { staggerContainer, microFadeUp, microFadeUpSubtle } from '../utils/motion';

interface StepDateProps {
  date: string;
  timeline: string;
  settings: string[];
  settingOther: string;
  eventCity: string;
  onUpdate: (data: {
    date: string;
    timeline: string;
    settings: string[];
    settingOther: string;
    eventCity: string;
  }) => void;
  onNext: () => void;
  lang: SupportedLanguage;
}

export const StepDate: React.FC<StepDateProps> = ({
  date,
  timeline,
  settings = [],
  settingOther = '',
  eventCity = '',
  onUpdate,
  onNext,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const timelineOptions = getTimelineOptions(lang);
  const settingsList = getEventSettings(lang);
  const otherLabel = settingsList.find((s) => s.id === 'other')?.label ?? '';
  const undecidedSettingLabel = settingsList.find((s) => s.id === 'undecided')?.label ?? '';
  const undecidedTimelineLabel =
    timelineOptions.find((s) => s.id === 'undecided')?.label ?? '';
  const hasDate = !!date;
  const showOtherField = settings.includes(otherLabel);
  const isValid = !!timeline;
  const [dateFocused, setDateFocused] = useState(false);

  const pushUpdate = (next: {
    date?: string;
    timeline?: string;
    settings?: string[];
    settingOther?: string;
    eventCity?: string;
  }) => {
    onUpdate({
      date: next.date ?? date,
      timeline: next.timeline ?? timeline,
      settings: next.settings ?? settings,
      settingOther: next.settingOther ?? settingOther,
      eventCity: next.eventCity ?? eventCity,
    });
  };

  const handleDateChange = (value: string) => {
    if (!value) {
      pushUpdate({ date: '' });
      return;
    }
    const autoTimeline = timelineLabelFromDate(value, lang);
    pushUpdate({ date: value, timeline: autoTimeline });
  };

  const handleTimelineSelect = (label: string) => {
    if (label === undecidedTimelineLabel) {
      pushUpdate({ timeline: label, date: '' });
      return;
    }
    if (hasDate) return;
    pushUpdate({ timeline: label });
  };

  const toggleSetting = (label: string) => {
    let next: string[];
    if (label === undecidedSettingLabel) {
      next = settings.includes(label) ? [] : [label];
    } else if (settings.includes(label)) {
      next = settings.filter((s) => s !== label);
    } else {
      next = [...settings.filter((s) => s !== undecidedSettingLabel), label];
    }

    pushUpdate({
      settings: next,
      settingOther: next.includes(otherLabel) ? settingOther : '',
    });
  };

  return (
    <motion.div
      variants={staggerContainer(0.05, 0.03)}
      initial="initial"
      animate="animate"
      className="w-full max-w-xl mx-auto px-3 sm:px-4 pt-2 sm:pt-4 pb-36 sm:pb-28 flex flex-col min-w-0 box-border"
    >
      {/* Header */}
      <motion.div variants={microFadeUp} className="text-center mb-5 sm:mb-6 px-0.5">
        <span className="text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#968A7F] block mb-1">
          {t.step02Badge}
        </span>
        <h2 className="font-serif text-[1.35rem] sm:text-4xl font-light text-[#1A1816] tracking-tight leading-snug break-words">
          {t.step02Title} <span className="italic font-normal">{t.step02TitleItalic}</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#706459] mt-2 font-light leading-relaxed max-w-md mx-auto break-words">
          {t.step02Subtitle}
        </p>
      </motion.div>

      {/* Specific Date Picker Input */}
      <motion.div
        variants={microFadeUp}
        className="mb-6 p-3 sm:p-4 rounded-2xl bg-[#F6F1EA] border border-[#E9E2D8] min-w-0 max-w-full overflow-hidden box-border"
      >
        <label
          htmlFor="event-date-input"
          className="block text-[11px] sm:text-xs font-medium uppercase tracking-[0.12em] sm:tracking-[0.15em] text-[#544B43] mb-2 leading-snug break-words"
        >
          <span className="inline-flex items-start gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-[#8C7D70] shrink-0 mt-0.5" />
            <span>{t.step02DateLabel}</span>
          </span>
        </label>
        <div className="relative min-w-0 w-full max-w-full">
          <input
            id="event-date-input"
            type="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(e.target.value)}
            onFocus={() => setDateFocused(true)}
            onBlur={() => setDateFocused(false)}
            aria-label={t.step02DatePlaceholder}
            className={`block w-full min-w-0 max-w-full box-border px-3 sm:px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#D9D1C5] text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1816] focus:border-[#1A1816] transition-all font-sans appearance-none [-webkit-appearance:none] ${
              date || dateFocused ? 'text-[#1A1816]' : 'text-transparent'
            }`}
          />
          {!date && !dateFocused && (
            <span className="pointer-events-none absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-sm text-[#9E9488]">
              {t.step02DatePlaceholder}
            </span>
          )}
        </div>
      </motion.div>

      {/* Timeline Estimate */}
      <motion.div variants={microFadeUp} className="mb-6 min-w-0">
        <span className="block text-[11px] sm:text-xs font-medium uppercase tracking-[0.12em] sm:tracking-[0.15em] text-[#544B43] mb-2.5 leading-snug break-words">
          <span className="inline-flex items-start gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#8C7D70] shrink-0 mt-0.5" />
            <span>{t.step02TimelineLabel}</span>
          </span>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
          {timelineOptions.map((item) => {
            const isSelected = timeline === item.label;
            const isUndecided = item.label === undecidedTimelineLabel;
            const lockedByDate = hasDate && !isUndecided;
            return (
              <motion.button
                key={item.id}
                id={`timeline-${item.id}`}
                type="button"
                whileHover={lockedByDate ? undefined : { y: -2 }}
                whileTap={lockedByDate ? undefined : { scale: 0.98 }}
                onClick={() => handleTimelineSelect(item.label)}
                disabled={lockedByDate}
                className={`p-3 sm:p-3.5 rounded-xl text-left transition-all border min-w-0 ${
                  isSelected
                    ? 'bg-[#1A1816] text-[#FAF8F5] border-[#1A1816] shadow-md'
                    : 'bg-[#FAF8F5] text-[#2D2823] border-[#E8E1D6] hover:border-[#BDB0A2]'
                } ${lockedByDate ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="font-medium text-xs sm:text-sm tracking-wide break-words leading-snug">
                  {item.label}
                </div>
              </motion.button>
            );
          })}
        </div>

        {hasDate && (
          <p className="text-[10px] tracking-wider uppercase text-[#877C72] mb-2 break-words">
            {t.step02TimelineAutoHint}
          </p>
        )}

        <p className="text-[11px] text-[#877C72] font-light leading-relaxed break-words">
          {t.step02TimelineNote}
        </p>
      </motion.div>

      {/* Setting / Format — multi-select */}
      <motion.div variants={microFadeUp} className="mb-4 min-w-0">
        <span className="block text-[11px] sm:text-xs font-medium uppercase tracking-[0.12em] sm:tracking-[0.15em] text-[#544B43] mb-1 leading-snug break-words">
          <span className="inline-flex items-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#8C7D70] shrink-0 mt-0.5" />
            <span>{t.step02SettingLabel}</span>
          </span>
        </span>
        <p className="text-[11px] text-[#877C72] font-light mb-2.5 break-words">{t.step02SettingHint}</p>
        <div className="flex flex-wrap gap-2">
          {settingsList.map((loc) => {
            const isSelected = settings.includes(loc.label);
            return (
              <motion.button
                key={loc.id}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleSetting(loc.label)}
                className={`px-3 py-2 rounded-full text-xs transition-all border cursor-pointer max-w-full text-left leading-snug break-words ${
                  isSelected
                    ? 'bg-[#EAE2D6] text-[#1A1816] font-medium border-[#B8AA99]'
                    : 'bg-[#FAF8F5] text-[#61564C] border-[#E8E1D6] hover:border-[#CEC2B4]'
                }`}
              >
                {loc.label}
              </motion.button>
            );
          })}
        </div>

        {showOtherField && (
          <div className="mt-3 min-w-0">
            <label
              htmlFor="event-setting-other"
              className="block text-[11px] font-medium text-[#544B43] mb-1.5 leading-snug break-words"
            >
              {t.step02OtherLabel}
            </label>
            <textarea
              id="event-setting-other"
              rows={2}
              value={settingOther}
              onChange={(e) => pushUpdate({ settingOther: e.target.value })}
              placeholder={t.step02OtherPlaceholder}
              className="w-full min-w-0 max-w-full box-border px-3 sm:px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#D9D1C5] text-[#1A1816] text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1816] focus:border-[#1A1816] transition-all resize-none"
            />
          </div>
        )}

        <div className="mt-4 min-w-0">
          <label
            htmlFor="event-city-input"
            className="block text-[11px] sm:text-xs font-medium uppercase tracking-[0.12em] sm:tracking-[0.15em] text-[#544B43] mb-2 leading-snug break-words"
          >
            {t.step02CityLabel}
          </label>
          <input
            id="event-city-input"
            type="text"
            value={eventCity}
            onChange={(e) => pushUpdate({ eventCity: e.target.value })}
            placeholder={t.step02CityPlaceholder}
            className="w-full min-w-0 max-w-full box-border px-3 sm:px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#D9D1C5] text-[#1A1816] text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1816] focus:border-[#1A1816] transition-all"
          />
        </div>
      </motion.div>

      {/* Sticky CTA + page footer */}
      <motion.div
        variants={microFadeUpSubtle}
        className="fixed bottom-0 inset-x-0 z-20 px-3 sm:px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/95 to-transparent"
      >
        <div className="w-full max-w-xl mx-auto">
          <button
            id="date-continue-btn"
            type="button"
            disabled={!isValid}
            onClick={onNext}
            className={`w-full py-3.5 px-4 sm:px-6 rounded-full text-[10px] sm:text-sm font-medium tracking-[0.14em] sm:tracking-[0.2em] uppercase transition-all duration-200 shadow-md break-words leading-snug ${
              isValid
                ? 'bg-[#1A1816] text-[#FAF8F5] hover:bg-[#2C2723] active:scale-[0.99] cursor-pointer'
                : 'bg-[#E5DDD2] text-[#9E9488] cursor-not-allowed'
            }`}
          >
            {t.step02Continue}
          </button>

          <div className="mt-3 mb-1 text-center uppercase text-[#9A9085]">
            <div className="font-serif text-[8px] sm:text-[9px] tracking-[0.12em] text-[#6F655C] leading-snug">
              {t.step02PageFooterBrand}
            </div>
            <div className="text-[7px] sm:text-[8px] tracking-[0.1em] mt-0.5 leading-snug">
              {t.step02PageFooterPlace}
              <span className="mx-1.5">·</span>
              {t.step02PageFooterMode}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
