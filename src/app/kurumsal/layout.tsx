import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurumsal",
  description: "Varda Minikler Köyü hakkında bilgi edinin. Felsefemiz, kurucumuz ve eğitim anlayışımız hakkında detaylı bilgi.",
  alternates: {
    canonical: "https://miniklerkoyu.vercel.app/kurumsal",
  },
  openGraph: {
    title: "Kurumsal | Varda Minikler Köyü",
    description: "Varda Minikler Köyü hakkında bilgi edinin. Felsefemiz, kurucumuz ve eğitim anlayışımız hakkında detaylı bilgi.",
    url: "https://miniklerkoyu.vercel.app/kurumsal",
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

