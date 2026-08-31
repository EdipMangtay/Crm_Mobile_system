# 🏛️ TRAVIA DUBAI — Mimari ve Geliştirici Kılavuzu (Architecture Guide)

Bu doküman, projenin modüler dosya yapısını, katmanlarını, dizin standartlarını ve yeni özellik/sayfa ekleme yöntemlerini açıklar.

---

## 📂 Proje Dizin Haritası

```
trivia/
├── src/
│   ├── app/                         # Next.js App Router (Rotalar ve API Uç Noktaları)
│   │   ├── page.tsx                 # Public Lüks Landing Sayfası
│   │   ├── layout.tsx               # Kök Web Layout (Fontlar, Metadata, Lenis)
│   │   ├── globals.css              # Global CSS & Tailwind Tasarım Belirteçleri
│   │   │
│   │   ├── crm/                     # 🏢 CRM Panel Rotaları
│   │   │   ├── page.tsx             # CRM Dashboard & KPI Özeti
│   │   │   ├── layout.tsx           # CRM Shell Layout (Sidebar, Header, Cmd+K)
│   │   │   ├── login/               # Personel Giriş Sayfası
│   │   │   ├── customers/           # Müşteriler Tablosu & [id] Müşteri 360 Detay Sayfası
│   │   │   ├── leads/               # Adaylar (Kanban & Tablo) & [id] Lead Detay Sayfası
│   │   │   ├── trips/               # Geziler Listesi & [id] Seyahat İtinerary Detay Sayfası
│   │   │   ├── bookings/            # Rezervasyon Kalemleri & Tedarikçi Maliyetleri
│   │   │   ├── operations/          # Canlı Günlük Operasyon Takibi & Şoför Sevk
│   │   │   ├── concierge/           # Canlı Misafir Mesajlaşma (Concierge Chat)
│   │   │   ├── experiences/         # Deneyim Kataloğu & Satış Fiyatları
│   │   │   ├── suppliers/           # Tedarikçiler Rehberi & Ödeme Vadeleri
│   │   │   ├── marketing/           # Pazarlama Harcamaları & ROAS Analizi
│   │   │   ├── payments/            # Ödeme Linkleri & Tahsilat Defteri
│   │   │   ├── tasks/               # Personel Görevleri & Checklist
│   │   │   ├── team/                # Ekip & RBAC Yetkilendirme
│   │   │   ├── analytics/           # Yönetici Finans ve Büyüme Raporları
│   │   │   └── settings/            # Veritabanı ve Para Birimi Ayarları
│   │   │
│   │   ├── platform-admin/          # 🌐 Multi-tenant Platform Admin Paneli
│   │   ├── experiences/[slug]/      # 🌟 Deneyim Detay & Rezervasyon Sayfası
│   │   └── api/                     # 🔌 REST API Rotaları
│   │       ├── v1/                  # Public & Mobile API (customers, leads, trips, tenants)
│   │       ├── communication/       # Gerçek Zamanlı Mesajlaşma API'si
│   │       └── website/             # Web İletişim & Talep API'si
│   │
│   ├── components/                  # 🧩 Modüler Bileşen Kütüphanesi
│   │   ├── index.ts                 # Genel Bileşen Barrel Export
│   │   │
│   │   ├── website/                 # 🌐 Public Web Sitesi Bileşenleri
│   │   │   ├── index.ts             # Web Bileşenleri Barrel Export
│   │   │   ├── Hero/                # HeroSection, HeroContent, ParticleScene (Three.js)
│   │   │   ├── planner/             # TripPlannerWizard (Adım Adım Gezi Sihirbazı)
│   │   │   ├── ui/                  # Web UI (WhatsAppButton, CustomCursor, AmbientDust, SplitText)
│   │   │   ├── Navbar.tsx           # Glassmorphic Üst Menü
│   │   │   ├── Footer.tsx           # Alt Bilgi & Hızlı Linkler
│   │   │   ├── BrandStats.tsx       # Sayaçlı Başarı İstatistikleri
│   │   │   ├── About.tsx            # Hikayemiz & Değerlerimiz
│   │   │   ├── Services.tsx         # VIP Turlar & Hizmetler
│   │   │   ├── Process.tsx          # 4 Adımlı Hizmet Süreci
│   │   │   ├── FAQ.tsx              # Sıkça Sorulan Sorular (Akordiyon)
│   │   │   ├── Gallery.tsx          # Lüks Fotoğraf Galerisi
│   │   │   └── Contact.tsx          # VIP İletişim Formu & WhatsApp
│   │   │
│   │   └── crm/                     # 🏢 Tüm CRM Bileşenleri (Tek Çatı Altında)
│   │       ├── index.ts             # CRM Bileşenleri Barrel Export
│   │       ├── ui/                  # Badge, KPICard, EmptyState, LoadingSkeleton
│   │       ├── shell/               # Sidebar, Header, CommandPalette (Cmd+K)
│   │       ├── payments/            # PaymentLinkModal (3D Secure Link & QR)
│   │       ├── proposal/            # ProposalModal (Yazdırılabilir VIP İtinerary PDF)
│   │       ├── concierge/           # SmartReplies (AI Copilot Yanıt Şablonları)
│   │       └── views/               # ConciergeView (Müşteri Mesajlaşma Görünümü)
│   │
│   ├── lib/                         # ⚙️ Çekirdek İş Mantığı, Servisler ve Yardımcılar
│   │   ├── index.ts                 # Lib Barrel Export
│   │   ├── constants.ts             # Renkler, İletişim, Menüler, SSS Verileri
│   │   ├── utils/                   # exportCsv, formatCurrency ve genel yardımcılar
│   │   ├── services/                # Domain Servisleri (customerService, tripService, leadService, eventBus)
│   │   ├── tenancy/                 # Multi-tenant Context ve TenantProvider
│   │   ├── supabase/                # client.ts, server.ts, middleware.ts (Supabase Bağlantısı)
│   │   └── i18n/                    # Çoklu Dil & Çeviriler
│   │
│   ├── types/                       # 🏷️ Merkezi TypeScript Tipleri
│   │   ├── index.ts                 # Tek Noktadan Tip Exportu (`import { ... } from '@/types'`)
│   │   ├── crm.ts                   # CRM'e Özel Tipler, Enumlar, Roller, İzinler
│   │   └── models.ts                # Çekirdek Domain Modelleri (Customer, Trip, Booking, Tenant)
│   │
│   ├── hooks/                       # 🪝 Özel React Hook'ları (useSmoothScroll, useDevicePerformance)
│   └── middleware.ts                # Next.js Route Koruması (CRM & Admin Auth)
│
├── shared/                          # Geriye dönük uyumluluk katmanı (@/shared/*)
├── crm/                             # Geriye dönük uyumluluk katmanı (@/crm/*)
└── mobile/                          # React Native / Expo Mobil Uygulama Projesi
```

---

## 🚀 Yeni Özellik / Sayfa Ekleme Rehberi

### 1. Yeni Bir CRM Sayfası Nasıl Eklenir?
1. `src/app/crm/` altında yeni klasör ve sayfa dosyanızı oluşturun:
   - Örnek: `src/app/crm/invoices/page.tsx`
2. CRM bileşenlerini ve tipleri doğrudan merkezi yollardan içe aktarın:
   ```tsx
   'use client';
   import { useState } from 'react';
   import { Badge, KPICard } from '@/components/crm';
   import { formatCurrency, Customer } from '@/types';
   import { exportToCsv } from '@/lib/utils';

   export default function InvoicesPage() {
     return (
       <div className="space-y-5 max-w-[1600px]">
         <h1 className="text-xl font-semibold text-[#F5F1E8]">Faturalar</h1>
         {/* İçerik */}
       </div>
     );
   }
   ```
3. Sidebar menüsüne eklemek için:
   - `src/components/crm/shell/Sidebar.tsx` dosyasına menü öğesini ekleyin.

---

### 2. Yeni Bir Web Sitesi Bölümü Nasıl Eklenir?
1. `src/components/` altında yeni bileşeninizi oluşturun (Örn: `src/components/Reviews.tsx`).
2. `src/components/website/index.ts` dosyasına export ekleyin:
   ```ts
   export { default as Reviews } from '../Reviews';
   ```
3. `src/app/page.tsx` dosyasına içe aktarıp `<main>` içine ekleyin:
   ```tsx
   import { Reviews } from '@/components/website';
   // ...
   <Reviews />
   ```

---

### 3. Yeni Bir API Uç Noktası Nasıl Eklenir?
1. `src/app/api/v1/` altında yeni rota dosyası oluşturun:
   - Örnek: `src/app/api/v1/invoices/route.ts`
2. Servis ve tenancy kontrollerini bağlayın:
   ```ts
   import { NextRequest, NextResponse } from 'next/server';
   import { tenantRegistry } from '@/lib/tenancy/tenantContext';

   export async function GET(request: NextRequest) {
     const host = request.headers.get('host') || 'localhost';
     const tenant = tenantRegistry.resolveTenantFromHost(host);
     
     return NextResponse.json({ success: true, tenant_id: tenant.id });
   }
   ```

---

### 4. Yeni Bir Domain Modeli / Tipi Nasıl Eklenir?
- **Genel Domain Modelleri:** `src/types/models.ts` içine ekleyin.
- **CRM İçi Detaylı Şemalar:** `src/types/crm.ts` içine ekleyin.
- Kullanırken tek noktadan içe aktarın:
  ```ts
  import { Customer, Trip, Lead, LeadStage } from '@/types';
  ```

---

## ⚡ Standart İthalat (Import) Kuralları

| Amaç | Doğru İthalat Yolu |
|---|---|
| **CRM Bileşenleri** | `import { Badge, KPICard, ProposalModal } from '@/components/crm'` |
| **Website Bileşenleri** | `import { Navbar, Footer, HeroSection } from '@/components/website'` |
| **Tip Tanımları** | `import { Customer, Trip, Lead } from '@/types'` |
| **Servisler** | `import { customerService, tripService } from '@/lib/services'` |
| **Yardımcı Fonksiyonlar** | `import { formatCurrency, exportToCsv } from '@/lib/utils'` |
| **Sabitler & Veriler** | `import { COLORS, CONTACT, STATS } from '@/lib/constants'` |
