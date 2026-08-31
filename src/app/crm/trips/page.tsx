'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { Badge } from '@/components/crm';
import { formatCurrency, COUNTRY_FLAGS } from '@/types';

const DEMO_TRIPS = [
  { id: 'f0000000-0000-0000-0000-000000000001', title: 'Travia Dubai — Premium Couple', customer: 'Edip Mangtay', country: 'TR', dates: '12-17 Eyl 2026', nights: 5, pax: 2, hotel: 'Atlantis The Royal', total: 18500, paid: 5000, status: 'upcoming' as const },
  { id: 'f0000000-0000-0000-0000-000000000002', title: 'Dubai Luxury Family', customer: 'Kerem Aydın', country: 'TR', dates: '15-21 Eyl 2026', nights: 6, pax: 4, hotel: 'Burj Al Arab Jumeirah', total: 42000, paid: 42000, status: 'upcoming' as const },
  { id: 'f0000000-0000-0000-0000-000000000003', title: 'VIP Solo Retreat', customer: 'Selin Arslan', country: 'TR', dates: '18-23 Eyl 2026', nights: 5, pax: 1, hotel: 'Armani Hotel Dubai', total: 15000, paid: 10800, status: 'upcoming' as const },
  { id: 'f0000000-0000-0000-0000-000000000004', title: 'Dubai Business & Leisure', customer: 'Luca Bianchi', country: 'DE', dates: '01-05 Eki 2026', nights: 4, pax: 2, hotel: 'Address Sky View', total: 24000, paid: 24000, status: 'upcoming' as const },
];

const STATUS_MAP = {
  upcoming: { label: 'Yaklaşan', variant: 'info' as const },
  active: { label: 'Aktif', variant: 'success' as const },
  completed: { label: 'Tamamlandı', variant: 'default' as const },
  cancelled: { label: 'İptal', variant: 'error' as const },
};

export default function TripsPage() {
  const [search, setSearch] = useState('');
  const filtered = DEMO_TRIPS.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Geziler</h1>
          <p className="text-xs text-[#F5F1E8]/30 mt-0.5">{DEMO_TRIPS.length} gezi · Toplam: {formatCurrency(DEMO_TRIPS.reduce((s, t) => s + t.total, 0))}</p>
        </div>
        <button className="px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] font-semibold flex items-center gap-1.5 hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Yeni Gezi
        </button>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#F5F1E8]/20" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Gezi ara..." className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-[#111827] border border-[#C9A66B]/10 text-[#F5F1E8] placeholder-[#F5F1E8]/20 focus:outline-none focus:border-[#C9A66B]/30" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(trip => {
          const s = STATUS_MAP[trip.status];
          const paidPct = (trip.paid / trip.total) * 100;
          return (
            <Link key={trip.id} href={`/crm/trips/${trip.id}`} className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl p-5 hover:border-[#C9A66B]/20 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-[#F5F1E8]/80 font-medium group-hover:text-[#C9A66B] transition-colors">{trip.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm">{COUNTRY_FLAGS[trip.country]}</span>
                    <span className="text-xs text-[#F5F1E8]/30">{trip.customer}</span>
                  </div>
                </div>
                <Badge variant={s.variant}>{s.label}</Badge>
              </div>
              <div className="grid grid-cols-4 gap-3 text-center mb-3">
                <div><p className="text-[10px] text-[#F5F1E8]/25 uppercase">Tarih</p><p className="text-xs text-[#F5F1E8]/50 mt-0.5">{trip.dates}</p></div>
                <div><p className="text-[10px] text-[#F5F1E8]/25 uppercase">Gece</p><p className="text-xs text-[#F5F1E8]/50 mt-0.5">{trip.nights}</p></div>
                <div><p className="text-[10px] text-[#F5F1E8]/25 uppercase">PAX</p><p className="text-xs text-[#F5F1E8]/50 mt-0.5">{trip.pax} kişi</p></div>
                <div><p className="text-[10px] text-[#F5F1E8]/25 uppercase">Otel</p><p className="text-xs text-[#F5F1E8]/50 mt-0.5 truncate">{trip.hotel}</p></div>
              </div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-[#F5F1E8]/20">Ödeme durumu</span>
                <span className="text-[10px] text-[#F5F1E8]/20">{formatCurrency(trip.paid)} / {formatCurrency(trip.total)}</span>
              </div>
              <div className="h-1.5 bg-[#111827] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all" style={{ width: `${paidPct}%` }} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
