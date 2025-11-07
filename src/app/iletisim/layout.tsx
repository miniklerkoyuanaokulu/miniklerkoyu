import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Varda Minikler Köyü ile iletişime geçin. Adres: Fuar Alanı Kavşağı, Prof. Dr. Necmettin Erbakan Bulvarı 262/1A, Çukurova/Adana. Tel: 0552 289 71 91. Ön kayıt formu ve ziyaret randevusu için bize ulaşın.",
  alternates: {
    canonical: "https://miniklerkoyuanaokulu.com/iletisim",
  },
  openGraph: {
    title: "İletişim | Varda Minikler Köyü",
    description: "Varda Minikler Köyü ile iletişime geçin. Ön kayıt formu ve ziyaret randevusu için bize ulaşın.",
    url: "https://miniklerkoyuanaokulu.com/iletisim",
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

