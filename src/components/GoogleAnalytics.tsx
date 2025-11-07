"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { pageview, trackTimeOnPage, trackScrollDepth } from "@/lib/analytics";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Sayfa değişikliklerini izle
  useEffect(() => {
    if (pathname && GA_MEASUREMENT_ID) {
      const url =
        pathname +
        (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      pageview(url);
    }
  }, [pathname, searchParams]);

  // Sayfa üzerinde kalma süresini izle
  useEffect(() => {
    const startTime = Date.now();
    const scrollDepthTracked = new Set<number>();

    // Scroll derinliği izleme
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      );

      // Her %25'te bir event gönder
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (
          scrollPercentage >= milestone &&
          !scrollDepthTracked.has(milestone)
        ) {
          scrollDepthTracked.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };

    // Sayfa kapatılırken veya yeni sayfaya geçerken kalma süresini kaydet
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 5) {
        // En az 5 saniye kaldıysa kaydet
        trackTimeOnPage(timeSpent, pathname || "unknown");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      handleBeforeUnload();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  // GA_MEASUREMENT_ID yoksa script'leri yükleme
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: false
            });
          `,
        }}
      />
    </>
  );
}
