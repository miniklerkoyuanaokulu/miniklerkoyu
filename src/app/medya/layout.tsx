import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medya Galerisi",
  description:
    "Varda Minikler Köyü'nden fotoğraflar, videolar ve Instagram paylaşımları. Çocuklarımızın mutlu anları, etkinlikler ve günlük yaşamdan kareler.",
  alternates: {
    canonical: "https://miniklerkoyuanaokulu.com/medya",
  },
  openGraph: {
    title: "Medya Galerisi | Varda Minikler Köyü",
    description:
      "Varda Minikler Köyü'nden fotoğraflar, videolar ve Instagram paylaşımları. Çocuklarımızın mutlu anları ve etkinliklerden kareler.",
    url: "https://miniklerkoyuanaokulu.com/medya",
    images: ["/og-image.jpg"],
  },
};

export default function MedyaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
