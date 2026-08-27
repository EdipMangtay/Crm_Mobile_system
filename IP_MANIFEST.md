# TRAVEL OS — INTELLECTUAL PROPERTY MANIFEST
**Platform Name:** TravelOS (Multi-Tenant Travel Operating System)  
**Initial Deployment Tenant:** Travia Dubai / Furkan (Tenant #001)  
**Document Version:** 1.0.0  
**Date:** August 27, 2026

---

## 1. Classification of Software Assets

The TravelOS codebase contains three distinct classes of assets. This manifest formally demarcates proprietary platform assets, third-party open-source libraries, and client-specific assets.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          TRAVEL OS CODEBASE                            │
├───────────────────────────────────┬────────────────────────────────────┤
│       PROPRIETARY ASSETS          │       THIRD-PARTY / OPEN-SOURCE    │
│  • Multi-Tenant Architecture      │  • React, Next.js, React Native    │
│  • CRM Engine & Domain Services   │  • Three.js, Lucide Icons, Expo    │
│  • Concierge Communication Hub    │  • Zustand, Supabase JS, Tailwind  │
│  • Platform Admin Management      ├────────────────────────────────────┤
│  • Dynamic Proposal Generator     │       CLIENT-SPECIFIC ASSETS       │
│  • Operations Dispatch Matrix     │  • Tenant #001 (Travia) Logos      │
│  • Multi-Tier Security RLS Engine │  • Client Customer & Trip Records  │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 2. Proprietary Platform Components (TravelOS Core IP)

The following modules, domain designs, schemas, algorithms, and service architectures constitute the proprietary intellectual property of the TravelOS platform owner:

### 2.1 Multi-Tenant Core Architecture
- **Tenant Context Resolution Engine (`@/tenancy`):** Safe server-side identification via custom domain, subdomain, session cookies, and JWT claims.
- **Tenant Isolation RLS Policies (`007_travel_os_multitenancy.sql`):** PostgreSQL database functions (`current_tenant_id()`, `has_tenant_role()`) preventing cross-tenant data leakage.
- **Platform Admin Control Plane (`/platform-admin`):** Tenant provisioning wizard, subscription lifecycle manager, module toggles, and tenant health monitoring.
- **Dynamic White-Label Theme Engine:** Runtime resolution of logos, primary/secondary colors, fonts, currency formatters, and contact channels.

### 2.2 Travel CRM & Operations Engines
- **Trip & Itinerary Lifecycle State Machine:** Multi-day visual travel scheduling, activity sequencing, and voucher coordination.
- **Supplier Margin Protection Layer:** Architectural isolation guaranteeing that supplier costs, markups, and internal commission margins are strictly inaccessible to customer endpoints.
- **Printable Proposal & Itinerary Engine:** Client-side vector-styled PDF and brochure generator with dynamic currency and bank wire details.
- **Operations & Chauffeur Dispatch Grid:** Status tracking for airport meet-and-greets, chauffeur assignments, and flight monitoring.
- **AI Concierge Copilot Framework:** Template-based and generative prompt engineering for rapid guest inquiry resolution.

### 2.3 Event-Ready Domain Services
- **Modular Monolith Service Layer (`@/services`):** `TenantService`, `CustomerService`, `TripService`, `BookingService`, `ConciergeService`, `PaymentService`, and `LeadService`.
- **In-Process Domain Event Bus:** Decoupled event dispatcher (`LeadCreated`, `TripCreated`, `PaymentReceived`, `CustomerMessageReceived`) ready for transactional outbox pattern.

---

## 3. Third-Party Dependencies (Open-Source Attribution)

All third-party libraries and runtime dependencies are licensed under permissive open-source licenses (MIT, Apache 2.0, BSD-3-Clause). TravelOS does NOT claim ownership of any third-party framework or utility. See [`THIRD_PARTY_NOTICES.md`](file:///Users/mangtay/trivia/THIRD_PARTY_NOTICES.md) for full licensing texts.

---

## 4. Client-Specific Materials (Tenant Assets)

The following assets belong strictly to Tenant #001 (Travia Dubai / Furkan) and subsequent tenant companies:
- Company legal names, trademarks, and trade names.
- Brand logos, custom typography assets, and favicon files.
- Proprietary customer lists, PII, WhatsApp conversation histories, and passport documents.
- Proprietary supplier contracts, negotiated rates, and cost structures.
- Client promotional imagery and photography stored in `/public/images/`.

Tenant customer data remains the exclusive property of each respective tenant company. TravelOS provides data portability, tenant-level CSV/JSON exports, and retention management.
