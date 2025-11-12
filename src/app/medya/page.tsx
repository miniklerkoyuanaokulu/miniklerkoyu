// app/(site)/medya/page.tsx
// Medya sayfası – içerik yokken boş durum + (varsa) filtreli galeri, lightbox ve video desteği

"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import {
  LuCamera,
  LuVideo,
  LuX,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { InstagramFeatured } from "@/components/InstagramFeatured";
import { getInstagramPosts, getMediaItems } from "@/lib/firestore";
import type { InstagramPost } from "@/lib/types";

// --- Tipler ---
export type MediaType = "image" | "video" | "press";
export type MediaItem = {
  id: string;
  url: string;
  caption?: string | null;
  type?: MediaType; // yoksa uzantıdan çıkaracağız
  createdAt?: string | number;
  order?: number; // Admin'den ayarlanan sıralama
  tags?: string[];
  thumbnailUrl?: string; // video için poster
};

// --- Yardımcılar ---
function inferType(url: string): MediaType {
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase();
  if (!ext) return "image";
  if (["mp4", "webm", "mov", "m4v"].includes(ext)) return "video";
  if (["pdf"].includes(ext)) return "press";
  return "image";
}

// Animasyon için
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) },
};

// Bölüm başlığı bileşeni
function SectionTitle({ title, id }: { title: string; id?: string }) {
  return (
    <motion.div {...fadeUp}>
      <h2 id={id} className="text-2xl md:text-3xl font-bold text-white">
        {title}
      </h2>
      <div className="mt-3 h-1 w-20 rounded-full bg-white" />
    </motion.div>
  );
}

// --- Lightbox ---
function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-100 bg-black/70 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close Button - z-index en yüksek */}
        <button
          aria-label="Kapat"
          className="absolute right-4 top-4 z-110 text-white/90 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all duration-200"
          onClick={onClose}
        >
          <LuX className="h-7 w-7" />
        </button>

        <div
          className="absolute inset-0 flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex flex-col max-h-[90vh] max-w-6xl w-full">
            {item.type === "video" ? (
              // YouTube embed URL mu kontrol et
              item.url.includes("youtube.com/embed") ? (
                <iframe
                  src={item.url}
                  className="w-full aspect-video rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  controls
                  controlsList="nodownload"
                  disablePictureInPicture
                  poster={item.thumbnailUrl}
                  className="w-full max-h-[85vh] rounded-lg"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <source src={item.url} />
                </video>
              )
            ) : (
              <div className="relative w-full h-[85vh] flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={item.url}
                    alt={item.caption || "Medya"}
                    fill
                    className="rounded-lg object-contain"
                    unoptimized={item.url.includes("instagram")}
                    sizes="90vw"
                  />
                </div>
              </div>
            )}
            {item.caption && (
              <div className="mt-3 text-center text-white/90 text-sm">
                {item.caption}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none z-110">
          <button
            aria-label="Önceki"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="pointer-events-auto inline-flex items-center justify-center rounded-full p-3 bg-black/30 hover:bg-black/50 text-white transition-all duration-200"
          >
            <LuChevronLeft className="h-6 w-6" />
          </button>
          <button
            aria-label="Sonraki"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="pointer-events-auto inline-flex items-center justify-center rounded-full p-3 bg-black/30 hover:bg-black/50 text-white transition-all duration-200"
          >
            <LuChevronRight className="h-6 w-6" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// --- Card bileşeni ---
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card text-card-foreground shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

// --- Boş durum ---
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) }}
      className="mx-auto max-w-4xl"
    >
      <Card className="p-8 text-center border-2 border-orange-200">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-orange-100 to-amber-100">
          <LuCamera className="h-7 w-7 text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-orange-600 mb-2">
          Henüz medya yok
        </h2>
        <p className="text-muted-foreground">
          Yakında fotoğraf ve videolar eklenecek
        </p>
      </Card>
    </motion.div>
  );
}

// --- Ana Sayfa Bileşeni ---
export default function MedyaPageClient() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightIndex, setLightIndex] = useState<number | null>(null);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [showWatermark, setShowWatermark] = useState(false);

  // Medya ve Instagram içeriklerini Firestore'dan yükle
  useEffect(() => {
    async function loadMedia() {
      try {
        setLoading(true);

        // Tüm medya öğelerini çek (fotoğraf, video, press)
        const mediaData = await getMediaItems();
        const typedMedia = mediaData.map((m) => {
          const item = m as Record<string, unknown>;
          return {
            ...item,
            type:
              (item.type as MediaType | undefined) ||
              inferType(item.url as string),
          };
        }) as MediaItem[];
        setItems(typedMedia);

        // Instagram postlarını çek
        const posts = await getInstagramPosts(true);
        setInstagramPosts(posts);
      } catch (error) {
        console.error("Medya yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    }
    loadMedia();
  }, []);

  // Scroll pozisyonu takibi - Hero kaybolduğunda filigranı göster
  useEffect(() => {
    const handleScroll = () => {
      setShowWatermark(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sıralama: order field'ı varsa ona göre, yoksa createdAt'e göre (en yeni önce)
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      // Order field'ı varsa ona göre sırala (küçükten büyüğe)
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      // Order yoksa createdAt'e göre (en yeni önce)
      return Number(b.createdAt || 0) - Number(a.createdAt || 0);
    });
  }, [items]);

  // Fotoğraf ve videoları ayır
  const photos = useMemo(
    () => sortedItems.filter((item) => item.type === "image"),
    [sortedItems]
  );
  const videos = useMemo(
    () => sortedItems.filter((item) => item.type === "video"),
    [sortedItems]
  );

  const openLightbox = (i: number) => setLightIndex(i);
  const closeLightbox = () => setLightIndex(null);
  const prevLight = () =>
    setLightIndex((i) =>
      i === null ? null : (i + sortedItems.length - 1) % sortedItems.length
    );
  const nextLight = () =>
    setLightIndex((i) => (i === null ? null : (i + 1) % sortedItems.length));

  // Loading state
  if (loading) {
    return (
      <>
        <PageHero
          eyebrow="Medya"
          description="Okuldan fotoğraflar, videolar ve özel anlar – Minikler Köyü'nde yaşanan mutluluklar"
          backgroundImage="/images/pages/medya-page.avif"
        />
        <div className="w-full bg-linear-to-b from-pink-600 via-rose-500 to-fuchsia-500 relative">
          {/* Filigran Logo */}
          <div
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0 transition-opacity duration-500 ${
              showWatermark ? "opacity-[0.09]" : "opacity-0"
            }`}
          >
            <Image
              src="/logo-removebg.png"
              alt=""
              fill
              sizes="800px"
              className="object-contain"
              priority={false}
            />
          </div>

          <main className="mx-auto max-w-6xl px-4 py-10 md:py-12 relative z-10">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Medya yükleniyor...</p>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="Medya"
        description="Okuldan fotoğraflar, videolar ve özel anlar – Minikler Köyü'nde yaşanan mutluluklar"
        backgroundImage="/images/pages/medya-page1.avif"
      />

      <div className="w-full bg-linear-to-b from-pink-600 via-rose-500 to-fuchsia-500 relative">
        {/* Filigran Logo - Arka plan (sabit) - Scroll sonrası görünür */}
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0 transition-opacity duration-500 ${
            showWatermark ? "opacity-[0.09]" : "opacity-0"
          }`}
        >
          <Image
            src="/logo-removebg.png"
            alt=""
            fill
            sizes="800px"
            className="object-contain"
            priority={false}
          />
        </div>

        <main className="mx-auto max-w-6xl px-4 py-10 md:py-12 relative z-10">
          {/* Boş durum */}
          {items.length === 0 && (
            <div className="mt-10">
              <EmptyState />
            </div>
          )}

          {/* Fotoğraflar */}
          {photos.length > 0 && (
            <section className="mb-16">
              <SectionTitle title="Fotoğraflarımız" id="fotograflar" />
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {photos.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="group cursor-zoom-in"
                    onClick={() => openLightbox(sortedItems.indexOf(m))}
                  >
                    <div className="rounded-xl overflow-hidden border-2 border-border hover:border-orange-300 hover:shadow-xl transition-all duration-300">
                      <div className="relative w-full overflow-hidden aspect-square">
                        <Image
                          src={m.url}
                          alt={m.caption || "Fotoğraf"}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {m.caption && (
                        <div className="p-3 bg-white border-t border-border text-sm text-gray-700 font-medium">
                          {m.caption}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Videolar */}
          {videos.length > 0 && (
            <section className="mb-16">
              <SectionTitle title="Videolarımız" id="videolar" />
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {videos.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="group cursor-zoom-in"
                    onClick={() => openLightbox(sortedItems.indexOf(m))}
                  >
                    <div className="rounded-xl overflow-hidden border-2 border-border hover:border-orange-300 hover:shadow-xl transition-all duration-300">
                      <div className="relative w-full overflow-hidden aspect-square">
                        {m.thumbnailUrl ? (
                          <Image
                            src={m.thumbnailUrl}
                            alt={m.caption || "Video"}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <video
                            muted
                            playsInline
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onContextMenu={(e) => e.preventDefault()}
                          >
                            <source src={m.url} />
                          </video>
                        )}
                        <div className="absolute right-2 top-2 rounded-md bg-black/70 px-2.5 py-1.5 text-xs text-white inline-flex items-center gap-1.5 font-medium backdrop-blur-sm">
                          <LuVideo className="w-3.5 h-3.5" /> Video
                        </div>
                      </div>

                      {m.caption && (
                        <div className="p-3 bg-white border-t border-border text-sm text-gray-700 font-medium">
                          {m.caption}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Lightbox */}
          {lightIndex !== null && (
            <Lightbox
              items={sortedItems}
              index={lightIndex}
              onClose={closeLightbox}
              onPrev={prevLight}
              onNext={nextLight}
            />
          )}

          {/* Instagram Featured */}
          {instagramPosts.length > 0 && (
            <InstagramFeatured posts={instagramPosts} />
          )}

          {/* Alt CTA */}
          <section className="mt-16 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="relative overflow-hidden border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                {/* Decorative linear blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl" />

                <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">
                      Okuldan daha fazla anı paylaşalım!
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Galeriye yeni fotoğraf ve video eklemek için bizimle
                      iletişime geçin.
                    </p>
                  </div>

                  <Link
                    href="/iletisim"
                    className="group shrink-0 inline-flex items-center gap-2 rounded-xl px-8 py-4 bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300"
                  >
                    İletişim
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
              </Card>
            </motion.div>
          </section>
        </main>
      </div>
    </>
  );
}
