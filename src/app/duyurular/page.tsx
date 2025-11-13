"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaCalendar, FaArrowRight } from "react-icons/fa";
import { getAnnouncements } from "@/lib/firestore";
import type { Announcement } from "@/lib/types";
import { PageHero } from "@/components/PageHero";

export default function DuyurularPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  async function loadAnnouncements() {
    try {
      setLoading(true);
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error("Duyurular yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(timestamp: number) {
    return new Date(timestamp).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function getExcerpt(content: string, maxLength = 150) {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + "...";
  }

  return (
    <div>
      <PageHero
        eyebrow="Duyurularımız"
        description="Okulumuzdan haberler ve duyurular"
        backgroundImage="/images/pages/hero-for-pages3.avif"
      />

      <div className="w-full bg-linear-to-b from-purple-600 via-purple-500 to-violet-500 relative min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white mt-4 font-medium">
                Duyurular yükleniyor...
              </p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📢</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Henüz Duyuru Bulunmuyor
              </h2>
              <p className="text-white/90">
                Yeni duyurular eklendiğinde burada görüntülenecektir.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {announcements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/duyurular/${announcement.slug}`}>
                    <motion.article
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border-2 border-white/30 hover:border-white/70"
                      whileHover={{ y: -4 }}
                    >
                      <div className="p-6 md:p-8">
                        {/* Tarih */}
                        <div className="flex items-center gap-2 text-purple-600 mb-4">
                          <FaCalendar />
                          <time className="text-sm font-medium">
                            {formatDate(announcement.date)}
                          </time>
                        </div>

                        {/* Başlık */}
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 hover:text-purple-600 transition-colors">
                          {announcement.title}
                        </h2>

                        {/* İçerik Özeti */}
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {getExcerpt(announcement.content)}
                        </p>

                        {/* Devamını Oku */}
                        <div className="flex items-center gap-2 text-purple-600 font-medium hover:gap-3 transition-all">
                          <span>Devamını Oku</span>
                          <FaArrowRight />
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
