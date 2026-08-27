'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Filter, LayoutGrid, List, Table2, Search, Phone, Mail, Calendar, Users, DollarSign, ArrowRight, GripVertical, Download } from 'lucide-react';
import Badge from '@/components/crm/ui/Badge';
import { exportToCsv } from '@/crm/utils/exportCsv';
import { LEAD_STAGES, COUNTRY_FLAGS, formatCurrency } from '@/types/crm';
import type { LeadStage, LeadPriority } from '@/types/crm';

// ─── Demo Data ───────────────────────────────────────────────
interface DemoLead {
  id: string;
  first_name: string;
  last_name: string;
  country: string;
  phone: string;
  email: string;
  travel_start_date: string;
  travel_end_date: string;
  pax_count: number;
  stage: LeadStage;
  estimated_value: number;
  source: string;
  assigned_to: string;
  priority: LeadPriority;
  lead_score: number;
  created_at: string;
  interests: string[];
}

const DEMO_LEADS: DemoLead[] = [
  { id: '1', first_name: 'Stefan', last_name: 'Müller', country: 'DE', phone: '+49 170 123 4567', email: 'stefan@email.de', travel_start_date: '2026-10-01', travel_end_date: '2026-10-07', pax_count: 6, stage: 'new', estimated_value: 52000, source: 'Instagram', assigned_to: 'Furkan', priority: 'high', lead_score: 83, created_at: '2026-08-27', interests: ['Yacht', 'Fine Dining'] },
  { id: '2', first_name: 'Ayşe', last_name: 'Korkmaz', country: 'TR', phone: '+90 532 987 6543', email: 'ayse@email.com', travel_start_date: '2026-09-25', travel_end_date: '2026-09-30', pax_count: 2, stage: 'contacted', estimated_value: 18000, source: 'Google', assigned_to: 'Efza', priority: 'medium', lead_score: 65, created_at: '2026-08-26', interests: ['Luxury', 'Spa'] },
  { id: '3', first_name: 'James', last_name: 'Wilson', country: 'GB', phone: '+44 7700 900000', email: 'james@email.co.uk', travel_start_date: '2026-11-15', travel_end_date: '2026-11-22', pax_count: 4, stage: 'qualified', estimated_value: 38000, source: 'Referral', assigned_to: 'Furkan', priority: 'high', lead_score: 78, created_at: '2026-08-25', interests: ['Desert Safari', 'Supercar'] },
  { id: '4', first_name: 'Mert', last_name: 'Kaya', country: 'TR', phone: '+90 535 111 2233', email: 'mert@email.com', travel_start_date: '2026-10-10', travel_end_date: '2026-10-14', pax_count: 2, stage: 'proposal_sent', estimated_value: 22000, source: 'WhatsApp', assigned_to: 'Efza', priority: 'medium', lead_score: 71, created_at: '2026-08-24', interests: ['Honeymoon', 'Beach Club'] },
  { id: '5', first_name: 'Александр', last_name: 'Петров', country: 'RU', phone: '+7 926 123 4567', email: 'alex@email.ru', travel_start_date: '2026-12-20', travel_end_date: '2027-01-05', pax_count: 3, stage: 'negotiation', estimated_value: 65000, source: 'Instagram', assigned_to: 'Furkan', priority: 'urgent', lead_score: 91, created_at: '2026-08-23', interests: ['UHNW', 'Yacht', 'Helicopter'] },
  { id: '6', first_name: 'Edip', last_name: 'Mangtay', country: 'TR', phone: '+90 532 000 0000', email: 'edip@email.com', travel_start_date: '2026-09-12', travel_end_date: '2026-09-17', pax_count: 2, stage: 'booked', estimated_value: 18500, source: 'Direct', assigned_to: 'Furkan', priority: 'medium', lead_score: 95, created_at: '2026-08-20', interests: ['VIP', 'Couple', 'Fine Dining'] },
  { id: '7', first_name: 'Fatma', last_name: 'Demir', country: 'TR', phone: '+90 533 444 5566', email: 'fatma@email.com', travel_start_date: '2026-09-20', travel_end_date: '2026-09-24', pax_count: 1, stage: 'lost', estimated_value: 12000, source: 'Google', assigned_to: 'Efza', priority: 'low', lead_score: 32, created_at: '2026-08-22', interests: ['Solo', 'Shopping'] },
];

const STAGE_BADGE_MAP: Record<LeadStage, 'info' | 'default' | 'success' | 'warning' | 'gold' | 'error'> = {
  new: 'info',
  contacted: 'default',
  qualified: 'success',
  proposal_sent: 'warning',
  negotiation: 'gold',
  booked: 'success',
  lost: 'error',
};

const PRIORITY_COLORS: Record<LeadPriority, string> = {
  low: 'text-[#F5F1E8]/30',
  medium: 'text-blue-400',
  high: 'text-amber-400',
  urgent: 'text-red-400',
};

type ViewMode = 'kanban' | 'table' | 'compact';

export default function LeadsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = DEMO_LEADS.filter(l =>
    `${l.first_name} ${l.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5 max-w-[1600px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Leads</h1>
          <p className="text-xs text-[#F5F1E8]/30 mt-0.5">{DEMO_LEADS.length} lead · Pipeline değeri: {formatCurrency(DEMO_LEADS.reduce((s, l) => s + l.estimated_value, 0))}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToCsv('travia_leads', DEMO_LEADS, [
              { header: 'Ad', key: 'first_name' },
              { header: 'Soyad', key: 'last_name' },
              { header: 'Ülke', key: 'country' },
              { header: 'Telefon', key: 'phone' },
              { header: 'E-posta', key: 'email' },
              { header: 'Aşama', key: 'stage' },
              { header: 'Değer (AED)', key: 'estimated_value' },
              { header: 'Kaynak', key: 'source' },
              { header: 'Atanan', key: 'assigned_to' },
            ])}
            className="px-3 py-1.5 text-xs rounded-lg bg-[#111827] border border-[#C9A66B]/15 text-[#F5F1E8]/60 hover:text-[#F5F1E8] transition-all flex items-center gap-1.5"
          >
            <Download className="w-3 h-3" /> Excel / CSV
          </button>
          <button className="px-3 py-1.5 text-xs rounded-lg bg-[#111827] border border-[#C9A66B]/10 text-[#F5F1E8]/40 hover:text-[#F5F1E8]/60 transition-colors flex items-center gap-1.5">
            <Filter className="w-3 h-3" /> Filtre
          </button>
          <div className="flex bg-[#111827] border border-[#C9A66B]/10 rounded-lg overflow-hidden">
            {([['kanban', LayoutGrid], ['table', Table2], ['compact', List]] as [ViewMode, React.ComponentType<{ className?: string }>][]).map(([mode, Icon]) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-1.5 transition-colors ${viewMode === mode ? 'bg-[#C9A66B]/10 text-[#C9A66B]' : 'text-[#F5F1E8]/25 hover:text-[#F5F1E8]/40'}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
          <button className="px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Yeni Lead
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#F5F1E8]/20" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Lead ara..."
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-[#111827] border border-[#C9A66B]/10 text-[#F5F1E8] placeholder-[#F5F1E8]/20 focus:outline-none focus:border-[#C9A66B]/30"
        />
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {LEAD_STAGES.filter(s => s.value !== 'lost').map((stage) => {
            const stageLeads = filteredLeads.filter(l => l.stage === stage.value);
            const stageValue = stageLeads.reduce((s, l) => s + l.estimated_value, 0);
            return (
              <div key={stage.value} className="min-w-[280px] max-w-[280px] shrink-0">
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="text-xs font-medium text-[#F5F1E8]/60">{stage.label}</span>
                    <span className="text-[10px] bg-[#111827] text-[#F5F1E8]/30 px-1.5 py-0.5 rounded-full">{stageLeads.length}</span>
                  </div>
                  <span className="text-[10px] text-[#F5F1E8]/20 font-mono">{formatCurrency(stageValue)}</span>
                </div>

                {/* Cards */}
                <div className="space-y-2">
                  {stageLeads.map((lead) => (
                    <Link
                      key={lead.id}
                      href={`/crm/leads/${lead.id}`}
                      className="block bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl p-3.5 hover:border-[#C9A66B]/20 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{COUNTRY_FLAGS[lead.country] || '🌍'}</span>
                          <p className="text-sm text-[#F5F1E8]/80 font-medium">{lead.first_name} {lead.last_name}</p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${PRIORITY_COLORS[lead.priority]}`} title={lead.priority} />
                      </div>
                      <div className="space-y-1.5 text-xs text-[#F5F1E8]/30">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          <span>{lead.travel_start_date} — {lead.travel_end_date}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3 h-3" />
                            <span>{lead.pax_count} kişi</span>
                          </div>
                          <span className="text-[#C9A66B] font-medium">{formatCurrency(lead.estimated_value)}</span>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-[#F5F1E8]/15">{lead.source}</span>
                          <span className="text-[10px] text-[#F5F1E8]/15">{lead.assigned_to}</span>
                        </div>
                      </div>
                      {lead.lead_score > 0 && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-1 bg-[#111827] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${lead.lead_score}%`,
                                backgroundColor: lead.lead_score > 75 ? '#10B981' : lead.lead_score > 50 ? '#FBBF24' : '#EF4444',
                              }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-[#F5F1E8]/25">{lead.lead_score}</span>
                        </div>
                      )}
                    </Link>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="py-8 text-center text-xs text-[#F5F1E8]/15 border border-dashed border-[#C9A66B]/10 rounded-xl">
                      Boş
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#C9A66B]/8">
                {['Lead', 'Ülke', 'Tarih', 'PAX', 'Değer', 'Kaynak', 'Aşama', 'Skor', 'Atanan'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-mono tracking-wider text-[#F5F1E8]/25 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9A66B]/5">
              {filteredLeads.map((lead) => {
                const stageInfo = LEAD_STAGES.find(s => s.value === lead.stage);
                return (
                  <tr key={lead.id} className="hover:bg-[#F5F1E8]/[0.01] transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/crm/leads/${lead.id}`} className="text-sm text-[#F5F1E8]/80 hover:text-[#C9A66B] transition-colors">
                        {lead.first_name} {lead.last_name}
                      </Link>
                      <p className="text-xs text-[#F5F1E8]/25">{lead.email}</p>
                    </td>
                    <td className="px-4 py-3 text-sm">{COUNTRY_FLAGS[lead.country] || '🌍'} <span className="text-xs text-[#F5F1E8]/30">{lead.country}</span></td>
                    <td className="px-4 py-3 text-xs text-[#F5F1E8]/40">{lead.travel_start_date}</td>
                    <td className="px-4 py-3 text-xs text-[#F5F1E8]/40">{lead.pax_count}</td>
                    <td className="px-4 py-3 text-xs text-[#C9A66B] font-medium">{formatCurrency(lead.estimated_value)}</td>
                    <td className="px-4 py-3 text-xs text-[#F5F1E8]/30">{lead.source}</td>
                    <td className="px-4 py-3"><Badge variant={STAGE_BADGE_MAP[lead.stage]}>{stageInfo?.label}</Badge></td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-mono ${lead.lead_score > 75 ? 'text-emerald-400' : lead.lead_score > 50 ? 'text-amber-400' : 'text-[#F5F1E8]/30'}`}>
                        {lead.lead_score}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#F5F1E8]/30">{lead.assigned_to}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Compact View */}
      {viewMode === 'compact' && (
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl divide-y divide-[#C9A66B]/5 overflow-hidden">
          {filteredLeads.map((lead) => {
            const stageInfo = LEAD_STAGES.find(s => s.value === lead.stage);
            return (
              <Link key={lead.id} href={`/crm/leads/${lead.id}`} className="flex items-center gap-4 px-5 py-3 hover:bg-[#F5F1E8]/[0.01] transition-colors">
                <span className="text-base">{COUNTRY_FLAGS[lead.country] || '🌍'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#F5F1E8]/80">{lead.first_name} {lead.last_name}</p>
                  <p className="text-xs text-[#F5F1E8]/25">{lead.travel_start_date} · {lead.pax_count} kişi · {lead.source}</p>
                </div>
                <span className="text-xs text-[#C9A66B] font-medium">{formatCurrency(lead.estimated_value)}</span>
                <Badge variant={STAGE_BADGE_MAP[lead.stage]}>{stageInfo?.label}</Badge>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
