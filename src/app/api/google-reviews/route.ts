// app/api/google-reviews/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

  // Debug için log
  console.log("API Key mevcut:", !!apiKey);
  console.log("Place ID mevcut:", !!placeId);

  if (!apiKey || !placeId) {
    console.error("Eksik environment variables:", { 
      hasApiKey: !!apiKey, 
      hasPlaceId: !!placeId 
    });
    return NextResponse.json(
      { error: "API key veya Place ID eksik. .env.local dosyasını kontrol edin." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&language=tr&key=${apiKey}`,
      {
        next: { revalidate: 3600 }, // Cache 1 saat
      }
    );

    const data = await res.json();

    console.log("Google API Response Status:", data.status);

    if (data.status !== "OK") {
      console.error("Google API Error:", {
        status: data.status,
        error_message: data.error_message
      });
      return NextResponse.json(
        { 
          error: data.error_message || "Google API hatası",
          status: data.status,
          details: "Google Places API yanıt vermedi. API key ve Place ID'yi kontrol edin."
        },
        { status: 500 }
      );
    }

    // Sadece 5 yıldızlı yorumları al
    const allReviews = data.result.reviews || [];
    const positiveReviews = allReviews.filter((r: any) => r.rating === 5);

    // Yorumları formatla
    const reviews = positiveReviews.map((r: any) => ({
      author_name: r.author_name,
      rating: r.rating,
      text: r.text,
      time: new Date(r.time * 1000).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      relative_time: r.relative_time_description,
      profile_photo_url: r.profile_photo_url,
    }));

    return NextResponse.json({
      reviews,
      totalRating: data.result.rating,
      totalReviews: data.result.user_ratings_total,
    });
  } catch (err) {
    console.error("Google Reviews API Error:", err);
    return NextResponse.json(
      { 
        error: "Sunucu hatası",
        details: err instanceof Error ? err.message : "Bilinmeyen hata"
      },
      { status: 500 }
    );
  }
}

