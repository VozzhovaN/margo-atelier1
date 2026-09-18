import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Upload, X, Image as ImageIcon, Sparkles, Link2 } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { staggerContainer, microFadeUp, microFadeUpSubtle } from '../utils/motion';

interface StepReferencesProps {
  references: string[];
  referenceNotes: string;
  onUpdate: (data: { references: string[]; referenceNotes: string }) => void;
  onNext: () => void;
  lang: SupportedLanguage;
}

const INSPIRATION_TAGS_LOCALIZED: Record<SupportedLanguage, string[]> = {
  ru: [
    'Архитектурный вырез лодочка',
    'Глубокая чувственная открытая спина',
    'Струящееся косое скольжение',
    'Тяжелый шелковый креп Комо',
    'Съемный шлейф из благородного шелка',
    'Микроплиссированный шифон',
    'Минималистичный структурированный кейп',
    'Мягкая драпировка «качели»',
  ],
  en: [
    'Architectural Boatneck',
    'Low Sensual Back',
    'Fluid Bias Slip',
    'Como Heavy Silk Crêpe',
    'Detachable Silk Train',
    'Micro-Pleated Chiffon',
    'Minimalist Tailored Coat',
    'Soft Draped Cowl',
  ],
};

export const StepReferences: React.FC<StepReferencesProps> = ({
  references,
  referenceNotes,
  onUpdate,
  onNext,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inspirationTags = INSPIRATION_TAGS_LOCALIZED[lang];

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError(null);

    const availableSlots = 3 - references.length;
    if (availableSlots <= 0) {
      setUploadError(lang === 'ru' ? 'Максимум 3 изображения.' : 'Maximum of 3 reference images allowed.');
      return;
    }

    const filesToProcess = Array.from(files).slice(0, availableSlots);

    filesToProcess.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setUploadError(lang === 'ru' ? 'Пожалуйста, выберите формат изображений (JPG, PNG, WebP).' : 'Please select image files only (JPG, PNG, WebP).');
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        setUploadError(lang === 'ru' ? 'Размер файла превышает лимит 8 МБ.' : 'File size exceeds 8MB limit.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result && !references.includes(result)) {
          const next = [...references, result].slice(0, 3);
          onUpdate({ references: next, referenceNotes });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeReference = (index: number) => {
    const next = references.filter((_, i) => i !== index);
    onUpdate({ references: next, referenceNotes });
  };

  const toggleTag = (tag: string) => {
    let current = referenceNotes.trim();
    if (current.includes(tag)) {
      current = current.replace(tag, '').replace(/,\s*,/g, ',').trim();
    } else {
      current = current ? `${current}, ${tag}` : tag;
    }
    onUpdate({ references, referenceNotes: current });
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
          {t.step08Badge}
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1816] tracking-tight">
          {t.step08Title} <span className="italic font-normal">{t.step08TitleItalic}</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#706459] mt-1 font-light">
          {t.step08Subtitle}
        </p>
      </motion.div>

      {/* Upload Zone */}
      <motion.div variants={microFadeUp} className="mb-6">
        <input
          ref={fileInputRef}
          id="reference-file-input"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-[#1A1816] bg-[#F4EFE9]'
              : 'border-[#D9D1C5] hover:border-[#A89886] bg-[#FAF8F5]'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-[#F2ECE3] mx-auto flex items-center justify-center text-[#6B5E53] mb-3">
            <Upload className="w-5 h-5" />
          </div>
          <div className="font-serif text-base text-[#1A1816] font-light">
            {t.step08UploadTitle(references.length)}
          </div>
          <p className="text-xs text-[#7A6E63] mt-1 font-light">
            {t.step08UploadSubtitle}
          </p>
          <span className="inline-block mt-2 text-[10px] uppercase tracking-widest text-[#988D82] px-2.5 py-0.5 rounded-full bg-[#EDE6DC]">
            {t.step08UploadLimits}
          </span>
        </div>

        {uploadError && (
          <p className="text-xs text-[#A83D3D] mt-2 text-center font-light">
            {uploadError}
          </p>
        )}
      </motion.div>

      {/* Image Preview Grid */}
      {references.length > 0 && (
        <motion.div variants={microFadeUp} className="mb-6">
          <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#61564C] mb-2.5 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-[#8C7D70]" />
            {t.clientReferencesTitle(references.length)}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {references.map((imgUrl, i) => (
              <div
                key={i}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-[#D9D1C5] bg-[#ECE5DA] shadow-sm"
              >
                <img
                  src={imgUrl}
                  alt={`Client Reference ${i + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeReference(i);
                  }}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[#1A1816]/80 text-[#FAF8F5] flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
                  aria-label="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <span className="absolute bottom-1.5 left-1.5 text-[9px] px-1.5 py-0.5 rounded bg-black/60 text-white font-mono">
                  Ref 0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Curated Atelier Inspiration Tags */}
      <motion.div variants={microFadeUp} className="mb-6 p-4 rounded-2xl bg-[#F6F1EA] border border-[#E9E2D8]">
        <span className="block text-xs font-medium uppercase tracking-[0.15em] text-[#544B43] mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#8C7D70]" />
          {t.step08CuratedLabel}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {inspirationTags.map((tag) => {
            const isSelected = referenceNotes.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-2.5 py-1 rounded-full text-[11px] transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#1A1816] text-[#FAF8F5] border-[#1A1816]'
                    : 'bg-[#FAF8F5] text-[#5A4F45] border-[#D9D1C5] hover:border-[#A89886]'
                }`}
              >
                + {tag}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Reference Notes or Board Link */}
      <motion.div variants={microFadeUp} className="mb-8">
        <label htmlFor="ref-notes-input" className="block text-xs font-medium uppercase tracking-[0.15em] text-[#544B43] mb-1.5 flex items-center gap-1.5">
          <Link2 className="w-3.5 h-3.5 text-[#8C7D70]" />
          {t.step08LinkNotesLabel}
        </label>
        <textarea
          id="ref-notes-input"
          rows={2}
          placeholder={t.step08LinkNotesPlaceholder}
          value={referenceNotes}
          onChange={(e) => onUpdate({ references, referenceNotes: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D9D1C5] text-xs sm:text-sm text-[#1A1816] focus:outline-none focus:ring-1 focus:ring-[#1A1816] resize-none"
        />
      </motion.div>

      {/* Navigation Footer */}
      <motion.div variants={microFadeUpSubtle} className="sticky bottom-4 z-20 w-full pt-2">
        <button
          id="references-continue-btn"
          type="button"
          onClick={onNext}
          className="w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-all duration-200 shadow-md bg-[#1A1816] text-[#FAF8F5] hover:bg-[#2C2723] active:scale-[0.99] cursor-pointer"
        >
          {t.step08Continue}
        </button>
      </motion.div>
    </motion.div>
  );
};

