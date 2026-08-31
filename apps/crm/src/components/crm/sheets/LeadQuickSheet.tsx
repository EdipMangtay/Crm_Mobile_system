'use client';

import * as React from 'react';
import Link from 'next/link';
import { Mail, Phone, ExternalLink, Calendar, Users } from 'lucide-react';
import {
  TravelSheetRoot as TravelSheet,
  TravelSheetContent,
  TravelSheetHeader,
  TravelSheetTitle,
  TravelBadge,
  TravelButton,
} from '@/components/ui/travel';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { COUNTRY_FLAGS, LEAD_STAGES, LeadStage } from '@/types';

export interface LeadData {
  id: string;
  first_name: string;
  last_name: string;
  country: string;
  phone: string;
  email: string;
  stage: LeadStage;
  estimated_value: number;
  source: string;
  assigned_to: string;
  lead_score: number;
  travel_start_date: string;
  travel_end_date?: string;
  pax_count: number;
  travel_type?: string;
  interests?: string[];
  notes?: string;
}

interface LeadQuickSheetProps {
  lead: LeadData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadQuickSheet({
  lead,
  open,
  onOpenChange,
}: LeadQuickSheetProps) {
  const { formatMoney } = useTenant();
  if (!lead) return null;

  const stageInfo = LEAD_STAGES.find((s) => s.value === lead.stage);

  return (
    <TravelSheet open={open} onOpenChange={onOpenChange}>
      <TravelSheetContent
        side="right"
        className="w-full sm:max-w-md bg-[#0B0F1A] border-l border-[rgba(201,166,107,0.15)] p-0 flex flex-col overflow-y-auto select-none"
      >
        {/* Header */}
        <TravelSheetHeader className="p-6 border-b border-[rgba(201,166,107,0.10)] bg-[#101524]/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <TravelSheetTitle className="text-base font-semibold text-[#F5F1E8]">
                {lead.first_name} {lead.last_name}
              </TravelSheetTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm">{COUNTRY_FLAGS[lead.country] || '🌍'}</span>
                <span className="text-xs text-[#F5F1E8]/40 font-mono uppercase">{lead.country}</span>
                <span className="text-[10px] text-[#F5F1E8]/20">·</span>
                <span className="text-xs text-[#C9A66B] font-mono">{lead.source}</span>
              </div>
            </div>
            <TravelBadge variant="gold" size="sm">
              {stageInfo?.label || lead.stage}
            </TravelBadge>
          </div>
        </TravelSheetHeader>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1">
          {/* Estimated Value & Lead Score */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#101524] border border-[rgba(201,166,107,0.12)]">
              <p className="text-[10px] font-mono text-[#F5F1E8]/40 uppercase tracking-wider">
                Tahmini Bütçe
              </p>
              <p className="text-lg font-semibold text-[#E8C77A] font-mono mt-0.5">
                {formatMoney(lead.estimated_value)}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#101524] border border-[rgba(201,166,107,0.12)]">
              <p className="text-[10px] font-mono text-[#F5F1E8]/40 uppercase tracking-wider">
                Nitelik Skoru
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-2 bg-[#05070F] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${lead.lead_score}%`,
                      backgroundColor: lead.lead_score > 75 ? '#10B981' : lead.lead_score > 50 ? '#FBBF24' : '#EF4444',
                    }}
                  />
                </div>
                <span className="font-mono text-xs font-semibold text-[#F5F1E8]">
                  {lead.lead_score}%
                </span>
              </div>
            </div>
          </div>

          {/* Travel Specs */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono">
              Seyahat Tercihleri
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)]">
                <span className="text-[10px] text-[#F5F1E8]/40 flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3 text-[#C9A66B]" />
                  Tarih
                </span>
                <p className="font-mono text-xs font-semibold text-[#F5F1E8] mt-0.5">
                  {lead.travel_start_date}
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)]">
                <span className="text-[10px] text-[#F5F1E8]/40 flex items-center gap-1 font-mono">
                  <Users className="w-3 h-3 text-[#C9A66B]" />
                  Kişi Sayısı
                </span>
                <p className="font-mono text-xs font-semibold text-[#F5F1E8] mt-0.5">
                  {lead.pax_count} PAX
                </p>
              </div>
            </div>
            {lead.travel_type && (
              <p className="text-xs text-[#F5F1E8]/70">
                <strong className="text-[#C9A66B] font-mono">Tür:</strong> {lead.travel_type}
              </p>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono">
              İletişim & Temsilci
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)] hover:border-[rgba(201,166,107,0.25)] text-[#F5F1E8]/80 hover:text-[#F5F1E8] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <span className="font-mono text-[11px] truncate">{lead.email}</span>
              </a>
              <a
                href={`tel:${lead.phone}`}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)] hover:border-[rgba(201,166,107,0.25)] text-[#F5F1E8]/80 hover:text-[#F5F1E8] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <span className="font-mono text-[11px]">{lead.phone}</span>
              </a>
            </div>
            <p className="text-[11px] text-[#F5F1E8]/40 pt-1">
              Atanan Temsilci: <strong className="text-[#F5F1E8]/80">{lead.assigned_to}</strong>
            </p>
          </div>
        </div>

        {/* Footer Link */}
        <div className="p-6 border-t border-[rgba(201,166,107,0.10)] bg-[#101524]/40">
          <Link href={`/crm/leads/${lead.id}`} className="block w-full">
            <TravelButton variant="primary" className="w-full justify-center text-xs gap-2">
              <span>Fırsat & Teklif Detayını Aç</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </TravelButton>
          </Link>
        </div>
      </TravelSheetContent>
    </TravelSheet>
  );
}
