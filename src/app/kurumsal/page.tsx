// app/(site)/kurumsal/page.tsx
// Kurumsal sayfası – doğa temalı, framer-motion animasyonlu, anchor'lı bölümler

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, cubicBezier } from "framer-motion";
import { PageHero } from "@/components/PageHero";

// Yardımcı animasyon preset'leri
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

// Bölüm başlığı bileşeni
function SectionTitle({ title, id }: { title: string; id: string }) {
  return (
    <motion.div {...fadeUp}>
      <h2 id={id} className="text-2xl md:text-3xl font-bold text-primary">
        {title}
      </h2>
      <div className="mt-3 h-1 w-20 rounded-full bg-secondary" />
    </motion.div>
  );
}

// Kart benzeri kapsayıcı
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

export default function KurumsalPage() {
  // Scroll pozisyonu takibi - PageHero kaybolduğunda filigranı göster
  const [showWatermark, setShowWatermark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // PageHero yaklaşık 400-500px, 300px'den sonra filigranı göster
      setShowWatermark(window.scrollY > 300);
    };

    handleScroll(); // İlk render'da kontrol et
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="Kurumsal"
        description="Çocukların duygu, zihin ve beden gelişimini doğanın ritmiyle destekleyen, oyun temelli öğrenme yaklaşımı."
      />

      <div className="w-full bg-linear-to-b from-cyan-100/70 via-blue-100/50 to-white relative">
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
            className="object-contain"
            priority={false}
          />
        </div>

        <main className="mx-auto max-w-5xl px-4 relative z-10">
          {/* HAKKIMIZDA */}
          <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Sol - Metin */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: cubicBezier(0.16, 1, 0.3, 1),
                }}
              >
                <SectionTitle id="hakkimizda" title="Hakkımızda" />

                <div className="mt-6 space-y-5">
                  {/* İlk paragraf - vurgulu */}
                  <div className="relative pl-6 border-l-4 border-orange-500">
                    <p className="text-lg leading-relaxed text-gray-700">
                      <span className="text-xl font-bold text-orange-600">
                        Her çocuk bir dünyadır…
                      </span>
                      <br />
                      Biz o dünyanın ışığını korumak için buradayız. Vardalı
                      Minikler Köyü, doğanın içinde güvenli bir köy ortamında
                      büyüyen çocuklar için kurulmuştur.
                    </p>
                  </div>

                  {/* Özellik kartları */}
                  <div className="grid gap-4 mt-8">
                    <motion.div
                      whileHover={{ x: 8 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-linear-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="shrink-0 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl">
                        💚
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Duygusal Gelişim
                        </h4>
                        <p className="text-sm text-gray-600">
                          Her çocuğun duygusal ihtiyaçlarına özel yaklaşım
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 8 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-linear-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
                        🧠
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Bilişsel Gelişim
                        </h4>
                        <p className="text-sm text-gray-600">
                          Keşfederek öğrenme ve merak odaklı eğitim
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 8 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-linear-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="shrink-0 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl">
                        🤝
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Sosyal Gelişim
                        </h4>
                        <p className="text-sm text-gray-600">
                          Paylaşma, işbirliği ve empati becerileri
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Alıntı */}
                  <motion.div
                    {...fadeUp}
                    className="mt-8 p-6 rounded-2xl bg-linear-to-br from-orange-50 to-amber-50 border border-orange-200"
                  >
                    <p className="text-base italic text-gray-700 leading-relaxed">
                      <span className="text-4xl text-orange-500 leading-none">
                        &quot;
                      </span>
                      Her çocuk kendi yolunu bulur. Bu yolculukta her minik,
                      öğretmeninin değil, kendi keşfinin lideridir.
                      <span className="text-4xl text-orange-500 leading-none">
                        &quot;
                      </span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Sağ - Görsel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -8 }}
                className="md:pl-6 space-y-6"
              >
                <Card className="p-4 group cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 hover:border-orange-200 overflow-hidden relative">
                  <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="relative h-80 w-full overflow-hidden rounded-xl">
                      <Image
                        src="/images/kurumsal/hakkimizda.png"
                        alt="Doğanın içinde anaokulu"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <p className="mt-4 text-sm font-medium text-gray-700 flex items-center gap-2">
                      <span className="text-2xl">🌳</span>
                      Doğanın içinde güvenli ve sıcak öğrenme alanları
                    </p>
                  </div>
                </Card>

                {/* İstatistik kartları */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-xl bg-linear-to-br from-green-500 to-emerald-500 text-white text-center shadow-lg"
                  >
                    <div className="text-3xl font-bold">20+</div>
                    <div className="text-sm mt-1">Yıllık Deneyim</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-xl bg-linear-to-br from-orange-500 to-amber-500 text-white text-center shadow-lg"
                  >
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm mt-1">Mutlu Öğrenci</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* TARIHÇEMİZ */}
          <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <SectionTitle id="tarihcemiz" title="Tarihçemiz" />

            <div className="mt-10 grid md:grid-cols-2 gap-10">
              {/* Sol - Timeline ve Açıklama */}
              <motion.div {...fadeUp} className="space-y-8">
                {/* Kuruluş kartı */}
                <div className="relative pl-8 border-l-4 border-orange-500">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">★</span>
                  </div>
                  <div className="bg-linear-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-3xl font-bold text-orange-600">
                        2019
                      </span>
                      <span className="text-sm text-gray-600">Kuruluş</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-orange-700">Mahmut Şahin</strong>{" "}
                      önderliğinde, doğayla iç içe doğal öğrenme formunda
                      kuruldu. Örneğine az rastlanır geniş alanlarıyla
                      çocukların keşfetmesine alan açan bir ortam.
                    </p>
                  </div>
                </div>

                {/* Deneyim kartı */}
                <div className="relative pl-8 border-l-4 border-green-500">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div className="bg-linear-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-3xl font-bold text-green-600">
                        20+
                      </span>
                      <span className="text-sm text-gray-600">Yıl Deneyim</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Anne kucağından bize emanet edilen çocuklarımıza sevgi,
                      şefkat, sıcaklık, güven ve keyifle öğrenme hedefiyle
                      yolumuza devam ediyoruz.
                    </p>
                  </div>
                </div>

                {/* Misyon kartı */}
                <div className="relative pl-8 border-l-4 border-blue-500">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">❤</span>
                  </div>
                  <div className="bg-linear-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                    <div className="mb-3">
                      <span className="text-lg font-bold text-blue-700">
                        Hedefimiz
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Asla durmadan gelişerek, büyüyerek, tanıştığımız her
                      çocuğumuzun ışığını büyütmek ve onları geleceğe
                      hazırlamak.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Sağ - Alan Kartları */}
              <motion.div {...fadeIn} className="space-y-6">
                <div className="bg-linear-to-br from-orange-500 to-amber-500 p-6 rounded-2xl text-white shadow-xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-2xl">🏗️</span>
                    Fiziksel Alanlarımız
                  </h3>
                  <p className="text-sm text-white/90 mb-4">
                    Toplam <strong>1100+ m²</strong> doğayla iç içe öğrenme
                    alanı
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      k: "Bahçe Alanı",
                      v: "450 m²",
                      icon: "🌳",
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      k: "Survivor",
                      v: "200 m²",
                      icon: "🏃",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      k: "Kum Havuzu",
                      v: "110 m²",
                      icon: "🏖️",
                      color: "from-amber-500 to-yellow-500",
                    },
                    {
                      k: "Hobi Bahçesi",
                      v: "180 m²",
                      icon: "🌻",
                      color: "from-pink-500 to-rose-500",
                    },
                    {
                      k: "Atölye Alanı",
                      v: "100 m²",
                      icon: "🎨",
                      color: "from-purple-500 to-violet-500",
                    },
                    {
                      k: "Amfi Tiyatro",
                      v: "100 m²",
                      icon: "🎭",
                      color: "from-indigo-500 to-blue-500",
                    },
                  ].map((it, idx) => (
                    <motion.div
                      key={it.k}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className={`p-4 rounded-xl bg-linear-to-br ${it.color} text-white shadow-lg cursor-pointer`}
                    >
                      <div className="text-3xl mb-2">{it.icon}</div>
                      <div className="text-xs opacity-90 mb-1">{it.k}</div>
                      <div className="text-2xl font-bold">{it.v}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Toplam alan göstergesi */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl bg-linear-to-r from-slate-700 to-slate-800 text-white shadow-xl text-center"
                >
                  <div className="text-sm opacity-90 mb-2">Toplam Alan</div>
                  <div className="text-5xl font-bold mb-2">1100+</div>
                  <div className="text-xl">metrekare</div>
                  <div className="mt-3 text-xs opacity-75">
                    Türkiye&apos;nin en geniş anaokulu bahçelerinden
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* KURUCUMUZ */}
          <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2">
                <SectionTitle id="kurucumuz" title="Kurucumuz" />
                <motion.div {...fadeUp} className="prose max-w-none mt-5">
                  <p>
                    <strong>Mahmut ŞAHİN</strong> 1981&apos; de Adana&apos;nın
                    Karaisalı ilçesinde doğmuştur. Çukurova Üniversitesi Fen
                    Edebiyat Fakültesi Matematik bölümünden mezun olmuştur.
                  </p>
                  <p>
                    2001 yılından itibaren matematik öğretmenliği ve eğitim
                    koçluğu alanlarında uzmanlaşan ŞAHİN, güçlü tecrübesini TMFK
                    Özel Öğretim Kurumları&apos;nı kurarak devam ettirmiştir.
                  </p>
                  <p>
                    Eğitiminde disiplin ve ekip çalışması, dürüstlük ve özveri
                    parolasıyla hareket eden; gelişime ve farklı fikirlere açık
                    olan ŞAHİN, öğrencilerinin ve çalışma arkadaşlarının
                    takdirini kazanmış, lider ruhlu bir eğitimcidir.
                  </p>
                </motion.div>
              </div>
              <motion.div {...fadeIn}>
                <Card className="overflow-hidden">
                  <div className="relative h-80 w-full">
                    <Image
                      src="/images/kurumsal/kurucu.jpg"
                      alt="Kurucumuz Mahmut Şahin"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="font-semibold">Mahmut ŞAHİN</div>
                    <div className="text-sm text-muted-foreground">
                      Kurucu / Eğitimci
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </section>

          {/* MİSYON & VİZYON */}
          <section className="relative overflow-hidden">
            {/* linear arka plan */}
            <div className="absolute inset-0 -z-20 bg-linear-to-br from-blue-50/80 via-purple-50/60 to-pink-50/80" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

            <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid md:grid-cols-2 gap-8">
              {/* MİSYON */}
              <motion.div {...fadeUp} whileHover={{ y: -8 }} className="group">
                <Card className="p-8 h-full relative overflow-hidden border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl">
                  {/* Decorative blob */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl" />

                  <div className="relative z-10">
                    {/* Başlık ve ikon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        🎯
                      </div>
                      <div>
                        <h3
                          id="misyonumuz"
                          className="text-2xl font-bold text-blue-700"
                        >
                          Misyonumuz
                        </h3>
                        <div className="h-1 w-12 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full mt-1" />
                      </div>
                    </div>

                    {/* Ana metin */}
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Okul öncesi eğitimin temel ilkelerine uygun olarak
                      çocukların
                      <strong className="text-blue-700">
                        {" "}
                        beden, zihin ve duygu gelişimini{" "}
                      </strong>
                      sağlayıp, onları ilkokula hazırlamak.
                    </p>

                    {/* Hedefler */}
                    <div className="space-y-3">
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                      >
                        <span className="text-blue-500 text-xl shrink-0">
                          ✓
                        </span>
                        <span className="text-sm text-gray-700">
                          Türkçeyi doğru ve güzel konuşmalarını sağlamak
                        </span>
                      </motion.div>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                      >
                        <span className="text-blue-500 text-xl shrink-0">
                          ✓
                        </span>
                        <span className="text-sm text-gray-700">
                          Bireysel farklılıklarını gözeterek yaratıcı ve estetik
                          duygularını geliştirmek
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* VİZYON */}
              <motion.div {...fadeUp} whileHover={{ y: -8 }} className="group">
                <Card className="p-8 h-full relative overflow-hidden border-2 border-cyan-200 hover:border-cyan-300 transition-all duration-300 hover:shadow-2xl">
                  {/* Decorative blob */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl" />

                  <div className="relative z-10">
                    {/* Başlık ve ikon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        🚀
                      </div>
                      <div>
                        <h3
                          id="vizyonumuz"
                          className="text-2xl font-bold text-cyan-700"
                        >
                          Vizyonumuz
                        </h3>
                        <div className="h-1 w-12 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full mt-1" />
                      </div>
                    </div>

                    {/* Ana metin */}
                    <div className="space-y-6">
                      <p className="text-gray-700 leading-relaxed">
                        Okul öncesi eğitimin temel amaç ve ilkelerini
                        <strong className="text-cyan-700">
                          {" "}
                          modern eğitim metotlarıyla{" "}
                        </strong>
                        destekleyerek yaşam boyu öğrenen, yaratıcı, estetik
                        algısı yüksek, kendini ifade edebilen bireyler
                        yetiştirmektir.
                      </p>

                      <div className="p-5 rounded-xl bg-linear-to-r from-cyan-50 to-blue-50 border-l-4 border-cyan-500">
                        <p className="text-gray-700 leading-relaxed text-sm">
                          Ayrıca yirmi yılı aşan eğitim tecrübemizi okul öncesi
                          eğitime taşıyan, gelişen-değişen dünyaya ayak uyduran,
                          geleceğe güvenle bakan, yeniliklere açık olan, öz
                          kültürünü tanıyan, koruyan ve tercih edilen bir kurum
                          olmaktır.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </section>

          {/* FELSEFEMİZ */}
          <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <SectionTitle id="felsefemiz" title="Felsefemiz" />

            <div className="mt-10 grid md:grid-cols-[1fr_450px] gap-10 items-start">
              {/* Sol - İçerik */}
              <motion.div {...fadeUp} className="space-y-6">
                {/* Ana motto */}
                <div className="p-8 rounded-2xl bg-linear-to-br from-green-500 to-emerald-500 text-white shadow-xl">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-5xl">🌱</span>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        Doğanın Ritmiyle Öğrenme
                      </h3>
                      <p className="text-white/90 leading-relaxed">
                        Çocuk temelli bireysel eğitim yaklaşımlarını temel alan
                        sistemimizde çocuklar deneyimleyerek öğrenir. Her gün,
                        yeni bir keşif anlamına gelir.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Oyun temelli öğrenme */}
                <div className="relative p-8 rounded-2xl bg-white border-2 border-orange-200 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-full bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-2xl shadow-lg">
                        🏏
                      </div>
                      <h4 className="text-xl font-bold text-orange-700">
                        Oyun, Öğrenmenin Kalbidir
                      </h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Bizim için oyun, bir ders değil; bir yaşam biçimidir.
                    </p>

                    {/* Oyun faydaları */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: "🧩", text: "Problem çözme" },
                        { icon: "💭", text: "Duygu tanıma" },
                        { icon: "🤝", text: "İş birliği" },
                        { icon: "💪", text: "Özgüven" },
                      ].map((item, idx) => (
                        <motion.div
                          key={item.text}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-2 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <span className="text-sm font-medium text-gray-700">
                            {item.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sağ - Görsel */}
              <motion.div {...fadeIn} className="flex flex-col gap-6">
                {/* Görsel - mobilde altta */}
                <Card className="p-4 group cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 hover:border-green-300 overflow-hidden relative order-2 md:order-1">
                  <div className="absolute inset-0 bg-linear-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="relative h-80 w-full overflow-hidden rounded-xl">
                      <Image
                        src="/images/kurumsal/felsefe.jpg"
                        alt="Oyun temelli öğrenme"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <p className="mt-4 text-sm font-medium text-gray-700 group-hover:text-green-700 transition-colors flex items-center gap-2">
                      <span className="text-2xl">🏏</span>
                      Oyun, öğrenmenin kalbidir; her gün yeni bir keşif.
                    </p>
                  </div>
                </Card>

                {/* Yaratıcılık araçları - mobilde üstte */}
                <div className="grid grid-cols-4 gap-3 order-1 md:order-2">
                  {[
                    {
                      icon: "🎨",
                      label: "Sanat",
                      color: "from-pink-500 to-rose-500",
                    },
                    {
                      icon: "🎵",
                      label: "Müzik",
                      color: "from-purple-500 to-violet-500",
                    },
                    {
                      icon: "🎭",
                      label: "Drama",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      icon: "📖",
                      label: "Hikâye",
                      color: "from-green-500 to-emerald-500",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -8, rotate: 5 }}
                      className={`p-4 rounded-xl bg-linear-to-br ${item.color} text-white text-center shadow-lg cursor-pointer`}
                    >
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <div className="text-xs font-medium">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Final quote - tam genişlikte */}
            <motion.div {...fadeUp} className="mt-4 mx-auto max-w-4xl">
              <div className="p-4 md:p-4 rounded-2xl bg-linear-to-r from-slate-700 to-slate-800 text-white shadow-xl text-center">
                <p className="text-xl md:text-2xl font-medium leading-relaxed">
                  <span className="text-4xl opacity-50">&quot;</span>
                  Bilgi ezberlenmez;
                  <br />
                  <strong className="text-cyan-300">
                    deneyimlenir, yaşanır, hissedilir
                  </strong>
                  <span className="text-4xl opacity-50">&quot;</span>
                </p>
              </div>
            </motion.div>
          </section>

          {/* EKİBİMİZ */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 -z-20 bg-linear-to-br from-amber-50/80 via-orange-50/60 to-rose-50/80" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />

            <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
              <SectionTitle id="ekibimiz" title="Ekibimiz" />

              {/* Özellikler */}
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-6 rounded-xl bg-white border-2 border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-xl cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-2xl">
                      👩‍🏫
                    </div>
                    <h4 className="font-bold text-gray-800">
                      Sınıf Öğretmenleri
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Alanında deneyimli ve{" "}
                    <strong className="text-green-700">
                      Okul Öncesi Öğretmenliği
                    </strong>{" "}
                    mezunu kadromuz
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1,
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-6 rounded-xl bg-white border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl">
                      👶
                    </div>
                    <h4 className="font-bold text-gray-800">
                      Yardımcı Öğretmenler
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <strong className="text-blue-700">Çocuk Gelişimi</strong>{" "}
                    mezunu uzman ekibimiz
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2,
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-6 rounded-xl bg-white border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl">
                      🎨
                    </div>
                    <h4 className="font-bold text-gray-800">
                      Branş Öğretmenleri
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Alanında uzman{" "}
                    <strong className="text-purple-700">Lisans mezunu</strong>{" "}
                    branş kadrosu
                  </p>
                </motion.div>
              </div>

              {/* Devamlılık özelliği */}
              <motion.div
                {...fadeUp}
                className="mt-8 p-8 rounded-2xl bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-4xl">
                    ❤️
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">
                      Eğitimde Devamlılık
                    </h4>
                    <p className="text-white text-xl leading-relaxed">
                      Okulumuzda miniklerimizin mutluluğu ve eğitimde devamlılık
                      esası için çocuklarımızın ilk kayıt oldukları dönemden
                      mezun oldukları döneme kadar, eğitime başladıkları kendi
                      öğretmenleriyle devam etmelerine özen gösterilir.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Ekip Fotoğrafları - Gelecekte kullanılacak */}
              {/* <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <motion.div 
                  key={i} 
                  {...fadeIn}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="group"
                >
                  <Card className="overflow-hidden border-2 hover:border-orange-300 transition-all duration-300 shadow-md hover:shadow-xl">
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={`/images/kurumsal/ekip-${i}.jpg`}
                        alt={`Ekip üyesi ${i}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <div className="font-semibold text-gray-800">Öğretmen Adı</div>
                      <div className="text-xs text-gray-600 mt-1">Okul Öncesi Öğretmeni</div>
                      <div className="mt-2 flex gap-2">
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                          10+ Yıl
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div> */}
            </div>
          </section>

          {/* Alt CTA */}
          <section className="mx-auto max-w-6xl px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="relative overflow-hidden border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">
                      Minikler Köyü&apos;nde bir gün keşfet!
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Okulu yerinde görmek ve sorularınız için bizimle iletişime
                      geçin.
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
