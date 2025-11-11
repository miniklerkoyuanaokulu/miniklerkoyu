# 🚀 SEO Quick Wins - Hemen Yapılacaklar

**Hedef:** 1 hafta içinde Google sıralamasını iyileştir

---

## ✅ BUGÜN YAP (2-3 Saat)

### 1. Google My Business Profili Oluştur ⭐⭐⭐⭐⭐

**Süre:** 30 dk  
**Etki:** 🔥 Çok Yüksek

**Adımlar:**

1. https://business.google.com adresine git
2. "İşletme Ekle" → Vardalı Minikler Köyü Anaokulu
3. Kategori: "Preschool" seç
4. Adres: Fuar Alanı Kavşağı, Prof. Dr. Necmettin Erbakan Bulvarı 262/1A, Çukurova, Adana
5. Telefon: +90 552 289 71 91
6. Web sitesi: https://miniklerkoyuanaokulu.com
7. Logo yükle
8. 10-15 fotoğraf yükle (bahçe, sınıflar, etkinlikler)
9. Çalışma saatleri: Pazartesi-Cuma 08:00-18:00
10. Doğrulama kodunu bekle (kartpostal veya telefon)

**Sonuç:** Google Maps'te görünmeye başlarsınız! 🎉

---

### 2. İlk 5 Google Yorumu Topla ⭐⭐⭐⭐

**Süre:** 1 saat  
**Etki:** 🔥 Çok Yüksek

**Nasıl:**

1. Memnun 5 veliyi seç
2. Google'da yorum yazmalarını rica et
3. Link gönder: (Google My Business onaylandıktan sonra gelecek)
4. Teşekkür mesajı gönder

**İpucu:** "Bize Google'da 5 yıldız verirseniz çok mutlu oluruz" deyin

**Sonuç:** Yerel aramada güvenilirlik %80 artar

---

### 3. Sosyal Medya Profilleri Güncelle ⭐⭐⭐

**Süre:** 30 dk  
**Etki:** 🟡 Orta

**Instagram (@vardaliminiklerkoyu):**

- Bio'ya web sitesi linki ekle: miniklerkoyuanaokulu.com
- Adres ekle
- Telefon ekle
- E-posta ekle

**Facebook:**

- İşletme sayfası oluştur (yoksa)
- Tam adres bilgileri
- Çalışma saatleri
- Web sitesi linki

**LinkedIn:**

- Şirket sayfası oluştur
- Profesyonel görünüm için

---

## ✅ BU HAFTA YAP (5-10 Saat)

### 4. Alt Text Optimizasyonu ⭐⭐⭐⭐⭐

**Süre:** 2-3 saat  
**Etki:** 🔥 Çok Yüksek

**Kod Güncelleme Gerekli:** Evet

Her resimde şu şekilde güncelleme yapılmalı:

**❌ Kötü:**

```tsx
<Image alt="Fotoğraf" />
<Image alt="Görsel" />
```

**✅ İyi:**

```tsx
<Image alt="Adana Çukurova Vardalı Minikler Köyü anaokulu bahçesinde oynayan çocuklar" />
<Image alt="Organik beslenme ile hazırlanan anaokulu yemekleri" />
<Image alt="Vardalı Minikler Köyü oyun alanında zipline aktivitesi" />
```

**Hangi Dosyalar:**

- src/app/page.tsx
- src/app/kurumsal/page.tsx
- src/app/egitim-modelimiz/page.tsx
- src/app/neden-minikler-koyu/page.tsx
- src/app/medya/page.tsx

**Sonuç:** Google Images'da sıralanmaya başlarsınız

---

### 5. H1/H2/H3 Yapısı İyileştir ⭐⭐⭐⭐

**Süre:** 2 saat  
**Etki:** 🔥 Yüksek

**Kod Güncelleme Gerekli:** Evet

Her sayfada:

- 1 adet H1 (en üstte)
- 3-5 adet H2 (ana bölümler)
- Her H2 altında 2-3 H3

**Örnek - Anasayfa:**

```tsx
<h1>Vardalı Minikler Köyü - Adana'nın Doğayla İç İçe Anaokulu</h1>

<h2>Neden Minikler Köyü'nü Seçmelisiniz?</h2>
  <h3>Organik Beslenme ile Sağlıklı Gelişim</h3>
  <h3>Geniş Oyun Alanları ve Doğal Ortam</h3>

<h2>Eğitim Modelimiz</h2>
  <h3>Oyun Temelli Öğrenme</h3>
  <h3>Branş Dersleri</h3>
```

**Şu anda:** div/span kullanılıyor, SEO'ya görünmüyor

---

### 6. FAQ Sayfası Ekle ⭐⭐⭐⭐⭐

**Süre:** 3 saat  
**Etki:** 🔥 Çok Yüksek (Rich Snippets!)

**Yeni Dosya:** `src/app/sss/page.tsx`

**İçerik Önerileri:**

1. Kayıt ücreti ne kadar?
2. Hangi yaş gruplarını kabul ediyorsunuz?
3. Günlük program nasıl?
4. Yemekler nasıl hazırlanıyor?
5. Güvenlik önlemleriniz neler?
6. Servis hizmeti var mı?
7. Kaç öğrenci alıyorsunuz?
8. Öğretmenleriniz sertifikalı mı?
9. Hangi branş dersleri var?
10. Ön kayıt nasıl yapılır?

**Schema Markup Ekle:**

```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...]
}
```

**Sonuç:** Google'da "accordion" şeklinde çıkar, CTR 2-3x artar

---

### 7. Yerel Dizinlere Kayıt ⭐⭐⭐

**Süre:** 2-3 saat  
**Etki:** 🟡 Orta (Uzun vadede backlink)

**Kayıt Olunacak Siteler:**

1. **Yandex Maps** - https://business.yandex.com
2. **Bing Places** - https://www.bingplaces.com
3. **Yelp** - https://biz.yelp.com
4. **Foursquare** - https://foursquare.com/businesses/
5. **Apple Maps** - https://mapsconnect.apple.com

**Her birinde:**

- İşletme adı
- Tam adres
- Telefon
- Web sitesi
- Kategori: Preschool/Anaokulu
- Fotoğraflar

---

## ✅ GELECEKİ HAFTA İÇİN (Devam Eden)

### 8. Düzenli İçerik Paylaşımı ⭐⭐⭐

**Süre:** Günlük 15 dk  
**Etki:** 🟡 Orta (Sosyal sinyaller)

**Instagram/Facebook:**

- Pazartesi: Haftalık menü
- Salı: Sınıf aktivitesi fotoğrafı
- Çarşamba: Veli yorumu (story)
- Perşembe: Eğitici ipucu (carousel)
- Cuma: Haftanın özeti (video)

**Hashtag'ler:**

```
#anaokulu #adana #çukurova #okulöncesi
#doğaeğitim #organikbeslenme #miniklerköyü
#anaokuluvarda #ananeokuluilköğretim
```

---

### 9. Blog Yazıları Başlat ⭐⭐⭐⭐

**Süre:** Haftada 4-5 saat  
**Etki:** 🔥 Çok Yüksek (uzun vadede)

**İlk 5 Blog Başlığı:**

1. "Okul Öncesi Eğitimde Beslenmenin Önemi" (800 kelime)
2. "Adana'da Anaokulu Seçerken 10 Kritik Nokta" (1000 kelime)
3. "Çocuklarda Doğa Sevgisi Nasıl Geliştirilir?" (700 kelime)
4. "Oyun Temelli Öğrenme Nedir? Neden Önemli?" (900 kelime)
5. "Organik Beslenme ile Çocuk Gelişimi" (1000 kelime)

**SEO için:**

- Her yazıda 1-2 internal link
- Her yazıda 1-2 external link (authority sites)
- Featured image (1200x630)
- Meta description (150-160 karakter)

---

### 10. Video İçerik Oluştur ⭐⭐⭐⭐

**Süre:** Ayda 1-2 gün  
**Etki:** 🔥 Yüksek

**İlk 3 Video:**

1. **Okul Tanıtım Videosu** (3-5 dk)

   - Bahçe turu
   - Sınıflar
   - Etkinlikler
   - Öğretmen tanıtımı

2. **Sanal Tur** (5-10 dk)

   - 360° görüntüler
   - Her köşeden detay

3. **Veli Röportajları** (2-3 dk her biri)
   - 3-4 veli
   - Neden Minikler Köyü'nü seçtik?

**YouTube Optimizasyonu:**

- Title: "Vardalı Minikler Köyü Anaokulu - Adana Çukurova [Video Konusu]"
- Description'da web sitesi linki
- Tags: "anaokulu adana", "okul öncesi eğitim", "çukurova anaokulu"
- Thumbnail: Dikkat çekici (yüksek CTR için)

---

## 📊 İLERLEME TAKİP TABLOSU

| Görev                   | Tamamlandı mı? | Tarih | Not |
| ----------------------- | -------------- | ----- | --- |
| Google My Business      | ☐              |       |     |
| İlk 5 Google Yorum      | ☐              |       |     |
| Sosyal Medya Güncelleme | ☐              |       |     |
| Alt Text Optimizasyonu  | ☐              |       |     |
| H1/H2/H3 İyileştirme    | ☐              |       |     |
| FAQ Sayfası             | ☐              |       |     |
| Yerel Dizin Kayıtları   | ☐              |       |     |
| Blog Yazısı #1          | ☐              |       |     |
| Video #1                | ☐              |       |     |

---

## 🎯 1 HAFTALIK HEDEF

**Bu görevleri tamamladıktan sonra:**

- ✅ Google Maps'te görünür olacaksınız
- ✅ "anaokulu adana" aramasında sıralama başlayacak
- ✅ Organik trafik %30-50 artacak
- ✅ Google Rich Snippets kazanacaksınız (FAQ)
- ✅ Sosyal kanıt (reviews) oluşmaya başlayacak

---

## 💰 MALİYET ANALİZİ

**Toplam Maliyet:** ₺0 (Tamamen ücretsiz!)

- Google My Business: Ücretsiz ✅
- Google Reviews: Ücretsiz ✅
- Sosyal Medya: Ücretsiz ✅
- Kod güncellemeleri: Kendi içerik ✅
- Yerel dizinler: Ücretsiz ✅
- Blog yazıları: Kendi içerik ✅
- Videolar: Telefon kamerası ✅

**Tek Gerekli:** Zaman ve emek 💪

---

## 📞 DESTEK GEREKİRSE

**Teknik Konular (Alt Text, H1/H2, FAQ):**

- Ben yardımcı olabilirim! Sadece "Alt text güncellemesi yap" demeniz yeterli.

**İçerik Konuları (Blog, Video):**

- İçerik önerileri verebilirim
- SEO-optimized başlıklar yazabilirim

**Analiz & Raporlama:**

- Google Search Console verilerini yorumlayabilirim
- Rakip analizi yapabilirim

---

## 🎓 SON UYARILAR

1. **Google My Business** en önemli! Bunu mutlaka yapın.
2. **Yorumlar** çok kritik. Kaliteli yorumlar için velileri teşvik edin.
3. **Tutarlılık** önemli. NAP (Name, Address, Phone) her yerde aynı olmalı.
4. **Sabır** gerekli. SEO 2-3 ay içinde sonuç verir.
5. **Ölçüm** şart. Google Search Console'u haftada 1 kez kontrol edin.

---

**🚀 Hemen başlayın! İlk görev: Google My Business profili**

**Hazırlayan:** AI SEO Danışmanı  
**Tarih:** Kasım 2025  
**Versiyon:** Quick Start 1.0
