'use client';

import * as React from 'react';
import { Table as TanstackTable } from '@tanstack/react-table';
import { SlidersHorizontal } from 'lucide-react';
import {
  TravelButton,
  TravelDropdownMenu,
  TravelDropdownMenuTrigger,
  TravelDropdownMenuContent,
  TravelDropdownMenuCheckboxItem,
  TravelDropdownMenuLabel,
  TravelDropdownMenuSeparator,
  TravelTooltip,
} from '@/components/ui/travel';

interface TravelTableColumnToggleProps<TData> {
  table: TanstackTable<TData>;
  columnLabels?: Record<string, string>;
}

export function TravelTableColumnToggle<TData>({
  table,
  columnLabels = {},
}: TravelTableColumnToggleProps<TData>) {
  const columns = table
    .getAllColumns()
    .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide());

  if (columns.length === 0) return null;

  return (
    <TravelDropdownMenu>
      <TravelTooltip content="Görünür Sütunları Ayarla">
        <TravelDropdownMenuTrigger asChild>
          <TravelButton
            variant="ghost"
            size="icon"
            aria-label="Sütun Görünürlüğü"
            className="h-7 w-7 text-[#F5F1E8]/50 hover:text-[#F5F1E8] border border-[rgba(201,166,107,0.12)] bg-[#101524]/60"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </TravelButton>
        </TravelDropdownMenuTrigger>
      </TravelTooltip>
      <TravelDropdownMenuContent align="end" className="w-48 bg-[#0B0F1A] border-[rgba(201,166,107,0.18)]">
        <TravelDropdownMenuLabel className="text-[11px] font-mono uppercase tracking-wider text-[#C9A66B]">
          Sütunları Göster/Gizle
        </TravelDropdownMenuLabel>
        <TravelDropdownMenuSeparator />
        {columns.map((column) => {
          const label = columnLabels[column.id] || column.id;
          return (
            <TravelDropdownMenuCheckboxItem
              key={column.id}
              className="capitalize text-xs text-[#F5F1E8]/80 cursor-pointer"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {label}
            </TravelDropdownMenuCheckboxItem>
          );
        })}
      </TravelDropdownMenuContent>
    </TravelDropdownMenu>
  );
}
