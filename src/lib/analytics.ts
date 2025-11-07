// Google Analytics 4 (GA4) utility fonksiyonları

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Sayfa görünümünü izle
export const pageview = (url: string) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;
  if (!GA_MEASUREMENT_ID) return;

  window.gtag("event", "page_view", {
    page_path: url,
  });
};

// Genel event tracking
interface GTagEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;
  if (!GA_MEASUREMENT_ID) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Özel event fonksiyonları - Siteniz için özelleştirilmiş

// Buton tıklamaları
export const trackButtonClick = (buttonName: string, location: string) => {
  event({
    action: "click",
    category: "Button",
    label: `${buttonName} - ${location}`,
  });
};

// Form gönderimi
export const trackFormSubmit = (formName: string, success: boolean) => {
  event({
    action: success ? "form_submit_success" : "form_submit_error",
    category: "Form",
    label: formName,
  });
};

// Telefon numarası tıklama
export const trackPhoneClick = (location: string) => {
  event({
    action: "click_to_call",
    category: "Contact",
    label: location,
  });
};

// WhatsApp tıklama
export const trackWhatsAppClick = (location: string) => {
  event({
    action: "click_whatsapp",
    category: "Contact",
    label: location,
  });
};

// Instagram tıklama
export const trackInstagramClick = (location: string) => {
  event({
    action: "click_instagram",
    category: "Social Media",
    label: location,
  });
};

// Email tıklama
export const trackEmailClick = (location: string) => {
  event({
    action: "click_email",
    category: "Contact",
    label: location,
  });
};

// Dış link tıklama
export const trackOutboundLink = (url: string, linkText: string) => {
  event({
    action: "click_outbound",
    category: "Outbound Link",
    label: `${linkText} - ${url}`,
  });
};

// Video oynatma
export const trackVideoPlay = (videoTitle: string) => {
  event({
    action: "play",
    category: "Video",
    label: videoTitle,
  });
};

// Fotoğraf görüntüleme
export const trackImageView = (imageName: string, gallery: string) => {
  event({
    action: "view",
    category: "Image",
    label: `${gallery} - ${imageName}`,
  });
};

// Scroll derinliği
export const trackScrollDepth = (percentage: number) => {
  event({
    action: "scroll",
    category: "Engagement",
    label: `${percentage}%`,
    value: percentage,
  });
};

// Sayfa üzerinde kalma süresi
export const trackTimeOnPage = (seconds: number, pageName: string) => {
  event({
    action: "time_on_page",
    category: "Engagement",
    label: pageName,
    value: seconds,
  });
};

// Ön kayıt formu başlatma
export const trackPreRegistrationStart = () => {
  event({
    action: "start",
    category: "Pre-Registration",
    label: "Form Started",
  });
};

// Ön kayıt formu tamamlama
export const trackPreRegistrationComplete = () => {
  event({
    action: "complete",
    category: "Pre-Registration",
    label: "Form Completed",
  });
};

// Gezinme menüsü kullanımı
export const trackNavigation = (itemName: string) => {
  event({
    action: "click",
    category: "Navigation",
    label: itemName,
  });
};

// Mobil menü açma/kapama
export const trackMobileMenu = (action: "open" | "close") => {
  event({
    action,
    category: "Mobile Menu",
    label: action === "open" ? "Menu Opened" : "Menu Closed",
  });
};

// Arama kullanımı (eğer site araması eklerseniz)
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  event({
    action: "search",
    category: "Search",
    label: searchTerm,
    value: resultsCount,
  });
};

// Hata izleme
export const trackError = (errorMessage: string, errorLocation: string) => {
  event({
    action: "error",
    category: "Error",
    label: `${errorLocation}: ${errorMessage}`,
  });
};
