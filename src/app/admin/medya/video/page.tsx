"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaVideo,
  FaPlus,
  FaTrash,
  FaEdit,
  FaTimes,
  FaYoutube,
  FaUpload,
} from "react-icons/fa";
import {
  getMediaItems,
  addMediaItem,
  updateMediaItem,
  deleteMediaItem,
} from "@/lib/firestore";
import { useVideoUpload } from "@/hooks/useVideoUpload";
import {
  extractYouTubeVideoId,
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  isValidYouTubeUrl,
} from "@/lib/youtube";

type MediaItem = {
  id: string;
  url: string;
  type: "video";
  caption?: string;
  thumbnailUrl?: string;
  source?: "upload" | "youtube";
  createdAt: number;
};

export default function AdminVideoGalerisi() {
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadType, setUploadType] = useState<"file" | "youtube">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [currentCaption, setCurrentCaption] = useState("");
  const [editingVideo, setEditingVideo] = useState<MediaItem | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const { uploadVideo, uploading: videoUploading, progress } = useVideoUpload();

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    try {
      setLoading(true);
      const data = await getMediaItems("video");
      setVideos(data as MediaItem[]);
    } catch (error) {
      console.error("Videolar yüklenirken hata:", error);
      alert("Videolar yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    // Sadece video dosyaları
    if (!file.type.startsWith("video/")) {
      alert("Sadece video dosyaları yükleyebilirsiniz");
      return;
    }

    // Max 100MB kontrol
    if (file.size > 100 * 1024 * 1024) {
      alert("Video dosyası maksimum 100MB olabilir");
      return;
    }

    setSelectedFile(file);
  }

  // Drag & Drop handlers
  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (!file) return;

    // Sadece video dosyaları
    if (!file.type.startsWith("video/")) {
      alert("Sadece video dosyaları yükleyebilirsiniz");
      return;
    }

    // Max 100MB kontrol
    if (file.size > 100 * 1024 * 1024) {
      alert("Video dosyası maksimum 100MB olabilir");
      return;
    }

    setSelectedFile(file);
  }

  async function handleUpload() {
    setUploadingVideo(true);

    try {
      let videoUrl = "";
      let thumbnailUrl = "";
      let source: "upload" | "youtube" = "upload";

      if (uploadType === "file") {
        // Dosya yükleme
        if (!selectedFile) {
          alert("Lütfen bir video dosyası seçin");
          return;
        }

        videoUrl = await uploadVideo(selectedFile);
        source = "upload";
      } else {
        // YouTube linki
        if (!youtubeUrl.trim()) {
          alert("Lütfen bir YouTube linki girin");
          return;
        }

        if (!isValidYouTubeUrl(youtubeUrl)) {
          alert(
            "Geçersiz YouTube linki. Lütfen geçerli bir YouTube video linki girin."
          );
          return;
        }

        const videoId = extractYouTubeVideoId(youtubeUrl);
        if (!videoId) {
          alert("YouTube video ID'si alınamadı");
          return;
        }

        videoUrl = getYouTubeEmbedUrl(videoId);
        thumbnailUrl = getYouTubeThumbnailUrl(videoId, "hq");
        source = "youtube";
      }

      // Firestore'a kaydet
      const videoData: {
        url: string;
        type: "video";
        caption?: string;
        thumbnailUrl?: string;
        source?: "upload" | "youtube";
      } = {
        url: videoUrl,
        type: "video",
        source,
      };

      if (currentCaption?.trim()) {
        videoData.caption = currentCaption.trim();
      }

      if (thumbnailUrl) {
        videoData.thumbnailUrl = thumbnailUrl;
      }

      await addMediaItem(videoData);

      await loadVideos();
      setSelectedFile(null);
      setYoutubeUrl("");
      setCurrentCaption("");
      setShowUpload(false);
      alert("Video başarıyla eklendi!");
    } catch (error) {
      console.error("Upload hatası:", error);
      alert("Video yüklenirken bir hata oluştu");
    } finally {
      setUploadingVideo(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu videoyu silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      await deleteMediaItem(id);
      await loadVideos();
    } catch (error) {
      console.error("Silme hatası:", error);
      alert("Video silinemedi");
    }
  }

  async function handleUpdateCaption() {
    if (!editingVideo) return;

    try {
      await updateMediaItem(editingVideo.id, {
        caption: currentCaption,
      });
      await loadVideos();
      setEditingVideo(null);
      setCurrentCaption("");
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      alert("Açıklama güncellenemedi");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FaVideo className="text-green-600" />
              Video Galerisi
            </h1>
            <p className="text-gray-600 mt-2">
              Medya sayfasında görünecek videoları yönetin
            </p>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
          >
            <FaPlus />
            Video Ekle
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold mb-4 text-blue-900 mb-1">
              ⚠️ Lütfen mümkün olduğunca az video yükleyin.
            </h3>
            <h3 className="text-sm font-semibold text-blue-900 mb-1">
              💡 Video Yükleme İpuçları
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • <strong>Büyük videolar için YouTube kullanın</strong> -
                Sınırsız storage ve otomatik optimizasyon
              </li>
              <li>• Dosya yükleme: Max 100MB, önerilen &lt;50MB</li>
              <li>• En iyi format: MP4 (H.264), önerilen çözünürlük: 1080p</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowUpload(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Video Ekle</h2>
                <button
                  onClick={() => setShowUpload(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Upload Type Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Video Kaynağı Seçin
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setUploadType("file")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        uploadType === "file"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <FaUpload
                        className={`mx-auto text-3xl mb-2 ${
                          uploadType === "file"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      />
                      <p className="font-semibold text-gray-800">Dosya Yükle</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Bilgisayarınızdan
                      </p>
                    </button>

                    <button
                      onClick={() => setUploadType("youtube")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        uploadType === "youtube"
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <FaYoutube
                        className={`mx-auto text-3xl mb-2 ${
                          uploadType === "youtube"
                            ? "text-red-600"
                            : "text-gray-400"
                        }`}
                      />
                      <p className="font-semibold text-gray-800">
                        YouTube Link
                      </p>
                      <p className="text-xs text-gray-500 mt-1">URL ile ekle</p>
                    </button>
                  </div>
                </div>

                {/* Warning Message */}
                {uploadType === "file" && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-amber-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-amber-900">
                        💡 <strong>Büyük videolar (&gt;20MB)?</strong> YouTube
                        kullanın
                      </p>
                    </div>
                  </div>
                )}

                {/* File Upload */}
                {uploadType === "file" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Video Dosyası Seçin (Max 100MB)
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 transition-all ${
                        isDragging
                          ? "border-green-500 bg-green-50 scale-105"
                          : "border-gray-300 bg-gray-50 hover:border-green-400"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="video-upload"
                        disabled={uploadingVideo}
                      />
                      <label
                        htmlFor="video-upload"
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <FaVideo
                          className={`text-6xl mb-4 transition-colors ${
                            isDragging ? "text-green-500" : "text-gray-400"
                          }`}
                        />
                        <p
                          className={`text-lg font-semibold mb-2 transition-colors ${
                            isDragging ? "text-green-700" : "text-gray-700"
                          }`}
                        >
                          {isDragging ? "Bırakın" : "Tıklayın veya Sürükleyin"}
                        </p>
                        <p className="text-sm text-gray-500">
                          MP4, MOV, AVI, WebM formatları desteklenir
                        </p>
                      </label>
                    </div>

                    {selectedFile && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-medium text-green-800">
                          Seçilen: {selectedFile.name}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          Boyut: {(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                          MB
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* YouTube URL */}
                {uploadType === "youtube" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      YouTube Video Linki
                    </label>
                    <input
                      type="url"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                      disabled={uploadingVideo}
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Desteklenen formatlar: youtube.com/watch?v=...,
                      youtu.be/...
                    </p>
                  </div>
                )}

                {/* Caption */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Açıklama (Opsiyonel)
                  </label>
                  <textarea
                    value={currentCaption}
                    onChange={(e) => setCurrentCaption(e.target.value)}
                    placeholder="Video hakkında açıklama..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Upload Progress */}
                {uploadingVideo && (
                  <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800 mb-2">
                      {uploadType === "file"
                        ? "Video yükleniyor..."
                        : "İşleniyor..."}
                    </p>
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-600 to-emerald-600 h-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-green-700 mt-2 text-center">
                      {progress}%
                    </p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleUpload}
                    disabled={
                      uploadingVideo ||
                      (uploadType === "file" && !selectedFile) ||
                      (uploadType === "youtube" && !youtubeUrl.trim())
                    }
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {uploadingVideo ? "Yükleniyor..." : "Video Ekle"}
                  </button>
                  <button
                    onClick={() => {
                      setShowUpload(false);
                      setSelectedFile(null);
                      setYoutubeUrl("");
                      setCurrentCaption("");
                    }}
                    disabled={uploadingVideo}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Caption Modal */}
      <AnimatePresence>
        {editingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setEditingVideo(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">
                  Açıklama Düzenle
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <textarea
                  value={currentCaption}
                  onChange={(e) => setCurrentCaption(e.target.value)}
                  placeholder="Video açıklaması..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors resize-none"
                  autoFocus
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleUpdateCaption}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Güncelle
                  </button>
                  <button
                    onClick={() => {
                      setEditingVideo(null);
                      setCurrentCaption("");
                    }}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Videos Grid */}
      {videos.length === 0 ? (
        <div className="text-center py-16">
          <FaVideo className="mx-auto text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Henüz video eklenmemiş
          </h3>
          <p className="text-gray-500 mb-6">
            İlk videoyu ekleyerek galeriye başlayın
          </p>
          <button
            onClick={() => setShowUpload(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
          >
            <FaPlus />
            Video Ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative bg-white rounded-xl border-2 border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gray-100">
                {video.source === "youtube" ? (
                  // YouTube Thumbnail
                  video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.caption || "Video"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaYoutube className="text-6xl text-red-500" />
                    </div>
                  )
                ) : (
                  // Uploaded Video
                  <video
                    src={video.url}
                    className="w-full h-full object-cover"
                    muted
                  />
                )}

                {/* Source Badge */}
                <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-medium flex items-center gap-1">
                  {video.source === "youtube" ? (
                    <>
                      <FaYoutube /> YouTube
                    </>
                  ) : (
                    <>
                      <FaVideo /> Upload
                    </>
                  )}
                </div>
              </div>

              {/* Caption */}
              {video.caption && (
                <div className="p-3 border-t border-gray-200">
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {video.caption}
                  </p>
                </div>
              )}

              {/* Actions Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setEditingVideo(video);
                    setCurrentCaption(video.caption || "");
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                >
                  <FaEdit />
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(video.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                >
                  <FaTrash />
                  Sil
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Stats */}
      {videos.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Toplam <strong className="text-green-600">{videos.length}</strong>{" "}
            video
          </p>
        </div>
      )}
    </div>
  );
}
