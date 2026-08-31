'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
  Table as TanstackTable,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TravelSkeleton } from '@/components/ui/travel';
import { TravelTableEmptyState } from './TravelTableEmptyState';
import { TableDensity } from './TravelTableDensityToggle';

export interface TravelTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  density?: TableDensity;
  isLoading?: boolean;
  onRowClick?: (row: TData) => void;
  emptyState?: React.ReactNode;
  isFiltered?: boolean;
  onResetFilters?: () => void;
  className?: string;
  tableInstance?: TanstackTable<TData>;
  // State bindings if managed outside
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState | ((prev: SortingState) => SortingState)) => void;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: (filters: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)) => void;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: (visibility: VisibilityState | ((prev: VisibilityState) => VisibilityState)) => void;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (selection: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
  globalFilter?: string;
  onGlobalFilterChange?: (filter: string) => void;
  pageSize?: number;
}

export function TravelTable<TData, TValue>({
  columns,
  data,
  density = 'default',
  isLoading = false,
  onRowClick,
  emptyState,
  isFiltered = false,
  onResetFilters,
  className,
  tableInstance,
  sorting: externalSorting,
  onSortingChange: externalOnSortingChange,
  columnFilters: externalColumnFilters,
  onColumnFiltersChange: externalOnColumnFiltersChange,
  columnVisibility: externalColumnVisibility,
  onColumnVisibilityChange: externalOnColumnVisibilityChange,
  rowSelection: externalRowSelection,
  onRowSelectionChange: externalOnRowSelectionChange,
  globalFilter: externalGlobalFilter,
  onGlobalFilterChange: externalOnGlobalFilterChange,
  pageSize = 20,
}: TravelTableProps<TData, TValue>) {
  // Internal fallback states
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([]);
  const [internalColumnFilters, setInternalColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [internalColumnVisibility, setInternalColumnVisibility] = React.useState<VisibilityState>({});
  const [internalRowSelection, setInternalRowSelection] = React.useState<RowSelectionState>({});
  const [internalGlobalFilter, setInternalGlobalFilter] = React.useState<string>('');

  const sorting = externalSorting !== undefined ? externalSorting : internalSorting;
  const setSorting = externalOnSortingChange || setInternalSorting;

  const columnFilters = externalColumnFilters !== undefined ? externalColumnFilters : internalColumnFilters;
  const setColumnFilters = externalOnColumnFiltersChange || setInternalColumnFilters;

  const columnVisibility = externalColumnVisibility !== undefined ? externalColumnVisibility : internalColumnVisibility;
  const setColumnVisibility = externalOnColumnVisibilityChange || setInternalColumnVisibility;

  const rowSelection = externalRowSelection !== undefined ? externalRowSelection : internalRowSelection;
  const setRowSelection = externalOnRowSelectionChange || setInternalRowSelection;

  const globalFilter = externalGlobalFilter !== undefined ? externalGlobalFilter : internalGlobalFilter;
  const setGlobalFilter = externalOnGlobalFilterChange || setInternalGlobalFilter;

  // Build Tanstack Table instance if not provided from parent
  const internalTable = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const table = tableInstance || internalTable;

  const rowHeightClass =
    density === 'compact' ? 'h-9 py-1 px-3 text-xs' : 'h-12 py-2 px-3.5 text-xs';

  return (
    <div
      className={cn(
        'w-full bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)] rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)]',
        className
      )}
    >
      <div className="overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[rgba(201,166,107,0.15)]">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead className="bg-[#0e1322] border-b border-[rgba(201,166,107,0.14)] sticky top-0 z-10 select-none">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="h-9">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const isSorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        'px-3.5 text-[10px] font-mono uppercase tracking-[0.14em] text-[#F5F1E8]/40 font-medium whitespace-nowrap align-middle',
                        header.column.id === 'select' && 'w-9 px-3',
                        header.column.id === 'actions' && 'w-10 px-2 text-right'
                      )}
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="flex items-center gap-1.5 hover:text-[#E8C77A] transition-colors group focus:outline-none"
                          aria-label={`Sırala: ${typeof header.column.columnDef.header === 'string' ? header.column.columnDef.header : header.id}`}
                        >
                          <span>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                          {isSorted === 'asc' ? (
                            <ArrowUp className="w-3 h-3 text-[#C9A66B]" />
                          ) : isSorted === 'desc' ? (
                            <ArrowDown className="w-3 h-3 text-[#C9A66B]" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 text-[#F5F1E8]/20 group-hover:text-[#F5F1E8]/50 transition-colors" />
                          )}
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[rgba(201,166,107,0.06)]">
            {isLoading ? (
              // Loading Skeleton Rows
              Array.from({ length: 6 }).map((_, rowIndex) => (
                <tr key={rowIndex} className={cn(density === 'compact' ? 'h-9' : 'h-12')}>
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className="px-3.5">
                      <TravelSkeleton
                        className={cn(
                          'h-4 rounded bg-[#101524]',
                          colIndex === 0 ? 'w-24' : colIndex === 1 ? 'w-36' : 'w-20'
                        )}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows?.length ? (
              // Populated Rows
              table.getRowModel().rows.map((row) => {
                const isSelected = row.getIsSelected();

                return (
                  <tr
                    key={row.id}
                    data-state={isSelected ? 'selected' : undefined}
                    onClick={() => onRowClick?.(row.original)}
                    className={cn(
                      'group transition-colors',
                      isSelected
                        ? 'bg-[rgba(201,166,107,0.08)]'
                        : 'hover:bg-[rgba(245,241,232,0.025)]',
                      onRowClick && 'cursor-pointer'
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={cn(
                          rowHeightClass,
                          'text-[#F5F1E8]/80 align-middle',
                          cell.column.id === 'select' && 'w-9 px-3',
                          cell.column.id === 'actions' && 'w-10 px-2 text-right'
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              // Empty State
              <tr>
                <td colSpan={columns.length} className="py-8">
                  {emptyState || (
                    <TravelTableEmptyState
                      isFiltered={isFiltered}
                      onResetFilters={onResetFilters}
                    />
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
