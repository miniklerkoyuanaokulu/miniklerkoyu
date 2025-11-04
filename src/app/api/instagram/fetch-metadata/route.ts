import { NextRequest, NextResponse } from "next/server";

// URL temizleme fonksiyonu
function cleanInstagramUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // Query parametrelerini ve hash'i kaldır
    urlObj.search = "";
    urlObj.hash = "";
    return urlObj.toString();
  } catch {
    return url;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || !url.includes("instagram.com")) {
      return NextResponse.json(
        { error: "Geçerli bir Instagram URL'si gerekli" },
        { status: 400 }
      );
    }

    // URL'yi temizle (query parametrelerini kaldır)
    const cleanedUrl = cleanInstagramUrl(url);
    console.log("Orijinal URL:", url);
    console.log("Temizlenmiş URL:", cleanedUrl);

    // Instagram oEmbed API - Server-side'dan çağır (CORS yok)
    const oembedUrl = `https://www.instagram.com/oembed/?url=${encodeURIComponent(
      cleanedUrl
    )}`;

    console.log("Instagram oEmbed çağrılıyor:", oembedUrl);

    const response = await fetch(oembedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; VardaMiniklerKoyu/1.0)",
      },
    });

    if (!response.ok) {
      console.error(
        "Instagram API hatası:",
        response.status,
        response.statusText
      );
      const text = await response.text();
      console.error("Instagram yanıtı:", text.substring(0, 200));

      return NextResponse.json(
        {
          error:
            "Instagram'dan veri alınamadı. URL'nin doğru olduğundan emin olun.",
        },
        { status: response.status }
      );
    }

    // Response content type kontrolü
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Instagram JSON döndürmedi, content-type:", contentType);
      const text = await response.text();
      console.error(
        "Instagram HTML döndürdü (ilk 200 karakter):",
        text.substring(0, 200)
      );

      return NextResponse.json(
        {
          error:
            "Instagram bu URL için metadata sağlamıyor. URL'deki extra parametreleri kaldırıp tekrar deneyin.",
          details: "oEmbed API bu URL formatını desteklemiyor olabilir",
        },
        { status: 400 }
      );
    }

    const data = await response.json();
    console.log("Instagram metadata alındı:", data);

    return NextResponse.json({
      success: true,
      thumbnailUrl: data.thumbnail_url || "",
      title: data.title || "",
      authorName: data.author_name || "",
    });
  } catch (error) {
    console.error("Instagram metadata hatası:", error);
    return NextResponse.json(
      {
        error: "Instagram'dan veri çekilemedi",
        details: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 }
    );
  }
}
