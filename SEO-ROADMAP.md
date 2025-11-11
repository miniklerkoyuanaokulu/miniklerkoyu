# SEO Yol Haritası - Vardalı Minikler Köyü

**Mevcut Durum:** ✅ Temel SEO tamamlandı  
**Hedef:** Yerel aramada 1. sayfa, organik trafik artışı

---

## 📊 ÖNCELİK 1: İÇERİK OPTİMİZASYONU (Hemen Yapılmalı)

### 1.1 Alt Başlıkları Güçlendir (H1, H2, H3)

**Sorun:** Şu anda sayfalar `"use client"` ile çalıştığı için dinamik. SEO için H1-H6 yapısı önemli.

**Yapılacak:**
```typescript
// Her sayfada:
// ✅ 1 adet H1 (sayfa başlığı)
// ✅ Birden fazla H2 (ana bölümler)
// ✅ H3 (alt bölümler)

// Örnek - Anasayfa:
<h1>Vardalı Minikler Köyü - Adana'nın Doğayla İç İçe Anaokulu</h1>
<h2>Organik Beslenme ile Sağlıklı Gelişim</h2>
<h3>Günlük Taze Menülerimiz</h3>
```

**Etki:** 🟢 Yüksek - Google heading yapısına önem verir

---

### 1.2 Alt Text (Image Alt Tags) İyileştir

**Mevcut Durum:** Bazı resimlerde alt text var ama SEO'ya optimize değil.

**Kötü:**
```tsx
<Image alt="Fotoğraf" />
<Image alt="Görsel 1" />
```

**İyi:**
```tsx
<Image alt="Adana Çukurova'da organik beslenme ile anaokulu bahçesi" />
<Image alt="Vardalı Minikler Köyü oyun alanında çocuklar" />
```

**Yapılacak:** Tüm resimlerde keyword-rich alt text kullan (20-30 kelime max)

**Etki:** 🟢 Yüksek - Google Images'da sıralama

---

### 1.3 İçerik Uzunluğu & Zenginliği

**Mevcut:** Sayfa içerikleri yeterli ama daha fazla metin eklenebilir.

**Yapılacak:**
- ✅ Her sayfa min. 800-1000 kelime olmalı
- ✅ SSS (FAQ) bölümü ekle (Schema markup ile)
- ✅ Blog bölümü eklemeyi düşünün (uzun vadede)

**Öneri Sayfalar:**
1. **SSS Sayfası:** "Kayıt nasıl yapılır?", "Ücretler nedir?", "Yaş grupları?" 
2. **Veli Yorumları:** Testimonials (Schema.org ReviewRating ile)
3. **Etkinlikler:** Aylık etkinlik takvimi (fresh content için)

**Etki:** 🟡 Orta - Uzun vadede trafik artışı

---

## 📍 ÖNCELİK 2: YEREL SEO (Kritik!)

### 2.1 Google My Business (Google Business Profile)

**EN ÖNEMLİ!** Henüz yapılmadıysa hemen yap.

**Adımlar:**
1. https://business.google.com → Hesap oluştur
2. İşletme Bilgileri:
   - **Ad:** Vardalı Minikler Köyü Anaokulu
   - **Kategori:** Preschool / Anaokulu
   - **Adres:** Fuar Alanı Kavşağı, Prof. Dr. Necmettin Erbakan Bulvarı 262/1A, Çukurova, Adana
   - **Telefon:** +90 552 289 71 91
   - **Web:** https://miniklerkoyuanaokulu.com
   - **Çalışma Saatleri:** Pazartesi-Cuma 08:00-18:00

3. **Fotoğraflar Ekle:**
   - Dış mekan (en az 10 adet)
   - İç mekan (en az 10 adet)
   - Logo
   - Kapak fotoğrafı (yüksek çözünürlük)
   - Ekip fotoğrafları

4. **Özellikler:**
   - "Kadınlara ait işletme"
   - "Ücretsiz Wi-Fi"
   - "Otopark mevcut"
   - "Engelli erişimi"

5. **İncelemeler (Reviews):**
   - Velilerden Google'da yorum isteyip değerlendirmelerini eklemelerini iste
   - Hedef: İlk ayda 10-15 yorum

**Etki:** 🔴 Kritik - Yerel aramada görünürlük için #1 faktör

---

### 2.2 NAP Tutarlılığı (Name, Address, Phone)

**Yapılacak:** Her yerde aynı bilgi kullan:

```
Vardalı Minikler Köyü Anaokulu
Fuar Alanı Kavşağı, Prof. Dr. Necmettin Erbakan Bulvarı 262/1A
Çukurova, Adana, Türkiye
+90 552 289 71 91
```

**Kontrol Edilecek Yerler:**
- ✅ Web sitesi footer
- ✅ Google My Business
- ✅ Facebook Sayfası
- ✅ Instagram Bio
- ✅ Yerel dizinler (bkz. 2.3)

**Etki:** 🟢 Yüksek - Google'ın güvenilirlik sinyali

---

### 2.3 Yerel Dizin Kayıtları

**Yapılacak:** Aşağıdaki sitelere işletmenizi ekleyin:

**Türkiye Spesifik:**
1. **Yandex Maps** - https://business.yandex.com
2. **Yelp Türkiye** - https://biz.yelp.com
3. **N11 Mağaza** (potansiyel müşteri kaynağı)
4. **Hürriyet Emlak** (iş yeri listelemeleri)

**Eğitim/Okul Dizinleri:**
5. **Okul Bul** - okulliste.com
6. **Anaokulu Rehberi** sitelerine kayıt
7. **BabyCenter Türkiye** - forumlar/dizin

**Sosyal Medya:**
8. **Facebook Business Page** (varsa güncel tut)
9. **Instagram Business Account** (varsa güncel tut)
10. **LinkedIn Company Page** (profesyonel görünüm)

**Etki:** 🟡 Orta - Backlink & NAP signals

---

## 🔗 ÖNCELİK 3: BACKLINK STRATEJİSİ

### 3.1 Yerel Backlink'ler

**Kolay Kazanılacak Linkler:**

1. **Yerel Haberler:**
   - Adana yerel haber sitelerine haber gönderin
   - Örnek: "Çukurova'da yeni eğitim anlayışı"

2. **Eğitim Blogları:**
   - Misafir blog yazısı yaz
   - Örnek: "Okul öncesi eğitimde doğanın önemi"

3. **Partner İşletmeler:**
   - Tedarikçilerinizden link isteyin (organik ürün sağlayıcıları)
   - Çevredeki işletmelerle "dostluk linkleri"

4. **Basın Bültenleri:**
   - PR Wire Türkiye
   - Haber7, SonDakika gibi platformlara haber gönder

**Etki:** 🟢 Yüksek - Domain authority artışı

---

### 3.2 Sosyal Sinyaller

**Yapılacak:**
- ✅ Instagram'da düzenli paylaşım (haftada 3-5 post)
- ✅ Facebook sayfa oluştur + paylaşımlar
- ✅ LinkedIn'de kurum sayfası + blog paylaşımları
- ✅ YouTube kanalı (okul tanıtım videoları, etkinlikler)

**Etki:** 🟡 Orta - Dolaylı SEO etkisi + marka bilinirliği

---

## 📈 ÖNCELİK 4: TEKNİK İYİLEŞTİRMELER

### 4.1 Core Web Vitals İyileştirme

**Test Et:**
```bash
npx lighthouse https://miniklerkoyuanaokulu.com --view
```

**Hedef:**
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

**İyileştirmeler:**
- ✅ Hero image'leri daha optimize et
- ✅ Font loading optimize et (font-display: swap)
- ✅ Lazy load video/iframe'ler

**Etki:** 🟢 Yüksek - Google ranking faktörü

---

### 4.2 Mobil Optimizasyon

**Kontrol:**
- https://search.google.com/test/mobile-friendly

**Yapılacak:**
- ✅ Touch target'lar en az 48x48px
- ✅ Font size mobilde en az 16px
- ✅ Viewport genişliği doğru ayarlanmış

**Etki:** 🟢 Yüksek - Mobil-first indexing

---

### 4.3 Sayfa Hızı Optimizasyonu

**Yapılacak:**
```typescript
// next.config.ts
export default {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // ✅ Zaten var
  },
  compress: true, // Gzip sıkıştırma
  poweredByHeader: false, // X-Powered-By header'ı kaldır
}
```

**Etki:** 🟡 Orta - User experience & SEO

---

## 📝 ÖNCELİK 5: İÇERİK PAZARLAMA (Uzun Vadeli)

### 5.1 Blog Bölümü Ekle

**Yararları:**
- Sürekli fresh content
- Long-tail keyword hedefleme
- Backlink kazanma fırsatı

**Blog Post Önerileri:**
1. "Okul Öncesi Eğitimde Beslenmenin Önemi"
2. "Çocuklarda Doğa Sevgisi Nasıl Geliştirilir?"
3. "Adana'da Anaokulu Seçerken Dikkat Edilmesi Gerekenler"
4. "Oyun Temelli Öğrenme Nedir?"
5. "Organik Beslenme ile Çocuk Gelişimi"

**Sıklık:** Ayda 2-4 blog post

**Etki:** 🟢 Yüksek (uzun vadede) - Organik trafik 5-10x artış

---

### 5.2 Video İçerik

**YouTube SEO:**
- Okul tanıtım videosu (3-5 dk)
- Sanal tur videosu
- Veli röportajları
- Günlük aktivite klipler

**Optimizasyon:**
- Video title'da keyword kullan
- Description'da web site linki
- Tags: "anaokulu adana", "okul öncesi eğitim", vs.

**Etki:** 🟡 Orta - Video search results + YouTube traffic

---

## 🎯 ÖNCELİK 6: ANALYTICS & İZLEME

### 6.1 Google Search Console Takibi

**Yapılacak:**
1. Haftalık performans kontrolü
2. Click-through rate (CTR) düşük sayfalarda title/description iyileştir
3. İmpressions yüksek ama CTR düşük keywordler için içerik optimize et

**Etki:** 🟢 Yüksek - Data-driven optimizasyon

---

### 6.2 Google Analytics 4 Hedefleri

**Ayarlanacak Conversion Goals:**
- Ön kayıt formu gönderimi
- İletişim sayfası ziyareti
- Telefon numarasına tıklama
- WhatsApp butonu tıklama

**Etki:** 🟡 Orta - ROI ölçümü

---

### 6.3 Heatmap & User Behavior

**Tool Önerisi:** Microsoft Clarity (ücretsiz)

**Yapılacak:**
- Hangi bölümler okunuyor?
- Nereden çıkış yapılıyor?
- Form'da takılma var mı?

**Etki:** 🟡 Orta - UX iyileştirme

---

## 🏆 ÖNCELİK 7: GELİŞMİŞ SEO (Opsiyonel)

### 7.1 FAQ Schema Markup

```typescript
// src/app/sss/page.tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Kayıt ücreti ne kadar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kayıt ücretleri için lütfen bizi arayın..."
      }
    }
  ]
}
```

**Etki:** 🟢 Yüksek - Rich snippets (arama sonuçlarında öne çıkar)

---

### 7.2 Review/Rating Schema

```typescript
// Veli yorumları için
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "EducationalOrganization",
    "name": "Vardalı Minikler Köyü"
  },
  "author": {
    "@type": "Person",
    "name": "Ayşe Y."
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": 5,
    "bestRating": 5
  },
  "reviewBody": "Çocuğum çok mutlu..."
}
```

**Etki:** 🟢 Yüksek - Yıldız rating arama sonuçlarında görünür

---

### 7.3 Event Schema (Etkinlikler için)

```typescript
// Açık hava etkinliği, kayıt günü, vs.
const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Açık Hava Okul Tanıtımı",
  "startDate": "2025-01-15T10:00",
  "location": {
    "@type": "Place",
    "name": "Vardalı Minikler Köyü",
    "address": "..."
  }
}
```

**Etki:** 🟡 Orta - Google Events'te görünürlük

---

## 📅 ZAMAN ÇİZELGESİ & ÖNCELIK PLANI

### 🔴 HEMEN YAP (1. Hafta)
1. ✅ Google My Business profili oluştur
2. ✅ NAP tutarlılığını kontrol et
3. ✅ Alt text'leri düzelt (tüm resimler)
4. ✅ H1/H2/H3 yapısını iyileştir

### 🟠 KISA VADELİ (1. Ay)
5. ✅ Yerel dizinlere kayıt (10+ site)
6. ✅ Veli yorumları topla (Google Reviews)
7. ✅ Core Web Vitals iyileştirme
8. ✅ FAQ sayfası + Schema ekle
9. ✅ Microsoft Clarity kurulumu

### 🟡 ORTA VADELİ (2-3 Ay)
10. ✅ Blog bölümü ekle (ilk 5-10 post)
11. ✅ YouTube kanalı oluştur + video içerik
12. ✅ Basın bültenleri gönder
13. ✅ Partner backlink'ler kur
14. ✅ Review Schema ekle

### 🟢 UZUN VADELİ (3-6 Ay+)
15. ✅ Düzenli blog yazısı (ayda 4)
16. ✅ Video içerik (ayda 2)
17. ✅ Backlink building devam et
18. ✅ Google Ads kampanyası (opsiyonel)
19. ✅ Remarketing kampanyaları

---

## 🎓 EĞİTİM KAYNAKLARI

### Öğrenilecek Konular:
1. **Google Search Console Kullanımı**
   - https://support.google.com/webmasters

2. **Local SEO Best Practices**
   - Moz Local Learning Center

3. **Schema.org Markup**
   - https://schema.org/docs/gs.html

4. **Core Web Vitals**
   - https://web.dev/vitals/

---

## 📊 BAŞARI METRİKLERİ

### 3 Ay Sonra Hedefler:
- 🎯 Google'da "anaokulu adana" → 1. sayfa (top 10)
- 🎯 Google'da "çukurova anaokulu" → Top 5
- 🎯 Google My Business → 25+ yorum (4.5+ yıldız)
- 🎯 Organik trafik → 500+ ziyaretçi/ay
- 🎯 Ön kayıt formu → 10+ lead/ay

### 6 Ay Sonra Hedefler:
- 🎯 "anaokulu adana" → Top 3
- 🎯 Organik trafik → 1000+ ziyaretçi/ay
- 🎯 Google My Business → 50+ yorum
- 🎯 Domain Authority (DA) → 20+
- 🎯 Ön kayıt formu → 25+ lead/ay

---

## 🛠️ ARAÇLAR & KAYNAKLAR

### Ücretsiz SEO Tools:
1. **Google Search Console** - Arama performansı
2. **Google Analytics 4** - Trafik analizi
3. **Google My Business** - Yerel görünürlük
4. **Microsoft Clarity** - Heatmap & recordings
5. **Google PageSpeed Insights** - Performance
6. **Google Rich Results Test** - Schema validation

### Ücretli Tools (Opsiyonel):
1. **Ahrefs** (~$99/ay) - Backlink analizi, keyword research
2. **SEMrush** (~$119/ay) - Competitor analysis
3. **Moz Pro** (~$99/ay) - Local SEO tracking

---

## 💡 BONUS İPUÇLARI

### 1. Rakip Analizi
**Yapılacak:**
- Adana'daki diğer anaokullarının web sitelerini incele
- Hangi keywordlerde sıralanıyorlar?
- Neleri daha iyi yapabilirsiniz?

**Tool:** 
```
https://ahrefs.com/site-explorer (ücretsiz 5 arama/gün)
```

### 2. Yerel Basın İlişkileri
- Adana yerel gazetelere okul hakkında haber gönderin
- "Yenilikçi eğitim anlayışı" açısından
- Backlink + brand awareness

### 3. Veli Referans Programı
- Velilerden arkadaşlarını önermeleri için teşvik et
- Her öneri için mini hediye
- Word-of-mouth SEO'dan daha güçlü!

---

## 🎯 ÖZETİN ÖZETİ

**ŞU ANDA YAPILACAK EN ÖNEMLİ 5 ŞEY:**

1. 🔴 **Google My Business** profili oluştur
2. 🔴 **Google Reviews** toplamaya başla (hedef: 10+ yorum)
3. 🔴 **Alt text** optimizasyonu (tüm resimler)
4. 🔴 **H1/H2 yapısı** iyileştir
5. 🔴 **FAQ sayfası** ekle (Schema markup ile)

Bu 5 şeyi yaparsanız, 30 gün içinde Google'da görünürlüğünüz **%50-100 artabilir**.

---

**Hazırlayan:** AI SEO Danışmanı  
**Tarih:** Kasım 2025  
**Versiyon:** 1.0

**Not:** Bu roadmap'i yazdırmak ve duvarınıza asmak için özgürsünüz! 📌

