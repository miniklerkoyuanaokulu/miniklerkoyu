"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LuStar, LuQuote, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";
import { getRelativeTime } from "@/lib/reviews";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time?: string;
  relative_time?: string;
  reviewDate?: Date;
  profile_photo_url?: string;
  source?: "google" | "manual";
}

interface GoogleReviewsData {
  reviews: Review[];
  totalRating: number;
  totalReviews: number;
}

export default function GoogleReviews() {
  const [data, setData] = useState<GoogleReviewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3); // Desktop: 3 kart
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2); // Tablet: 2 kart
      } else {
        setItemsPerView(1); // Mobile: 1 kart
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const nextSlide = () => {
    if (data && currentIndex < data.reviews.length - itemsPerView) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Otomatik geçiş (7 saniye)
  useEffect(() => {
    if (!data || data.reviews.length <= itemsPerView) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = data.reviews.length - itemsPerView;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 7000);

    return () => clearInterval(timer);
  }, [data, itemsPerView]);

  useEffect(() => {
    // Hem Google hem Firebase yorumlarını çek
    async function fetchAllReviews() {
      try {
        // Google yorumları
        const googleRes = await fetch("/api/google-reviews");
        const googleData = await googleRes.json();

        // Firebase yorumları
        const firebaseRes = await fetch("/api/reviews/manual");
        const firebaseData = await firebaseRes.json();

        if (googleData.error && firebaseData.error) {
          setError("Yorumlar yüklenemedi");
          setIsLoading(false);
          return;
        }

        // Yorumları birleştir
        const googleReviews = (googleData.reviews || []).map((r: Review) => ({
          ...r,
          source: "google",
        }));

        const manualReviews = (firebaseData.reviews || []).map((r: any) => ({
          ...r,
          source: "manual",
          reviewDate: r.reviewDate ? new Date(r.reviewDate) : undefined,
        }));

        const allReviews = [...googleReviews, ...manualReviews];

        // Rastgele sırala (mix Google + manual)
        const shuffledReviews = allReviews.sort(() => Math.random() - 0.5);

        setData({
          reviews: shuffledReviews,
          totalRating: googleData.totalRating || 5,
          totalReviews: googleData.totalReviews || allReviews.length,
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Yorumlar yüklenemedi");
        setIsLoading(false);
      }
    }

    fetchAllReviews();
  }, []);

  if (error) return null; // Hata varsa gösterme
  if (isLoading) {
    return (
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Yorumlar yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!data || data.reviews.length === 0) {
    // 5 yıldızlı yorum yoksa gösterme
    return null;
  }

  const totalReviews = data.reviews.length;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < totalReviews - itemsPerView;

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <FaGoogle className="w-8 h-8 text-[#4285F4]" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Veli Görüşleri
            </h2>
          </div>

          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <span className="text-4xl font-bold text-orange-600">
                {data.totalRating.toFixed(1)}
              </span>
              <div className="flex text-yellow-400 text-xl">
                {[...Array(5)].map((_, i) => (
                  <LuStar
                    key={i}
                    className={
                      i < Math.round(data.totalRating)
                        ? "fill-current"
                        : "fill-none"
                    }
                  />
                ))}
              </div>
            </div>
            <div className="text-gray-600">
              <span className="font-semibold">{data.totalReviews}</span> Google
              yorumu
            </div>
          </div>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Velilerimizin Google&apos;da paylaştığı deneyimler
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative pt-4 pb-8 px-2 md:px-8 lg:px-12">
          <div className="relative">
            {/* Navigation Buttons - Dışarıda, kartların ortasında */}
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className={`flex absolute -left-2 md:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl border-2 border-orange-200 items-center justify-center transition-all duration-300 ${
                canGoPrev
                  ? "hover:bg-orange-500 hover:text-white hover:scale-110 cursor-pointer"
                  : "opacity-30 cursor-not-allowed"
              }`}
              aria-label="Önceki yorumlar"
            >
              <LuChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className={`flex absolute -right-2 md:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl border-2 border-orange-200 items-center justify-center transition-all duration-300 ${
                canGoNext
                  ? "hover:bg-orange-500 hover:text-white hover:scale-110 cursor-pointer"
                  : "opacity-30 cursor-not-allowed"
              }`}
              aria-label="Sonraki yorumlar"
            >
              <LuChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Reviews Carousel */}
            <div
              className="overflow-hidden mx-auto"
              style={{ maxWidth: "100%" }}
            >
              <motion.div
                className="flex gap-4 md:gap-6 py-4 md:justify-start"
                animate={{
                  x:
                    itemsPerView === 1
                      ? 0 // Mobilde merkezli kalsın
                      : `${-currentIndex * (100 / itemsPerView)}%`,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000) {
                    nextSlide();
                  } else if (swipe > 10000) {
                    prevSlide();
                  }
                }}
              >
                {data.reviews.map((review, index) => {
                  // Mobilde sadece aktif card'ı göster
                  if (itemsPerView === 1 && index !== currentIndex) {
                    return null;
                  }

                  return (
                    <motion.div
                      key={index}
                      className="flex-shrink-0 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="rounded-2xl border-2 border-white/50 p-6 shadow-lg bg-white/80 backdrop-blur-sm min-h-[340px] flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-orange-200 group">
                        {/* Quote Icon */}
                        <div className="absolute top-4 right-4 text-orange-200 opacity-20 group-hover:opacity-30 transition-opacity">
                          <LuQuote className="w-12 h-12" />
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                          {review.profile_photo_url ? (
                            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-orange-200">
                              <Image
                                src={review.profile_photo_url}
                                alt={review.author_name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-linear-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-lg ring-2 ring-orange-200">
                              {review.author_name.charAt(0)}
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">
                              {review.author_name}
                            </p>
                            <div className="flex items-center gap-1 text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <LuStar
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-current"
                                      : "fill-none"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Review Text */}
                        <p className="text-sm text-gray-700 leading-relaxed flex-1 mb-4 relative z-10 line-clamp-5">
                          {review.text}
                        </p>

                        {/* Date */}
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100 relative z-10">
                          <span>
                            {review.reviewDate
                              ? getRelativeTime(
                                  typeof review.reviewDate === "string"
                                    ? new Date(review.reviewDate)
                                    : review.reviewDate
                                )
                              : review.relative_time}
                          </span>
                          <FaGoogle className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({
              length: Math.max(1, totalReviews - itemsPerView + 1),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? "bg-orange-500 w-8 h-3"
                    : "bg-orange-200 hover:bg-orange-300 w-3 h-3"
                }`}
                aria-label={`${index + 1}. yorum grubuna git`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          {placeId && (
            <a
              href={`https://search.google.com/local/writereview?placeid=${placeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <FaGoogle className="w-5 h-5" />
              Google&apos;da Yorum Yap
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
