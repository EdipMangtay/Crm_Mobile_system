'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Badge } from '@/components/crm';
import { formatCurrency, BOOKING_TYPE_LABELS, type BookingType } from '@/types';

const EXPERIENCES = [
  {
    id: 'exp-1',
    category: 'yacht' as BookingType,
    title: 'Private Superyacht Sunset Experience',
    desc: 'Dubai Marina ve Palm Jumeirah lagününde şampanya eşliğinde gün batımı seyri.',
    duration: '4 Saat',
    cost: 4200,
    price: 8500,
    margin: 4300,
    margin_pct: 50.5,
    perks: ['Sıra beklemeden doğrudan geçiş', 'Drone fotoğraf & video'],
    active: true,
  },
  {
    id: 'exp-2',
    category: 'desert_safari' as BookingType,
    title: 'VIP Red Dunes Desert Safari & Royal Majlis',
    desc: 'Kızıl kum tepelerinde safari, gün batımı fotoğraf molası ve lüks Arap çadırında akşam yemeği.',
    duration: '6 Saat',
    cost: 2100,
    price: 4200,
    margin: 2100,
    margin_pct: 50.0,
    perks: ['Özel tahsisli çadır uşağı', 'Canlı şahin gösterisi'],
    active: true,
  },
  {
    id: 'exp-3',
    category: 'helicopter' as BookingType,
    title: 'Helicopter City Skyline Tour',
    desc: 'Burj Al Arab ve Palm Jumeirah üzerinden geçen nefes kesici helikopter turu.',
    duration: '25 Dakika',
    cost: 2100,
    price: 3600,
    margin: 1500,
    margin_pct: 41.6,
    perks: ['VIP Helipad check-in', 'Bose gürültü önleyici kulaklık'],
    active: true,
  },
  {
    id: 'exp-4',
    category: 'restaurant' as BookingType,
    title: 'Nobu Dubai Omakase Dinner',
    desc: 'Palm Jumeirah üzerinde dünyaca ünlü Japon-Peru füzyon mutfağı ve teras atmosferi.',
    duration: '3 Saat',
    cost: 1600,
    price: 2800,
    margin: 1200,
    margin_pct: 42.8,
    perks: ['Teras ön sıra masa garantisi', 'Şefle özel buluşma'],
    active: true,
  },
];

export default function ExperiencesPage() {
  const [search, setSearch] = useState('');
  const filtered = EXPERIENCES.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Deneyim Kataloğu & Ürün Yönetimi</h1>
          <p className="text-xs text-[#F5F1E8]/30 mt-0.5">{EXPERIENCES.length} lüks deneyim paketi aktif satışta</p>
        </div>
        <button className="px-3.5 py-1.5 text-xs rounded-lg bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] font-semibold flex items-center gap-1.5 hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Yeni Deneyim Ekle
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#F5F1E8]/20" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Deneyim ara..."
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-[#111827] border border-[#C9A66B]/10 text-[#F5F1E8] placeholder-[#F5F1E8]/20 focus:outline-none focus:border-[#C9A66B]/30"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(exp => (
          <div key={exp.id} className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-6 hover:border-[#C9A66B]/25 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <Badge variant="gold" size="sm">{BOOKING_TYPE_LABELS[exp.category] || exp.category}</Badge>
                <h3 className="text-base font-semibold text-[#F5F1E8] mt-1.5">{exp.title}</h3>
                <p className="text-xs text-[#F5F1E8]/40 mt-1 line-clamp-2">{exp.desc}</p>
              </div>
            </div>

            {/* Financials for CRM Staff */}
            <div className="grid grid-cols-3 gap-3 bg-[#111827]/50 p-3.5 rounded-xl border border-[#C9A66B]/5 my-4">
              <div>
                <span className="text-[10px] text-[#F5F1E8]/30 uppercase font-mono">Tedarik Maliyeti</span>
                <p className="text-sm font-mono text-red-400/90 font-medium">{formatCurrency(exp.cost)}</p>
              </div>
              <div>
                <span className="text-[10px] text-[#F5F1E8]/30 uppercase font-mono">Satış Fiyatı</span>
                <p className="text-sm font-mono text-[#F5F1E8] font-semibold">{formatCurrency(exp.price)}</p>
              </div>
              <div>
                <span className="text-[10px] text-[#F5F1E8]/30 uppercase font-mono">Kâr & Marj</span>
                <p className="text-sm font-mono text-emerald-400 font-semibold">+{formatCurrency(exp.margin)} (%{exp.margin_pct})</p>
              </div>
            </div>

            {/* VIP Perks */}
            <div className="space-y-1">
              <span className="text-[10px] text-[#C9A66B] uppercase font-mono tracking-wider">VIP Ayrıcalıkları</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {exp.perks.map((p, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-[#C9A66B]/10 text-[#E8C77A]">
                    ✦ {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
