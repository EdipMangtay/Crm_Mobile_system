'use client';

import * as React from 'react';
import { Phone, Mail } from 'lucide-react';
import {
  TravelSheetRoot as TravelSheet,
  TravelSheetContent,
  TravelSheetHeader,
  TravelSheetTitle,
  TravelBadge,
} from '@/components/ui/travel';

export interface SupplierData {
  id: string;
  name: string;
  category: string;
  contact: string;
  phone: string;
  email: string;
  status: string;
}

interface SupplierQuickSheetProps {
  supplier: SupplierData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SupplierQuickSheet({
  supplier,
  open,
  onOpenChange,
}: SupplierQuickSheetProps) {
  if (!supplier) return null;

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
                Hizmet İş Ortağı
              </p>
              <TravelSheetTitle className="text-base font-semibold text-[#F5F1E8] mt-0.5">
                {supplier.name}
              </TravelSheetTitle>
            </div>
            <TravelBadge variant="gold" size="sm">
              {supplier.category}
            </TravelBadge>
          </div>
        </TravelSheetHeader>

        <div className="p-6 space-y-6 flex-1">
          {/* Contact Person */}
          <div className="p-4 rounded-xl bg-[#101524] border border-[rgba(201,166,107,0.12)]">
            <span className="text-[10px] font-mono text-[#F5F1E8]/40 uppercase tracking-wider block">
              Yetkili Temsilci
            </span>
            <p className="text-sm font-semibold text-[#F5F1E8] mt-1">
              {supplier.contact}
            </p>
          </div>

          {/* Contact Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono">
              Doğrudan İletişim
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${supplier.phone}`}
                className="flex items-center gap-2.5 p-3 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)] hover:border-[rgba(201,166,107,0.25)] text-[#F5F1E8]/80 hover:text-[#F5F1E8] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <span className="font-mono text-[11px]">{supplier.phone}</span>
              </a>
              <a
                href={`mailto:${supplier.email}`}
                className="flex items-center gap-2.5 p-3 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)] hover:border-[rgba(201,166,107,0.25)] text-[#F5F1E8]/80 hover:text-[#F5F1E8] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <span className="font-mono text-[11px] truncate">{supplier.email}</span>
              </a>
            </div>
          </div>
        </div>
      </TravelSheetContent>
    </TravelSheet>
  );
}
