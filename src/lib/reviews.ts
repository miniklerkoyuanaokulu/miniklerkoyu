// lib/reviews.ts - Veli yorumları yönetimi
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Review {
  id?: string;
  author_name: string;
  rating: number;
  text: string;
  reviewDate?: string | Date; // ISO string veya Date object (manuel yorumlar için)
  time?: string; // Formatlanmış tarih
  relative_time?: string; // Google'dan gelenler için
  profile_photo_url?: string;
  source: "google" | "manual"; // Nereden geldiğini belirt
  createdAt?: Timestamp;
  isActive?: boolean; // Admin onayı için
}

// Göreceli zamanı hesapla (dinamik)
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffDays === 0) return "Bugün";
  if (diffDays === 1) return "Dün";
  if (diffDays < 7) return `${diffDays} gün önce`;
  if (diffWeeks === 1) return "1 hafta önce";
  if (diffWeeks < 4) return `${diffWeeks} hafta önce`;
  if (diffMonths === 1) return "1 ay önce";
  if (diffMonths < 12) return `${diffMonths} ay önce`;
  if (diffYears === 1) return "1 yıl önce";
  return `${diffYears} yıl önce`;
}

// Firestore'a manuel yorum ekle
export async function addManualReview(
  review: Pick<Review, "author_name" | "rating" | "text"> & { reviewDate: Date }
) {
  try {
    const docRef = await addDoc(collection(db, "reviews"), {
      author_name: review.author_name,
      rating: review.rating,
      text: review.text,
      reviewDate: Timestamp.fromDate(review.reviewDate),
      source: "manual",
      createdAt: Timestamp.now(),
      isActive: true,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
}

// Firestore'dan manuel yorumları çek
export async function getManualReviews(): Promise<Review[]> {
  try {
    // Basit query - index gerektirmeyen
    const snapshot = await getDocs(collection(db, "reviews"));
    
    // Client-side filtreleme ve sıralama
    const reviews = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        const reviewDate = data.reviewDate?.toDate();
        
        return {
          id: doc.id,
          author_name: data.author_name,
          rating: data.rating,
          text: data.text,
          reviewDate: reviewDate ? reviewDate.toISOString() : undefined, // ISO string olarak döndür
          time: reviewDate
            ? reviewDate.toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : data.time,
          relative_time: reviewDate ? getRelativeTime(reviewDate) : data.relative_time,
          profile_photo_url: data.profile_photo_url,
          source: data.source || "manual",
          createdAt: data.createdAt,
        };
      })
      .filter((r) => r.rating === 5) // Sadece 5 yıldızlılar
      .sort((a, b) => {
        // En yeni yorumlar önce
        const timeA = a.createdAt?.toMillis() || 0;
        const timeB = b.createdAt?.toMillis() || 0;
        return timeB - timeA;
      });

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

// Tüm yorumları birleştir (Google + Manuel)
export async function getAllReviews(): Promise<Review[]> {
  const manualReviews = await getManualReviews();
  
  // Google yorumlarını API'den çek
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/google-reviews`
    );
    const googleData = await response.json();
    
    if (googleData.reviews) {
      // Google yorumlarına source ekle
      const googleReviews = googleData.reviews.map((r: Review) => ({
        ...r,
        source: "google" as const,
      }));
      
      // Birleştir ve karıştır
      const allReviews = [...googleReviews, ...manualReviews];
      
      // Shuffle - rastgele sırala
      return allReviews.sort(() => Math.random() - 0.5);
    }
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
  }

  // Google yorumları alınamazsa sadece manuel yorumlar
  return manualReviews;
}

