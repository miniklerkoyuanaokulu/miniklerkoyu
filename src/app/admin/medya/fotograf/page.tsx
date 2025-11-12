"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import Image from "next/image";
import { FaCamera, FaPlus, FaTrash, FaEdit, FaTimes, FaGripVertical, FaSortNumericDown } from "react-icons/fa";
import {
  getMediaItems,
  addMediaItem,
  updateMediaItem,
  deleteMediaItem,
  updateMediaItemsOrder,
} from "@/lib/firestore";
import { useImageUpload } from "@/hooks/useImageUpload";
import Toast, { ToastType } from "@/components/Toast";
import type { MediaItem } from "@/lib/types";

// MediaItem type'ı artık @/lib/types'dan import ediliyor

export default function AdminFotografGalerisi() {
  const [photos, setPhotos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<boolean>(false);
  const [currentCaption, setCurrentCaption] = useState("");
  const [editingPhoto, setEditingPhoto] = useState<MediaItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);
  const [isMigrating, setIsMigrating] = useState(false);
  const [localOrderDirty, setLocalOrderDirty] = useState(false);

  const { uploadImage, progress } = useImageUpload();

  useEffect(() => {
    loadPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  async function loadPhotos() {
    try {
      setLoading(true);
      const data = (await getMediaItems("image")) as MediaItem[];
      
      // HER ZAMAN order'a göre sırala (order olmayanları sona at)
      const sorted = [...data].sort((a, b) => {
        const ao = a.order ?? Number.POSITIVE_INFINITY;
        const bo = b.order ?? Number.POSITIVE_INFINITY;
        return ao - bo;
      });
      
      setPhotos(sorted);
    } catch (error) {
      console.error("Fotoğraflar yüklenirken hata:", error);
      showToast("Fotoğraflar yüklenirken bir hata oluştu", "error");
    } finally {
      setLoading(false);
    }
  }

  // SÜRÜKLERKEN: sadece UI'da sırayı değiştir (DB'ye yazma)
  function handleReorder(newOrder: MediaItem[]) {
    setPhotos(newOrder);
    setLocalOrderDirty(true); // Drop'ta DB'ye yazacağız
  }

  // BIRAKINCA: tek seferde DB'ye sırayı kaydet
  async function commitOrderToBackend() {
    if (!localOrderDirty) return;

    try {
      const updates = photos.map((photo, index) => ({
        id: photo.id,
        order: index,
      }));
      await updateMediaItemsOrder(updates);
      setLocalOrderDirty(false);
      showToast("Fotoğraf sıralaması kaydedildi ✅", "success");
    } catch (error) {
      console.error("Sıralama güncellenirken hata:", error);
      showToast("Sıralama kaydedilemedi, geri alınıyor", "error");
      // Hata olursa eski sıralamayı geri yükle
      await loadPhotos();
    }
  }

  // Migration: Mevcut fotoğraflara order ekle
  async function migrateAddOrderToPhotos() {
    if (!confirm("Tüm fotoğraflara sıra numarası eklenecek. Devam edilsin mi?")) {
      return;
    }

    setIsMigrating(true);
    try {
      // Mevcut tüm fotoğrafları al
      const allPhotos = (await getMediaItems("image")) as MediaItem[];
      
      // Order field'ı olmayanları filtrele
      const photosWithoutOrder = allPhotos.filter(
        (photo) => photo.order === undefined || photo.order === null
      );

      if (photosWithoutOrder.length === 0) {
        showToast("Tüm fotoğraflarda zaten sıra numarası var! ✅", "success");
        setIsMigrating(false);
        return;
      }

      // createdAt'e göre sırala (eski → yeni)
      photosWithoutOrder.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

      // Order numaralarını ekle (mevcut en büyük order'dan devam et)
      const existingOrders = allPhotos
        .filter((p) => p.order !== undefined)
        .map((p) => p.order as number);
      const maxOrder = existingOrders.length > 0 ? Math.max(...existingOrders) : -1;

      const updates = photosWithoutOrder.map((photo, index) => ({
        id: photo.id,
        order: maxOrder + 1 + index,
      }));

      await updateMediaItemsOrder(updates);
      await loadPhotos();

      showToast(
        `✅ ${photosWithoutOrder.length} fotoğrafa sıra numarası eklendi!`,
        "success"
      );
    } catch (error) {
      console.error("Migration hatası:", error);
      showToast("Sıra numarası eklenirken hata oluştu", "error");
    } finally {
      setIsMigrating(false);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  }

  // Sürükle-bırak handlers
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

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }

  // Ortak dosya işleme fonksiyonu
  function processFiles(files: File[]) {
    // Sadece resim dosyaları
    const imageFiles = files.filter((f) => f.type.startsWith("image/"));

    if (imageFiles.length !== files.length) {
      showToast("Sadece resim dosyaları yükleyebilirsiniz", "error");
    }

    if (imageFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...imageFiles]);
    }
  }

  function removeSelectedFile(index: number) {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function closeUploadModal() {
    setShowUpload(false);
    setSelectedFiles([]);
    setCurrentCaption("");
    setIsDragging(false);
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
      const count = selectedFiles.length;
      closeUploadModal();
      showToast(`${count} fotoğraf başarıyla eklendi`, "success");
    } catch (error) {
      console.error("Upload hatası:", error);
      showToast("Fotoğraflar yüklenirken bir hata oluştu", "error");
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
      showToast("Fotoğraf başarıyla silindi", "success");
    } catch (error) {
      console.error("Silme hatası:", error);
      showToast("Fotoğraf silinemedi", "error");
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
      showToast("Açıklama başarıyla güncellendi", "success");
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      showToast("Açıklama güncellenemedi", "error");
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
        <div className="flex items-center gap-3">
          {/* Migration Button - Sadece order olmayan fotoğraflar varsa göster */}
          {photos.some((p) => p.order === undefined || p.order === null) && (
            <button
              onClick={migrateAddOrderToPhotos}
              disabled={isMigrating}
              className="flex items-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              title="Mevcut fotoğraflara otomatik sıra numarası ekle"
            >
              <FaSortNumericDown />
              {isMigrating ? "Ekleniyor..." : "Sıra No Ekle"}
            </button>
          )}
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
          >
            <FaPlus />
            Fotoğraf Ekle
          </button>
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
              if (e.target === e.currentTarget) closeUploadModal();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  Fotoğraf Yükle
                </h2>
                <button
                  onClick={closeUploadModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* File Upload Area */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fotoğraf Seçin (Çoklu Seçim)
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-gray-50 hover:border-blue-400"
                    }`}
                  >
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
                      className={`flex flex-col items-center ${
                        uploadingFiles
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >
                      <FaCamera className="text-6xl text-gray-400 mb-4" />
                      <p className="text-lg font-semibold text-gray-700 mb-2">
                        {uploadingFiles
                          ? "Yükleniyor..."
                          : isDragging
                          ? "Buraya Bırakın"
                          : "Tıklayın veya Sürükleyin"}
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
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              fill
                              sizes="200px"
                              className="object-cover"
                              unoptimized
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
                        className="bg-linear-to-r from-blue-600 to-cyan-600 h-full transition-all duration-300"
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
                    className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {uploadingFiles
                      ? "Yükleniyor..."
                      : `${selectedFiles.length} Fotoğraf Yükle`}
                  </button>
                  <button
                    onClick={closeUploadModal}
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
                <h2 className="text-xl font-bold text-gray-800">
                  Açıklama Düzenle
                </h2>
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

      {/* Photos Grid with Drag & Drop */}
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
          >
            <FaPlus />
            Fotoğraf Ekle
          </button>
        </div>
      ) : (
        <div>
          {/* Sürükle-Bırak Bilgilendirme */}
          <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg flex items-start gap-3">
            <FaGripVertical className="text-blue-600 text-xl mt-1 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">
                🎯 Fotoğrafların Sırasını Değiştirin
              </p>
              <p className="text-xs text-blue-700">
                Fotoğrafları sürükleyerek sırasını değiştirebilirsiniz. Anasayfa ve Medya sayfasında bu sıraya göre gösterilecektir.
              </p>
            </div>
          </div>

          <Reorder.Group
            values={photos}
            onReorder={handleReorder}
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {photos.map((photo, idx) => (
              <Reorder.Item
                key={photo.id}
                value={photo}
                layout
                onDragEnd={commitOrderToBackend}
                className="group relative bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-grab active:cursor-grabbing"
                whileDrag={{
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  zIndex: 10,
                }}
              >
                {/* Drag Handle Icon */}
                <div className="absolute top-2 left-2 z-20 bg-blue-600 text-white rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <FaGripVertical className="text-sm" />
                </div>

                {/* Order Badge - Mevcut dizideki sıra */}
                <div className="absolute top-2 right-2 z-20 bg-gray-800/80 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </div>

                {/* Image */}
                <div className="relative aspect-square">
                  <Image
                    src={photo.url}
                    alt={photo.caption || "Fotoğraf"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    unoptimized
                  />
                </div>

                {/* Caption */}
                {photo.caption && (
                  <div className="p-3 border-t border-gray-200 bg-white">
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
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      )}

      {/* Stats */}
      {photos.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Toplam <strong className="text-blue-600">{photos.length}</strong>{" "}
            fotoğraf
          </p>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
