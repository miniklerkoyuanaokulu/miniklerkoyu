"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaInstagram,
  FaPlus,
  FaUpload,
  FaGripVertical,
  FaSortNumericDown,
} from "react-icons/fa";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
  DragMoveEvent,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import {
  restrictToParentElement,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  getInstagramPosts,
  addInstagramPost,
  updateInstagramPost,
  deleteInstagramPost,
  updateInstagramPostsOrder,
} from "@/lib/firestore";
import { isValidInstagramUrl } from "@/lib/instagram";
import type { InstagramPost } from "@/lib/types";
import { useImageUpload } from "@/hooks/useImageUpload";
import Toast, { ToastType } from "@/components/Toast";
import SortableInstagramCard from "@/components/SortableInstagramCard";
import { arrayMove } from "@/lib/arrayMove";

export default function AdminMedyaInstagram() {
  // ID-based ordering için state'ler
  const [order, setOrder] = useState<string[]>([]); // Sadece ID'lerin sırası
  const [byId, setById] = useState<Record<string, InstagramPost>>({}); // ID → InstagramPost map

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<InstagramPost | null>(null);
  const [formData, setFormData] = useState({
    url: "",
    caption: "",
    thumbnailUrl: "",
    isActive: true,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);
  const [isMigrating, setIsMigrating] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Debounced persist için timer ref
  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll için ref
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  const {
    uploadImage,
    uploading: uploadingImage,
    progress: uploadProgress,
  } = useImageUpload();

  // Helper: order state'inden posts array'i türet
  const posts = order.map((id) => byId[id]).filter(Boolean);

  // dnd-kit sensörleri
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // 5px taşındığında aktive et
    }),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  async function loadPosts() {
    try {
      setLoading(true);
      const data = await getInstagramPosts();

      // HER ZAMAN order'a göre sırala (order olmayanları sona at)
      const sorted = [...data].sort((a, b) => {
        const ao = a.order ?? Number.POSITIVE_INFINITY;
        const bo = b.order ?? Number.POSITIVE_INFINITY;
        return ao - bo;
      });

      // ID → InstagramPost map oluştur
      const map: Record<string, InstagramPost> = {};
      sorted.forEach((p) => {
        map[p.id] = p;
      });

      // State'leri güncelle
      setById(map);
      setOrder(sorted.map((p) => p.id));
    } catch (error) {
      console.error("Instagram postları yüklenirken hata:", error);
      showToast("Postlar yüklenirken bir hata oluştu", "error");
    } finally {
      setLoading(false);
    }
  }

  // Debounced persist - Arka arkaya sürüklemelerde gereksiz yazımı azaltır
  function persistOrderDebounced(newOrderIds: string[]) {
    if (saveTimer.current) clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(async () => {
      try {
        const updates = newOrderIds.map((id, index) => ({ id, order: index }));
        await updateInstagramPostsOrder(updates);
        showToast("Post sıralaması kaydedildi ✅", "success");
      } catch (error) {
        console.error("Sıralama güncellenirken hata:", error);
        showToast("Sıralama kaydedilemedi", "error");
        await loadPosts(); // Geri yükle
      }
    }, 250); // 250ms debounce
  }

  // Auto-scroll'u durdur
  function stopAutoScroll() {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  }

  // Drag başladığında
  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
    // Sayfa kaymasını engelle
    document.body.style.overscrollBehavior = "contain";
  }

  // Drag bittiğinde
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    stopAutoScroll(); // Auto-scroll'u durdur
    // Overscroll'u geri al
    document.body.style.overscrollBehavior = "";

    if (!over || active.id === over.id) return;

    const oldIndex = order.indexOf(active.id as string);
    const newIndex = order.indexOf(over.id as string);

    if (oldIndex === -1 || newIndex === -1) return;

    // UI'da anında sırayı değiştir
    const newOrder = arrayMove(order, oldIndex, newIndex);
    setOrder(newOrder);

    // Debounced persist (arka arkaya sürüklemelerde optimize eder)
    persistOrderDebounced(newOrder);
  }

  // Drag iptal edildiğinde
  function handleDragCancel() {
    setActiveId(null);
    stopAutoScroll(); // Auto-scroll'u durdur
    // Overscroll'u geri al
    document.body.style.overscrollBehavior = "";
  }

  // Otomatik kaydırma (büyük listelerde yararlı) - Hızlı ve dinamik
  function handleDragMove(event: DragMoveEvent) {
    if (!event.active) return;

    const activatorEvent = event.activatorEvent as PointerEvent;
    if (!activatorEvent) return;

    const y = event.delta.y + activatorEvent.clientY;
    const margin = 100; // Daha geniş margin (100px)
    const topEdge = y < margin;
    const bottomEdge = window.innerHeight - y < margin;

    // Scroll bölgesinden çıkıldıysa interval'ı temizle
    if (!topEdge && !bottomEdge) {
      stopAutoScroll();
      return;
    }

    // Zaten scroll yapılıyorsa yeni interval başlatma
    if (autoScrollInterval.current) return;

    // Dinamik hız: Margin'e ne kadar yakınsa o kadar hızlı
    const distanceFromEdge = topEdge
      ? margin - y
      : margin - (window.innerHeight - y);

    // Hız faktörü: 0.2 - 1.0 arası (yaklaştıkça hızlanır)
    const speedFactor = Math.min(distanceFromEdge / margin, 1);
    const baseSpeed = 30; // Temel hız (piksel/frame)
    const scrollSpeed = baseSpeed * (0.5 + speedFactor * 0.5); // 15-30px arası

    // Sürekli scroll loop
    autoScrollInterval.current = setInterval(() => {
      if (topEdge) {
        window.scrollBy({ top: -scrollSpeed, behavior: "auto" });
      } else if (bottomEdge) {
        window.scrollBy({ top: scrollSpeed, behavior: "auto" });
      }
    }, 16); // ~60fps (16ms)
  }

  // Migration: Mevcut postlara order ekle
  async function migrateAddOrderToPosts() {
    if (
      !confirm(
        "Tüm Instagram postlarına sıra numarası eklenecek. Devam edilsin mi?"
      )
    ) {
      return;
    }

    setIsMigrating(true);
    try {
      // Mevcut tüm postları al
      const allPosts = await getInstagramPosts();

      // Order field'ı olmayanları filtrele
      const postsWithoutOrder = allPosts.filter(
        (post) => post.order === undefined || post.order === null
      );

      if (postsWithoutOrder.length === 0) {
        showToast("Tüm postlarda zaten sıra numarası var! ✅", "success");
        setIsMigrating(false);
        return;
      }

      // createdAt'e göre sırala (eski → yeni)
      postsWithoutOrder.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

      // Order numaralarını ekle (mevcut en büyük order'dan devam et)
      const existingOrders = allPosts
        .filter((p) => p.order !== undefined)
        .map((p) => p.order as number);
      const maxOrder =
        existingOrders.length > 0 ? Math.max(...existingOrders) : -1;

      const updates = postsWithoutOrder.map((post, index) => ({
        id: post.id,
        order: maxOrder + 1 + index,
      }));

      await updateInstagramPostsOrder(updates);
      await loadPosts();

      showToast(
        `✅ ${postsWithoutOrder.length} posta sıra numarası eklendi!`,
        "success"
      );
    } catch (error) {
      console.error("Migration hatası:", error);
      showToast("Sıra numarası eklenirken hata oluştu", "error");
    } finally {
      setIsMigrating(false);
    }
  }

  function resetForm() {
    setFormData({
      url: "",
      caption: "",
      thumbnailUrl: "",
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
        // Mevcut en büyük order'ı bul
        const maxOrder =
          posts.length > 0 ? Math.max(...posts.map((p) => p.order ?? 0)) : -1;

        // Yeni post için order ekle
        await addInstagramPost({
          ...formData,
          order: maxOrder + 1, // Stabil order
        });
        showToast("Post başarıyla eklendi! ✅", "success");
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
        <div className="flex items-center gap-3">
          {/* Migration Button - Sadece order olmayan postlar varsa göster */}
          {posts.some((p) => p.order === undefined || p.order === null) && (
            <button
              onClick={migrateAddOrderToPosts}
              disabled={isMigrating}
              className="flex items-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              title="Mevcut postlara otomatik sıra numarası ekle"
            >
              <FaSortNumericDown />
              {isMigrating ? "Ekleniyor..." : "Sıra No Ekle"}
            </button>
          )}
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <FaPlus />
            Yeni Post Ekle
          </button>
        </div>
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

                {/* Active Status */}
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
                  <p className="mt-2 text-xs text-gray-600">
                    📌 Sıralama için postları sürükleyip bırakın
                  </p>
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

      {/* Posts Grid with Drag & Drop */}
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
        <div>
          {/* Sürükle-Bırak Bilgilendirme */}
          <div className="mb-6 p-4 bg-purple-50 border-2 border-purple-200 rounded-lg flex items-start gap-3">
            <FaGripVertical className="text-purple-600 text-xl mt-1 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-purple-900 mb-1">
                🎯 Postların Sırasını Değiştirin
              </p>
              <p className="text-xs text-purple-700">
                Instagram postlarını sürükleyerek sırasını değiştirebilirsiniz.
                Medya sayfasında bu sıraya göre gösterilecektir.
              </p>
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToWindowEdges, restrictToParentElement]}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
            onDragMove={handleDragMove}
          >
            <SortableContext items={order} strategy={rectSortingStrategy}>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                role="list"
                aria-label="Instagram postları"
              >
                {order.map((id, idx) => {
                  const post = byId[id];
                  if (!post) return null;

                  return (
                    <SortableInstagramCard
                      key={id}
                      id={id}
                      post={post}
                      index={idx}
                      onEdit={() => handleEdit(post)}
                      onDelete={() => handleDelete(post.id)}
                      onToggleActive={() => toggleActive(post)}
                    />
                  );
                })}
              </div>
            </SortableContext>

            {/* DragOverlay: Sürüklenen kartın preview'ı */}
            <DragOverlay
              adjustScale={false}
              dropAnimation={{
                duration: 300,
                easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
              }}
            >
              {activeId && byId[activeId] ? (
                <div className="w-full max-w-[400px] rounded-xl overflow-hidden shadow-2xl border-4 border-purple-500 bg-white transform-gpu will-change-transform rotate-2">
                  <div className="relative aspect-square bg-linear-to-br from-pink-100 via-purple-100 to-orange-100">
                    {byId[activeId].thumbnailUrl ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${byId[activeId].thumbnailUrl})`,
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FaInstagram className="text-6xl text-purple-300" />
                      </div>
                    )}
                  </div>
                  {byId[activeId].caption && (
                    <div className="p-3 bg-white">
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {byId[activeId].caption}
                      </p>
                    </div>
                  )}
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
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
