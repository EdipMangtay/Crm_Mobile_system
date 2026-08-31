'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Plane,
  Ship,
  Utensils,
  Car,
  Users,
  AlertTriangle,
  MessageCircle,
  ArrowRight,
  TrendingUp,
  Briefcase,
  CalendarCheck,
  Compass,
} from 'lucide-react';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { TravelBadge } from '@/components/ui/travel/TravelBadge';
import { TravelButton } from '@/components/ui/travel/TravelButton';
import {
  SHARED_CUSTOMERS,
  SHARED_TRIPS,
  SHARED_LEADS,
  INITIAL_USER_THREADS,
} from '@/shared/data/traviaData';

// Authentic operations timeline derived from active trips
const TODAY_OPERATIONS = [
  {
    id: 'op-1',
    time: '09:10',
    customer: 'Kerem Aydın',
    customerId: 'd0000000-0000-0000-0000-000000000002',
    type: 'Havalimanı İniş & VIP Transfer',
    location: 'DXB Terminal 3 → Burj Al Arab',
    status: 'completed' as const,
    icon: Plane,
  },
  {
    id: 'op-2',
    time: '10:30',
    customer: 'Edip Mangtay',
    customerId: 'd0000000-0000-0000-0000-000000000001',
    type: 'Maybach VIP Transfer',
    location: 'DXB Terminal 3 → Atlantis The Royal',
    status: 'completed' as const,
    icon: Car,
  },
  {
    id: 'op-3',
    time: '14:00',
    customer: 'Edip Mangtay',
    customerId: 'd0000000-0000-0000-0000-000000000001',
    type: 'Özel Süperyat & Marina Seyri',
    location: 'Dubai Marina Lagoon',
    status: 'in_progress' as const,
    icon: Ship,
  },
  {
    id: 'op-4',
    time: '20:30',
    customer: 'Edip Mangtay',
    customerId: 'd0000000-0000-0000-0000-000000000001',
    type: 'Nobu Dubai Omakase Rezervasyon',
    location: 'Palm Jumeirah · Teras Ön Sıra',
    status: 'confirmed' as const,
    icon: Utensils,
  },
  {
    id: 'op-5',
    time: '22:00',
    customer: 'Selin Arslan',
    customerId: 'd0000000-0000-0000-0000-000000000003',
    type: 'VIP Check-in & Karşılama',
    location: 'Armani Hotel Dubai',
    status: 'pending' as const,
    icon: Users,
  },
];

const ATTENTION_ITEMS = [
  {
    id: 'att-1',
    type: 'payment',
    title: 'Ödeme vadesi yaklaşıyor',
    detail: 'Selin Arslan · Kalan Bakiye: 5,000 AED · Check-in öncesi tahsilat',
    href: '/crm/payments',
    badge: { label: 'Finans', variant: 'warning' as const },
  },
  {
    id: 'att-2',
    type: 'lead',
    title: 'Yüksek bütçeli lead teklif bekliyor',
    detail: 'Tobias Hartmann · Bütçe: 45,000 AED · Almanya (UHNW)',
    href: '/crm/leads/l0000000-0000-0000-0000-000000000001',
    badge: { label: 'Satış', variant: 'gold' as const },
  },
  {
    id: 'att-3',
    type: 'supplier',
    title: 'Tedarikçi operasyon onayı',
    detail: 'Yacht Marina Co · 14 Eylül gün batımı turu kaptan teyidi',
    href: '/crm/suppliers',
    badge: { label: 'Tedarikçi', variant: 'info' as const },
  },
];

export default function CrmDashboardPage() {
  const { tenant, formatMoney } = useTenant();
  const [activeFilter, setActiveFilter] = useState<'today' | 'week' | 'month'>('today');

  // Mathematical metrics calculation from authentic repo data
  const metrics = useMemo(() => {
    const totalCustomers = SHARED_CUSTOMERS.length;
    const tripsList = Object.values(SHARED_TRIPS);
    const totalTripsValue = tripsList.reduce((sum, t) => sum + (t.total_amount || 0), 0);
    const totalTripsCost = tripsList.reduce((sum, t) => sum + (t.supplier_cost || 0), 0);
    const grossMargin = totalTripsValue - totalTripsCost;

    const leadsList = SHARED_LEADS;
    const totalPipelineValue = leadsList.reduce((sum, l) => sum + (l.estimated_value || 0), 0);
    const activeLeadsCount = leadsList.filter((l) => l.stage !== 'lost' && l.stage !== 'booked').length;

    const threadsList = Object.values(INITIAL_USER_THREADS);
    const unreadMessagesCount = threadsList.reduce((sum, th) => sum + (th.staff_unread_count || 0), 0);

    return {
      totalCustomers,
      totalTripsCount: tripsList.length,
      totalTripsValue,
      grossMargin,
      totalPipelineValue,
      activeLeadsCount,
      unreadMessagesCount,
    };
  }, []);

  return (
    <div className="space-y-6 max-w-[1600px] pb-10">
      {/* ─── Control Strip Header ────────────────────────────────────────── */}
      <div className="bg-[#0B0F1A] border border-[#C9A66B]/15 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">
                {tenant.display_name} · Operasyon Kontrol Merkezi
              </h1>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#C9A66B]/10 text-[#C9A66B] border border-[#C9A66B]/20">
                Canlı Filo
              </span>
            </div>
            <p className="text-xs text-[#F5F1E8]/50">
              Operasyonlar normal seyrinde · 5 saha görevi aktif · {metrics.unreadMessagesCount} okunmamış concierge mesajı
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center bg-[#111827] p-0.5 rounded-lg border border-[#C9A66B]/15 text-xs">
              <button
                onClick={() => setActiveFilter('today')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeFilter === 'today'
                    ? 'bg-[#C9A66B]/20 text-[#C9A66B] font-medium'
                    : 'text-[#F5F1E8]/50 hover:text-[#F5F1E8]'
                }`}
              >
                Bugün
              </button>
              <button
                onClick={() => setActiveFilter('week')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeFilter === 'week'
                    ? 'bg-[#C9A66B]/20 text-[#C9A66B] font-medium'
                    : 'text-[#F5F1E8]/50 hover:text-[#F5F1E8]'
                }`}
              >
                Bu Hafta
              </button>
              <button
                onClick={() => setActiveFilter('month')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeFilter === 'month'
                    ? 'bg-[#C9A66B]/20 text-[#C9A66B] font-medium'
                    : 'text-[#F5F1E8]/50 hover:text-[#F5F1E8]'
                }`}
              >
                Bu Ay
              </button>
            </div>

            <Link href="/crm/operations">
              <TravelButton variant="outline" size="sm">
                <Compass className="w-3.5 h-3.5" />
                Saha Operasyonu
              </TravelButton>
            </Link>
            <Link href="/crm/concierge">
              <TravelButton variant="primary" size="sm">
                <MessageCircle className="w-3.5 h-3.5" />
                Concierge ({metrics.unreadMessagesCount})
              </TravelButton>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Business Snapshot Metrics Bar ──────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Active Trips Value */}
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F1E8]/40 uppercase">
            <span>Aktif Gezi Hacmi</span>
            <CalendarCheck className="w-3.5 h-3.5 text-[#C9A66B]" />
          </div>
          <p className="text-xl font-bold font-mono text-[#F5F1E8] tabular-nums">
            {formatMoney(metrics.totalTripsValue)}
          </p>
          <p className="text-[11px] text-[#F5F1E8]/40">
            {metrics.totalTripsCount} VIP seyahat rotası kayıtlı
          </p>
        </div>

        {/* Pipeline Value */}
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F1E8]/40 uppercase">
            <span>Satış Pipeline</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-xl font-bold font-mono text-[#F5F1E8] tabular-nums">
            {formatMoney(metrics.totalPipelineValue)}
          </p>
          <p className="text-[11px] text-emerald-400/80">
            {metrics.activeLeadsCount} aktif potansiyel fırsat
          </p>
        </div>

        {/* Gross Margin (Staff Only / Neutral) */}
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F1E8]/40 uppercase">
            <span>Brüt Katkı (Dahili)</span>
            <Briefcase className="w-3.5 h-3.5 text-[#C9A66B]" />
          </div>
          <p className="text-xl font-bold font-mono text-[#F5F1E8]/90 tabular-nums">
            {formatMoney(metrics.grossMargin)}
          </p>
          <p className="text-[11px] text-[#C9A66B]/70">
            %{((metrics.grossMargin / (metrics.totalTripsValue || 1)) * 100).toFixed(1)} portföy marjı
          </p>
        </div>

        {/* Customer Base */}
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F1E8]/40 uppercase">
            <span>VIP Portföy</span>
            <Users className="w-3.5 h-3.5 text-[#C9A66B]" />
          </div>
          <p className="text-xl font-bold font-mono text-[#F5F1E8] tabular-nums">
            {metrics.totalCustomers} Müşteri
          </p>
          <p className="text-[11px] text-[#F5F1E8]/40">
            100% profilli misafir kaydı
          </p>
        </div>
      </div>

      {/* ─── Main Two-Column Operational Grid ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Operations Rhythm & Live Attention */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Operations Section */}
          <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3.5 border-b border-[#C9A66B]/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <h2 className="text-sm font-semibold text-[#F5F1E8]">Bugünkü Saha Operasyonları</h2>
                <span className="text-xs font-mono text-[#F5F1E8]/30">({TODAY_OPERATIONS.length})</span>
              </div>
              <Link
                href="/crm/operations"
                className="text-xs text-[#C9A66B] hover:underline flex items-center gap-1"
              >
                Tüm Akışı Aç <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-[#C9A66B]/5">
              {TODAY_OPERATIONS.map((op) => {
                const Icon = op.icon;
                const badgeVariant =
                  op.status === 'completed'
                    ? 'success'
                    : op.status === 'in_progress'
                    ? 'gold'
                    : op.status === 'confirmed'
                    ? 'info'
                    : 'warning';

                const statusText =
                  op.status === 'completed'
                    ? 'Tamamlandı'
                    : op.status === 'in_progress'
                    ? 'Sahada'
                    : op.status === 'confirmed'
                    ? 'Onaylı'
                    : 'Bekliyor';

                return (
                  <div
                    key={op.id}
                    className="p-4 flex items-center gap-4 hover:bg-[#111827]/40 transition-colors"
                  >
                    <div className="text-xs font-mono font-semibold text-[#C9A66B] w-12 shrink-0">
                      {op.time}
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-[#111827] border border-[#C9A66B]/15 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#C9A66B]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/crm/customers/${op.customerId}`}
                          className="text-xs font-medium text-[#F5F1E8] hover:text-[#C9A66B] transition-colors truncate"
                        >
                          {op.customer}
                        </Link>
                        <span className="text-[10px] text-[#F5F1E8]/30">·</span>
                        <span className="text-xs text-[#F5F1E8]/70 truncate">{op.type}</span>
                      </div>
                      <p className="text-[11px] text-[#F5F1E8]/40 truncate mt-0.5">{op.location}</p>
                    </div>

                    <TravelBadge variant={badgeVariant} size="sm">
                      {statusText}
                    </TravelBadge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Attention & Action Items */}
          <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#C9A66B]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-semibold text-[#F5F1E8]">Dikkat ve Eylem Gerektirenler</h2>
              </div>
              <span className="text-[10px] font-mono text-[#F5F1E8]/30 uppercase">3 Öncelikli</span>
            </div>

            <div className="divide-y divide-[#C9A66B]/5">
              {ATTENTION_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-[#111827]/40 transition-colors group"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <TravelBadge variant={item.badge.variant} size="sm">
                        {item.badge.label}
                      </TravelBadge>
                      <h3 className="text-xs font-medium text-[#F5F1E8] group-hover:text-[#C9A66B] transition-colors truncate">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-[#F5F1E8]/40 truncate">{item.detail}</p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#F5F1E8]/20 group-hover:text-[#C9A66B] group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Live Concierge + Commercial Pulse */}
        <div className="space-y-6">
          {/* Live Concierge Feed */}
          <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#C9A66B]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#C9A66B]" />
                <h2 className="text-sm font-semibold text-[#F5F1E8]">Canlı Concierge Kuyruğu</h2>
              </div>
              <Link
                href="/crm/concierge"
                className="text-xs text-[#C9A66B] hover:underline flex items-center gap-1"
              >
                Tümü <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-[#C9A66B]/5">
              {Object.values(INITIAL_USER_THREADS).map((th) => (
                <Link
                  key={th.id}
                  href="/crm/concierge"
                  className="p-4 flex items-start gap-3 hover:bg-[#111827]/40 transition-colors block"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C9A66B]/10 border border-[#C9A66B]/20 text-[#C9A66B] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {th.customer_name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#F5F1E8] truncate">
                        {th.customer_name} {th.customer_country}
                      </p>
                      <span className="text-[10px] font-mono text-[#F5F1E8]/30">{th.last_message_at}</span>
                    </div>
                    <p className="text-[11px] text-[#F5F1E8]/50 truncate mt-0.5">
                      {th.last_message_preview}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Lead Pipeline Distribution */}
          <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#F5F1E8]">Satış Pipeline Durumu</h2>
              <Link href="/crm/leads" className="text-xs text-[#C9A66B] hover:underline">
                Huniyi İncele
              </Link>
            </div>

            <div className="space-y-2.5">
              {[
                { stage: 'Nitelikli & İletişim', count: 3, budget: 120000, color: 'bg-emerald-400' },
                { stage: 'Teklif Gönderildi', count: 2, budget: 85000, color: 'bg-[#C9A66B]' },
                { stage: 'Müzakere', count: 1, budget: 45000, color: 'bg-blue-400' },
              ].map((pipe) => (
                <div key={pipe.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#F5F1E8]/60">{pipe.stage}</span>
                    <span className="font-mono font-medium text-[#F5F1E8] tabular-nums">
                      {pipe.count} Lead · {formatMoney(pipe.budget)}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#111827] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pipe.color}`}
                      style={{ width: `${(pipe.budget / 120000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
