'use client';

import React, { useState } from 'react';
import {
  Plus,
  Search,
} from 'lucide-react';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { TravelBadge } from '@/components/ui/travel/TravelBadge';
import { TravelButton } from '@/components/ui/travel/TravelButton';
import { TravelDialog } from '@/components/ui/travel/TravelDialog';
import { BOOKING_TYPE_LABELS, type BookingType } from '@/types';

interface ExperienceItem {
  id: string;
  category: BookingType;
  title: string;
  desc: string;
  duration: string;
  cost: number;
  price: number;
  margin: number;
  margin_pct: number;
  perks: string[];
  active: boolean;
}

const INITIAL_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    category: 'yacht',
    title: 'Private Superyacht Sunset Experience',
    desc: 'Dubai Marina ve Palm Jumeirah lagününde şampanya eşliğinde özel kaptanlı gün batımı seyri.',
    duration: '4 Saat',
    cost: 4200,
    price: 8500,
    margin: 4300,
    margin_pct: 50.5,
    perks: ['Sıra beklemeden doğrudan VIP biniş', 'Drone fotoğraf & 4K video kaydı', 'Veuve Clicquot ikramı'],
    active: true,
  },
  {
    id: 'exp-2',
    category: 'desert_safari',
    title: 'VIP Red Dunes Desert Safari & Royal Majlis',
    desc: 'Kızıl kum tepelerinde özel Range Rover safari, gün batımı fotoğraf molası ve lüks Arap çadırında akşam yemeği.',
    duration: '6 Saat',
    cost: 2100,
    price: 4200,
    margin: 2100,
    margin_pct: 50.0,
    perks: ['Özel tahsisli çadır uşağı', 'Canlı şahin gösterisi', 'Kişiye özel barbekü şefi'],
    active: true,
  },
  {
    id: 'exp-3',
    category: 'helicopter',
    title: 'Helicopter City Skyline & Palm Island Tour',
    desc: 'Burj Al Arab, Burj Khalifa ve Palm Jumeirah üzerinden geçen nefes kesici helikopter turu.',
    duration: '25 Dakika',
    cost: 2100,
    price: 3600,
    margin: 1500,
    margin_pct: 41.6,
    perks: ['VIP Helipad check-in salonu', 'Bose gürültü önleyici kulaklık', 'Özel pist transferi'],
    active: true,
  },
  {
    id: 'exp-4',
    category: 'restaurant',
    title: 'Nobu Dubai Omakase Dinner & Terrace View',
    desc: 'Palm Jumeirah üzerinde dünyaca ünlü Japon-Peru füzyon mutfağı ve teras atmosferi.',
    duration: '3 Saat',
    cost: 1600,
    price: 2800,
    margin: 1200,
    margin_pct: 42.8,
    perks: ['Teras ön sıra masa garantisi', 'Baş şef ile özel karşılama', 'Özel sommelier eşleştirmesi'],
    active: true,
  },
];

export default function ExperiencesPage() {
  const { formatMoney } = useTenant();
  const [experiences, setExperiences] = useState<ExperienceItem[]>(INITIAL_EXPERIENCES);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New experience form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState<BookingType>('yacht');
  const [newDuration, setNewDuration] = useState('4 Saat');
  const [newCost, setNewCost] = useState(3000);
  const [newPrice, setNewPrice] = useState(6000);
  const [newPerk, setNewPerk] = useState('VIP karşılama & ikram');

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const margin = newPrice - newCost;
    const margin_pct = newPrice > 0 ? Number(((margin / newPrice) * 100).toFixed(1)) : 0;

    const created: ExperienceItem = {
      id: `exp-${Date.now()}`,
      category: newCat,
      title: newTitle.trim(),
      desc: newDesc.trim() || 'Acentemiz tarafından özenle hazırlanan özel lüks deneyim.',
      duration: newDuration,
      cost: newCost,
      price: newPrice,
      margin,
      margin_pct,
      perks: [newPerk.trim() || 'VIP İkram'],
      active: true,
    };

    setExperiences((prev) => [created, ...prev]);
    setNewTitle('');
    setNewDesc('');
    setIsAddOpen(false);
  };

  const filtered = experiences.filter((e) => {
    if (selectedCategory !== 'all' && e.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return e.title.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-[1600px] pb-10">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">
              Deneyim Kataloğu & Ürün Envanteri
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#C9A66B]/10 text-[#C9A66B] border border-[#C9A66B]/20">
              {experiences.length} Lüks Paket
            </span>
          </div>
          <p className="text-xs text-[#F5F1E8]/40 mt-0.5">
            Tekliflerde ve seyahat programlarında kullanılabilir doğrulanmış deneyimler
          </p>
        </div>

        <TravelButton
          variant="primary"
          size="sm"
          onClick={() => setIsAddOpen(true)}
        >
          <Plus className="w-3.5 h-3.5" />
          Yeni Deneyim Ekle
        </TravelButton>
      </div>

      {/* ─── Search & Category Toolbar ────────────────────────────────────── */}
      <div className="bg-[#0B0F1A] border border-white/10 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#F5F1E8]/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Deneyim başlığı veya ayrıcalık ara..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] placeholder-[#F5F1E8]/20 focus:outline-none focus:border-[#C9A66B]/40"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { id: 'all', label: 'Tümü' },
            { id: 'yacht', label: 'Süperyat' },
            { id: 'desert_safari', label: 'Safari' },
            { id: 'helicopter', label: 'Havacılık' },
            { id: 'restaurant', label: 'Fine Dining' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-white/10 text-[#C9A66B] font-semibold'
                  : 'text-[#F5F1E8]/40 hover:text-[#F5F1E8]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Experience Cards Grid ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((exp) => (
          <div
            key={exp.id}
            className="bg-[#0B0F1A] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all space-y-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <TravelBadge variant="gold" size="sm">
                  {BOOKING_TYPE_LABELS[exp.category] || exp.category} · {exp.duration}
                </TravelBadge>
                <h3 className="text-sm font-semibold text-[#F5F1E8] mt-2">{exp.title}</h3>
                <p className="text-xs text-[#F5F1E8]/40 mt-1 line-clamp-2">{exp.desc}</p>
              </div>
            </div>

            {/* Financials Strip (Staff Confidential) */}
            <div className="grid grid-cols-3 gap-2 bg-white/[0.02] p-3 rounded-lg border border-white/5 text-xs">
              <div>
                <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase block">Tedarikçi Net</span>
                <span className="font-mono text-[#F5F1E8]/70 font-medium tabular-nums">
                  {formatMoney(exp.cost)}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase block">Satış Fiyatı</span>
                <span className="font-mono text-[#F5F1E8] font-semibold tabular-nums">
                  {formatMoney(exp.price)}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase block">Brüt Marj</span>
                <span className="font-mono text-emerald-400 font-bold tabular-nums">
                  +{formatMoney(exp.margin)} (%{exp.margin_pct})
                </span>
              </div>
            </div>

            {/* VIP Inclusions */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-[#C9A66B] uppercase tracking-wider block">
                VIP Ayrıcalıkları
              </span>
              <div className="flex flex-wrap gap-1.5">
                {exp.perks.map((p, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-[#E8C77A] border border-white/10"
                  >
                    ✦ {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Add Experience Dialog ─────────────────────────────────────── */}
      <TravelDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title="Yeni Deneyim Tanımla"
        description="Oturum envanter listesine yeni bir deneyim paketi tanımlayın."
      >
        <form onSubmit={handleAddExperience} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs text-[#F5F1E8]/70 mb-1">Deneyim Başlığı</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Örn: Royal Arabian Desert Sunrise & Breakfast"
              required
              className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#F5F1E8]/70 mb-1">Kategori</label>
              <select
                value={newCat}
                onChange={(e) => setNewCat(e.target.value as BookingType)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
              >
                <option value="yacht">Süperyat & Marina</option>
                <option value="desert_safari">VIP Çöl Safarisi</option>
                <option value="helicopter">Helikopter & Havacılık</option>
                <option value="restaurant">Fine Dining</option>
                <option value="hotel">Lüks Otel / Villa</option>
                <option value="chauffeur">VIP Transfer & Şoför</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#F5F1E8]/70 mb-1">Süre / Zamanlama</label>
              <input
                type="text"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                placeholder="Örn: 4 Saat"
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#F5F1E8]/70 mb-1">Tedarikçi Net Maliyeti</label>
              <input
                type="number"
                value={newCost}
                onChange={(e) => setNewCost(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
              />
            </div>
            <div>
              <label className="block text-xs text-[#F5F1E8]/70 mb-1">Müşteri Satış Fiyatı</label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#F5F1E8]/70 mb-1">VIP Ayrıcalıkları</label>
            <input
              type="text"
              value={newPerk}
              onChange={(e) => setNewPerk(e.target.value)}
              placeholder="Örn: Şampanya ikramı, sıra beklemeden geçiş"
              className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
            <TravelButton variant="ghost" size="sm" onClick={() => setIsAddOpen(false)}>
              İptal
            </TravelButton>
            <TravelButton variant="primary" size="sm" type="submit">
              Listeye Ekle
            </TravelButton>
          </div>
        </form>
      </TravelDialog>
    </div>
  );
}
