"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

const slides = [
  {
    image: "/images/home/hero-11.avif",
    title: "Vardalı Minikler Köyü'ne",
    subtitle: "Hoş Geldiniz!",
    description:
      "Doğanın kalbinde, çocukların kahkahalarıyla yankılanan bir öğrenme köyü. Her çocuk kendi ritminde, kendi renginde büyür.",
  },
  {
    image: "/images/home/hero-21.avif",
    title: "Doğayla İç İçe",
    subtitle: "Modern Eğitim",
    description:
      "Geniş oyun alanlarımızda çocuklarınız doğayla bağ kurarken, uzman eğitim kadromuzla en kaliteli okul öncesi eğitimi alır.",
  },
  {
    image: "/images/home/hero-31.avif",
    title: "Organik Beslenme",
    subtitle: "Sağlıklı Gelişim",
    description:
      "Çocuklarınızın sağlıklı büyümesi için organik ve dengeli beslenme programımızla her öğün özenle hazırlanır.",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Bir sonraki görseli önceden yükle
  const nextIndex = useMemo(
    () => (currentSlide + 1) % slides.length,
    [currentSlide]
  );

  // Otomatik geçiş (5 saniye)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Bir sonraki görseli preload et
  useEffect(() => {
    const img = new window.Image();
    img.src = slides[nextIndex].image;
  }, [nextIndex]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section className="relative left-1/2 flex min-h-[70vh] md:min-h-screen w-screen -translate-x-1/2 items-center justify-center overflow-hidden">
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!isActive}
          >
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={`Vardalı Minikler Köyü Anaokulu - ${slide.title} ${slide.subtitle} - Adana Çukurova doğa ile iç içe okul öncesi eğitim`}
              fill
              sizes="100vw"
              className="object-cover object-center md:object-fill"
              // İlk görsel için priority
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              quality={75}
            />

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/40" />
          </div>
        );
      })}

      {/* Content - Always visible, on top of all slides */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:py-0 text-center">
        <div
          className="transition-all duration-700"
          key={currentSlide} // Re-render için key
        >
          <h1 className="mt-12 md:mt-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            {slides[currentSlide].title}
            <span className="block mt-2 text-primary drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              {slides[currentSlide].subtitle}
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-3xl mx-auto">
            {slides[currentSlide].description}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/iletisim#on-kayit"
            className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-base font-bold text-white shadow-2xl transition-all hover:bg-primary-hover hover:scale-105 hover:shadow-primary/50 md:px-8 md:py-4 md:text-lg"
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

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "bg-primary w-10 h-3"
                : "bg-white/60 hover:bg-white/90 w-3 h-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </section>
  );
}
