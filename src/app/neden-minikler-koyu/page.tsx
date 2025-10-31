// app/(site)/neden-minikler-koyu/page.tsx
// "Neden Minikler Köyü" – doğa, koşullar ve güvenlik odaklı sayfa (framer-motion + react-icons)

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";
import {
  LuApple,
  LuChefHat,
  LuHeartHandshake,
  LuShieldCheck,
  LuSprout,
  LuSunMedium,
  LuShield,
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

export default function NedenPage() {
  return (
    <main className="mx-auto max-w-5xl px-4">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30"
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
              Neden Minikler Köyü?
            </p>
            <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
              <span className="text-[color:var(--primary)]">
                Doğal, güvenli,
              </span>{" "}
              sevgiyle büyüyen bir okul
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-prose">
              Organik beslenme, geniş oyun alanları ve titiz güvenlik
              prosedürleri ile miniklerin doğayla iç içe geliştiği bir ortam.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#beslenme"
                className="inline-flex items-center rounded-xl px-5 py-3 bg-primary text-primary-foreground hover:bg-primary-hover"
              >
                Beslenme
              </Link>
              <Link
                href="#fiziksel-kosullar"
                className="inline-flex items-center rounded-xl px-5 py-3 border border-border hover:bg-[color:var(--neutral-light)]"
              >
                Fiziksel Koşullar
              </Link>
              <Link
                href="#guvenlik"
                className="inline-flex items-center rounded-xl px-5 py-3 border border-border hover:bg-[color:var(--neutral-light)]"
              >
                Güvenlik
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
                <linearGradient id="g3" x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--secondary)" />
                </linearGradient>
              </defs>
              <circle cx="48" cy="58" r="24" fill="url(#g3)" />
              <rect
                x="122"
                y="44"
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

      {/* BESLENME */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div>
            <SectionTitle
              id="beslenme"
              title="Beslenme"
              eyebrow="Organik & Taze"
            />
            <motion.div {...fadeUp} className="prose max-w-none mt-5">
              <p>
                Çocuklarımızın beslenme ile ilgili özel durumları velilerimizden
                bilgi alınarak menü oluştururken bize destek olur. Okulumuzun
                mutfağında tecrübeli bir anne ve aşçı olan{" "}
                <strong>Elif ablamızın</strong> tamamen organik ürünlerle
                hazırladığı taze yemekler sabah kahvaltısı, öğle yemeği ve
                ikindi kahvaltısı şeklinde miniklerimiz ve öğretmenlerimize
                servis edilir.
              </p>
              <p>
                Organik süt ile ev yapımı yoğurt, ev salçası, haftalık taze
                sebze ve meyve ile çocuklarımıza güvenle beslenme olanağı
                sunuyoruz. Dönemlik turşu kurma, zeytin kırma etkinliklerimizle
                çocuklarımızı da beslenme süreçlerinde eğlenerek öğrenmeye dâhil
                ediyoruz.
              </p>
            </motion.div>
            <motion.div {...fadeIn} className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                {
                  icon: <LuApple />,
                  k: "Organik Ürünler",
                  v: "Günlük taze menü",
                },
                { icon: <LuChefHat />, k: "El Yapımı", v: "Yoğurt & salça" },
                { icon: <LuSprout />, k: "Etkinlik", v: "Turşu & zeytin" },
                {
                  icon: <LuHeartHandshake />,
                  k: "İş Birliği",
                  v: "Veli bilgilendirme",
                },
              ].map((it, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-border bg-[color:var(--neutral-light)]/60 p-3"
                >
                  <div className="text-xl">{it.icon}</div>
                  <div>
                    <div className="text-xs text-muted-foreground">{it.k}</div>
                    <div className="font-medium">{it.v}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div {...fadeIn}>
            <Card className="overflow-hidden">
              <div className="relative h-72 w-full">
                <Image
                  src="/images/neden/beslenme.jpg"
                  alt="Organik beslenme"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-sm text-muted-foreground">
                Organik ve ev yapımı ürünlerle hazırlanan taze menüler
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FİZİKSEL KOŞULLAR */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[color:var(--neutral-light)]/50" />
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <SectionTitle
            id="fiziksel-kosullar"
            title="Fiziksel Koşullar"
            eyebrow="Geniş Oyun Alanları"
          />

          <div className="mt-8 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <motion.div {...fadeUp} className="prose max-w-none">
              <p>
                Okulumuzda çocuklarımızın gelişimi için; <strong>110 m²</strong>{" "}
                Kum Havuzu, <strong>180 m²</strong> Hobi Bahçesi,{" "}
                <strong>130 m²</strong> Oyun-Park Alanı, <strong>100 m²</strong>{" "}
                Açık Amfi Tiyatro, <strong>200 m²</strong> Survivor Parkuru ve
                Zipline, toplamda <strong>1100 m²</strong> Oyun Alanı
                miniklerimizi beklemektedir.
              </p>
            </motion.div>

            {/* Metrik kartları */}
            <motion.div {...fadeIn}>
              <Card className="p-4">
                <ul className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { k: "Kum Havuzu", v: "110 m²" },
                    { k: "Hobi Bahçesi", v: "180 m²" },
                    { k: "Oyun-Park", v: "130 m²" },
                    { k: "Amfi Tiyatro", v: "100 m²" },
                    { k: "Survivor & Zipline", v: "200 m²" },
                    { k: "Toplam Oyun Alanı", v: "1100 m²" },
                  ].map((it) => (
                    <li
                      key={it.k}
                      className="rounded-lg border border-border p-3 bg-[color:var(--neutral-light)]/60"
                    >
                      <div className="text-xs text-muted-foreground">
                        {it.k}
                      </div>
                      <div className="font-semibold">{it.v}</div>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>

          {/* Görsel grid */}
          <motion.div
            {...fadeIn}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {["kum", "hobi", "park", "amfi"].map((key, i) => (
              <div
                key={i}
                className="relative h-36 rounded-xl overflow-hidden border border-border"
              >
                <Image
                  src={`/images/neden/${key}.jpg`}
                  alt={key}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GÜVENLİK */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <motion.div {...fadeIn}>
            <Card className="overflow-hidden">
              <div className="relative h-64 w-full">
                <Image
                  src="/images/neden/guvenlik.jpg"
                  alt="Güvenlik"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 grid grid-cols-2 gap-3 text-sm">
                {[
                  { icon: <LuShieldCheck />, t: "Yetkili Teslim" },
                  { icon: <LuShield />, t: "Kimlik Kontrol" },
                  { icon: <LuHeartHandshake />, t: "Veli Onayı" },
                  { icon: <LuSunMedium />, t: "Huzurlu Ortam" },
                ].map((it, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[color:var(--primary)]">
                      {it.icon}
                    </span>
                    {it.t}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <div>
            <SectionTitle
              id="guvenlik"
              title="Güvenlik"
              eyebrow="Önceliğimiz"
            />
            <motion.div {...fadeUp} className="prose max-w-none mt-5">
              <p>
                Çocuklarımızın güvenliği ve huzuru ilk hedefimiz olduğu için
                sabah teslim eden veli ve teslim alacak kişilerin önceden
                bilgilendirmesi veliden rica edilir. Velinin kayıt ettirdiği
                kişiler dışında hiç kimseye miniğimizi teslim etmeyiz. Veli
                bilgilendirmesi alınarak ve kimlik kontrolleri yapılarak
                miniğimizi teslim edip evine yolcu ederiz.
              </p>
            </motion.div>

            {/* Adım adım prosedür kartı */}
            <motion.div {...fadeIn} className="mt-6">
              <Card className="p-5">
                <ol className="relative ms-3">
                  {[
                    {
                      t: "Teslimat Bilgisi",
                      d: "Veliden teslim edecek/alayacak kişi bilgisi alınır.",
                    },
                    {
                      t: "Kimlik Kontrolü",
                      d: "Kayıtlı kişiye kimlik kontrolü yapılır.",
                    },
                    {
                      t: "Teslim Onayı",
                      d: "Veli onayı ve imza prosedürü tamamlanır.",
                    },
                    {
                      t: "Güvenli Çıkış",
                      d: "Minik güvenle ailesine teslim edilir.",
                    },
                  ].map((row, i) => (
                    <li key={i} className="mb-4 ps-6">
                      <span className="absolute -start-3 mt-1 h-2 w-2 rounded-full bg-[color:var(--primary)]" />
                      <div className="font-medium">{row.t}</div>
                      <div className="text-sm text-muted-foreground">
                        {row.d}
                      </div>
                    </li>
                  ))}
                </ol>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alt CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <Card className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-[color:var(--primary)]">
              Yerimizi ziyaret edin
            </h3>
            <p className="text-muted-foreground">
              Bahçemizi, sınıflarımızı ve oyun alanlarını birlikte gezelim.
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
