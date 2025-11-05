"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaInstagram,
  FaPlus,
  FaTrash,
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaUpload,
} from "react-icons/fa";
import {
  getInstagramPosts,
  addInstagramPost,
  updateInstagramPost,
  deleteInstagramPost,
} from "@/lib/firestore";
import { isValidInstagramUrl } from "@/lib/instagram";
import type { InstagramPost } from "@/lib/types";
import { useImageUpload } from "@/hooks/useImageUpload";
import Toast, { ToastType } from "@/components/Toast";

export default function AdminMedyaInstagram() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<InstagramPost | null>(null);
  const [formData, setFormData] = useState({
    url: "",
    caption: "",
    thumbnailUrl: "",
    order: 0,
    isActive: true,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const {
    uploadImage,
    uploading: uploadingImage,
    progress: uploadProgress,
  } = useImageUpload();

  useEffect(() => {
    loadPosts();
  }, []);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  async function loadPosts() {
    try {
      setLoading(true);
      const data = await getInstagramPosts();
      setPosts(data);
    } catch (error) {
      console.error("Instagram postları yüklenirken hata:", error);
      showToast("Postlar yüklenirken bir hata oluştu", "error");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({
      url: "",
      caption: "",
      thumbnailUrl: "",
      order: 0,
      isActive: true,
    });
    setEditingPost(null);
    setShowForm(false);
    setThumbnailPreview("");
    setIsDragging(false);
  }

  function handleEdit(post: InstagramPost) {
    setEditingPost(post);
    setFormData({
      url: post.url,
      caption: post.caption || "",
      thumbnailUrl: post.thumbnailUrl || "",
      order: post.order,
      isActive: post.isActive,
    });
    setThumbnailPreview(post.thumbnailUrl || "");
    setShowForm(true);
  }

  // Dosya upload handler
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    await processFile(file);
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

  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    await processFile(file);
  }

  // Ortak dosya işleme fonksiyonu
  async function processFile(file: File) {
    // Dosya tipi kontrolü
    if (!file.type.startsWith("image/")) {
      showToast(
        "Lütfen bir resim dosyası seçin (JPG, PNG, WEBP, vb.)",
        "error"
      );
      return;
    }

    // Dosya boyutu kontrolü (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showToast("Dosya boyutu maksimum 10MB olmalı", "error");
      return;
    }

    try {
      const url = await uploadImage(file);
      setFormData((prev) => ({ ...prev, thumbnailUrl: url }));
      setThumbnailPreview(url);
      showToast("Görsel başarıyla yüklendi", "success");
    } catch (error) {
      console.error("Upload hatası:", error);
      showToast(
        "Dosya yüklenirken bir hata oluştu. Storage izinlerini kontrol edin.",
        "error"
      );
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // URL validasyonu
    if (!isValidInstagramUrl(formData.url)) {
      showToast(
        "Lütfen geçerli bir Instagram URL'si girin (instagram.com içeren bir link)",
        "error"
      );
      return;
    }

    try {
      if (editingPost) {
        await updateInstagramPost(editingPost.id, formData);
        showToast("Post başarıyla güncellendi", "success");
      } else {
        await addInstagramPost(formData);
        showToast("Post başarıyla eklendi", "success");
      }
      await loadPosts();
      resetForm();
    } catch (error) {
      console.error("Post kaydedilirken hata:", error);
      showToast("Post kaydedilirken bir hata oluştu", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu Instagram postunu silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      await deleteInstagramPost(id);
      await loadPosts();
      showToast("Post başarıyla silindi", "success");
    } catch (error) {
      console.error("Post silinirken hata:", error);
      showToast("Post silinirken bir hata oluştu", "error");
    }
  }

  async function toggleActive(post: InstagramPost) {
    try {
      await updateInstagramPost(post.id, { isActive: !post.isActive });
      await loadPosts();
      showToast(`Post ${!post.isActive ? "aktif" : "pasif"} edildi`, "success");
    } catch (error) {
      console.error("Post güncellenirken hata:", error);
      showToast("Post güncellenirken bir hata oluştu", "error");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaInstagram className="text-purple-600" />
            Instagram Yönetimi
          </h1>
          <p className="text-gray-600 mt-2">
            Medya sayfasında görünecek Instagram postlarını yönetin
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <FaPlus />
          Yeni Post Ekle
        </button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) resetForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingPost ? "Post Düzenle" : "Yeni Post Ekle"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Instagram Post URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    placeholder="https://instagram.com/p/... veya https://instagram.com/reel/..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  />
                  <p className="mt-2 text-xs text-gray-600">
                    Instagram gönderisinin linkini buraya yapıştırın. Medya
                    sayfasında bu linke yönlendirecek.
                  </p>
                </div>

                {/* Görsel Upload */}
                {!thumbnailPreview && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Post Görseli (Opsiyonel)
                    </label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
                        isDragging
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-300 bg-gray-50 hover:border-purple-400"
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                        id="thumbnail-upload"
                      />
                      <label
                        htmlFor="thumbnail-upload"
                        className={`flex flex-col items-center cursor-pointer ${
                          uploadingImage ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <FaUpload className="text-5xl text-gray-400 mb-4" />
                        <p className="text-base font-semibold text-gray-700 mb-2">
                          {uploadingImage
                            ? "Yükleniyor..."
                            : isDragging
                            ? "Buraya Bırakın"
                            : "Tıklayın veya Sürükleyin"}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          PNG, JPG, WEBP (max 10MB)
                        </p>
                        {uploadingImage && (
                          <div className="w-full max-w-xs">
                            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                              <div
                                className="bg-linear-to-r from-purple-600 to-pink-600 h-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                            <p className="text-center text-xs text-gray-600 mt-2">
                              {uploadProgress}% yüklendi
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                )}

                {/* Thumbnail Preview */}
                {thumbnailPreview && (
                  <div className="rounded-lg border-2 border-purple-200 p-4 bg-purple-50">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Önizleme
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setThumbnailPreview("");
                          setFormData((prev) => ({
                            ...prev,
                            thumbnailUrl: "",
                          }));
                        }}
                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        Değiştir
                      </button>
                    </div>
                    <div className="relative aspect-square w-48 rounded-lg overflow-hidden shadow-lg">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${thumbnailPreview})` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-green-600 font-medium">
                      ✓ Görsel başarıyla yüklendi
                    </p>
                  </div>
                )}

                {/* Caption */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Açıklama (Opsiyonel)
                  </label>
                  <textarea
                    value={formData.caption}
                    onChange={(e) =>
                      setFormData({ ...formData, caption: e.target.value })
                    }
                    placeholder="Post hakkında kısa açıklama..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Order & Active */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sıralama
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          order: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Durum
                    </label>
                    <label className="flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isActive: e.target.checked,
                          })
                        }
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className="text-gray-700 font-medium">Aktif</span>
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    {editingPost ? "Güncelle" : "Ekle"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <FaInstagram className="mx-auto text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Henüz Instagram postu eklenmemiş
          </h3>
          <p className="text-gray-500 mb-6">
            İlk Instagram postunu ekleyerek başlayın
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <FaPlus />
            Post Ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`bg-white rounded-xl border-2 ${
                post.isActive ? "border-purple-200" : "border-gray-200"
              } shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden`}
            >
              {/* Thumbnail */}
              <div className="relative aspect-square bg-linear-to-br from-pink-100 via-purple-100 to-orange-100">
                {post.thumbnailUrl ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${post.thumbnailUrl})` }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaInstagram className="text-6xl text-purple-300" />
                  </div>
                )}
                {!post.isActive && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold">
                      Pasif
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {post.caption && (
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {post.caption}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Sıra: {post.order}</span>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline"
                  >
                    Instagram&apos;da Gör
                  </a>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleActive(post)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                      post.isActive
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {post.isActive ? <FaEye /> : <FaEyeSlash />}
                    {post.isActive ? "Aktif" : "Pasif"}
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
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
