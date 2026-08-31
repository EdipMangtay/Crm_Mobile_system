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
  CustomerQuickSheet,
  CustomerData,
} from '@/components/crm';
import { TravelBadge } from '@/components/ui/travel';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { useTableUrlState } from '@/hooks/useTableUrlState';
import { exportToCsv } from '@/lib/utils';
import { COUNTRY_FLAGS } from '@/types';
import { SHARED_CUSTOMERS } from '@/shared/data/traviaData';

const CUSTOMERS_DATA: CustomerData[] = SHARED_CUSTOMERS.map((c) => ({
  id: c.id,
  first_name: c.first_name,
  last_name: c.last_name,
  country: c.country,
  tags: c.tags || [],
  email: c.email || '',
  phone: c.phone || '',
  lifetime_value: c.lifetime_value || 0,
  status: 'active',
}));

const COLUMN_LABELS: Record<string, string> = {
  customer: 'Müşteri',
  country: 'Ülke',
  tags: 'Segment / Etiketler',
  lifetime_value: 'Yaşam Boyu Değer',
  status: 'Durum',
};

const COUNTRY_OPTIONS = [
  { label: 'Türkiye (TR)', value: 'TR' },
  { label: 'Almanya (DE)', value: 'DE' },
];

const STATUS_OPTIONS = [
  { label: 'Aktif', value: 'active' },
  { label: 'Pasif', value: 'inactive' },
];

function CustomersContent() {
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
  const [selectedCustomer, setSelectedCustomer] = React.useState<CustomerData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  // Initialize and synchronize column filters with URL
  const initialFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = [];
    const country = searchParams.get('country');
    if (country) filters.push({ id: 'country', value: country.split(',') });
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
      const countryFilter = next.find((f) => f.id === 'country');
      urlUpdates.country = countryFilter && Array.isArray(countryFilter.value) && countryFilter.value.length > 0
        ? (countryFilter.value as string[]).join(',')
        : null;

      const statusFilter = next.find((f) => f.id === 'status');
      urlUpdates.status = statusFilter && Array.isArray(statusFilter.value) && statusFilter.value.length > 0
        ? (statusFilter.value as string[]).join(',')
        : null;

      updateUrl(urlUpdates);
    },
    [columnFilters, updateUrl]
  );

  const handleInspect = React.useCallback((customer: CustomerData) => {
    setSelectedCustomer(customer);
    setIsSheetOpen(true);
  }, []);

  const columns = React.useMemo<ColumnDef<CustomerData>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate' as unknown as boolean)}
            onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
            className="w-3.5 h-3.5 rounded bg-[#101524] border-[rgba(201,166,107,0.30)] text-[#C9A66B] accent-[#C9A66B] cursor-pointer"
            aria-label="Tüm satırları seç"
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
            aria-label={`Müşteri seç: ${row.original.first_name} ${row.original.last_name}`}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'customer',
        id: 'customer',
        header: 'Müşteri',
        accessorFn: (row) => `${row.first_name} ${row.last_name} ${row.email}`,
        cell: ({ row }) => {
          const c = row.original;
          return (
            <div className="flex items-center gap-2.5 py-0.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#C9A66B]/20 to-[#C9A66B]/5 border border-[#C9A66B]/20 flex items-center justify-center font-serif text-[11px] font-bold text-[#E8C77A] shrink-0">
                {c.first_name[0]}
                {c.last_name[0]}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#F5F1E8] group-hover:text-[#E8C77A] transition-colors truncate">
                  {c.first_name} {c.last_name}
                </p>
                <p className="text-[10px] text-[#F5F1E8]/35 font-mono truncate">{c.email}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'country',
        id: 'country',
        header: 'Ülke',
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="text-sm">{COUNTRY_FLAGS[row.original.country] || '🌍'}</span>
            <span className="text-[#F5F1E8]/50 uppercase">{row.original.country}</span>
          </div>
        ),
        filterFn: (row, id, value) => {
          return Array.isArray(value) ? value.includes(row.getValue(id)) : true;
        },
      },
      {
        accessorKey: 'tags',
        id: 'tags',
        header: 'Segment / Etiketler',
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.tags.map((tag) => (
              <TravelBadge
                key={tag}
                variant={tag === 'VIP' ? 'gold' : 'neutral'}
                size="sm"
                className="text-[10px] py-0 h-4 px-1.5"
              >
                {tag}
              </TravelBadge>
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'lifetime_value',
        id: 'lifetime_value',
        header: 'Yaşam Boyu Değer',
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-[#E8C77A] tabular-nums">
            {formatMoney(row.original.lifetime_value)}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        id: 'status',
        header: 'Durum',
        cell: ({ row }) => (
          <TravelBadge
            variant={row.original.status === 'active' ? 'success' : 'neutral'}
            size="sm"
            className="text-[10px]"
          >
            {row.original.status === 'active' ? 'Aktif' : row.original.status}
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
            detailHref={`/crm/customers/${row.original.id}`}
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
    data: CUSTOMERS_DATA,
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

  const totalLtv = React.useMemo(
    () => CUSTOMERS_DATA.reduce((s, c) => s + c.lifetime_value, 0),
    []
  );

  const handleExportCsv = () => {
    exportToCsv('travia_customers', CUSTOMERS_DATA, [
      { header: 'Ad', key: 'first_name' },
      { header: 'Soyad', key: 'last_name' },
      { header: 'Ülke', key: 'country' },
      { header: 'E-posta', key: 'email' },
      { header: 'Telefon', key: 'phone' },
      { header: 'Yaşam Boyu Değer', key: 'lifetime_value' },
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
              Müşteriler
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#101524] border border-[rgba(201,166,107,0.15)] text-[#C9A66B]">
              {CUSTOMERS_DATA.length} Misafir
            </span>
          </div>
          <p className="text-xs text-[#F5F1E8]/40 mt-0.5">
            Toplam Portföy LTV: <strong className="text-[#E8C77A] font-mono">{formatMoney(totalLtv)}</strong> · VIP ve Acente Müşteri Rehberi
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <TravelTableToolbar
        table={table}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Müşteri veya e-posta ara..."
        columnLabels={COLUMN_LABELS}
        density={density}
        onDensityChange={setDensity}
        onExportCsv={handleExportCsv}
      >
        {table.getColumn('country') && (
          <TravelTableFacetedFilter
            column={table.getColumn('country')}
            title="Ülke"
            options={COUNTRY_OPTIONS}
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
        data={CUSTOMERS_DATA}
        density={density}
        onRowClick={handleInspect}
        isFiltered={table.getState().columnFilters.length > 0 || !!searchQuery}
        onResetFilters={() => {
          table.resetColumnFilters();
          setSearchQuery('');
          updateUrl({ q: null, country: null, status: null, page: '1' });
        }}
      />

      {/* Pagination */}
      <TravelTablePagination table={table} />

      {/* Floating Bulk Action Bar */}
      <TravelTableBulkBar
        selectedCount={selectedCount}
        onClearSelection={() => setRowSelection({})}
        onExportSelected={handleExportCsv}
      />

      {/* Quick Sheet */}
      <CustomerQuickSheet
        customer={selectedCustomer}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  );
}

export default function CustomersPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-xs font-mono text-[#F5F1E8]/40">Yükleniyor...</div>}>
      <CustomersContent />
    </React.Suspense>
  );
}
