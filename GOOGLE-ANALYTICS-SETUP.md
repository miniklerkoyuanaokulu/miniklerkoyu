# Google Analytics 4 (GA4) Entegrasyon Rehberi

## 📋 İçindekiler

1. [Kurulum Adımları](#kurulum-adımları)
2. [Environment Variables Ayarı](#environment-variables-ayarı)
3. [Test ve Doğrulama](#test-ve-doğrulama)
4. [GA4 Dashboard'unda Ne Görebilirsiniz](#ga4-dashboardunda-ne-görebilirsiniz)
5. [İzlenen Olaylar](#izlenen-olaylar)
6. [Özel Raporlar Oluşturma](#özel-raporlar-oluşturma)
7. [Sorun Giderme](#sorun-giderme)

---

## 🚀 Kurulum Adımları

### 1. Google Analytics 4 Hesabı Oluşturma

#### a) Google Analytics'e Giriş
- https://analytics.google.com/ adresine gidin
- Google hesabınızla giriş yapın

#### b) Property Oluşturma
1. Sol alttaki **"Admin"** (Yönetici) sekmesine tıklayın
2. **"Create Property"** (Property Oluştur) butonuna tıklayın
3. Property bilgilerini doldurun:
   - **Property adı:** "Varda Minikler Köyü"
   - **Saat dilimi:** "Turkey" (GMT+3)
   - **Para birimi:** "Turkish Lira (TRY)"
4. **"Next"** butonuna tıklayın

#### c) İş Bilgileri
1. **Sektör kategorisi:** "Education" (Eğitim)
2. **İşletme büyüklüğü:** Seçin
3. GA4'ü nasıl kullanmak istediğinizi seçin
4. **"Create"** butonuna tıklayın

#### d) Web Veri Akışı Oluşturma
1. **"Web"** seçeneğini seçin
2. **Website URL:** Sitenizin tam URL'ini girin (örn: https://miniklerkoyu.vercel.app)
3. **Stream name:** "Varda Minikler Köyü Website"
4. **"Create stream"** butonuna tıklayın

#### e) Measurement ID'yi Kaydetme
- **ÖNEMLİ:** Ekranda gördüğünüz **"G-XXXXXXXXXX"** formatındaki ID'yi kopyalayın
- Bu ID'yi güvenli bir yere kaydedin

#### f) Gelişmiş Ölçümleri Etkinleştirme
1. Stream detaylarında **"Enhanced measurement"** bölümüne gidin
2. Aşağıdaki seçeneklerin aktif olduğundan emin olun:
   - ✅ Page views (Sayfa görüntülemeleri)
   - ✅ Scrolls (Kaydırma)
   - ✅ Outbound clicks (Dış bağlantı tıklamaları)
   - ✅ Site search (Site araması)
   - ✅ Video engagement (Video etkileşimi)
   - ✅ File downloads (Dosya indirmeleri)

---

## 🔧 Environment Variables Ayarı

### 1. .env.local Dosyası Oluşturma

Proje kök dizininde `.env.local` dosyası oluşturun (eğer yoksa):

```bash
# Terminalde proje dizininde çalıştırın
touch .env.local
```

### 2. Measurement ID'yi Ekleme

`.env.local` dosyasını açın ve şu satırı ekleyin:

```env
# Google Analytics 4 Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Not:** `G-XXXXXXXXXX` yerine kendi Measurement ID'nizi yazın.

### 3. Vercel'de Environment Variables Ayarı (Production için)

1. Vercel Dashboard'a gidin
2. Projenizi seçin
3. **Settings** > **Environment Variables** bölümüne gidin
4. Yeni değişken ekleyin:
   - **Name:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value:** `G-XXXXXXXXXX` (kendi ID'niz)
   - **Environment:** Production, Preview, Development (hepsini seçin)
5. **Save** butonuna tıklayın
6. Yeni deployment yapın (değişikliğin aktif olması için)

---

## ✅ Test ve Doğrulama

### 1. Development Ortamında Test

#### a) Sunucuyu Başlatma
```bash
npm run dev
```

#### b) Chrome DevTools ile Test

1. Siteyi tarayıcıda açın: `http://localhost:3000`
2. **Chrome DevTools**'u açın (`F12` veya `Cmd+Option+I`)
3. **Console** sekmesine gidin
4. Aşağıdaki komutu yazın:

```javascript
// GA4'ün yüklendiğini kontrol et
console.log(window.gtag);
console.log(window.dataLayer);
```

Eğer `undefined` değilse, GA4 başarıyla yüklenmiş demektir.

#### c) Network Tab ile Kontrol

1. DevTools'da **Network** sekmesine gidin
2. Filtreyi `gtm` veya `analytics` olarak ayarlayın
3. Sayfayı yenileyin
4. `https://www.googletagmanager.com/gtag/js?id=G-...` gibi istekler görmelisiniz
5. `https://www.google-analytics.com/g/collect` gibi data gönderme istekleri görmelisiniz

#### d) Google Analytics DebugView Kullanma

**En iyi test yöntemi budur!**

1. Chrome'da **Google Analytics Debugger** uzantısını yükleyin:
   - https://chrome.google.com/webstore/detail/google-analytics-debugger/
   
2. Veya URL'ye `?debug_mode=true` parametresi ekleyin:
   ```
   http://localhost:3000?debug_mode=true
   ```

3. Google Analytics Dashboard'a gidin:
   - **Admin** > **DebugView** sekmesine tıklayın
   
4. Sitenizde gezinmeye başlayın

5. **DebugView**'da gerçek zamanlı olarak olayları göreceksiniz:
   - Sayfa görüntülemeleri
   - Buton tıklamaları
   - Form gönderimleri
   - vb.

### 2. Production Ortamında Test

Production'da test etmek için:

1. **Google Tag Assistant** Chrome uzantısını yükleyin
2. Canlı sitenizi açın
3. Tag Assistant'ı etkinleştirin
4. Sayfada gezinin
5. GA4 tag'lerinin doğru çalıştığını doğrulayın

### 3. Manuel Test Senaryoları

Her bir özelliği test edin:

- ✅ **Sayfa Görüntüleme:** Farklı sayfalara gidin
- ✅ **WhatsApp Butonu:** Floating WhatsApp butonuna tıklayın
- ✅ **Telefon Butonu:** Floating telefon butonuna tıklayın
- ✅ **Instagram Butonu:** Floating Instagram butonuna tıklayın
- ✅ **Navbar Menü:** Navbar'daki menü öğelerine tıklayın
- ✅ **Mobile Menü:** Mobil menüyü açıp kapayın
- ✅ **Footer Linkleri:** Footer'daki linklere tıklayın
- ✅ **Ön Kayıt Formu:** Formu doldurup gönderin
- ✅ **Scroll:** Sayfayı aşağı kaydırın (25%, 50%, 75%, 100%)

---

## 📊 GA4 Dashboard'unda Ne Görebilirsiniz

### 1. Real-time Report (Gerçek Zamanlı Rapor)

**Yol:** Reports > Realtime

**Göreceğiniz Veriler:**
- 📍 Şu anda sitede kaç kullanıcı var
- 🌍 Kullanıcılar hangi şehirden geliyor
- 📱 Mobil mi, desktop mı kullanıyorlar
- 📄 Hangi sayfalarda geziniyorlar
- 🎯 Hangi olaylar tetikleniyor

### 2. Traffic Acquisition (Trafik Kaynakları)

**Yol:** Reports > Acquisition > Traffic acquisition

**Göreceğiniz Veriler:**
- 🔍 Google'dan mı geliyorlar?
- 📱 Sosyal medyadan mı?
- 🔗 Direkt mi siteyi ziyaret ediyorlar?
- 📧 Email kampanyalarından mı?

### 3. Pages and Screens (Sayfa Performansı)

**Yol:** Reports > Engagement > Pages and screens

**Göreceğiniz Veriler:**
- 👁️ En çok görüntülenen sayfalar
- ⏱️ Ortalama sayfa başına süre
- 🚪 Çıkış oranları
- 📊 Sayfa başına etkileşim oranı

### 4. Events (Olaylar)

**Yol:** Reports > Engagement > Events

**Göreceğiniz Veriler:**
- 🎯 Hangi butonlar tıklanıyor
- 📝 Form gönderim oranları
- 📞 İletişim butonları tıklama sayıları
- 📱 Sosyal medya etkileşimleri

### 5. Demographics (Demografik Bilgiler)

**Yol:** Reports > User > Demographics

**Göreceğiniz Veriler:**
- 🏙️ Hangi şehirlerden geliyorlar (İstanbul, Ankara, İzmir, Adana, vb.)
- 🌍 Hangi ülkelerden
- 🗣️ Hangi dilde geziniyorlar

### 6. Tech Details (Teknoloji Detayları)

**Yol:** Reports > User > Tech > Overview

**Göreceğiniz Veriler:**
- 📱 Mobil cihaz kullanım oranı
- 💻 Desktop kullanım oranı
- 🌐 Hangi tarayıcılar (Chrome, Safari, Firefox, vb.)
- 📱 Hangi cihazlar (iPhone, Samsung, vb.)
- 💾 Hangi işletim sistemleri (iOS, Android, Windows, vb.)

---

## 🎯 İzlenen Olaylar

### Otomatik İzlenen Olaylar

| Olay Adı | Açıklama | Ne Zaman Tetiklenir |
|----------|----------|---------------------|
| `page_view` | Sayfa görüntüleme | Her sayfa değişiminde |
| `scroll` | Kaydırma derinliği | %25, %50, %75, %100'de |
| `time_on_page` | Sayfa üzerinde kalma süresi | Sayfa kapatılırken/değişirken |

### Özel İzlenen Olaylar

| Olay Adı | Kategori | Ne İzler |
|----------|----------|----------|
| `click` | Button | Buton tıklamaları |
| `click_to_call` | Contact | Telefon butonu tıklamaları |
| `click_whatsapp` | Contact | WhatsApp butonu tıklamaları |
| `click_instagram` | Social Media | Instagram butonu tıklamaları |
| `click_email` | Contact | Email butonu tıklamaları |
| `click` | Navigation | Menü öğesi tıklamaları |
| `open` / `close` | Mobile Menu | Mobil menü açma/kapama |
| `start` | Pre-Registration | Ön kayıt formu başlatma |
| `complete` | Pre-Registration | Ön kayıt formu tamamlama |
| `form_submit_success` | Form | Başarılı form gönderimi |
| `form_submit_error` | Form | Hatalı form gönderimi |

---

## 📈 Özel Raporlar Oluşturma

### 1. En Çok Tıklanan Butonlar Raporu

**Adımlar:**
1. GA4 Dashboard > **Explore** > **Free form** seçin
2. **Dimensions** bölümüne `Event name` ve `Event label` ekleyin
3. **Metrics** bölümüne `Event count` ekleyin
4. **Rows** kısmına `Event label` sürükleyin
5. **Values** kısmına `Event count` sürükleyin
6. **Filters** ekleyin: `Event category` = "Button"
7. Raporu kaydedin: "En Çok Tıklanan Butonlar"

### 2. Şehir Bazlı Ziyaretçi Analizi

**Adımlar:**
1. **Explore** > **Free form** seçin
2. **Dimensions:** `City` ekleyin
3. **Metrics:** `Active users`, `Sessions`, `Engagement rate` ekleyin
4. **Rows:** `City` sürükleyin
5. **Values:** Metrikleri sürükleyin
6. Raporu kaydedin: "Şehir Bazlı Ziyaretçiler"

### 3. Mobil vs Desktop Performans

**Adımlar:**
1. **Explore** > **Free form** seçin
2. **Dimensions:** `Device category` ekleyin
3. **Metrics:** `Users`, `Sessions`, `Average engagement time`, `Conversions` ekleyin
4. **Rows:** `Device category` sürükleyin
5. **Comparison** ekleyin: Mobil vs Desktop
6. Raporu kaydedin: "Mobil vs Desktop"

### 4. Ön Kayıt Formu Başarı Oranı

**Adımlar:**
1. **Explore** > **Funnel exploration** seçin
2. **Steps** (Adımlar) ekleyin:
   - Adım 1: `page_view` (İletişim sayfası)
   - Adım 2: `start` (Form başlatma)
   - Adım 3: `form_submit_success` (Form gönderimi)
3. **Breakdown:** `Device category` ekleyin
4. Raporu kaydedin: "Ön Kayıt Formu Hunisi"

### 5. Haftalık Performans Raporu

**Adımlar:**
1. **Explore** > **Free form** seçin
2. **Date range:** Son 7 gün
3. **Dimensions:** `Date` ve `Hour` ekleyin
4. **Metrics:** `Active users`, `Sessions`, `Events per session` ekleyin
5. **Chart type:** Line chart seçin
6. Raporu kaydedin: "Haftalık Trafik Trendi"

---

## 🔔 Önerilen Dashboard Ayarları

### 1. Custom Dashboard Oluşturma

**Yol:** Reports > Library > Create new report

Önerilen kartlar:

1. **Gerçek Zamanlı Kullanıcılar**
   - Metric: Active users (realtime)

2. **Bugünkü Ziyaretçiler**
   - Metric: Total users (today)
   - Comparison: Dünle karşılaştırma

3. **En Popüler Sayfalar**
   - Dimension: Page path
   - Metric: Views

4. **En Çok Tıklanan Butonlar**
   - Dimension: Event label
   - Filter: Event category = Button

5. **Şehir Dağılımı**
   - Dimension: City
   - Metric: Users
   - Chart: Map

6. **Cihaz Dağılımı**
   - Dimension: Device category
   - Chart: Pie chart

7. **Ön Kayıt Form Başarı Oranı**
   - Metric: form_submit_success / start
   - Format: Percentage

### 2. Email Raporları Ayarlama

**Yol:** Admin > Property > Data display > Email reports

1. **Günlük Özet Raporu:**
   - Frequency: Daily
   - Time: 09:00
   - Recipients: E-posta adresiniz
   - Content: Daily summary

2. **Haftalık Detaylı Rapor:**
   - Frequency: Weekly (Pazartesi)
   - Time: 09:00
   - Content: Custom report (oluşturduğunuz özel raporlar)

---

## 🐛 Sorun Giderme

### Sorun 1: GA4 Çalışmıyor / Veri Gelmiyor

**Çözümler:**

1. **Environment Variable Kontrolü:**
   ```bash
   # Terminal'de kontrol edin
   echo $NEXT_PUBLIC_GA_MEASUREMENT_ID
   ```
   
   Eğer boş geliyorsa:
   - `.env.local` dosyasını kontrol edin
   - Sunucuyu yeniden başlatın: `npm run dev`

2. **Browser Console Kontrolü:**
   ```javascript
   // Console'da çalıştırın
   console.log(window.gtag);
   console.log(window.dataLayer);
   ```
   
   Eğer `undefined` ise:
   - Measurement ID'nin doğru olduğundan emin olun
   - Ad blocker kapalı olduğundan emin olun

3. **Ad Blocker:**
   - Ad blocker'ı devre dışı bırakın
   - veya Developer mode'da test edin

4. **Gecikmeli Veri:**
   - GA4'te veriler 24-48 saat gecikmeyle görünebilir
   - Gerçek zamanlı test için **DebugView** kullanın

### Sorun 2: Olaylar Kaydedilmiyor

**Çözümler:**

1. **Console Error Kontrolü:**
   - Browser console'da hata var mı bakın
   - `trackXXX` fonksiyonlarının import edildiğinden emin olun

2. **DebugView Kullanın:**
   - Admin > DebugView'da olayları gerçek zamanlı izleyin
   - Hangi olayların geldiğini/gelmediğini görün

3. **Event Parameters Kontrolü:**
   - Olay parametrelerinin doğru formatda olduğundan emin olun

### Sorun 3: Yanlış Sayfa Görüntülemeleri

**Çözüm:**

`GoogleAnalytics.tsx` dosyasındaki `useEffect` bağımlılıklarını kontrol edin:

```typescript
useEffect(() => {
  if (pathname && GA_MEASUREMENT_ID) {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    pageview(url);
  }
}, [pathname, searchParams]); // Bu bağımlılıklar önemli
```

### Sorun 4: Production'da Çalışmıyor

**Çözümler:**

1. **Vercel Environment Variables:**
   - Vercel Dashboard > Settings > Environment Variables
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` eklenmiş mi kontrol edin
   - Tüm ortamlar seçili mi? (Production, Preview, Development)

2. **Yeni Deployment:**
   ```bash
   # Yeni deployment yapın
   git add .
   git commit -m "Add GA4"
   git push
   ```

3. **Build Logs:**
   - Vercel deployment logs'larını kontrol edin
   - Environment variable hatası var mı bakın

### Sorun 5: Aynı Olay Birden Fazla Kez Kaydediliyor

**Çözüm:**

React Strict Mode'dan kaynaklanıyor olabilir. `next.config.ts` dosyasında:

```typescript
const config: NextConfig = {
  reactStrictMode: false, // Development'ta false yapın
};
```

Production'da bu sorun olmaz.

---

## 📊 İlk 30 Gün Hedefler Belirleme

### Önerilen KPI'lar (Key Performance Indicators)

| Metrik | Hedef (İlk 30 Gün) |
|--------|-------------------|
| Günlük Ziyaretçi | 50-100 |
| Haftalık Ziyaretçi | 300-500 |
| Aylık Ziyaretçi | 1000-1500 |
| Ortalama Oturum Süresi | 2-3 dakika |
| Sayfa/Oturum | 3-4 sayfa |
| Çıkış Oranı | %40-60 |
| Ön Kayıt Form Dönüşüm Oranı | %5-10 |
| Mobil Trafik Oranı | %60-70 |

---

## 📚 Faydalı Kaynaklar

- **Google Analytics 4 Documentation:** https://support.google.com/analytics/
- **GA4 DebugView:** https://support.google.com/analytics/answer/7201382
- **Next.js Analytics:** https://nextjs.org/docs/app/building-your-application/optimizing/analytics
- **Google Tag Manager:** https://tagmanager.google.com/

---

## 💡 İpuçları

1. **Düzenli Kontrol:** Her sabah 10-15 dakika GA4 dashboard'una bakın
2. **Haftalık Analiz:** Her hafta raporları inceleyin ve trendleri takip edin
3. **A/B Testing:** Farklı CTA butonları test edin
4. **Conversion Tracking:** Ön kayıt formunu en önemli conversion olarak işaretleyin
5. **Custom Alerts:** Anormal trafik düşüşleri için uyarılar kurun

---

## 🎉 Tebrikler!

Google Analytics 4 entegrasyonunuz tamamlandı! Artık sitenizin performansını detaylı bir şekilde takip edebilirsiniz.

**Sonraki Adımlar:**
- ✅ İlk 7 gün verileri toplayın
- ✅ Baseline (temel) metriklerinizi belirleyin
- ✅ Hedeflerinizi netleştirin
- ✅ Haftalık raporlama rutini oluşturun

---

**Hazırlayan:** AI Assistant  
**Tarih:** 2025  
**Versiyon:** 1.0

