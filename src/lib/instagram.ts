/**
 * Instagram Utilities
 *
 * Instagram post'larından thumbnail ve metadata çekme fonksiyonları.
 *
 * ⚠️ ÖNEMLİ NOTLAR:
 *
 * 1. Rate Limiting:
 *    - Instagram oEmbed API rate-limitlidir (~200 istek/saat)
 *    - Bu fonksiyonları SADECE admin panelde kullanın
 *    - Medya sayfasında Instagram API'sine istek atmayın
 *
 * 2. Optimizasyon Stratejisi:
 *    - Admin panelde: URL eklendiğinde thumbnail'i ÇEK
 *    - Firestore'a: URL + thumbnailUrl olarak KAYDET
 *    - Medya sayfasında: Firestore'dan OKU (Instagram API'sine istek yok)
 *
 * 3. Endpoint:
 *    - Public oEmbed: https://www.instagram.com/oembed/
 *    - Token gerektirmez
 *    - Reels, Posts, IGTV destekler
 */

export interface InstagramMetadata {
  thumbnailUrl: string;
  title?: string;
  authorName?: string;
}

/**
 * Instagram post URL'sinden otomatik thumbnail çeker
 * Public oEmbed API kullanır (rate limit: ~200 istek/saat)
 */
export async function fetchInstagramThumbnail(
  postUrl: string
): Promise<string | null> {
  try {
    const oembedUrl = `https://www.instagram.com/oembed/?url=${encodeURIComponent(
      postUrl
    )}`;
    const response = await fetch(oembedUrl);

    if (!response.ok) {
      throw new Error("Thumbnail alınamadı");
    }

    const data = await response.json();
    return data.thumbnail_url || null;
  } catch (error) {
    console.error("Instagram thumbnail çekme hatası:", error);
    return null;
  }
}

/**
 * Instagram post URL'sinden metadata çeker
 * Thumbnail, başlık ve yazar bilgilerini döner
 * ÖNEMLİ: Bu fonksiyonu sadece admin panelde, post eklerken kullanın.
 * Rate limit: ~200 istek/saat
 */
export async function fetchInstagramMetadata(
  postUrl: string
): Promise<InstagramMetadata | null> {
  try {
    const oembedUrl = `https://www.instagram.com/oembed/?url=${encodeURIComponent(
      postUrl
    )}`;
    const response = await fetch(oembedUrl);

    if (!response.ok) {
      throw new Error("Metadata çekilemedi");
    }

    const data = await response.json();

    return {
      thumbnailUrl: data.thumbnail_url || "",
      title: data.title || "",
      authorName: data.author_name || "",
    };
  } catch (error) {
    console.error("Instagram metadata çekme hatası:", error);
    return null;
  }
}

/**
 * Instagram URL validasyonu
 */
export function isValidInstagramUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?instagram\.com\/p\/[\w-]+\/?/,
    /^https?:\/\/(www\.)?instagram\.com\/reel\/[\w-]+\/?/,
    /^https?:\/\/(www\.)?instagram\.com\/tv\/[\w-]+\/?/,
  ];

  return patterns.some((pattern) => pattern.test(url));
}

/**
 * Instagram post ID'sini URL'den çıkar
 */
export function extractInstagramPostId(url: string): string | null {
  const match = url.match(/\/(p|reel|tv)\/([\w-]+)/);
  return match ? match[2] : null;
}

/**
 * Instagram URL'sini temizler (query parametrelerini kaldırır)
 * Örnek: https://www.instagram.com/reel/ABC/?igsh=xyz → https://www.instagram.com/reel/ABC/
 */
export function cleanInstagramUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // Query parametrelerini kaldır
    urlObj.search = "";
    // Hash'i kaldır
    urlObj.hash = "";
    return urlObj.toString();
  } catch {
    return url;
  }
}
