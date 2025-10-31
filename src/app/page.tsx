// app/(site)/page.tsx
// Anasayfa – doğa temalı hero + öne çıkanlar + akış/timeline + branşlar + görsel şerit + CTA + iletişim bandı

"use client";

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
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div {...fadeUp}>
              <Card className="p-5 h-full">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--neutral-light)]">
                    <LuSprout />
                  </span>
                  <h3 className="text-lg font-semibold">Organik Beslenme</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Günlük taze menü, ev yapımı ürünler ve mutfak etkinlikleri ile
                  güvenli beslenme.
                </p>
                <Link
                  href="/neden-minikler-koyu#beslenme"
                  className="mt-3 inline-flex items-center text-sm text-[color:var(--primary)] underline underline-offset-4"
                >
                  Daha fazla
                </Link>
              </Card>
            </motion.div>

            <motion.div {...fadeUp}>
              <Card className="p-5 h-full">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--neutral-light)]">
                    <LuLeaf />
                  </span>
                  <h3 className="text-lg font-semibold">Geniş Oyun Alanları</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Kum havuzu, hobi bahçesi, amfi tiyatro ve zipline ile 1100 m²
                  oyun alanı.
                </p>
                <Link
                  href="/neden-minikler-koyu#fiziksel-kosullar"
                  className="mt-3 inline-flex items-center text-sm text-[color:var(--primary)] underline underline-offset-4"
                >
                  Daha fazla
                </Link>
              </Card>
            </motion.div>

            <motion.div {...fadeUp}>
              <Card className="p-5 h-full">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--neutral-light)]">
                    <LuShieldCheck />
                  </span>
                  <h3 className="text-lg font-semibold">Titiz Güvenlik</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Kimlik kontrol, yetkili teslim ve şeffaf bilgilendirme
                  prosedürleri.
                </p>
                <Link
                  href="/neden-minikler-koyu#guvenlik"
                  className="mt-3 inline-flex items-center text-sm text-[color:var(--primary)] underline underline-offset-4"
                >
                  Daha fazla
                </Link>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* GÜNÜMÜZ NASIL GEÇER – kısa özet */}
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-[color:var(--neutral-light)]/50" />
          <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
            <div>
              <SectionTitle
                eyebrow="Günlük Akış"
                title="Günümüz Nasıl Geçer?"
              />
              <motion.div {...fadeUp} className="prose max-w-none mt-4">
                <p>
                  08:00&apos;de günaydın halkasıyla başlar; kahvaltı, bahçe
                  oyunları ve branş dersleriyle devam eder. Öğle sonrası yaş
                  grubuna uygun dinlenme/etkinlikler ve ikindi kahvaltısı ile
                  gün tamamlanır.
                </p>
              </motion.div>

              <div className="mt-6">
                <Link
                  href="/egitim-modelimiz#gunumuz-nasil-gecer"
                  className="inline-flex items-center rounded-xl border border-border px-4 py-2 text-sm hover:bg-[color:var(--neutral-light)]"
                >
                  Detaylı akış
                </Link>
              </div>
            </div>

            <motion.div {...fadeIn}>
              <Card className="p-4">
                <div className="relative h-64 w-full overflow-hidden rounded-xl">
                  <Image
                    src="/images/home/gun-akisi.jpg"
                    alt="Günlük akış"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Her gün keşif, oyun ve paylaşım dolu.
                </p>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* BRANŞLAR – mini grid */}
        <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <SectionTitle eyebrow="Derslerimiz" title="Oyun Temelli Branşlar" />
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-6">
            {[
              { icon: <LuPalette />, t: "Görsel Sanatlar" },
              { icon: <LuDumbbell />, t: "Jimnastik" },
              { icon: <LuMusic />, t: "Dans" },
              { icon: <LuFlower2 />, t: "Yoga" },
              { icon: <LuTheater />, t: "Drama" },
              { icon: <LuHeartHandshake />, t: "Yabancı Dil" },
            ].map((it, i) => (
              <motion.div key={i} {...fadeUp}>
                <Card className="p-4 text-center">
                  <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--neutral-light)]">
                    {it.icon}
                  </div>
                  <div className="text-sm font-medium">{it.t}</div>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/egitim-modelimiz#derslerimiz"
              className="inline-flex items-center rounded-xl border border-border px-4 py-2 text-sm hover:bg-[color:var(--neutral-light)]"
            >
              Tüm dersler
            </Link>
          </div>
        </section>

        {/* GÖRSEL ŞERİT / MEDYA TEASER */}
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-[color:var(--neutral-light)]/50" />
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <SectionTitle eyebrow="Medya" title="Anılardan Kesitler" />
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative h-36 overflow-hidden rounded-xl border border-border"
                >
                  <Image
                    src={`/images/home/galeri-${i}.jpg`}
                    alt={`Galeri ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/medya"
                className="inline-flex items-center rounded-xl px-4 py-2 bg-primary text-primary-foreground hover:bg-primary-hover"
              >
                <LuCamera className="mr-2" /> Tüm medyayı gör
              </Link>
            </div>
          </div>
        </section>

        {/* ALT CTA – Ön Kayıt */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <Card className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row md:p-8">
            <div>
              <h3 className="text-xl font-semibold md:text-2xl text-[color:var(--primary)]">
                Gelin, birlikte çocuğunuzun dünyasını keşfedelim.
              </h3>
              <p className="text-muted-foreground">
                Minik kalplerin doğayla büyüdüğü bu masalın parçası olun.
              </p>
            </div>
            <Link
              href="/iletisim#on-kayit"
              className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-primary-foreground hover:bg-primary-hover"
            >
              Ön Kayıt
            </Link>
          </Card>
        </section>
      </main>
    </>
  );
}
