// app/(site)/medya/page.tsx
// Medya sayfası – içerik yokken boş durum + (varsa) filtreli galeri, lightbox ve video desteği

"use client";

import { useEffect, useMemo, useState, ReactElement } from "react";
import Image from "next/image";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import {
  LuCamera,
  LuVideo,
  LuNewspaper,
  LuSearch,
  LuX,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { InstagramFeatured } from "@/components/InstagramFeatured";
import { getInstagramPosts } from "@/lib/firestore";
import type { InstagramPost } from "@/lib/types";

// --- Tipler ---
export type MediaType = "image" | "video" | "press";
export type MediaItem = {
  id: string;
  url: string;
  caption?: string | null;
  type?: MediaType; // yoksa uzantıdan çıkaracağız
  createdAt?: string | number;
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

function classNames(...cn: (string | false | undefined)[]) {
  return cn.filter(Boolean).join(" ");
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
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          aria-label="Kapat"
          className="absolute right-4 top-4 text-white/90 hover:text-white"
          onClick={onClose}
        >
          <LuX className="h-7 w-7" />
        </button>

        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="relative max-h-[90vh] max-w-6xl w-full">
            {item.type === "video" ? (
              <video
                controls
                poster={item.thumbnailUrl}
                className="w-full max-h-[90vh] rounded-lg"
              >
                <source src={item.url} />
              </video>
            ) : (
              <Image
                src={item.url}
                alt={item.caption || "Medya"}
                width={1600}
                height={900}
                className="h-auto w-full rounded-lg object-contain"
              />
            )}
            {item.caption && (
              <div className="mt-3 text-center text-white/90 text-sm">
                {item.caption}
              </div>
            )}
          </div>
        </div>

        <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none">
          <button
            aria-label="Önceki"
            onClick={onPrev}
            className="pointer-events-auto inline-flex items-center justify-center rounded-full p-2 bg-white/10 hover:bg-white/20 text-white"
          >
            <LuChevronLeft className="h-6 w-6" />
          </button>
          <button
            aria-label="Sonraki"
            onClick={onNext}
            className="pointer-events-auto inline-flex items-center justify-center rounded-full p-2 bg-white/10 hover:bg-white/20 text-white"
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
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100">
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
export default function MedyaPageClient({
  initial,
}: {
  initial?: { items?: MediaItem[] };
}) {
  const items = useMemo(
    () =>
      (initial?.items || []).map((m) => ({
        ...m,
        type: m.type || inferType(m.url),
      })),
    [initial]
  );
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<MediaType | "all">("all");
  const [lightIndex, setLightIndex] = useState<number | null>(null);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);

  // Instagram postlarını Firestore'dan yükle
  // NOT: Thumbnail'ler admin panelde bir kez çekilip kaydedilmiştir.
  // Burada Instagram API'sine istek atmıyoruz, sadece Firestore'dan okuyoruz.
  // Bu sayede rate limit sorunu yaşamıyoruz ve performans maksimum.
  useEffect(() => {
    async function loadInstagram() {
      try {
        const posts = await getInstagramPosts(true); // Sadece aktif olanlar
        setInstagramPosts(posts);
      } catch (error) {
        console.error("Instagram postları yüklenirken hata:", error);
      }
    }
    loadInstagram();
  }, []);

  const filtered = useMemo(
    () =>
      items
        .filter((x) => (tab === "all" ? true : x.type === tab))
        .filter((x) =>
          q ? (x.caption || "").toLowerCase().includes(q.toLowerCase()) : true
        )
        .sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0)),
    [items, tab, q]
  );

  const tabs: { key: MediaType | "all"; label: string; icon: ReactElement }[] =
    [
      { key: "all", label: "Tümü", icon: <LuCamera /> },
      { key: "image", label: "Fotoğraflar", icon: <LuCamera /> },
      { key: "video", label: "Videolar", icon: <LuVideo /> },
      { key: "press", label: "Basın/PDF", icon: <LuNewspaper /> },
    ];

  const openLightbox = (i: number) => setLightIndex(i);
  const closeLightbox = () => setLightIndex(null);
  const prevLight = () =>
    setLightIndex((i) =>
      i === null ? null : (i + filtered.length - 1) % filtered.length
    );
  const nextLight = () =>
    setLightIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="Medya"
        description="Okuldan fotoğraflar, videolar ve özel anlar – Minikler Köyü'nde yaşanan mutluluklar"
      />

      <main className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        {/* Başlık ve Arama */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) }}
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[color:var(--primary)]">
              Galeri
            </h2>
            <p className="text-muted-foreground mt-1">
              Fotoğraflar, videolar ve basından haberler
            </p>
          </div>

          {/* Arama */}
          <label className="relative inline-flex items-center">
            <LuSearch className="absolute left-3 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ara..."
              className="w-full md:w-64 rounded-lg border-2 border-border bg-card px-9 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
            />
          </label>
        </motion.div>

        {/* Sekmeler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: cubicBezier(0.16, 1, 0.3, 1),
            delay: 0.1,
          }}
          className="flex flex-wrap gap-3"
        >
          {tabs.map((t) => (
            <motion.button
              key={t.key}
              onClick={() => setTab(t.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={classNames(
                "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border-2 transition-all duration-200",
                tab === t.key
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-lg"
                  : "border-border bg-white hover:border-orange-300 hover:bg-orange-50"
              )}
            >
              <span className="text-base">{t.icon}</span>
              {t.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Boş durum */}
        {items.length === 0 && (
          <div className="mt-10">
            <EmptyState />
          </div>
        )}

        {/* Galeri */}
        {items.length > 0 && (
          <>
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-10"
              >
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground text-lg">
                    Aramanızla eşleşen içerik bulunamadı.
                  </p>
                </Card>
              </motion.div>
            ) : (
              <div className="mt-10 columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                {filtered.map((m, idx) => (
                  <motion.div
                    key={m.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="break-inside-avoid rounded-xl overflow-hidden border-2 border-border bg-card cursor-zoom-in hover:border-orange-300 hover:shadow-xl group"
                    onClick={() => openLightbox(idx)}
                  >
                    {m.type === "video" ? (
                      <div
                        className="relative w-full overflow-hidden"
                        style={{ aspectRatio: "16/9" }}
                      >
                        {/* Poster varsa göster; yoksa <video> */}
                        {m.thumbnailUrl ? (
                          <Image
                            src={m.thumbnailUrl}
                            alt={m.caption || "Video"}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <video
                            muted
                            playsInline
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                          >
                            <source src={m.url} />
                          </video>
                        )}
                        <div className="absolute right-2 top-2 rounded-md bg-black/70 px-2.5 py-1.5 text-xs text-white inline-flex items-center gap-1.5 font-medium backdrop-blur-sm">
                          <LuVideo className="w-3.5 h-3.5" /> Video
                        </div>
                      </div>
                    ) : m.type === "press" ? (
                      <div
                        className="relative w-full overflow-hidden"
                        style={{ aspectRatio: "4/3" }}
                      >
                        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-orange-50 to-amber-50 group-hover:from-orange-100 group-hover:to-amber-100 transition-colors duration-300">
                          <LuNewspaper className="h-10 w-10 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="absolute right-2 top-2 rounded-md bg-black/70 px-2.5 py-1.5 text-xs text-white inline-flex items-center gap-1.5 font-medium backdrop-blur-sm">
                          PDF
                        </div>
                      </div>
                    ) : (
                      <div className="relative overflow-hidden">
                        <Image
                          src={m.url}
                          alt={m.caption || "Fotoğraf"}
                          width={800}
                          height={600}
                          className="h-auto w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {m.caption && (
                      <div className="p-3 text-sm text-gray-700 font-medium">
                        {m.caption}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Lightbox */}
            {lightIndex !== null && (
              <Lightbox
                items={filtered}
                index={lightIndex}
                onClose={closeLightbox}
                onPrev={prevLight}
                onNext={nextLight}
              />
            )}
          </>
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
              {/* Decorative gradient blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl" />

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
                  className="group flex-shrink-0 inline-flex items-center gap-2 rounded-xl px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300"
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
    </>
  );
}

// Sunucu bileşeni sarmalayıcı – getPageData ile uyum için
// app/(site)/medya/page.server.tsx gibi ayrı dosyada da yapılabilir; burada tek dosya tutuyoruz.
export async function MedyaPageWrapper({
  getData,
}: {
  getData: () => Promise<{ items?: MediaItem[] }>;
}) {
  const data = await getData();
  return <MedyaPageClient initial={data} />;
}

// Eğer mevcutta getPageData kullanıyorsan aşağıdaki default export'u kullan:
// (Bu dosyada server ortamında çalışacak bir wrapper oluşturduk.)

// ---- Aşağıyı aktif et: ----
// import { getPageData } from "@/lib/utils";
// export default async function MedyaPage() {
//   const data = await getPageData("medya");
//   return <MedyaPageClient initial={data} />;
// }
