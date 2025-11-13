import type { PageDoc } from "./types";

const mockPages: Record<string, PageDoc> = {
  kurumsal: {
    slug: "kurumsal",
    hero: { title: "Kurumsal", subtitle: "Minikler Köyü" },
    sections: [
      { id: "hakkimizda", title: "Hakkımızda", body: "<p>...</p>", images: [], order: 1 },
      { id: "tarihcemiz", title: "Tarihçemiz", body: "<p>...</p>", images: [], order: 2 },
      { id: "kurucumuz", title: "Kurucumuz", body: "<p>...</p>", images: [], order: 3 },
      { id: "misyonumuz", title: "Misyonumuz", body: "<p>...</p>", images: [], order: 4 },
      { id: "vizyonumuz", title: "Vizyonumuz", body: "<p>...</p>", images: [], order: 5 },
      { id: "felsefemiz", title: "Felsefemiz", body: "<p>...</p>", images: [], order: 6 },
      { id: "ekibimiz", title: "Ekibimiz", body: "<p>...</p>", images: [], order: 7 },
    ],
  },
  "egitim-modelimiz": {
    slug: "egitim-modelimiz",
    hero: { title: "Eğitim Modelimiz", subtitle: "Minikler Köyü" },
    sections: [
      { id: "derslerimiz", title: "Derslerimiz", body: "<p>...</p>", images: [], order: 1 },
      { id: "gunumuz-nasil-gecer", title: "Günümüz Nasıl Geçer", body: "<p>...</p>", images: [], order: 2 },
      { id: "olcme-degerlendirme", title: "Ölçme Değerlendirme Süreçlerimiz", body: "<p>...</p>", images: [], order: 3 },
      { id: "rehberlik", title: "Rehberlik", body: "<p>...</p>", images: [], order: 4 },
      { id: "veli-bilgilendirme", title: "Veli Bilgilendirme Süreçlerimiz", body: "<p>...</p>", images: [], order: 5 },
      { id: "sosyal-etkinlikler", title: "Sosyal Etkinliklerimiz", body: "<p>...</p>", images: [], order: 6 },
    ],
  },
  "neden-minikler-koyu": {
    slug: "neden-minikler-koyu",
    hero: { title: "Neden Minikler Köyü?" },
    sections: [
      { id: "beslenme", title: "Beslenme", body: "<p>...</p>", images: [], order: 1 },
      { id: "fiziksel-kosullar", title: "Fiziksel Koşullar", body: "<p>...</p>", images: [], order: 2 },
      { id: "guvenlik", title: "Güvenlik", body: "<p>...</p>", images: [], order: 3 },
    ],
  },
  medya: {
    slug: "medya",
    items: [],
  },
  iletisim: {
    slug: "iletisim",
    address: "...",
    phone: "...",
    email: "...",
    formSettings: { enabled: true, captcha: "none" },
  },
};

export async function getPageData(slug: keyof typeof mockPages): Promise<PageDoc> {
  // TODO: Replace with Firestore read
  await new Promise((r) => setTimeout(r, 50));
  return mockPages[slug];
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Türkçe karakterleri dönüştür ve slug oluştur
export function generateSlug(text: string): string {
  const turkishMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U',
  };

  return text
    .split('')
    .map(char => turkishMap[char] || char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Özel karakterleri kaldır
    .replace(/[\s_]+/g, '-') // Boşlukları tire ile değiştir
    .replace(/^-+|-+$/g, ''); // Başta ve sondaki tireleri kaldır
}
