import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni ve Açık Rıza",
  description: "Vardalı Minikler Köyü KVKK (Kişisel Verilerin Korunması Kanunu) Aydınlatma Metni ve Açık Rıza Beyanı. Kişisel verilerinizin işlenmesi ve korunması hakkında bilgilendirme.",
  alternates: {
    canonical: "https://miniklerkoyuanaokulu.com/kvkk",
  },
  openGraph: {
    title: "KVKK Aydınlatma Metni | Vardalı Minikler Köyü",
    description: "Kişisel verilerinizin işlenmesi ve korunması hakkında bilgilendirme metni.",
    url: "https://miniklerkoyuanaokulu.com/kvkk",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function KVKKLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

