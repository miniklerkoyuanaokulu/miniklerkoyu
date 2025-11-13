import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duyurularımız | Minikler Köyü Anaokulu",
  description: "Minikler Köyü Anaokulu duyurular ve haberler sayfası. Okulumuzdan güncel haberler ve duyurular.",
  keywords: "anaokulu duyurular, okul haberleri, minikler köyü duyurular, eğitim haberleri",
  openGraph: {
    title: "Duyurularımız | Minikler Köyü Anaokulu",
    description: "Okulumuzdan güncel haberler ve duyurular",
    type: "website",
  },
};

export default function DuyurularLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

