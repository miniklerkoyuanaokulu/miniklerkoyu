# 🚀 Production Hazırlık Kontrol Listesi

## 🔴 KRİTİK (Mutlaka Yapılmalı)

### 1. ✅ Firebase Security Rules Güncelleme

**Durum:** ✅ TAMAMLANDI (Dosyalar güncel, deploy edilmeli)

**Firebase Console'dan Manuel Deploy:**

1. [Firebase Console](https://console.firebase.google.com) → Projenizi seçin
2. **Firestore Database** → **Rules** sekmesi
3. `firestore.rules` dosyasındaki içeriği kopyalayıp yapıştırın → **Publish**
4. **Storage** → **Rules** sekmesi
5. `storage.rules` dosyasındaki içeriği kopyalayıp yapıştırın → **Publish**

**Neden önemli:** Şu anda herkes veritabanına yazabilir durumda!

---

### 2. ⚠️ Environment Variables Kontrolü

**`.env.local` dosyanızda olması gerekenler:**

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Email (Nodemailer)
EMAIL_USER=...
EMAIL_PASSWORD=...
EMAIL_NOTIFICATION_TO=...

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
RECAPTCHA_SECRET_KEY=...
```

**Production'da (Vercel/Netlify vb.):**

- Tüm bu değişkenleri hosting platformunuzda ayarlayın
- `.env.local` dosyası ASLA git'e eklenmemeli

---

### 3. ⚠️ reCAPTCHA Domain Güncelleme

**Yapılacaklar:**

1. [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin) → Settings
2. **Domains** bölümüne production domain'inizi ekleyin:
   ```
   localhost (mevcut)
   yourdomain.com (YENİ)
   www.yourdomain.com (YENİ)
   ```

---

### 4. ⚠️ Production Build Test

Terminal'de çalıştırın:

```bash
npm run build
npm run start
```

**Kontrol edin:**

- Build hatasız tamamlanıyor mu?
- Tüm sayfalar açılıyor mu?
- Form gönderimi çalışıyor mu?
- Admin paneline giriş yapılabiliyor mu?

---

### 5. ⚠️ Firebase Admin Kullanıcısı Oluşturma

**Şu anda admin kullanıcınız var mı?**

Firebase Console → **Authentication** → **Users**

- Eğer yoksa, bir admin email/password oluşturun
- Bu bilgileri güvenli bir yerde saklayın

---

## 🟡 ÖNEMLİ (Şiddetle Tavsiye Edilen)

### 6. SEO Optimizasyonu

#### a) Metadata Dosyası Oluştur

`src/app/layout.tsx` dosyasına metadata ekleyin:

```typescript
export const metadata: Metadata = {
  title: "Varda Minikler Köyü - Doğayla İç İçe Okul Öncesi Eğitim",
  description:
    "Adana Çukurova'da, doğanın içinde çocuklarınız için modern eğitim anlayışıyla okul öncesi eğitim hizmeti sunuyoruz.",
  keywords: [
    "okul öncesi eğitim",
    "anaokulu",
    "adana",
    "çukurova",
    "varda",
    "minikler köyü",
  ],
  openGraph: {
    title: "Varda Minikler Köyü",
    description: "Doğayla iç içe okul öncesi eğitim",
    url: "https://yourdomain.com",
    siteName: "Varda Minikler Köyü",
    images: [
      {
        url: "/images/home/hero.avif",
        width: 1200,
        height: 630,
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Varda Minikler Köyü",
    description: "Doğayla iç içe okul öncesi eğitim",
    images: ["/images/home/hero.avif"],
  },
};
```

#### b) robots.txt Oluştur

`public/robots.txt`:

```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://yourdomain.com/sitemap.xml
```

#### c) Sitemap Oluştur

`src/app/sitemap.ts`:

```typescript
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yourdomain.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://yourdomain.com/kurumsal",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://yourdomain.com/egitim-modelimiz",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://yourdomain.com/neden-minikler-koyu",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://yourdomain.com/medya",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://yourdomain.com/iletisim",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://yourdomain.com/kvkk",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
```

---

### 7. Error Handling İyileştirme

#### a) Global Error Handler

`src/app/error.tsx` oluştur:

```typescript
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Bir şeyler yanlış gitti</h2>
        <p className="text-gray-600 mb-6">Lütfen daha sonra tekrar deneyin.</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-white rounded-lg"
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  );
}
```

#### b) 404 Sayfası

`src/app/not-found.tsx` oluştur:

```typescript
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Sayfa Bulunamadı</h2>
        <p className="text-gray-600 mb-6">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-primary text-white rounded-lg inline-block"
        >
          Anasayfaya Dön
        </Link>
      </div>
    </div>
  );
}
```

---

### 8. Performance Optimizasyonu

#### Kontrol edilecekler:

- ✅ Images: Next.js Image component kullanılıyor
- ✅ AVIF format: Hero image optimize edilmiş
- ✅ WebP compression: Browser-image-compression aktif
- ⚠️ Font optimization: Google Fonts optimize edilmeli

`src/app/layout.tsx`:

```typescript
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
```

---

### 9. Analytics (Opsiyonel ama Önerilen)

#### Google Analytics 4 Entegrasyonu

1. [Google Analytics](https://analytics.google.com) → Hesap oluştur
2. Measurement ID'yi kopyala (G-XXXXXXXXXX)
3. `.env.local`:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

4. `src/app/layout.tsx`:

```typescript
import Script from "next/script";

// Body içine ekle:
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

---

## 🟢 İYİLEŞTİRMELER (Zaman Olursa)

### 10. Rate Limiting

API route'larına rate limiting ekle (örn: ön kayıt formu)

### 11. Backup Stratejisi

- Firestore: Otomatik backup'ları etkinleştir (Firebase Console → Firestore → Backup)
- Storage: Önemli dosyaları manuel olarak yedekle

### 12. Monitoring & Logging

- Firebase Console → Analytics → Dashboard'u takip et
- Error tracking için Sentry entegrasyonu düşünülebilir

### 13. Email Template İyileştirme

Nodemailer email template'lerini daha profesyonel hale getir

### 14. Admin Panel İyileştirmeleri

- Dashboard'a istatistikler ekle
- Toplu işlem özellikleri
- Export/Import fonksiyonları

---

## 📋 Deployment Adımları

### Vercel (Önerilen)

1. [Vercel](https://vercel.com) hesabı oluştur
2. GitHub repo'nuzu bağla
3. Environment Variables ekle (yukarıdaki tüm .env.local değişkenleri)
4. Deploy!

**Deploy sonrası:**

- ✅ Tüm sayfaları test et
- ✅ Form gönderimini test et
- ✅ Admin paneline giriş yap
- ✅ Medya yönetimini test et
- ✅ Email bildirimlerini kontrol et

---

## 🔒 Güvenlik Kontrol Listesi

- [x] Firestore Security Rules güncel
- [x] Storage Security Rules güncel
- [ ] Environment variables production'da ayarlı
- [ ] Firebase rules deploy edildi
- [ ] Admin şifresi güçlü ve güvenli
- [ ] reCAPTCHA production domain'e eklendi
- [ ] Email credentials güvenli
- [ ] `.env.local` git'e eklenmemiş (.gitignore'da)

---

## 📱 Test Senaryoları

### Public Site

- [ ] Anasayfa yükleniyor
- [ ] Tüm menüler çalışıyor
- [ ] Navbar dropdown'ları çalışıyor
- [ ] Floating buttons (WhatsApp, Call, Instagram) çalışıyor
- [ ] İletişim formu gönderilebiliyor
- [ ] reCAPTCHA çalışıyor
- [ ] Medya sayfası açılıyor (fotoğraf, video, Instagram)
- [ ] Lightbox çalışıyor
- [ ] Responsive tasarım mobilde düzgün

### Admin Panel

- [ ] /admin/login sayfası açılıyor
- [ ] Giriş yapılabiliyor
- [ ] Dashboard görüntüleniyor
- [ ] Ön kayıtlar listesi yükleniyor
- [ ] Ön kayıt durumu güncellenebiliyor
- [ ] Ön kayıt silinebiliyor
- [ ] Fotoğraf yüklenebiliyor
- [ ] Video yüklenebiliyor (dosya ve YouTube)
- [ ] Instagram post eklenebiliyor
- [ ] Medya silinebiliyor
- [ ] Çıkış yapılabiliyor

---

## 🎯 Son Adım: Go Live!

1. ✅ Tüm KRİTİK maddeler tamamlandı mı?
2. ✅ Production build başarılı mı?
3. ✅ Test senaryoları geçti mi?
4. ✅ Firebase rules deploy edildi mi?
5. ✅ Domain DNS ayarları yapıldı mı?
6. 🚀 **Deploy!**

---

## 📞 Sorun Çözme

**Form gönderilmiyor:**

- reCAPTCHA token kontrolü
- Firestore rules kontrolü
- Console log'larına bak

**Admin paneline girilemiyor:**

- Firebase Auth kullanıcısı var mı?
- Email/password doğru mu?

**Medya yüklenmiyor:**

- Storage rules deploy edildi mi?
- Dosya boyutu limitleri uygun mu?
- Authentication aktif mi?

**Email gelmiyor:**

- EMAIL_USER, EMAIL_PASSWORD doğru mu?
- Gmail App Password kullanılıyor mu?
- Spam klasörünü kontrol et

---

**Son Güncelleme:** Kasım 2025
