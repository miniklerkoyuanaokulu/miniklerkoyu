"use client";

import { useState, useEffect } from "react";
import { FaStar, FaTrash, FaPlus, FaGoogle } from "react-icons/fa";
import { addManualReview, getRelativeTime } from "@/lib/reviews";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Review {
  id?: string;
  author_name: string;
  rating: number;
  text: string;
  time?: string;
  relative_time?: string;
  reviewDate?: any; // Firebase Timestamp
  source: "google" | "manual";
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const today = new Date();
  const [formData, setFormData] = useState({
    author_name: "",
    rating: 5,
    text: "",
    day: today.getDate(),
    month: today.getMonth(), // 0-11
    year: today.getFullYear(),
  });

  // Seçilen tarihi oluştur
  const reviewDateObj = new Date(formData.year, formData.month, formData.day);
  const calculatedRelativeTime = getRelativeTime(reviewDateObj);
  const formattedDate = reviewDateObj.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Ay isimleri
  const monthNames = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  // Seçilen aydaki gün sayısı
  const daysInMonth = new Date(formData.year, formData.month + 1, 0).getDate();

  // Yorumları yükle
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // Basit query - index gerektirmeyen
      const snapshot = await getDocs(collection(db, "reviews"));
      const reviewsData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a: any, b: any) => {
          // En yeni yorumlar önce (client-side sorting)
          const timeA = a.createdAt?.toMillis() || 0;
          const timeB = b.createdAt?.toMillis() || 0;
          return timeB - timeA;
        }) as Review[];

      setReviews(reviewsData);
      setIsLoading(false);
    } catch (error) {
      console.error("Yorumlar yüklenirken hata:", error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addManualReview({
        author_name: formData.author_name,
        rating: formData.rating,
        text: formData.text,
        reviewDate: new Date(formData.year, formData.month, formData.day),
      });
      alert("Yorum başarıyla eklendi! ✅");
      setShowAddForm(false);
      const resetDate = new Date();
      setFormData({
        author_name: "",
        rating: 5,
        text: "",
        day: resetDate.getDate(),
        month: resetDate.getMonth(),
        year: resetDate.getFullYear(),
      });
      fetchReviews();
    } catch (error) {
      alert("Hata: " + error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu yorumu silmek istediğinize emin misiniz?")) return;

    try {
      await deleteDoc(doc(db, "reviews", id));
      alert("Yorum silindi! ✅");
      fetchReviews();
    } catch (error) {
      alert("Hata: " + error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Yorumlar yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Veli Yorumları</h1>
          <p className="text-gray-600 mt-2">
            Manuel yorum ekleyin ve yorumları yönetin
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
        >
          <FaPlus />
          Yeni Yorum Ekle
        </button>
      </div>

      {/* Yorum Ekleme Formu */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 border-2 border-orange-200 shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Yeni Yorum Ekle
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Veli Adı
                </label>
                <input
                  type="text"
                  required
                  value={formData.author_name}
                  onChange={(e) =>
                    setFormData({ ...formData, author_name: e.target.value })
                  }
                  placeholder="Örn: Ayşe Y."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yıldız Puanı
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rating: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Yıldız)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Yıldız)</option>
                  <option value={3}>⭐⭐⭐ (3 Yıldız)</option>
                  <option value={2}>⭐⭐ (2 Yıldız)</option>
                  <option value={1}>⭐ (1 Yıldız)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yorum Metni
              </label>
              <textarea
                required
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
                placeholder="Velinin yorumunu buraya yazın..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.text.length} karakter
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yorum Tarihi
              </label>

              {/* Türkçe Date Picker */}
              <div className="grid grid-cols-3 gap-3">
                {/* Gün */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Gün
                  </label>
                  <select
                    value={formData.day}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        day: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  >
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                      (day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Ay */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Ay</label>
                  <select
                    value={formData.month}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        month: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  >
                    {monthNames.map((month, index) => (
                      <option key={index} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Yıl */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Yıl
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  >
                    {/* 2020'den bugüne kadar tüm yıllar */}
                    {Array.from(
                      { length: today.getFullYear() - 2019 },
                      (_, i) => today.getFullYear() - i
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Önizleme */}
              <div className="mt-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  📋 Önizleme:
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-blue-800">
                    📅 Tam Tarih:{" "}
                    <strong className="text-blue-900">{formattedDate}</strong>
                  </p>
                  <p className="text-sm text-blue-800">
                    🕐 Göreceli:{" "}
                    <strong className="text-blue-900">
                      {calculatedRelativeTime}
                    </strong>
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-xs text-blue-700 flex items-center gap-1">
                    ✨ Göreceli zaman otomatik hesaplanır ve zaman ilerledikçe
                    güncellenir
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                ✅ Yorumu Kaydet
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Yorumlar Listesi */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Manuel Yorumlar ({reviews.length})
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Google API sadece 5 yorum döndürür. Daha fazla yorum göstermek için
            manuel ekleme yapabilirsiniz.
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>Henüz manuel yorum eklenmemiş.</p>
            <p className="text-sm mt-2">
              Yukarıdaki &quot;Yeni Yorum Ekle&quot; butonunu kullanarak
              başlayın.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Author */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold">
                        {review.author_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {review.author_name}
                        </p>
                        <div className="flex items-center gap-1 text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 mb-2 leading-relaxed">
                      {review.text}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                      {review.reviewDate && (
                        <>
                          <span>
                            📅{" "}
                            {review.reviewDate.toDate
                              ? review.reviewDate
                                  .toDate()
                                  .toLocaleDateString("tr-TR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                              : review.time}
                          </span>
                          <span>
                            🕐{" "}
                            {review.reviewDate.toDate
                              ? getRelativeTime(review.reviewDate.toDate())
                              : review.relative_time}
                          </span>
                        </>
                      )}
                      {!review.reviewDate && review.time && (
                        <>
                          <span>📅 {review.time}</span>
                          <span>🕐 {review.relative_time}</span>
                        </>
                      )}
                      <span
                        className={`px-2 py-1 rounded-full ${
                          review.source === "google"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {review.source === "google" ? "Google" : "Manuel"}
                      </span>
                    </div>
                  </div>

                  {/* Actions - Sadece manuel yorumlar silinebilir */}
                  {review.source === "manual" && (
                    <button
                      onClick={() => review.id && handleDelete(review.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Yorumu Sil"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bilgi Kutusu */}
      <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
          ℹ️ Bilgilendirme
        </h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>
            • Google Places API&apos;den otomatik olarak maksimum{" "}
            <strong>4 veya 5 yorum</strong> döndürür. Bu Google&apos;ın
            sınırlamasıdır.
          </li>
          <li>
            • Daha fazla yorum göstermek için{" "}
            <strong>manuel yorum ekleyin</strong>.
          </li>
          <li>
            • Manuel yorumlar Google&apos;dan gelen yorumlarla{" "}
            <strong>karıştırılır</strong>.
          </li>
          <li>
            • Sitede sadece <strong>5 yıldızlı</strong> yorumlar gösterilir.
          </li>
          <li>
            • Manuel yorumları <strong>gerçek veli yorumlarından</strong>{" "}
            kopyalayın.
          </li>
        </ul>
      </div>
    </div>
  );
}
