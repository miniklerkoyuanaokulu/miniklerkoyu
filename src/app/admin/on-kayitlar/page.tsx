"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FaPhone, FaEnvelope, FaTrash } from "react-icons/fa";

type PreApplication = {
  id: string;
  parentName: string;
  childName: string;
  birthDate: string;
  phone: string;
  email: string;
  message?: string;
  consentApproved: boolean;
  status: "new" | "reviewed" | "contacted" | "archived";
  createdAt: Timestamp | number | null;
  ip?: string;
};

export default function AdminOnKayitlar() {
  const [applications, setApplications] = useState<PreApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "new" | "reviewed" | "contacted" | "archived"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      setLoading(true);
      const q = query(
        collection(db, "preApplications"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PreApplication[];
      setApplications(data);
    } catch (error) {
      console.error("Ön kayıtlar yüklenirken hata:", error);
      alert("Veriler yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: PreApplication["status"]) {
    try {
      await updateDoc(doc(db, "preApplications", id), { status });
      await loadApplications();
    } catch (error) {
      console.error("Durum güncellenirken hata:", error);
      alert("Durum güncellenemedi");
    }
  }

  async function deleteApplication(id: string) {
    if (!confirm("Bu başvuruyu silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "preApplications", id));
      await loadApplications();
    } catch (error) {
      console.error("Silme hatası:", error);
      alert("Başvuru silinemedi");
    }
  }

  const formatDate = (timestamp: Timestamp | number | null | undefined) => {
    if (!timestamp) return "-";
    try {
      const date =
        timestamp instanceof Timestamp
          ? timestamp.toDate()
          : new Date(timestamp);
      return date.toLocaleString("tr-TR");
    } catch {
      return "-";
    }
  };

  const statusColors = {
    new: "bg-blue-100 text-blue-800 border-blue-300",
    reviewed: "bg-yellow-100 text-yellow-800 border-yellow-300",
    contacted: "bg-green-100 text-green-800 border-green-300",
    archived: "bg-gray-100 text-gray-800 border-gray-300",
  };

  const statusLabels = {
    new: "Yeni",
    reviewed: "İncelendi",
    contacted: "İletişim Kuruldu",
    archived: "Arşiv",
  };

  // Filtreleme
  const filtered = applications
    .filter((app) => filter === "all" || app.status === filter)
    .filter((app) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        app.parentName.toLowerCase().includes(term) ||
        app.childName.toLowerCase().includes(term) ||
        app.phone.includes(term) ||
        app.email.toLowerCase().includes(term)
      );
    });

  const stats = {
    total: applications.length,
    new: applications.filter((a) => a.status === "new").length,
    reviewed: applications.filter((a) => a.status === "reviewed").length,
    contacted: applications.filter((a) => a.status === "contacted").length,
  };

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
      {/* Header & Stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Ön Kayıt Başvuruları
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
            <div className="text-3xl font-bold">{stats.new}</div>
            <div className="text-sm mt-1 opacity-90">Yeni Başvuru</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 text-white shadow-lg">
            <div className="text-3xl font-bold">{stats.reviewed}</div>
            <div className="text-sm mt-1 opacity-90">İncelendi</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg">
            <div className="text-3xl font-bold">{stats.contacted}</div>
            <div className="text-sm mt-1 opacity-90">İletişim Kuruldu</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-gray-500 to-slate-500 text-white shadow-lg">
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm mt-1 opacity-90">Toplam</div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {(["all", "new", "reviewed", "contacted", "archived"] as const).map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === f
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300"
                  }`}
                >
                  {f === "all" ? "Tümü" : statusLabels[f]}
                </button>
              )
            )}
          </div>

          <input
            type="text"
            placeholder="Ara (isim, telefon, email)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none w-full md:w-80"
          />
        </div>
      </div>

      {/* Applications Table/Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border-2 border-gray-200">
          <p className="text-xl text-gray-500">Başvuru bulunamadı</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => (
            <motion.div
              key={app.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {app.childName}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${
                          statusColors[app.status]
                        }`}
                      >
                        {statusLabels[app.status]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Doğum Tarihi: {app.birthDate}
                    </p>
                    <p className="text-gray-600">
                      Veli: <strong>{app.parentName}</strong>
                    </p>
                  </div>

                  <div className="text-sm text-gray-500">
                    <p>📅 {formatDate(app.createdAt)}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  <a
                    href={`tel:${app.phone}`}
                    className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <FaPhone className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                      {app.phone}
                    </span>
                  </a>
                  <a
                    href={`mailto:${app.email}`}
                    className="flex items-center gap-2 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <FaEnvelope className="text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      {app.email}
                    </span>
                  </a>
                </div>

                {/* Message */}
                {app.message && (
                  <div className="p-3 bg-gray-50 rounded-lg mb-4">
                    <p className="text-sm text-gray-700">
                      <strong>Mesaj:</strong> {app.message}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                  <select
                    value={app.status}
                    onChange={(e) =>
                      updateStatus(
                        app.id,
                        e.target.value as PreApplication["status"]
                      )
                    }
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none font-medium"
                  >
                    <option value="new">Yeni</option>
                    <option value="reviewed">İncelendi</option>
                    <option value="contacted">İletişim Kuruldu</option>
                    <option value="archived">Arşiv</option>
                  </select>

                  <button
                    onClick={() => deleteApplication(app.id)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium flex items-center gap-2"
                  >
                    <FaTrash />
                    Sil
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
