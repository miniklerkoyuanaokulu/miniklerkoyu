import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eğitim Modelimiz",
  description:
    "Oyun temelli öğrenme, doğayla iç içe eğitim ve bireysel gelişim odaklı modern eğitim modelimizi keşfedin. Yabancı dil, sanat, jimnastik, dans, yoga ve drama dersleri.",
  alternates: {
    canonical: "https://miniklerkoyuanaokulu.com/egitim-modelimiz",
  },
  openGraph: {
    title: "Eğitim Modelimiz | Vardalı Minikler Köyü",
    description:
      "Oyun temelli öğrenme, doğayla iç içe eğitim ve bireysel gelişim odaklı modern eğitim modelimizi keşfedin.",
    url: "https://miniklerkoyuanaokulu.com/egitim-modelimiz",
    images: ["/og-image.jpg"],
  },
};

export default function EgitimModeliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
