# 👑 TRAVIA DUBAI — Luxury Tourism & Operating System

TRAVIA DUBAI, kişiye özel VIP turizm, özel yat kiralama, çöl safarisi, helikopter turları ve lüks seyahat deneyimleri sunan entegre bir seyahat işletim sistemidir (Travel OS).

---

## 🏗️ Mimari ve Geliştirici Kılavuzu

Projenin modüler dosya yapısı, katmanları ve yeni özellik/sayfa ekleme adımları için detaylı rehberimizi inceleyin:

👉 [ARCHITECTURE.md](ARCHITECTURE.md)

---

## 🚀 Başlarken (Getting Started)

Geliştirme sunucusunu başlatmak için:

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak:
- **Landing Page:** `/`
- **CRM Paneli:** `/crm` (Giriş: `/crm/login`)
- **Platform Admin:** `/platform-admin`
- **Deneyimler:** `/experiences/yacht-sunset` vb.

---

## 🧪 Derleme & Tip Kontrolü

```bash
# TypeScript Tip Kontrolü
npx tsc --noEmit

# Linter Kontrolü
npm run lint

# Üretim Derlemesi (Production Build)
npm run build
```
