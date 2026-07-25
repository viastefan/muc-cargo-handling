/** Shared CMS types — safe for client imports (no Node fs). */

export type InquiryStatus = "neu" | "in_arbeit" | "erledigt";
export type NewsStatus = "draft" | "published";
export type OpsLevel = "normal" | "hinweis" | "stoerung" | "kritisch";

export type BusinessProfile = {
  legalName: string;
  brandName: string;
  shortName: string;
  tagline: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  phone: string;
  phoneTel: string;
  emergencyPhone: string;
  emergencyPhoneTel: string;
  email: string;
  instagram: string;
  linkedin: string;
  hoursWeekday: string;
  hoursWeekend: string;
  mapsUrl: string;
  logoUrl: string;
  regAgent: string;
};

export type SiteContent = {
  homeHeroEyebrow: string;
  homeHeroTitle: string;
  homeHeroLede: string;
  homeHeroCtaLabel: string;
  homeHeroCtaHref: string;
  closingTitle: string;
  closingLede: string;
  aboutIntro: string;
  aboutBody: string;
};

export type NewsPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverUrl: string;
  category: string;
  status: NewsStatus;
  featured: boolean;
  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;
  sortOrder: number;
};

export type ServiceItem = {
  id: string;
  title: string;
  summary: string;
  href: string;
  visible: boolean;
  sortOrder: number;
  updatedAt: string;
};

export type OpsStatus = {
  level: OpsLevel;
  title: string;
  message: string;
  publicVisible: boolean;
  validUntil: string | null;
  updatedAt: string;
};

export type TopBanner = {
  text: string;
  href: string;
  active: boolean;
  style: "brand" | "dark" | "warn";
  updatedAt: string;
};

export type Inquiry = {
  id: string;
  reference: string;
  topic: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  message: string;
  status: InquiryStatus;
  internalNote: string;
  createdAt: string;
  updatedAt: string;
};

export type JobPost = {
  id: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  body: string;
  active: boolean;
  sortOrder: number;
  updatedAt: string;
  createdAt: string;
};

export type FaqItem = {
  id: string;
  group: string;
  question: string;
  answer: string;
  sortOrder: number;
  updatedAt: string;
};

export type DocumentItem = {
  id: string;
  title: string;
  category: string;
  url: string;
  description: string;
  sortOrder: number;
  updatedAt: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  photoUrl: string;
  visible: boolean;
  sortOrder: number;
  updatedAt: string;
};

export type AdminAuth = {
  passwordSalt: string;
  passwordHash: string;
  iterations: number;
  notificationEmail: string;
  updatedAt: string;
};

export type PersistMeta = {
  lastWriteAt: string | null;
  lastWriteSource: string | null;
  backend: "filesystem" | "memory";
  ok: boolean;
  detail: string;
};

export type CmsData = {
  version: 1;
  businessProfile: BusinessProfile;
  siteContent: SiteContent;
  newsPosts: NewsPost[];
  services: ServiceItem[];
  opsStatus: OpsStatus;
  topBanner: TopBanner;
  inquiries: Inquiry[];
  jobs: JobPost[];
  faqs: FaqItem[];
  documents: DocumentItem[];
  team: TeamMember[];
  auth: AdminAuth;
  meta: PersistMeta;
};

export type SaveResult = {
  ok: boolean;
  error?: string;
  savedAt?: string;
};
