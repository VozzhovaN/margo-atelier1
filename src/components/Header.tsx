import React from 'react';
import { ArrowLeft, Sparkles, LayoutDashboard, Smartphone, Globe } from 'lucide-react';
import { StepKey } from '../types';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  currentStep: StepKey;
  stepIndex: number;
  totalSteps: number;
  onBack: () => void;
  canGoBack: boolean;
  isDashboard: boolean;
  onToggleDashboard: () => void;
  isMobileSimulator: boolean;
  onToggleSimulator: () => void;
  lang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  stepIndex,
  totalSteps,
  onBack,
  canGoBack,
  isDashboard,
  onToggleDashboard,
  isMobileSimulator,
  onToggleSimulator,
  lang,
  onSelectLang,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EBE5DE] px-3 sm:px-4 py-3 transition-all duration-300">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Left: Back button or Telegram indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          {canGoBack && !isDashboard ? (
            <button
              id="back-button"
              type="button"
              onClick={onBack}
              aria-label={lang === 'ru' ? 'Предыдущий шаг' : 'Previous step'}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[#1A1816] hover:bg-[#EFE9E1] transition-colors border border-[#E5DFD6]"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EFE9E1] border border-[#E2DAD0] text-[10px] sm:text-[11px] font-medium tracking-wider text-[#5A524A] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#398256] animate-pulse"></span>
              {t.miniAppBadge}
            </div>
          )}
        </div>

        {/* Center: Brand Wordmark */}
        <div className="text-center cursor-pointer" onClick={() => !isDashboard && onBack()}>
          <span className="font-serif text-lg sm:text-xl font-light tracking-[0.22em] text-[#1A1816] uppercase block">
            MARGO ATELIER
          </span>
          <span className="text-[9px] tracking-[0.3em] text-[#867C74] uppercase block font-sans -mt-0.5">
            {lang === 'ru' ? 'Высокий Кутюр' : 'Contemporary Couture'}
          </span>
        </div>

        {/* Right: Language switch, Simulator & Dashboard */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Toggle: RU | EN */}
          <div className="flex items-center rounded-full bg-[#EFEAE2] border border-[#DDD5C9] p-0.5 text-[11px] font-medium tracking-wide">
            <button
              id="lang-ru-btn"
              type="button"
              onClick={() => onSelectLang('ru')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                lang === 'ru'
                  ? 'bg-[#1A1816] text-[#FAF8F5] shadow-xs'
                  : 'text-[#6D6359] hover:text-[#1A1816]'
              }`}
            >
              RU
            </button>
            <button
              id="lang-en-btn"
              type="button"
              onClick={() => onSelectLang('en')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                lang === 'en'
                  ? 'bg-[#1A1816] text-[#FAF8F5] shadow-xs'
                  : 'text-[#6D6359] hover:text-[#1A1816]'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile frame simulator toggle for desktop testing */}
          <button
            id="toggle-simulator-btn"
            type="button"
            onClick={onToggleSimulator}
            title={isMobileSimulator ? 'Switch to Full Screen view' : 'Preview in Telegram Device View'}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-[#E2DAD0] bg-[#FAF8F5] text-[#6B6157] hover:text-[#1A1816] hover:bg-[#EFE9E1] transition-colors text-xs"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>

          {/* Toggle Atelier Dashboard */}
          <button
            id="toggle-dashboard-btn"
            type="button"
            onClick={onToggleDashboard}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all border ${
              isDashboard
                ? 'bg-[#1A1816] text-[#FAF8F5] border-[#1A1816]'
                : 'bg-[#FAF8F5] text-[#1A1816] border-[#D9D0C5] hover:bg-[#EFE9E1]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">{isDashboard ? t.clientAppBtn : t.atelierDeskBtn}</span>
          </button>
        </div>
      </div>

      {/* Subtle Progress Line for Client questionnaire */}
      {!isDashboard && currentStep !== 'welcome' && (
        <div className="max-w-4xl mx-auto mt-2">
          <div className="w-full bg-[#EBE5DE] h-[2px] rounded-full overflow-hidden">
            <div
              className="bg-[#1A1816] h-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, Math.round((stepIndex / totalSteps) * 100))}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] tracking-widest text-[#8A8177] uppercase mt-1">
            <span>{t.stepIndicator(stepIndex, totalSteps)}</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#A59480]" />
              {t.headerSub}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

