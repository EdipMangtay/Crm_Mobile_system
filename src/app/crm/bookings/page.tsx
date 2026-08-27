'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Filter, Calendar, Users, DollarSign, ArrowUpDown, Download } from 'lucide-react';
import Badge from '@/components/crm/ui/Badge';
import { formatCurrency, BOOKING_TYPE_LABELS, type BookingType } from '@/types/crm';

const DEMO_BOOKINGS = [
  { id: '1', title: 'VIP Airport Chauffeur Transfer', customer: 'Edip Mangtay', trip: 'Travia Dubai', type: 'transfer' as BookingType, date: '12 Eyl 2026', time: '10:30', supplier: 'Al Futtaim Motors', cost: 450, price: 850, margin: 400, status: 'confirmed' as const },
  { id: '2', title: 'Private Superyacht Sunset Cruise', customer: 'Edip Mangtay', trip: 'Travia Dubai', type: 'yacht' as BookingType, date: '13 Eyl 2026', time: '14:00', supplier: 'Marina Yachts LLC', cost: 4200, price: 6800, margin: 2600, status: 'confirmed' as const },
  { id: '3', title: 'Nobu Dubai Gourmet Dinner', customer: 'Edip Mangtay', trip: 'Travia Dubai', type: 'restaurant' as BookingType, date: '13 Eyl 2026', time: '20:30', supplier: 'Atlantis The Palm', cost: 1800, price: 2800, margin: 1000, status: 'confirmed' as const },
  { id: '4', title: 'VIP Red Dunes Safari & Royal Majlis', customer: 'Ahmet Yılmaz', trip: 'Luxury Family', type: 'desert_safari' as BookingType, date: '16 Eyl 2026', time: '15:30', supplier: 'Desert Royal Safaris', cost: 2400, price: 4200, margin: 1800, status: 'confirmed' as const },
  { id: '5', title: 'Helicopter 25m Skyline Tour', customer: 'Canan Özdemir', trip: 'VIP Solo Retreat', type: 'helicopter' as BookingType, date: '19 Eyl 2026', time: '11:00', supplier: 'HeliDubai', cost: 2100, price: 3600, margin: 1500, status: 'pending' as const },
];

export default function BookingsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = DEMO_BOOKINGS.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.customer.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || b.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-5 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Rezervasyonlar & Operasyon Kalemleri</h1>
          <p className="text-xs text-[#F5F1E8]/30 mt-0.5">{DEMO_BOOKINGS.length} rezervasyon · Brüt Kâr: {formatCurrency(DEMO_BOOKINGS.reduce((s, b) => s + b.margin, 0))}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs rounded-lg bg-[#111827] border border-[#C9A66B]/15 text-[#F5F1E8]/60 hover:text-[#F5F1E8] transition-all flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Dışa Aktar
          </button>
          <button className="px-3.5 py-1.5 text-xs rounded-lg bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] font-semibold flex items-center gap-1.5 hover:opacity-90">
            <Plus className="w-3.5 h-3.5" /> Yeni Rezervasyon
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#F5F1E8]/20" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rezervasyon veya misafir ara..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-[#111827] border border-[#C9A66B]/10 text-[#F5F1E8] placeholder-[#F5F1E8]/20 focus:outline-none focus:border-[#C9A66B]/30"
          />
        </div>
      </div>

      <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#C9A66B]/8">
              {['Hizmet / Rezervasyon', 'Misafir / Gezi', 'Tür', 'Tarih & Saat', 'Tedarikçi', 'Maliyet', 'Satış', 'Marj (Kâr)', 'Durum'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-mono tracking-wider text-[#F5F1E8]/25 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C9A66B]/5">
            {filtered.map(b => (
              <tr key={b.id} className="hover:bg-[#F5F1E8]/[0.01] transition-colors">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-[#F5F1E8]/90">{b.title}</p>
                  <p className="text-xs text-[#F5F1E8]/30">ID: #{b.id.padStart(4, '0')}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-[#F5F1E8]/70">{b.customer}</p>
                  <p className="text-xs text-[#F5F1E8]/30">{b.trip}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="gold" size="sm">{BOOKING_TYPE_LABELS[b.type] || b.type}</Badge>
                </td>
                <td className="px-4 py-3 text-xs text-[#F5F1E8]/50">
                  <p>{b.date}</p>
                  <p className="text-[#C9A66B] font-mono text-[11px]">{b.time}</p>
                </td>
                <td className="px-4 py-3 text-xs text-[#F5F1E8]/50">{b.supplier}</td>
                <td className="px-4 py-3 text-xs text-red-400/80 font-mono">{formatCurrency(b.cost)}</td>
                <td className="px-4 py-3 text-xs text-[#F5F1E8] font-mono">{formatCurrency(b.price)}</td>
                <td className="px-4 py-3 text-xs text-emerald-400 font-semibold font-mono">+{formatCurrency(b.margin)}</td>
                <td className="px-4 py-3">
                  <Badge variant={b.status === 'confirmed' ? 'success' : 'warning'}>
                    {b.status === 'confirmed' ? 'Onaylı' : 'Bekliyor'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
