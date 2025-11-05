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
          <div className="p-8 rounded-xl border-2 border-blue-300 bg-linear-to-br from-blue-50 to-cyan-50 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer text-center group">
            <FaCamera className="mx-auto text-5xl text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Fotoğraf Galerisi
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Medya sayfasına fotoğraf ekle/sil
            </p>
            <div className="px-4 py-2 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-lg inline-block font-semibold">
              Yönet →
            </div>
          </div>
        </Link>

        {/* Video Yönetimi */}
        <Link href="/admin/medya/video">
          <div className="p-8 rounded-xl border-2 border-green-300 bg-linear-to-br from-green-50 to-emerald-50 hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer text-center group">
            <FaVideo className="mx-auto text-5xl text-green-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Video Galerisi
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Video yükleyin veya YouTube linki ekleyin
            </p>
            <div className="px-4 py-2 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-lg inline-block font-semibold">
              Yönet →
            </div>
          </div>
        </Link>

        {/* Instagram Yönetimi */}
        <Link href="/admin/medya/instagram">
          <div className="p-8 rounded-xl border-2 border-purple-300 bg-linear-to-br from-pink-50 to-orange-50 hover:border-purple-400 hover:shadow-xl transition-all duration-300 cursor-pointer text-center group">
            <FaInstagram className="mx-auto text-5xl text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Instagram</h3>
            <p className="text-gray-600 text-sm mb-4">
              Medya sayfasında gösterilecek postlar
            </p>
            <div className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg inline-block font-semibold">
              Yönet →
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
