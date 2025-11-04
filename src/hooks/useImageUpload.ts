import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import imageCompression from "browser-image-compression";

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (file: File, folder: string = "instagram-thumbnails"): Promise<string> => {
    try {
      setUploading(true);
      setProgress(0);

      console.log("Orijinal dosya boyutu:", (file.size / 1024 / 1024).toFixed(2), "MB");

      // 1. Görüntü Optimizasyonu
      setProgress(10);
      const options = {
        maxSizeMB: 0.5, // Max 500KB
        maxWidthOrHeight: 1080, // Instagram thumbnail için yeterli
        useWebWorker: true,
        fileType: "image/webp", // WebP formatı (en küçük)
      };

      const compressedFile = await imageCompression(file, options);
      console.log("Optimize edilmiş boyut:", (compressedFile.size / 1024 / 1024).toFixed(2), "MB");
      console.log("Sıkıştırma oranı:", ((1 - compressedFile.size / file.size) * 100).toFixed(1), "%");

      // 2. Dosya adı (unique) - timestamp + .webp
      setProgress(30);
      const timestamp = Date.now();
      const fileName = `${folder}/${timestamp}.webp`;
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

