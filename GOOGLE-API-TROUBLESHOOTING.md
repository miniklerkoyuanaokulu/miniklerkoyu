# 🔧 Google Reviews API Sorun Giderme

## ❌ HATA: 500 - API Hatası

Terminal'de gördüğünüz hata:

```
GET /api/google-reviews 500 in 367ms
```

---

## ✅ KONTROL LİSTESİ (Sırayla Yapın)

### 1. **.env.local Dosyası Kontrolü** ✅

```bash
# Terminal'de çalıştırın
cat .env.local | grep GOOGLE
```

**Sonuç:**

```
✅ GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
✅ NEXT_PUBLIC_GOOGLE_PLACE_ID=YOUR_PLACE_ID_HERE
```

**Durum:** ✅ Değişkenler mevcut

---

### 2. **Places API Aktif mi?** ⚠️

**MUHTEMELEN SORUN BURASI!**

#### Kontrol Adımları:

1. https://console.cloud.google.com/ adresine gidin
2. Projenizi seçin (üstten)
3. Sol menüden **"APIs & Services"** → **"Enabled APIs & services"** seçin
4. Listede **"Places API"** var mı?

**❌ Yoksa:** Aktif edin!

1. **"+ ENABLE APIS AND SERVICES"** butonuna tıklayın
2. "Places API" arayın
3. **"Places API"** seçin
4. **"ENABLE"** butonuna tıklayın

**⚠️ UYARI:** "Places API" ve "Places API (New)" farklı şeyler!

- ✅ **"Places API"** seçin (eski ama stabil)
- ❌ "Places API (New)" beta versiyonu, farklı fiyatlandırma

---

### 3. **Billing Aktif mi?** ⚠️

**DİKKAT:** Google API'ler billing olmadan çalışmaz!

#### Kontrol:

1. Google Cloud Console'da sol menüden **"Billing"** seçin
2. Bir billing account bağlı mı?

**❌ Bağlı değilse:**

1. **"LINK A BILLING ACCOUNT"** butonuna tıklayın
2. Yeni billing account oluşturun:
   - Kredi kartı bilgileri girin
   - Adres bilgileri girin
3. **$200 ücretsiz kredi** otomatik gelir!

**💰 Endişelenmeyin:**

- İlk $200 ücretsiz
- Ayda sadece ~$12 harcarsınız
- Limit koyabilirsiniz
- Kredi bitmeden uyarı gelir

---

### 4. **API Key Kısıtlamaları** ⚠️

#### Kontrol:

1. Google Cloud Console → **"APIs & Services"** → **"Credentials"**
2. API Key'inizin yanındaki **düzenle** ikonuna tıklayın
3. **"API restrictions"** bölümüne bakın

**Şöyle olmalı:**

- ⚪ Don't restrict key (geçici test için) VEYA
- 🟢 Restrict key → **"Places API"** seçili

**Application restrictions:**

- 🟢 HTTP referrers (web sites)
- Şunlar ekli olmalı:
  ```
  http://localhost:3000/*
  http://localhost:*/*
  https://miniklerkoyuanaokulu.com/*
  ```

---

### 5. **Place ID Doğruluğu** ⚠️

#### Test Edin:

1. https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder adresine gidin
2. Arama kutusuna **"Vardalı Minikler Köyü"** yazın
3. Çıkan Place ID'yi `.env.local`'dekiyle karşılaştırın

**Şu an kullandığınız:**

```
YOUR_PLACE_ID (Place ID Finder'dan alın)
```

**Doğru mu?** Finder'da çıkan ile aynı olmalı!

---

## 🛠️ HIZLI ÇÖZÜM - TEST MODU

Eğer hızlıca test etmek istiyorsanız, geçici olarak API key kısıtlamalarını kaldırın:

1. Google Cloud Console → Credentials → API Key → Edit
2. **"API restrictions"** → **"Don't restrict key"** seçin
3. **SAVE**
4. 5 dakika bekleyin (değişiklik yayılması için)
5. `npm run dev` ile test edin

**⚠️ PRODUCTION'da mutlaka kısıtlama ekleyin!**

---

## 🧪 MANUEL TEST

### Terminal'de Test:

```bash
# API Key ve Place ID'nizi kullanarak:
curl "https://maps.googleapis.com/maps/api/place/details/json?place_id=YOUR_PLACE_ID&fields=name,rating&key=YOUR_API_KEY"
```

**Beklenen Sonuç (OK):**

```json
{
  "result": {
    "name": "Vardalı Minikler Köyü",
    "rating": 4.2
  },
  "status": "OK"
}
```

**Hata Durumları:**

❌ **"REQUEST_DENIED"**

```json
{
  "status": "REQUEST_DENIED",
  "error_message": "This API key is not authorized..."
}
```

**Çözüm:** Billing aktif değil veya Places API etkin değil

❌ **"INVALID_REQUEST"**

```json
{
  "status": "INVALID_REQUEST"
}
```

**Çözüm:** Place ID yanlış

---

## 📝 ADIM ADIM KONTROL (Tik İşaretleyin)

- [ ] **Google Cloud Console'a giriş yaptım**
- [ ] **Proje seçildi/oluşturuldu**
- [ ] **"APIs & Services" → "Library" → "Places API" → ENABLE tıkladım**
- [ ] **Billing account bağlandı (kredi kartı eklendi)**
- [ ] **API Key oluşturuldu**
- [ ] **API Key kısıtlamaları ayarlandı (localhost eklendi)**
- [ ] **API Key "Places API" için restrict edildi**
- [ ] **5 dakika bekledim (değişikliklerin yayılması için)**
- [ ] **Dev sunucusunu yeniden başlattım (`npm run dev`)**
- [ ] **http://localhost:3000/api/google-reviews test ettim**

---

## 🎯 EN YAGIN 3 SORUN

### 1. 🔴 **Places API Aktif Değil** (En Yaygın!)

**Çözüm:**

```
1. Google Cloud Console
2. "APIs & Services" → "Library"
3. "Places API" ara
4. "ENABLE" tıkla
5. 5 dakika bekle
```

### 2. 🔴 **Billing Kapalı**

**Çözüm:**

```
1. Google Cloud Console
2. "Billing" menüsü
3. "LINK A BILLING ACCOUNT"
4. Kredi kartı ekle (ücret alınmaz, $200 kredi gelir)
```

### 3. 🔴 **API Key Kısıtlamaları**

**Geçici Çözüm (Test için):**

```
1. Credentials → API Key → Edit
2. "API restrictions" → "Don't restrict key"
3. SAVE
4. 5 dakika bekle
```

---

## 💡 HIZLI TEST

Tarayıcınızda direkt şu URL'yi açın:

```
https://maps.googleapis.com/maps/api/place/details/json?place_id=YOUR_PLACE_ID&fields=name,rating&key=YOUR_API_KEY
```

**Sonuç:**

- ✅ `"status": "OK"` → API çalışıyor, başka bir sorun var
- ❌ `"status": "REQUEST_DENIED"` → Billing veya API aktif değil
- ❌ `"status": "INVALID_REQUEST"` → Place ID yanlış

---

## 📞 HEMEN YAPIN

1. **Google Cloud Console'a gidin:** https://console.cloud.google.com/
2. **Places API'yi aktif edin** (yukarıdaki adımları takip edin)
3. **Billing'i aktif edin** (kredi kartı ekleyin, $200 kredi gelir)
4. **5 dakika bekleyin**
5. **Dev sunucusunu yeniden başlatın:** `npm run dev`
6. **Test edin:** http://localhost:3000

---

## 🆘 HALA ÇALIŞMIYORSA

Terminal çıktısını bana gönderin. Şunları göreceğiz:

```bash
npm run dev
# Sonra anasayfayı açın
# Terminal'de şunlar çıkmalı:

API Key mevcut: true
Place ID mevcut: true
Google API Response Status: REQUEST_DENIED/OK/...
```

Bu log'ları bana gönderin, sorunun ne olduğunu tam olarak söylerim! 🔍

---

**Özet:** Muhtemelen **Places API aktif değil** veya **billing kapalı**. Yukarıdaki #1 ve #2 adımları yapın!
