'use client';

import * as React from 'react';
import {
  TravelSheetRoot as TravelSheet,
  TravelSheetContent,
  TravelSheetHeader,
  TravelSheetTitle,
  TravelBadge,
} from '@/components/ui/travel';
import { useTenant } from '@/lib/tenancy/TenantProvider';

export interface PaymentData {
  id: string;
  customer: string;
  trip: string;
  amount: number;
  method: string;
  status: 'received' | 'pending' | 'refunded' | 'cancelled';
  date: string;
  ref: string;
}

interface PaymentQuickSheetProps {
  payment: PaymentData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PAYMENT_STATUS_MAP: Record<string, { label: string; variant: 'success' | 'warning' | 'error' | 'neutral' }> = {
  received: { label: 'Tahsil Edildi', variant: 'success' },
  pending: { label: 'Bekliyor', variant: 'warning' },
  refunded: { label: 'İade Edildi', variant: 'error' },
  cancelled: { label: 'İptal', variant: 'neutral' },
};

export function PaymentQuickSheet({
  payment,
  open,
  onOpenChange,
}: PaymentQuickSheetProps) {
  const { formatMoney } = useTenant();
  if (!payment) return null;

  const stg = PAYMENT_STATUS_MAP[payment.status] || { label: payment.status, variant: 'neutral' as const };

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
                İşlem Dekontu
              </p>
              <TravelSheetTitle className="text-base font-semibold text-[#F5F1E8] font-mono mt-0.5">
                {payment.ref}
              </TravelSheetTitle>
            </div>
            <TravelBadge variant={stg.variant} size="sm">
              {stg.label}
            </TravelBadge>
          </div>
        </TravelSheetHeader>

        <div className="p-6 space-y-6 flex-1">
          {/* Amount Display */}
          <div className="p-4 rounded-xl bg-[#101524] border border-[rgba(201,166,107,0.12)]">
            <span className="text-[10px] font-mono text-[#F5F1E8]/40 uppercase tracking-wider">
              İşlem Tutarı
            </span>
            <p className="text-2xl font-semibold text-[#E8C77A] font-mono mt-1">
              {formatMoney(payment.amount)}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono">
              İşlem Bilgileri
            </h4>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)]">
                <span className="text-[10px] text-[#F5F1E8]/40 block font-mono">Misafir</span>
                <span className="font-medium text-[#F5F1E8]">{payment.customer}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)]">
                <span className="text-[10px] text-[#F5F1E8]/40 block font-mono">Bağlı Gezi / Paket</span>
                <span className="text-[#F5F1E8]/80">{payment.trip}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)] flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-[#F5F1E8]/40 block font-mono">Ödeme Yöntemi</span>
                  <span className="text-[#F5F1E8]/90 font-medium">{payment.method}</span>
                </div>
                <span className="font-mono text-[11px] text-[#F5F1E8]/40">{payment.date}</span>
              </div>
            </div>
          </div>
        </div>
      </TravelSheetContent>
    </TravelSheet>
  );
}
