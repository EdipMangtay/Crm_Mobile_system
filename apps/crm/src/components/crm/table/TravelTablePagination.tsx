'use client';

import * as React from 'react';
import { Table as TanstackTable } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { TravelButton } from '@/components/ui/travel';

interface TravelTablePaginationProps<TData> {
  table: TanstackTable<TData>;
  pageSizeOptions?: number[];
}

export function TravelTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 50, 100],
}: TravelTablePaginationProps<TData>) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const totalCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 py-2.5 border-t border-[rgba(201,166,107,0.10)] bg-[#0B0F1A] text-xs text-[#F5F1E8]/60 select-none">
      {/* Left: Row Selection Stats */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-[11px] text-[#F5F1E8]/40">
          {selectedCount > 0 ? (
            <span className="text-[#C9A66B] font-medium">
              {selectedCount} / {totalCount} satır seçildi
            </span>
          ) : (
            <span>Toplam {totalCount} kayıt</span>
          )}
        </span>
      </div>

      {/* Right: Page Size Selector & Pagination Buttons */}
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#F5F1E8]/40 hidden md:inline">Sayfa Başına:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="h-7 rounded-md bg-[#101524] border border-[rgba(201,166,107,0.14)] text-xs text-[#F5F1E8] px-2 py-0.5 focus:outline-none focus:border-[#C9A66B]/50 font-mono"
            aria-label="Sayfa Başına Gösterilecek Satır Sayısı"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#F5F1E8]/60">
          <span>
            {table.getPageCount() === 0 ? 0 : table.getState().pagination.pageIndex + 1}
          </span>
          <span className="text-[#F5F1E8]/25">/</span>
          <span>{table.getPageCount() === 0 ? 1 : table.getPageCount()}</span>
        </div>

        <div className="flex items-center gap-1">
          <TravelButton
            variant="ghost"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label="İlk Sayfa"
            className="h-7 w-7 text-[#F5F1E8]/50 disabled:opacity-30 hover:text-[#F5F1E8]"
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </TravelButton>
          <TravelButton
            variant="ghost"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Önceki Sayfa"
            className="h-7 w-7 text-[#F5F1E8]/50 disabled:opacity-30 hover:text-[#F5F1E8]"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </TravelButton>
          <TravelButton
            variant="ghost"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Sonraki Sayfa"
            className="h-7 w-7 text-[#F5F1E8]/50 disabled:opacity-30 hover:text-[#F5F1E8]"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </TravelButton>
          <TravelButton
            variant="ghost"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            aria-label="Son Sayfa"
            className="h-7 w-7 text-[#F5F1E8]/50 disabled:opacity-30 hover:text-[#F5F1E8]"
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </TravelButton>
        </div>
      </div>
    </div>
  );
}
