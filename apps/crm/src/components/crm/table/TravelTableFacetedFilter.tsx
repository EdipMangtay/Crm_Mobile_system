'use client';

import * as React from 'react';
import { Column } from '@tanstack/react-table';
import { Check, PlusCircle } from 'lucide-react';
import {
  TravelPopoverRoot,
  TravelPopoverTrigger,
  TravelPopoverContent,
  TravelButton,
  TravelBadge,
} from '@/components/ui/travel';
import { cn } from '@/lib/utils';

export interface FilterOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
}

interface TravelTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: FilterOption[];
}

export function TravelTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: TravelTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <TravelPopoverRoot>
      <TravelPopoverTrigger asChild>
        <TravelButton
          variant="outline"
          size="sm"
          className="h-8 border-dashed border-[rgba(201,166,107,0.20)] text-[#F5F1E8]/70 hover:text-[#F5F1E8] bg-[#101524]/60 text-xs gap-1.5 px-2.5"
        >
          <PlusCircle className="w-3.5 h-3.5 text-[#C9A66B]" />
          <span>{title}</span>
          {selectedValues.size > 0 && (
            <>
              <div className="mx-1 h-3.5 w-px bg-[rgba(201,166,107,0.20)]" />
              <TravelBadge variant="gold" size="sm" className="h-4 px-1 rounded font-mono text-[10px]">
                {selectedValues.size}
              </TravelBadge>
            </>
          )}
        </TravelButton>
      </TravelPopoverTrigger>
      <TravelPopoverContent
        className="w-52 p-1.5 bg-[#0B0F1A] border-[rgba(201,166,107,0.20)] shadow-xl"
        align="start"
      >
        <div className="space-y-1">
          <p className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[#F5F1E8]/40">
            {title} Filtrele
          </p>
          <div className="space-y-0.5">
            {options.map((option) => {
              const isSelected = selectedValues.has(option.value);
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    if (isSelected) {
                      selectedValues.delete(option.value);
                    } else {
                      selectedValues.add(option.value);
                    }
                    const filterValues = Array.from(selectedValues);
                    column?.setFilterValue(filterValues.length ? filterValues : undefined);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs transition-colors text-left select-none',
                    isSelected
                      ? 'bg-[rgba(201,166,107,0.12)] text-[#E8C77A]'
                      : 'text-[#F5F1E8]/70 hover:bg-[rgba(245,241,232,0.04)] hover:text-[#F5F1E8]'
                  )}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={cn(
                        'w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors',
                        isSelected
                          ? 'border-[#C9A66B] bg-[#C9A66B] text-[#05070F]'
                          : 'border-[rgba(201,166,107,0.25)] bg-transparent'
                      )}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    {Icon && <Icon className="w-3.5 h-3.5 text-[#F5F1E8]/50 shrink-0" />}
                    <span className="truncate">{option.label}</span>
                  </div>
                  {facets?.get(option.value) !== undefined ? (
                    <span className="ml-auto font-mono text-[10px] text-[#F5F1E8]/35">
                      {facets.get(option.value)}
                    </span>
                  ) : option.count !== undefined ? (
                    <span className="ml-auto font-mono text-[10px] text-[#F5F1E8]/35">
                      {option.count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
          {selectedValues.size > 0 && (
            <>
              <div className="h-px bg-[rgba(201,166,107,0.10)] my-1" />
              <button
                onClick={() => column?.setFilterValue(undefined)}
                className="w-full text-center py-1 text-[11px] text-[#C9A66B] hover:text-[#E8C77A] font-medium transition-colors"
              >
                Filtreleri Temizle
              </button>
            </>
          )}
        </div>
      </TravelPopoverContent>
    </TravelPopoverRoot>
  );
}
