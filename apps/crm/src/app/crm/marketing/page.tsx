'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Megaphone,
  Users,
  Tag,
  ArrowRight,
  Plus,
  Radio,
  SlidersHorizontal,
} from 'lucide-react';
import { TravelBadge } from '@/components/ui/travel/TravelBadge';
import { TravelButton } from '@/components/ui/travel/TravelButton';
import { TravelDialog } from '@/components/ui/travel/TravelDialog';
import { SHARED_CUSTOMERS } from '@/shared/data/traviaData';

interface CampaignDraft {
  id: string;
  title: string;
  targetSegment: string;
  channel: string;
  notes: string;
  created_at: string;
}

export default function MarketingPage() {
  const [selectedTag, setSelectedTag] = useState<string>('VIP');
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);

  // Local draft campaign store (truthful session-based planning)
  const [drafts, setDrafts] = useState<CampaignDraft[]>([
    {
      id: 'draft-1',
      title: 'Sonbahar Süperyat Sezonu Özel Bilgilendirme',
      targetSegment: 'VIP & Luxury',
      channel: 'Özel Concierge İletişimi',
      notes: 'Yat kiralama ve marina rezervasyonu tercih eden misafirlere özel teklif.',
      created_at: '2026-08-28',
    },
    {
      id: 'draft-2',
      title: 'F1 Grand Prix Özel Paddock Club Duyurusu',
      targetSegment: 'Business & VIP',
      channel: 'E-Posta Bülteni',
      notes: 'Kurumsal ve tekrar eden misafir havuzuna yönelik VIP bülten.',
      created_at: '2026-08-29',
    },
  ]);

  const [newDraft, setNewDraft] = useState({
    title: '',
    targetSegment: 'VIP',
    channel: 'Özel Concierge İletişimi',
    notes: '',
  });

  const allTags = ['Tümü', 'VIP', 'Luxury', 'Booked', 'Family', 'Solo', 'Business'];

  const filteredCustomers = SHARED_CUSTOMERS.filter((c) =>
    selectedTag === 'Tümü' ? true : c.tags.includes(selectedTag)
  );

  const handleCreateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDraft.title) return;

    const draftItem: CampaignDraft = {
      id: `draft-${Date.now()}`,
      title: newDraft.title,
      targetSegment: newDraft.targetSegment,
      channel: newDraft.channel,
      notes: newDraft.notes,
      created_at: new Date().toISOString().split('T')[0],
    };

    setDrafts((prev) => [draftItem, ...prev]);
    setIsDraftModalOpen(false);
    setNewDraft({
      title: '',
      targetSegment: 'VIP',
      channel: 'Özel Concierge İletişimi',
      notes: '',
    });
  };

  return (
    <div className="space-y-6 max-w-[1600px] pb-12">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">
              Pazarlama & Kitle Segmentasyonu
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[#C9A66B] border border-white/10">
              Kitle & Planlama
            </span>
          </div>
          <p className="text-xs text-[#F5F1E8]/40 mt-0.5">
            Müşteri havuzunu etiketlere göre segmente edin ve pazarlama taslaklarını planlayın
          </p>
        </div>

        <TravelButton
          variant="primary"
          size="sm"
          onClick={() => setIsDraftModalOpen(true)}
        >
          <Plus className="w-3.5 h-3.5" />
          Yeni Kampanya Taslağı
        </TravelButton>
      </div>

      {/* ─── Two-Column: Customer Segmentation + Campaign Drafts ──────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Customer Segmentation (7 cols) */}
        <div className="lg:col-span-7 bg-[#0B0F1A] border border-white/10 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C9A66B]" />
              <h2 className="text-sm font-semibold text-[#F5F1E8]">Kitle Segmentasyon Havuzu</h2>
            </div>
            <span className="text-[11px] font-mono text-[#F5F1E8]/40">
              {filteredCustomers.length} Misafir
            </span>
          </div>

          {/* Segment Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1.5 ${
                  selectedTag === tag
                    ? 'bg-[#C9A66B] text-[#05070F] font-semibold shadow-sm'
                    : 'bg-white/5 text-[#F5F1E8]/60 hover:text-[#F5F1E8] border border-white/5'
                }`}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </button>
            ))}
          </div>

          {/* Segment Matching Customers */}
          <div className="divide-y divide-white/5 border-t border-white/5 pt-2">
            {filteredCustomers.length === 0 ? (
              <p className="text-xs text-[#F5F1E8]/40 py-6 text-center">
                Bu segment etiketiyle eşleşen müşteri bulunamadı.
              </p>
            ) : (
              filteredCustomers.map((cust) => (
                <div key={cust.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium text-[#F5F1E8] truncate">
                        {cust.first_name} {cust.last_name}
                      </p>
                      <span className="text-[10px] font-mono text-[#F5F1E8]/40">
                        ({cust.country})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      {cust.tags.map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 rounded text-[9px] bg-white/5 text-[#F5F1E8]/60 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/crm/customers/${cust.id}`}
                    className="text-xs text-[#C9A66B] hover:underline flex items-center gap-1 shrink-0"
                  >
                    Profil <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Campaign Draft Planner (5 cols) */}
        <div className="lg:col-span-5 bg-[#0B0F1A] border border-white/10 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[#C9A66B]" />
              <h2 className="text-sm font-semibold text-[#F5F1E8]">Kampanya Planlayıcı</h2>
            </div>
            <span className="text-[10px] font-mono text-[#F5F1E8]/40">Oturum Taslakları</span>
          </div>

          <div className="space-y-3">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xs font-semibold text-[#F5F1E8]">{draft.title}</h3>
                  <TravelBadge variant="neutral" size="sm">
                    Taslak
                  </TravelBadge>
                </div>

                {draft.notes && (
                  <p className="text-[11px] text-[#F5F1E8]/50 leading-relaxed">
                    {draft.notes}
                  </p>
                )}

                <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-white/5 text-[#F5F1E8]/40 font-mono">
                  <span>Hedef: {draft.targetSegment}</span>
                  <span>Kanal: {draft.channel}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] text-[#F5F1E8]/40 flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-[#C9A66B] shrink-0" />
            Taslaklar acente operasyonel planlama havuzunda tutulur.
          </div>
        </div>
      </div>

      {/* ─── Honest Empty State for Ad Attribution ────────────────────────── */}
      <div className="bg-[#0B0F1A] border border-white/10 rounded-xl p-8 text-center space-y-3">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#F5F1E8]/40">
          <SlidersHorizontal className="w-5 h-5" />
        </div>
        <div className="max-w-md mx-auto space-y-1">
          <h3 className="text-sm font-semibold text-[#F5F1E8]">
            Reklam & Atıf Entegrasyonu
          </h3>
          <p className="text-xs text-[#F5F1E8]/40 leading-relaxed">
            Henüz bağlı bir reklam veya harcama entegrasyonu (Meta Ads / Google Ads) bulunmuyor. API bağlantısı sağlandığında harcama, tıklama ve ROAS metrikleri burada listelenecektir.
          </p>
        </div>
      </div>

      {/* ─── Add Draft Dialog ────────────────────────────────────────────── */}
      <TravelDialog
        open={isDraftModalOpen}
        onOpenChange={setIsDraftModalOpen}
        title="Yeni Kampanya Taslağı Oluştur"
        description="Acente operasyonel planlaması için yeni bir taslak kampanya kaydı oluşturun."
      >
        <form onSubmit={handleCreateDraft} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs text-[#F5F1E8]/70 mb-1">Kampanya Başlığı</label>
            <input
              type="text"
              required
              placeholder="Örn: Yılbaşı Özel Majlis Deneyimi"
              value={newDraft.title}
              onChange={(e) => setNewDraft({ ...newDraft, title: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#F5F1E8]/70 mb-1">Hedef Segment</label>
              <select
                value={newDraft.targetSegment}
                onChange={(e) => setNewDraft({ ...newDraft, targetSegment: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
              >
                <option value="VIP">VIP</option>
                <option value="Luxury">Luxury</option>
                <option value="Family">Family</option>
                <option value="Business">Business</option>
                <option value="Tüm Portföy">Tüm Portföy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#F5F1E8]/70 mb-1">İletişim Kanalı</label>
              <select
                value={newDraft.channel}
                onChange={(e) => setNewDraft({ ...newDraft, channel: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
              >
                <option value="Özel Concierge İletişimi">Özel Concierge İletişimi</option>
                <option value="E-Posta Bülteni">E-Posta Bülteni</option>
                <option value="WhatsApp VIP Duyuru">WhatsApp VIP Duyuru</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#F5F1E8]/70 mb-1">Operasyonel Notlar</label>
            <textarea
              rows={3}
              placeholder="Kampanya hedefi veya teklif detayları..."
              value={newDraft.notes}
              onChange={(e) => setNewDraft({ ...newDraft, notes: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
            <TravelButton
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setIsDraftModalOpen(false)}
            >
              İptal
            </TravelButton>
            <TravelButton variant="primary" size="sm" type="submit">
              Taslağı Ekle
            </TravelButton>
          </div>
        </form>
      </TravelDialog>
    </div>
  );
}
