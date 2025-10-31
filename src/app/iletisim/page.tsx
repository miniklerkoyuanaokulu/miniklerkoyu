// app/(site)/iletisim/page.tsx
// İletişim sayfası – adres/sosyal kartları + geliştirilmiş Ön Kayıt Formu (KVKK & Açık Rıza)

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, cubicBezier } from "framer-motion";
import {
  LuMapPin,
  LuPhone,
  LuInstagram,
  LuClock3,
  LuExternalLink,
} from "react-icons/lu";
import PreRegistrationForm from "@/components/PreRegistrationForm";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) },
};

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

export default function IletisimPage() {
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
              İletişim
            </p>
            <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
              <span className="text-[color:var(--primary)]">
                Varda Minikler Köyü
              </span>{" "}
              Anaokulu
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-prose">
              Gelin, birlikte çocuğunuzun dünyasını keşfedelim. Randevu ile
              ziyaret edebilirsiniz.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:05522897191"
                className="inline-flex items-center rounded-xl px-5 py-3 bg-primary text-primary-foreground hover:bg-primary-hover"
              >
                <LuPhone className="mr-2" /> 0552 289 71 91
              </a>
              <Link
                href="#on-kayit"
                className="inline-flex items-center rounded-xl px-5 py-3 border border-border hover:bg-[color:var(--neutral-light)]"
              >
                Ön Kayıt Formu
              </Link>
            </div>
          </motion.div>
          <div className="relative h-64 md:h-80 rounded-2xl border border-border bg-gradient-to-br from-[color:var(--neutral-light)] via-[color:var(--background)] to-white">
            {/* Opsiyonel: mini harita görseli */}
            <Image
              src="/images/iletisim/map-placeholder.jpg"
              alt="Harita"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* İLETİŞİM KARTLARI */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--neutral-light)]">
                <LuMapPin />
              </span>
              <div>
                <h3 className="text-lg font-semibold">Adres</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fuar Alanı Kavşağı, Prof. Dr. Necmettin Erbakan Bulvarı 262/1A
                  ÇUKUROVA/ADANA
                </p>
                {/* Gerçek Google Maps linkini ekleyebilirsin */}
                <a
                  href="#harita"
                  className="mt-2 inline-flex items-center gap-1 text-sm text-[color:var(--primary)] underline underline-offset-4"
                >
                  Haritada Gör <LuExternalLink className="inline" />
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--neutral-light)]">
                <LuPhone />
              </span>
              <div>
                <h3 className="text-lg font-semibold">Telefon</h3>
                <p className="mt-1 text-sm">
                  <a className="hover:underline" href="tel:05522897191">
                    0552 289 71 91
                  </a>
                </p>
                <p className="mt-1 text-sm">
                  <a
                    className="hover:underline"
                    href="mailto:info@vardaokullari.com"
                  >
                    info@vardaokullari.com
                  </a>
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--neutral-light)]">
                <LuInstagram />
              </span>
              <div>
                <h3 className="text-lg font-semibold">Instagram</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  @vardaliminiklerkoyu
                </p>
                <a
                  href="https://www.instagram.com/vardaliminiklerkoyu"
                  target="_blank"
                  className="mt-2 inline-flex items-center gap-1 text-sm text-[color:var(--primary)] underline underline-offset-4"
                >
                  Profili Aç <LuExternalLink className="inline" />
                </a>
              </div>
            </div>
          </Card>
        </div>

        <Card className="mt-6 p-5">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--neutral-light)]">
              <LuClock3 />
            </span>
            <div>
              <h3 className="text-lg font-semibold">Ziyaret Günleri</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Hafta içi her gün ve Cumartesi günleri randevu ile okul tanıtımı
                yapılmaktadır.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* ÖN KAYIT FORMU */}
      <section id="on-kayit" className="mx-auto max-w-6xl px-4 pb-16">
        <Card className="p-6 md:p-8">
          <PreRegistrationForm />
        </Card>

        {/* Alt Mesaj */}
        <motion.div {...fadeUp} className="mt-12 text-center">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-gradient-to-br from-[color:var(--neutral-light)]/60 via-[color:var(--background)] to-transparent p-8 md:p-12">
            <p className="text-lg md:text-xl leading-relaxed text-foreground font-medium">
              Gelin, birlikte çocuğunuzun dünyasını keşfedelim.
              <br />
              <span className="text-[color:var(--primary)] font-semibold">
                Varda Minikler Köyü
              </span>
              &apos;nde, minik kalplerin doğayla büyüdüğü bu masalın bir parçası
              olun.
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
