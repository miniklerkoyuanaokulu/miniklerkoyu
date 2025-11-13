# 🚨 GÜVENLİK OLAYI - API Key GitHub'da Yayınlandı

## ⚠️ DURUM

Google API Key'iniz GitHub'da public olarak yayınlandı ve Google tarafından tespit edildi.

**Dosya:** `GOOGLE-API-TROUBLESHOOTING.md`  
**Exposed Key:** AIzaSy... (eski key, zaten silindi)  
**Exposed Place ID:** ChIJ... (Place ID'ler public olabilir)

---

## 🔴 HEMEN YAPIN (ÖNCELİK SIRASINA GÖRE)

### ADIM 1: API Key'i Sil ve Yenile (5 dakika) ⚡

1. **Eski Key'i Silin:**
   ```
   https://console.cloud.google.com/apis/credentials
   → Eski key'in yanındaki 🗑️ DELETE
   → Confirm
   ```

2. **Yeni Key Oluşturun:**
   ```
   → "+ CREATE CREDENTIALS"
   → "API key"
   → Yeni key kopyalayın
   ```

3. **Yeni Key'i Kısıtlayın:**
   ```
   → Edit yeni key
   → Application restrictions: None
   → API restrictions: Places API
   → SAVE
   ```

4. **`.env.local`'i Güncelleyin:**
   ```bash
   # .env.local dosyasını açın
   GOOGLE_MAPS_API_KEY=YENİ_API_KEY_BURAYA
   ```

5. **Dev sunucusunu yeniden başlatın:**
   ```bash
   npm run dev
   ```

---

### ADIM 2: Dosyayı Düzeltin ve Push Edin (2 dakika)

**Ben zaten düzelttim!** Şimdi commit edin:

```bash
git add GOOGLE-API-TROUBLESHOOTING.md
git commit -m "security: remove exposed API keys from documentation"
git push
```

---

### ADIM 3: Git History'den Temizleyin (10 dakika) ⚠️

**ÖNEMLİ:** Sadece dosyayı düzeltip push etmek yeterli DEĞİL! Git history'de hala var.

#### Seçenek A: BFG Repo-Cleaner (Kolay)

```bash
# BFG indir
brew install bfg  # veya https://rtyley.github.io/bfg-repo-cleaner/

# Repo'yu clone edin (yeni klasör)
cd ~/Desktop
git clone --mirror https://github.com/KULLANICI_ADINIZ/vardaminiklerkoyu.git

# API key'i temizle
bfg --replace-text passwords.txt vardaminiklerkoyu.git

# passwords.txt içeriği:
# EXPOSED_API_KEY_BURAYA
# EXPOSED_PLACE_ID_BURAYA (opsiyonel)

# History'yi temizle
cd vardaminiklerkoyu.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Push force
git push --force
```

#### Seçenek B: GitHub'a Yeni Repo (En Kolay)

**Tavsiye edilen!** Eğer repo yeni ise:

```bash
# 1. GitHub'da eski repo'yu SİLİN
# 2. Yeni repo oluşturun (aynı isimle)
# 3. Local'den push edin:

cd /Users/zaferdemirel/Desktop/myprojects/vardaminiklerkoyu
git remote remove origin
git remote add origin https://github.com/KULLANICI_ADINIZ/vardaminiklerkoyu.git
git push -u origin main
```

---

### ADIM 4: .gitignore Kontrol (1 dakika)

<function_calls>
<invoke name="read_file">
<parameter name="target_file">/Users/zaferdemirel/Desktop/myprojects/vardaminiklerkoyu/.gitignore
