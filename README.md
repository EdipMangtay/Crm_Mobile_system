# 👑 TRAVIA DUBAI — Luxury Tourism & Operating System

TRAVIA DUBAI, kişiye özel VIP turizm, özel yat kiralama, çöl safarisi, helikopter turları ve lüks seyahat deneyimleri sunan entegre bir seyahat işletim sistemidir (Travel OS).

---

## Mimari

Uygulamalar ayrı process’lerde çalışır. Detay: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

| Uygulama | Dizin | Yerel adres |
|---|---|---|
| Public website | `apps/website` | http://localhost:3000 |
| CRM + backend API | `apps/crm` | http://localhost:3001 |
| Mobile (Expo) | `apps/mobile` | Expo / Metro (genelde 8081) |

Gelecek üretim topolojisi:

- Website domain → `apps/website`
- CRM / API domain → `apps/crm`
- iOS + Android → `apps/mobile`

---

## Başlarken

```bash
npm ci
# veya
npm install
```

Geliştirme:

```bash
npm run dev            # Website :3000 + CRM :3001
npm run dev:website    # yalnız Website
npm run dev:crm        # yalnız CRM / API
npm run dev:mobile     # Expo
```

- Landing: http://localhost:3000
- Deneyimler: http://localhost:3000/experiences/yacht-sunset
- CRM: http://localhost:3001/crm (giriş: `/crm/login`)
- Platform Admin: http://localhost:3001/platform-admin
- Backend: http://localhost:3001/api/...

Website iletişim formu tarayıcıdan CRM’e gitmez. `POST /api/website/contact` sunucu tarafında CRM `POST /api/v1/leads` çağırır.

---

## Derleme

```bash
npm run lint:website
npm run build:website
npm run lint:crm
npm run build:crm
npm run typecheck:mobile
```
