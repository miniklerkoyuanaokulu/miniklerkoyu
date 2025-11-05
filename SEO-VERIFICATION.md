# SEO Doğrulama ve Test Listesi

## ✅ Tamamlanan SEO Optimizasyonları

### 1. **Metadata (Her Sayfa)**

- ✅ **Root Layout** (`src/app/layout.tsx`)

  - Canonical URL: `https://miniklerkoyu.vercel.app`
  - Open Graph image: `/og-image.jpg` (1200×630 JPG)
  - Twitter Card: summary_large_image
  - Favicon set: SVG, PNG, ICO, Apple Touch Icon
  - Manifest: `/site.webmanifest`

- ✅ **Sayfa-Specific Layouts:**
  - `/kurumsal/layout.tsx` → Canonical + OG tags
  - `/egitim-modelimiz/layout.tsx` → Canonical + OG tags
  - `/neden-minikler-koyu/layout.tsx` → Canonical + OG tags
  - `/medya/layout.tsx` → Canonical + OG tags
  - `/iletisim/layout.tsx` → Canonical + OG tags
  - `/kvkk/layout.tsx` → Canonical + OG tags

### 2. **Structured Data (Schema.org)**

- ✅ **EducationalOrganization** schema
- ✅ **LocalBusiness** schema (Google Maps için)
- ✅ **WebSite** schema
- ✅ Geo coordinates (36.9925, 35.3213)
- ✅ Business hours
- ✅ Contact info

### 3. **Technical SEO**

- ✅ `robots.txt` → `/admin/` ve `/api/` engellendi
- ✅ `sitemap.xml` → 7 sayfa (dinamik)
- ✅ `site.webmanifest` → PWA desteği
- ✅ Canonical URLs → Tüm sayfalarda
- ✅ Language: `lang="tr"`
- ✅ Semantic HTML

### 4. **Images & Performance**

- ✅ Next.js Image component (otomatik optimizasyon)
- ✅ OG Image: `/og-image.jpg` (1200×630 - tüm scraper'larla uyumlu)
- ✅ Favicon set: SVG, PNG (96x96), ICO, Apple Touch (180x180)
- ✅ PWA Icons: 192x192, 512x512
- ✅ AVIF format (hero image)
- ✅ Lazy loading

### 5. **Social Media**

- ✅ Open Graph (Facebook, WhatsApp, LinkedIn)
- ✅ Twitter Cards
- ✅ Instagram link (`@vardaliminiklerkoyu`)

---

## 🧪 Test Araçları

### 1. **Google Rich Results Test**

```
https://search.google.com/test/rich-results?url=https://miniklerkoyu.vercel.app
```

**Beklenen:** EducationalOrganization, LocalBusiness

### 2. **Facebook Sharing Debugger**

```
https://developers.facebook.com/tools/debug/?q=https://miniklerkoyu.vercel.app
```

**Beklenen:** og-image.jpg görseli, doğru title/description

### 3. **Twitter Card Validator**

```
https://cards-dev.twitter.com/validator
```

**Beklenen:** Summary card with large image

### 4. **Schema.org Validator**

```
https://validator.schema.org/#url=https://miniklerkoyu.vercel.app
```

**Beklenen:** 0 hata, 3 schema detected

### 5. **Google PageSpeed Insights**

```
https://pagespeed.web.dev/analysis?url=https://miniklerkoyu.vercel.app
```

**Hedef:** 90+ Performance, 100 SEO

### 6. **Lighthouse (Chrome DevTools)**

```bash
# Terminal'de:
npx lighthouse https://miniklerkoyu.vercel.app --view
```

**Hedef:**

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 📋 Manuel Kontrol Listesi

### URLs Test Et:

- [ ] https://miniklerkoyu.vercel.app/sitemap.xml
- [ ] https://miniklerkoyu.vercel.app/robots.txt
- [ ] https://miniklerkoyu.vercel.app/site.webmanifest
- [ ] https://miniklerkoyu.vercel.app/og-image.jpg
- [ ] https://miniklerkoyu.vercel.app/favicon.svg

### HTML Head Kontrol (View Source):

```html
<!-- Her sayfada olmalı -->
<link rel="canonical" href="https://miniklerkoyu.vercel.app/..." />
<meta
  property="og:image"
  content="https://miniklerkoyu.vercel.app/og-image.jpg"
/>
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<script type="application/ld+json">
  ...
</script>
```

### Sosyal Medya Paylaşım Testi:

1. **WhatsApp:** Linki paylaş → og-image.jpg görünmeli
2. **Facebook:** Linki paylaş → og-image.jpg ve description görünmeli
3. **Twitter:** Tweet at → Card preview görünmeli

---

## 🔍 Google Search Console Kurulumu

### Adımlar:

1. https://search.google.com/search-console → "Mülk Ekle"
2. URL: `https://miniklerkoyu.vercel.app`
3. Doğrulama yöntemi seç:

   - **HTML Tag** (Önerilen):
     ```html
     <meta name="google-site-verification" content="..." />
     ```
     Bu kodu `src/app/layout.tsx` → `metadata.verification.google` alanına ekle

4. Sitemap gönder:

   ```
   https://miniklerkoyu.vercel.app/sitemap.xml
   ```

5. İzleme metrikleri:
   - Kapsam (Coverage)
   - Performans (Core Web Vitals)
   - Mobil kullanılabilirlik
   - Zengin sonuçlar

### Verification Code Ekleme:

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  ...
  verification: {
    google: "your-verification-code-here", // Google Search Console'dan alın
  },
}
```

---

## 📊 Ölçülecek Metrikler

### Google Search Console'da İzle:

- **Impression (Gösterim):** Kaç kez arama sonuçlarında gösterildi
- **Click (Tıklama):** Kaç kez tıklandı
- **CTR (Click Through Rate):** Tıklama oranı (hedef: %5+)
- **Position (Ortalama Sıra):** Arama sonuçlarında sıralama (hedef: 1-10)

### Hedef Keywords:

1. "anaokulu adana" → Top 10
2. "çukurova anaokulu" → Top 5
3. "varda anaokulu" → Top 3
4. "minikler köyü" → #1
5. "okul öncesi eğitim adana" → Top 10

---

## 🎯 Gelişmiş SEO (Opsiyonel)

### Google Analytics 4 (GA4)

```typescript
// .env.local
NEXT_PUBLIC_GA_ID = G - XXXXXXXXXX;

// src/app/layout.tsx
import Script from "next/script";

// Body'de:
{
  process.env.NEXT_PUBLIC_GA_ID && (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
      `}
      </Script>
    </>
  );
}
```

### Google My Business

- İşletme profili oluştur
- Kategori: "Preschool" / "Anaokulu"
- Adres, telefon, çalışma saatleri ekle
- Fotoğraflar ekle
- İncelemeler (reviews) için müşterilerden geri bildirim iste

### Bing Webmaster Tools

```
https://www.bing.com/webmasters
```

---

## 🔄 Domain Değişikliğinde Güncellenecekler

`miniklerkoyu.vercel.app` → `yenidomaininiz.com` değişikliği için:

### Kod Güncellemeleri:

- [ ] `src/app/layout.tsx` → `metadataBase`
- [ ] `src/app/layout.tsx` → `metadata.alternates.canonical`
- [ ] `src/app/layout.tsx` → `metadata.openGraph.url`
- [ ] `src/app/sitemap.ts` → `baseUrl`
- [ ] `src/app/schema.tsx` → Tüm URL'ler
- [ ] `src/app/kurumsal/layout.tsx` → canonical
- [ ] `src/app/egitim-modelimiz/layout.tsx` → canonical
- [ ] `src/app/neden-minikler-koyu/layout.tsx` → canonical
- [ ] `src/app/medya/layout.tsx` → canonical
- [ ] `src/app/iletisim/layout.tsx` → canonical
- [ ] `src/app/kvkk/layout.tsx` → canonical
- [ ] `public/robots.txt` → Sitemap URL

### External Services:

- [ ] Google reCAPTCHA → New domain
- [ ] Firebase → Authorized domains
- [ ] Google Search Console → New property
- [ ] Social media tags test

---

## 📌 Hızlı Komutlar

### Build & Test

```bash
npm run build          # Production build
npm run start          # Production server (test)
```

### SEO Test

```bash
# Lighthouse
npx lighthouse https://miniklerkoyu.vercel.app --view

# Sitemap kontrol
curl https://miniklerkoyu.vercel.app/sitemap.xml

# robots.txt kontrol
curl https://miniklerkoyu.vercel.app/robots.txt
```

---

## ✅ Deployment Checklist

Deploy sonrası kontrol edin:

- [ ] Sitemap erişilebilir mi?
- [ ] robots.txt doğru mu?
- [ ] OG image görünüyor mu? (WhatsApp'ta test edin)
- [ ] Favicon'lar yükleniyor mu?
- [ ] Canonical tags doğru mu? (View Source)
- [ ] Schema.org markup'ı var mı? (View Source → JSON-LD)
- [ ] Google Search Console doğrulaması yapıldı mı?

---

**Son Güncelleme:** 5 Kasım 2025  
**Mevcut URL:** https://miniklerkoyu.vercel.app  
**SEO Durumu:** ✅ Production Ready
