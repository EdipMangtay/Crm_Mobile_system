# REPOSITORY MIGRATION MAP

## Website Application (Owner: Website)
| CURRENT PATH | OWNER | TARGET PATH | DEPENDENTS | ACTION |
|---|---|---|---|---|
| `src/app/page.tsx` | Website | `apps/website/src/app/page.tsx` | None | COPY-FIRST |
| `src/app/experiences/` | Website | `apps/website/src/app/experiences/` | Website | COPY-FIRST |
| `src/app/api/website/` | Website | `apps/website/src/app/api/website/` | Website | COPY-FIRST |
| `src/app/layout.tsx` | Website/CRM | `apps/website/src/app/layout.tsx` | Website | COPY-FIRST (Duplicate) |
| `src/app/globals.css` | Website/CRM | `apps/website/src/app/globals.css` | Website | COPY-FIRST (Duplicate) |
| `src/components/ui/` | Shared | `apps/website/src/components/ui/` | Website/CRM | COPY-FIRST (Duplicate needed) |
| `public/` | Shared | `apps/website/public/` | Website | COPY-FIRST (Filter) |

## CRM Application (Owner: CRM)
| CURRENT PATH | OWNER | TARGET PATH | DEPENDENTS | ACTION |
|---|---|---|---|---|
| `src/app/crm/` | CRM | `apps/crm/src/app/crm/` | CRM | COPY-FIRST |
| `src/app/platform-admin/` | CRM | `apps/crm/src/app/platform-admin/` | CRM | COPY-FIRST |
| `src/app/api/v1/` | CRM | `apps/crm/src/app/api/v1/` | CRM/Mobile | COPY-FIRST |
| `src/app/api/communication/`| CRM | `apps/crm/src/app/api/communication/` | CRM | COPY-FIRST |
| `src/middleware.ts` | CRM | `apps/crm/src/middleware.ts` | CRM | COPY-FIRST |
| `src/components/crm/` | CRM | `apps/crm/src/components/crm/` | CRM | COPY-FIRST |
| `crm/` (root) | CRM | `apps/crm/src/crm/` (temp alias) | CRM | COPY-FIRST |
| `shared/` (root) | CRM | `apps/crm/src/shared/` (temp alias) | CRM | COPY-FIRST |
| `src/hooks/` | CRM | `apps/crm/src/hooks/` | CRM | COPY-FIRST |
| `src/lib/` | CRM | `apps/crm/src/lib/` | CRM | COPY-FIRST |
| `src/types/` | CRM | `apps/crm/src/types/` | CRM | COPY-FIRST |

## Mobile Application (Owner: Mobile)
| CURRENT PATH | OWNER | TARGET PATH | DEPENDENTS | ACTION |
|---|---|---|---|---|
| `mobile/` | Mobile | `apps/mobile/` | Mobile | MOVE-LATER |
| `mobile/supabase/` | Supabase | `infra/supabase/` | Infra | COPY-FIRST |

## Root Configuration
| CURRENT PATH | OWNER | TARGET PATH | DEPENDENTS | ACTION |
|---|---|---|---|---|
| `package.json` | Monorepo | `package.json` | All | MOVE-LATER (Rewrite as workspace) |
| `.env.example` | Monorepo | `apps/website/.env.example`, `apps/crm/.env.example`, `apps/mobile/.env.example` | All | COPY-FIRST |

## Legacy Aliases / Compatibility Shims
| CURRENT PATH | OWNER | TARGET PATH | DEPENDENTS | ACTION |
|---|---|---|---|---|
| `crm/` | CRM | `apps/crm/src/...` | CRM | DELETE-ONLY-AFTER-VALIDATION |
| `shared/` | Shared | `apps/crm/src/...` | CRM | DELETE-ONLY-AFTER-VALIDATION |
| `src/` (old) | Old | Delete | None | DELETE-ONLY-AFTER-VALIDATION |
