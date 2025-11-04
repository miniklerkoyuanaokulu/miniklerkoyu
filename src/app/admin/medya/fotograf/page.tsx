"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCamera, FaPlus, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import { getMediaItems, addMediaItem, updateMediaItem, deleteMediaItem } from "@/lib/firestore";
import { useImageUpload } from "@/hooks/useImageUpload";

type MediaItem = {
  id: string;
  url: string;
  type: "image" | "video" | "press";
  caption?: string;
  tags?: string[];
  createdAt: number;
};

export default function AdminFotografGalerisi() {
  const [photos, setPhotos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<boolean>(false);
  const [currentCaption, setCurrentCaption] = useState("");
  const [editingPhoto, setEditingPhoto] = useState<MediaItem | null>(null);
  
  const { uploadImage, uploading: singleUploading, progress } = useImageUpload();

  useEffect(() => {
    loadPhotos();
  }, []);

  async function loadPhotos() {
    try {
      setLoading(true);
      const data = await getMediaItems("image");
      setPhotos(data as MediaItem[]);
    } catch (error) {
      console.error("Fotoğraflar yüklenirken hata:", error);
      alert("Fotoğraflar yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    
    // Sadece resim dosyaları
    const imageFiles = files.filter((f) => f.type.startsWith("image/"));
    
    if (imageFiles.length !== files.length) {
      alert("Sadece resim dosyaları yükleyebilirsiniz");
    }
    
    setSelectedFiles((prev) => [...prev, ...imageFiles]);
  }

  function removeSelectedFile(index: number) {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleUpload() {
    if (selectedFiles.length === 0) return;

    setUploadingFiles(true);
    
    try {
      for (const file of selectedFiles) {
        // Firebase Storage'a yükle (optimize edilmiş)
        const url = await uploadImage(file, "media/photos");
        
        // Firestore'a kaydet
        const mediaData: {
          url: string;
          type: "image";
          caption?: string;
        } = {
          url,
          type: "image",
        };
        
        // Caption varsa ekle
        if (currentCaption?.trim()) {
          mediaData.caption = currentCaption.trim();
        }
        
        await addMediaItem(mediaData);
      }
      
      await loadPhotos();
      setSelectedFiles([]);
      setCurrentCaption("");
      setShowUpload(false);
      alert(`${selectedFiles.length} fotoğraf başarıyla eklendi!`);
    } catch (error) {
      console.error("Upload hatası:", error);
      alert("Fotoğraflar yüklenirken bir hata oluştu");
    } finally {
      setUploadingFiles(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu fotoğrafı silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      await deleteMediaItem(id);
      await loadPhotos();
    } catch (error) {
      console.error("Silme hatası:", error);
      alert("Fotoğraf silinemedi");
    }
  }

  async function handleUpdateCaption() {
    if (!editingPhoto) return;

    try {
      await updateMediaItem(editingPhoto.id, {
        caption: currentCaption,
      });
      await loadPhotos();
      setEditingPhoto(null);
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
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaCamera className="text-blue-600" />
            Fotoğraf Galerisi
          </h1>
          <p className="text-gray-600 mt-2">
            Medya sayfasında görünecek fotoğrafları yönetin
          </p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
        >
          <FaPlus />
          Fotoğraf Ekle
        </button>
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
                <h2 className="text-2xl font-bold text-gray-800">Fotoğraf Yükle</h2>
                <button
                  onClick={() => setShowUpload(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* File Upload Area */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fotoğraf Seçin
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors bg-gray-50">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      id="photo-upload"
                      disabled={uploadingFiles}
                    />
                    <label
                      htmlFor="photo-upload"
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <FaCamera className="text-6xl text-gray-400 mb-4" />
                      <p className="text-lg font-semibold text-gray-700 mb-2">
                        Tıklayın veya Sürükleyin
                      </p>
                      <p className="text-sm text-gray-500">
                        Birden fazla fotoğraf seçebilirsiniz (PNG, JPG, WEBP)
                      </p>
                    </label>
                  </div>
                </div>

                {/* Selected Files Preview */}
                {selectedFiles.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Seçilen Fotoğraflar ({selectedFiles.length})
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {selectedFiles.map((file, idx) => (
                        <div key={idx} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            onClick={() => removeSelectedFile(idx)}
                            className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                          <p className="text-xs text-gray-600 mt-1 truncate">
                            {file.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Caption */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Açıklama (Opsiyonel - Tüm fotoğraflar için)
                  </label>
                  <textarea
                    value={currentCaption}
                    onChange={(e) => setCurrentCaption(e.target.value)}
                    placeholder="Fotoğraflar hakkında açıklama..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Upload Progress */}
                {uploadingFiles && (
                  <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 mb-2">
                      Fotoğraflar yükleniyor...
                    </p>
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 h-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-blue-700 mt-2 text-center">
                      {progress}% - Optimize ediliyor ve yükleniyor...
                    </p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleUpload}
                    disabled={selectedFiles.length === 0 || uploadingFiles}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {uploadingFiles ? "Yükleniyor..." : `${selectedFiles.length} Fotoğraf Yükle`}
                  </button>
                  <button
                    onClick={() => {
                      setShowUpload(false);
                      setSelectedFiles([]);
                      setCurrentCaption("");
                    }}
                    disabled={uploadingFiles}
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
        {editingPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setEditingPhoto(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Açıklama Düzenle</h2>
              </div>

              <div className="p-6 space-y-4">
                <textarea
                  value={currentCaption}
                  onChange={(e) => setCurrentCaption(e.target.value)}
                  placeholder="Fotoğraf açıklaması..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  autoFocus
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleUpdateCaption}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Güncelle
                  </button>
                  <button
                    onClick={() => {
                      setEditingPhoto(null);
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

      {/* Photos Grid */}
      {photos.length === 0 ? (
        <div className="text-center py-16">
          <FaCamera className="mx-auto text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Henüz fotoğraf eklenmemiş
          </h3>
          <p className="text-gray-500 mb-6">
            İlk fotoğrafı ekleyerek galeriye başlayın
          </p>
          <button
            onClick={() => setShowUpload(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
          >
            <FaPlus />
            Fotoğraf Ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-square">
                <img
                  src={photo.url}
                  alt={photo.caption || "Fotoğraf"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Caption */}
              {photo.caption && (
                <div className="p-3 border-t border-gray-200">
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              )}

              {/* Actions Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setEditingPhoto(photo);
                    setCurrentCaption(photo.caption || "");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  <FaEdit />
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(photo.id)}
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
      {photos.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Toplam <strong className="text-blue-600">{photos.length}</strong> fotoğraf
          </p>
        </div>
      )}
    </div>
  );
}

