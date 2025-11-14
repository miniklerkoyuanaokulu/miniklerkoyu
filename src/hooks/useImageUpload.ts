import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import imageCompression from "browser-image-compression";

type ImageQuality = "high" | "medium" | "low";

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (
    file: File,
    folder: string = "instagram-thumbnails",
    quality: ImageQuality = "medium"
  ): Promise<string> => {
    try {
      setUploading(true);
      setProgress(0);

      console.log("Orijinal dosya boyutu:", (file.size / 1024 / 1024).toFixed(2), "MB");
      console.log("Kalite seviyesi:", quality);

      // 1. Görüntü Optimizasyonu - Kalite seviyesine göre ayarlar
      setProgress(10);
      
      let options: any;
      
      if (quality === "high") {
        // Yüksek kalite - Fotoğraf galerisi için
        options = {
          maxSizeMB: 5, // Max 5MB (yüksek kalite için daha büyük dosya)
          maxWidthOrHeight: 2560, // 2K+ kalite (daha net görüntü)
          useWebWorker: true,
          fileType: "image/jpeg", // JPEG (daha iyi kalite)
          initialQuality: 0.95, // %95 kalite (minimum sıkıştırma)
        };
      } else if (quality === "medium") {
        // Orta kalite - Genel kullanım
        options = {
          maxSizeMB: 1, // Max 1MB
          maxWidthOrHeight: 1440, // HD kalite
          useWebWorker: true,
          fileType: "image/webp", // WebP formatı
          initialQuality: 0.85, // %85 kalite
        };
      } else {
        // Düşük kalite - Instagram thumbnail için
        options = {
          maxSizeMB: 0.5, // Max 500KB
          maxWidthOrHeight: 1080, // Instagram thumbnail için yeterli
          useWebWorker: true,
          fileType: "image/webp", // WebP formatı (en küçük)
          initialQuality: 0.8, // %80 kalite
        };
      }

      const compressedFile = await imageCompression(file, options);
      console.log("Optimize edilmiş boyut:", (compressedFile.size / 1024 / 1024).toFixed(2), "MB");
      console.log("Sıkıştırma oranı:", ((1 - compressedFile.size / file.size) * 100).toFixed(1), "%");

      // 2. Dosya adı (unique) - kaliteye göre uzantı
      setProgress(30);
      const timestamp = Date.now();
      const extension = quality === "high" ? "jpg" : "webp";
      const fileName = `${folder}/${timestamp}.${extension}`;
      const storageRef = ref(storage, fileName);

      console.log("Firebase Storage'a yükleniyor:", fileName);
      
      // 3. Upload
      setProgress(50);
      const snapshot = await uploadBytes(storageRef, compressedFile);
      
      setProgress(80);
      console.log("Upload tamamlandı, download URL alınıyor...");
      
      // 4. Download URL al
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setProgress(100);
      console.log("Download URL alındı:", downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error("Upload hatası:", error);
      throw error;
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return { uploadImage, uploading, progress };
}

