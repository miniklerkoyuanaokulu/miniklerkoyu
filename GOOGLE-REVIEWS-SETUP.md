# Google Reviews Entegrasyonu Kurulum Rehberi

## ✅ TAMAMLANAN İŞLEMLER

1. ✅ API Route oluşturuldu: `src/app/api/google-reviews/route.ts`
2. ✅ Component oluşturuldu: `src/components/GoogleReviews.tsx`
3. ✅ Anasayfaya eklendi: Google yorumları medya ve ön kayıt arasında gösteriliyor

---

## 🔑 GOOGLE MAPS API KEY ALMA

### Adım 1: Google Cloud Console'a Giriş

1. https://console.cloud.google.com/ adresine gidin
2. Google hesabınızla giriş yapın
3. Yeni bir proje oluşturun veya mevcut projeyi seçin

### Adım 2: Places API'yi Aktif Edin

1. Sol menüden **"APIs & Services"** → **"Library"** seçin
2. Arama kutusuna **"Places API"** yazın
3. **"Places API"** seçin ve **"ENABLE"** butonuna tıklayın

### Adım 3: API Key Oluşturun

1. Sol menüden **"APIs & Services"** → **"Credentials"** seçin
2. Üstten **"+ CREATE CREDENTIALS"** → **"API key"** seçin
3. API key'iniz oluşturuldu! Kopyalayın

### Adım 4: API Key'i Kısıtlayın (GÜVENLİK!)

**ÖNEMLİ:** API key'inizi mutlaka kısıtlayın!

1. Oluşturulan key'in yanındaki **düzenle** ikonuna tıklayın
2. **"Application restrictions"** bölümünde:
   - **"HTTP referrers (web sites)"** seçin
   - **"ADD AN ITEM"** tıklayın
   - Şunları ekleyin:
     ```
     https://miniklerkoyuanaokulu.com/*
     https://*.miniklerkoyuanaokulu.com/*
     http://localhost:3000/*
     http://localhost:*/*
     ```

3. **"API restrictions"** bölümünde:
   - **"Restrict key"** seçin
   - **"Places API"** seçin

4. **"SAVE"** butonuna tıklayın

---

## 📍 GOOGLE PLACE ID BULMA

### Yöntem 1: Place ID Finder (Kolay)

1. https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder adresine gidin
2. Arama kutusuna **"Vardalı Minikler Köyü"** yazın
3. İşletmenizi seçin
4. Place ID gösterilecek (örnek: `ChIJ...`)
5. Kopyalayın!

### Yöntem 2: Google Maps URL'den

1. Google Maps'te işletmenizi bulun
2. URL'ye bakın: `https://www.google.com/maps/place/...`
3. URL'deki `data=...!1s...!3m1!1s` kısmından sonraki kod Place ID'dir

### Yöntem 3: Manuel Arama

```bash
# Terminal'de çalıştırın (API key'inizi yerleştirin)
curl "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Vardalı%20Minikler%20Köyü%20Anaokulu&inputtype=textquery&fields=place_id&key=YOUR_API_KEY"
```

---

## ⚙️ .env.local DOSYASINA EKLEME

`.env.local` dosyanıza şunları ekleyin:

```env
# Google Maps & Reviews
GOOGLE_MAPS_API_KEY=AIzaSy... (sizin API key'iniz)
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJ... (sizin Place ID'niz)
```

**ÖNEMLİ NOTLAR:**
- `GOOGLE_MAPS_API_KEY` → `NEXT_PUBLIC_` yok (sadece server-side)
- `NEXT_PUBLIC_GOOGLE_PLACE_ID` → `NEXT_PUBLIC_` var (client-side kullanılacak)

---

## 🧪 TEST ETME

### 1. Development Ortamında Test

```bash
npm run dev
```

Tarayıcıda açın: http://localhost:3000

Anasayfada aşağı kaydırın, "Veli Görüşleri" bölümünü göreceksiniz.

### 2. API Test

Tarayıcıda açın: http://localhost:3000/api/google-reviews

Şöyle bir JSON görmelisiniz:
```json
{
  "reviews": [...],
  "totalRating": 4.2,
  "totalReviews": 25
}
```

### 3. Hata Kontrolü

**Eğer hata alırsanız:**

❌ **"API key veya Place ID eksik"**
- `.env.local` dosyasını kontrol edin
- Değişkenleri doğru yazdığınızdan emin olun
- Dev sunucusunu yeniden başlatın (`npm run dev`)

❌ **"Google API hatası"**
- API key'in doğru olduğunu kontrol edin
- Places API'nin aktif olduğunu kontrol edin
- API key kısıtlamalarını kontrol edin

❌ **"REQUEST_DENIED"**
- API key kısıtlamalarında `localhost` ekli mi kontrol edin
- Billing aktif mi kontrol edin (Google Cloud Console)

---

## 💰 MALİYET & BILLING

### Google Places API Fiyatlandırması

- **Place Details (Basic):** $17 per 1,000 requests
- **Aylık Ücretsiz Kullanım:** $200 kredi

### Sizin Kullanımınız:

```
Aylık request sayısı: ~720 request (saatte 1 cache)
Maliyet: 720 * $17 / 1000 = ~$12.24/ay

Ücretsiz $200 kredi ile: 11,764 request/ay ÜCRETSİZ!
```

**Sonuç:** Siteniz için **TAMAMEN ÜCRETSİZ** olacak! 🎉

### Billing Aktif Etme (Zorunlu)

Google API kullanmak için billing aktif olmalı:

1. Google Cloud Console → **"Billing"**
2. **"LINK A BILLING ACCOUNT"**
3. Kredi kartı bilgileri girin
4. $200 ücretsiz kredi otomatik gelir

**Endişelenmeyin:** Limit belirleyebilirsiniz, kredi bitmeden uyarı gelir.

---

## 🎨 KİŞİSELLEŞTİRME

### Gösterilecek Yorum Sayısı

`src/components/GoogleReviews.tsx` dosyasında:

```typescript
// Satır 56
const displayReviews = data.reviews.slice(0, 6); // 6 yerine istediğiniz sayıyı yazın
```

### Minimum Yıldız Sayısı

`src/app/api/google-reviews/route.ts` dosyasında:

```typescript
// Satır 32
const positiveReviews = allReviews.filter((r: any) => r.rating >= 4); // 4 yerine 3 veya 5 yapabilirsiniz
```

### Cache Süresi

API yanıtları 1 saat cache'lenir. Değiştirmek için:

`src/app/api/google-reviews/route.ts` dosyasında:

```typescript
// Satır 14
next: { revalidate: 3600 }, // 3600 saniye = 1 saat
```

---

## 🚀 PRODUCTION'A DEPLOY

### Vercel'e Deploy Ederken

1. Vercel Dashboard → Proje → **"Settings"** → **"Environment Variables"**
2. Şunları ekleyin:
   ```
   GOOGLE_MAPS_API_KEY = AIzaSy...
   NEXT_PUBLIC_GOOGLE_PLACE_ID = ChIJ...
   ```
3. **"Save"** butonuna tıklayın
4. Projeyi yeniden deploy edin

### API Key Kısıtlamaları (Production)

Google Cloud Console'da API key kısıtlamalarına production domain'inizi ekleyin:

```
https://miniklerkoyuanaokulu.com/*
https://*.miniklerkoyuanaokulu.com/*
https://*.vercel.app/*
```

---

## 📊 BAŞARILI ENTEGRASYON KONTROL LİSTESİ

- [ ] Google Cloud Console'da proje oluşturuldu
- [ ] Places API aktif edildi
- [ ] API Key oluşturuldu
- [ ] API Key kısıtlamaları ayarlandı (güvenlik!)
- [ ] Billing aktif edildi
- [ ] Place ID bulundu
- [ ] `.env.local` dosyasına eklendi
- [ ] Dev sunucusu yeniden başlatıldı
- [ ] Anasayfada yorumlar görünüyor
- [ ] API testi başarılı
- [ ] Production'da environment variables eklendi

---

## 🆘 SORUN GİDERME

### Yorumlar Gösterilmiyor

1. **Console'u kontrol edin:**
   - Chrome DevTools → Console tab
   - Hata var mı?

2. **API'yi manuel test edin:**
   - http://localhost:3000/api/google-reviews
   - JSON yanıt geliyor mu?

3. **Environment variables'ı kontrol edin:**
   ```bash
   # Terminal'de
   echo $GOOGLE_MAPS_API_KEY
   echo $NEXT_PUBLIC_GOOGLE_PLACE_ID
   ```

4. **Dev sunucusunu yeniden başlatın:**
   ```bash
   # Ctrl+C ile durdurun
   npm run dev
   ```

### API Hatası Alıyorum

**"REQUEST_DENIED":**
- API key doğru mu?
- Places API aktif mi?
- Billing aktif mi?

**"INVALID_REQUEST":**
- Place ID doğru mu?
- Format doğru mu? (ChIJ... ile başlamalı)

**"OVER_QUERY_LIMIT":**
- Günlük limiti aştınız
- Billing kontrol edin
- Cache süresini artırın

---

## 📞 DESTEK

**Google Cloud Destek:**
- https://cloud.google.com/support

**Places API Dokümantasyonu:**
- https://developers.google.com/maps/documentation/places/web-service/overview

**Kod ile ilgili sorular:**
- Bana sorabilirsiniz! 😊

---

**Son Güncelleme:** Kasım 2025  
**Versiyon:** 1.0  
**Durum:** ✅ Production Ready

