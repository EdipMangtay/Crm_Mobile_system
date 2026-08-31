'use client';

import * as React from 'react';
import { X, Download, CheckSquare } from 'lucide-react';
import { TravelButton } from '@/components/ui/travel';

interface TravelTableBulkBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onExportSelected?: () => void;
  children?: React.ReactNode;
}

export function TravelTableBulkBar({
  selectedCount,
  onClearSelection,
  onExportSelected,
  children,
}: TravelTableBulkBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2 rounded-xl bg-[#101524] border border-[rgba(201,166,107,0.30)] shadow-[0_10px_30px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-bottom-2 duration-150">
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 rounded bg-[rgba(201,166,107,0.15)] flex items-center justify-center text-[#C9A66B]">
          <CheckSquare className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-medium text-[#F5F1E8]">
          <strong className="text-[#C9A66B] font-mono">{selectedCount}</strong> kayıt seçildi
        </span>
      </div>

      <div className="flex items-center gap-2">
        {onExportSelected && (
          <TravelButton
            variant="outline"
            size="sm"
            onClick={onExportSelected}
            className="text-xs h-7 border-[rgba(201,166,107,0.20)] text-[#F5F1E8]/80 hover:text-[#F5F1E8]"
          >
            <Download className="w-3 h-3 mr-1 text-[#C9A66B]" />
            Seçilenleri Dışa Aktar
          </TravelButton>
        )}

        {children}

        <div className="h-3.5 w-px bg-[rgba(201,166,107,0.20)] mx-1" />

        <button
          onClick={onClearSelection}
          className="text-[11px] text-[#F5F1E8]/40 hover:text-[#F5F1E8] flex items-center gap-1 transition-colors px-1.5 py-1 rounded"
        >
          <X className="w-3 h-3" />
          Seçimi Temizle
        </button>
      </div>
    </div>
  );
}
