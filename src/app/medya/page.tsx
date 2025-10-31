// app/(site)/medya/page.tsx
// Medya sayfası – içerik yokken boş durum + (varsa) filtreli galeri, lightbox ve video desteği

"use client";

import { useEffect, useMemo, useState, ReactElement } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

// --- Boş durum ---
function EmptyState() {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[color:var(--neutral-light)]">
        <LuCamera className="h-7 w-7 text-[color:var(--primary)]" />
      </div>
      <h2 className="text-xl font-semibold text-[color:var(--primary)]">
        Henüz medya yok
      </h2>
      <p className="mt-2 text-muted-foreground">
        Fotoğraf ve videoları eklediğinizde burada görünecek.
      </p>
    </div>
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
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Başlık */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Medya</h1>
          <p className="text-muted-foreground">
            Okuldan fotoğraf, video ve basın içerikleri
          </p>
        </div>

        {/* Arama */}
        <label className="relative inline-flex items-center">
          <LuSearch className="absolute left-3 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ara..."
            className="w-64 rounded-lg border border-border bg-card px-9 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
      </div>

      {/* Sekmeler */}
      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={classNames(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm border transition",
              tab === t.key
                ? "bg-primary text-primary-foreground border-transparent"
                : "border-border hover:bg-[color:var(--neutral-light)]"
            )}
          >
            <span className="text-base">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Boş durum */}
      {items.length === 0 && (
        <div className="mt-8">
          <EmptyState />
        </div>
      )}

      {/* Galeri */}
      {items.length > 0 && (
        <>
          {filtered.length === 0 ? (
            <p className="mt-8 text-muted-foreground">
              Aramanızla eşleşen içerik bulunamadı.
            </p>
          ) : (
            <div className="mt-8 columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
              {filtered.map((m, idx) => (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="break-inside-avoid rounded-xl overflow-hidden border border-border bg-card cursor-zoom-in"
                  onClick={() => openLightbox(idx)}
                >
                  {m.type === "video" ? (
                    <div
                      className="relative w-full"
                      style={{ aspectRatio: "16/9" }}
                    >
                      {/* Poster varsa göster; yoksa <video> */}
                      {m.thumbnailUrl ? (
                        <Image
                          src={m.thumbnailUrl}
                          alt={m.caption || "Video"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <video
                          muted
                          playsInline
                          className="h-full w-full object-cover"
                        >
                          <source src={m.url} />
                        </video>
                      )}
                      <div className="absolute right-2 top-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white inline-flex items-center gap-1">
                        <LuVideo /> Video
                      </div>
                    </div>
                  ) : m.type === "press" ? (
                    <div
                      className="relative w-full"
                      style={{ aspectRatio: "4/3" }}
                    >
                      <div className="absolute inset-0 grid place-items-center bg-[color:var(--neutral-light)]">
                        <LuNewspaper className="h-10 w-10 text-[color:var(--primary)]" />
                      </div>
                      <div className="absolute right-2 top-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white inline-flex items-center gap-1">
                        PDF
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={m.url}
                      alt={m.caption || "Fotoğraf"}
                      width={800}
                      height={600}
                      className="h-auto w-full object-cover"
                    />
                  )}

                  {m.caption && <div className="p-3 text-sm">{m.caption}</div>}
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

      {/* Alt bilgi/CTA */}
      <div className="mt-12">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-[color:var(--primary)]">
              Okuldan daha fazla anı paylaşalım
            </h3>
            <p className="text-muted-foreground">
              Galeriye yeni fotoğraf/video eklemek için bizimle iletişime geçin.
            </p>
          </div>
          <Link
            href="/iletisim"
            className="inline-flex items-center rounded-lg px-4 py-2 bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            İletişim
          </Link>
        </div>
      </div>
    </main>
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
