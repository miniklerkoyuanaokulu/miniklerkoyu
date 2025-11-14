export type Section = {
  id: string;
  title: string;
  body: string;
  images: string[];
  order: number;
  updatedAt?: number;
};

export type MediaItem = {
  id: string;
  type: "image" | "video";
  url: string;
  caption?: string;
  tags?: string[];
  order?: number; // Drag & drop sıralaması için
  publishedAt?: number;
  createdAt?: number;
  // Video-specific fields
  source?: "upload" | "youtube"; // Video kaynağı
  thumbnailUrl?: string; // YouTube thumbnail veya video önizlemesi
};

export type PageDoc = {
  slug: "kurumsal" | "egitim-modelimiz" | "neden-minikler-koyu" | "medya" | "iletisim";
  hero?: { title: string; subtitle?: string; imageUrl?: string };
  sections?: Section[];
  items?: MediaItem[];
  address?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  mapEmbedUrl?: string;
  formSettings?: {
    enabled: boolean;
    captcha: "none" | "recaptcha" | "hcaptcha";
    notifyEmails?: string[];
  };
  updatedAt?: number;
};

export type PreApplication = {
  childFirstName: string;
  childLastName: string;
  birthDate: string; // ISO
  parentFirstName: string;
  parentLastName: string;
  phone: string;
  email: string;
  preferredClass?: string;
  preferredTime?: string;
  message?: string;
  kvkkApproved: boolean;
  status: "new" | "reviewed" | "contacted" | "archived";
  createdAt: number;
  ip?: string;
};

export type InstagramPost = {
  id: string;
  url: string; // Instagram post URL
  caption?: string;
  thumbnailUrl?: string; // Opsiyonel: thumbnail için
  order: number;
  isActive: boolean;
  createdAt: number;
  updatedAt?: number;
};

export type Announcement = {
  id: string;
  title: string;
  slug: string;
  content: string;
  date: number; // Duyuru tarihi (timestamp)
  createdAt: number;
  updatedAt?: number;
};


