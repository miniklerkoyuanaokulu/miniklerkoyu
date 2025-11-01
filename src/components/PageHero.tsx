"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PageHeroProps {
  eyebrow?: string;
  description?: string;
}

export function PageHero({ eyebrow, description }: PageHeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/pages/hero-for-pages3.png"
          alt="Hero background"
          fill
          className="object-cover blur-[2px] scale-105"
          priority
          quality={90}
        />
        {/* Hafif overlay - arka planı göstererek */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-slate-800/30 to-slate-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {eyebrow && (
            <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-wide uppercase text-white font-bold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {eyebrow}
            </h1>
          )}

          {description && (
            <p className="text-lg md:text-xl lg:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
