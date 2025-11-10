// app/(site)/neden-minikler-koyu/page.tsx
// "Neden Minikler Köyü" – doğa, koşullar ve güvenlik odaklı sayfa (framer-motion + react-icons)

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";
import {
  LuApple,
  LuCookie,
  LuHeartHandshake,
  LuShieldCheck,
  LuLeaf,
  LuShield,
  LuFileText,
} from "react-icons/lu";
import { PageHero } from "@/components/PageHero";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) },
};

function SectionTitle({
  title,
  id,
  eyebrow,
}: {
  title: string;
  id: string;
  eyebrow?: string;
}) {
  return (
    <motion.div {...fadeUp}>
      {eyebrow && (
        <p className="text-xs tracking-wider uppercase text-white/80">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-2xl md:text-3xl font-bold text-white">
        {title}
      </h2>
      <div className="mt-3 h-1 w-20 rounded-full bg-white" />
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

export default function NedenPage() {
  const [showWatermark, setShowWatermark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowWatermark(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="Neden Minikler Köyü?"
        description="Organik beslenme, geniş oyun alanları ve titiz güvenlik prosedürleri ile miniklerin doğayla iç içe geliştiği bir ortam."
        backgroundImage="/images/pages/neden-miniker-koyu-page.avif"
      />

      <div className="w-full bg-linear-to-b from-red-600 via-[#CB0404] to-rose-500 relative">
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
          {/* BESLENME */}
          <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) }}
            >
              <p className="text-xs tracking-wider uppercase text-white/80">
                Organik & Taze
              </p>
              <h2
                id="beslenme"
                className="text-2xl md:text-3xl font-bold text-white"
              >
                Beslenme
              </h2>
              <div className="t-3 h-1 w-20 rounded-full bg-white" />
            </motion.div>
            <div className="mt-8 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="prose max-w-none"
                >
                  <div className="p-6 rounded-xl bg-white border-2 border-white/30 shadow-lg">
                    <p>
                      Çocuklarımızın beslenme ile ilgili özel durumları
                      velilerimizden bilgi alınarak menü oluştururken bize
                      destek olur. Okulumuzun mutfağında tecrübeli bir anne ve
                      aşçı olan <strong>Elif ablamızın</strong> tamamen organik
                      ürünlerle hazırladığı taze yemekler sabah kahvaltısı, öğle
                      yemeği ve ikindi kahvaltısı şeklinde miniklerimiz ve
                      öğretmenlerimize servis edilir.
                    </p>
                    <p>
                      Organik süt ile ev yapımı yoğurt, ev salçası, haftalık
                      taze sebze ve meyve ile çocuklarımıza güvenle beslenme
                      olanağı sunuyoruz. Dönemlik turşu kurma, zeytin kırma
                      etkinliklerimizle çocuklarımızı da beslenme süreçlerinde
                      eğlenerek öğrenmeye dâhil ediyoruz.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mt-6 grid sm:grid-cols-2 gap-3"
                >
                  {[
                    {
                      icon: <LuApple className="w-6 h-6" />,
                      k: "Organik Ürünler",
                      v: "Günlük taze menü",
                      color: "from-red-500 to-rose-500",
                    },
                    {
                      icon: <LuCookie className="w-6 h-6" />,
                      k: "El Yapımı",
                      v: "Yoğurt & salça",
                      color: "from-amber-500 to-orange-500",
                    },
                    {
                      icon: <LuLeaf className="w-6 h-6" />,
                      k: "Etkinlik",
                      v: "Turşu & zeytin",
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      icon: <LuHeartHandshake className="w-6 h-6" />,
                      k: "İş Birliği",
                      v: "Veli bilgilendirme",
                      color: "from-blue-500 to-cyan-500",
                    },
                  ].map((it, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className={`p-4 rounded-xl bg-linear-to-br ${it.color} text-white shadow-md cursor-pointer transition-all`}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <div className="text-2xl">{it.icon}</div>
                        <div className="font-bold">{it.k}</div>
                      </div>
                      <div className="text-sm opacity-90">{it.v}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Card className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 border-white/30 hover:border-white/50 bg-white">
                  <div className="relative h-72 w-full">
                    <Image
                      src="/images/neden/beslenme1.avif"
                      alt="Organik beslenme"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 text-sm text-gray-600">
                    Organik ve ev yapımı ürünlerle hazırlanan taze menüler
                  </div>
                </Card>
              </motion.div>
            </div>
          </section>

          {/* FİZİKSEL KOŞULLAR */}
          <section className="relative">
            <div className="absolute inset-0 -z-10 opacity-0" />
            <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
              <SectionTitle
                id="fiziksel-kosullar"
                title="Fiziksel Koşullar"
                eyebrow="Geniş Oyun Alanları"
              />

              <div className="mt-8 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="prose max-w-none"
                >
                  <div className="p-6 rounded-xl bg-white border-2 border-white/30 shadow-lg">
                    <p>
                      Okulumuzda çocuklarımızın gelişimi için;{" "}
                      <strong>110 m²</strong> Kum Havuzu,{" "}
                      <strong>180 m²</strong> Hobi Bahçesi,{" "}
                      <strong>130 m²</strong> Oyun-Park Alanı,{" "}
                      <strong>100 m²</strong> Açık Amfi Tiyatro,{" "}
                      <strong>200 m²</strong> Survivor Parkuru ve Zipline,
                      toplamda{" "}
                      <strong className="text-[#CB0404]">1100 m²</strong> Oyun
                      Alanı miniklerimizi beklemektedir.
                    </p>
                  </div>
                </motion.div>

                {/* Metrik kartları */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="space-y-3"
                >
                  {/* 5 Alan Kartı */}
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        k: "Kum Havuzu",
                        v: "110 m²",
                        icon: "🏖️",
                        color: "from-amber-500 to-yellow-500",
                      },
                      {
                        k: "Hobi Bahçesi",
                        v: "180 m²",
                        icon: "🌿",
                        color: "from-green-500 to-emerald-500",
                      },
                      {
                        k: "Oyun-Park",
                        v: "130 m²",
                        icon: "🎪",
                        color: "from-purple-500 to-pink-500",
                      },
                      {
                        k: "Amfi Tiyatro",
                        v: "100 m²",
                        icon: "🎭",
                        color: "from-red-500 to-rose-500",
                      },
                      {
                        k: "Survivor & Zipline",
                        v: "200 m²",
                        icon: "🧗",
                        color: "from-orange-500 to-amber-500",
                      },
                    ].map((it) => (
                      <motion.div
                        key={it.k}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className={`rounded-xl p-3 bg-linear-to-r ${it.color} text-white shadow-md cursor-pointer transition-all flex items-center justify-between`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{it.icon}</div>
                          <div className="text-sm font-medium">{it.k}</div>
                        </div>
                        <div className="text-xl font-bold">{it.v}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Toplam Kartı */}
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="rounded-xl p-5 bg-linear-to-br from-cyan-500 via-blue-500 to-indigo-500 text-white shadow-xl cursor-pointer transition-all border-2 border-white/50 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">🎯</div>
                        <div>
                          <div className="text-xs font-medium opacity-90 uppercase tracking-wide">
                            Toplam Oyun Alanı
                          </div>
                          <div className="text-3xl font-bold">1100 m²</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs opacity-90">5 Farklı</div>
                        <div className="text-lg font-bold">Alan</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Görsel grid */}
              {/*
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                {
                  key: "kum",
                  label: "Kum Havuzu",
                  color: "from-amber-500/90 to-yellow-500/90",
                },
                {
                  key: "hobi",
                  label: "Hobi Bahçesi",
                  color: "from-green-500/90 to-emerald-500/90",
                },
                {
                  key: "park",
                  label: "Oyun-Park",
                  color: "from-purple-500/90 to-pink-500/90",
                },
                {
                  key: "amfi",
                  label: "Amfi Tiyatro",
                  color: "from-red-500/90 to-rose-500/90",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="relative h-40 rounded-xl overflow-hidden border-2 border-white shadow-lg group cursor-pointer"
                >
                  <Image
                    src={`/images/neden/${item.key}.jpg`}
                    alt={item.label}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="text-white font-bold text-sm drop-shadow-lg">
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            */}
            </div>
          </section>

          {/* GÜVENLİK */}
          <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <SectionTitle
              id="guvenlik"
              title="Güvenlik"
              eyebrow="Önceliğimiz"
            />

            {/* Açıklama */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8"
            >
              <div className="p-6 rounded-xl bg-white border-2 border-white/30 shadow-lg">
                <p className="text-gray-700 leading-relaxed">
                  Çocuklarımızın güvenliği ve huzuru ilk hedefimiz olduğu için
                  sabah teslim eden veli ve teslim alacak kişilerin önceden
                  bilgilendirmesi veliden rica edilir. Velinin kayıt ettirdiği
                  kişiler dışında hiç kimseye miniğimizi teslim etmeyiz. Veli
                  bilgilendirmesi alınarak ve kimlik kontrolleri yapılarak
                  miniğimizi teslim edip evine yolcu ederiz.
                </p>
              </div>
            </motion.div>

            {/* 4 Güvenlik Özelliği */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                {
                  icon: <LuFileText className="w-6 h-6" />,
                  t: "Veli Bilgilendirme",
                  color: "from-purple-500 to-violet-500",
                },
                {
                  icon: <LuShield className="w-6 h-6" />,
                  t: "Kimlik Kontrol",
                  color: "from-indigo-500 to-blue-500",
                },
                {
                  icon: <LuShieldCheck className="w-6 h-6" />,
                  t: "Kayıtlı Kişiler",
                  color: "from-pink-500 to-rose-500",
                },
                {
                  icon: <LuHeartHandshake className="w-6 h-6" />,
                  t: "Güvenli Teslim",
                  color: "from-amber-500 to-orange-500",
                },
              ].map((it, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`flex flex-col items-center gap-3 p-5 rounded-xl bg-linear-to-br ${it.color} text-white shadow-md cursor-pointer transition-all text-center`}
                >
                  <div className="text-3xl">{it.icon}</div>
                  <div className="text-sm font-semibold">{it.t}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* 4 Prosedür Adımı */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 grid md:grid-cols-2 gap-4"
            >
              {[
                {
                  t: "Veli Bilgilendirmesi",
                  d: "Sabah teslim eden veli ve teslim alacak kişilerin önceden bilgilendirmesi alınır.",
                  icon: <LuFileText className="w-6 h-6" />,
                  color: "from-purple-500 to-violet-500",
                  num: "01",
                },
                {
                  t: "Kimlik Kontrolü",
                  d: "Teslim alacak kişinin kimlik kontrolü yapılır.",
                  icon: <LuShield className="w-6 h-6" />,
                  color: "from-indigo-500 to-blue-500",
                  num: "02",
                },
                {
                  t: "Liste Kontrolü",
                  d: "Sadece velinin kayıt ettirdiği kişilere teslim edilir.",
                  icon: <LuShieldCheck className="w-6 h-6" />,
                  color: "from-cyan-500 to-teal-500",
                  num: "03",
                },
                {
                  t: "Güvenli Teslim",
                  d: "Miniğimiz güvenle evine yolcu edilir.",
                  icon: <LuHeartHandshake className="w-6 h-6" />,
                  color: "from-pink-500 to-rose-500",
                  num: "04",
                },
              ].map((row, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="group relative"
                >
                  <div className="h-full flex items-start gap-4 p-5 rounded-xl bg-white border-2 border-white/30 hover:border-white/50 shadow-md hover:shadow-lg transition-all cursor-pointer">
                    {/* Numara */}
                    <div
                      className={`shrink-0 w-12 h-12 rounded-lg bg-linear-to-br ${row.color} text-white flex items-center justify-center font-bold`}
                    >
                      {row.num}
                    </div>

                    {/* İçerik */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`text-transparent bg-linear-to-r ${row.color} bg-clip-text`}
                        >
                          {row.icon}
                        </div>
                        <div className="font-bold text-gray-800">{row.t}</div>
                      </div>
                      <div className="text-sm text-gray-600">{row.d}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Alt CTA */}
          <section className="mx-auto max-w-6xl px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="relative overflow-hidden border-2 border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#CB0404] mb-2">
                      Bahçemizi ve alanlarımızı keşfedin!
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
                    Ön Kayıt / İletişim
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
