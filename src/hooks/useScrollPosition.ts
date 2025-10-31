"use client";

import { useState, useEffect } from "react";

export function useScrollPosition() {
  // İlk render'da false olmalı (şeffaf için)
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { isScrolled };
}

