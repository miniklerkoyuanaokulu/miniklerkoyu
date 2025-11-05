# Deployment Notları

## 🌐 Şu Anki Durum

**Live URL:** https://miniklerkoyu.vercel.app/
**Deploy Tarihi:** 5 Kasım 2025
**Durum:** ✅ Production'da çalışıyor

## 📋 Domain Değişikliği Yapılacak Yerler

Domain satın alındığında aşağıdaki dosyalarda `miniklerkoyu.vercel.app` → `yenidomaininiz.com` değişikliği yapılmalıdır:

### 1. **Next.js Configuration**

- [ ] `src/app/layout.tsx` → `metadataBase` URL'i
- [ ] `src/app/layout.tsx` → OpenGraph `url`
- [ ] `src/app/sitemap.ts` → `baseUrl`
- [ ] `src/app/schema.tsx` → Tüm URL'ler (`@id`, `url`, `sameAs` vb.)

### 2. **Firebase & Google Services**

- [ ] Google reCAPTCHA Console → Yeni domain ekle
- [ ] Firebase Console → Authorized domains (Authentication → Settings)
- [ ] Firebase Console → Storage CORS settings (gerekirse)

### 3. **Vercel Configuration**

- [ ] Vercel Dashboard → Project Settings → Domains
- [ ] Custom domain ekle ve DNS ayarlarını yap
- [ ] SSL sertifikası otomatik oluşturulacak

### 4. **DNS Ayarları** (Domain Sağlayıcıda)

```
Type: A Record
Name: @
Value: 76.76.21.21 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🔍 SEO Kontrol Listesi

### Deploy Sonrası Yapılacaklar:

- [ ] Google Search Console'a site ekle
- [ ] Sitemap gönder: `https://yourdomain.com/sitemap.xml`
- [ ] robots.txt kontrol: `https://yourdomain.com/robots.txt`
- [ ] Google Analytics ekle (opsiyonel)
- [ ] Facebook Domain Verification (opsiyonel)
- [ ] Bing Webmaster Tools'a ekle (opsiyonel)

### SEO Test Araçları:

- Google PageSpeed Insights: https://pagespeed.web.dev/
- Google Rich Results Test: https://search.google.com/test/rich-results
- Lighthouse (Chrome DevTools)
- Schema.org Validator: https://validator.schema.org/

## 📊 Mevcut SEO Özellikleri

✅ **Metadata:** Tüm sayfalarda dinamik title ve description  
✅ **Open Graph:** Facebook/WhatsApp paylaşımları için optimize  
✅ **Twitter Cards:** Twitter paylaşımları için optimize  
✅ **Structured Data:** Schema.org JSON-LD (Organization, LocalBusiness, WebSite)  
✅ **Sitemap:** Otomatik oluşturuluyor (`/sitemap.xml`)  
✅ **robots.txt:** Arama motorları için yönergeler  
✅ **Manifest.json:** PWA desteği  
✅ **Semantic HTML:** Proper heading hierarchy, alt tags  
✅ **Mobile Responsive:** Tüm cihazlarda optimize  
✅ **Performance:** Image optimization (AVIF, Next.js Image)

## 🔐 Güvenlik Notları

- ✅ Firebase Rules güncellendi (admin auth gerekli)
- ✅ reCAPTCHA aktif (form spam koruması)
- ✅ Environment variables Vercel'de ayarlandı
- ✅ Admin routes protected
- ✅ HTTPS zorunlu (Vercel otomatik)

## 📱 Test Edilmesi Gerekenler

Deploy sonrası test edin:

- [ ] Anasayfa yükleniyor
- [ ] Ön kayıt formu çalışıyor (reCAPTCHA dahil)
- [ ] Admin login çalışıyor
- [ ] Medya sayfası fotoğrafları gösteriyor
- [ ] Tüm linkler çalışıyor
- [ ] Mobile görünüm düzgün
- [ ] Fotoğraf upload (admin)
- [ ] Instagram post ekleme (admin)

## 🚀 Domain Değişikliği Adımları (Özet)

1. **Kod Güncellemeleri:**

   ```bash
   # Tüm URL'leri değiştir
   - src/app/layout.tsx
   - src/app/sitemap.ts
   - src/app/schema.tsx

   # Commit & push
   git add .
   git commit -m "Update domain to new URL"
   git push
   ```

2. **Vercel:**

   - Custom domain ekle
   - DNS ayarlarını kopyala

3. **Domain Sağlayıcı:**

   - DNS kayıtlarını ekle
   - Propagation bekle (24-48 saat)

4. **Firebase:**

   - Authorized domains'e yeni domain ekle

5. **Google reCAPTCHA:**

   - Domains listesine yeni domain ekle

6. **SEO:**
   - Google Search Console'a yeni property ekle
   - Sitemap gönder

## 📞 Destek

Sorun çıkarsa:

- Vercel Logs: https://vercel.com/dashboard
- Firebase Console: https://console.firebase.google.com
- Next.js Docs: https://nextjs.org/docs

---

**Not:** Bu dosya deployment sürecini kolaylaştırmak için oluşturulmuştur. Domain değişikliğinde bu checklist'i takip edin.
