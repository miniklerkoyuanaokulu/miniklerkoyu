// app/api/reviews/manual/route.ts
import { NextResponse } from "next/server";
import { getManualReviews } from "@/lib/reviews";

export async function GET() {
  try {
    const reviews = await getManualReviews();
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Error fetching manual reviews:", error);
    return NextResponse.json(
      { error: "Manuel yorumlar alınamadı", reviews: [] },
      { status: 500 }
    );
  }
}

