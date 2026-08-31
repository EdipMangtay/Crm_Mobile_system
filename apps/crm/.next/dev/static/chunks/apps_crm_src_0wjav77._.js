(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/crm/src/app/platform-admin/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlatformAdminDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.mjs [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.mjs [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$tenancy$2f$tenantContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/lib/tenancy/tenantContext.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$ui$2f$travel$2f$TravelButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/crm/src/components/ui/travel/TravelButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$ui$2f$travel$2f$TravelDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/crm/src/components/ui/travel/TravelDialog.tsx [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function PlatformAdminDashboard() {
    _s();
    const [tenants, setTenants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "PlatformAdminDashboard.useState": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$tenancy$2f$tenantContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tenantRegistry"].getAllTenants()
    }["PlatformAdminDashboard.useState"]);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedTenant, setSelectedTenant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isProvisionOpen, setIsProvisionOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // New Tenant Wizard state
    const [wizardData, setWizardData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        legal_name: '',
        display_name: '',
        slug: '',
        plan: 'professional',
        default_currency: 'USD',
        timezone: 'Europe/London',
        default_language: 'en',
        primary_color: '#3B82F6',
        secondary_color: '#0F172A',
        admin_email: '',
        custom_domain: ''
    });
    const stats = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$tenancy$2f$tenantContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tenantRegistry"].getPlatformStats();
    const filteredTenants = tenants.filter((t)=>t.display_name.toLowerCase().includes(searchQuery.toLowerCase()) || t.slug.toLowerCase().includes(searchQuery.toLowerCase()) || t.legal_name.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleStatusChange = (tenantId, newStatus)=>{
        const updated = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$tenancy$2f$tenantContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tenantRegistry"].updateTenantStatus(tenantId, newStatus);
        setTenants(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$tenancy$2f$tenantContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tenantRegistry"].getAllTenants());
        if (selectedTenant?.id === tenantId) {
            setSelectedTenant(updated);
        }
    };
    const handleFeatureToggle = (tenantId, feature)=>{
        const tenant = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$tenancy$2f$tenantContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tenantRegistry"].getTenantById(tenantId);
        const updated = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$tenancy$2f$tenantContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tenantRegistry"].toggleTenantFeature(tenantId, feature, !tenant.features[feature]);
        setTenants(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$tenancy$2f$tenantContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tenantRegistry"].getAllTenants());
        setSelectedTenant(updated);
    };
    const handleProvisionTenant = (e)=>{
        e.preventDefault();
        if (!wizardData.display_name || !wizardData.slug) return;
        const created = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$tenancy$2f$tenantContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tenantRegistry"].createTenant(wizardData);
        setTenants(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$lib$2f$tenancy$2f$tenantContext$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tenantRegistry"].getAllTenants());
        setIsProvisionOpen(false);
        setSelectedTenant(created);
        // Reset wizard
        setWizardData({
            legal_name: '',
            display_name: '',
            slug: '',
            plan: 'professional',
            default_currency: 'USD',
            timezone: 'Europe/London',
            default_language: 'en',
            primary_color: '#3B82F6',
            secondary_color: '#0F172A',
            admin_email: '',
            custom_domain: ''
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#05070F] text-[#F5F1E8] p-6 lg:p-10 font-sans",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-cyan-500/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(6,182,212,0.2)]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-xl font-bold tracking-tight text-white",
                                                    children: "TRAVEL OS"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
                                                    children: "PLATFORM KONTROL MERKEZİ"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-white/40 mt-0.5",
                                            children: "Çoklu acente kayıt defteri ve oturum tenant yönetim paneli"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 107,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/crm",
                                    className: "px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/70 hover:text-white transition-all flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Acente CRM Görünümü"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 119,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$ui$2f$travel$2f$TravelButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TravelButton"], {
                                    variant: "primary",
                                    size: "sm",
                                    onClick: ()=>setIsProvisionOpen(true),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 126,
                                            columnNumber: 15
                                        }, this),
                                        "Yeni Acente Tanımla"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 rounded-xl bg-[#0B0F1A] border border-cyan-500/15 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-mono uppercase text-white/40",
                                    children: "Kayıtlı Acente Sayısı"
                                }, void 0, false, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-2xl font-bold text-white font-mono",
                                    children: stats.totalTenants
                                }, void 0, false, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-white/40 font-mono",
                                    children: "Kayıt Defteri Havuzu"
                                }, void 0, false, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 rounded-xl bg-[#0B0F1A] border border-cyan-500/15 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-mono uppercase text-white/40",
                                    children: "Aktif Operasyonlar"
                                }, void 0, false, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-2xl font-bold text-emerald-400 font-mono",
                                    children: stats.activeTenants
                                }, void 0, false, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-white/40 font-mono",
                                    children: "Çalışır Durumda"
                                }, void 0, false, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 rounded-xl bg-[#0B0F1A] border border-cyan-500/15 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-mono uppercase text-white/40",
                                    children: "Deneme / Trial"
                                }, void 0, false, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-2xl font-bold text-amber-400 font-mono",
                                    children: stats.trialTenants
                                }, void 0, false, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-white/40 font-mono",
                                    children: "Değerlendirme Modunda"
                                }, void 0, false, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 rounded-xl bg-[#0B0F1A] border border-cyan-500/15 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-mono uppercase text-white/40",
                                    children: "Askıda (Suspended)"
                                }, void 0, false, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-2xl font-bold text-rose-400 font-mono",
                                    children: stats.suspendedTenants
                                }, void 0, false, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-white/40 font-mono",
                                    children: "Durdurulan Tenant"
                                }, void 0, false, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 155,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                            lineNumber: 152,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#0B0F1A] border border-cyan-500/15 rounded-xl overflow-hidden shadow-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 border-b border-white/10 flex items-center justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex-1 max-w-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            className: "w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Acente adı, slug veya unvan ile ara...",
                                            value: searchQuery,
                                            onChange: (e)=>setSearchQuery(e.target.value),
                                            className: "w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-500"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-white/40 font-mono",
                                    children: [
                                        "Toplam ",
                                        filteredTenants.length,
                                        " Acente Listeleniyor"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full text-xs text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        className: "bg-white/[0.02] border-b border-white/5 text-white/40 font-mono uppercase text-[10px]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-5 py-3.5",
                                                    children: "Tenant / Acente"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-5 py-3.5",
                                                    children: "Slug & ID"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-5 py-3.5",
                                                    children: "Hizmet Planı"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-5 py-3.5",
                                                    children: "Para Birimi / Dil"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-5 py-3.5",
                                                    children: "Durum"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-5 py-3.5 text-right",
                                                    children: "Detay"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 180,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                        lineNumber: 179,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        className: "divide-y divide-white/5",
                                        children: filteredTenants.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                onClick: ()=>setSelectedTenant(t),
                                                className: `hover:bg-white/[0.03] cursor-pointer transition-colors ${selectedTenant?.id === t.id ? 'bg-cyan-500/10' : ''}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-5 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs",
                                                                    style: {
                                                                        backgroundColor: (t.primary_color || '#3B82F6') + '25',
                                                                        color: t.primary_color || '#3B82F6',
                                                                        border: `1px solid ${t.primary_color || '#3B82F6'}40`
                                                                    },
                                                                    children: t.display_name.charAt(0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                                    lineNumber: 200,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "font-semibold text-white",
                                                                            children: t.display_name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                                            lineNumber: 211,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-[11px] text-white/40",
                                                                            children: t.legal_name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                                            lineNumber: 212,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                                    lineNumber: 210,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                            lineNumber: 199,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                        lineNumber: 198,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-5 py-4 font-mono text-[11px] text-white/70",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-cyan-400",
                                                            children: [
                                                                "@",
                                                                t.slug
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                            lineNumber: 218,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                        lineNumber: 217,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-5 py-4 font-mono text-xs",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "capitalize text-white/80",
                                                            children: t.plan.replace('_', ' ')
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                            lineNumber: 222,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-5 py-4 font-mono text-xs text-white/60",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: t.default_currency
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                                lineNumber: 226,
                                                                columnNumber: 23
                                                            }, this),
                                                            " · ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "uppercase",
                                                                children: t.default_language
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                                lineNumber: 226,
                                                                columnNumber: 59
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-5 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `px-2.5 py-1 rounded-full text-[10px] font-mono font-medium ${t.status === 'active' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : t.status === 'trial' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'}`,
                                                            children: t.status.toUpperCase()
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                            lineNumber: 230,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                        lineNumber: 229,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-5 py-4 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                setSelectedTenant(t);
                                                            },
                                                            className: "px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-white/70 hover:text-white transition-all font-mono",
                                                            children: "İncele"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                            lineNumber: 244,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, t.id, true, {
                                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                lineNumber: 191,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                lineNumber: 178,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this),
                selectedTenant && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#0B0F1A] border border-cyan-500/20 rounded-xl p-6 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between border-b border-white/10 pb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm",
                                            style: {
                                                backgroundColor: (selectedTenant.primary_color || '#3B82F6') + '25',
                                                color: selectedTenant.primary_color || '#3B82F6',
                                                border: `1px solid ${selectedTenant.primary_color || '#3B82F6'}40`
                                            },
                                            children: selectedTenant.display_name.charAt(0)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 266,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-base font-bold text-white",
                                                    children: selectedTenant.display_name
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-white/40 font-mono",
                                                    children: [
                                                        "ID: ",
                                                        selectedTenant.id
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 276,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 265,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSelectedTenant(null),
                                        className: "p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 287,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                        lineNumber: 283,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 282,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                            lineNumber: 264,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xs font-mono uppercase text-white/40",
                                            children: "Acente Profili"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 295,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/40 block text-[10px]",
                                                            children: "Yasal Unvan:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                            lineNumber: 298,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white font-medium",
                                                            children: selectedTenant.legal_name
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                            lineNumber: 299,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 297,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/40 block text-[10px]",
                                                            children: "Saat Dilimi:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                            lineNumber: 302,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white font-mono",
                                                            children: selectedTenant.timezone
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                            lineNumber: 303,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/40 block text-[10px]",
                                                            children: "Özel Domain:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-cyan-400 font-mono",
                                                            children: selectedTenant.domain || 'Tanımlanmadı'
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                            lineNumber: 307,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 296,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 294,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xs font-mono uppercase text-white/40",
                                            children: "Oturum Durumu"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 314,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        'active',
                                                        'trial',
                                                        'suspended'
                                                    ].map((st)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleStatusChange(selectedTenant.id, st),
                                                            className: `px-3 py-1.5 rounded-lg text-xs font-mono transition-all uppercase ${selectedTenant.status === st ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-white/50 hover:text-white'}`,
                                                            children: st
                                                        }, st, false, {
                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-white/40",
                                                    children: "Durum değişikliği aktif in-memory oturumunda anında uygulanır."
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 315,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 313,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xs font-mono uppercase text-white/40",
                                            children: "Modül Yetkileri"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 339,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs",
                                            children: Object.keys(selectedTenant.features).slice(0, 4).map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/70 font-mono text-[11px]",
                                                            children: f
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                            lineNumber: 343,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleFeatureToggle(selectedTenant.id, f),
                                                            className: `px-2 py-0.5 rounded text-[10px] font-mono ${selectedTenant.features[f] ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-white/30'}`,
                                                            children: selectedTenant.features[f] ? 'AÇIK' : 'KAPALI'
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                            lineNumber: 344,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, f, true, {
                                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                    lineNumber: 342,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                            lineNumber: 340,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                    lineNumber: 338,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                            lineNumber: 292,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                    lineNumber: 263,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$ui$2f$travel$2f$TravelDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TravelDialog"], {
                    open: isProvisionOpen,
                    onOpenChange: setIsProvisionOpen,
                    title: "Oturuma Yeni Acente Tanımla",
                    description: "Kayıt defterine oturum boyunca geçerli yeni bir acente profili ekleyin.",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleProvisionTenant,
                        className: "space-y-4 pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs text-white/70 mb-1",
                                                children: "Görünen Ad"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                lineNumber: 372,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                required: true,
                                                placeholder: "Örn: Bosphorus VIP",
                                                value: wizardData.display_name,
                                                onChange: (e)=>setWizardData({
                                                        ...wizardData,
                                                        display_name: e.target.value
                                                    }),
                                                className: "w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                lineNumber: 373,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                        lineNumber: 371,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs text-white/70 mb-1",
                                                children: "Slug / Tanımlayıcı"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                lineNumber: 384,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                required: true,
                                                placeholder: "bosphorus",
                                                value: wizardData.slug,
                                                onChange: (e)=>setWizardData({
                                                        ...wizardData,
                                                        slug: e.target.value
                                                    }),
                                                className: "w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                lineNumber: 385,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                        lineNumber: 383,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                lineNumber: 370,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs text-white/70 mb-1",
                                        children: "Yasal Şirket Unvanı"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                        lineNumber: 397,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Bosphorus Travel A.Ş.",
                                        value: wizardData.legal_name,
                                        onChange: (e)=>setWizardData({
                                                ...wizardData,
                                                legal_name: e.target.value
                                            }),
                                        className: "w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                        lineNumber: 398,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                lineNumber: 396,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs text-white/70 mb-1",
                                                children: "Hizmet Planı"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                lineNumber: 409,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: wizardData.plan,
                                                onChange: (e)=>setWizardData({
                                                        ...wizardData,
                                                        plan: e.target.value
                                                    }),
                                                className: "w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-white focus:outline-none focus:border-cyan-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "starter",
                                                        children: "Starter"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                        lineNumber: 415,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "professional",
                                                        children: "Professional"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                        lineNumber: 416,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "premium",
                                                        children: "Premium"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                        lineNumber: 417,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "enterprise",
                                                        children: "Enterprise"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                        lineNumber: 418,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                lineNumber: 410,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs text-white/70 mb-1",
                                                children: "Para Birimi"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                lineNumber: 423,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: wizardData.default_currency,
                                                onChange: (e)=>setWizardData({
                                                        ...wizardData,
                                                        default_currency: e.target.value
                                                    }),
                                                className: "w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-white focus:outline-none focus:border-cyan-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "USD",
                                                        children: "USD ($)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                        lineNumber: 429,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "EUR",
                                                        children: "EUR (€)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                        lineNumber: 430,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "AED",
                                                        children: "AED (د.إ)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                        lineNumber: 431,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "TRY",
                                                        children: "TRY (₺)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                        lineNumber: 432,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "GBP",
                                                        children: "GBP (£)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                        lineNumber: 433,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                                lineNumber: 424,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                        lineNumber: 422,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                lineNumber: 407,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-300",
                                children: "ℹ Tanımlanan acente oturum süresince tenant havuzuna eklenir."
                            }, void 0, false, {
                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                lineNumber: 438,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end gap-2 pt-2 border-t border-white/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$ui$2f$travel$2f$TravelButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TravelButton"], {
                                        variant: "outline",
                                        size: "sm",
                                        type: "button",
                                        onClick: ()=>setIsProvisionOpen(false),
                                        children: "İptal"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                        lineNumber: 443,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$crm$2f$src$2f$components$2f$ui$2f$travel$2f$TravelButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TravelButton"], {
                                        variant: "primary",
                                        size: "sm",
                                        type: "submit",
                                        children: "Acenteyi Tanımla"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                        lineNumber: 451,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                                lineNumber: 442,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                        lineNumber: 369,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
                    lineNumber: 363,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
            lineNumber: 93,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/crm/src/app/platform-admin/page.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
_s(PlatformAdminDashboard, "sGX24zYkGAsakTzM7MxVHoEbzdg=");
_c = PlatformAdminDashboard;
var _c;
__turbopack_context__.k.register(_c, "PlatformAdminDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/crm/src/lib/tenancy/tenantContext.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * TRAVEL OS — Multi-Tenant Resolution & Kernel Context Engine
 * Principle: ONE PLATFORM · MANY TRAVEL COMPANIES
 */ __turbopack_context__.s([
    "DEFAULT_FEATURES",
    ()=>DEFAULT_FEATURES,
    "DEFAULT_TENANT_ID",
    ()=>DEFAULT_TENANT_ID,
    "tenantRegistry",
    ()=>tenantRegistry
]);
const DEFAULT_FEATURES = {
    CRM: true,
    MOBILE_APP: true,
    CUSTOMER_PORTAL: true,
    CONCIERGE: true,
    AI_COPILOT: true,
    PAYMENTS: true,
    SUPPLIER_MANAGEMENT: true,
    WHITE_LABEL: true,
    CUSTOM_DOMAIN: false
};
// Initial in-memory tenant registry (synced with PostgreSQL database)
const TENANTS_STORE = {
    // Tenant #001: Travia Dubai (The founding client)
    'a0000000-0000-0000-0000-000000000001': {
        id: 'a0000000-0000-0000-0000-000000000001',
        slug: 'travia',
        legal_name: 'Travia Tourism L.L.C.',
        display_name: 'Travia Dubai',
        status: 'active',
        plan: 'founding_partner',
        timezone: 'Asia/Dubai',
        default_currency: 'AED',
        default_language: 'tr',
        logo_url: '/images/travia-logo.png',
        primary_color: '#C9A66B',
        secondary_color: '#05070F',
        domain: 'traviadubai.com',
        crm_domain: 'crm.traviadubai.com',
        customer_domain: 'vip.traviadubai.com',
        settings: {
            contact_phone: '+90 532 000 0000',
            whatsapp: '+905320000000',
            support_email: 'concierge@traviadubai.com',
            bank_name: 'Emirates NBD (Dubai, UAE)',
            iban: 'AE07 0260 0001 2345 6789 012',
            swift_bic: 'EBILAEAD',
            address: 'DIFC Gate Precinct 4, Dubai, UAE',
            invoice_prefix: 'TRV'
        },
        features: {
            ...DEFAULT_FEATURES,
            CUSTOM_DOMAIN: true
        },
        created_at: '2026-08-01T00:00:00Z',
        updated_at: '2026-08-27T12:00:00Z'
    },
    // Tenant #002: Elite Horizons VIP (Second travel company verifying multi-tenancy)
    'a0000000-0000-0000-0000-000000000002': {
        id: 'a0000000-0000-0000-0000-000000000002',
        slug: 'elite',
        legal_name: 'Elite Horizons Luxury Travel Ltd.',
        display_name: 'Elite Horizons',
        status: 'active',
        plan: 'professional',
        timezone: 'Europe/London',
        default_currency: 'USD',
        default_language: 'en',
        primary_color: '#3B82F6',
        secondary_color: '#0F172A',
        domain: 'elitehorizons.co.uk',
        crm_domain: 'crm.elitehorizons.co.uk',
        settings: {
            contact_phone: '+44 20 7946 0912',
            whatsapp: '+442079460912',
            support_email: 'vip@elitehorizons.co.uk',
            bank_name: 'HSBC Private Bank London',
            iban: 'GB29 HBUK 4012 7612 3456 78',
            swift_bic: 'HBUKGB4B',
            address: 'Mayfair, London W1K, United Kingdom',
            invoice_prefix: 'ELT'
        },
        features: {
            ...DEFAULT_FEATURES,
            AI_COPILOT: false
        },
        created_at: '2026-08-20T10:00:00Z',
        updated_at: '2026-08-27T12:00:00Z'
    },
    // Tenant #003: Azure Mediterranean (Riviera & Aegean Concierge)
    'a0000000-0000-0000-0000-000000000003': {
        id: 'a0000000-0000-0000-0000-000000000003',
        slug: 'azure',
        legal_name: 'Azure Yachting & Concierge SAS',
        display_name: 'Azure Riviera',
        status: 'trial',
        plan: 'starter',
        timezone: 'Europe/Paris',
        default_currency: 'EUR',
        default_language: 'en',
        primary_color: '#06B6D4',
        secondary_color: '#082F49',
        domain: 'azure-riviera.com',
        settings: {
            contact_phone: '+33 4 93 00 00 00',
            whatsapp: '+33493000000',
            support_email: 'captain@azure-riviera.com',
            bank_name: 'BNP Paribas Monaco',
            iban: 'FR76 3000 4000 0100 2345 6789 012',
            swift_bic: 'BNPAFR2A',
            address: 'Port Hercule, Monaco',
            invoice_prefix: 'AZR'
        },
        features: {
            ...DEFAULT_FEATURES,
            PAYMENTS: false,
            AI_COPILOT: false
        },
        created_at: '2026-08-25T14:00:00Z',
        updated_at: '2026-08-27T12:00:00Z'
    }
};
const DEFAULT_TENANT_ID = 'a0000000-0000-0000-0000-000000000001';
class TenantRegistry {
    tenants;
    constructor(){
        this.tenants = new Map(Object.entries(TENANTS_STORE));
    }
    getAllTenants() {
        return Array.from(this.tenants.values());
    }
    getTenantById(id) {
        if (!id) return this.tenants.get(DEFAULT_TENANT_ID);
        return this.tenants.get(id) || this.tenants.get(DEFAULT_TENANT_ID);
    }
    getTenantBySlug(slug) {
        for (const tenant of this.tenants.values()){
            if (tenant.slug.toLowerCase() === slug.toLowerCase()) return tenant;
        }
        return null;
    }
    getTenantByDomain(domain) {
        const cleanDomain = domain.toLowerCase().replace(/:\d+$/, '');
        for (const tenant of this.tenants.values()){
            if (tenant.domain?.toLowerCase() === cleanDomain || tenant.crm_domain?.toLowerCase() === cleanDomain || tenant.customer_domain?.toLowerCase() === cleanDomain) {
                return tenant;
            }
        }
        return null;
    }
    resolveTenantFromHost(host) {
        // 1. Check exact custom domain
        const match = this.getTenantByDomain(host);
        if (match) return match;
        // 2. Check subdomain: e.g. "elite.travelos.com" or "azure.localhost:3000"
        const parts = host.split('.');
        if (parts.length > 1) {
            const subdomain = parts[0];
            const bySubdomain = this.getTenantBySlug(subdomain);
            if (bySubdomain) return bySubdomain;
        }
        // 3. Fallback to default founding tenant
        return this.getTenantById(DEFAULT_TENANT_ID);
    }
    createTenant(input) {
        const newId = `t-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
        const newTenant = {
            id: newId,
            slug: input.slug.toLowerCase(),
            legal_name: input.legal_name,
            display_name: input.display_name,
            status: 'active',
            plan: input.plan,
            timezone: input.timezone || 'Asia/Dubai',
            default_currency: input.default_currency || 'USD',
            default_language: input.default_language || 'en',
            primary_color: input.primary_color || '#C9A66B',
            secondary_color: input.secondary_color || '#05070F',
            domain: input.custom_domain,
            settings: {
                support_email: input.admin_email,
                invoice_prefix: input.slug.slice(0, 3).toUpperCase()
            },
            features: {
                ...DEFAULT_FEATURES,
                AI_COPILOT: input.plan === 'enterprise' || input.plan === 'founding_partner',
                CUSTOM_DOMAIN: Boolean(input.custom_domain)
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        this.tenants.set(newId, newTenant);
        return newTenant;
    }
    updateTenant(tenantId, update) {
        const tenant = this.getTenantById(tenantId);
        const updated = {
            ...tenant,
            ...update,
            settings: {
                ...tenant.settings,
                ...update.settings || {}
            },
            features: {
                ...tenant.features,
                ...update.features || {}
            },
            updated_at: new Date().toISOString()
        };
        this.tenants.set(tenantId, updated);
        return updated;
    }
    updateTenantStatus(tenantId, status) {
        const tenant = this.getTenantById(tenantId);
        tenant.status = status;
        tenant.updated_at = new Date().toISOString();
        this.tenants.set(tenantId, tenant);
        return tenant;
    }
    toggleTenantFeature(tenantId, feature, isEnabled) {
        const tenant = this.getTenantById(tenantId);
        tenant.features[feature] = isEnabled;
        tenant.updated_at = new Date().toISOString();
        this.tenants.set(tenantId, tenant);
        return tenant;
    }
    getPlatformStats() {
        const all = this.getAllTenants();
        return {
            totalTenants: all.length,
            activeTenants: all.filter((t)=>t.status === 'active').length,
            trialTenants: all.filter((t)=>t.status === 'trial').length,
            suspendedTenants: all.filter((t)=>t.status === 'suspended').length,
            plansBreakdown: {
                starter: all.filter((t)=>t.plan === 'starter').length,
                professional: all.filter((t)=>t.plan === 'professional').length,
                premium: all.filter((t)=>t.plan === 'premium').length,
                enterprise: all.filter((t)=>t.plan === 'enterprise').length,
                founding_partner: all.filter((t)=>t.plan === 'founding_partner').length
            }
        };
    }
}
const tenantRegistry = new TenantRegistry();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_crm_src_0wjav77._.js.map