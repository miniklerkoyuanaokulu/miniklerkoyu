// app/(site)/kurumsal/page.tsx
// Kurumsal sayfası – doğa temalı, framer-motion animasyonlu, anchor'lı bölümler

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";

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
      <h2
        id={id}
        className="text-2xl md:text-3xl font-bold text-[color:var(--primary)]"
      >
        {title}
      </h2>
      <div className="mt-3 h-1 w-20 rounded-full bg-[color:var(--secondary)]" />
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
  return (
    <main className="mx-auto max-w-5xl px-4">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Dekoratif arka plan */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute -top-32 -left-32 h-80 w-80 rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(closest-side, var(--primary), transparent)",
            }}
          />
          <div
            className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(closest-side, var(--secondary), transparent)",
            }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div {...fadeUp}>
            <p className="text-sm tracking-wide uppercase text-muted-foreground">
              Kurumsal
            </p>
            <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
              <span className="text-[color:var(--primary)]">
                Varda Minikler Köyü
              </span>{" "}
              — Doğanın kalbinde sıcak bir okul
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-prose">
              Çocukların duygu, zihin ve beden gelişimini doğanın ritmiyle
              destekleyen, oyun temelli öğrenme yaklaşımı.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#hakkimizda"
                className="inline-flex items-center rounded-xl px-5 py-3 bg-primary text-primary-foreground hover:bg-primary-hover"
              >
                Hakkımızda
              </Link>
              <Link
                href="#misyonumuz"
                className="inline-flex items-center rounded-xl px-5 py-3 border border-border hover:bg-[color:var(--neutral-light)]"
              >
                Misyon & Vizyon
              </Link>
            </div>
          </motion.div>

          <motion.div
            {...fadeIn}
            className="relative h-64 md:h-80 rounded-2xl border border-border bg-gradient-to-br from-[color:var(--neutral-light)] via-[color:var(--background)] to-white"
          >
            {/* Basit illüstratif şekiller */}
            <svg
              className="absolute inset-0 h-full w-full opacity-60"
              viewBox="0 0 200 200"
              aria-hidden
            >
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--secondary)" />
                </linearGradient>
              </defs>
              <circle cx="52" cy="60" r="26" fill="url(#g)" />
              <rect
                x="120"
                y="36"
                width="48"
                height="34"
                rx="10"
                fill="var(--accent)"
              />
              <path
                d="M10 160 C 50 120, 90 200, 190 130"
                stroke="var(--primary)"
                strokeWidth="6"
                fill="none"
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* HAKKIMIZDA */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <SectionTitle id="hakkimizda" title="Hakkımızda" />
            <motion.div {...fadeUp} className="prose max-w-none mt-5">
              <p>
                <strong>Her çocuk bir dünyadır…</strong> Biz o dünyanın ışığını
                korumak için buradayız. Varda Minikler Köyü, doğanın içinde
                güvenli bir köy ortamında büyüyen çocuklar için kurulmuştur.
                Amacımız, çocukların duygusal, bilişsel ve sosyal gelişimlerini
                desteklerken, onların kendilerini ifade etmelerine alan
                açmaktır.
              </p>
              <p>
                Ekibimiz; okul öncesi eğitim uzmanları, çocuk gelişimciler,
                branş öğretmenlerinden oluşur. Biz, “her çocuk kendi yolunu
                bulur” inancıyla hareket ederiz. Bu yolculukta her minik,
                öğretmeninin değil, kendi keşfinin lideridir.
              </p>
            </motion.div>
          </div>
          <motion.div {...fadeIn} className="md:pl-6">
            <Card className="p-4">
              <div className="relative h-64 w-full overflow-hidden rounded-xl">
                <Image
                  src="/images/kurumsal/hakkimizda.jpg"
                  alt="Doğanın içinde anaokulu"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Doğanın içinde güvenli ve sıcak öğrenme alanları
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* TARIHÇEMİZ */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionTitle id="tarihcemiz" title="Tarihçemiz" />
        <div className="mt-6 grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <motion.div {...fadeUp} className="prose max-w-none">
            <p>
              Okulumuz 2019 yılında Mahmut Şahin önderliğinde, örneğine az
              rastlanır <strong>450 m²</strong> alanda geniş bahçesi,{" "}
              <strong>200 m²</strong> survivor alanı, <strong>110 m²</strong>{" "}
              kum havuzu, <strong>180 m²</strong> hobi bahçesi,{" "}
              <strong>100 m²</strong> atölye sınıfları ve doğayla iç içe doğal
              öğrenme formunda kurulmuştur.
            </p>
            <p>
              Yirmi yılı aşan eğitim tecrübemizle anne kucağından bize emanet
              edilen çocuklarımıza sevgi, şefkat, sıcaklık, güven ve keyifle
              öğrenme hedefiyle yolumuza devam ediyoruz. Hedefimiz asla durmadan
              gelişerek, büyüyerek, tanıştığımız her çocuğumuzun ışığını
              büyütmek.
            </p>
          </motion.div>
          <motion.div {...fadeIn}>
            <Card className="p-4">
              <ul className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { k: "Bahçe", v: "450 m²" },
                  { k: "Survivor", v: "200 m²" },
                  { k: "Kum Havuzu", v: "110 m²" },
                  { k: "Hobi Bahçesi", v: "180 m²" },
                  { k: "Atölye Alanı", v: "100 m²" },
                ].map((it) => (
                  <li
                    key={it.k}
                    className="rounded-lg border border-border p-3 bg-[color:var(--neutral-light)]/60"
                  >
                    <div className="text-xs text-muted-foreground">{it.k}</div>
                    <div className="font-semibold">{it.v}</div>
                  </li>
                ))}
              </ul>
            </Card>
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
                <strong>Mahmut Şahin</strong> 1981’ de Adana’nın Karaisalı
                ilçesinde doğmuştur. Çukurova Üniversitesi Fen Edebiyat
                Fakültesi Matematik bölümünden mezun olmuştur.
              </p>
              <p>
                2001 yılından itibaren matematik öğretmenliği ve eğitim koçluğu
                alanlarında uzmanlaşan Şahin, güçlü tecrübesini TMFK Özel
                Öğretim Kurumları’nı kurarak devam ettirmiştir.
              </p>
              <p>
                Eğitiminde disiplin ve ekip çalışması, dürüstlük ve özveri
                parolasıyla hareket eden; gelişime ve farklı fikirlere açık olan
                Şahin, öğrencilerinin ve çalışma arkadaşlarının takdirini
                kazanmış, lider ruhlu bir eğitimcidir.
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
                <div className="font-semibold">Mahmut Şahin</div>
                <div className="text-sm text-muted-foreground">
                  Kurucu / Eğitimci
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* MİSYON & VİZYON */}
      <section className="relative">
        {/* yumuşak arka plan bandı */}
        <div className="absolute inset-0 -z-10 bg-[color:var(--neutral-light)]/50" />
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <SectionTitle id="misyonumuz" title="Misyonumuz" />
            <motion.div {...fadeUp} className="prose max-w-none mt-5">
              <p>
                Kurumumuzun misyonu, okul öncesi eğitimin temel ilkelerine uygun
                olarak çocukların beden, zihin ve duygu gelişimini sağlayıp,
                onları ilkokula hazırlamak.
              </p>
              <ul>
                <li>Türkçeyi doğru ve güzel konuşmalarını sağlamak,</li>
                <li>
                  Bireysel farklılıklarını gözeterek yaratıcı ve estetik
                  duygularını geliştirmek.
                </li>
              </ul>
            </motion.div>
          </div>
          <div>
            <SectionTitle id="vizyonumuz" title="Vizyonumuz" />
            <motion.div {...fadeUp} className="prose max-w-none mt-5">
              <p>
                Okul öncesi eğitimin amaç ve ilkelerini modern metotlarla
                destekleyerek; yaşam boyu öğrenen, yaratıcı, estetik algısı
                yüksek, kendini ifade edebilen bireyler yetiştirmek.
              </p>
              <p>
                Ayrıca tecrübemizi okul öncesine taşıyan; gelişen dünyaya uyum
                sağlayan, geleceğe güvenle bakan, yeniliklere açık, öz kültürünü
                tanıyan ve koruyan, tercih edilen bir kurum olmak.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FELSEFEMİZ */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div {...fadeIn}>
            <Card className="p-4">
              <div className="relative h-64 w-full overflow-hidden rounded-xl">
                <Image
                  src="/images/kurumsal/felsefe.jpg"
                  alt="Oyun temelli öğrenme"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Oyun, öğrenmenin kalbidir; her gün yeni bir keşif.
              </p>
            </Card>
          </motion.div>
          <div>
            <SectionTitle id="felsefemiz" title="Felsefemiz" />
            <motion.div {...fadeUp} className="prose max-w-none mt-5">
              <p>
                Varda Minikler Köyü Anaokulu’nda öğrenme, doğanın ritmiyle akar.
                Çocuk temelli bireysel eğitim yaklaşımlarını temel alan
                sistemimizde çocuklar deneyimleyerek öğrenir. Her gün, yeni bir
                keşif anlamına gelir.
              </p>
              <p>
                Oyun, öğrenmenin kalbidir. Bizim için oyun, bir ders değil; bir
                yaşam biçimidir. Çocuklar oyun oynarken problem çözer,
                duygularını tanır, iş birliği kurar ve özgüven kazanır. Sanat,
                müzik, drama ve hikâye anlatımıyla da yaratıcılıklarını ifade
                ederler.
              </p>
              <p>
                Burada bilgi ezberlenmez; deneyimlenir, yaşanır, hissedilir.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EKİBİMİZ */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[color:var(--neutral-light)]/50" />
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <SectionTitle id="ekibimiz" title="Ekibimiz" />
          <motion.div {...fadeUp} className="prose max-w-none mt-5">
            <p>
              Tüm sınıf öğretmenlerimiz alanında deneyimli ve Okul Öncesi
              Öğretmenliği mezunudur. Yardımcı öğretmenlerimiz Çocuk Gelişimi
              mezunudur. Branş derslerimize alanında uzman Lisans mezunu
              öğretmenlerimiz girmektedir.
            </p>
            <p>
              Okulumuzda miniklerimizin mutluluğu ve eğitimde devamlılık esası
              için çocuklarımızın ilk kayıt oldukları dönemden mezun oldukları
              döneme kadar, eğitime başladıkları kendi öğretmenleriyle devam
              etmelerine özen gösterilir.
            </p>
          </motion.div>

          {/* İsteğe bağlı: ekip grid (dummy görseller) */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div key={i} {...fadeIn}>
                <Card className="overflow-hidden">
                  <div className="relative h-44 w-full">
                    <Image
                      src={`/images/kurumsal/ekip-${i}.jpg`}
                      alt={`Öğretmen ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="font-medium">Öğretmen Adı</div>
                    <div className="text-xs text-muted-foreground">
                      Okul Öncesi Öğretmeni
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alt CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <Card className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-[color:var(--primary)]">
              Minikler Köyü&apos;nde bir gün keşfet!
            </h3>
            <p className="text-muted-foreground">
              Okulu yerinde görmek ve sorularınız için bizimle iletişime geçin.
            </p>
          </div>
          <Link
            href="/iletisim"
            className="inline-flex items-center rounded-xl px-5 py-3 bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            Ön Kayıt / İletişim
          </Link>
        </Card>
      </section>
    </main>
  );
}
