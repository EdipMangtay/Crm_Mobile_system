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
  LayoutGrid,
  Table2,
  Calendar,
} from 'lucide-react';
import {
  TravelTable,
  TravelTableToolbar,
  TravelTablePagination,
  TravelTableFacetedFilter,
  TravelTableBulkBar,
  TravelTableRowActions,
  TableDensity,
  LeadQuickSheet,
  LeadData,
} from '@/components/crm';
import { TravelBadge } from '@/components/ui/travel';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { useTableUrlState } from '@/hooks/useTableUrlState';
import { exportToCsv, cn } from '@/lib/utils';
import { LEAD_STAGES, COUNTRY_FLAGS, LeadStage } from '@/types';
import { SHARED_LEADS } from '@/shared/data/traviaData';

const STAGE_BADGE_MAP: Record<LeadStage, 'info' | 'neutral' | 'success' | 'warning' | 'gold' | 'error'> = {
  new: 'info',
  contacted: 'neutral',
  qualified: 'success',
  proposal_sent: 'warning',
  negotiation: 'gold',
  booked: 'success',
  lost: 'error',
};

const STAGE_OPTIONS = LEAD_STAGES.map((s) => ({
  label: s.label,
  value: s.value,
}));

const COUNTRY_OPTIONS = [
  { label: 'Türkiye (TR)', value: 'TR' },
  { label: 'Almanya (DE)', value: 'DE' },
  { label: 'Birleşik Krallık (GB)', value: 'GB' },
  { label: 'Rusya (RU)', value: 'RU' },
];

const COLUMN_LABELS: Record<string, string> = {
  lead: 'Lead / İletişim',
  country: 'Ülke',
  dates_pax: 'Tarih & PAX',
  estimated_value: 'Bütçe / Değer',
  source: 'Kaynak',
  stage: 'Aşama',
  lead_score: 'Nitelik Skoru',
  assigned_to: 'Temsilci',
};

function LeadsContent() {
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

  const viewMode = (searchParams.get('view') as 'table' | 'kanban') || 'kanban';
  const setViewMode = React.useCallback(
    (mode: 'table' | 'kanban') => {
      updateUrl({ view: mode === 'kanban' ? null : mode });
    },
    [updateUrl]
  );

  const [density, setDensity] = React.useState<TableDensity>('default');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [selectedLead, setSelectedLead] = React.useState<LeadData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const leadsData = SHARED_LEADS as unknown as LeadData[];

  // Sync Filters with URL
  const initialFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = [];
    const stage = searchParams.get('stage');
    if (stage) filters.push({ id: 'stage', value: stage.split(',') });
    const country = searchParams.get('country');
    if (country) filters.push({ id: 'country', value: country.split(',') });
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
      const stageFilter = next.find((f) => f.id === 'stage');
      urlUpdates.stage = stageFilter && Array.isArray(stageFilter.value) && stageFilter.value.length > 0
        ? (stageFilter.value as string[]).join(',')
        : null;

      const countryFilter = next.find((f) => f.id === 'country');
      urlUpdates.country = countryFilter && Array.isArray(countryFilter.value) && countryFilter.value.length > 0
        ? (countryFilter.value as string[]).join(',')
        : null;

      updateUrl(urlUpdates);
    },
    [columnFilters, updateUrl]
  );

  const handleInspect = React.useCallback((lead: LeadData) => {
    setSelectedLead(lead);
    setIsSheetOpen(true);
  }, []);

  const columns = React.useMemo<ColumnDef<LeadData>[]>(
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
            aria-label={`Lead seç: ${row.original.first_name} ${row.original.last_name}`}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'lead',
        id: 'lead',
        header: 'Lead / İletişim',
        accessorFn: (row) => `${row.first_name} ${row.last_name} ${row.email}`,
        cell: ({ row }) => {
          const l = row.original;
          return (
            <div className="py-0.5">
              <p className="text-xs font-semibold text-[#F5F1E8] group-hover:text-[#E8C77A] transition-colors truncate">
                {l.first_name} {l.last_name}
              </p>
              <p className="text-[10px] text-[#F5F1E8]/35 font-mono truncate">{l.email}</p>
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
        accessorKey: 'dates_pax',
        id: 'dates_pax',
        header: 'Tarih & PAX',
        accessorFn: (row) => `${row.travel_start_date} ${row.pax_count}`,
        cell: ({ row }) => {
          const l = row.original;
          return (
            <div className="text-xs">
              <p className="text-[#F5F1E8]/75 font-mono text-[11px]">{l.travel_start_date}</p>
              <p className="text-[10px] text-[#F5F1E8]/35">{l.pax_count} Kişi</p>
            </div>
          );
        },
      },
      {
        accessorKey: 'estimated_value',
        id: 'estimated_value',
        header: 'Bütçe / Değer',
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-[#E8C77A] tabular-nums">
            {formatMoney(row.original.estimated_value)}
          </span>
        ),
      },
      {
        accessorKey: 'source',
        id: 'source',
        header: 'Kaynak',
        cell: ({ row }) => (
          <span className="text-xs text-[#F5F1E8]/50">{row.original.source}</span>
        ),
      },
      {
        accessorKey: 'stage',
        id: 'stage',
        header: 'Aşama',
        cell: ({ row }) => {
          const stageInfo = LEAD_STAGES.find((s) => s.value === row.original.stage);
          return (
            <TravelBadge variant={STAGE_BADGE_MAP[row.original.stage]} size="sm" className="text-[10px]">
              {stageInfo?.label || row.original.stage}
            </TravelBadge>
          );
        },
        filterFn: (row, id, value) => {
          return Array.isArray(value) ? value.includes(row.getValue(id)) : true;
        },
      },
      {
        accessorKey: 'lead_score',
        id: 'lead_score',
        header: 'Nitelik Skoru',
        cell: ({ row }) => {
          const score = row.original.lead_score;
          return (
            <div className="flex items-center gap-2 min-w-[70px]">
              <div className="flex-1 h-1.5 bg-[#101524] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${score}%`,
                    backgroundColor: score > 75 ? '#10B981' : score > 50 ? '#FBBF24' : '#EF4444',
                  }}
                />
              </div>
              <span className="font-mono text-[10px] text-[#F5F1E8]/40 w-6 text-right">
                {score}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'assigned_to',
        id: 'assigned_to',
        header: 'Temsilci',
        cell: ({ row }) => (
          <span className="text-xs text-[#F5F1E8]/60">{row.original.assigned_to}</span>
        ),
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <TravelTableRowActions
            onInspect={() => handleInspect(row.original)}
            detailHref={`/crm/leads/${row.original.id}`}
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
    data: leadsData,
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

  const totalPipeline = React.useMemo(
    () => leadsData.reduce((s, l) => s + l.estimated_value, 0),
    [leadsData]
  );

  const handleExportCsv = () => {
    exportToCsv('travia_leads', leadsData, [
      { header: 'Ad', key: 'first_name' },
      { header: 'Soyad', key: 'last_name' },
      { header: 'Ülke', key: 'country' },
      { header: 'Telefon', key: 'phone' },
      { header: 'E-posta', key: 'email' },
      { header: 'Aşama', key: 'stage' },
      { header: 'Değer', key: 'estimated_value' },
      { header: 'Kaynak', key: 'source' },
      { header: 'Temsilci', key: 'assigned_to' },
    ]);
  };

  const selectedCount = Object.keys(rowSelection).filter((k) => rowSelection[k]).length;

  const filteredLeads = React.useMemo(() => {
    return leadsData.filter((l) => {
      const matchSearch =
        searchQuery === '' ||
        `${l.first_name} ${l.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.email.toLowerCase().includes(searchQuery.toLowerCase());

      const stageFilter = columnFilters.find((f) => f.id === 'stage')?.value as string[] | undefined;
      const matchStage = !stageFilter || stageFilter.length === 0 || stageFilter.includes(l.stage);

      const countryFilter = columnFilters.find((f) => f.id === 'country')?.value as string[] | undefined;
      const matchCountry = !countryFilter || countryFilter.length === 0 || countryFilter.includes(l.country);

      return matchSearch && matchStage && matchCountry;
    });
  }, [leadsData, searchQuery, columnFilters]);

  return (
    <div className="space-y-4 max-w-[1600px] select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-[rgba(201,166,107,0.08)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-[#F5F1E8] tracking-tight">
              Leads & Fırsatlar
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#101524] border border-[rgba(201,166,107,0.15)] text-[#C9A66B]">
              {leadsData.length} Lead
            </span>
          </div>
          <p className="text-xs text-[#F5F1E8]/40 mt-0.5">
            Toplam Pipeline Değeri: <strong className="text-[#E8C77A] font-mono">{formatMoney(totalPipeline)}</strong> · Satış ve VIP Dönüşüm Hunisi
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.15)] shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('kanban')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
              viewMode === 'kanban'
                ? 'bg-[rgba(201,166,107,0.15)] text-[#E8C77A]'
                : 'text-[#F5F1E8]/50 hover:text-[#F5F1E8]'
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Kanban</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
              viewMode === 'table'
                ? 'bg-[rgba(201,166,107,0.15)] text-[#E8C77A]'
                : 'text-[#F5F1E8]/50 hover:text-[#F5F1E8]'
            )}
          >
            <Table2 className="w-3.5 h-3.5" />
            <span>Tablo</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <TravelTableToolbar
        table={table}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Lead veya temsilci ara..."
        columnLabels={COLUMN_LABELS}
        density={viewMode === 'table' ? density : undefined}
        onDensityChange={viewMode === 'table' ? setDensity : undefined}
        onExportCsv={handleExportCsv}
      >
        {table.getColumn('stage') && (
          <TravelTableFacetedFilter
            column={table.getColumn('stage')}
            title="Aşama"
            options={STAGE_OPTIONS}
          />
        )}
        {table.getColumn('country') && (
          <TravelTableFacetedFilter
            column={table.getColumn('country')}
            title="Ülke"
            options={COUNTRY_OPTIONS}
          />
        )}
      </TravelTableToolbar>

      {/* View Switch: Table vs Kanban */}
      {viewMode === 'table' ? (
        <>
          <TravelTable
            tableInstance={table}
            columns={columns}
            data={leadsData}
            density={density}
            onRowClick={handleInspect}
            isFiltered={table.getState().columnFilters.length > 0 || !!searchQuery}
            onResetFilters={() => {
              table.resetColumnFilters();
              setSearchQuery('');
              updateUrl({ q: null, stage: null, country: null, page: '1' });
            }}
          />
          <TravelTablePagination table={table} />
        </>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[rgba(201,166,107,0.15)]">
          {LEAD_STAGES.filter((s) => s.value !== 'lost').map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.stage === stage.value);
            const stageValue = stageLeads.reduce((s, l) => s + l.estimated_value, 0);

            return (
              <div
                key={stage.value}
                className="w-[270px] shrink-0 bg-[#0B0F1A]/80 border border-[rgba(201,166,107,0.12)] rounded-xl p-2.5 flex flex-col h-full max-h-[75vh]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[rgba(201,166,107,0.08)] px-1 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="text-xs font-semibold text-[#F5F1E8]">
                      {stage.label}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#101524] text-[#C9A66B]">
                      {stageLeads.length}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#F5F1E8]/40">
                    {formatMoney(stageValue)}
                  </span>
                </div>

                {/* Cards Scrollable Container */}
                <div className="space-y-2 overflow-y-auto pr-0.5 flex-1 scrollbar-thin">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => handleInspect(lead)}
                      className="p-3 rounded-lg bg-[#101524]/80 border border-[rgba(201,166,107,0.10)] hover:border-[rgba(201,166,107,0.30)] hover:bg-[#101524] transition-all cursor-pointer group shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-1.5 mb-1.5">
                        <p className="text-xs font-semibold text-[#F5F1E8] group-hover:text-[#E8C77A] transition-colors truncate">
                          {lead.first_name} {lead.last_name}
                        </p>
                        <span className="text-xs shrink-0">{COUNTRY_FLAGS[lead.country] || '🌍'}</span>
                      </div>

                      <div className="space-y-1 text-[11px] text-[#F5F1E8]/40">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#C9A66B]" />
                            <span className="font-mono text-[10px]">{lead.travel_start_date}</span>
                          </span>
                          <span className="font-mono font-semibold text-[#E8C77A]">
                            {formatMoney(lead.estimated_value)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[rgba(201,166,107,0.05)]">
                          <span>{lead.source}</span>
                          <span className="text-[#F5F1E8]/60 font-medium">{lead.assigned_to}</span>
                        </div>
                      </div>

                      {lead.lead_score > 0 && (
                        <div className="mt-2 flex items-center gap-1.5">
                          <div className="flex-1 h-1 bg-[#05070F] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${lead.lead_score}%`,
                                backgroundColor: lead.lead_score > 75 ? '#10B981' : lead.lead_score > 50 ? '#FBBF24' : '#EF4444',
                              }}
                            />
                          </div>
                          <span className="text-[9px] font-mono text-[#F5F1E8]/30">{lead.lead_score}%</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="py-6 text-center text-[11px] text-[#F5F1E8]/20 border border-dashed border-[rgba(201,166,107,0.08)] rounded-lg">
                      Kayıt yok
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Bulk Action Bar */}
      <TravelTableBulkBar
        selectedCount={selectedCount}
        onClearSelection={() => setRowSelection({})}
        onExportSelected={handleExportCsv}
      />

      {/* Quick Sheet */}
      <LeadQuickSheet
        lead={selectedLead}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  );
}

export default function LeadsPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-xs font-mono text-[#F5F1E8]/40">Yükleniyor...</div>}>
      <LeadsContent />
    </React.Suspense>
  );
}
