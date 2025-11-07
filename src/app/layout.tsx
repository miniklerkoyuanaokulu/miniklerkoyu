import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { LayoutContent } from "@/components/LayoutContent";
import SchemaOrg from "./schema";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://miniklerkoyuanaokulu.com"),
  title: {
    default: "Varda Minikler Köyü - Doğayla İç İçe Anaokulu | Adana",
    template: "%s | Varda Minikler Köyü",
  },
  description:
    "Adana Çukurova'da, doğanın içinde çocuklarınız için modern eğitim anlayışıyla okul öncesi eğitim hizmeti sunuyoruz. Organik beslenme, geniş oyun alanları ve titiz güvenlik ile çocuklarınızın doğal gelişimini destekliyoruz.",
  keywords: [
    "anaokulu adana",
    "okul öncesi eğitim adana",
    "çukurova anaokulu",
    "varda anaokulu",
    "minikler köyü",
    "organik beslenme anaokulu",
    "doğal eğitim",
    "montessori adana",
    "özel anaokulu adana",
  ],
  authors: [{ name: "Varda Minikler Köyü" }],
  creator: "Varda Minikler Köyü",
  publisher: "Varda Minikler Köyü",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://miniklerkoyuanaokulu.com",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://miniklerkoyuanaokulu.com",
    siteName: "Varda Minikler Köyü",
    title: "Varda Minikler Köyü - Doğayla İç İçe Anaokulu",
    description:
      "Adana Çukurova'da, doğanın içinde çocuklarınız için modern eğitim anlayışıyla okul öncesi eğitim hizmeti sunuyoruz.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Varda Minikler Köyü Anaokulu",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Varda Minikler Köyü - Doğayla İç İçe Anaokulu",
    description:
      "Adana Çukurova'da, doğanın içinde çocuklarınız için modern eğitim anlayışıyla okul öncesi eğitim hizmeti sunuyoruz.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console eklendiğinde buraya eklenecek
    // google: "verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <SchemaOrg />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}
