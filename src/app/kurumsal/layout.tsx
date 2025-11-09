import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurumsal",
  description: "Vardalı Minikler Köyü hakkında bilgi edinin. Felsefemiz, kurucumuz ve eğitim anlayışımız hakkında detaylı bilgi.",
  alternates: {
    canonical: "https://miniklerkoyuanaokulu.com/kurumsal",
  },
  openGraph: {
    title: "Kurumsal | Vardalı Minikler Köyü",
    description: "Vardalı Minikler Köyü hakkında bilgi edinin. Felsefemiz, kurucumuz ve eğitim anlayışımız hakkında detaylı bilgi.",
    url: "https://miniklerkoyuanaokulu.com/kurumsal",
    images: ["/og-image.jpg"],
  },
};

export default function KurumsalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

