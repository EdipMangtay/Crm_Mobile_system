'use client';

import { useState } from 'react';
import {
  DollarSign, TrendingUp, CalendarCheck, UserPlus, Target, BarChart3,
  Users, CreditCard, Plane, Ship, Utensils, Car, AlertTriangle,
  MessageCircle, ArrowRight
} from 'lucide-react';
import { KPICard, Badge } from '@/components/crm';
import Link from 'next/link';

// ─── Demo Dashboard Data ─────────────────────────────────────
// In production: fetched from Supabase via server component or React Query
const DEMO_KPIS = {
  revenue: { value: '247,500', delta: 18.3, trend: 'up' as const },
  grossContribution: { value: '89,200', delta: 12.7, trend: 'up' as const },
  bookings: { value: '34', delta: 8.2, trend: 'up' as const },
  newLeads: { value: '47', delta: -3.1, trend: 'down' as const },
  conversionRate: { value: '%23.4', delta: 5.2, trend: 'up' as const },
  avgBookingValue: { value: '7,280', delta: 11.1, trend: 'up' as const },
  activeGuests: { value: '6', delta: 0, trend: 'neutral' as const },
  outstandingPayments: { value: '42,300', delta: -8.5, trend: 'up' as const },
};

const PIPELINE_STAGES = [
  { stage: 'Yeni', count: 12, value: 186000, color: '#60A5FA' },
  { stage: 'İletişim', count: 8, value: 124000, color: '#A78BFA' },
  { stage: 'Nitelikli', count: 6, value: 98000, color: '#34D399' },
  { stage: 'Teklif', count: 4, value: 72000, color: '#FBBF24' },
  { stage: 'Müzakere', count: 3, value: 54000, color: '#F97316' },
  { stage: 'Rezervasyon', count: 14, value: 247500, color: '#10B981' },
  { stage: 'Kayıp', count: 5, value: 45000, color: '#EF4444' },
];

const TODAY_OPERATIONS = [
  { id: '1', time: '09:10', customer: 'Kerem Aydın', type: 'Havalimanı İniş', location: 'DXB Terminal 3', status: 'completed' as const, icon: Plane },
  { id: '2', time: '10:30', customer: 'Edip Mangtay', type: 'VIP Transfer', location: 'DXB → Atlantis', status: 'confirmed' as const, icon: Car },
  { id: '3', time: '14:00', customer: 'Edip Mangtay', type: 'Özel Yat', location: 'Dubai Marina', status: 'confirmed' as const, icon: Ship },
  { id: '4', time: '20:30', customer: 'Edip Mangtay', type: 'Restoran', location: 'Nobu Dubai', status: 'confirmed' as const, icon: Utensils },
  { id: '5', time: '22:00', customer: 'Selin Arslan', type: 'Hotel Check-in', location: 'Armani Hotel', status: 'pending' as const, icon: Users },
];

const LIVE_CONCIERGE = [
  { id: '1', customer: 'Edip Mangtay', message: 'Bu akşam güzel bir steakhouse ayarlayabilir miyiz?', time: '2 dk', unread: true, vip: true },
  { id: '2', customer: 'Selin Arslan', message: 'Havalimanı transfer saatini değiştirebilir miyiz?', time: '15 dk', unread: true, vip: false },
  { id: '3', customer: 'Kerem Aydın', message: 'Çöl safarisi için çocuklar da gelebilir mi?', time: '1 saat', unread: false, vip: false },
];

const FINANCE_SUMMARY = [
  { label: 'Tahsil Edilen', value: '205,200 AED', color: 'text-emerald-400' },
  { label: 'Bekleyen', value: '42,300 AED', color: 'text-amber-400' },
  { label: 'Vadesi Geçen', value: '8,750 AED', color: 'text-red-400' },
  { label: 'Önümüzdeki 7 Gün', value: '28,000 AED', color: 'text-blue-400' },
];

const STATUS_STYLES = {
  completed: { label: 'Tamamlandı', variant: 'success' as const },
  confirmed: { label: 'Onaylı', variant: 'info' as const },
  pending: { label: 'Bekliyor', variant: 'warning' as const },
  issue: { label: 'Sorun', variant: 'error' as const },
  in_progress: { label: 'Devam Ediyor', variant: 'gold' as const },
};

export default function CrmDashboardPage() {
  const [dateRange, setDateRange] = useState('bu_ay');

  return (
    <div className="space-y-6 max-w-[1600px]">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Genel Bakış</h1>
          <p className="text-xs text-[#F5F1E8]/30 mt-0.5">Travia Dubai · Yönetim Kontrol Merkezi</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg bg-[#111827] border border-[#C9A66B]/10 text-[#F5F1E8]/60 focus:outline-none focus:border-[#C9A66B]/30"
          >
            <option value="bugun">Bugün</option>
            <option value="bu_hafta">Bu Hafta</option>
            <option value="bu_ay">Bu Ay</option>
            <option value="son_90">Son 90 Gün</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Gelir"
          value={`${DEMO_KPIS.revenue.value} AED`}
          delta={DEMO_KPIS.revenue.delta}
          deltaLabel="önceki döneme göre"
          trend={DEMO_KPIS.revenue.trend}
          icon={<DollarSign className="w-3.5 h-3.5 text-[#C9A66B]" />}
        />
        <KPICard
          title="Brüt Katkı"
          value={`${DEMO_KPIS.grossContribution.value} AED`}
          delta={DEMO_KPIS.grossContribution.delta}
          deltaLabel="önceki döneme göre"
          trend={DEMO_KPIS.grossContribution.trend}
          icon={<TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
        />
        <KPICard
          title="Rezervasyonlar"
          value={DEMO_KPIS.bookings.value}
          delta={DEMO_KPIS.bookings.delta}
          trend={DEMO_KPIS.bookings.trend}
          icon={<CalendarCheck className="w-3.5 h-3.5 text-blue-400" />}
        />
        <KPICard
          title="Yeni Lead'ler"
          value={DEMO_KPIS.newLeads.value}
          delta={DEMO_KPIS.newLeads.delta}
          trend={DEMO_KPIS.newLeads.trend}
          icon={<UserPlus className="w-3.5 h-3.5 text-purple-400" />}
        />
        <KPICard
          title="Dönüşüm Oranı"
          value={DEMO_KPIS.conversionRate.value}
          delta={DEMO_KPIS.conversionRate.delta}
          trend={DEMO_KPIS.conversionRate.trend}
          icon={<Target className="w-3.5 h-3.5 text-[#C9A66B]" />}
        />
        <KPICard
          title="Ort. Rezervasyon Değeri"
          value={`${DEMO_KPIS.avgBookingValue.value} AED`}
          delta={DEMO_KPIS.avgBookingValue.delta}
          trend={DEMO_KPIS.avgBookingValue.trend}
          icon={<BarChart3 className="w-3.5 h-3.5 text-[#C9A66B]" />}
        />
        <KPICard
          title="Dubai'deki Misafirler"
          value={DEMO_KPIS.activeGuests.value}
          trend={DEMO_KPIS.activeGuests.trend}
          icon={<Users className="w-3.5 h-3.5 text-amber-400" />}
        />
        <KPICard
          title="Bekleyen Ödeme"
          value={`${DEMO_KPIS.outstandingPayments.value} AED`}
          delta={DEMO_KPIS.outstandingPayments.delta}
          deltaLabel="azalma"
          trend={DEMO_KPIS.outstandingPayments.trend}
          icon={<CreditCard className="w-3.5 h-3.5 text-red-400" />}
        />
      </div>

      {/* Main Grid: Today + Concierge + Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* TODAY IN DUBAI */}
        <div className="lg:col-span-2 bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#C9A66B]/8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-sm font-medium text-[#F5F1E8]">Bugün Dubai&apos;de</h3>
              <span className="text-[10px] text-[#F5F1E8]/25 font-mono">{TODAY_OPERATIONS.length} operasyon</span>
            </div>
            <Link href="/crm/operations" className="text-[10px] text-[#C9A66B]/60 hover:text-[#C9A66B] transition-colors flex items-center gap-1">
              Tümünü Gör <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-[#C9A66B]/5">
            {TODAY_OPERATIONS.map((op) => {
              const OpIcon = op.icon;
              const statusInfo = STATUS_STYLES[op.status];
              return (
                <div key={op.id} className="flex items-center gap-4 px-5 py-3 hover:bg-[#F5F1E8]/[0.01] transition-colors">
                  <span className="text-xs font-mono text-[#C9A66B]/50 w-12 shrink-0">{op.time}</span>
                  <div className="w-8 h-8 rounded-lg bg-[#111827] border border-[#C9A66B]/10 flex items-center justify-center shrink-0">
                    <OpIcon className="w-3.5 h-3.5 text-[#C9A66B]/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#F5F1E8]/80 truncate">{op.customer}</p>
                    <p className="text-xs text-[#F5F1E8]/30 truncate">{op.type} · {op.location}</p>
                  </div>
                  <Badge variant={statusInfo.variant} size="sm">{statusInfo.label}</Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* LIVE CONCIERGE */}
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#C9A66B]/8">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 text-[#C9A66B]/50" />
              <h3 className="text-sm font-medium text-[#F5F1E8]">Concierge</h3>
              <span className="w-5 h-5 rounded-full bg-[#C9A66B]/15 text-[#C9A66B] text-[10px] font-bold flex items-center justify-center">
                {LIVE_CONCIERGE.filter(m => m.unread).length}
              </span>
            </div>
            <Link href="/crm/concierge" className="text-[10px] text-[#C9A66B]/60 hover:text-[#C9A66B] transition-colors flex items-center gap-1">
              Inbox <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-[#C9A66B]/5">
            {LIVE_CONCIERGE.map((msg) => (
              <Link key={msg.id} href="/crm/concierge" className="flex items-start gap-3 px-5 py-3 hover:bg-[#F5F1E8]/[0.01] transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                  msg.unread ? 'bg-[#C9A66B]/15 text-[#C9A66B]' : 'bg-[#111827] text-[#F5F1E8]/30'
                }`}>
                  {msg.customer[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm truncate ${msg.unread ? 'text-[#F5F1E8]' : 'text-[#F5F1E8]/50'}`}>
                      {msg.customer}
                    </p>
                    {msg.vip && <Badge variant="gold" size="sm">VIP</Badge>}
                  </div>
                  <p className="text-xs text-[#F5F1E8]/30 truncate mt-0.5">{msg.message}</p>
                </div>
                <span className="text-[10px] text-[#F5F1E8]/20 shrink-0">{msg.time}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline + Finance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* SALES PIPELINE */}
        <div className="lg:col-span-2 bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#C9A66B]/8">
            <h3 className="text-sm font-medium text-[#F5F1E8]">Satış Pipeline</h3>
            <Link href="/crm/leads" className="text-[10px] text-[#C9A66B]/60 hover:text-[#C9A66B] transition-colors flex items-center gap-1">
              Detaylar <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="p-5">
            {/* Pipeline Bar */}
            <div className="flex rounded-lg overflow-hidden h-8 mb-5">
              {PIPELINE_STAGES.filter(s => s.stage !== 'Kayıp').map((stage) => {
                const total = PIPELINE_STAGES.reduce((sum, s) => sum + s.count, 0);
                const pct = (stage.count / total) * 100;
                return (
                  <div
                    key={stage.stage}
                    className="relative group flex items-center justify-center text-[10px] font-medium text-[#05070F] transition-all hover:opacity-80"
                    style={{ width: `${Math.max(pct, 5)}%`, backgroundColor: stage.color }}
                  >
                    {pct > 8 && stage.count}
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-[#111827] border border-[#C9A66B]/20 rounded-lg px-3 py-2 text-left z-10 whitespace-nowrap shadow-xl">
                      <p className="text-xs text-[#F5F1E8]">{stage.stage}</p>
                      <p className="text-[10px] text-[#F5F1E8]/40">{stage.count} lead · {(stage.value / 1000).toFixed(0)}K AED</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Pipeline Stats Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {PIPELINE_STAGES.filter(s => s.stage !== 'Kayıp').map((stage) => (
                <div key={stage.stage} className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="text-[10px] text-[#F5F1E8]/40">{stage.stage}</span>
                  </div>
                  <p className="text-lg font-semibold text-[#F5F1E8]">{stage.count}</p>
                  <p className="text-[10px] text-[#F5F1E8]/20">{(stage.value / 1000).toFixed(0)}K</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FINANCE */}
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#C9A66B]/8">
            <h3 className="text-sm font-medium text-[#F5F1E8]">Finans</h3>
            <Link href="/crm/payments" className="text-[10px] text-[#C9A66B]/60 hover:text-[#C9A66B] transition-colors flex items-center gap-1">
              Detaylar <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="p-5 space-y-4">
            {FINANCE_SUMMARY.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-xs text-[#F5F1E8]/40">{item.label}</span>
                <span className={`text-sm font-medium ${item.color}`}>{item.value}</span>
              </div>
            ))}
            <div className="h-px bg-[#C9A66B]/5 my-2" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#F5F1E8]/60 font-medium">Brüt Marj</span>
              <span className="text-sm font-semibold text-[#C9A66B]">%36.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marketing + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* MARKETING SOURCES */}
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#C9A66B]/8">
            <h3 className="text-sm font-medium text-[#F5F1E8]">Lead Kaynakları</h3>
            <Link href="/crm/marketing" className="text-[10px] text-[#C9A66B]/60 hover:text-[#C9A66B] transition-colors flex items-center gap-1">
              Detaylar <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="p-5 space-y-3">
            {[
              { source: 'Instagram', leads: 18, conversion: 28, color: '#E4405F' },
              { source: 'Google', leads: 12, conversion: 22, color: '#4285F4' },
              { source: 'Referral', leads: 8, conversion: 45, color: '#10B981' },
              { source: 'WhatsApp', leads: 6, conversion: 38, color: '#25D366' },
              { source: 'Organik', leads: 3, conversion: 15, color: '#8B5CF6' },
            ].map((source) => (
              <div key={source.source} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: source.color }} />
                <span className="text-xs text-[#F5F1E8]/60 w-20">{source.source}</span>
                <div className="flex-1 h-1.5 bg-[#111827] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${(source.leads / 18) * 100}%`, backgroundColor: source.color }}
                  />
                </div>
                <span className="text-xs text-[#F5F1E8]/40 w-8 text-right">{source.leads}</span>
                <span className="text-[10px] text-[#F5F1E8]/20 w-10 text-right">%{source.conversion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ISSUES & ALERTS */}
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#C9A66B]/8">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <h3 className="text-sm font-medium text-[#F5F1E8]">Dikkat Gerektiren</h3>
            </div>
          </div>
          <div className="divide-y divide-[#C9A66B]/5">
            {[
              { type: 'overdue', title: 'Ödeme vadesi geçti', detail: 'Selin Arslan · 4,200 AED · 3 gün', variant: 'error' as const },
              { type: 'follow_up', title: 'Takip gerekli', detail: 'Burak Çetin · Qualified · Son iletişim 5 gün önce', variant: 'warning' as const },
              { type: 'unconfirmed', title: 'Tedarikçi onayı bekliyor', detail: 'Yacht Marina Co · 14 Eylül yat turu', variant: 'warning' as const },
              { type: 'new_lead', title: 'Yüksek değerli lead', detail: 'Alman çift · 6 kişi · 50K+ AED · Instagram', variant: 'info' as const },
            ].map((alert, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-[#F5F1E8]/[0.01] transition-colors">
                <Badge variant={alert.variant} size="sm">{alert.type === 'overdue' ? '!' : '•'}</Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#F5F1E8]/70">{alert.title}</p>
                  <p className="text-xs text-[#F5F1E8]/25 truncate">{alert.detail}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#F5F1E8]/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
