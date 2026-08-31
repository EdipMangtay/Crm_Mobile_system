# MIGRATION BASELINE

## Repository Structure
- Single monolithic workspace under root
- Next.js root application (`src/app/`, `src/components/`, etc.)
- Expo mobile application (`mobile/`)
- Shared configs and dependencies in root `package.json`

## Routes
**Website Routes:**
- `/` (Public Homepage)
- `/experiences/[slug]`

**CRM Routes:**
- `/crm`
- `/crm/analytics`
- `/crm/bookings`
- `/crm/concierge`
- `/crm/customers`, `/crm/customers/[id]`
- `/crm/design-system`
- `/crm/experiences`
- `/crm/leads`, `/crm/leads/[id]`
- `/crm/login`
- `/crm/marketing`
- `/crm/operations`
- `/crm/payments`
- `/crm/requests`
- `/crm/settings`
- `/crm/suppliers`
- `/crm/tasks`
- `/crm/team`
- `/crm/trips`, `/crm/trips/[id]`

**Platform Admin Routes:**
- `/platform-admin`

**API Routes:**
- `/api/v1/customers`
- `/api/v1/leads`
- `/api/v1/trips`
- `/api/v1/tenants`
- `/api/v1/mobile/config`
- `/api/communication/threads`, `/api/communication/threads/[threadId]`
- `/api/website/contact`

**Mobile Route Structure:**
- Expo Router (`mobile/app/`)

## Environment Variables
- Standard Next.js `.env` variables required (to be split in Phase K).

## Validation Results
**ROOT (Next.js):**
- `npm run lint`: Passed with 8 warnings related to TanStack Table `useReactTable` safe memoization (React Compiler compatibility).
- `npm run build`: Passed successfully.

**MOBILE (Expo):**
- `npx tsc --noEmit`: Passed with 0 errors.

## Visual Baseline Checks (Manual QA Required)
- Representative PUBLIC WEBSITE UI matches pre-migration.
- Representative CRM routes (e.g., `/crm/customers`, `/crm/trips`, `/platform-admin`) display the approved UI.
- All CRM navigation, shells, tables, Cmd+K, sheets remain unaffected.
