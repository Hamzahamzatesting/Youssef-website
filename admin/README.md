# Prodyous Admin

A standalone admin CMS for the Prodyous / Youssef Tayibi portfolio site. This is a
**separate app** from the public website (`../src`) — it does not read from or
write to any file in the main project, and the public site does not yet read
from this admin's data. That wiring is a deliberate, separate future phase.

Phase 1 covers: authentication, a dashboard overview, the media library
(upload/organize/reorder/replace/delete with client-side image compression),
the portfolio manager (create/edit/duplicate/publish/reorder projects), and
the homepage manager (hero copy, hero stats, image mosaic, featured
projects). The full database schema also includes services, testimonials,
about, contact, SEO, and settings tables — ready for their admin screens in a
later phase.

## One-time setup

You'll need a free [Supabase](https://supabase.com) account. None of this can
be done on your behalf — it requires your own account and credentials.

1. **Create a Supabase project** (Dashboard → New project). Pick a region
   close to your visitors (e.g. an EU region for Morocco).
2. **Get your API keys**: Project Settings → API → copy the **Project URL**
   and the **anon public** key.
3. **Configure the app**: copy `.env.example` to `.env.local` and paste in
   those two values:
   ```
   VITE_SUPABASE_URL="https://xxxx.supabase.co"
   VITE_SUPABASE_ANON_KEY="..."
   ```
4. **Run the schema migration**: open the Supabase SQL Editor and run the
   entire contents of `supabase/migrations/0001_init.sql`. This creates all
   tables, security policies, and the `media` storage bucket.
5. **Seed real starting content** (optional but recommended): run
   `supabase/seed.sql` in the SQL Editor. This populates the site's actual
   current copy — the 20 portfolio pieces, 6 services, 3 testimonials, hero
   and about copy, stats, etc. — transcribed from the live site, so the
   dashboard opens populated instead of empty. It does **not** seed media
   files (see note below).
6. **Create your admin login**: Dashboard → Authentication → Users → Add
   user (email + password). This is the only account that can sign in.
   Then go to Authentication → Providers → Email and turn **off** "Allow new
   users to sign up" — there should be no public registration path.
7. **Install and run**:
   ```bash
   npm install
   npm run dev
   ```
   Opens on `http://localhost:3001` (a different port from the main site's
   dev server, so both can run at once).

### About media

The seed script fills in all text content but leaves media empty — this
project has no access to your Supabase Storage bucket, so nothing was
uploaded on your behalf. To attach real images:

1. Open **Media Library** in the admin.
2. Upload the files from `../public/assets/images/` (drag-and-drop, or bulk
   select).
3. Open each portfolio project / the Homepage manager and pick the matching
   uploaded image as its cover / background / mosaic image.

## Deploying

This is intentionally a separate deployable from the main site. When you're
ready:

- Create a **new** Vercel project pointed at this repo with **Root
  Directory** set to `admin`.
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment
  variables on that Vercel project.
- Optionally assign it a subdomain (e.g. `admin.yourdomain.com`).

The main site's Vercel project and `vercel.json` are untouched by this and
need no changes.

## What's next (not built yet)

Schema exists and is secured with row-level security, but there's no admin
screen yet for: Services, Testimonials, About page, Contact info, SEO
metadata, and Settings (logo/favicon/brand colors/footer). Also not yet
started: actually wiring the public site to read from this data instead of
its hardcoded content — that's a distinct future phase.
