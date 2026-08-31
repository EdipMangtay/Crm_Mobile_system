'use client';

import * as React from 'react';
import Link from 'next/link';
import { ExternalLink, Calendar, Hotel } from 'lucide-react';
import {
  TravelSheetRoot as TravelSheet,
  TravelSheetContent,
  TravelSheetHeader,
  TravelSheetTitle,
  TravelBadge,
  TravelButton,
} from '@/components/ui/travel';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { COUNTRY_FLAGS } from '@/types';

export interface TripData {
  id: string;
  title: string;
  customer: string;
  country: string;
  dates: string;
  nights: number;
  pax: number;
  hotel: string;
  total: number;
  paid: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
}

interface TripQuickSheetProps {
  trip: TripData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STATUS_MAP = {
  upcoming: { label: 'Yaklaşan', variant: 'info' as const },
  active: { label: 'Aktif', variant: 'success' as const },
  completed: { label: 'Tamamlandı', variant: 'neutral' as const },
  cancelled: { label: 'İptal', variant: 'error' as const },
};

export function TripQuickSheet({
  trip,
  open,
  onOpenChange,
}: TripQuickSheetProps) {
  const { formatMoney } = useTenant();
  if (!trip) return null;

  const statusInfo = STATUS_MAP[trip.status] || STATUS_MAP.upcoming;
  const paidPct = Math.min(100, Math.round((trip.paid / trip.total) * 100));

  return (
    <TravelSheet open={open} onOpenChange={onOpenChange}>
      <TravelSheetContent
        side="right"
        className="w-full sm:max-w-md bg-[#0B0F1A] border-l border-[rgba(201,166,107,0.15)] p-0 flex flex-col overflow-y-auto select-none"
      >
        <TravelSheetHeader className="p-6 border-b border-[rgba(201,166,107,0.10)] bg-[#101524]/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <TravelSheetTitle className="text-base font-semibold text-[#F5F1E8]">
                {trip.title}
              </TravelSheetTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm">{COUNTRY_FLAGS[trip.country]}</span>
                <span className="text-xs text-[#F5F1E8]/70 font-medium">{trip.customer}</span>
              </div>
            </div>
            <TravelBadge variant={statusInfo.variant} size="sm">
              {statusInfo.label}
            </TravelBadge>
          </div>
        </TravelSheetHeader>

        <div className="p-6 space-y-6 flex-1">
          {/* Trip Specifications */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono">
              Seyahat Özeti
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)]">
                <Calendar className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <div>
                  <p className="font-mono font-semibold text-[#F5F1E8]">{trip.dates}</p>
                  <p className="text-[10px] text-[#F5F1E8]/40">{trip.nights} Gece · {trip.pax} PAX</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)]">
                <Hotel className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <span className="text-[#F5F1E8]/80 font-medium truncate">{trip.hotel}</span>
              </div>
            </div>
          </div>

          {/* Financial Progress */}
          <div className="p-4 rounded-xl bg-[#101524] border border-[rgba(201,166,107,0.12)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#F5F1E8]/40 uppercase tracking-wider">
                Finansal Durum
              </span>
              <span className="font-mono text-xs font-semibold text-[#E8C77A]">
                %{paidPct} Tahsil Edildi
              </span>
            </div>
            <div className="h-2 bg-[#05070F] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                style={{ width: `${paidPct}%` }}
              />
            </div>
            <div className="flex justify-between font-mono text-xs pt-1">
              <div>
                <span className="text-[10px] text-[#F5F1E8]/40 block">Tahsil Edilen</span>
                <span className="text-[#F5F1E8] font-semibold">{formatMoney(trip.paid)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#F5F1E8]/40 block">Toplam Tutar</span>
                <span className="text-[#E8C77A] font-semibold">{formatMoney(trip.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[rgba(201,166,107,0.10)] bg-[#101524]/40">
          <Link href={`/crm/trips/${trip.id}`} className="block w-full">
            <TravelButton variant="primary" className="w-full justify-center text-xs gap-2">
              <span>Gezi Programını & İterasyonu Aç</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </TravelButton>
          </Link>
        </div>
      </TravelSheetContent>
    </TravelSheet>
  );
}
