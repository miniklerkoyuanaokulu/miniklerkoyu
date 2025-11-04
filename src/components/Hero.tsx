"use client";

import Image from "next/image";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

export function Hero() {
  return (
    <section className="relative left-1/2 flex min-h-screen w-screen -translate-x-1/2 items-center justify-center overflow-hidden">
      {/* Background Image - AVIF format (98% smaller than PNG) */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/hero.avif"
          alt="Varda Minikler Köyü"
          fill
          className="object-fill"
          priority
        />
        {/* Light overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/5 to-black/5" />
      </div>

      {/* Content - Centered */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <p className="mt-20 text-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)] md:text-4xl lg:text-5xl font-extrabold">
          Varda Minikler Köyü&apos;ne Hoş Geldiniz!
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/iletisim#on-kayit"
            className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-base font-bold text-white shadow-2xl transition-all hover:bg-primary hover:scale-105 hover:shadow-primary/50 md:px-8 md:py-4 md:text-lg"
          >
            Ön Kayıt <LuChevronRight className="ml-2" />
          </Link>
          <Link
            href="/egitim-modelimiz"
            className="inline-flex items-center rounded-xl border-2 border-primary bg-primary/10 px-6 py-3 text-base font-bold text-primary backdrop-blur-md transition-all hover:bg-primary hover:text-white hover:scale-105 hover:shadow-xl md:px-8 md:py-4 md:text-lg"
          >
            Eğitim Modelimiz
          </Link>
        </div>
      </div>
    </section>
  );
}
