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
  SupplierQuickSheet,
  SupplierData,
} from '@/components/crm';
import { TravelBadge } from '@/components/ui/travel';
import { useTableUrlState } from '@/hooks/useTableUrlState';
import { exportToCsv } from '@/lib/utils';

const SUPPLIERS: SupplierData[] = [
  {
    id: '1',
    name: 'Marina Superyachts Charter LLC',
    category: 'Yat & Deniz',
    contact: 'Kaptan Tariq Al-Mansoor',
    phone: '+971 55 890 1234',
    email: 'charter@marinayachts.ae',
    status: 'active',
  },
  {
    id: '2',
    name: 'Al Futtaim Luxury Chauffeur Services',
    category: 'VIP Transfer',
    contact: 'Zayd Karim',
    phone: '+971 50 456 7890',
    email: 'dispatch@alfuttaimvip.ae',
    status: 'active',
  },
  {
    id: '3',
    name: 'Atlantis Resorts Dubai (The Royal & The Palm)',
    category: 'Otel & Restoran',
    contact: 'VIP Concierge Desk',
    phone: '+971 4 426 0000',
    email: 'vip@atlantisdubai.com',
    status: 'active',
  },
  {
    id: '4',
    name: 'Royal Desert Safari Adventures',
    category: 'Çöl & Safari',
    contact: 'Hassan Mahmoud',
    phone: '+971 52 333 4455',
    email: 'bookings@royaldesertsafari.ae',
    status: 'active',
  },
  {
    id: '5',
    name: 'HeliDubai Aviation',
    category: 'Helikopter',
    contact: 'Operations Center',
    phone: '+971 4 208 1455',
    email: 'tours@helidubai.com',
    status: 'active',
  },
];

const CATEGORY_OPTIONS = [
  { label: 'Yat & Deniz', value: 'Yat & Deniz' },
  { label: 'VIP Transfer', value: 'VIP Transfer' },
  { label: 'Otel & Restoran', value: 'Otel & Restoran' },
  { label: 'Çöl & Safari', value: 'Çöl & Safari' },
  { label: 'Helikopter', value: 'Helikopter' },
];

const COLUMN_LABELS: Record<string, string> = {
  name: 'Tedarikçi Adı',
  category: 'Hizmet Kategorisi',
  contact: 'Yetkili Kişi',
  phone_email: 'İletişim Bilgileri',
  status: 'Durum',
};

function SuppliersContent() {
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
  const [selectedSupplier, setSelectedSupplier] = React.useState<SupplierData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  // Sync Category Filter with URL
  const initialFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = [];
    const category = searchParams.get('category');
    if (category) filters.push({ id: 'category', value: category.split(',') });
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

      updateUrl(urlUpdates);
    },
    [columnFilters, updateUrl]
  );

  const handleInspect = React.useCallback((supplier: SupplierData) => {
    setSelectedSupplier(supplier);
    setIsSheetOpen(true);
  }, []);

  const columns = React.useMemo<ColumnDef<SupplierData>[]>(
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
            aria-label={`Tedarikçi seç: ${row.original.name}`}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'name',
        id: 'name',
        header: 'Tedarikçi Adı',
        cell: ({ row }) => (
          <div className="py-0.5 min-w-[200px]">
            <p className="text-xs font-semibold text-[#F5F1E8] group-hover:text-[#E8C77A] transition-colors truncate">
              {row.original.name}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'category',
        id: 'category',
        header: 'Kategori',
        cell: ({ row }) => (
          <TravelBadge variant="gold" size="sm" className="text-[10px]">
            {row.original.category}
          </TravelBadge>
        ),
        filterFn: (row, id, value) => {
          return Array.isArray(value) ? value.includes(row.getValue(id)) : true;
        },
      },
      {
        accessorKey: 'contact',
        id: 'contact',
        header: 'Yetkili Kişi',
        cell: ({ row }) => (
          <span className="text-xs text-[#F5F1E8]/70">{row.original.contact}</span>
        ),
      },
      {
        accessorKey: 'phone_email',
        id: 'phone_email',
        header: 'İletişim Bilgileri',
        accessorFn: (row) => `${row.phone} ${row.email}`,
        cell: ({ row }) => (
          <div className="text-xs font-mono">
            <p className="text-[#F5F1E8]/80 text-[11px]">{row.original.phone}</p>
            <p className="text-[#F5F1E8]/35 text-[10px] truncate max-w-[160px]">{row.original.email}</p>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        id: 'status',
        header: 'Durum',
        cell: () => (
          <TravelBadge variant="success" size="sm" className="text-[10px]">
            Aktif
          </TravelBadge>
        ),
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
    [handleInspect]
  );

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: SUPPLIERS,
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
    exportToCsv('travia_suppliers', SUPPLIERS, [
      { header: 'Tedarikçi Adı', key: 'name' },
      { header: 'Kategori', key: 'category' },
      { header: 'Yetkili', key: 'contact' },
      { header: 'Telefon', key: 'phone' },
      { header: 'E-posta', key: 'email' },
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
              Tedarikçiler (Suppliers Directory)
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#101524] border border-[rgba(201,166,107,0.15)] text-[#C9A66B]">
              {SUPPLIERS.length} İş Ortağı
            </span>
          </div>
          <p className="text-xs text-[#F5F1E8]/40 mt-0.5">
            Yat, transfer, otel, helikopter ve safari iş ortakları ağı
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <TravelTableToolbar
        table={table}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Tedarikçi veya yetkili ara..."
        columnLabels={COLUMN_LABELS}
        density={density}
        onDensityChange={setDensity}
        onExportCsv={handleExportCsv}
      >
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
        data={SUPPLIERS}
        density={density}
        onRowClick={handleInspect}
        isFiltered={table.getState().columnFilters.length > 0 || !!searchQuery}
        onResetFilters={() => {
          table.resetColumnFilters();
          setSearchQuery('');
          updateUrl({ q: null, category: null, page: '1' });
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
      <SupplierQuickSheet
        supplier={selectedSupplier}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  );
}

export default function SuppliersPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-xs font-mono text-[#F5F1E8]/40">Yükleniyor...</div>}>
      <SuppliersContent />
    </React.Suspense>
  );
}
