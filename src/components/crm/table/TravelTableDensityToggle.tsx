'use client';

import * as React from 'react';
import { Rows, StretchHorizontal } from 'lucide-react';
import { TravelButton, TravelTooltip } from '@/components/ui/travel';

export type TableDensity = 'default' | 'compact';

interface TravelTableDensityToggleProps {
  density: TableDensity;
  onDensityChange: (density: TableDensity) => void;
}

export function TravelTableDensityToggle({
  density,
  onDensityChange,
}: TravelTableDensityToggleProps) {
  return (
    <TravelTooltip
      content={
        density === 'compact'
          ? 'Görünüm: Kompakt (36px) — Varsayılana Geç'
          : 'Görünüm: Varsayılan (48px) — Kompakta Geç'
      }
    >
      <TravelButton
        variant="ghost"
        size="icon"
        onClick={() => onDensityChange(density === 'compact' ? 'default' : 'compact')}
        aria-label="Tablo Satır Yüksekliğini Değiştir"
        className="h-7 w-7 text-[#F5F1E8]/50 hover:text-[#F5F1E8] border border-[rgba(201,166,107,0.12)] bg-[#101524]/60"
      >
        {density === 'compact' ? (
          <StretchHorizontal className="w-3.5 h-3.5 text-[#C9A66B]" />
        ) : (
          <Rows className="w-3.5 h-3.5" />
        )}
      </TravelButton>
    </TravelTooltip>
  );
}
