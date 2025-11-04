"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaClipboardList, FaVideo } from "react-icons/fa";

const menuItems = [
  {
    title: "Ön Kayıtlar",
    href: "/admin/on-kayitlar",
    icon: FaClipboardList,
    color: "from-blue-500 to-cyan-500",
    description: "Başvuruları görüntüle ve yönet",
  },
  {
    title: "Medya",
    href: "/admin/medya",
    icon: FaVideo,
    color: "from-purple-500 to-pink-500",
    description: "Fotoğraf, Video ve Instagram Yönetimi",
  },

  // Diğer sayfalar - Yakında aktif olacak
  /*
  {
    title: "Kurumsal",
    href: "/admin/kurumsal",
    icon: FaBuilding,
    color: "from-green-500 to-emerald-500",
    description: "Kurumsal sayfa içeriği",
  },
  {
    title: "Eğitim Modelimiz",
    href: "/admin/egitim-modelimiz",
    icon: FaGraduationCap,
    color: "from-orange-500 to-amber-500",
    description: "Eğitim modeli içeriği",
  },
  {
    title: "Neden Minikler Köyü",
    href: "/admin/neden-minikler-koyu",
    icon: FaHeart,
    color: "from-rose-500 to-pink-500",
    description: "Neden biz sayfası içeriği",
  },
  {
    title: "İletişim",
    href: "/admin/iletisim",
    icon: FaEnvelope,
    color: "from-indigo-500 to-blue-500",
    description: "İletişim bilgileri",
  },
  */
];

export default function AdminHome() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Yönetim Paneli
        </h1>
        <p className="text-lg text-gray-600">
          Vardalı Minikler Köyü - İçerik Yönetimi
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, idx) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Link href={item.href}>
              <div className="group relative h-full bg-white rounded-2xl border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer">
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative p-6">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <item.icon />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900">
                    {item.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm">{item.description}</p>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center text-gray-400 group-hover:text-gray-600 transition-colors">
                    <span className="text-sm font-medium">Yönet</span>
                    <svg
                      className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
