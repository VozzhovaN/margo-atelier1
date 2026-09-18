import React, { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  MessageCircle,
  Send,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  RefreshCw,
  Search,
  Filter,
} from 'lucide-react';
import { ConsultationDossier } from '../types';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface AtelierDashboardProps {
  onBackToApp: () => void;
  lang?: SupportedLanguage;
}

export const AtelierDashboard: React.FC<AtelierDashboardProps> = ({ onBackToApp, lang = 'ru' }) => {
  const t = TRANSLATIONS[lang];
  const [consultations, setConsultations] = useState<ConsultationDossier[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'new' | 'scheduled' | 'fitting'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/consultations');
      if (res.ok) {
        const data = await res.json();
        setConsultations(data.consultations || []);
      }
    } catch (err) {
      console.error('Failed to load consultations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const updateStatus = async (id: string, status: any) => {
    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setConsultations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status } : c))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const filtered = consultations.filter((c) => {
    if (activeFilter !== 'all' && c.status !== activeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.contact?.fullName?.toLowerCase().includes(q);
      const matchId = c.id?.toLowerCase().includes(q);
      const matchOccasion = c.occasion?.toLowerCase().includes(q);
      return matchName || matchId || matchOccasion;
    }
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E1D6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#398256]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#7D7267] font-medium">
              {t.dashConsoleBadge}
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1816] tracking-tight mt-0.5">
            {t.dashTitle}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchConsultations}
            disabled={loading}
            className="p-2 rounded-xl border border-[#D9D1C5] bg-[#FAF8F5] text-[#54493F] hover:bg-[#EFE9E0] transition-colors"
            title="Refresh Dossiers"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={onBackToApp}
            className="px-4 py-2 rounded-xl bg-[#1A1816] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider hover:bg-[#2E2824] transition-colors"
          >
            {t.dashBackBtn}
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
        <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D6]">
          <span className="text-[10px] uppercase tracking-wider text-[#8A7D71] block font-medium">
            {t.dashTotal}
          </span>
          <div className="font-serif text-2xl font-light text-[#1A1816] mt-1">
            {consultations.length}
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D6]">
          <span className="text-[10px] uppercase tracking-wider text-[#8A7D71] block font-medium">
            {t.dashNew}
          </span>
          <div className="font-serif text-2xl font-light text-[#A86430] mt-1">
            {consultations.filter((c) => c.status === 'new').length}
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D6]">
          <span className="text-[10px] uppercase tracking-wider text-[#8A7D71] block font-medium">
            {t.dashScheduled}
          </span>
          <div className="font-serif text-2xl font-light text-[#2E7A4C] mt-1">
            {consultations.filter((c) => c.status === 'scheduled').length}
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D6]">
          <span className="text-[10px] uppercase tracking-wider text-[#8A7D71] block font-medium">
            {t.dashTgSync}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-[#205A32] mt-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#205A32] animate-pulse" />
            {t.dashConnected}
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#8A7D71] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.dashSearchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#D9D1C5] text-xs text-[#1A1816] focus:outline-none focus:ring-1 focus:ring-[#1A1816]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'new', 'scheduled', 'fitting'] as const).map((tab) => {
            const label =
              tab === 'all'
                ? t.dashFilterAll
                : tab === 'new'
                ? t.dashFilterNew
                : tab === 'scheduled'
                ? t.dashFilterScheduled
                : t.dashFilterFitting;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider transition-all whitespace-nowrap border ${
                  activeFilter === tab
                    ? 'bg-[#1A1816] text-[#FAF8F5] border-[#1A1816]'
                    : 'bg-[#FAF8F5] text-[#63574D] border-[#E8E1D6] hover:border-[#BDB0A2]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dossiers List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#FAF8F5] border border-[#E8E1D6]">
            <Users className="w-8 h-8 text-[#B8AA99] mx-auto mb-2" />
            <div className="font-serif text-lg font-light text-[#1A1816]">
              {t.dashNoDossiers}
            </div>
            <p className="text-xs text-[#867B71] mt-1">
              {t.dashNoDossiersSub}
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-[#FAF8F5] border border-[#E8E1D6] overflow-hidden transition-all shadow-sm"
              >
                {/* Header Card Row */}
                <div
                  onClick={() => toggleExpand(item.id!)}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-[#F7F2EB] transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EFE9E0] flex items-center justify-center font-serif text-sm font-medium text-[#1A1816] shrink-0 border border-[#DFD6C9]">
                      {item.contact.fullName ? item.contact.fullName.charAt(0) : 'M'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base sm:text-lg font-medium text-[#1A1816]">
                          {item.contact.fullName || 'Private Client'}
                        </span>
                        <span className="font-mono text-[10px] text-[#8C7E72] px-2 py-0.5 rounded bg-[#EFE8DF]">
                          {item.id}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#706458] mt-0.5 font-light">
                        <span className="font-medium text-[#1A1816]">{item.occasion}</span>
                        <span>•</span>
                        <span>{item.budget}</span>
                        <span>•</span>
                        <span>{item.date || item.timeline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EFE9E0]">
                    {/* Status Badge */}
                    <span
                      className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-medium ${
                        item.status === 'new'
                          ? 'bg-[#FBEEDC] text-[#8C5319] border border-[#EACCA4]'
                          : item.status === 'scheduled'
                          ? 'bg-[#E3F2E7] text-[#1E6B39] border border-[#BEE0C8]'
                          : 'bg-[#EFE8DF] text-[#61564C]'
                      }`}
                    >
                      {item.status || 'new'}
                    </span>

                    <button
                      type="button"
                      className="p-1 rounded-lg text-[#8C7E72] hover:text-[#1A1816]"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="p-5 border-t border-[#E8E1D6] bg-[#F9F5EE] space-y-5">
                    {/* Contacts & Direct Reach-out */}
                    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD6]">
                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#52473D]">
                        {item.contact.telegramHandle && (
                          <span className="flex items-center gap-1 font-mono">
                            <Send className="w-3.5 h-3.5 text-[#398256]" />
                            {item.contact.telegramHandle}
                          </span>
                        )}
                        {item.contact.whatsappPhone && (
                          <span className="flex items-center gap-1 font-mono">
                            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                            {item.contact.whatsappPhone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#8C7E72]" />
                          {item.contact.atelierLocation}
                        </span>
                      </div>

                      {/* Quick Communication CTAs */}
                      <div className="flex items-center gap-2">
                        {item.contact.whatsappPhone && (
                          <a
                            href={`https://wa.me/${item.contact.whatsappPhone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-[11px] font-medium tracking-wider uppercase flex items-center gap-1 hover:bg-[#1EBE5A]"
                          >
                            <MessageCircle className="w-3 h-3" />
                            WhatsApp
                          </a>
                        )}
                        {item.contact.telegramHandle && (
                          <a
                            href={`https://t.me/${item.contact.telegramHandle.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-[#229ED9] text-white text-[11px] font-medium tracking-wider uppercase flex items-center gap-1 hover:bg-[#1C8BC0]"
                          >
                            <Send className="w-3 h-3" />
                            Telegram
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Gemini AI Style Direction Card */}
                    {item.aiStyleDirection && (
                      <div className="p-4 rounded-xl bg-[#1A1816] text-[#FAF8F5] space-y-2.5">
                        <div className="flex items-center gap-2 text-[#D8CEBF] text-xs font-medium uppercase tracking-widest">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Gemini AI Style Direction</span>
                        </div>
                        <h4 className="font-serif text-lg font-light italic text-[#FAF8F5]">
                          “{item.aiStyleDirection.headline}”
                        </h4>
                        <p className="text-xs text-[#D8CEBF] font-light leading-relaxed">
                          {item.aiStyleDirection.concept}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs text-[#EAE2D8]">
                          <div>
                            <span className="text-[10px] text-[#A89886] uppercase tracking-wider block mb-1">
                              Recommended Fabrics
                            </span>
                            <ul className="space-y-1">
                              {item.aiStyleDirection.recommendedFabrics?.map((fab, i) => (
                                <li key={i}>• {fab}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#A89886] uppercase tracking-wider block mb-1">
                              Consultation Focus
                            </span>
                            <ul className="space-y-1">
                              {item.aiStyleDirection.consultationFocus?.map((foc, i) => (
                                <li key={i}>• {foc}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Detailed Specifications */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E5DFD6]">
                        <span className="text-[10px] uppercase tracking-wider text-[#8A7D71] block">Silhouette & Style</span>
                        <div className="font-medium text-[#1A1816] mt-0.5">{item.silhouette}</div>
                        <div className="text-[#6B5F54] mt-0.5">{item.style}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E5DFD6]">
                        <span className="text-[10px] uppercase tracking-wider text-[#8A7D71] block">Measurements & Fit</span>
                        <div className="font-medium text-[#1A1816] mt-0.5">
                          {item.measurements?.clothingSize || 'Bespoke'} · {item.measurements?.height || 'N/A'}
                        </div>
                        <div className="text-[#6B5F54] mt-0.5">{item.measurements?.fitPreference}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E5DFD6]">
                        <span className="text-[10px] uppercase tracking-wider text-[#8A7D71] block">Status Control</span>
                        <select
                          value={item.status || 'new'}
                          onChange={(e) => updateStatus(item.id!, e.target.value)}
                          className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-[#F6F1EA] border border-[#D9D1C5] text-xs font-medium text-[#1A1816]"
                        >
                          <option value="new">{t.statusNew}</option>
                          <option value="contacted">{t.statusContacted}</option>
                          <option value="scheduled">{t.statusScheduled}</option>
                          <option value="fitting">{t.statusFitting}</option>
                          <option value="completed">{t.statusCompleted}</option>
                        </select>
                      </div>
                    </div>

                    {/* Uploaded References */}
                    {item.references && item.references.length > 0 && (
                      <div>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-[#8A7D71] block mb-2">
                          Client Uploaded Reference Images ({item.references.length})
                        </span>
                        <div className="grid grid-cols-3 gap-2.5">
                          {item.references.map((img, i) => (
                            <div key={i} className="aspect-[3/4] rounded-xl overflow-hidden border border-[#D9D1C5] bg-[#ECE5DA]">
                              <img src={img} alt={`Reference ${i + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
