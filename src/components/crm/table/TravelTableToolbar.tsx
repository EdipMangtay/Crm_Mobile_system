'use client';

import * as React from 'react';
import { Table as TanstackTable } from '@tanstack/react-table';
import { X, Download, Plus } from 'lucide-react';
import { TravelButton, TravelTooltip } from '@/components/ui/travel';
import { TravelTableSearch } from './TravelTableSearch';
import { TravelTableColumnToggle } from './TravelTableColumnToggle';
import { TravelTableDensityToggle, TableDensity } from './TravelTableDensityToggle';

interface TravelTableToolbarProps<TData> {
  table: TanstackTable<TData>;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  columnLabels?: Record<string, string>;
  density?: TableDensity;
  onDensityChange?: (density: TableDensity) => void;
  onExportCsv?: () => void;
  exportLabel?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ComponentType<{ className?: string }>;
  };
  children?: React.ReactNode;
}

export function TravelTableToolbar<TData>({
  table,
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Tabloda ara...',
  columnLabels,
  density,
  onDensityChange,
  onExportCsv,
  exportLabel = 'Excel / CSV',
  primaryAction,
  children,
}: TravelTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0 || !!searchQuery;

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 select-none">
      {/* Left: Search & Faceted Filters */}
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {onSearchChange !== undefined && searchQuery !== undefined && (
          <TravelTableSearch
            value={searchQuery}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        )}

        {children}

        {isFiltered && (
          <TravelButton
            variant="ghost"
            size="sm"
            onClick={() => {
              table.resetColumnFilters();
              if (onSearchChange) onSearchChange('');
            }}
            className="h-8 px-2 text-xs text-[#F5F1E8]/40 hover:text-[#F5F1E8]"
          >
            <X className="w-3.5 h-3.5 mr-1" />
            Temizle
          </TravelButton>
        )}
      </div>

      {/* Right: Controls & Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {onExportCsv && (
          <TravelTooltip content="Verileri CSV / Excel Formatında İndir">
            <TravelButton
              variant="outline"
              size="sm"
              onClick={onExportCsv}
              className="h-8 text-xs border-[rgba(201,166,107,0.15)] text-[#F5F1E8]/70 hover:text-[#F5F1E8] bg-[#101524]/60 gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span className="hidden sm:inline">{exportLabel}</span>
            </TravelButton>
          </TravelTooltip>
        )}

        {density && onDensityChange && (
          <TravelTableDensityToggle
            density={density}
            onDensityChange={onDensityChange}
          />
        )}

        <TravelTableColumnToggle table={table} columnLabels={columnLabels} />

        {primaryAction && (
          <TravelButton
            variant="primary"
            size="sm"
            onClick={primaryAction.onClick}
            className="h-8 text-xs font-semibold gap-1.5"
          >
            {primaryAction.icon ? (
              <primaryAction.icon className="w-3.5 h-3.5" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            <span>{primaryAction.label}</span>
          </TravelButton>
        )}
      </div>
    </div>
  );
}
