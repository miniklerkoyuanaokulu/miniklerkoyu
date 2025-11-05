import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neden Minikler Köyü?",
  description: "Organik beslenme, geniş oyun alanları, titiz güvenlik, doğal ortam ve deneyimli kadromuzla çocuklarınızın doğal gelişimini destekliyoruz. Varda Minikler Köyü'nü tercih etmeniz için 10 neden.",
  alternates: {
    canonical: "https://miniklerkoyu.vercel.app/neden-minikler-koyu",
  },
  openGraph: {
    title: "Neden Minikler Köyü? | Varda Minikler Köyü",
    description: "Organik beslenme, geniş oyun alanları, titiz güvenlik ve doğal ortamla çocuklarınızın doğal gelişimini destekliyoruz.",
    url: "https://miniklerkoyu.vercel.app/neden-minikler-koyu",
    images: ["/og-image.jpg"],
  },
};

export default function NedenMiniklerKoyuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

