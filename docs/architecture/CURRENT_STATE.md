# TRAVEL OS — Current State Architectural Audit
**Document ID:** `ARCH-AUDIT-001`  
**Date:** August 27, 2026  
**Author:** Principal SaaS Architect & Staff Backend Engineer  
**System Transition:** `Travia_system` (Single-Tenant Silo) → `TRAVEL OS` (Multi-Tenant SaaS Platform)

---

## 1. Executive Summary

The existing repository `EdipMangtay/Travia_system` was initially engineered as an operating system exclusively dedicated to **Travia Dubai** (a luxury concierge and inbound tourism agency in the UAE). While it features high visual fidelity, 24 Next.js App Router routes, an Expo mobile application, and a shared data layer, its domain models and client components are tightly coupled to a single entity.

This audit evaluates the codebase across 11 critical technical dimensions to establish a risk-free, non-destructive migration pathway toward **TravelOS**: a proprietary multi-tenant travel SaaS platform where Travia Dubai serves simply as Tenant #001.

---

## 2. Current System Architecture

The current repository is structured as a monolithic repository with four demarcated layers:

```
trivia/
├── crm/                    # Modular CRM core (components, views, types, utils)
├── mobile/                 # Expo React Native customer and staff mobile app
├── shared/                 # Shared data repository singleton and domain models
├── src/                    # Next.js 16 App Router (Web landing, CRM route delegates, API endpoints)
└── mobile/supabase/        # Supabase migrations (001 to 006)
```

### Architectural Characteristics:
- **Framework:** Next.js 16.3.3 (Turbopack, App Router, React 19).
- **Mobile:** Expo SDK 52, Expo Router, React Native with Zustand state management.
- **State Management:** Local client-side stores (`traviaStore.ts`, `authStore.ts`) with in-memory singleton fallback (`shared/data/traviaData.ts`).
- **Communication:** Isolated user-based threads (`thread-edip`, `thread-ahmet`, `thread-canan`, `thread-hans`) managed through `/api/communication/threads`.

---

## 3. Database Schema & Multi-Tenancy Analysis

### Existing Migrations (`mobile/supabase/migrations/`):
- `001_schema.sql`: Core tables (`companies`, `profiles`, `customers`, `trips`, `bookings`, `customer_requests`, `messages`, `payments`, `documents`, `audit_logs`).
- `002_rls.sql`: Row-Level Security policies for customers and staff.
- `003_functions.sql`: Triggers for timestamps and user profile auto-creation.
- `004_seed.sql`: Seed data for Company `a0000000-0000-0000-0000-000000000001` (Travia Dubai).
- `005_crm_schema.sql`: Extensions for CRM entities (`leads`, `proposals`, `suppliers`, `tasks`).
- `006_crm_rls.sql`: Anti-privilege escalation RLS hardening.

### Current `company_id` Usage & Limitations:
1. **Direct `company_id` Foreign Key:**
   Tables (`customers`, `trips`, `bookings`, `leads`, `suppliers`, `profiles`) contain a `company_id UUID REFERENCES companies(id)`.
2. **Missing `tenant_memberships` Mapping:**
   `profiles.company_id` enforces a rigid 1:1 relationship between a user and a company. A staff member or consultant cannot belong to multiple travel agencies without duplicate accounts.
3. **Incomplete Company Metadata:**
   The `companies` table contains only `id`, `name`, `slug`, `logo_url`, `settings`. It lacks crucial SaaS attributes: `legal_name`, `display_name`, `status`, `plan`, `timezone`, `default_currency`, `default_language`, `domain`, `crm_domain`, `customer_domain`, and branding color overrides.
4. **No Feature Flagging Engine:**
   No table exists to gate modules (e.g. VIP Concierge, AI Copilot, White Label, Payment Gateway) based on a tenant's subscription tier.

---

## 4. CRM Structure Assessment

The CRM resides in `crm/` and is mounted via Next.js route delegators in `src/app/crm/`:
- **Shell:** Sidebar, Header with live Dubai time (`Asia/Dubai`), Command Palette (`⌘K`), Notifications.
- **Views (20 Modules):** Overview Dashboard, Leads Kanban/Table, Lead 360, Customers, Customer 360, Trips, Trip Details, Bookings, Operations, Concierge Messaging, Customer Requests, Payments Ledger, Suppliers, Experiences, Marketing ROAS, Team, Tasks, Settings, Login.
- **Strengths:** High UX quality, financial margin protection logic (staff sees net cost and markup; customers see only gross total), printable proposal generator.
- **Weaknesses:** Currency is hard-coded to `AED` across views; timezone is hard-coded to `Asia/Dubai`; company name is hard-coded to `TRAVIA DUBAI`.

---

## 5. Mobile Application Structure

The mobile application (`mobile/`) utilizes Expo Router:
- **Routes:**
  - `/(auth)/login`, `/(auth)/register`, `/(auth)/change-password`
  - `/(customer)/index` (Dashboard), `trip`, `concierge`, `explore`, `profile`
  - `/(staff)/operations`, `customers`, `messages`, `menu`
- **Strengths:** Premium midnight-gold palette (`#05070F` / `#C9A66B`), customer-to-staff role switching, offline fallback mock data.
- **Weaknesses:** Reads hard-coded Travia customer UUIDs (`d0000000-0000-0000-0000-000000000001`); logo and splash assets are Travia-specific; no runtime tenant configuration bootstrap.

---

## 6. Authentication & Authorization

- **Client Auth:** Supabase Auth (`supabase.auth.signInWithPassword()`).
- **Server Middleware:** `src/middleware.ts` inspects session cookies and checks `profiles.role` (`admin`, `concierge`, `operations` vs `customer`).
- **Flaw:** Only checks role string in `profiles`. There is no concept of Platform Roles (`platform_owner`, `platform_admin`) vs Tenant Roles (`owner`, `admin`, `sales`, `concierge`, `operations`). Platform administrative access does not exist yet.

---

## 7. Security & Tenant Isolation Audit

| Area | Current Implementation | Risk / Vulnerability | Target Requirement |
| :--- | :--- | :--- | :--- |
| **Tenant Identification** | Implicit `company_id` on records | Client queries can theoretically omit `company_id` if RLS policy is bypassed | Mandatory server-side `TenantContext` + RLS `tenant_id = current_tenant_id()` |
| **User Memberships** | Single `profiles.company_id` | Privilege escalation across companies; no multi-tenant users | Separate `tenant_memberships` table with role per tenant |
| **API Endpoints** | `/api/communication/threads` returns all threads | No tenant scoping on thread lists | Enforce `tenant_id` resolution from authenticated session |
| **Margin Protection** | UI-level conditional rendering | If API returns supplier cost, malicious client can view margins | Database & API serialization stripping of supplier costs for non-staff |
| **Platform Roles** | None | Tenant admin could theoretically access platform configuration | Strict separation: `platform_users` cannot be accessed by tenant admins |

---

## 8. Hardcoded Travia-Specific Coupling

The following elements must be abstracted into tenant configuration:
1. **Brand Identity:**
   - `"TRAVIA DUBAI"` text in headers, proposals, footer, and emails.
   - Primary Gold Palette (`#C9A66B`, `#E8C77A`) and Navy (`#05070F`).
   - Default currency: `AED` (must support `USD`, `EUR`, `TRY`, `GBP`, `SAR`).
   - Default timezone: `Asia/Dubai` (must support global agency timezones).
2. **Fixed Tenant Identifiers:**
   - Company ID: `'a0000000-0000-0000-0000-000000000001'`.
   - Bank details: `Emirates NBD (Dubai, UAE)` in `ProposalModal.tsx`.
   - Contact numbers: `+90 532 000 0000` in WhatsApp buttons.
3. **Public Landing Page:**
   - Dubai skyline 3D particle hero and Palm Jumeirah references. (The marketing website will serve as Tenant #001's customer portal, while TravelOS provides a white-label client portal).

---

## 9. Reusable Proprietary Platform Assets

The following existing components represent core platform Intellectual Property:
1. **Travel Domain Models:** Universal models for Customers, Trips, Day-by-day Itineraries, Bookings, Operations, and Supplier Vouchers.
2. **Concierge Engine:** Isolated multi-thread messaging with AI Copilot templates.
3. **Proposal & Voucher Engine:** High-resolution printable PDF/brochure generator.
4. **Operations Matrix:** Dispatcher dashboard for transfers, drivers, and flights.
5. **Excel/CSV Export Engine:** Client-side UTF-8 BOM spreadsheet generator.
6. **Luxury UI Design System:** Custom glassmorphic tokens, badges, KPI cards, and command palette.

---

## 10. Technical Debt & Migration Risks

1. **Monolithic Directory Transitions:** Renaming or relocating directories precipitously could break existing imports and Vercel/Expo build pipelines. **Mitigation:** Refactor incrementally using path aliases (`@/tenancy`, `@/core`, `@/crm`) while keeping existing routes functioning.
2. **Next.js 16 Deprecations:** `middleware.ts` convention is marked for migration to `proxy.ts`. **Mitigation:** Ensure middleware logic remains backward-compatible.
3. **Data Loss During Multi-Tenant Migration:** Existing Travia trips and customer records must retain continuity. **Mitigation:** Migration scripts will map `company_id` to `tenant_id` and assign all existing data to Tenant #001 (`travia`).

---

## 11. Conclusion & Next Architectural Steps

The foundation is exceptionally solid. The transition to **TravelOS** does not require rewriting the system; rather, it requires:
1. Formalizing the **Tenancy Model** (`tenants`, `tenant_memberships`, `tenant_features`).
2. Hardening **Tenant Isolation** across RLS, server authorization, and API routes.
3. Creating the **Platform Admin** product (`/platform-admin`).
4. Creating **Domain Service Layers** and an **In-Process Event Bus**.
5. Establishing **White-Label Configuration** so any new agency can be onboarded in minutes without touching application code.
