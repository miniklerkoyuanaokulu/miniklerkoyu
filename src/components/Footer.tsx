"use client";

import Link from "next/link";
import Image from "next/image";
import { LuInstagram, LuMail, LuMapPin, LuPhone } from "react-icons/lu";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-500 via-slate-700 to-slate-950 m-0 p-0">
      {/* Bulut görseli - üstte */}
      <div className="absolute top-0 left-0 right-0 w-full h-auto pointer-events-none select-none z-10">
        <Image
          src="/images/footer/bulut-ust.png"
          alt="Bulut dekorasyonu"
          width={1920}
          height={200}
          className="w-full h-auto object-cover"
          priority={false}
        />
      </div>

      {/* Decorative gradient blobs */}
      <div className="absolute bottom-4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-2xl pointer-events-none select-none" />
      <div className="absolute top-1/2 right-1/4 translate-y-8 w-80 h-80 bg-accent/5 rounded-full blur-2xl pointer-events-none select-none" />

      <div className="relative z-20 mx-auto max-w-6xl px-4 pt-16 pb-10 grid gap-10 md:grid-cols-3">
        {/* 1️⃣ Logo ve kısa tanıtım */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block text-2xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent hover:from-orange-300 hover:via-amber-300 hover:to-yellow-300 transition-all duration-300"
          >
            Vardalı Minikler Köyü
          </Link>
          <p className="text-sm text-gray-300 leading-relaxed">
            Doğanın kalbinde, çocukların kahkahalarıyla yankılanan bir öğrenme
            köyüyüz. Her çocuk kendi ritminde, kendi renginde büyür.
          </p>

          {/* Decorative element */}
          <div className="flex gap-2 pt-2">
            <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-transparent rounded-full" />
            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
            <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-transparent rounded-full" />
          </div>
        </div>

        {/* 2️⃣ Menü */}
        <div>
          <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-primary to-accent rounded-full" />
            Sayfalar
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { href: "/kurumsal", label: "Kurumsal" },
              { href: "/egitim-modelimiz", label: "Eğitim Modelimiz" },
              { href: "/neden-minikler-koyu", label: "Neden Minikler Köyü" },
              { href: "/medya", label: "Medya" },
              { href: "/iletisim", label: "İletişim" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-4 transition-all duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3️⃣ İletişim bilgileri */}
        <div>
          <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-primary to-accent rounded-full" />
            İletişim
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="group flex items-start gap-3 text-gray-300 hover:text-white transition-colors duration-200">
              <LuMapPin className="mt-0.5 shrink-0 text-green-400 group-hover:scale-110 transition-transform duration-200" />
              <span>
                Fuar Alanı Kavşağı, Prof. Dr. Necmettin Erbakan Bulvarı 262/1A{" "}
                <br /> ÇUKUROVA / ADANA
              </span>
            </li>
            <li className="group flex items-center gap-3">
              <LuPhone className="text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-200" />
              <a
                href="tel:05522897191"
                className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                0552 289 71 91
              </a>
            </li>
            <li className="group flex items-center gap-3">
              <LuMail className="text-purple-400 group-hover:scale-110 transition-all duration-200" />
              <a
                href="mailto:info@vardaokullari.com"
                className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                info@vardaokullari.com
              </a>
            </li>
            <li className="group flex items-center gap-3">
              <LuInstagram className="text-pink-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-200" />
              <a
                href="https://www.instagram.com/vardaliminiklerkoyu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                @vardaliminiklerkoyu
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* 4️⃣ Alt bant */}
      <div className="relative z-20 border-t border-white/10 mb-0">
        <div className="mx-auto max-w-6xl px-4 pt-6 pb-6 text-center mb-0">
          <p className="text-xs text-gray-400 mb-0">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Vardalı Minikler Köyü Anaokulu
            </span>{" "}
            - Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-gray-500 mt-2 mb-0">
            Doğayla büyüyen mutlu çocuklar 🌱
          </p>
        </div>
      </div>
    </footer>
  );
}
