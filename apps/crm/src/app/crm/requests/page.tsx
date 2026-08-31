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
import { Check } from 'lucide-react';
import {
  TravelTable,
  TravelTableToolbar,
  TravelTablePagination,
  TravelTableFacetedFilter,
  TravelTableBulkBar,
  TravelTableRowActions,
  TableDensity,
  RequestQuickSheet,
  RequestData,
} from '@/components/crm';
import { TravelBadge, TravelButton } from '@/components/ui/travel';
import { useTableUrlState } from '@/hooks/useTableUrlState';
import { exportToCsv } from '@/lib/utils';

const INITIAL_REQUESTS: RequestData[] = [
  {
    id: '1',
    customer: 'Edip Mangtay',
    category: 'Restoran',
    title: 'Nobu Dubai Akşam Yemeği Rezervasyonu',
    time: '13 Eyl 20:30',
    pax: 2,
    notes: 'Yıldönümü kutlaması için sessiz köşe masa ricası.',
    status: 'confirmed',
    created_at: '27 Ağu 17:15',
  },
  {
    id: '2',
    customer: 'Edip Mangtay',
    category: 'Aktivite',
    title: 'Helikopter Şehir Turu Ekleme',
    time: '14 Eyl 11:00',
    pax: 2,
    notes: '22 Dakikalık Palm rotası, hava durumuna göre planlanması.',
    status: 'reviewing',
    created_at: '27 Ağu 18:00',
  },
  {
    id: '3',
    customer: 'Selin Arslan',
    category: 'Transfer',
    title: 'Havalimanı Dönüş Transferi Saati Değişikliği',
    time: '23 Eyl 15:30',
    pax: 1,
    notes: 'Uçuş saati 2 saat ertelendi, transferin 17:30 yapılması ricası.',
    status: 'received',
    created_at: '27 Ağu 18:40',
  },
  {
    id: '4',
    customer: 'Kerem Aydın',
    category: 'Çöl Safarisi',
    title: 'Çocuk Menüsü ve Özel Sandboarding Talebi',
    time: '16 Eyl 16:00',
    pax: 4,
    notes: '2 çocuk için kasksız kum kayağı ve mini buggy aracı.',
    status: 'received',
    created_at: '27 Ağu 19:10',
  },
];

const CATEGORY_OPTIONS = [
  { label: 'Restoran', value: 'Restoran' },
  { label: 'Aktivite', value: 'Aktivite' },
  { label: 'Transfer', value: 'Transfer' },
  { label: 'Çöl Safarisi', value: 'Çöl Safarisi' },
];

const STATUS_OPTIONS = [
  { label: 'Onaylandı', value: 'confirmed' },
  { label: 'İnceleniyor', value: 'reviewing' },
  { label: 'Yeni Talep', value: 'received' },
];

const COLUMN_LABELS: Record<string, string> = {
  customer_pax: 'Misafir & PAX',
  title: 'Talep & Kategori',
  time: 'İstenen Zaman',
  created_at: 'Kayıt Tarihi',
  notes: 'Misafir Notu',
  status: 'Durum',
};

function RequestsContent() {
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

  const [requests, setRequests] = React.useState<RequestData[]>(INITIAL_REQUESTS);
  const [density, setDensity] = React.useState<TableDensity>('default');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [selectedRequest, setSelectedRequest] = React.useState<RequestData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  // Sync Category & Status Filters with URL
  const initialFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = [];
    const category = searchParams.get('category');
    if (category) filters.push({ id: 'category', value: category.split(',') });
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
      const categoryFilter = next.find((f) => f.id === 'category');
      urlUpdates.category = categoryFilter && Array.isArray(categoryFilter.value) && categoryFilter.value.length > 0
        ? (categoryFilter.value as string[]).join(',')
        : null;

      const statusFilter = next.find((f) => f.id === 'status');
      urlUpdates.status = statusFilter && Array.isArray(statusFilter.value) && statusFilter.value.length > 0
        ? (statusFilter.value as string[]).join(',')
        : null;

      updateUrl(urlUpdates);
    },
    [columnFilters, updateUrl]
  );

  const handleApprove = React.useCallback((id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'confirmed' as const } : r))
    );
  }, []);

  const handleInspect = React.useCallback((req: RequestData) => {
    setSelectedRequest(req);
    setIsSheetOpen(true);
  }, []);

  const columns = React.useMemo<ColumnDef<RequestData>[]>(
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
            aria-label={`Talep seç: ${row.original.title}`}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'customer_pax',
        id: 'customer_pax',
        header: 'Misafir & PAX',
        accessorFn: (row) => `${row.customer} ${row.pax}`,
        cell: ({ row }) => {
          const r = row.original;
          return (
            <div className="py-0.5 min-w-[140px]">
              <p className="text-xs font-semibold text-[#F5F1E8] group-hover:text-[#E8C77A] transition-colors truncate">
                {r.customer}
              </p>
              <p className="text-[10px] text-[#C9A66B] font-mono">{r.pax} Kişi</p>
            </div>
          );
        },
      },
      {
        accessorKey: 'title',
        id: 'title',
        header: 'Talep & Kategori',
        accessorFn: (row) => `${row.title} ${row.category}`,
        cell: ({ row }) => {
          const r = row.original;
          return (
            <div className="min-w-[220px]">
              <div className="flex items-center gap-1.5 mb-0.5">
                <TravelBadge variant="gold" size="sm" className="text-[9px] py-0 h-3.5 px-1 font-mono">
                  {r.category}
                </TravelBadge>
              </div>
              <p className="text-xs font-medium text-[#F5F1E8]/90 truncate">{r.title}</p>
            </div>
          );
        },
      },
      {
        accessorKey: 'time',
        id: 'time',
        header: 'İstenen Zaman',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-[#F5F1E8]/70 whitespace-nowrap">
            {row.original.time}
          </span>
        ),
      },
      {
        accessorKey: 'created_at',
        id: 'created_at',
        header: 'Kayıt Tarihi',
        cell: ({ row }) => (
          <span className="font-mono text-[11px] text-[#F5F1E8]/40 whitespace-nowrap">
            {row.original.created_at}
          </span>
        ),
      },
      {
        accessorKey: 'notes',
        id: 'notes',
        header: 'Misafir Notu',
        cell: ({ row }) => (
          <p className="text-xs text-[#F5F1E8]/50 truncate max-w-[240px] italic">
            &quot;{row.original.notes}&quot;
          </p>
        ),
      },
      {
        accessorKey: 'status',
        id: 'status',
        header: 'Durum',
        cell: ({ row }) => {
          const s = row.original.status;
          return (
            <TravelBadge
              variant={s === 'confirmed' ? 'success' : s === 'reviewing' ? 'warning' : 'info'}
              size="sm"
              className="text-[10px]"
            >
              {s === 'confirmed' ? 'Onaylandı' : s === 'reviewing' ? 'İnceleniyor' : 'Yeni Talep'}
            </TravelBadge>
          );
        },
        filterFn: (row, id, value) => {
          return Array.isArray(value) ? value.includes(row.getValue(id)) : true;
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const r = row.original;
          return (
            <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
              {r.status !== 'confirmed' ? (
                <TravelButton
                  variant="primary"
                  size="sm"
                  onClick={() => handleApprove(r.id)}
                  className="text-[10px] h-6 px-2 font-medium gap-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Onayla</span>
                </TravelButton>
              ) : (
                <span className="text-[10px] font-mono text-emerald-400/80 px-1">
                  ✓ Onaylı
                </span>
              )}
              <TravelTableRowActions
                onInspect={() => handleInspect(r)}
                onCopyId={() => navigator.clipboard.writeText(r.id)}
              />
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [handleInspect, handleApprove]
  );

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: requests,
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

  const handleExportCsv = () => {
    exportToCsv('travia_requests', requests, [
      { header: 'ID', key: 'id' },
      { header: 'Misafir', key: 'customer' },
      { header: 'Kategori', key: 'category' },
      { header: 'Talep', key: 'title' },
      { header: 'İstenen Zaman', key: 'time' },
      { header: 'PAX', key: 'pax' },
      { header: 'Not', key: 'notes' },
      { header: 'Durum', key: 'status' },
      { header: 'Kayıt Tarihi', key: 'created_at' },
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
              Misafir Talepleri (Customer Requests Queue)
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#101524] border border-[rgba(201,166,107,0.15)] text-[#C9A66B]">
              {requests.length} Talep
            </span>
          </div>
          <p className="text-xs text-[#F5F1E8]/40 mt-0.5">
            Mobil uygulama ve WhatsApp üzerinden gelen anlık concierge talepleri
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <TravelTableToolbar
        table={table}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Talep veya misafir ara..."
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
        {table.getColumn('category') && (
          <TravelTableFacetedFilter
            column={table.getColumn('category')}
            title="Kategori"
            options={CATEGORY_OPTIONS}
          />
        )}
      </TravelTableToolbar>

      {/* Table */}
      <TravelTable
        tableInstance={table}
        columns={columns}
        data={requests}
        density={density}
        onRowClick={handleInspect}
        isFiltered={table.getState().columnFilters.length > 0 || !!searchQuery}
        onResetFilters={() => {
          table.resetColumnFilters();
          setSearchQuery('');
          updateUrl({ q: null, status: null, category: null, page: '1' });
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
      <RequestQuickSheet
        request={selectedRequest}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onApprove={handleApprove}
      />
    </div>
  );
}

export default function RequestsPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-xs font-mono text-[#F5F1E8]/40">Yükleniyor...</div>}>
      <RequestsContent />
    </React.Suspense>
  );
}
