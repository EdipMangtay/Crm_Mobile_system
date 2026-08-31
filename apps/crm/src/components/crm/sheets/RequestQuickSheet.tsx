'use client';

import * as React from 'react';
import { Calendar, Clock, Check } from 'lucide-react';
import {
  TravelSheetRoot as TravelSheet,
  TravelSheetContent,
  TravelSheetHeader,
  TravelSheetTitle,
  TravelBadge,
  TravelButton,
} from '@/components/ui/travel';

export interface RequestData {
  id: string;
  customer: string;
  category: string;
  title: string;
  time: string;
  pax: number;
  notes: string;
  status: 'confirmed' | 'reviewing' | 'received';
  created_at: string;
}

interface RequestQuickSheetProps {
  request: RequestData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove?: (id: string) => void;
}

export function RequestQuickSheet({
  request,
  open,
  onOpenChange,
  onApprove,
}: RequestQuickSheetProps) {
  if (!request) return null;

  return (
    <TravelSheet open={open} onOpenChange={onOpenChange}>
      <TravelSheetContent
        side="right"
        className="w-full sm:max-w-md bg-[#0B0F1A] border-l border-[rgba(201,166,107,0.15)] p-0 flex flex-col overflow-y-auto select-none"
      >
        <TravelSheetHeader className="p-6 border-b border-[rgba(201,166,107,0.10)] bg-[#101524]/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <TravelBadge variant="gold" size="sm" className="mb-1 text-[10px]">
                {request.category}
              </TravelBadge>
              <TravelSheetTitle className="text-base font-semibold text-[#F5F1E8]">
                {request.title}
              </TravelSheetTitle>
            </div>
            <TravelBadge
              variant={request.status === 'confirmed' ? 'success' : request.status === 'reviewing' ? 'warning' : 'info'}
              size="sm"
            >
              {request.status === 'confirmed' ? 'Onaylandı' : request.status === 'reviewing' ? 'İnceleniyor' : 'Yeni Talep'}
            </TravelBadge>
          </div>
        </TravelSheetHeader>

        <div className="p-6 space-y-6 flex-1">
          {/* Guest Info */}
          <div className="p-4 rounded-xl bg-[#101524] border border-[rgba(201,166,107,0.12)] flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono text-[#F5F1E8]/40 uppercase block">Misafir</span>
              <p className="text-sm font-semibold text-[#F5F1E8] mt-0.5">{request.customer}</p>
            </div>
            <span className="font-mono text-xs text-[#C9A66B] px-2 py-0.5 rounded bg-[#101524] border border-[rgba(201,166,107,0.15)]">
              {request.pax} PAX
            </span>
          </div>

          {/* Time and Submission Date */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)]">
              <span className="text-[10px] text-[#F5F1E8]/40 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3 text-[#C9A66B]" />
                İstenen Zaman
              </span>
              <p className="font-mono text-xs font-semibold text-[#F5F1E8] mt-1">{request.time}</p>
            </div>
            <div className="p-3 rounded-lg bg-[#101524]/50 border border-[rgba(201,166,107,0.08)]">
              <span className="text-[10px] text-[#F5F1E8]/40 flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3 text-[#C9A66B]" />
                Kayıt Tarihi
              </span>
              <p className="font-mono text-xs text-[#F5F1E8]/60 mt-1">{request.created_at}</p>
            </div>
          </div>

          {/* Guest Notes */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono">
              Misafir Talebi & Notlar
            </h4>
            <div className="p-4 rounded-lg bg-[#101524]/70 border border-[rgba(201,166,107,0.10)] text-xs text-[#F5F1E8]/90 italic leading-relaxed">
              &quot;{request.notes}&quot;
            </div>
          </div>
        </div>

        {/* Action Button */}
        {request.status !== 'confirmed' && onApprove && (
          <div className="p-6 border-t border-[rgba(201,166,107,0.10)] bg-[#101524]/40">
            <TravelButton
              variant="primary"
              onClick={() => {
                onApprove(request.id);
                onOpenChange(false);
              }}
              className="w-full justify-center text-xs gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Talebi Onayla</span>
            </TravelButton>
          </div>
        )}
      </TravelSheetContent>
    </TravelSheet>
  );
}
