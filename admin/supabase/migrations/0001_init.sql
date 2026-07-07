-- Prodyous Admin CMS — initial schema
-- Run this once in the Supabase SQL editor (or via `supabase db push`) on a
-- freshly created project. Safe to re-run only if you drop the tables first.

create extension if not exists pgcrypto;

-- ==========================================================================
-- 0. Shared trigger for updated_at
-- ==========================================================================
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ==========================================================================
-- 1. MEDIA LIBRARY
-- ==========================================================================
create table media_collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table media_assets (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid references media_collections(id) on delete set null,
  storage_path text not null,
  storage_bucket text not null default 'media',
  public_url text not null,
  kind text not null check (kind in ('image', 'video')),
  mime_type text not null,
  width integer,
  height integer,
  duration_seconds numeric,
  file_size_bytes bigint not null,
  original_file_size_bytes bigint,
  alt_text text,
  caption text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index media_assets_collection_idx on media_assets (collection_id, sort_order);

-- ==========================================================================
-- 2. SERVICES (single source of truth)
-- ==========================================================================
create table services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text not null,
  highlight text,
  icon_name text,
  is_published boolean not null default true,
  is_offered_in_contact_form boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ==========================================================================
-- 3. PORTFOLIO PROJECTS
-- ==========================================================================
create table portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  caption text,
  category text not null,
  service_id uuid references services(id) on delete set null,
  account text not null check (account in ('youssef', 'prodyous')),
  media_type text not null check (media_type in ('reel', 'photo')),
  instagram_url text,
  featured_media_id uuid references media_assets(id) on delete set null,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index portfolio_projects_list_idx on portfolio_projects (account, is_published, sort_order);
create index portfolio_projects_featured_idx on portfolio_projects (is_featured) where is_featured;

create table portfolio_project_media (
  project_id uuid not null references portfolio_projects(id) on delete cascade,
  media_id uuid not null references media_assets(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (project_id, media_id)
);

create table tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

create table portfolio_project_tags (
  project_id uuid not null references portfolio_projects(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  primary key (project_id, tag_id)
);

-- ==========================================================================
-- 4. TESTIMONIALS
-- ==========================================================================
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('whatsapp', 'instagram')),
  author_name text,
  flag_emoji text,
  country text,
  quote text not null,
  context text,
  likes_count integer,
  display_timestamp text,
  rating smallint check (rating between 1 and 5),
  avatar_media_id uuid references media_assets(id) on delete set null,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index testimonials_list_idx on testimonials (is_published, sort_order);

-- ==========================================================================
-- 5. SINGLETON CONTENT TABLES
-- ==========================================================================
create table home_hero (
  id boolean primary key default true check (id = true),
  headline text not null,
  subtext text not null,
  cta_primary_label text,
  cta_primary_href text,
  cta_secondary_label text,
  cta_secondary_href text,
  background_media_id uuid references media_assets(id) on delete set null,
  profile_badge_text text,
  agency_tag_text text,
  updated_at timestamptz not null default now()
);

create table home_hero_stats (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  sort_order integer not null default 0
);

create table home_mosaic_images (
  id uuid primary key default gen_random_uuid(),
  media_id uuid not null references media_assets(id) on delete cascade,
  sort_order integer not null default 0
);

create table stats_bar (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  note text,
  sort_order integer not null default 0
);

create table about_page (
  id boolean primary key default true check (id = true),
  eyebrow text,
  heading text not null,
  bio_paragraph_1 text,
  bio_paragraph_2 text,
  main_image_media_id uuid references media_assets(id) on delete set null,
  profile_photo_media_id uuid references media_assets(id) on delete set null,
  location_badge_line_1 text,
  location_badge_line_2 text,
  cta_1_label text,
  cta_1_href text,
  cta_2_label text,
  cta_2_href text,
  updated_at timestamptz not null default now()
);

create table about_highlights (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  count text not null,
  sort_order integer not null default 0
);

create table contact_info (
  id boolean primary key default true check (id = true),
  eyebrow text,
  heading text,
  location text,
  email text not null default 'contact@prodyous.com',
  phone text,
  hours text,
  updated_at timestamptz not null default now()
);

create table contact_instagram_handles (
  id uuid primary key default gen_random_uuid(),
  handle text not null,
  description text,
  href text,
  sort_order integer not null default 0
);

create table social_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  icon_name text,
  sort_order integer not null default 0
);

create table site_settings (
  id boolean primary key default true check (id = true),
  logo_media_id uuid references media_assets(id) on delete set null,
  favicon_media_id uuid references media_assets(id) on delete set null,
  wordmark_text text,
  tagline text,
  color_navy text not null default '#1B1F6B',
  color_white text not null default '#FFFFFF',
  copyright_template text not null default '© {year} Prodyous. All rights reserved.',
  updated_at timestamptz not null default now()
);

-- ==========================================================================
-- 6. SEO
-- ==========================================================================
create table seo_pages (
  id uuid primary key default gen_random_uuid(),
  page_key text unique not null,
  meta_title text,
  meta_description text,
  og_image_media_id uuid references media_assets(id) on delete set null,
  canonical_url text,
  updated_at timestamptz not null default now()
);

-- ==========================================================================
-- 7. ACTIVITY LOG
-- ==========================================================================
create table activity_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  entity_label text,
  created_at timestamptz not null default now()
);
create index activity_log_created_idx on activity_log (created_at desc);

-- ==========================================================================
-- updated_at triggers
-- ==========================================================================
create trigger trg_media_collections_updated before update on media_collections for each row execute function set_updated_at();
create trigger trg_media_assets_updated       before update on media_assets       for each row execute function set_updated_at();
create trigger trg_services_updated           before update on services           for each row execute function set_updated_at();
create trigger trg_portfolio_projects_updated before update on portfolio_projects for each row execute function set_updated_at();
create trigger trg_testimonials_updated       before update on testimonials       for each row execute function set_updated_at();
create trigger trg_home_hero_updated          before update on home_hero          for each row execute function set_updated_at();
create trigger trg_about_page_updated         before update on about_page         for each row execute function set_updated_at();
create trigger trg_contact_info_updated       before update on contact_info       for each row execute function set_updated_at();
create trigger trg_site_settings_updated      before update on site_settings      for each row execute function set_updated_at();
create trigger trg_seo_pages_updated          before update on seo_pages          for each row execute function set_updated_at();

-- ==========================================================================
-- Row Level Security
-- Pattern: public can SELECT rows the public site will eventually consume
-- (scoped to is_published where that column exists); only an authenticated
-- session (the admin) may write. Single-admin site, so no per-row ownership
-- check is needed beyond "is authenticated".
-- ==========================================================================

alter table media_collections        enable row level security;
alter table media_assets             enable row level security;
alter table services                 enable row level security;
alter table portfolio_projects       enable row level security;
alter table portfolio_project_media  enable row level security;
alter table tags                     enable row level security;
alter table portfolio_project_tags   enable row level security;
alter table testimonials             enable row level security;
alter table home_hero                enable row level security;
alter table home_hero_stats          enable row level security;
alter table home_mosaic_images       enable row level security;
alter table stats_bar                enable row level security;
alter table about_page               enable row level security;
alter table about_highlights         enable row level security;
alter table contact_info             enable row level security;
alter table contact_instagram_handles enable row level security;
alter table social_links             enable row level security;
alter table site_settings            enable row level security;
alter table seo_pages                enable row level security;
alter table activity_log             enable row level security;

-- content tables: public read, admin-only write
create policy "public read" on media_collections for select using (true);
create policy "admin write" on media_collections for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read" on media_assets for select using (true);
create policy "admin write" on media_assets for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read published" on services for select using (is_published = true);
create policy "admin write" on services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read published" on portfolio_projects for select using (is_published = true);
create policy "admin write" on portfolio_projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read" on portfolio_project_media for select using (true);
create policy "admin write" on portfolio_project_media for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read" on tags for select using (true);
create policy "admin write" on tags for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read" on portfolio_project_tags for select using (true);
create policy "admin write" on portfolio_project_tags for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read published" on testimonials for select using (is_published = true);
create policy "admin write" on testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read" on home_hero for select using (true);
create policy "admin write" on home_hero for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read" on home_hero_stats for select using (true);
create policy "admin write" on home_hero_stats for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read" on home_mosaic_images for select using (true);
create policy "admin write" on home_mosaic_images for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read" on stats_bar for select using (true);
create policy "admin write" on stats_bar for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read" on about_page for select using (true);
create policy "admin write" on about_page for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read" on about_highlights for select using (true);
create policy "admin write" on about_highlights for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read" on contact_info for select using (true);
create policy "admin write" on contact_info for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read" on contact_instagram_handles for select using (true);
create policy "admin write" on contact_instagram_handles for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read" on social_links for select using (true);
create policy "admin write" on social_links for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read" on site_settings for select using (true);
create policy "admin write" on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read" on seo_pages for select using (true);
create policy "admin write" on seo_pages for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- activity_log is admin-only, never public
create policy "admin only" on activity_log for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ==========================================================================
-- Storage bucket + policies
-- Run the "Create bucket" step in the dashboard first (Storage -> New
-- bucket -> name "media" -> Public), then run this block.
-- ==========================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects for select
  using (bucket_id = 'media');
create policy "authenticated insert media" on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "authenticated update media" on storage.objects for update
  using (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "authenticated delete media" on storage.objects for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');

-- seed the two known singleton rows for the tables that require exactly one row
insert into home_hero (id, headline, subtext) values (true, '', '') on conflict (id) do nothing;
insert into about_page (id, heading) values (true, '') on conflict (id) do nothing;
insert into contact_info (id) values (true) on conflict (id) do nothing;
insert into site_settings (id) values (true) on conflict (id) do nothing;
