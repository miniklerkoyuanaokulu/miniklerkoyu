import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export function useVideoUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadVideo = async (file: File, folder: string = "media/videos"): Promise<string> => {
    try {
      setUploading(true);
      setProgress(0);

      console.log("Video dosya boyutu:", (file.size / 1024 / 1024).toFixed(2), "MB");

      // Dosya adı (unique) - timestamp + extension
      const timestamp = Date.now();
      const extension = file.name.split('.').pop() || 'mp4';
      const fileName = `${folder}/${timestamp}.${extension}`;
      const storageRef = ref(storage, fileName);

      console.log("Firebase Storage'a video yükleniyor:", fileName);

      // Upload with progress tracking
      return new Promise((resolve, reject) => {
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progress tracking
            const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(Math.round(progressPercent));
            console.log(`Upload progress: ${progressPercent.toFixed(1)}%`);
          },
          (error) => {
            // Error handling
            console.error("Upload hatası:", error);
            setUploading(false);
            reject(error);
          },
          async () => {
            // Upload completed
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("Video URL alındı:", downloadURL);
              setProgress(100);
              setUploading(false);
              setTimeout(() => setProgress(0), 1000);
              resolve(downloadURL);
            } catch (error) {
              console.error("URL alma hatası:", error);
              setUploading(false);
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      console.error("Upload hatası:", error);
      setUploading(false);
      throw error;
    }
  };

  return { uploadVideo, uploading, progress };
}

