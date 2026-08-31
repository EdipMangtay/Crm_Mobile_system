'use client';

import * as React from 'react';
import {
  ColumnDef,
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
} from '@tanstack/react-table';
import {
  TravelTable,
  TravelTableToolbar,
  TravelTablePagination,
  TravelTableFacetedFilter,
  TravelTableBulkBar,
  TravelTableRowActions,
  TableDensity,
  TripQuickSheet,
  TripData,
} from '@/components/crm';
import { TravelBadge } from '@/components/ui/travel';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { useTableUrlState } from '@/hooks/useTableUrlState';
import { exportToCsv } from '@/lib/utils';
import { COUNTRY_FLAGS } from '@/types';
import { SHARED_TRIPS, SHARED_CUSTOMERS } from '@/shared/data/traviaData';

const TRIPS_DATA: TripData[] = Object.values(SHARED_TRIPS).map((t) => {
  const customer = SHARED_CUSTOMERS.find((c) => c.id === t.customer_id);
  const paid = t.total_amount ? (t.id.endsWith('0002') || t.id.endsWith('0004') ? t.total_amount : Math.round(t.total_amount * 0.35)) : 0;
  return {
    id: t.id,
    title: t.title,
    customer: customer ? `${customer.first_name} ${customer.last_name}` : 'VIP Misafir',
    country: customer?.country || 'TR',
    dates: `${t.start_date} - ${t.end_date}`,
    nights: t.nights,
    pax: t.pax_count,
    hotel: t.hotel_name || t.destination,
    total: t.total_amount || 0,
    paid,
    status: t.status,
  };
});

const STATUS_MAP = {
  upcoming: { label: 'Yaklaşan', variant: 'info' as const },
  active: { label: 'Aktif', variant: 'success' as const },
  completed: { label: 'Tamamlandı', variant: 'neutral' as const },
  cancelled: { label: 'İptal', variant: 'error' as const },
};

const STATUS_OPTIONS = [
  { label: 'Yaklaşan', value: 'upcoming' },
  { label: 'Aktif', value: 'active' },
  { label: 'Tamamlandı', value: 'completed' },
  { label: 'İptal', value: 'cancelled' },
];

const COLUMN_LABELS: Record<string, string> = {
  title: 'Gezi / Misafir',
  hotel: 'Konaklama / Otel',
  dates: 'Tarihler',
  pax: 'Misafir',
  financials: 'Finansal Durum',
  status: 'Durum',
};

function TripsContent() {
  const { formatMoney } = useTenant();
  const {
    searchQuery,
    setSearchQuery,
    pageIndex,
    setPage,
    pageSize,
    setPageSize,
    searchParams,
    updateUrl,
  } = useTableUrlState();

  const [density, setDensity] = React.useState<TableDensity>('default');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [selectedTrip, setSelectedTrip] = React.useState<TripData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  // Sync Status Filter with URL
  const initialFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = [];
    const status = searchParams.get('status');
    if (status) filters.push({ id: 'status', value: status.split(',') });
    return filters;
  }, [searchParams]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(initialFilters);

  React.useEffect(() => {
    setColumnFilters(initialFilters);
  }, [initialFilters]);

  const handleColumnFiltersChange = React.useCallback(
    (updaterOrValue: React.SetStateAction<ColumnFiltersState>) => {
      const next = typeof updaterOrValue === 'function' ? updaterOrValue(columnFilters) : updaterOrValue;
      setColumnFilters(next);

      const urlUpdates: Record<string, string | null> = { page: '1' };
      const statusFilter = next.find((f) => f.id === 'status');
      urlUpdates.status = statusFilter && Array.isArray(statusFilter.value) && statusFilter.value.length > 0
        ? (statusFilter.value as string[]).join(',')
        : null;

      updateUrl(urlUpdates);
    },
    [columnFilters, updateUrl]
  );

  const handleInspect = React.useCallback((trip: TripData) => {
    setSelectedTrip(trip);
    setIsSheetOpen(true);
  }, []);

  const columns = React.useMemo<ColumnDef<TripData>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate' as unknown as boolean)}
            onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
            className="w-3.5 h-3.5 rounded bg-[#101524] border-[rgba(201,166,107,0.30)] text-[#C9A66B] accent-[#C9A66B] cursor-pointer"
            aria-label="Tümünü seç"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={(e) => {
              e.stopPropagation();
              row.toggleSelected(!!e.target.checked);
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-3.5 h-3.5 rounded bg-[#101524] border-[rgba(201,166,107,0.30)] text-[#C9A66B] accent-[#C9A66B] cursor-pointer"
            aria-label={`Gezi seç: ${row.original.title}`}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'title',
        id: 'title',
        header: 'Gezi / Misafir',
        accessorFn: (row) => `${row.title} ${row.customer}`,
        cell: ({ row }) => {
          const t = row.original;
          return (
            <div className="py-0.5 min-w-[200px]">
              <p className="text-xs font-semibold text-[#F5F1E8] group-hover:text-[#E8C77A] transition-colors truncate">
                {t.title}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs">{COUNTRY_FLAGS[t.country]}</span>
                <span className="text-[10px] text-[#F5F1E8]/40 truncate">{t.customer}</span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'hotel',
        id: 'hotel',
        header: 'Konaklama / Otel',
        cell: ({ row }) => (
          <span className="text-xs text-[#F5F1E8]/70 truncate max-w-[180px] block">
            {row.original.hotel}
          </span>
        ),
      },
      {
        accessorKey: 'dates',
        id: 'dates',
        header: 'Tarihler',
        cell: ({ row }) => (
          <div className="text-xs font-mono">
            <p className="text-[#F5F1E8]/80">{row.original.dates}</p>
            <p className="text-[10px] text-[#F5F1E8]/35">{row.original.nights} Gece</p>
          </div>
        ),
      },
      {
        accessorKey: 'pax',
        id: 'pax',
        header: 'Misafir',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-[#F5F1E8]/60 tabular-nums">
            {row.original.pax} PAX
          </span>
        ),
      },
      {
        accessorKey: 'financials',
        id: 'financials',
        header: 'Finansal Durum',
        accessorFn: (row) => `${row.total} ${row.paid}`,
        cell: ({ row }) => {
          const t = row.original;
          const pct = Math.min(100, Math.round((t.paid / t.total) * 100));
          return (
            <div className="w-[140px] space-y-1">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-[#E8C77A] font-semibold">{formatMoney(t.paid)}</span>
                <span className="text-[#F5F1E8]/35">{formatMoney(t.total)}</span>
              </div>
              <div className="h-1 bg-[#101524] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'status',
        id: 'status',
        header: 'Durum',
        cell: ({ row }) => {
          const s = STATUS_MAP[row.original.status] || STATUS_MAP.upcoming;
          return (
            <TravelBadge variant={s.variant} size="sm" className="text-[10px]">
              {s.label}
            </TravelBadge>
          );
        },
        filterFn: (row, id, value) => {
          return Array.isArray(value) ? value.includes(row.getValue(id)) : true;
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <TravelTableRowActions
            onInspect={() => handleInspect(row.original)}
            detailHref={`/crm/trips/${row.original.id}`}
            onCopyId={() => navigator.clipboard.writeText(row.original.id)}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [handleInspect, formatMoney]
  );

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: TRIPS_DATA,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter: searchQuery,
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function' ? updater(pagination) : updater;
      if (next.pageIndex !== pageIndex) {
        setPage(next.pageIndex);
      }
      if (next.pageSize !== pageSize) {
        setPageSize(next.pageSize);
      }
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setSearchQuery,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const totalVolume = React.useMemo(
    () => TRIPS_DATA.reduce((s, t) => s + t.total, 0),
    []
  );

  const handleExportCsv = () => {
    exportToCsv('travia_trips', TRIPS_DATA, [
      { header: 'Gezi Adı', key: 'title' },
      { header: 'Misafir', key: 'customer' },
      { header: 'Tarihler', key: 'dates' },
      { header: 'Gece', key: 'nights' },
      { header: 'PAX', key: 'pax' },
      { header: 'Otel', key: 'hotel' },
      { header: 'Toplam Tutar', key: 'total' },
      { header: 'Tahsil Edilen', key: 'paid' },
      { header: 'Durum', key: 'status' },
    ]);
  };

  const selectedCount = Object.keys(rowSelection).filter((k) => rowSelection[k]).length;

  return (
    <div className="space-y-4 max-w-[1600px] select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-[rgba(201,166,107,0.08)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-[#F5F1E8] tracking-tight">
              Geziler & VIP Programlar
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#101524] border border-[rgba(201,166,107,0.15)] text-[#C9A66B]">
              {TRIPS_DATA.length} Gezi
            </span>
          </div>
          <p className="text-xs text-[#F5F1E8]/40 mt-0.5">
            Toplam Rezervasyon Hacmi: <strong className="text-[#E8C77A] font-mono">{formatMoney(totalVolume)}</strong> · Aktif Seyahat Operasyonları
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <TravelTableToolbar
        table={table}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Gezi veya misafir ara..."
        columnLabels={COLUMN_LABELS}
        density={density}
        onDensityChange={setDensity}
        onExportCsv={handleExportCsv}
      >
        {table.getColumn('status') && (
          <TravelTableFacetedFilter
            column={table.getColumn('status')}
            title="Durum"
            options={STATUS_OPTIONS}
          />
        )}
      </TravelTableToolbar>

      {/* Table */}
      <TravelTable
        tableInstance={table}
        columns={columns}
        data={TRIPS_DATA}
        density={density}
        onRowClick={handleInspect}
        isFiltered={table.getState().columnFilters.length > 0 || !!searchQuery}
        onResetFilters={() => {
          table.resetColumnFilters();
          setSearchQuery('');
          updateUrl({ q: null, status: null, page: '1' });
        }}
      />

      {/* Pagination */}
      <TravelTablePagination table={table} />

      {/* Bulk Action Bar */}
      <TravelTableBulkBar
        selectedCount={selectedCount}
        onClearSelection={() => setRowSelection({})}
        onExportSelected={handleExportCsv}
      />

      {/* Quick Sheet */}
      <TripQuickSheet
        trip={selectedTrip}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  );
}

export default function TripsPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-xs font-mono text-[#F5F1E8]/40">Yükleniyor...</div>}>
      <TripsContent />
    </React.Suspense>
  );
}
