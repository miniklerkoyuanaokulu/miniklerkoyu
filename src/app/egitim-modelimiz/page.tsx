// app/(site)/egitim-modelimiz/page.tsx
// Eğitim Modelimiz – framer-motion + react-icons ile zenginleştirilmiş dizayn

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";
import {
  LuPalette,
  LuDumbbell,
  LuMusic,
  LuFlower2,
  LuTheater,
  LuLanguages,
  LuClock3,
  LuUsers,
  LuCamera,
  LuEye,
  LuFileText,
} from "react-icons/lu";
import { PageHero } from "@/components/PageHero";

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
      <h2 id={id} className="text-2xl md:text-3xl font-bold text-primary">
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

export default function EgitimModelimizPage() {
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
        eyebrow="Eğitim Modelimiz"
        description="Oyun temelli ve doğa ile iç içe eğitim yaklaşımı. Zengin branş dersleri, düzen ve özgürlük dengesi, sürekli rehberlik."
      />

      <div className="w-full bg-linear-to-b from-indigo-600 via-[#4E56C0] to-blue-500 relative">
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
          {/* DERSLERİMİZ */}
          <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) }}
            >
              <p className="text-xs tracking-wider uppercase text-white/80">
                Branşlar
              </p>
              <h2
                id="derslerimiz"
                className="text-2xl md:text-3xl font-bold text-orange-500"
              >
                Derslerimiz
              </h2>
              <div className="mt-3 h-1 w-20 rounded-full bg-secondary" />
            </motion.div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <LuLanguages className="w-6 h-6" />,
                  title: "Yabancı Dil",
                  desc: "Her yaş grubumuza yönelik Temel İngilizce kaynaklardan yararlanarak uygulanan etkinliklerle ikinci dil desteği temelden oluşturulur.",
                  color: "from-indigo-500 to-blue-500",
                  bgLight: "from-indigo-50 to-blue-50",
                  iconColor: "text-indigo-600",
                  hoverBorder: "hover:border-indigo-300",
                  hoverShadow: "hover:shadow-indigo-100/50",
                },
                {
                  icon: <LuPalette className="w-6 h-6" />,
                  title: "Görsel Sanatlar",
                  desc: "Renk, doku ve formu deneyimleyen atölye çalışmalarıyla yaratıcılık ve ifade becerileri desteklenir.",
                  color: "from-pink-500 to-rose-500",
                  bgLight: "from-pink-50 to-rose-50",
                  iconColor: "text-pink-600",
                  hoverBorder: "hover:border-pink-300",
                  hoverShadow: "hover:shadow-pink-100/50",
                },
                {
                  icon: <LuDumbbell className="w-6 h-6" />,
                  title: "Jimnastik",
                  desc: "Esneklik, koordinasyon ve dengeyi güçlendiren eğlenceli hareket etkinlikleri.",
                  color: "from-blue-500 to-cyan-500",
                  bgLight: "from-blue-50 to-cyan-50",
                  iconColor: "text-blue-600",
                  hoverBorder: "hover:border-blue-300",
                  hoverShadow: "hover:shadow-blue-100/50",
                },
                {
                  icon: <LuMusic className="w-6 h-6" />,
                  title: "Dans",
                  desc: "Ritim duygusunu, beden farkındalığını ve grup uyumunu artıran dans etkinlikleri.",
                  color: "from-purple-500 to-violet-500",
                  bgLight: "from-purple-50 to-violet-50",
                  iconColor: "text-purple-600",
                  hoverBorder: "hover:border-purple-300",
                  hoverShadow: "hover:shadow-purple-100/50",
                },
                {
                  icon: <LuFlower2 className="w-6 h-6" />,
                  title: "Yoga",
                  desc: "Nefes, denge ve sakinleşme odaklı oyunlaştırılmış yoga akışları.",
                  color: "from-green-500 to-emerald-500",
                  bgLight: "from-green-50 to-emerald-50",
                  iconColor: "text-green-600",
                  hoverBorder: "hover:border-green-300",
                  hoverShadow: "hover:shadow-green-100/50",
                },
                {
                  icon: <LuTheater className="w-6 h-6" />,
                  title: "Drama",
                  desc: "Hikâye kurgulama, rol oynama ve empatiyi besleyen yaratıcı drama çalışmaları.",
                  color: "from-amber-500 to-orange-500",
                  bgLight: "from-amber-50 to-orange-50",
                  iconColor: "text-amber-600",
                  hoverBorder: "hover:border-amber-300",
                  hoverShadow: "hover:shadow-amber-100/50",
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: cubicBezier(0.16, 1, 0.3, 1),
                    delay: idx * 0.1,
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Card
                    className={`p-6 h-full relative overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl ${item.hoverShadow} border-2 ${item.hoverBorder}`}
                  >
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${item.bgLight} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${item.color} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                        >
                          {item.icon}
                        </span>
                        <h3
                          className={`text-lg font-semibold ${item.iconColor} transition-colors`}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">
                        {item.desc}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* GÜNÜMÜZ NASIL GEÇER */}
          <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div className="relative overflow-hidden rounded-3xl border-2 border-white/30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/15 rounded-full blur-3xl" />

              <div className="px-4 py-12 md:py-16">
                <SectionTitle
                  id="gunumuz-nasil-gecer"
                  title="Günümüz Nasıl Geçer"
                  eyebrow="Günlük Akış"
                />

                <div className="mt-8 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
                  {/* Metin */}
                  <motion.div
                    {...fadeUp}
                    className=" max-w-none text-white! prose-strong:!text-white prose-p:!text-white"
                  >
                    <p>
                      Her sabah, miniklerimizi sevgi dolu bir &quot;günaydın
                      halkası&quot; karşılar. Sabah 08.00 itibariyle herkes
                      sınıflarında derslerine başlar. Ardından sıcak taze
                      kahvaltılarını yapıp bahçede öğretmenleri eşliğinde
                      etkinlikler yapar, oyunlar oynarlar.
                    </p>
                    <br />
                    <p>
                      Öğle yemeğine, ortak yemekhanemizde günlük, taze ve ev
                      yapımı yemeklerini yemek üzere öğretmenleri eşliğinde
                      katılırlar. Öğle yemeği sonrası <strong>2-3 yaş</strong>{" "}
                      miniklerimizin kendi ritminde ve alıştıkları düzende
                      uyumaları sağlanır.
                      <strong>4-5 yaş</strong> çocuklarımız ise öğretmenleri
                      eşliğinde günün planına göre şekillendirilmiş branş
                      dersleri, etkinlikler ve oyun gibi aktivitelere
                      katılırlar.
                    </p>
                    <br />
                    <p>
                      Uyku saati ve derslerin ardından ikindi kahvaltısında
                      mutfak annemizin ellerinden çıkan taze ikindi
                      kahvaltılarını yaparlar. Günün her saati, çocukların hayal
                      gücünü destekleyecek bir etkinlik içerir.
                    </p>
                    <br />
                    <p>
                      Günlük planlarımız mevsimlerle, hava koşullarıyla ve
                      çocukların ilgileriyle birlikte şekillenir. Kimi gün
                      bahçede hikâye zamanı, kimi gün bahçede yoga, kimi gün de
                      sessizce resim yapma alanı olur.
                    </p>
                    <br />
                    <p>
                      Her etkinlik, bir beceri kazandırmak kadar, çocuklara
                      &quot;kendini iyi hissetme&quot; alanı da sunar.
                    </p>
                  </motion.div>

                  {/* Timeline kartı */}
                  <motion.div {...fadeIn}>
                    <Card className="p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <LuClock3 className="text-xl" />
                        <h3 className="text-lg font-semibold">
                          Örnek Gün Akışı
                        </h3>
                      </div>
                      <ol className="relative ms-3">
                        {[
                          { t: "08:00", d: "Günaydın halkası ve sınıf rutini" },
                          { t: "09:00", d: "Kahvaltı ve bahçe oyunları" },
                          {
                            t: "10:00",
                            d: "Branş etkinlikleri (Yoga / Sanat / Drama)",
                          },
                          { t: "12:00", d: "Öğle yemeği" },
                          {
                            t: "13:00",
                            d: "Uyku (2-3 yaş) / Branş-Deneyim (4-5 yaş)",
                          },
                          { t: "15:00", d: "İkindi kahvaltısı" },
                          { t: "15:30", d: "Serbest oyun / hikâye / gün sonu" },
                        ].map((row, i) => (
                          <li key={i} className="mb-4 ps-6">
                            <span className="absolute -start-3 mt-1 h-2 w-2 rounded-full bg-primary" />
                            <div className="text-xs text-muted-foreground">
                              {row.t}
                            </div>
                            <div className="font-medium">{row.d}</div>
                          </li>
                        ))}
                      </ol>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* ÖLÇME DEĞERLENDİRME */}
          <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <SectionTitle
              id="olcme-degerlendirme"
              title="Ölçme & Değerlendirme"
              eyebrow="Geri Bildirim"
            />

            <div className="mt-10 grid md:grid-cols-2 gap-8">
              {/* Akademik Sunum */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="p-8 h-full relative overflow-hidden group cursor-pointer border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-xl bg-white">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-100/50 rounded-full blur-3xl" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-[#4E56C0] flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        🎓
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#4E56C0]">
                          Akademik Sunum
                        </h3>
                        <div className="h-1 w-12 bg-[#4E56C0] rounded-full mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center justify-center mb-6">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-[#4E56C0] mb-2">
                          2
                        </div>
                        <div className="text-sm text-gray-600">kez / yıl</div>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-center">
                      Çocukların gelişimini ailelerle paylaştığımız özel
                      sunumlar
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Sanat Sergisi */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="p-8 h-full relative overflow-hidden group cursor-pointer border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-xl bg-white">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-pink-100/50 rounded-full blur-3xl" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        🎨
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-pink-600">
                          Sanat Sergisi
                        </h3>
                        <div className="h-1 w-12 bg-pink-500 rounded-full mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center justify-center mb-6">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-pink-600 mb-2">
                          2
                        </div>
                        <div className="text-sm text-gray-600">kez / yıl</div>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-center">
                      Çocukların yaratıcılığını sergileyen görsel sanatlar
                      etkinlikleri
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </section>

          {/* REHBERLİK */}
          <section className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/15 rounded-full blur-3xl" />

            <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
              <SectionTitle id="rehberlik" title="Rehberlik" eyebrow="PDR" />

              <div className="mt-10 grid md:grid-cols-2 gap-8">
                {/* Sol - Ana bilgi */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="p-8 h-full relative overflow-hidden border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-xl bg-white">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-teal-100/50 rounded-full blur-3xl" />

                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-3xl shadow-lg">
                          🧭
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-teal-600">
                            PDR Desteği
                          </h3>
                          <div className="h-1 w-16 bg-teal-500 rounded-full mt-1" />
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed text-lg">
                        Öğretmen-Veli iş birliği içerisinde miniğimize katkısı
                        olacak her türlü uzman görüşünü{" "}
                        <strong className="text-teal-600">
                          alanında uzman PDR öğretmenimiz
                        </strong>{" "}
                        aracılığıyla takip edip raporlamaktayız.
                      </p>

                      <div className="mt-8 grid grid-cols-3 gap-4">
                        {[
                          {
                            icon: <LuEye className="w-6 h-6" />,
                            label: "Gözlem",
                            color: "from-blue-500 to-cyan-500",
                          },
                          {
                            icon: <LuFileText className="w-6 h-6" />,
                            label: "Raporlama",
                            color: "from-teal-500 to-emerald-500",
                          },
                          {
                            icon: <LuUsers className="w-6 h-6" />,
                            label: "İş Birliği",
                            color: "from-cyan-500 to-blue-500",
                          },
                        ].map((item) => (
                          <motion.div
                            key={item.label}
                            whileHover={{ scale: 1.05, rotate: 3 }}
                            className={`p-4 rounded-xl bg-linear-to-br ${item.color} text-white text-center shadow-md`}
                          >
                            <div className="mb-2 flex justify-center text-2xl">
                              {item.icon}
                            </div>
                            <div className="text-xs font-medium">
                              {item.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Sağ - Süreç kartları */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="p-8 h-full border-2 border-white/30 hover:border-white/50 transition-all duration-300 bg-white shadow-lg">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-md">
                          <LuUsers className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#4E56C0] text-lg mb-2">
                            Veli Görüşmeleri
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Düzenli görüşmelerle ailelerin gözlem ve
                            endişelerini dinler, birlikte çözüm üretiriz
                          </p>
                        </div>
                      </div>

                      <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                          <LuEye className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-purple-600 text-lg mb-2">
                            Gözlem Formları
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Sistematik gözlemlerle çocukların gelişim alanları
                            detaylı takip edilir
                          </p>
                        </div>
                      </div>

                      <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-md">
                          <LuFileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-600 text-lg mb-2">
                            Periyodik Raporlar
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Gelişim yolculuğu kapsamlı raporlarla bütüncül
                            olarak sunulur
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SOSYAL ETKİNLİKLER */}
          <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <SectionTitle
              id="sosyal-etkinlikler"
              title="Sosyal Etkinliklerimiz"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8 p-8 rounded-2xl bg-white shadow-xl border-2 border-white/30"
            >
              <p className="text-xl text-gray-700 text-center leading-relaxed font-semibold">
                Tiyatro gezileri, alan gezileri, veli katılımlı sanatsal
                etkinlikler, her ay özgün partiler, resmi ve özel gün
                kutlamaları, drama etkinlikleri, meyve fidanı çiçek fidesi
                dikimi ve çocuklarımızın ilgi ve ihtiyaçlarına yönelik planlanan
                etkinlikler
              </p>
            </motion.div>

            {/* Etkinlik kartları */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: "Tiyatro",
                  icon: "🎭",
                  color: "from-purple-500 to-violet-500",
                },
                {
                  label: "Alan Gezisi",
                  icon: "🚌",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  label: "Veli Katılımı",
                  icon: "👨‍👩‍👧",
                  color: "from-pink-500 to-rose-500",
                },
                {
                  label: "Özgün Parti",
                  icon: "🎉",
                  color: "from-amber-500 to-orange-500",
                },
                {
                  label: "Özel Günler",
                  icon: "🎊",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  label: "Drama",
                  icon: "🎪",
                  color: "from-indigo-500 to-purple-500",
                },
                {
                  label: "Fidan Dikimi",
                  icon: "🌱",
                  color: "from-green-600 to-teal-500",
                },
                {
                  label: "Bahçe Zamanı",
                  icon: "🌻",
                  color: "from-yellow-500 to-amber-500",
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -8, rotate: 3 }}
                  className={`p-5 rounded-xl bg-linear-to-br ${item.color} text-white text-center shadow-lg cursor-pointer`}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <div className="text-sm font-semibold">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Görsel galeri - Gelecekte kullanılacak */}
            {/* <motion.div
            {...fadeIn}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group"
              >
                <div className="relative h-48 rounded-xl overflow-hidden border-2 border-gray-200 group-hover:border-orange-300 transition-all duration-300 shadow-md group-hover:shadow-xl">
                  <Image
                    src={`/images/egitim/etkinlik-${i}.jpg`}
                    alt={`Etkinlik ${i}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div> */}
          </section>

          {/* VELİ BİLGİLENDİRME */}
          <section className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/15 rounded-full blur-3xl" />

            <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
              <SectionTitle
                id="veli-bilgilendirme"
                title="Veli Bilgilendirme Süreçlerimiz"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-8 p-8 rounded-2xl bg-white border-2 border-green-200 shadow-lg"
              >
                <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
                  Günlük etkinlik fotoğraf ve videoları, miniğimiz ile ilgili
                  kişisel takip görüşleri, etkinlikler ve gezilerle ilgili her
                  türlü geri dönüşü velilerimize{" "}
                  <strong className="text-green-700">ivedilikle</strong>{" "}
                  iletiyoruz.
                </p>

                {/* İletişim kanalları */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="p-6 rounded-xl bg-linear-to-br from-cyan-500 to-blue-500 border-2 border-cyan-400 hover:border-cyan-300 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-cyan-600 text-3xl shadow-md mb-4">
                        <LuCamera />
                      </div>
                      <h4 className="font-bold text-[#4E56C0] mb-2">
                        Günlük Paylaşım
                      </h4>
                      <p className="text-sm text-white/95">
                        Fotoğraf ve video paylaşımları ile günlük aktiviteler
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="p-6 rounded-xl bg-linear-to-br from-green-500 to-emerald-500 border-2 border-green-400 hover:border-green-300 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-green-600 text-3xl shadow-md mb-4">
                        📞
                      </div>
                      <h4 className="font-bold text-[#4E56C0] mb-2">
                        Kişisel Görüşme
                      </h4>
                      <p className="text-sm text-white/95">
                        Birebir takip görüşmeleri ve özel geri bildirimler
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="p-6 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 border-2 border-purple-400 hover:border-purple-300 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-purple-600 text-3xl shadow-md mb-4">
                        📱
                      </div>
                      <h4 className="font-bold text-[#4E56C0] mb-2">
                        Anlık Bildirim
                      </h4>
                      <p className="text-sm text-white/95">
                        Etkinlik ve gezilerle ilgili hızlı bilgilendirme
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
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
                      Modelimizi yakından görün!
                    </h3>
                    <p className="text-white/90 text-lg">
                      Okulu ziyaret edin, sınıflarımızı ve bahçemizi keşfedin.
                    </p>
                  </div>

                  <Link
                    href="/iletisim"
                    className="group shrink-0 inline-flex items-center gap-2 rounded-xl px-8 py-4 bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300"
                  >
                    Ön Kayıt / Ziyaret
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
