# TravelOS — Architecture

TravelOS is a **npm-workspace monorepo**. Each application owns its source, dependencies, and runtime. They do not import each other’s source.

## Applications

| App | Path | Local URL | Owns |
|---|---|---|---|
| Public website | `apps/website` | http://localhost:3000 | Landing page, experience pages, `POST /api/website/contact` |
| CRM + backend API | `apps/crm` | http://localhost:3001 | `/crm/*`, `/platform-admin`, `/api/v1/*`, `/api/communication/*` |
| Mobile (Expo) | `apps/mobile` | Expo / Metro (normally 8081) | iOS + Android customer/staff app |
| Supabase SQL | `infra/supabase/migrations` | — | Canonical migrations `001`–`007` |

## Production topology (future)

- Public website domain → `apps/website`
- CRM / API domain → `apps/crm`
- iOS + Android → `apps/mobile`

Do not serve `/crm` from the public website host. Do not serve `/api/v1` from the website process.

## Local development

From the repository root:

```bash
npm ci                 # or npm install
npm run dev            # Website :3000 + CRM :3001
npm run dev:website    # Website only :3000
npm run dev:crm        # CRM + API only :3001
npm run dev:mobile     # Expo
npm run dev:web        # same as npm run dev
npm run dev:all        # Website + CRM + Expo
```

### Environment URLs

Website (`apps/website/.env.local`):

```
NEXT_PUBLIC_WEBSITE_URL=http://localhost:3000
NEXT_PUBLIC_CRM_URL=http://localhost:3001
CRM_INTERNAL_URL=http://localhost:3001
```

`CRM_INTERNAL_URL` is **server-only**. The browser submits contact forms to the website. The website then calls CRM `/api/v1/leads` over HTTP.

CRM (`apps/crm/.env.local`):

```
NEXT_PUBLIC_CRM_URL=http://localhost:3001
NEXT_PUBLIC_WEBSITE_URL=http://localhost:3000
```

Mobile (`apps/mobile/.env`):

```
EXPO_PUBLIC_API_URL=http://localhost:3001
```

Production mobile builds must use the deployed CRM HTTPS origin. Do not point this at the public website.

## Cross-app rules

- `apps/website` never imports `apps/crm` source.
- `apps/crm` never imports `apps/website` source.
- `apps/mobile` never imports web components.
- Website public APIs stay on the website (`/api/website/*`).
- Product APIs stay on CRM (`/api/v1/*`, `/api/communication/*`).

## Lead pipeline (website contact)

```
Browser
  → POST http://localhost:3000/api/website/contact
  → server-side HTTP
  → POST http://localhost:3001/api/v1/leads
  → CRM leadService
```

## Mobile store identity (release TODO)

The Expo app currently has **no** `ios.bundleIdentifier` and **no** `android.package`. That is pre-existing and must **not** be invented during local development.

Before App Store / Google Play production configuration, explicitly choose:

- iOS bundle identifier
- Android application ID

Local Expo startup does not require those values.

## Auth

CRM middleware protects `/crm` (except `/crm/login`) and `/platform-admin`. Local demo fail-open is unchanged and is not production hardening.
