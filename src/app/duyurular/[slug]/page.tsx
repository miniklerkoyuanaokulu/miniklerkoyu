"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaCalendar,
  FaArrowLeft,
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaShareAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { getAnnouncementBySlug } from "@/lib/firestore";
import type { Announcement } from "@/lib/types";

export default function DuyuruDetayPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // URL'yi client-side'da set et
    setShareUrl(window.location.href);
    loadAnnouncement();
  }, [slug]);

  async function loadAnnouncement() {
    try {
      setLoading(true);
      const data = await getAnnouncementBySlug(slug);

      if (!data) {
        setNotFound(true);
      } else {
        setAnnouncement(data);
      }
    } catch (error) {
      console.error("Duyuru yüklenirken hata:", error);
      setNotFound(true);
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

  function handleShare(platform: string) {
    if (!announcement) return;

    const title = encodeURIComponent(announcement.title);
    const url = encodeURIComponent(shareUrl);

    let shareLink = "";

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case "whatsapp":
        shareLink = `https://wa.me/?text=${title}%20${url}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-purple-600 via-purple-500 to-violet-500 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white mt-4 font-medium">Duyuru yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (notFound || !announcement) {
    return (
      <div className="min-h-screen bg-linear-to-b from-purple-600 via-purple-500 to-violet-500 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Duyuru Bulunamadı
          </h1>
          <p className="text-white/90 mb-8">
            Aradığınız duyuru bulunamadı veya kaldırılmış olabilir.
          </p>
          <Link href="/duyurular">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-medium shadow-lg hover:shadow-xl"
            >
              <FaArrowLeft />
              Duyurulara Dön
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-600 via-purple-500 to-violet-500">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link href="/duyurular">
          <motion.button
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 text-white hover:text-white/90 font-medium transition-colors"
          >
            <FaArrowLeft />
            Tüm Duyurular
          </motion.button>
        </Link>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-white/30"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-8 md:p-12 text-white">
            <div className="flex items-center gap-2 mb-4">
              <FaCalendar />
              <time className="text-sm font-medium opacity-90">
                {formatDate(announcement.date)}
              </time>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {announcement.title}
            </h1>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {announcement.content.split("\n").map((paragraph, index) => {
                if (paragraph.trim() === "") return null;
                return (
                  <p
                    key={index}
                    className="text-gray-700 leading-relaxed mb-4 text-justify"
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t-2 border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <FaShareAlt className="text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Bu Duyuruyu Paylaş
                </h3>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare("facebook")}
                  className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
                  title="Facebook'ta Paylaş"
                >
                  <FaFacebook className="text-xl" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare("twitter")}
                  className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-xl shadow-md hover:shadow-lg transition-all"
                  title="X'te Paylaş"
                >
                  <FaXTwitter className="text-xl" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare("whatsapp")}
                  className="w-12 h-12 flex items-center justify-center bg-green-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
                  title="WhatsApp'ta Paylaş"
                >
                  <FaWhatsapp className="text-xl" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare("linkedin")}
                  className="w-12 h-12 flex items-center justify-center bg-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
                  title="LinkedIn'de Paylaş"
                >
                  <FaLinkedin className="text-xl" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </article>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden border-2 border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
            <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">
                  Bize Katılın!
                </h3>
                <p className="text-gray-700 text-lg">
                  Çocuğunuz için ön kayıt yaptırın, okulumuzun bir parçası olun.
                </p>
              </div>

              <Link
                href="/iletisim#on-kayit-formu"
                className="group shrink-0 inline-flex items-center gap-2 rounded-xl px-8 py-4 bg-linear-to-r from-purple-600 to-violet-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-violet-700 transition-all duration-300"
              >
                Ön Kayıt Formu
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bottom Navigation */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <Link href="/duyurular">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 border-2 border-white/30"
          >
            <FaArrowLeft />
            Tüm Duyurulara Geri Dön
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
