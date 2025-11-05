// app/(site)/page.tsx
// Anasayfa – doğa temalı hero + öne çıkanlar + akış/timeline + branşlar + görsel şerit + CTA + iletişim bandı

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";
import {
  LuLeaf,
  LuHeartHandshake,
  LuShieldCheck,
  LuSprout,
  LuPalette,
  LuDumbbell,
  LuMusic,
  LuFlower2,
  LuTheater,
  LuCamera,
} from "react-icons/lu";
import { Hero } from "@/components/Hero";
import { getMediaItems } from "@/lib/firestore";
import type { MediaItem } from "@/lib/types";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) },
};

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) },
};

function SectionTitle({
  title,
  eyebrow,
  id,
}: {
  title: string;
  eyebrow?: string;
  id?: string;
}) {
  return (
    <motion.div {...fadeUp}>
      {eyebrow && (
        <p className="text-xs tracking-wider uppercase text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-2xl md:text-3xl font-bold text-orange-500">
        {title}
      </h2>
      <div className="mt-3 h-1 w-20 rounded-full bg-secondary" />
    </motion.div>
  );
}

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

export default function HomePage() {
  const [recentPhotos, setRecentPhotos] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentPhotos() {
      try {
        const photos = await getMediaItems("image");
        // Son 4 fotoğrafı al
        setRecentPhotos(photos.slice(0, 4) as MediaItem[]);
      } catch (error) {
        console.error("Fotoğraflar yüklenirken hata:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecentPhotos();
  }, []);

  return (
    <>
      {/* HERO - Full width, behind navbar */}
      <Hero />

      {/* Main content wrapper */}
      <main className="mx-auto max-w-5xl px-4">
        {/* Hoşgeldin Bölümü */}
        <section className="py-12 md:py-16">
          <motion.div {...fadeUp} className="mx-auto max-w-4xl">
            <Card className="overflow-hidden bg-white border-2 border-primary/20 shadow-xl">
              <div className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
                  <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                    &quot;Sil Baştan&quot; Değil &quot;En Baştan&quot;
                  </span>
                </h2>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Doğanın kalbinde, çocukların kahkahalarıyla yankılanan bir
                    öğrenme köyüyüz. Her sabah, miniklerimizi çiçek kokuları,
                    kuş sesleri ve sevgiyle kucaklıyoruz. Burada çocuklar sadece
                    &quot;öğrenmiyor&quot;, merak ediyor, dokunuyor, deniyor ve
                    hissediyor.
                  </p>
                  <p>
                    Varda Minikler Köyü Anaokulu&apos;nda eğitim dört duvarla
                    sınırlı değildir: bahçemiz, atölyemiz, mutfağımız ve hayvan
                    dostlarımız en doğal sınıflarımızdır. Her çocuk kendi
                    ritminde, kendi renginde, kendi merakının izinde büyür.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* ÖNE ÇIKANLAR – Neden Minikler Köyü */}
        <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <SectionTitle
            eyebrow="Neden Minikler Köyü?"
            title="Doğal, Güvenli, Sevgi Dolu"
          />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              {...fadeUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="p-6 h-full relative overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100/50 border-2 hover:border-emerald-200">
                <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-100 to-green-100 text-emerald-600 group-hover:from-emerald-500 group-hover:to-green-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <LuSprout className="w-6 h-6" />
                    </span>
                    <h3 className="text-lg font-semibold group-hover:text-emerald-700 transition-colors">
                      Organik Beslenme
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    Günlük taze menü, ev yapımı ürünler ve mutfak etkinlikleri
                    ile güvenli beslenme.
                  </p>
                  <Link
                    href="/neden-minikler-koyu#beslenme"
                    className="mt-auto pt-4 inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 underline underline-offset-4 decoration-2 group-hover:gap-2 transition-all"
                  >
                    Daha fazla →
                  </Link>
                </div>
              </Card>
            </motion.div>

            <motion.div
              {...fadeUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="p-6 h-full relative overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-cyan-100/50 border-2 hover:border-cyan-200">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-cyan-100 to-blue-100 text-cyan-600 group-hover:from-cyan-500 group-hover:to-blue-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <LuLeaf className="w-6 h-6" />
                    </span>
                    <h3 className="text-lg font-semibold group-hover:text-cyan-700 transition-colors">
                      Geniş Oyun Alanları
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    Kum havuzu, hobi bahçesi, amfi tiyatro ve zipline ile 1100
                    m² oyun alanı.
                  </p>
                  <Link
                    href="/neden-minikler-koyu#fiziksel-kosullar"
                    className="mt-auto pt-4 inline-flex items-center text-sm font-medium text-cyan-600 hover:text-cyan-700 underline underline-offset-4 decoration-2 group-hover:gap-2 transition-all"
                  >
                    Daha fazla →
                  </Link>
                </div>
              </Card>
            </motion.div>

            <motion.div
              {...fadeUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="p-6 h-full relative overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-amber-100/50 border-2 hover:border-amber-200">
                <div className="absolute inset-0 bg-linear-to-br from-amber-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-amber-100 to-orange-100 text-amber-600 group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <LuShieldCheck className="w-6 h-6" />
                    </span>
                    <h3 className="text-lg font-semibold group-hover:text-amber-700 transition-colors">
                      Titiz Güvenlik
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    Kimlik kontrol, yetkili teslim ve şeffaf bilgilendirme
                    prosedürleri.
                  </p>
                  <Link
                    href="/neden-minikler-koyu#guvenlik"
                    className="mt-auto pt-4 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 underline underline-offset-4 decoration-2 group-hover:gap-2 transition-all"
                  >
                    Daha fazla →
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* GÜNÜMÜZ NASIL GEÇER – kısa özet */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-100/90 via-pink-100/80 to-blue-100/90" />
          <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />

          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
            <motion.div {...fadeUp}>
              <Card className="p-8 relative overflow-hidden border-2 border-purple-100 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-purple-100/50 to-pink-100/50 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <SectionTitle
                    eyebrow="Günlük Akış"
                    title="Günümüz Nasıl Geçer?"
                  />
                  <div className="prose max-w-none mt-6">
                    <p className="text-base text-gray-700 leading-relaxed">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-white text-sm font-semibold mr-2">
                        08
                      </span>
                      <span className="font-medium text-purple-900">
                        Günaydın halkasıyla
                      </span>{" "}
                      başlar; kahvaltı, bahçe oyunları ve branş dersleriyle
                      devam eder. Öğle sonrası yaş grubuna uygun
                      dinlenme/etkinlikler ve ikindi kahvaltısı ile gün
                      tamamlanır.
                    </p>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <Link
                      href="/egitim-modelimiz#gunumuz-nasil-gecer"
                      className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-medium text-white shadow-md hover:shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                    >
                      Detaylı Akış
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                    <div className="inline-flex items-center gap-2 text-sm text-purple-700 font-medium">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-white text-xs">
                          🌱
                        </div>
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-cyan-400 border-2 border-white flex items-center justify-center text-white text-xs">
                          🎨
                        </div>
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-400 to-orange-400 border-2 border-white flex items-center justify-center text-white text-xs">
                          🎭
                        </div>
                      </div>
                      <span className="hidden sm:inline">
                        Dolu dolu aktiviteler
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              {...fadeIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="p-4 group cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 hover:border-purple-200 overflow-hidden relative bg-white">
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="relative h-64 w-full overflow-hidden rounded-xl">
                    <Image
                      src="/images/home/gun-akisi.jpg"
                      alt="Günlük akış"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        Canlı ve eğlenceli
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-medium text-gray-700 group-hover:text-purple-700 transition-colors flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    Her gün keşif, oyun ve paylaşım dolu.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* BRANŞLAR – mini grid */}
        <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <SectionTitle eyebrow="Derslerimiz" title="Oyun Temelli Branşlar" />
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-6">
            {[
              {
                icon: <LuHeartHandshake />,
                t: "Yabancı Dil",
                color: "from-indigo-500 to-blue-500",
                bgLight: "from-indigo-50 to-blue-50",
                iconColor: "text-indigo-600",
                hoverBorder: "hover:border-indigo-300",
                hoverShadow: "hover:shadow-indigo-100/50",
              },
              {
                icon: <LuPalette />,
                t: "Görsel Sanatlar",
                color: "from-pink-500 to-rose-500",
                bgLight: "from-pink-50 to-rose-50",
                iconColor: "text-pink-600",
                hoverBorder: "hover:border-pink-300",
                hoverShadow: "hover:shadow-pink-100/50",
              },
              {
                icon: <LuDumbbell />,
                t: "Jimnastik",
                color: "from-blue-500 to-cyan-500",
                bgLight: "from-blue-50 to-cyan-50",
                iconColor: "text-blue-600",
                hoverBorder: "hover:border-blue-300",
                hoverShadow: "hover:shadow-blue-100/50",
              },
              {
                icon: <LuMusic />,
                t: "Dans",
                color: "from-purple-500 to-violet-500",
                bgLight: "from-purple-50 to-violet-50",
                iconColor: "text-purple-600",
                hoverBorder: "hover:border-purple-300",
                hoverShadow: "hover:shadow-purple-100/50",
              },
              {
                icon: <LuFlower2 />,
                t: "Yoga",
                color: "from-green-500 to-emerald-500",
                bgLight: "from-green-50 to-emerald-50",
                iconColor: "text-green-600",
                hoverBorder: "hover:border-green-300",
                hoverShadow: "hover:shadow-green-100/50",
              },
              {
                icon: <LuTheater />,
                t: "Drama",
                color: "from-amber-500 to-orange-500",
                bgLight: "from-amber-50 to-orange-50",
                iconColor: "text-amber-600",
                hoverBorder: "hover:border-amber-300",
                hoverShadow: "hover:shadow-amber-100/50",
              },
            ].map((it, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <Card
                  className={`p-5 text-center h-full group cursor-pointer transition-all duration-300 hover:shadow-xl ${it.hoverShadow} border-2 ${it.hoverBorder} relative overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${it.bgLight} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`mx-auto mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${it.color} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                    >
                      <span className="text-2xl">{it.icon}</span>
                    </div>
                    <div
                      className={`text-sm font-semibold ${it.iconColor} group-hover:scale-105 transition-transform duration-300`}
                    >
                      {it.t}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 items-center justify-center">
            <Link
              href="/egitim-modelimiz#derslerimiz"
              className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Tüm Dersler
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
        </section>

        {/* GÖRSEL ŞERİT / MEDYA TEASER */}
        <section className="relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-20 bg-linear-to-br from-green-50/80 via-blue-50/60 to-purple-50/80" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-purple-200/20 to-green-200/20 rounded-full blur-3xl" />

          {/* subtle noise */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background:radial-gradient(circle_at_center,#000_0.5px,transparent_0.5px)] bg-size-[20px_20px]" />

          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-10"
            >
              <SectionTitle eyebrow="Medya" title="Anılardan Kesitler" />
              <p className="mt-4 text-gray-600 max-w-2xl">
                Miniklerimizin neşeli anları, öğrenme serüvenleri ve unutulmaz
                deneyimleri
              </p>
            </motion.div>

            {/* Masonry-like grid */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-12 gap-4">
              {isLoading ? (
                // Loading skeleton
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`${
                        i === 1
                          ? "md:col-span-7"
                          : i === 2
                          ? "md:col-span-5"
                          : "md:col-span-6"
                      }`}
                    >
                      <div className="relative h-48 md:h-64 rounded-2xl bg-gray-200 animate-pulse" />
                    </div>
                  ))}
                </>
              ) : recentPhotos.length === 0 ? (
                // Eğer hiç fotoğraf yoksa
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <LuCamera className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Henüz fotoğraf eklenmemiş</p>
                </div>
              ) : (
                // Firebase'den gelen fotoğraflar
                recentPhotos.map((photo, index) => {
                  // Her fotoğraf için farklı renk kombinasyonları
                  const gradients = [
                    { colorFrom: "#ff7a00", colorTo: "#ff477e" },
                    { colorFrom: "#2ec4b6", colorTo: "#00b4d8" },
                    { colorFrom: "#6ee7b7", colorTo: "#22c55e" },
                    { colorFrom: "#a78bfa", colorTo: "#7c3aed" },
                  ];
                  const spans = [
                    "md:col-span-7",
                    "md:col-span-5",
                    "md:col-span-6",
                    "md:col-span-6",
                  ];

                  const gradient = gradients[index] || gradients[0];
                  const span = spans[index] || "md:col-span-6";

                  return (
                    <motion.div
                      key={photo.id || index}
                      whileHover={{ y: -8, scale: 1.02, rotate: -0.6 }}
                      transition={{ duration: 0.25 }}
                      className={`group ${span}`}
                    >
                      {/* gradient border wrapper */}
                      <div
                        className="relative rounded-2xl p-[2px]"
                        style={{
                          background: `linear-gradient(135deg, ${gradient.colorFrom}55, ${gradient.colorTo}55)`,
                        }}
                      >
                        {/* card */}
                        <div
                          className="relative h-48 md:h-64 overflow-hidden rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md 
                            shadow-[0_10px_25px_-10px_rgba(0,0,0,0.25)] transition-all duration-300 
                            group-hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.35)] 
                            focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white focus-within:ring-black/20"
                        >
                          <Image
                            src={photo.url}
                            alt={
                              photo.caption || `Galeri görseli #${index + 1}`
                            }
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[0.5deg]"
                            sizes="(min-width: 768px) 50vw, 100vw"
                            priority={index === 0}
                          />

                          {/* top gradient sheen */}
                          <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* bottom fade for text/icon legibility */}
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/60 to-transparent" />

                          {/* Hover overlay icon */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 scale-95 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                              <LuCamera
                                className="w-7 h-7 text-gray-800"
                                aria-hidden
                              />
                            </div>
                          </div>

                          {/* badge - açıklama varsa göster */}
                          {photo.caption && (
                            <div className="absolute top-3 right-3">
                              <span
                                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-gray-800 
                                  bg-white/90 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              >
                                {photo.caption.slice(0, 20)}
                                {photo.caption.length > 20 && "..."}
                              </span>
                            </div>
                          )}

                          {/* invisible link for a11y + focus */}
                          <Link
                            href="/medya"
                            aria-label={`${
                              photo.caption || "Galeri"
                            } detaylarını gör`}
                            className="absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-10 flex flex-wrap gap-4 items-center justify-center"
            >
              <Link
                href="/medya"
                className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#ff7a00] to-[#ff477e] 
                   px-8 py-4 text-base font-medium text-white shadow-lg hover:shadow-xl 
                   transition-all duration-300 hover:from-[#ff8b22] hover:to-[#ff5c8a]"
              >
                <LuCamera className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                Tüm Medyayı Gör
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
            </motion.div>
          </div>
        </section>

        {/* ALT CTA – Ön Kayıt */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="relative overflow-hidden border-2 border-primary/20 shadow-2xl bg-white">
              {/* Decorative background blobs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-secondary/10 to-primary/10 rounded-full blur-3xl" />

              {/* Floating icons decoration */}
              <div className="absolute top-8 left-8 text-4xl opacity-20 animate-bounce">
                🌱
              </div>
              <div
                className="absolute bottom-8 right-8 text-4xl opacity-20 animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                🎨
              </div>
              <div
                className="absolute top-1/2 right-12 text-3xl opacity-20 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                ✨
              </div>

              <div className="relative z-10 flex flex-col items-center justify-between gap-8 p-8 md:flex-row md:p-12 lg:p-16">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Kayıtlar Devam Ediyor
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                    <span className="bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                      Gelin, birlikte çocuğunuzun dünyasını keşfedelim
                    </span>
                  </h3>

                  <p className="text-gray-600 text-lg mb-6 max-w-2xl">
                    Minik kalplerin doğayla büyüdüğü bu masalın parçası olun.
                    Her çocuk kendi ritminde, kendi renginde büyüsün.
                  </p>

                  {/* Trust indicators */}
                  <div className="flex flex-wrap gap-6 justify-center md:justify-start text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-bold">✓</span>
                      </div>
                      <span>Deneyimli Kadro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">✓</span>
                      </div>
                      <span>Doğal Ortam</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-bold">✓</span>
                      </div>
                      <span>Sınırlı Kontenjan</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 items-center md:items-end">
                  <Link
                    href="/iletisim#on-kayit"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white rounded-xl bg-linear-to-r from-primary to-accent shadow-lg hover:shadow-xl hover:from-primary/90 hover:to-accent/90 transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">Ön Kayıt Yap</span>
                    <svg
                      className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform"
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

                  <Link
                    href="/iletisim"
                    className="text-primary hover:text-accent font-medium underline underline-offset-4 transition-colors duration-200"
                  >
                    veya bizi arayın
                  </Link>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-400 to-rose-400 border-2 border-white shadow-md flex items-center justify-center text-white font-bold">
                        👶
                      </div>
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-cyan-400 border-2 border-white shadow-md flex items-center justify-center text-white font-bold">
                        👧
                      </div>
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-400 to-emerald-400 border-2 border-white shadow-md flex items-center justify-center text-white font-bold">
                        👦
                      </div>
                    </div>
                    <div className="text-xs text-gray-600">
                      <div className="font-bold">500+ Mutlu Aile</div>
                      <div>Bizimle büyüyor</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>
      </main>
    </>
  );
}
