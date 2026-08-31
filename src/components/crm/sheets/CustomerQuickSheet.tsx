'use client';

import * as React from 'react';
import Link from 'next/link';
import { Mail, Phone, ExternalLink } from 'lucide-react';
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

export interface CustomerData {
  id: string;
  first_name: string;
  last_name: string;
  country: string;
  tags: string[];
  email: string;
  phone: string;
  lifetime_value: number;
  status: string;
  trips?: number;
}

interface CustomerQuickSheetProps {
  customer: CustomerData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomerQuickSheet({
  customer,
  open,
  onOpenChange,
}: CustomerQuickSheetProps) {
  const { formatMoney } = useTenant();
  if (!customer) return null;

  return (
    <TravelSheet open={open} onOpenChange={onOpenChange}>
      <TravelSheetContent
        side="right"
        className="w-full sm:max-w-md bg-[#0B0F1A] border-l border-[rgba(201,166,107,0.15)] p-0 flex flex-col overflow-y-auto select-none"
      >
        {/* Header with Avatar & Status */}
        <TravelSheetHeader className="p-6 border-b border-[rgba(201,166,107,0.10)] bg-[#101524]/60">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A66B]/20 to-[#C9A66B]/5 border border-[#C9A66B]/25 flex items-center justify-center text-base font-bold text-[#E8C77A] shrink-0 font-serif">
                {customer.first_name[0]}
                {customer.last_name[0]}
              </div>
              <div>
                <TravelSheetTitle className="text-base font-semibold text-[#F5F1E8]">
                  {customer.first_name} {customer.last_name}
                </TravelSheetTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm">{COUNTRY_FLAGS[customer.country] || '🌍'}</span>
                  <span className="text-xs text-[#F5F1E8]/40 font-mono uppercase">{customer.country}</span>
                </div>
              </div>
            </div>
            <TravelBadge variant={customer.status === 'active' ? 'success' : 'neutral'} size="sm">
              {customer.status === 'active' ? 'Aktif Müşteri' : customer.status}
            </TravelBadge>
          </div>

          {/* Tags */}
          {customer.tags && customer.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {customer.tags.map((tag) => (
                <TravelBadge
                  key={tag}
                  variant={tag === 'VIP' ? 'gold' : 'neutral'}
                  size="sm"
                  className="text-[11px]"
                >
                  {tag}
                </TravelBadge>
              ))}
            </div>
          )}
        </TravelSheetHeader>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Lifetime Value Metric */}
          <div className="p-4 rounded-xl bg-[#101524] border border-[rgba(201,166,107,0.12)]">
            <p className="text-[10px] font-mono text-[#F5F1E8]/40 uppercase tracking-wider">
              Toplam Harcama (LTV)
            </p>
            <p className="text-2xl font-semibold text-[#E8C77A] font-mono mt-1">
              {formatMoney(customer.lifetime_value)}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono">
              İletişim Bilgileri
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`mailto:${customer.email}`}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)] hover:border-[rgba(201,166,107,0.25)] text-[#F5F1E8]/80 hover:text-[#F5F1E8] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <span className="font-mono text-[11px] truncate">{customer.email}</span>
              </a>
              <a
                href={`tel:${customer.phone}`}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)] hover:border-[rgba(201,166,107,0.25)] text-[#F5F1E8]/80 hover:text-[#F5F1E8] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <span className="font-mono text-[11px]">{customer.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[rgba(201,166,107,0.10)] bg-[#101524]/40">
          <Link href={`/crm/customers/${customer.id}`} className="block w-full">
            <TravelButton variant="primary" className="w-full justify-center text-xs gap-2">
              <span>Tam 360 Müşteri Profilini Aç</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </TravelButton>
          </Link>
        </div>
      </TravelSheetContent>
    </TravelSheet>
  );
}
