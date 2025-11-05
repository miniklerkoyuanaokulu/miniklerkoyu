import { MetadataRoute } from 'next'

/**
 * Sitemap Generator
 * 
 * Bu dosya otomatik olarak /sitemap.xml endpoint'ini oluşturur.
 * Erişim: https://miniklerkoyu.vercel.app/sitemap.xml
 * 
 * Domain değişikliğinde baseUrl'i güncelleyin.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://miniklerkoyu.vercel.app'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/kurumsal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/egitim-modelimiz`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neden-minikler-koyu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/medya`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kvkk`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}

