'use client';

import * as React from 'react';
import { SearchX, Inbox } from 'lucide-react';
import { TravelButton } from '@/components/ui/travel';

interface TravelTableEmptyStateProps {
  isFiltered?: boolean;
  onResetFilters?: () => void;
  title?: string;
  description?: string;
}

export function TravelTableEmptyState({
  isFiltered,
  onResetFilters,
  title,
  description,
}: TravelTableEmptyStateProps) {
  if (isFiltered) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center select-none">
        <div className="w-10 h-10 rounded-xl bg-[#101524] border border-[rgba(201,166,107,0.15)] flex items-center justify-center text-[#C9A66B] mb-3">
          <SearchX className="w-5 h-5" />
        </div>
        <p className="text-sm font-medium text-[#F5F1E8]">
          {title || 'Eşleşen Sonuç Bulunamadı'}
        </p>
        <p className="text-xs text-[#F5F1E8]/40 mt-1 max-w-sm">
          {description || 'Arama teriminizi veya uyguladığınız filtreleri değiştirerek tekrar deneyin.'}
        </p>
        {onResetFilters && (
          <TravelButton
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="mt-4 text-xs border-[rgba(201,166,107,0.20)] text-[#C9A66B] hover:text-[#E8C77A]"
          >
            Filtreleri Temizle
          </TravelButton>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center select-none">
      <div className="w-10 h-10 rounded-xl bg-[#101524] border border-[rgba(201,166,107,0.15)] flex items-center justify-center text-[#F5F1E8]/40 mb-3">
        <Inbox className="w-5 h-5" />
      </div>
      <p className="text-sm font-medium text-[#F5F1E8]">{title || 'Henüz Kayıt Yok'}</p>
      <p className="text-xs text-[#F5F1E8]/40 mt-1 max-w-sm">
        {description || 'Bu dizinde listelenecek herhangi bir veri bulunmuyor.'}
      </p>
    </div>
  );
}
