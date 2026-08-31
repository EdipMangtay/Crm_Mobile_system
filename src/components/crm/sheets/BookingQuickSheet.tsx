'use client';

import * as React from 'react';
import { Calendar, Truck } from 'lucide-react';
import {
  TravelSheetRoot as TravelSheet,
  TravelSheetContent,
  TravelSheetHeader,
  TravelSheetTitle,
  TravelBadge,
} from '@/components/ui/travel';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { BOOKING_TYPE_LABELS, BookingType } from '@/types';

export interface BookingData {
  id: string;
  title: string;
  customer: string;
  trip: string;
  type: BookingType;
  date: string;
  time: string;
  supplier: string;
  cost: number;
  price: number;
  margin: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface BookingQuickSheetProps {
  booking: BookingData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingQuickSheet({
  booking,
  open,
  onOpenChange,
}: BookingQuickSheetProps) {
  const { formatMoney } = useTenant();
  if (!booking) return null;

  return (
    <TravelSheet open={open} onOpenChange={onOpenChange}>
      <TravelSheetContent
        side="right"
        className="w-full sm:max-w-md bg-[#0B0F1A] border-l border-[rgba(201,166,107,0.15)] p-0 flex flex-col overflow-y-auto select-none"
      >
        <TravelSheetHeader className="p-6 border-b border-[rgba(201,166,107,0.10)] bg-[#101524]/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-mono text-[#C9A66B] uppercase tracking-wider">
                Rezervasyon Kalemi #{booking.id.padStart(4, '0')}
              </p>
              <TravelSheetTitle className="text-base font-semibold text-[#F5F1E8] mt-0.5">
                {booking.title}
              </TravelSheetTitle>
            </div>
            <TravelBadge variant={booking.status === 'confirmed' ? 'success' : 'warning'} size="sm">
              {booking.status === 'confirmed' ? 'Onaylı' : 'Bekliyor'}
            </TravelBadge>
          </div>
        </TravelSheetHeader>

        <div className="p-6 space-y-6 flex-1">
          {/* Guest & Trip Info */}
          <div className="p-4 rounded-xl bg-[#101524] border border-[rgba(201,166,107,0.12)] space-y-2">
            <div>
              <span className="text-[10px] font-mono text-[#F5F1E8]/40 uppercase">Misafir</span>
              <p className="text-sm font-semibold text-[#F5F1E8]">{booking.customer}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#F5F1E8]/40 uppercase">Bağlı Gezi</span>
              <p className="text-xs text-[#F5F1E8]/70 font-mono">{booking.trip}</p>
            </div>
          </div>

          {/* Schedule & Supplier */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)]">
              <Calendar className="w-4 h-4 text-[#C9A66B] shrink-0" />
              <div>
                <p className="font-mono font-medium text-[#F5F1E8]">{booking.date} · {booking.time}</p>
                <p className="text-[10px] text-[#F5F1E8]/40">{BOOKING_TYPE_LABELS[booking.type] || booking.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)]">
              <Truck className="w-4 h-4 text-[#C9A66B] shrink-0" />
              <div>
                <p className="font-medium text-[#F5F1E8]">{booking.supplier}</p>
                <p className="text-[10px] text-[#F5F1E8]/40">Hizmet Tedarikçisi</p>
              </div>
            </div>
          </div>

          {/* Financial Breakdown (Calm Neutral / Tabular styling) */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono">
              Finansal Değerler
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.10)]">
                <span className="text-[10px] font-mono text-[#F5F1E8]/40 block">Net Maliyet</span>
                <span className="font-mono text-xs text-[#F5F1E8]/70 tabular-nums">
                  {formatMoney(booking.cost)}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.10)]">
                <span className="text-[10px] font-mono text-[#F5F1E8]/40 block">Satış Fiyatı</span>
                <span className="font-mono text-xs text-[#F5F1E8] font-semibold tabular-nums">
                  {formatMoney(booking.price)}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.10)]">
                <span className="text-[10px] font-mono text-[#F5F1E8]/40 block">Brüt Kâr</span>
                <span className="font-mono text-xs text-[#E8C77A] font-semibold tabular-nums">
                  {formatMoney(booking.margin)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </TravelSheetContent>
    </TravelSheet>
  );
}
