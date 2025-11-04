"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingWhatsAppButton } from "./FloatingWhatsAppButton";
import { FloatingCallButton } from "./FloatingCallButton";
import { FloatingInstagramButton } from "./FloatingInstagramButton";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Admin sayfalarında navbar/footer/floating buttons gösterme
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}
      {children}
      {!isAdminPage && <Footer />}
      
      {/* Floating Buttons - Sadece site sayfalarında */}
      {!isAdminPage && (
        <>
          <FloatingInstagramButton />
          <FloatingCallButton />
          <FloatingWhatsAppButton />
        </>
      )}
    </>
  );
}

