import { NextRequest, NextResponse } from "next/server";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(request: NextRequest) {
  try {
    console.log("API route çağrıldı");
    
    const body = await request.json();
    console.log("Body alındı:", body);

    // Validasyon
    if (!body.parentName || !body.childName || !body.birthDate || !body.phone || !body.email) {
      console.error("Validasyon hatası: Gerekli alanlar eksik");
      return NextResponse.json(
        { error: "Gerekli alanlar eksik" },
        { status: 400 }
      );
    }

    if (!body.consentApproved) {
      console.error("Validasyon hatası: KVKK onayı yok");
      return NextResponse.json(
        { error: "KVKK onayı gerekli" },
        { status: 400 }
      );
    }

    // Firebase config kontrolü
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      console.error("Firebase config eksik");
      return NextResponse.json(
        { error: "Firebase konfigürasyonu eksik. Lütfen .env.local dosyasını kontrol edin." },
        { status: 500 }
      );
    }

    // Firestore'a kaydet
    const preApplicationData = {
      parentName: body.parentName,
      childName: body.childName,
      birthDate: body.birthDate,
      phone: body.phone,
      email: body.email,
      message: body.message || "",
      consentApproved: body.consentApproved,
      status: "new" as const,
      createdAt: Date.now(),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
    };

    console.log("Firestore'a kaydediliyor:", preApplicationData);

    const docRef = await addDoc(collection(db, "preApplications"), preApplicationData);
    console.log("Firestore kaydı başarılı, ID:", docRef.id);

    // Email bildirimi gönder (async, hata olsa bile kullanıcıyı etkilemesin)
    try {
      console.log("Email gönderiliyor...");
      await fetch(`${request.nextUrl.origin}/api/send-notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "pre-registration",
          data: {
            id: docRef.id,
            ...body,
          },
        }),
      });
      console.log("Email gönderildi");
    } catch (emailError) {
      // Email hatası kullanıcıyı etkilemesin
      console.error("Email gönderimi başarısız (önemli değil):", emailError);
    }

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: "Ön kayıt başvurunuz alındı",
    });
  } catch (error) {
    console.error("API route genel hatası:", error);
    return NextResponse.json(
      { 
        error: "Başvuru kaydedilemedi",
        details: error instanceof Error ? error.message : "Bilinmeyen hata"
      },
      { status: 500 }
    );
  }
}
