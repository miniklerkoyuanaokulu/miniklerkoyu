// app/(site)/egitim-modelimiz/page.tsx
// Eğitim Modelimiz – framer-motion + react-icons ile zenginleştirilmiş dizayn

"use client";

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
  LuGraduationCap,
  LuUsers,
  LuCamera,
} from "react-icons/lu";

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

export default function EgitimModelimizPage() {
  return (
    <main className="mx-auto max-w-5xl px-4">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute -top-28 -left-28 h-72 w-72 rounded-full blur-3xl opacity-30"
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
              Eğitim Modelimiz
            </p>
            <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
              <span className="text-[color:var(--primary)]">Oyun Temelli</span>{" "}
              ve Doğa ile İç İçe
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-prose">
              Her yaş grubuna uygun zengin branş dersleri, günlük akışta düzen
              ve özgürlük dengesi, sürekli geri bildirim ve rehberlik.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#derslerimiz"
                className="inline-flex items-center rounded-xl px-5 py-3 bg-primary text-primary-foreground hover:bg-primary-hover"
              >
                Derslerimiz
              </Link>
              <Link
                href="#gunumuz-nasil-gecer"
                className="inline-flex items-center rounded-xl px-5 py-3 border border-border hover:bg-[color:var(--neutral-light)]"
              >
                Günlük Akış
              </Link>
            </div>
          </motion.div>
          <motion.div
            {...fadeIn}
            className="relative h-64 md:h-80 rounded-2xl border border-border bg-gradient-to-br from-[color:var(--neutral-light)] via-[color:var(--background)] to-white"
          >
            <svg
              className="absolute inset-0 h-full w-full opacity-60"
              viewBox="0 0 200 200"
              aria-hidden
            >
              <defs>
                <linearGradient id="g2" x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--secondary)" />
                </linearGradient>
              </defs>
              <circle cx="46" cy="60" r="24" fill="url(#g2)" />
              <rect
                x="122"
                y="40"
                width="46"
                height="32"
                rx="10"
                fill="var(--accent)"
              />
              <path
                d="M10 160 C 60 110, 100 200, 190 130"
                stroke="var(--primary)"
                strokeWidth="6"
                fill="none"
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* DERSLERİMİZ */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionTitle id="derslerimiz" title="Derslerimiz" eyebrow="Branşlar" />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Yabancı Dil */}
          <motion.div {...fadeUp}>
            <Card className="p-5 h-full">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--neutral-light)]">
                  <LuLanguages />
                </div>
                <h3 className="text-lg font-semibold">Yabancı Dil</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Her yaş grubumuza yönelik Temel İngilizce kaynaklardan
                yararlanarak uygulanan etkinliklerle ikinci dil desteği temelden
                oluşturulur.
              </p>
            </Card>
          </motion.div>

          {/* Görsel Sanatlar */}
          <motion.div {...fadeUp}>
            <Card className="p-5 h-full">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--neutral-light)]">
                  <LuPalette />
                </div>
                <h3 className="text-lg font-semibold">Görsel Sanatlar</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Renk, doku ve formu deneyimleyen atölye çalışmalarıyla
                yaratıcılık ve ifade becerileri desteklenir.
              </p>
            </Card>
          </motion.div>

          {/* Jimnastik */}
          <motion.div {...fadeUp}>
            <Card className="p-5 h-full">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--neutral-light)]">
                  <LuDumbbell />
                </div>
                <h3 className="text-lg font-semibold">Jimnastik</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Esneklik, koordinasyon ve dengeyi güçlendiren eğlenceli hareket
                etkinlikleri.
              </p>
            </Card>
          </motion.div>

          {/* Dans */}
          <motion.div {...fadeUp}>
            <Card className="p-5 h-full">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--neutral-light)]">
                  <LuMusic />
                </div>
                <h3 className="text-lg font-semibold">Dans</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Ritim duygusunu, beden farkındalığını ve grup uyumunu artıran
                dans etkinlikleri.
              </p>
            </Card>
          </motion.div>

          {/* Yoga */}
          <motion.div {...fadeUp}>
            <Card className="p-5 h-full">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--neutral-light)]">
                  <LuFlower2 />
                </div>
                <h3 className="text-lg font-semibold">Yoga</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Nefes, denge ve sakinleşme odaklı oyunlaştırılmış yoga akışları.
              </p>
            </Card>
          </motion.div>

          {/* Drama */}
          <motion.div {...fadeUp}>
            <Card className="p-5 h-full">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--neutral-light)]">
                  <LuTheater />
                </div>
                <h3 className="text-lg font-semibold">Drama</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Hikâye kurgulama, rol oynama ve empatiyi besleyen yaratıcı drama
                çalışmaları.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* GÜNÜMÜZ NASIL GEÇER */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[color:var(--neutral-light)]/50" />
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <SectionTitle
            id="gunumuz-nasil-gecer"
            title="Günümüz Nasıl Geçer"
            eyebrow="Günlük Akış"
          />

          <div className="mt-8 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            {/* Metin */}
            <motion.div {...fadeUp} className="prose max-w-none">
              <p>
                Her sabah, miniklerimizi sevgi dolu bir “günaydın halkası”
                karşılar. Sabah 08.00 itibariyle herkes sınıflarında derslerine
                başlar. Ardından sıcak taze kahvaltılarını yapıp bahçede
                öğretmenleri eşliğinde etkinlikler yapar, oyunlar oynarlar.
              </p>
              <p>
                Öğle yemeğine, ortak yemekhanemizde günlük, taze ve ev yapımı
                yemeklerini yemek üzere öğretmenleri eşliğinde katılırlar. Öğle
                yemeği sonrası <strong>2-3 yaş</strong> miniklerimizin kendi
                ritminde ve alıştıkları düzende uyumaları sağlanır.
                <strong>4-5 yaş</strong> çocuklarımız ise öğretmenleri eşliğinde
                günün planına göre şekillendirilmiş branş dersleri, etkinlikler
                ve oyun gibi aktivitelere katılırlar.
              </p>
              <p>
                Uyku saati ve derslerin ardından ikindi kahvaltısında mutfak
                annemizin ellerinden çıkan taze ikindi kahvaltılarını yaparlar.
                Günün her saati, çocukların hayal gücünü destekleyecek bir
                etkinlik içerir.
              </p>
              <p>
                Günlük planlarımız mevsimlerle, hava koşullarıyla ve çocukların
                ilgileriyle birlikte şekillenir. Kimi gün bahçede hikâye zamanı,
                kimi gün bahçede yoga, kimi gün de sessizce resim yapma alanı
                olur.
              </p>
              <p>
                Her etkinlik, bir beceri kazandırmak kadar, çocuklara “kendini
                iyi hissetme” alanı da sunar.
              </p>
            </motion.div>

            {/* Timeline kartı */}
            <motion.div {...fadeIn}>
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <LuClock3 className="text-xl" />
                  <h3 className="text-lg font-semibold">Örnek Gün Akışı</h3>
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
                      <span className="absolute -start-3 mt-1 h-2 w-2 rounded-full bg-[color:var(--primary)]" />
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
      </section>

      {/* ÖLÇME DEĞERLENDİRME */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <SectionTitle
              id="olcme-degerlendirme"
              title="Ölçme & Değerlendirme"
              eyebrow="Geri Bildirim"
            />
            <motion.div {...fadeUp} className="prose max-w-none mt-5">
              <p>
                Öğretim yılı içerisinde <strong>iki Akademik Sunum</strong> ve{" "}
                <strong>iki Görsel Sanatlar Sergisi</strong>{" "}
                gerçekleştirilmektedir.
              </p>
            </motion.div>
          </div>
          <motion.div {...fadeIn}>
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <LuGraduationCap className="text-xl" />
                <h3 className="text-lg font-semibold">Dönem Dökümü</h3>
              </div>
              <ul className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { k: "Akademik Sunum", v: "2 kez" },
                  { k: "Sanat Sergisi", v: "2 kez" },
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

      {/* REHBERLİK */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[color:var(--neutral-light)]/50" />
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <SectionTitle id="rehberlik" title="Rehberlik" eyebrow="PDR" />
            <motion.div {...fadeUp} className="prose max-w-none mt-5">
              <p>
                Öğretmen-Veli iş birliği içerisinde miniğimize katkısı olacak
                her türlü uzman görüşünü alanında uzman PDR öğretmenimiz
                aracılığıyla takip edip raporlamaktayız.
              </p>
            </motion.div>
          </div>
          <motion.div {...fadeIn}>
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <LuUsers className="text-xl" />
                <h3 className="text-lg font-semibold">İş Birliği</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Veli görüşmeleri, gözlem formları ve periyodik raporlamalarla
                çocuğun gelişim yolculuğu bütüncül olarak izlenir.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* SOSYAL ETKİNLİKLER */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionTitle id="sosyal-etkinlikler" title="Sosyal Etkinliklerimiz" />
        <motion.div {...fadeUp} className="prose max-w-none mt-5">
          <p>
            Tiyatro gezileri, alan gezileri, veli katılımlı sanatsal
            etkinlikler, her ay özgün partiler, resmi ve özel gün kutlamaları,
            Drama etkinlikleri, meyve fidanı çiçek fidesi dikimi ve
            çocuklarımızın ilgi ve ihtiyaçlarına yönelik planlanan etkinlikler.
          </p>
        </motion.div>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Tiyatro",
            "Alan Gezi",
            "Veli Katılım",
            "Özgün Parti",
            "Özel Gün",
            "Drama",
            "Fidan Dikimi",
            "Bahçe Zamanı",
          ].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-accent text-accent-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Opsiyonel görsel şerit */}
        <motion.div
          {...fadeIn}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative h-36 rounded-xl overflow-hidden border border-border"
            >
              <Image
                src={`/images/egitim/etkinlik-${i}.jpg`}
                alt={`Etkinlik ${i}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </section>

      {/* VELİ BİLGİLENDİRME */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[color:var(--neutral-light)]/50" />
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid md:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
          <motion.div {...fadeIn}>
            <Card className="overflow-hidden">
              <div className="relative h-64 w-full">
                <Image
                  src="/images/egitim/veli.jpg"
                  alt="Veli bilgilendirme"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex items-center gap-2 text-sm text-muted-foreground">
                <LuCamera /> Günlük etkinlik foto & video paylaşımları
              </div>
            </Card>
          </motion.div>

          <div>
            <SectionTitle
              id="veli-bilgilendirme"
              title="Veli Bilgilendirme Süreçlerimiz"
            />
            <motion.div {...fadeUp} className="prose max-w-none mt-5">
              <p>
                Günlük etkinlik fotoğraf ve videoları, miniğimiz ile ilgili
                kişisel takip görüşleri, etkinlikler ve gezilerle ilgili her
                türlü geri dönüşü velilerimize ivedilikle iletiyoruz.
              </p>
            </motion.div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/iletisim"
                className="inline-flex items-center rounded-xl px-5 py-3 bg-primary text-primary-foreground hover:bg-primary-hover"
              >
                İletişime Geç
              </a>
              <a
                href="#rehberlik"
                className="inline-flex items-center rounded-xl px-5 py-3 border border-border hover:bg-[color:var(--neutral-light)]"
              >
                Rehberlik
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Alt CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <Card className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-[color:var(--primary)]">
              Modelimizi yakından görün
            </h3>
            <p className="text-muted-foreground">
              Okulu ziyaret edin, sınıflarımızı ve bahçemizi keşfedin.
            </p>
          </div>
          <Link
            href="/iletisim"
            className="inline-flex items-center rounded-xl px-5 py-3 bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            Ön Kayıt / Ziyaret
          </Link>
        </Card>
      </section>
    </main>
  );
}
