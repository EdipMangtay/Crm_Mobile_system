'use client';

import { useEffect, useState, useRef } from 'react';
import { Search, User, Plane, CalendarCheck, MessageCircle, CreditCard, X } from 'lucide-react';

interface SearchResult {
  type: 'customer' | 'lead' | 'trip' | 'booking' | 'message' | 'payment';
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

const TYPE_ICONS = {
  customer: User,
  lead: User,
  trip: Plane,
  booking: CalendarCheck,
  message: MessageCircle,
  payment: CreditCard,
};

const TYPE_LABELS = {
  customer: 'Müşteri',
  lead: 'Lead',
  trip: 'Gezi',
  booking: 'Rezervasyon',
  message: 'Mesaj',
  payment: 'Ödeme',
};

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Global keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) onClose();
      }
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Demo search results — derived synchronously
  const rawDemoResults: SearchResult[] = [
    { type: 'customer', id: '1', title: 'Edip Mangtay', subtitle: 'TR · VIP · Atlantis The Royal', href: '/crm/customers/d0000000-0000-0000-0000-000000000001' },
    { type: 'customer', id: '2', title: 'Kerem Aydın', subtitle: 'TR · Family · Burj Al Arab', href: '/crm/customers/d0000000-0000-0000-0000-000000000002' },
    { type: 'lead', id: 'l0000000-0000-0000-0000-000000000001', title: 'Tobias Hartmann', subtitle: 'Nitelikli · 52.000 AED · DE', href: '/crm/leads/l0000000-0000-0000-0000-000000000001' },
    { type: 'lead', id: 'l0000000-0000-0000-0000-000000000002', title: 'Elif Şahin', subtitle: 'İletişimde · 18.000 AED · TR', href: '/crm/leads/l0000000-0000-0000-0000-000000000002' },
    { type: 'trip', id: 'f0000000-0000-0000-0000-000000000001', title: 'Travia Dubai — Premium Couple', subtitle: 'Atlantis The Royal · 12-17 Eyl', href: '/crm/trips/f0000000-0000-0000-0000-000000000001' },
    { type: 'trip', id: 'f0000000-0000-0000-0000-000000000002', title: 'Dubai Luxury Family', subtitle: 'Burj Al Arab · 15-21 Eyl', href: '/crm/trips/f0000000-0000-0000-0000-000000000002' },
    { type: 'booking', id: '1', title: 'VIP Chauffeur — Mercedes V-Class', subtitle: 'DXB → Atlantis · 12 Eyl 10:30', href: '/crm/bookings' },
  ];

  const results = query.trim()
    ? rawDemoResults.filter(
        r => r.title.toLowerCase().includes(query.toLowerCase()) ||
             r.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      window.location.href = results[selectedIndex].href;
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#05070F]/70 backdrop-blur-sm" onClick={onClose} />

      {/* Palette */}
      <div className="relative w-full max-w-[560px] mx-4 bg-[#0B0F1A] border border-[#C9A66B]/15 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 border-b border-[#C9A66B]/10">
          <Search className="w-4 h-4 text-[#C9A66B]/50 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Müşteri, gezi, rezervasyon ara..."
            className="flex-1 py-3.5 text-sm text-[#F5F1E8] bg-transparent placeholder-[#F5F1E8]/25 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 rounded text-[#F5F1E8]/20 hover:text-[#F5F1E8]/50">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="max-h-[360px] overflow-y-auto p-2">
            {results.map((result, i) => {
              const Icon = TYPE_ICONS[result.type];
              return (
                <a
                  key={result.id}
                  href={result.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    i === selectedIndex
                      ? 'bg-[#C9A66B]/10 text-[#F5F1E8]'
                      : 'text-[#F5F1E8]/60 hover:bg-[#F5F1E8]/[0.03]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#111827] border border-[#C9A66B]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[#C9A66B]/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{result.title}</p>
                    <p className="text-xs text-[#F5F1E8]/30 truncate">{result.subtitle}</p>
                  </div>
                  <span className="text-[9px] font-mono tracking-wider text-[#C9A66B]/40 uppercase shrink-0">
                    {TYPE_LABELS[result.type]}
                  </span>
                </a>
              );
            })}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-[#F5F1E8]/30">Sonuç bulunamadı</p>
            <p className="text-xs text-[#F5F1E8]/15 mt-1">Farklı bir arama terimi deneyin</p>
          </div>
        )}

        {!query && (
          <div className="py-8 text-center">
            <p className="text-xs text-[#F5F1E8]/20">Müşteri, lead, gezi, rezervasyon, telefon numarası veya e-posta arayın</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-[#C9A66B]/5 text-[9px] text-[#F5F1E8]/15 font-mono">
          <span>↑↓ navigasyon</span>
          <span>↵ seç</span>
          <span>esc kapat</span>
        </div>
      </div>
    </div>
  );
}
