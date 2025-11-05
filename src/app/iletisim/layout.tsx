import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Varda Minikler Köyü ile iletişime geçin. Adres: Fuar Alanı Kavşağı, Prof. Dr. Necmettin Erbakan Bulvarı 262/1A, Çukurova/Adana. Tel: 0552 289 71 91. Ön kayıt formu ve ziyaret randevusu için bize ulaşın.",
  alternates: {
    canonical: "https://miniklerkoyu.vercel.app/iletisim",
  },
  openGraph: {
    title: "İletişim | Varda Minikler Köyü",
    description: "Varda Minikler Köyü ile iletişime geçin. Ön kayıt formu ve ziyaret randevusu için bize ulaşın.",
    url: "https://miniklerkoyu.vercel.app/iletisim",
    images: ["/og-image.jpg"],
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

