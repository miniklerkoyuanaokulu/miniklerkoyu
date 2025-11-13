"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBullhorn,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCalendar,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "@/lib/firestore";
import { generateSlug } from "@/lib/utils";
import type { Announcement } from "@/lib/types";
import Toast, { ToastType } from "@/components/Toast";

export default function AdminDuyurular() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
  });
  const [generatedSlug, setGeneratedSlug] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  // Başlık değiştiğinde slug'ı otomatik oluştur
  useEffect(() => {
    if (formData.title) {
      setGeneratedSlug(generateSlug(formData.title));
    } else {
      setGeneratedSlug("");
    }
  }, [formData.title]);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  async function loadAnnouncements() {
    try {
      setLoading(true);
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error("Duyurular yüklenirken hata:", error);
      showToast("Duyurular yüklenirken bir hata oluştu", "error");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
    });
    setEditingAnnouncement(null);
    setShowForm(false);
    setGeneratedSlug("");
  }

  function handleEdit(announcement: Announcement) {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      date: new Date(announcement.date).toISOString().split("T")[0],
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validasyon
    if (!formData.title.trim()) {
      showToast("Başlık alanı zorunludur", "error");
      return;
    }

    if (!formData.content.trim()) {
      showToast("İçerik alanı zorunludur", "error");
      return;
    }

    if (!formData.date) {
      showToast("Tarih alanı zorunludur", "error");
      return;
    }

    try {
      const announcementData = {
        title: formData.title.trim(),
        slug: generatedSlug,
        content: formData.content.trim(),
        date: new Date(formData.date).getTime(),
      };

      if (editingAnnouncement) {
        // Güncelleme
        await updateAnnouncement(editingAnnouncement.id, announcementData);
        showToast("Duyuru başarıyla güncellendi", "success");
      } else {
        // Yeni ekleme
        await addAnnouncement(announcementData);
        showToast("Duyuru başarıyla eklendi", "success");
      }

      resetForm();
      await loadAnnouncements();
    } catch (error) {
      console.error("Duyuru kaydedilirken hata:", error);
      showToast("Duyuru kaydedilirken bir hata oluştu", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu duyuruyu silmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      await deleteAnnouncement(id);
      showToast("Duyuru başarıyla silindi", "success");
      await loadAnnouncements();
    } catch (error) {
      console.error("Duyuru silinirken hata:", error);
      showToast("Duyuru silinirken bir hata oluştu", "error");
    }
  }

  function formatDate(timestamp: number) {
    return new Date(timestamp).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <FaBullhorn className="text-4xl text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Duyuru Yönetimi
          </h1>
          <p className="text-gray-600">Duyurularınızı buradan yönetebilirsiniz</p>
        </div>

        {/* Add Button */}
        <div className="mb-6 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <FaPlus />
            Yeni Duyuru Ekle
          </motion.button>
        </div>

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={(e) => e.target === e.currentTarget && resetForm()}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {editingAnnouncement ? "Duyuru Düzenle" : "Yeni Duyuru Ekle"}
                    </h2>
                    <button
                      onClick={resetForm}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FaTimes className="text-2xl" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Başlık */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Başlık *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="Duyuru başlığı..."
                        required
                      />
                    </div>

                    {/* Slug Preview */}
                    {generatedSlug && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-sm text-gray-600 mb-1">URL:</p>
                        <p className="text-blue-600 font-mono text-sm">
                          /duyurular/{generatedSlug}
                        </p>
                      </div>
                    )}

                    {/* Tarih */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaCalendar className="inline mr-2" />
                        Duyuru Tarihi *
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* İçerik */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        İçerik *
                      </label>
                      <textarea
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                        rows={10}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
                        placeholder="Duyuru içeriği..."
                        required
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        İçerikte satır atlama yapabilirsiniz. Paragraflar otomatik olarak
                        biçimlendirilecektir.
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                      >
                        <FaSave />
                        {editingAnnouncement ? "Güncelle" : "Kaydet"}
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={resetForm}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                      >
                        İptal
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Announcements List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Duyurular yükleniyor...</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <FaBullhorn className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Henüz duyuru eklenmemiş</p>
            <p className="text-gray-400 text-sm mt-2">
              Yeni bir duyuru eklemek için yukarıdaki butona tıklayın
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                          <FaCalendar />
                          {formatDate(announcement.date)}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-400 font-mono">
                          /{announcement.slug}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {announcement.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3">
                        {announcement.content}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(announcement)}
                        className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                        title="Düzenle"
                      >
                        <FaEdit />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(announcement.id)}
                        className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                        title="Sil"
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

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

