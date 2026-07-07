// Hand-written types matching admin/supabase/migrations/0001_init.sql.
// Once the project is linked to a live Supabase instance, these can be
// regenerated authoritatively with:
//   supabase gen types typescript --project-id <ref> > src/types/database.ts

export type MediaKind = "image" | "video";
export type ProjectAccount = "youssef" | "prodyous";
export type ProjectMediaType = "reel" | "photo";
export type TestimonialPlatform = "whatsapp" | "instagram";

export interface MediaCollection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface MediaAsset {
  id: string;
  collection_id: string | null;
  storage_path: string;
  storage_bucket: string;
  public_url: string;
  kind: MediaKind;
  mime_type: string;
  width: number | null;
  height: number | null;
  duration_seconds: number | null;
  file_size_bytes: number;
  original_file_size_bytes: number | null;
  alt_text: string | null;
  caption: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  highlight: string | null;
  icon_name: string | null;
  is_published: boolean;
  is_offered_in_contact_form: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  caption: string | null;
  category: string;
  service_id: string | null;
  account: ProjectAccount;
  media_type: ProjectMediaType;
  instagram_url: string | null;
  featured_media_id: string | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioProjectMedia {
  project_id: string;
  media_id: string;
  sort_order: number;
}

export interface Tag {
  id: string;
  name: string;
}

export interface PortfolioProjectTag {
  project_id: string;
  tag_id: string;
}

export interface Testimonial {
  id: string;
  platform: TestimonialPlatform;
  author_name: string | null;
  flag_emoji: string | null;
  country: string | null;
  quote: string;
  context: string | null;
  likes_count: number | null;
  display_timestamp: string | null;
  rating: number | null;
  avatar_media_id: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface HomeHero {
  id: true;
  headline: string;
  subtext: string;
  cta_primary_label: string | null;
  cta_primary_href: string | null;
  cta_secondary_label: string | null;
  cta_secondary_href: string | null;
  background_media_id: string | null;
  profile_badge_text: string | null;
  agency_tag_text: string | null;
  updated_at: string;
}

export interface HomeHeroStat {
  id: string;
  value: string;
  label: string;
  sort_order: number;
}

export interface HomeMosaicImage {
  id: string;
  media_id: string;
  sort_order: number;
}

export interface StatsBarItem {
  id: string;
  value: string;
  label: string;
  note: string | null;
  sort_order: number;
}

export interface AboutPage {
  id: true;
  eyebrow: string | null;
  heading: string;
  bio_paragraph_1: string | null;
  bio_paragraph_2: string | null;
  main_image_media_id: string | null;
  profile_photo_media_id: string | null;
  location_badge_line_1: string | null;
  location_badge_line_2: string | null;
  cta_1_label: string | null;
  cta_1_href: string | null;
  cta_2_label: string | null;
  cta_2_href: string | null;
  updated_at: string;
}

export interface AboutHighlight {
  id: string;
  label: string;
  count: string;
  sort_order: number;
}

export interface ContactInfo {
  id: true;
  eyebrow: string | null;
  heading: string | null;
  location: string | null;
  email: string;
  phone: string | null;
  hours: string | null;
  updated_at: string;
}

export interface ContactInstagramHandle {
  id: string;
  handle: string;
  description: string | null;
  href: string | null;
  sort_order: number;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon_name: string | null;
  sort_order: number;
}

export interface SiteSettings {
  id: true;
  logo_media_id: string | null;
  favicon_media_id: string | null;
  wordmark_text: string | null;
  tagline: string | null;
  color_navy: string;
  color_white: string;
  copyright_template: string;
  updated_at: string;
}

export interface SeoPage {
  id: string;
  page_key: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image_media_id: string | null;
  canonical_url: string | null;
  updated_at: string;
}

export interface ActivityLogEntry {
  id: string;
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  entity_label: string | null;
  created_at: string;
}

type TableDef<Row, Insert = Partial<Row>, Update = Partial<Row>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export interface Database {
  public: {
    Tables: {
      media_collections: TableDef<MediaCollection>;
      media_assets: TableDef<MediaAsset>;
      services: TableDef<Service>;
      portfolio_projects: TableDef<PortfolioProject>;
      portfolio_project_media: TableDef<PortfolioProjectMedia>;
      tags: TableDef<Tag>;
      portfolio_project_tags: TableDef<PortfolioProjectTag>;
      testimonials: TableDef<Testimonial>;
      home_hero: TableDef<HomeHero>;
      home_hero_stats: TableDef<HomeHeroStat>;
      home_mosaic_images: TableDef<HomeMosaicImage>;
      stats_bar: TableDef<StatsBarItem>;
      about_page: TableDef<AboutPage>;
      about_highlights: TableDef<AboutHighlight>;
      contact_info: TableDef<ContactInfo>;
      contact_instagram_handles: TableDef<ContactInstagramHandle>;
      social_links: TableDef<SocialLink>;
      site_settings: TableDef<SiteSettings>;
      seo_pages: TableDef<SeoPage>;
      activity_log: TableDef<ActivityLogEntry>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
