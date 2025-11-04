"use client";

import Link from "next/link";
import { FaInstagram, FaCamera, FaVideo } from "react-icons/fa";

export default function AdminMedya() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Medya Yönetimi</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Fotoğraf Yönetimi */}
        <Link href="/admin/medya/fotograf">
          <div className="p-8 rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer text-center group">
            <FaCamera className="mx-auto text-5xl text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Fotoğraf Galerisi
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Medya sayfasına fotoğraf ekle/sil
            </p>
            <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg inline-block font-semibold">
              Yönet →
            </div>
          </div>
        </Link>

        {/* Video Yönetimi */}
        <div className="p-8 rounded-xl border-2 border-gray-300 bg-gradient-to-br from-purple-50 to-pink-50 text-center">
          <FaVideo className="mx-auto text-5xl text-purple-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Video Galerisi
          </h3>
          <p className="text-gray-600 text-sm mb-4">Yakında aktif olacak</p>
          <div className="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg inline-block">
            Hazırlanıyor...
          </div>
        </div>

        {/* Instagram Yönetimi */}
        <Link href="/admin/medya/instagram">
          <div className="p-8 rounded-xl border-2 border-purple-300 bg-gradient-to-br from-pink-50 to-orange-50 hover:border-purple-400 hover:shadow-xl transition-all duration-300 cursor-pointer text-center group">
            <FaInstagram className="mx-auto text-5xl text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Instagram</h3>
            <p className="text-gray-600 text-sm mb-4">
              Medya sayfasında gösterilecek postlar
            </p>
            <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg inline-block font-semibold">
              Yönet →
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
        <p className="text-blue-800">
          <strong>ℹ️ Not:</strong> Fotoğraf ve Video galerisi özellikleri
          yakında eklenecek. Şimdilik Instagram yönetimi aktif.
        </p>
      </div>
    </div>
  );
}
