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
  BookingQuickSheet,
  BookingData,
} from '@/components/crm';
import { TravelBadge } from '@/components/ui/travel';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { useTableUrlState } from '@/hooks/useTableUrlState';
import { exportToCsv } from '@/lib/utils';
import { BOOKING_TYPE_LABELS } from '@/types';

const DEMO_BOOKINGS: BookingData[] = [
  {
    id: '1',
    title: 'VIP Airport Chauffeur Transfer',
    customer: 'Edip Mangtay',
    trip: 'Travia Dubai',
    type: 'transfer',
    date: '12 Eyl 2026',
    time: '10:30',
    supplier: 'Al Futtaim Motors',
    cost: 450,
    price: 850,
    margin: 400,
    status: 'confirmed',
  },
  {
    id: '2',
    title: 'Private Superyacht Sunset Cruise',
    customer: 'Edip Mangtay',
    trip: 'Travia Dubai',
    type: 'yacht',
    date: '13 Eyl 2026',
    time: '14:00',
    supplier: 'Marina Yachts LLC',
    cost: 4200,
    price: 6800,
    margin: 2600,
    status: 'confirmed',
  },
  {
    id: '3',
    title: 'Nobu Dubai Gourmet Dinner',
    customer: 'Edip Mangtay',
    trip: 'Travia Dubai',
    type: 'restaurant',
    date: '13 Eyl 2026',
    time: '20:30',
    supplier: 'Atlantis The Palm',
    cost: 1800,
    price: 2800,
    margin: 1000,
    status: 'confirmed',
  },
  {
    id: '4',
    title: 'VIP Red Dunes Safari & Royal Majlis',
    customer: 'Kerem Aydın',
    trip: 'Luxury Family',
    type: 'desert_safari',
    date: '16 Eyl 2026',
    time: '15:30',
    supplier: 'Desert Royal Safaris',
    cost: 2400,
    price: 4200,
    margin: 1800,
    status: 'confirmed',
  },
  {
    id: '5',
    title: 'Helicopter 25m Skyline Tour',
    customer: 'Selin Arslan',
    trip: 'VIP Solo Retreat',
    type: 'helicopter',
    date: '19 Eyl 2026',
    time: '11:00',
    supplier: 'HeliDubai',
    cost: 2100,
    price: 3600,
    margin: 1500,
    status: 'pending',
  },
];

const TYPE_OPTIONS = [
  { label: 'VIP Transfer', value: 'transfer' },
  { label: 'Süperyat & Deniz', value: 'yacht' },
  { label: 'Restoran & Masa', value: 'restaurant' },
  { label: 'Çöl Safarisi', value: 'desert_safari' },
  { label: 'Helikopter & Havacılık', value: 'helicopter' },
];

const STATUS_OPTIONS = [
  { label: 'Onaylı', value: 'confirmed' },
  { label: 'Bekliyor', value: 'pending' },
  { label: 'İptal', value: 'cancelled' },
];

const COLUMN_LABELS: Record<string, string> = {
  service: 'Hizmet / Kalem',
  customer_trip: 'Misafir / Gezi',
  type: 'Kategori Türü',
  datetime: 'Tarih & Saat',
  supplier: 'Tedarikçi',
  cost: 'Net Maliyet',
  price: 'Satış Fiyatı',
  margin: 'Brüt Kâr (Marj)',
  status: 'Durum',
};

function BookingsContent() {
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
  const [selectedBooking, setSelectedBooking] = React.useState<BookingData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  // Sync Type and Status filters with URL
  const initialFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = [];
    const type = searchParams.get('type');
    if (type) filters.push({ id: 'type', value: type.split(',') });
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
      const typeFilter = next.find((f) => f.id === 'type');
      urlUpdates.type = typeFilter && Array.isArray(typeFilter.value) && typeFilter.value.length > 0
        ? (typeFilter.value as string[]).join(',')
        : null;

      const statusFilter = next.find((f) => f.id === 'status');
      urlUpdates.status = statusFilter && Array.isArray(statusFilter.value) && statusFilter.value.length > 0
        ? (statusFilter.value as string[]).join(',')
        : null;

      updateUrl(urlUpdates);
    },
    [columnFilters, updateUrl]
  );

  const handleInspect = React.useCallback((booking: BookingData) => {
    setSelectedBooking(booking);
    setIsSheetOpen(true);
  }, []);

  const columns = React.useMemo<ColumnDef<BookingData>[]>(
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
            aria-label={`Rezervasyon seç: ${row.original.title}`}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'service',
        id: 'service',
        header: 'Hizmet / Kalem',
        accessorFn: (row) => `${row.title} #${row.id}`,
        cell: ({ row }) => {
          const b = row.original;
          return (
            <div className="py-0.5 min-w-[200px]">
              <p className="text-xs font-semibold text-[#F5F1E8] group-hover:text-[#E8C77A] transition-colors truncate">
                {b.title}
              </p>
              <p className="text-[10px] text-[#C9A66B] font-mono mt-0.5">
                ID: #{b.id.padStart(4, '0')}
              </p>
            </div>
          );
        },
      },
      {
        accessorKey: 'customer_trip',
        id: 'customer_trip',
        header: 'Misafir / Gezi',
        accessorFn: (row) => `${row.customer} ${row.trip}`,
        cell: ({ row }) => (
          <div className="text-xs">
            <p className="text-[#F5F1E8] font-medium">{row.original.customer}</p>
            <p className="text-[10px] text-[#F5F1E8]/35 truncate max-w-[150px]">{row.original.trip}</p>
          </div>
        ),
      },
      {
        accessorKey: 'type',
        id: 'type',
        header: 'Tür',
        cell: ({ row }) => (
          <TravelBadge variant="gold" size="sm" className="text-[10px]">
            {BOOKING_TYPE_LABELS[row.original.type] || row.original.type}
          </TravelBadge>
        ),
        filterFn: (row, id, value) => {
          return Array.isArray(value) ? value.includes(row.getValue(id)) : true;
        },
      },
      {
        accessorKey: 'datetime',
        id: 'datetime',
        header: 'Tarih & Saat',
        accessorFn: (row) => `${row.date} ${row.time}`,
        cell: ({ row }) => (
          <div className="text-xs font-mono">
            <p className="text-[#F5F1E8]/70">{row.original.date}</p>
            <p className="text-[#C9A66B] text-[11px] font-semibold">{row.original.time}</p>
          </div>
        ),
      },
      {
        accessorKey: 'supplier',
        id: 'supplier',
        header: 'Tedarikçi',
        cell: ({ row }) => (
          <span className="text-xs text-[#F5F1E8]/60 truncate max-w-[130px] block">
            {row.original.supplier}
          </span>
        ),
      },
      {
        accessorKey: 'cost',
        id: 'cost',
        header: 'Net Maliyet',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-[#F5F1E8]/70 tabular-nums">
            {formatMoney(row.original.cost)}
          </span>
        ),
      },
      {
        accessorKey: 'price',
        id: 'price',
        header: 'Satış',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-[#F5F1E8] font-medium tabular-nums">
            {formatMoney(row.original.price)}
          </span>
        ),
      },
      {
        accessorKey: 'margin',
        id: 'margin',
        header: 'Brüt Kâr',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-[#E8C77A] font-semibold tabular-nums">
            {formatMoney(row.original.margin)}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        id: 'status',
        header: 'Durum',
        cell: ({ row }) => (
          <TravelBadge
            variant={row.original.status === 'confirmed' ? 'success' : 'warning'}
            size="sm"
            className="text-[10px]"
          >
            {row.original.status === 'confirmed' ? 'Onaylı' : 'Bekliyor'}
          </TravelBadge>
        ),
        filterFn: (row, id, value) => {
          return Array.isArray(value) ? value.includes(row.getValue(id)) : true;
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <TravelTableRowActions
            onInspect={() => handleInspect(row.original)}
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
    data: DEMO_BOOKINGS,
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

  const totalMargin = React.useMemo(
    () => DEMO_BOOKINGS.reduce((s, b) => s + b.margin, 0),
    []
  );

  const handleExportCsv = () => {
    exportToCsv('travia_bookings', DEMO_BOOKINGS, [
      { header: 'ID', key: 'id' },
      { header: 'Hizmet', key: 'title' },
      { header: 'Misafir', key: 'customer' },
      { header: 'Gezi', key: 'trip' },
      { header: 'Tür', key: 'type' },
      { header: 'Tarih', key: 'date' },
      { header: 'Saat', key: 'time' },
      { header: 'Tedarikçi', key: 'supplier' },
      { header: 'Maliyet', key: 'cost' },
      { header: 'Satış', key: 'price' },
      { header: 'Kâr', key: 'margin' },
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
              Rezervasyonlar & Operasyon Kalemleri
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#101524] border border-[rgba(201,166,107,0.15)] text-[#C9A66B]">
              {DEMO_BOOKINGS.length} Kalem
            </span>
          </div>
          <p className="text-xs text-[#F5F1E8]/40 mt-0.5">
            Toplam Brüt Marj: <strong className="text-[#E8C77A] font-mono">{formatMoney(totalMargin)}</strong> · Hizmet Sağlayıcı ve Voucher Defteri
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <TravelTableToolbar
        table={table}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Rezervasyon veya tedarikçi ara..."
        columnLabels={COLUMN_LABELS}
        density={density}
        onDensityChange={setDensity}
        onExportCsv={handleExportCsv}
      >
        {table.getColumn('type') && (
          <TravelTableFacetedFilter
            column={table.getColumn('type')}
            title="Hizmet Türü"
            options={TYPE_OPTIONS}
          />
        )}
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
        data={DEMO_BOOKINGS}
        density={density}
        onRowClick={handleInspect}
        isFiltered={table.getState().columnFilters.length > 0 || !!searchQuery}
        onResetFilters={() => {
          table.resetColumnFilters();
          setSearchQuery('');
          updateUrl({ q: null, type: null, status: null, page: '1' });
        }}
      />

      {/* Pagination */}
      <TravelTablePagination table={table} />

      {/* Bulk Bar */}
      <TravelTableBulkBar
        selectedCount={selectedCount}
        onClearSelection={() => setRowSelection({})}
        onExportSelected={handleExportCsv}
      />

      {/* Quick Sheet */}
      <BookingQuickSheet
        booking={selectedBooking}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  );
}

export default function BookingsPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-xs font-mono text-[#F5F1E8]/40">Yükleniyor...</div>}>
      <BookingsContent />
    </React.Suspense>
  );
}
