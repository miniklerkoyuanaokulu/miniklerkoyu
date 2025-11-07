export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://miniklerkoyuanaokulu.com/#organization",
        "name": "Varda Minikler Köyü Anaokulu",
        "alternateName": "Minikler Köyü",
        "url": "https://miniklerkoyuanaokulu.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://miniklerkoyuanaokulu.com/web-app-manifest-512x512.png",
          "width": 512,
          "height": 512
        },
        "description": "Adana Çukurova'da, doğanın içinde çocuklarınız için modern eğitim anlayışıyla okul öncesi eğitim hizmeti sunuyoruz.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Fuar Alanı Kavşağı, Prof. Dr. Necmettin Erbakan Bulvarı 262/1A",
          "addressLocality": "Çukurova",
          "addressRegion": "Adana",
          "addressCountry": "TR"
        },
        "telephone": "+90-552-289-71-91",
        "email": "info@vardaokullari.com",
        "sameAs": [
          "https://instagram.com/vardaliminiklerkoyu"
        ],
        "areaServed": {
          "@type": "City",
          "name": "Adana"
        },
        "priceRange": "$$"
      },
      {
        "@type": "WebSite",
        "@id": "https://miniklerkoyuanaokulu.com/#website",
        "url": "https://miniklerkoyuanaokulu.com",
        "name": "Varda Minikler Köyü",
        "description": "Doğayla iç içe anaokulu ve okul öncesi eğitim",
        "publisher": {
          "@id": "https://miniklerkoyuanaokulu.com/#organization"
        },
        "inLanguage": "tr-TR"
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://miniklerkoyuanaokulu.com/#localbusiness",
        "name": "Varda Minikler Köyü Anaokulu",
        "image": [
          "https://miniklerkoyuanaokulu.com/og-image.jpg",
          "https://miniklerkoyuanaokulu.com/web-app-manifest-512x512.png"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Fuar Alanı Kavşağı, Prof. Dr. Necmettin Erbakan Bulvarı 262/1A",
          "addressLocality": "Çukurova",
          "addressRegion": "Adana",
          "postalCode": "01000",
          "addressCountry": "TR"
        },
        "telephone": "+90-552-289-71-91",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "08:00",
            "closes": "18:00"
          }
        ],
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 36.9925,
          "longitude": 35.3213
        },
        "priceRange": "$$"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

