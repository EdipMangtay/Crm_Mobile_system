(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/crm/src/app/crm/leads/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeadsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/table-core/build/lib/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-table/build/lib/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.mjs [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/table-2.mjs [app-client] (ecmascript) <export default as Table2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.mjs [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/crm/src/components/crm/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$table$2f$TravelTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/components/crm/table/TravelTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$table$2f$TravelTableToolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/components/crm/table/TravelTableToolbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$table$2f$TravelTablePagination$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/components/crm/table/TravelTablePagination.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$table$2f$TravelTableFacetedFilter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/components/crm/table/TravelTableFacetedFilter.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$table$2f$TravelTableBulkBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/components/crm/table/TravelTableBulkBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$table$2f$TravelTableRowActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/components/crm/table/TravelTableRowActions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$sheets$2f$LeadQuickSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/components/crm/sheets/LeadQuickSheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$ui$2f$travel$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/crm/src/components/ui/travel/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$ui$2f$travel$2f$TravelBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/components/ui/travel/TravelBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$tenancy$2f$TenantProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/lib/tenancy/TenantProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$hooks$2f$useTableUrlState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/hooks/useTableUrlState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/crm/src/lib/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$utils$2f$exportCsv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/lib/utils/exportCsv.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/lib/utils/cn.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/crm/src/types/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$types$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/types/crm.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$shared$2f$data$2f$traviaData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/shared/data/traviaData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
const STAGE_BADGE_MAP = {
    new: 'info',
    contacted: 'neutral',
    qualified: 'success',
    proposal_sent: 'warning',
    negotiation: 'gold',
    booked: 'success',
    lost: 'error'
};
const STAGE_OPTIONS = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$types$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LEAD_STAGES"].map(_c = (s)=>({
        label: s.label,
        value: s.value
    }));
_c1 = STAGE_OPTIONS;
const COUNTRY_OPTIONS = [
    {
        label: 'Türkiye (TR)',
        value: 'TR'
    },
    {
        label: 'Almanya (DE)',
        value: 'DE'
    },
    {
        label: 'Birleşik Krallık (GB)',
        value: 'GB'
    },
    {
        label: 'Rusya (RU)',
        value: 'RU'
    }
];
const COLUMN_LABELS = {
    lead: 'Lead / İletişim',
    country: 'Ülke',
    dates_pax: 'Tarih & PAX',
    estimated_value: 'Bütçe / Değer',
    source: 'Kaynak',
    stage: 'Aşama',
    lead_score: 'Nitelik Skoru',
    assigned_to: 'Temsilci'
};
function LeadsContent() {
    _s();
    const { formatMoney } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$tenancy$2f$TenantProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTenant"])();
    const { searchQuery, setSearchQuery, pageIndex, setPage, pageSize, setPageSize, searchParams, updateUrl } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$hooks$2f$useTableUrlState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTableUrlState"])();
    const viewMode = searchParams.get('view') || 'kanban';
    const setViewMode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "LeadsContent.useCallback[setViewMode]": (mode)=>{
            updateUrl({
                view: mode === 'kanban' ? null : mode
            });
        }
    }["LeadsContent.useCallback[setViewMode]"], [
        updateUrl
    ]);
    const [density, setDensity] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('default');
    const [sorting, setSorting] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [columnVisibility, setColumnVisibility] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({});
    const [rowSelection, setRowSelection] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({});
    const [selectedLead, setSelectedLead] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [isSheetOpen, setIsSheetOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const leadsData = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$shared$2f$data$2f$traviaData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHARED_LEADS"];
    // Sync Filters with URL
    const initialFilters = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "LeadsContent.useMemo[initialFilters]": ()=>{
            const filters = [];
            const stage = searchParams.get('stage');
            if (stage) filters.push({
                id: 'stage',
                value: stage.split(',')
            });
            const country = searchParams.get('country');
            if (country) filters.push({
                id: 'country',
                value: country.split(',')
            });
            return filters;
        }
    }["LeadsContent.useMemo[initialFilters]"], [
        searchParams
    ]);
    const [columnFilters, setColumnFilters] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](initialFilters);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "LeadsContent.useEffect": ()=>{
            setColumnFilters(initialFilters);
        }
    }["LeadsContent.useEffect"], [
        initialFilters
    ]);
    const handleColumnFiltersChange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "LeadsContent.useCallback[handleColumnFiltersChange]": (updaterOrValue)=>{
            const next = typeof updaterOrValue === 'function' ? updaterOrValue(columnFilters) : updaterOrValue;
            setColumnFilters(next);
            const urlUpdates = {
                page: '1'
            };
            const stageFilter = next.find({
                "LeadsContent.useCallback[handleColumnFiltersChange].stageFilter": (f)=>f.id === 'stage'
            }["LeadsContent.useCallback[handleColumnFiltersChange].stageFilter"]);
            urlUpdates.stage = stageFilter && Array.isArray(stageFilter.value) && stageFilter.value.length > 0 ? stageFilter.value.join(',') : null;
            const countryFilter = next.find({
                "LeadsContent.useCallback[handleColumnFiltersChange].countryFilter": (f)=>f.id === 'country'
            }["LeadsContent.useCallback[handleColumnFiltersChange].countryFilter"]);
            urlUpdates.country = countryFilter && Array.isArray(countryFilter.value) && countryFilter.value.length > 0 ? countryFilter.value.join(',') : null;
            updateUrl(urlUpdates);
        }
    }["LeadsContent.useCallback[handleColumnFiltersChange]"], [
        columnFilters,
        updateUrl
    ]);
    const handleInspect = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "LeadsContent.useCallback[handleInspect]": (lead)=>{
            setSelectedLead(lead);
            setIsSheetOpen(true);
        }
    }["LeadsContent.useCallback[handleInspect]"], []);
    const columns = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "LeadsContent.useMemo[columns]": ()=>[
                {
                    id: 'select',
                    header: {
                        "LeadsContent.useMemo[columns]": ({ table })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected() && 'indeterminate',
                                onChange: {
                                    "LeadsContent.useMemo[columns]": (e)=>table.toggleAllPageRowsSelected(!!e.target.checked)
                                }["LeadsContent.useMemo[columns]"],
                                className: "w-3.5 h-3.5 rounded bg-[#101524] border-[rgba(201,166,107,0.30)] text-[#C9A66B] accent-[#C9A66B] cursor-pointer",
                                "aria-label": "Tümünü seç"
                            }, void 0, false, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                    }["LeadsContent.useMemo[columns]"],
                    cell: {
                        "LeadsContent.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: row.getIsSelected(),
                                onChange: {
                                    "LeadsContent.useMemo[columns]": (e)=>{
                                        e.stopPropagation();
                                        row.toggleSelected(!!e.target.checked);
                                    }
                                }["LeadsContent.useMemo[columns]"],
                                onClick: {
                                    "LeadsContent.useMemo[columns]": (e)=>e.stopPropagation()
                                }["LeadsContent.useMemo[columns]"],
                                className: "w-3.5 h-3.5 rounded bg-[#101524] border-[rgba(201,166,107,0.30)] text-[#C9A66B] accent-[#C9A66B] cursor-pointer",
                                "aria-label": `Lead seç: ${row.original.first_name} ${row.original.last_name}`
                            }, void 0, false, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this)
                    }["LeadsContent.useMemo[columns]"],
                    enableSorting: false,
                    enableHiding: false
                },
                {
                    accessorKey: 'lead',
                    id: 'lead',
                    header: 'Lead / İletişim',
                    accessorFn: {
                        "LeadsContent.useMemo[columns]": (row)=>`${row.first_name} ${row.last_name} ${row.email}`
                    }["LeadsContent.useMemo[columns]"],
                    cell: {
                        "LeadsContent.useMemo[columns]": ({ row })=>{
                            const l = row.original;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "py-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-semibold text-[#F5F1E8] group-hover:text-[#E8C77A] transition-colors truncate",
                                        children: [
                                            l.first_name,
                                            " ",
                                            l.last_name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-[#F5F1E8]/35 font-mono truncate",
                                        children: l.email
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 187,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this);
                        }
                    }["LeadsContent.useMemo[columns]"]
                },
                {
                    accessorKey: 'country',
                    id: 'country',
                    header: 'Ülke',
                    cell: {
                        "LeadsContent.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 font-mono text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$types$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COUNTRY_FLAGS"][row.original.country] || '🌍'
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#F5F1E8]/50 uppercase",
                                        children: row.original.country
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this)
                    }["LeadsContent.useMemo[columns]"],
                    filterFn: {
                        "LeadsContent.useMemo[columns]": (row, id, value)=>{
                            return Array.isArray(value) ? value.includes(row.getValue(id)) : true;
                        }
                    }["LeadsContent.useMemo[columns]"]
                },
                {
                    accessorKey: 'dates_pax',
                    id: 'dates_pax',
                    header: 'Tarih & PAX',
                    accessorFn: {
                        "LeadsContent.useMemo[columns]": (row)=>`${row.travel_start_date} ${row.pax_count}`
                    }["LeadsContent.useMemo[columns]"],
                    cell: {
                        "LeadsContent.useMemo[columns]": ({ row })=>{
                            const l = row.original;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[#F5F1E8]/75 font-mono text-[11px]",
                                        children: l.travel_start_date
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 215,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-[#F5F1E8]/35",
                                        children: [
                                            l.pax_count,
                                            " Kişi"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this);
                        }
                    }["LeadsContent.useMemo[columns]"]
                },
                {
                    accessorKey: 'estimated_value',
                    id: 'estimated_value',
                    header: 'Bütçe / Değer',
                    cell: {
                        "LeadsContent.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-xs font-semibold text-[#E8C77A] tabular-nums",
                                children: formatMoney(row.original.estimated_value)
                            }, void 0, false, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this)
                    }["LeadsContent.useMemo[columns]"]
                },
                {
                    accessorKey: 'source',
                    id: 'source',
                    header: 'Kaynak',
                    cell: {
                        "LeadsContent.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-[#F5F1E8]/50",
                                children: row.original.source
                            }, void 0, false, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this)
                    }["LeadsContent.useMemo[columns]"]
                },
                {
                    accessorKey: 'stage',
                    id: 'stage',
                    header: 'Aşama',
                    cell: {
                        "LeadsContent.useMemo[columns]": ({ row })=>{
                            const stageInfo = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$types$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LEAD_STAGES"].find({
                                "LeadsContent.useMemo[columns].stageInfo": (s)=>s.value === row.original.stage
                            }["LeadsContent.useMemo[columns].stageInfo"]);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$ui$2f$travel$2f$TravelBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TravelBadge"], {
                                variant: STAGE_BADGE_MAP[row.original.stage],
                                size: "sm",
                                className: "text-[10px]",
                                children: stageInfo?.label || row.original.stage
                            }, void 0, false, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this);
                        }
                    }["LeadsContent.useMemo[columns]"],
                    filterFn: {
                        "LeadsContent.useMemo[columns]": (row, id, value)=>{
                            return Array.isArray(value) ? value.includes(row.getValue(id)) : true;
                        }
                    }["LeadsContent.useMemo[columns]"]
                },
                {
                    accessorKey: 'lead_score',
                    id: 'lead_score',
                    header: 'Nitelik Skoru',
                    cell: {
                        "LeadsContent.useMemo[columns]": ({ row })=>{
                            const score = row.original.lead_score;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 min-w-[70px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 h-1.5 bg-[#101524] rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full rounded-full",
                                            style: {
                                                width: `${score}%`,
                                                backgroundColor: score > 75 ? '#10B981' : score > 50 ? '#FBBF24' : '#EF4444'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                            lineNumber: 264,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 263,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[10px] text-[#F5F1E8]/40 w-6 text-right",
                                        children: score
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 272,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 262,
                                columnNumber: 13
                            }, this);
                        }
                    }["LeadsContent.useMemo[columns]"]
                },
                {
                    accessorKey: 'assigned_to',
                    id: 'assigned_to',
                    header: 'Temsilci',
                    cell: {
                        "LeadsContent.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-[#F5F1E8]/60",
                                children: row.original.assigned_to
                            }, void 0, false, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this)
                    }["LeadsContent.useMemo[columns]"]
                },
                {
                    id: 'actions',
                    cell: {
                        "LeadsContent.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$table$2f$TravelTableRowActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TravelTableRowActions"], {
                                onInspect: {
                                    "LeadsContent.useMemo[columns]": ()=>handleInspect(row.original)
                                }["LeadsContent.useMemo[columns]"],
                                detailHref: `/crm/leads/${row.original.id}`,
                                onCopyId: {
                                    "LeadsContent.useMemo[columns]": ()=>navigator.clipboard.writeText(row.original.id)
                                }["LeadsContent.useMemo[columns]"]
                            }, void 0, false, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 290,
                                columnNumber: 11
                            }, this)
                    }["LeadsContent.useMemo[columns]"],
                    enableSorting: false,
                    enableHiding: false
                }
            ]
    }["LeadsContent.useMemo[columns]"], [
        handleInspect,
        formatMoney
    ]);
    const pagination = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "LeadsContent.useMemo[pagination]": ()=>({
                pageIndex,
                pageSize
            })
    }["LeadsContent.useMemo[pagination]"], [
        pageIndex,
        pageSize
    ]);
    const table = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"])({
        data: leadsData,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
            globalFilter: searchQuery
        },
        onPaginationChange: {
            "LeadsContent.useReactTable[table]": (updater)=>{
                const next = typeof updater === 'function' ? updater(pagination) : updater;
                if (next.pageIndex !== pageIndex) {
                    setPage(next.pageIndex);
                }
                if (next.pageSize !== pageSize) {
                    setPageSize(next.pageSize);
                }
            }
        }["LeadsContent.useReactTable[table]"],
        enableRowSelection: true,
        onSortingChange: setSorting,
        onColumnFiltersChange: handleColumnFiltersChange,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setSearchQuery,
        getCoreRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCoreRowModel"])(),
        getFilteredRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFilteredRowModel"])(),
        getPaginationRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaginationRowModel"])(),
        getSortedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSortedRowModel"])(),
        getFacetedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFacetedRowModel"])(),
        getFacetedUniqueValues: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFacetedUniqueValues"])()
    });
    const totalPipeline = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "LeadsContent.useMemo[totalPipeline]": ()=>leadsData.reduce({
                "LeadsContent.useMemo[totalPipeline]": (s, l)=>s + l.estimated_value
            }["LeadsContent.useMemo[totalPipeline]"], 0)
    }["LeadsContent.useMemo[totalPipeline]"], [
        leadsData
    ]);
    const handleExportCsv = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$utils$2f$exportCsv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exportToCsv"])('travia_leads', leadsData, [
            {
                header: 'Ad',
                key: 'first_name'
            },
            {
                header: 'Soyad',
                key: 'last_name'
            },
            {
                header: 'Ülke',
                key: 'country'
            },
            {
                header: 'Telefon',
                key: 'phone'
            },
            {
                header: 'E-posta',
                key: 'email'
            },
            {
                header: 'Aşama',
                key: 'stage'
            },
            {
                header: 'Değer',
                key: 'estimated_value'
            },
            {
                header: 'Kaynak',
                key: 'source'
            },
            {
                header: 'Temsilci',
                key: 'assigned_to'
            }
        ]);
    };
    const selectedCount = Object.keys(rowSelection).filter((k)=>rowSelection[k]).length;
    const filteredLeads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "LeadsContent.useMemo[filteredLeads]": ()=>{
            return leadsData.filter({
                "LeadsContent.useMemo[filteredLeads]": (l)=>{
                    const matchSearch = searchQuery === '' || `${l.first_name} ${l.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) || l.email.toLowerCase().includes(searchQuery.toLowerCase());
                    const stageFilter = columnFilters.find({
                        "LeadsContent.useMemo[filteredLeads]": (f)=>f.id === 'stage'
                    }["LeadsContent.useMemo[filteredLeads]"])?.value;
                    const matchStage = !stageFilter || stageFilter.length === 0 || stageFilter.includes(l.stage);
                    const countryFilter = columnFilters.find({
                        "LeadsContent.useMemo[filteredLeads]": (f)=>f.id === 'country'
                    }["LeadsContent.useMemo[filteredLeads]"])?.value;
                    const matchCountry = !countryFilter || countryFilter.length === 0 || countryFilter.includes(l.country);
                    return matchSearch && matchStage && matchCountry;
                }
            }["LeadsContent.useMemo[filteredLeads]"]);
        }
    }["LeadsContent.useMemo[filteredLeads]"], [
        leadsData,
        searchQuery,
        columnFilters
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 max-w-[1600px] select-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-[rgba(201,166,107,0.08)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-lg font-semibold text-[#F5F1E8] tracking-tight",
                                        children: "Leads & Fırsatlar"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 389,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] font-mono px-2 py-0.5 rounded bg-[#101524] border border-[rgba(201,166,107,0.15)] text-[#C9A66B]",
                                        children: [
                                            leadsData.length,
                                            " Lead"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 392,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 388,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[#F5F1E8]/40 mt-0.5",
                                children: [
                                    "Toplam Pipeline Değeri: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "text-[#E8C77A] font-mono",
                                        children: formatMoney(totalPipeline)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 397,
                                        columnNumber: 37
                                    }, this),
                                    " · Satış ve VIP Dönüşüm Hunisi"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 396,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                        lineNumber: 387,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 p-1 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.15)] shrink-0 self-start sm:self-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setViewMode('kanban'),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors', viewMode === 'kanban' ? 'bg-[rgba(201,166,107,0.15)] text-[#E8C77A]' : 'text-[#F5F1E8]/50 hover:text-[#F5F1E8]'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 412,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Kanban"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 413,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 403,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setViewMode('table'),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors', viewMode === 'table' ? 'bg-[rgba(201,166,107,0.15)] text-[#E8C77A]' : 'text-[#F5F1E8]/50 hover:text-[#F5F1E8]'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__["Table2"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 424,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Tablo"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 425,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 415,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                        lineNumber: 402,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                lineNumber: 386,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$table$2f$TravelTableToolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TravelTableToolbar"], {
                table: table,
                searchQuery: searchQuery,
                onSearchChange: setSearchQuery,
                searchPlaceholder: "Lead veya temsilci ara...",
                columnLabels: COLUMN_LABELS,
                density: viewMode === 'table' ? density : undefined,
                onDensityChange: viewMode === 'table' ? setDensity : undefined,
                onExportCsv: handleExportCsv,
                children: [
                    table.getColumn('stage') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$table$2f$TravelTableFacetedFilter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TravelTableFacetedFilter"], {
                        column: table.getColumn('stage'),
                        title: "Aşama",
                        options: STAGE_OPTIONS
                    }, void 0, false, {
                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                        lineNumber: 442,
                        columnNumber: 11
                    }, this),
                    table.getColumn('country') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$table$2f$TravelTableFacetedFilter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TravelTableFacetedFilter"], {
                        column: table.getColumn('country'),
                        title: "Ülke",
                        options: COUNTRY_OPTIONS
                    }, void 0, false, {
                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                        lineNumber: 449,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                lineNumber: 431,
                columnNumber: 7
            }, this),
            viewMode === 'table' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$table$2f$TravelTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TravelTable"], {
                        tableInstance: table,
                        columns: columns,
                        data: leadsData,
                        density: density,
                        onRowClick: handleInspect,
                        isFiltered: table.getState().columnFilters.length > 0 || !!searchQuery,
                        onResetFilters: ()=>{
                            table.resetColumnFilters();
                            setSearchQuery('');
                            updateUrl({
                                q: null,
                                stage: null,
                                country: null,
                                page: '1'
                            });
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                        lineNumber: 460,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$table$2f$TravelTablePagination$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TravelTablePagination"], {
                        table: table
                    }, void 0, false, {
                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                        lineNumber: 473,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                lineNumber: 459,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[rgba(201,166,107,0.15)]",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$types$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LEAD_STAGES"].filter((s)=>s.value !== 'lost').map((stage)=>{
                    const stageLeads = filteredLeads.filter((l)=>l.stage === stage.value);
                    const stageValue = stageLeads.reduce((s, l)=>s + l.estimated_value, 0);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[270px] shrink-0 bg-[#0B0F1A]/80 border border-[rgba(201,166,107,0.12)] rounded-xl p-2.5 flex flex-col h-full max-h-[75vh]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between pb-2 mb-2 border-b border-[rgba(201,166,107,0.08)] px-1 shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-2 h-2 rounded-full shrink-0",
                                                style: {
                                                    backgroundColor: stage.color
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                lineNumber: 489,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-semibold text-[#F5F1E8]",
                                                children: stage.label
                                            }, void 0, false, {
                                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                lineNumber: 493,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#101524] text-[#C9A66B]",
                                                children: stageLeads.length
                                            }, void 0, false, {
                                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                lineNumber: 496,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 488,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-mono text-[#F5F1E8]/40",
                                        children: formatMoney(stageValue)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 500,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 487,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 overflow-y-auto pr-0.5 flex-1 scrollbar-thin",
                                children: [
                                    stageLeads.map((lead)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>handleInspect(lead),
                                            className: "p-3 rounded-lg bg-[#101524]/80 border border-[rgba(201,166,107,0.10)] hover:border-[rgba(201,166,107,0.30)] hover:bg-[#101524] transition-all cursor-pointer group shadow-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between gap-1.5 mb-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-semibold text-[#F5F1E8] group-hover:text-[#E8C77A] transition-colors truncate",
                                                            children: [
                                                                lead.first_name,
                                                                " ",
                                                                lead.last_name
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                            lineNumber: 514,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs shrink-0",
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$types$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COUNTRY_FLAGS"][lead.country] || '🌍'
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                            lineNumber: 517,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                    lineNumber: 513,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1 text-[11px] text-[#F5F1E8]/40",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                            className: "w-3 h-3 text-[#C9A66B]"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                                            lineNumber: 523,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-mono text-[10px]",
                                                                            children: lead.travel_start_date
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                                            lineNumber: 524,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                                    lineNumber: 522,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono font-semibold text-[#E8C77A]",
                                                                    children: formatMoney(lead.estimated_value)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                                    lineNumber: 526,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                            lineNumber: 521,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between text-[10px] pt-1 border-t border-[rgba(201,166,107,0.05)]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: lead.source
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                                    lineNumber: 531,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[#F5F1E8]/60 font-medium",
                                                                    children: lead.assigned_to
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                                    lineNumber: 532,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                            lineNumber: 530,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                    lineNumber: 520,
                                                    columnNumber: 23
                                                }, this),
                                                lead.lead_score > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 flex items-center gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 h-1 bg-[#05070F] rounded-full overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-full rounded-full",
                                                                style: {
                                                                    width: `${lead.lead_score}%`,
                                                                    backgroundColor: lead.lead_score > 75 ? '#10B981' : lead.lead_score > 50 ? '#FBBF24' : '#EF4444'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                                lineNumber: 539,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                            lineNumber: 538,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] font-mono text-[#F5F1E8]/30",
                                                            children: [
                                                                lead.lead_score,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                            lineNumber: 547,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                                    lineNumber: 537,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, lead.id, true, {
                                            fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                            lineNumber: 508,
                                            columnNumber: 21
                                        }, this)),
                                    stageLeads.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-6 text-center text-[11px] text-[#F5F1E8]/20 border border-dashed border-[rgba(201,166,107,0.08)] rounded-lg",
                                        children: "Kayıt yok"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                        lineNumber: 554,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                                lineNumber: 506,
                                columnNumber: 17
                            }, this)
                        ]
                    }, stage.value, true, {
                        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                        lineNumber: 482,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                lineNumber: 476,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$table$2f$TravelTableBulkBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TravelTableBulkBar"], {
                selectedCount: selectedCount,
                onClearSelection: ()=>setRowSelection({}),
                onExportSelected: handleExportCsv
            }, void 0, false, {
                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                lineNumber: 566,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$crm$2f$sheets$2f$LeadQuickSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeadQuickSheet"], {
                lead: selectedLead,
                open: isSheetOpen,
                onOpenChange: setIsSheetOpen
            }, void 0, false, {
                fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
                lineNumber: 573,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
        lineNumber: 384,
        columnNumber: 5
    }, this);
}
_s(LeadsContent, "vWw744M62v0OR2+qS84SR2eWHoo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$tenancy$2f$TenantProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTenant"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$hooks$2f$useTableUrlState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTableUrlState"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"]
    ];
});
_c2 = LeadsContent;
function LeadsPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-8 text-xs font-mono text-[#F5F1E8]/40",
            children: "Yükleniyor..."
        }, void 0, false, {
            fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
            lineNumber: 584,
            columnNumber: 31
        }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeadsContent, {}, void 0, false, {
            fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
            lineNumber: 585,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/crm/src/app/crm/leads/page.tsx",
        lineNumber: 584,
        columnNumber: 5
    }, this);
}
_c3 = LeadsPage;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "STAGE_OPTIONS$LEAD_STAGES.map");
__turbopack_context__.k.register(_c1, "STAGE_OPTIONS");
__turbopack_context__.k.register(_c2, "LeadsContent");
__turbopack_context__.k.register(_c3, "LeadsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/crm/src/hooks/useTableUrlState.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTableUrlState",
    ()=>useTableUrlState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useTableUrlState() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchQuery = searchParams.get('q') || '';
    const pageIndex = Math.max(0, parseInt(searchParams.get('page') || '1', 10) - 1);
    const pageSize = parseInt(searchParams.get('limit') || '20', 10);
    const viewMode = searchParams.get('view') || undefined;
    const updateUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTableUrlState.useCallback[updateUrl]": (paramsToUpdate)=>{
            const current = new URLSearchParams(Array.from(searchParams.entries()));
            Object.entries(paramsToUpdate).forEach({
                "useTableUrlState.useCallback[updateUrl]": ([key, value])=>{
                    if (value === null || value === undefined || value === '') {
                        current.delete(key);
                    } else {
                        current.set(key, value);
                    }
                }
            }["useTableUrlState.useCallback[updateUrl]"]);
            const search = current.toString();
            const query = search ? `?${search}` : '';
            router.replace(`${pathname}${query}`, {
                scroll: false
            });
        }
    }["useTableUrlState.useCallback[updateUrl]"], [
        searchParams,
        router,
        pathname
    ]);
    const setSearchQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTableUrlState.useCallback[setSearchQuery]": (q)=>{
            updateUrl({
                q: q || null,
                page: '1'
            });
        }
    }["useTableUrlState.useCallback[setSearchQuery]"], [
        updateUrl
    ]);
    const setPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTableUrlState.useCallback[setPage]": (page)=>{
            updateUrl({
                page: String(page + 1)
            });
        }
    }["useTableUrlState.useCallback[setPage]"], [
        updateUrl
    ]);
    const setPageSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTableUrlState.useCallback[setPageSize]": (size)=>{
            updateUrl({
                limit: String(size),
                page: '1'
            });
        }
    }["useTableUrlState.useCallback[setPageSize]"], [
        updateUrl
    ]);
    const setViewMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTableUrlState.useCallback[setViewMode]": (view)=>{
            updateUrl({
                view
            });
        }
    }["useTableUrlState.useCallback[setViewMode]"], [
        updateUrl
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useTableUrlState.useMemo": ()=>({
                searchQuery,
                setSearchQuery,
                pageIndex,
                setPage,
                pageSize,
                setPageSize,
                viewMode,
                setViewMode,
                updateUrl,
                searchParams
            })
    }["useTableUrlState.useMemo"], [
        searchQuery,
        setSearchQuery,
        pageIndex,
        setPage,
        pageSize,
        setPageSize,
        viewMode,
        setViewMode,
        updateUrl,
        searchParams
    ]);
}
_s(useTableUrlState, "LwohHNSCYTHMl6RWQPUa/f9ofCs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>LayoutGrid
]);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "7",
            height: "7",
            x: "3",
            y: "3",
            rx: "1",
            key: "1g98yp"
        }
    ],
    [
        "rect",
        {
            width: "7",
            height: "7",
            x: "14",
            y: "3",
            rx: "1",
            key: "6d4xhi"
        }
    ],
    [
        "rect",
        {
            width: "7",
            height: "7",
            x: "14",
            y: "14",
            rx: "1",
            key: "nxv5o0"
        }
    ],
    [
        "rect",
        {
            width: "7",
            height: "7",
            x: "3",
            y: "14",
            rx: "1",
            key: "1bb6yr"
        }
    ]
];
const LayoutGrid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("layout-grid", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.mjs [app-client] (ecmascript) <export default as LayoutGrid>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LayoutGrid",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/table-2.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Table2
]);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
            key: "gugj83"
        }
    ]
];
const Table2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("table-2", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/table-2.mjs [app-client] (ecmascript) <export default as Table2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Table2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/table-2.mjs [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_0eoky_-._.js.map