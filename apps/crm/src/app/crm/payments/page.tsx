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
import { Plus } from 'lucide-react';
import {
  TravelTable,
  TravelTableToolbar,
  TravelTablePagination,
  TravelTableFacetedFilter,
  TravelTableBulkBar,
  TravelTableRowActions,
  TableDensity,
  PaymentQuickSheet,
  PaymentData,
  PaymentLinkModal,
} from '@/components/crm';
import { TravelMetric, TravelBadge } from '@/components/ui/travel';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { useTableUrlState } from '@/hooks/useTableUrlState';
import { exportToCsv } from '@/lib/utils';

const PAYMENTS: PaymentData[] = [
  {
    id: 'pay-1',
    customer: 'Edip Mangtay',
    trip: 'Travia Dubai — Premium Couple',
    amount: 5000,
    method: 'Banka Havalesi (EFT)',
    status: 'received',
    date: '27 Ağu 2026 14:00',
    ref: 'TRV-2026-0812',
  },
  {
    id: 'pay-2',
    customer: 'Edip Mangtay',
    trip: 'Travia Dubai — Premium Couple',
    amount: 13500,
    method: 'Kredi Kartı / Otel',
    status: 'pending',
    date: '12 Eyl 2026',
    ref: 'TRV-2026-0813',
  },
  {
    id: 'pay-3',
    customer: 'Kerem Aydın',
    trip: 'Dubai Luxury Family',
    amount: 42000,
    method: 'Stripe Kredi Kartı',
    status: 'received',
    date: '25 Ağu 2026 11:20',
    ref: 'TRV-2026-0798',
  },
  {
    id: 'pay-4',
    customer: 'Selin Arslan',
    trip: 'VIP Solo Retreat',
    amount: 10800,
    method: 'Banka Havalesi',
    status: 'received',
    date: '24 Ağu 2026 16:45',
    ref: 'TRV-2026-0785',
  },
  {
    id: 'pay-5',
    customer: 'Selin Arslan',
    trip: 'VIP Solo Retreat',
    amount: 4200,
    method: 'Nakit / Havalimanı',
    status: 'pending',
    date: '18 Eyl 2026',
    ref: 'TRV-2026-0786',
  },
  {
    id: 'pay-6',
    customer: 'Zeynep Koç',
    trip: 'Solo Shopping & Dubai Mall',
    amount: 3500,
    method: 'Kredi Kartı',
    status: 'refunded',
    date: '23 Ağu 2026 10:15',
    ref: 'TRV-2026-0770',
  },
];

const PAYMENT_STATUS_MAP: Record<string, { label: string; variant: 'success' | 'warning' | 'error' | 'neutral' }> = {
  received: { label: 'Tahsil Edildi', variant: 'success' },
  pending: { label: 'Bekliyor', variant: 'warning' },
  refunded: { label: 'İade Edildi', variant: 'error' },
  cancelled: { label: 'İptal', variant: 'neutral' },
};

const STATUS_OPTIONS = [
  { label: 'Tahsil Edildi', value: 'received' },
  { label: 'Bekliyor', value: 'pending' },
  { label: 'İade Edildi', value: 'refunded' },
  { label: 'İptal', value: 'cancelled' },
];

const COLUMN_LABELS: Record<string, string> = {
  ref: 'İşlem Referansı',
  customer_trip: 'Misafir / Paket',
  method: 'Ödeme Yöntemi',
  date: 'İşlem Tarihi',
  amount: 'Tutar',
  status: 'Tahsilat Durumu',
};

function PaymentsContent() {
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
  const [selectedPayment, setSelectedPayment] = React.useState<PaymentData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = React.useState(false);

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

  const handleInspect = React.useCallback((payment: PaymentData) => {
    setSelectedPayment(payment);
    setIsSheetOpen(true);
  }, []);

  const columns = React.useMemo<ColumnDef<PaymentData>[]>(
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
            aria-label={`Ödeme seç: ${row.original.ref}`}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'ref',
        id: 'ref',
        header: 'İşlem Referansı',
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-[#C9A66B]">
            {row.original.ref}
          </span>
        ),
      },
      {
        accessorKey: 'customer_trip',
        id: 'customer_trip',
        header: 'Misafir / Paket',
        accessorFn: (row) => `${row.customer} ${row.trip}`,
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="py-0.5 min-w-[180px]">
              <p className="text-xs font-semibold text-[#F5F1E8] group-hover:text-[#E8C77A] transition-colors truncate">
                {p.customer}
              </p>
              <p className="text-[10px] text-[#F5F1E8]/35 truncate max-w-[200px]">{p.trip}</p>
            </div>
          );
        },
      },
      {
        accessorKey: 'method',
        id: 'method',
        header: 'Ödeme Yöntemi',
        cell: ({ row }) => (
          <span className="text-xs text-[#F5F1E8]/60 truncate block max-w-[140px]">
            {row.original.method}
          </span>
        ),
      },
      {
        accessorKey: 'date',
        id: 'date',
        header: 'İşlem Tarihi',
        cell: ({ row }) => (
          <span className="font-mono text-[11px] text-[#F5F1E8]/50 whitespace-nowrap">
            {row.original.date}
          </span>
        ),
      },
      {
        accessorKey: 'amount',
        id: 'amount',
        header: 'Tutar',
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-[#F5F1E8] tabular-nums">
            {formatMoney(row.original.amount)}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        id: 'status',
        header: 'Tahsilat Durumu',
        cell: ({ row }) => {
          const stg = PAYMENT_STATUS_MAP[row.original.status] || { label: row.original.status, variant: 'neutral' as const };
          return (
            <TravelBadge variant={stg.variant} size="sm" className="text-[10px]">
              {stg.label}
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
            onCopyId={() => navigator.clipboard.writeText(row.original.ref)}
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
    data: PAYMENTS,
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

  // Truthful derived metrics from actual dataset
  const totalVolume = React.useMemo(
    () => PAYMENTS.reduce((s, p) => s + p.amount, 0),
    []
  );
  const receivedVolume = React.useMemo(
    () => PAYMENTS.filter((p) => p.status === 'received').reduce((s, p) => s + p.amount, 0),
    []
  );
  const pendingVolume = React.useMemo(
    () => PAYMENTS.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0),
    []
  );

  const handleExportCsv = () => {
    exportToCsv('travia_payments', PAYMENTS, [
      { header: 'Referans', key: 'ref' },
      { header: 'Müşteri', key: 'customer' },
      { header: 'Paket / Gezi', key: 'trip' },
      { header: 'Ödeme Yöntemi', key: 'method' },
      { header: 'Tarih', key: 'date' },
      { header: 'Tutar', key: 'amount' },
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
              Ödemeler & Finans Defteri
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#101524] border border-[rgba(201,166,107,0.15)] text-[#C9A66B]">
              {PAYMENTS.length} İşlem
            </span>
          </div>
          <p className="text-xs text-[#F5F1E8]/40 mt-0.5">
            Gelir tahsilatları, bekleyen bakiyeler ve acente ödeme akışları
          </p>
        </div>
      </div>

      {/* Truthful Summary KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <TravelMetric
          title="Toplam İşlem Hacmi"
          value={formatMoney(totalVolume)}
        />
        <TravelMetric
          title="Tahsil Edilen Tutar"
          value={formatMoney(receivedVolume)}
          trend="up"
          deltaLabel={`${PAYMENTS.filter((p) => p.status === 'received').length} işlem tamamlandı`}
        />
        <TravelMetric
          title="Bekleyen Bakiye"
          value={formatMoney(pendingVolume)}
          trend={pendingVolume > 0 ? 'down' : 'neutral'}
          deltaLabel={`${PAYMENTS.filter((p) => p.status === 'pending').length} tahsilat bekleniyor`}
        />
      </div>

      {/* Toolbar */}
      <TravelTableToolbar
        table={table}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Referans veya misafir ara..."
        columnLabels={COLUMN_LABELS}
        density={density}
        onDensityChange={setDensity}
        onExportCsv={handleExportCsv}
        exportLabel="Finans Raporu (CSV)"
        primaryAction={{
          label: 'Ödeme Linki Üret',
          onClick: () => setIsLinkModalOpen(false || true),
          icon: Plus,
        }}
      >
        {table.getColumn('status') && (
          <TravelTableFacetedFilter
            column={table.getColumn('status')}
            title="Tahsilat Durumu"
            options={STATUS_OPTIONS}
          />
        )}
      </TravelTableToolbar>

      {/* Table */}
      <TravelTable
        tableInstance={table}
        columns={columns}
        data={PAYMENTS}
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

      {/* Bulk Bar */}
      <TravelTableBulkBar
        selectedCount={selectedCount}
        onClearSelection={() => setRowSelection({})}
        onExportSelected={handleExportCsv}
      />

      {/* Quick Sheet */}
      <PaymentQuickSheet
        payment={selectedPayment}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />

      {/* Preserved Payment Link Generator Modal */}
      <PaymentLinkModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        customerName="Edip Mangtay"
        amount={13500}
        description="Kalan Bakiye Tahsilatı — Travia Dubai Premium Couple"
      />
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-xs font-mono text-[#F5F1E8]/40">Yükleniyor...</div>}>
      <PaymentsContent />
    </React.Suspense>
  );
}
