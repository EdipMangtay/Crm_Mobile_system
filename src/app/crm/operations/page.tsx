'use client';

import * as React from 'react';
import {
  Plane,
  Car,
  Ship,
  Utensils,
  Compass,
  Sun,
  AlertTriangle,
  CheckCircle,
  Play,
  Clock,
  Sparkles,
  Phone,
  Filter,
} from 'lucide-react';
import {
  TravelBadge,
  TravelButton,
  TravelDialog,
} from '@/components/ui/travel';
import { COUNTRY_FLAGS } from '@/types';

interface OperationItem {
  id: string;
  time: string;
  customer: string;
  country: string;
  type: string;
  detail: string;
  location: string;
  driver: string;
  driverPhone?: string;
  status: 'completed' | 'in_progress' | 'confirmed' | 'pending' | 'issue';
  icon: React.ComponentType<{ className?: string }>;
  note?: string;
}

const INITIAL_OPERATIONS: OperationItem[] = [
  {
    id: '1',
    time: '09:10',
    customer: 'Kerem Aydın',
    country: 'TR',
    type: 'Havalimanı İniş & VIP Karşılama',
    detail: 'Uçuş: TK762 · 4 Kişi (2 Çocuk) · Marhaba Gate Service',
    location: 'DXB Terminal 3 VIP Salonu',
    driver: 'Tariq Al-Mansoor',
    driverPhone: '+971 55 777 8899',
    status: 'completed',
    icon: Plane,
  },
  {
    id: '2',
    time: '10:30',
    customer: 'Edip Mangtay',
    country: 'TR',
    type: 'VIP Chauffeur Transfer',
    detail: 'Mercedes V-Class (Dubai X 78219) · Bagaj Transferi',
    location: 'DXB Terminal 3 → Atlantis The Royal',
    driver: 'Khalid Ahmed',
    driverPhone: '+971 50 123 4567',
    status: 'in_progress',
    icon: Car,
    note: 'Trafik akıcı. Misafir araçta ikramları aldı.',
  },
  {
    id: '3',
    time: '14:00',
    customer: 'Edip Mangtay',
    country: 'TR',
    type: 'Özel Süperyat Seyri (Sunset Cruise)',
    detail: 'Majesty 56ft Yacht · Şampanya ve Meyve İkramı',
    location: 'Dubai Marina Yacht Club Pier 7',
    driver: 'Kaptan Rashid',
    driverPhone: '+971 52 888 9900',
    status: 'confirmed',
    icon: Ship,
    note: 'Mürettebat hazırlandı, iskele kapısı ayrıldı.',
  },
  {
    id: '4',
    time: '15:30',
    customer: 'Selin Arslan',
    country: 'TR',
    type: 'VIP Çöl Safarisi & Majlis',
    detail: 'Land Cruiser V8 · 1 Kişi Özel Çadır',
    location: 'Armani Hotel Lobisi → Lahbab Çölü',
    driver: 'Ahmed Hassan',
    driverPhone: '+971 50 999 1122',
    status: 'confirmed',
    icon: Compass,
  },
  {
    id: '5',
    time: '20:30',
    customer: 'Edip Mangtay',
    country: 'TR',
    type: 'Nobu Dubai Akşam Yemeği',
    detail: 'Teras Masa · 2 Kişi (Yıldönümü Kutlaması)',
    location: 'Atlantis The Palm',
    driver: '—',
    status: 'confirmed',
    icon: Utensils,
  },
  {
    id: '6',
    time: '22:00',
    customer: 'Kerem Aydın',
    country: 'TR',
    type: 'Hotel Check-in & Karşılama',
    detail: 'Royal Suite · Erken giriş teyit edildi',
    location: 'Burj Al Arab Jumeirah',
    driver: '—',
    status: 'pending',
    icon: Sun,
  },
];

const STATUS_MAP = {
  completed: { label: 'Tamamlandı', variant: 'success' as const },
  in_progress: { label: 'Devam Ediyor', variant: 'gold' as const },
  confirmed: { label: 'Onaylı', variant: 'info' as const },
  pending: { label: 'Bekliyor', variant: 'warning' as const },
  issue: { label: 'Dikkat / Sorun', variant: 'error' as const },
};

export default function OperationsPage() {
  const [operations, setOperations] = React.useState<OperationItem[]>(INITIAL_OPERATIONS);
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [selectedIssueOp, setSelectedIssueOp] = React.useState<OperationItem | null>(null);
  const [issueNote, setIssueNote] = React.useState('');

  const filtered = statusFilter === 'all'
    ? operations
    : operations.filter((o) => o.status === statusFilter);

  const handleUpdateStatus = (id: string, newStatus: OperationItem['status']) => {
    setOperations((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const handleReportIssue = () => {
    if (!selectedIssueOp || !issueNote.trim()) return;
    setOperations((prev) =>
      prev.map((o) =>
        o.id === selectedIssueOp.id ? { ...o, status: 'issue', note: issueNote.trim() } : o
      )
    );
    setSelectedIssueOp(null);
    setIssueNote('');
  };

  const completedCount = operations.filter((o) => o.status === 'completed').length;
  const inProgressCount = operations.filter((o) => o.status === 'in_progress').length;
  const confirmedCount = operations.filter((o) => o.status === 'confirmed').length;
  const pendingCount = operations.filter((o) => o.status === 'pending').length;
  const issueCount = operations.filter((o) => o.status === 'issue').length;

  return (
    <div className="space-y-5 max-w-[1600px] select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-[rgba(201,166,107,0.08)]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <h1 className="text-lg font-semibold text-[#F5F1E8] tracking-tight">
              Canlı Operasyon & Saha Kontrol Merkezi
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#101524] border border-[rgba(201,166,107,0.15)] text-[#C9A66B]">
              Canlı Akış
            </span>
          </div>
          <p className="text-xs text-[#F5F1E8]/40 mt-0.5">
            Bugün — {operations.length} operasyon · {inProgressCount} aktif sahada · {completedCount} tamamlandı
          </p>
        </div>
      </div>

      {/* Embedded Contextual Operations AI Intelligence */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#101524] to-[#0B0F1A] border border-[rgba(201,166,107,0.18)] flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[rgba(201,166,107,0.10)] border border-[rgba(201,166,107,0.20)] flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-[#C9A66B]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A66B] font-semibold">
              AI Lojistik & Saha İstihbaratı
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#05070F] text-[#F5F1E8]/40 border border-[rgba(201,166,107,0.10)]">
              Operations Radar
            </span>
          </div>
          <p className="text-xs text-[#F5F1E8]/80 mt-1 leading-relaxed">
            Bugünkü 6 operasyondan 1 VIP transfer aktif sahada (Mercedes V-Class). Saat 14:00 Majesty 56ft yat seyri öncesinde marinaya varış süresi planlanan zamanlamaya uygundur. Tüm şoför ve rehber atamaları eksiksizdir.
          </p>
        </div>
      </div>

      {/* Exception & Attention Alerts (If any issue exists) */}
      {issueCount > 0 && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-rose-400">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span className="font-medium">
              Dikkat Gerektiren {issueCount} Operasyonel Durum Bildirildi!
            </span>
          </div>
          <span className="text-[11px] font-mono text-rose-300/60">
            Saha ekibi koordinasyonu bekleniyor
          </span>
        </div>
      )}

      {/* Quick Status KPI Filter Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {[
          { label: 'Tüm Operasyonlar', count: operations.length, filter: 'all', color: 'text-[#F5F1E8]' },
          { label: 'Sahada Devam Eden', count: inProgressCount, filter: 'in_progress', color: 'text-[#E8C77A]' },
          { label: 'Onaylı & Hazır', count: confirmedCount, filter: 'confirmed', color: 'text-[#F5F1E8]/80' },
          { label: 'Tamamlanan', count: completedCount, filter: 'completed', color: 'text-emerald-400' },
          { label: 'Bekleyen', count: pendingCount, filter: 'pending', color: 'text-amber-400' },
          { label: 'Dikkat / Sorun', count: issueCount, filter: 'issue', color: 'text-rose-400' },
        ].map((stat) => {
          const isSelected = statusFilter === stat.filter;
          return (
            <button
              key={stat.filter}
              onClick={() => setStatusFilter(stat.filter)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-[rgba(201,166,107,0.15)] border-[rgba(201,166,107,0.35)] shadow-sm'
                  : 'bg-[#0B0F1A] border-[rgba(201,166,107,0.08)] hover:border-[rgba(201,166,107,0.20)]'
              }`}
            >
              <p className={`text-lg font-semibold font-mono ${stat.color}`}>{stat.count}</p>
              <p className="text-[10px] text-[#F5F1E8]/40 uppercase tracking-wider mt-0.5 truncate">
                {stat.label}
              </p>
            </button>
          );
        })}
      </div>

      {/* Operations Feed List */}
      <div className="p-5 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)] space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(201,166,107,0.08)]">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#C9A66B]" />
            <h3 className="text-xs font-semibold text-[#F5F1E8] uppercase tracking-wider font-mono">
              Operasyon Zaman Çizelgesi
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#F5F1E8]/40">
            {filtered.length} Kayıt Gösteriliyor
          </span>
        </div>

        <div className="divide-y divide-[rgba(201,166,107,0.06)]">
          {filtered.map((op) => {
            const OpIcon = op.icon;
            const statusInfo = STATUS_MAP[op.status] || STATUS_MAP.confirmed;

            return (
              <div
                key={op.id}
                className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 group hover:bg-[rgba(245,241,232,0.01)] transition-colors rounded-lg px-2"
              >
                {/* Left: Time, Icon, Main Spec */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="text-center shrink-0 w-12 pt-0.5">
                    <span className="text-xs font-mono font-semibold text-[#C9A66B] block flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      {op.time}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.12)] flex items-center justify-center shrink-0">
                    <OpIcon className="w-4 h-4 text-[#C9A66B]" />
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm">{COUNTRY_FLAGS[op.country] || '🌍'}</span>
                      <span className="text-xs font-semibold text-[#F5F1E8]">{op.customer}</span>
                      <span className="text-[10px] text-[#F5F1E8]/20">·</span>
                      <span className="text-xs font-medium text-[#F5F1E8]/90">{op.type}</span>
                      <TravelBadge variant={statusInfo.variant} size="sm" className="text-[9px] py-0 h-4">
                        {statusInfo.label}
                      </TravelBadge>
                    </div>

                    <p className="text-xs text-[#F5F1E8]/60 leading-relaxed">{op.detail}</p>
                    <p className="text-[11px] text-[#F5F1E8]/40 font-mono flex items-center gap-1">
                      <span>📍</span> {op.location}
                    </p>

                    {op.driver !== '—' && (
                      <div className="flex items-center gap-2 pt-0.5 text-[11px]">
                        <span className="text-[#E8C77A] font-mono font-medium">🚗 Şoför: {op.driver}</span>
                        {op.driverPhone && (
                          <a
                            href={`tel:${op.driverPhone}`}
                            className="text-[#C9A66B] hover:underline flex items-center gap-1 font-mono text-[10px]"
                          >
                            <Phone className="w-2.5 h-2.5" />
                            {op.driverPhone}
                          </a>
                        )}
                      </div>
                    )}

                    {op.note && (
                      <p className="text-[11px] text-amber-300/80 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10 italic mt-1">
                        Not: {op.note}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Operational Action Controls */}
                <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                  {op.status === 'confirmed' && (
                    <TravelButton
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(op.id, 'in_progress')}
                      className="h-7 text-[11px] border-[rgba(201,166,107,0.20)] text-[#E8C77A] hover:bg-[rgba(201,166,107,0.10)] gap-1"
                    >
                      <Play className="w-3 h-3" />
                      <span>Başlat</span>
                    </TravelButton>
                  )}

                  {op.status === 'in_progress' && (
                    <TravelButton
                      variant="primary"
                      size="sm"
                      onClick={() => handleUpdateStatus(op.id, 'completed')}
                      className="h-7 text-[11px] font-semibold gap-1 bg-emerald-500 text-[#05070F] hover:bg-emerald-400"
                    >
                      <CheckCircle className="w-3 h-3" />
                      <span>Tamamla</span>
                    </TravelButton>
                  )}

                  {op.status !== 'issue' && op.status !== 'completed' && (
                    <TravelButton
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedIssueOp(op)}
                      className="h-7 text-[11px] text-rose-400/60 hover:text-rose-400 hover:bg-rose-500/10 gap-1 px-2"
                      title="Sorun / Gecikme Bildir"
                    >
                      <AlertTriangle className="w-3 h-3" />
                      <span className="hidden sm:inline">Sorun Bildir</span>
                    </TravelButton>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Report Issue Dialog */}
      <TravelDialog
        open={!!selectedIssueOp}
        onOpenChange={(open) => !open && setSelectedIssueOp(null)}
        title="Operasyonel Sorun / Gecikme Bildirimi"
        description={`"${selectedIssueOp?.type}" işlemi için saha uyarısı girin.`}
      >
        <div className="space-y-3 text-xs">
          <div>
            <label className="text-[11px] text-[#F5F1E8]/60 font-mono block mb-1">
              Gecikme / Sorun Açıklaması
            </label>
            <textarea
              rows={3}
              value={issueNote}
              onChange={(e) => setIssueNote(e.target.value)}
              placeholder="Örn: Uçuş 25 dakika rötar yaptı, şoför Terminal 3 otoparkında beklemeye alındı..."
              className="w-full p-2.5 rounded-lg bg-[#05070F] border border-[rgba(201,166,107,0.20)] text-[#F5F1E8] text-xs placeholder-[#F5F1E8]/30 focus:outline-none focus:border-[#C9A66B]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <TravelButton variant="outline" size="sm" onClick={() => setSelectedIssueOp(null)}>
              İptal
            </TravelButton>
            <TravelButton variant="primary" size="sm" onClick={handleReportIssue} disabled={!issueNote.trim()}>
              Uyarısı Kaydet
            </TravelButton>
          </div>
        </div>
      </TravelDialog>
    </div>
  );
}
