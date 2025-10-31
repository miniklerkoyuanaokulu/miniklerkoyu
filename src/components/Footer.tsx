"use client";

import Link from "next/link";
import { LuInstagram, LuMail, LuMapPin, LuPhone } from "react-icons/lu";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[color:var(--neutral-light)]/40">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3">
        {/* 1️⃣ Logo ve kısa tanıtım */}
        <div>
          <Link
            href="/"
            className="text-lg font-semibold text-[color:var(--primary)]"
          >
            Varda Minikler Köyü
          </Link>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Doğanın kalbinde, çocukların kahkahalarıyla yankılanan bir öğrenme
            köyüyüz. Her çocuk kendi ritminde, kendi renginde büyür.
          </p>
        </div>

        {/* 2️⃣ Menü */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Sayfalar
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/kurumsal"
                className="hover:text-[color:var(--primary)]"
              >
                Kurumsal
              </Link>
            </li>
            <li>
              <Link
                href="/egitim-modelimiz"
                className="hover:text-[color:var(--primary)]"
              >
                Eğitim Modelimiz
              </Link>
            </li>
            <li>
              <Link
                href="/neden-minikler-koyu"
                className="hover:text-[color:var(--primary)]"
              >
                Neden Minikler Köyü
              </Link>
            </li>
            <li>
              <Link href="/medya" className="hover:text-[color:var(--primary)]">
                Medya
              </Link>
            </li>
            <li>
              <Link
                href="/iletisim"
                className="hover:text-[color:var(--primary)]"
              >
                İletişim
              </Link>
            </li>
          </ul>
        </div>

        {/* 3️⃣ İletişim bilgileri */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">
            İletişim
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <LuMapPin className="mt-0.5 shrink-0 text-[color:var(--primary)]" />
              <span>
                Fuar Alanı Kavşağı, Prof. Dr. Necmettin Erbakan Bulvarı 262/1A{" "}
                <br /> ÇUKUROVA / ADANA
              </span>
            </li>
            <li className="flex items-center gap-2">
              <LuPhone className="text-[color:var(--primary)]" />
              <a
                href="tel:05522897191"
                className="hover:text-[color:var(--primary)]"
              >
                0552 289 71 91
              </a>
            </li>
            <li className="flex items-center gap-2">
              <LuMail className="text-[color:var(--primary)]" />
              <a
                href="mailto:info@vardaokullari.com"
                className="hover:text-[color:var(--primary)]"
              >
                info@vardaokullari.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <LuInstagram className="text-[color:var(--primary)]" />
              <a
                href="https://www.instagram.com/vardaliminiklerkoyu"
                target="_blank"
                className="hover:text-[color:var(--primary)]"
              >
                @vardaliminiklerkoyu
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* 4️⃣ Alt bant */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="text-[color:var(--primary)] font-medium">
            Varda Minikler Köyü Anaokulu
          </span>
          . Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
