-- Seeds the CMS with the site's actual current real content (no placeholders),
-- transcribed from src/components/*.tsx on the public site. Run this once,
-- after 0001_init.sql, so the admin opens to a populated dashboard.
--
-- Media (images/videos) are NOT seeded here — this project has no access to
-- your Supabase Storage bucket. Upload the corresponding files from
-- public/assets/images/ via the admin's Media Library, then attach them to
-- the rows below (each project/section can be edited to point at real media
-- once uploaded).

-- ==========================================================================
-- Services (Services.tsx)
-- ==========================================================================
insert into services (title, slug, description, highlight, sort_order) values
('Film Direction', 'film-direction', 'Cinematic storytelling for music videos, commercials, short films, and brand narratives.', 'Youssef_tayibi · @prodyous.ma', 1),
('Graduation Films', 'graduation-films', 'Over 100 soutenances and academic events captured with cinematic precision.', '100+ Soutenances Filmed', 2),
('Wedding Films', 'wedding-films', 'Le jour J — we handle everything. Timeless wedding stories you will re-watch forever.', E'Le jour J, on s''occupe du reste', 3),
('Corporate Events', 'corporate-events', 'GITEX Morocco, summits, product launches — high-energy coverage for professional gatherings.', 'GITEX Morocco · Summits · Launches', 4),
('Photography', 'photography', 'Editorial portraits and commercial photography. Every shot is a deliberate visual decision.', E'Rien n''est laissé au hasard', 5),
('Content Creation', 'content-creation', 'Short-form social content designed for Instagram and modern brand presence. @prodyous.ma', 'From Concept to Screen', 6);

-- ==========================================================================
-- Portfolio projects (Portfolio.tsx) — 20 real works, no media attached yet
-- ==========================================================================
insert into portfolio_projects (title, slug, caption, category, account, media_type, instagram_url, sort_order) values
('Le Jour J', 'le-jour-j', E'Le jour J, concentre-toi sur l''essentiel. On s''occupe du reste.', 'Wedding Film', 'youssef', 'reel', 'https://www.instagram.com/reel/DWRz-_Pjn-l/', 1),
('Ce Regard', 'ce-regard', 'Ce regard. Cette fierté. 🤍 Avant de défendre son travail…', 'Graduation Film', 'youssef', 'reel', 'https://www.instagram.com/reel/DWWzi6WCASF/', 2),
('Partager Ensemble', 'partager-ensemble', 'Partager m3a li katmna lih had nhar 🔥 Crédit : @prodyous.ma', 'Personal', 'youssef', 'reel', 'https://www.instagram.com/reel/DXceayMNxHc/', 3),
('GITEX Morocco', 'gitex-morocco', E'GITEX Morocco. Plus qu''un event… une vraie énergie.', 'Corporate Event', 'youssef', 'reel', 'https://www.instagram.com/reel/DW4JEavMYRQ/', 4),
('Behind The Frame', 'behind-the-frame', 'Derrière chaque rendu, il y a des choix, des tests… et une vision.', 'BTS', 'youssef', 'reel', 'https://www.instagram.com/reel/DWrdHJFjr7D/', 5),
('Rien Au Hasard', 'rien-au-hasard', E'Rien n''est laissé au hasard. De la préparation au rendu final.', 'Film Direction', 'youssef', 'reel', 'https://www.instagram.com/reel/DWg_Ko6tdRA/', 6),
('Le Moment Décisif', 'le-moment-decisif', E'Le jour où tout se joue… ce n''est pas le moment d''improviser.', 'Wedding Film', 'youssef', 'reel', 'https://www.instagram.com/reel/DWKAcZ-N_bo/', 7),
('AZ Atelier', 'az-atelier', 'Chez AZ Atelier, chaque pastilla suit un processus précis.', 'Product Film', 'youssef', 'reel', 'https://www.instagram.com/reel/DUGwWodjeqc/', 8),
('Des Moments', 'des-moments', 'Des moments qui comptent, des souvenirs pour toujours.', 'Event Coverage', 'youssef', 'reel', 'https://www.instagram.com/reel/DSsAHN1DIQ2/', 9),
('We Came To Create', 'we-came-to-create', E'We didn''t come here to change the past. We came because we care.', 'Creative Film', 'youssef', 'reel', 'https://www.instagram.com/reel/DSYMc6CDGzx/', 10),
('100+ Soutenances', '100-soutenances', 'Hamdoulilah… plus de 100 soutenances filmées, et chaque fois unique.', 'Graduation Film', 'youssef', 'reel', 'https://www.instagram.com/reel/DRuc-2bjCUx/', 11),
('Produce With Youss', 'produce-with-youss', '🎬 Produce with Youss. From concept to screen — we craft visuals that speak.', 'Agency Promo', 'youssef', 'reel', 'https://www.instagram.com/reel/DRVI1nqjCGW/', 12),
(E'L''Impact', 'l-impact', E'L''impact ne s''improvise pas. Sa portée non plus.', 'Cinematic', 'prodyous', 'reel', 'https://www.instagram.com/reel/DV93GDyiDhx/', 13),
('Brand Energy', 'brand-energy', 'Derrière chaque marque, il y a une énergie. Une personnalité.', 'Commercial', 'prodyous', 'reel', 'https://www.instagram.com/reel/DVwzEuPiCrc/', 14),
('La Recherche', 'la-recherche', 'La recherche commence souvent loin des salles de conférence.', 'Documentary', 'prodyous', 'photo', null, 15),
(E'L''Expertise', 'l-expertise', E'L''expertise ne s''improvise pas. Son image non plus.', 'Corporate', 'prodyous', 'photo', null, 16),
('Avant La Caméra', 'avant-la-camera', 'Chaque projet commence avant la caméra. Dans la réflexion.', 'BTS', 'prodyous', 'photo', null, 17),
('Certaines Marques', 'certaines-marques', E'Certaines marques ne cherchent pas simplement à communiquer.', 'Brand Identity', 'prodyous', 'photo', null, 18),
('Congrès & Conférence', 'congres-conference', 'Un congrès, une conférence, une démonstration médicale — ne sont pas laissés au hasard.', 'Medical Event', 'prodyous', 'photo', null, 19),
('Avant Les Résultats', 'avant-les-resultats', E'Avant les résultats, il y a une vision. Avant l''impact, il y a une direction.', 'Vision', 'prodyous', 'photo', null, 20);

-- ==========================================================================
-- Testimonials (Testimonials.tsx)
-- ==========================================================================
insert into testimonials (platform, flag_emoji, country, quote, context, display_timestamp, sort_order) values
('whatsapp', '🇹🇳', 'Tunisie', E'Sinn 3aychek 3la kol chy , ton professionnalisme, ta gentillesse , combien j''étais à l''aise avec vous , kif kif tout mes amis partagent le mm avis aussi vous méritez d''être un photographe à l''échelle internationale wlh ❤️⭐😍🙏🙏🙏', 'Faculté de Médecine Dentaire · Rabat', '00:03', 1),
('whatsapp', '🇲🇦', 'Maroc', 'Vraiment top du top tbarkilah 3lik 3jeebni lvideo bzzf mli bdit ntferej o ana dahka hit vraiment hebliit hit Throughout the video you can really feel the energy the good vibes the happiness Chookraan bzzf youssef ❤️', 'Faculté de Médecine et de Pharmacie · Rabat', '19:08', 2);

insert into testimonials (platform, author_name, flag_emoji, country, quote, context, likes_count, sort_order) values
('instagram', 'meriembouallam', '🇲🇦', 'Maroc', 'Thank you so much for capturing one of the best memories of my life !!!', 'Université Internationale de Rabat', 12, 3);

-- ==========================================================================
-- Homepage — hero (Hero.tsx)
-- ==========================================================================
update home_hero set
  headline = E'Helping\ncreatives\nstand out.',
  subtext = 'ProdYous is a visual production agency based in Morocco. We create cinematic films, photography, and branded content — from concept to screen, we craft visuals that speak.',
  cta_primary_label = 'View Work',
  cta_primary_href = '#work',
  cta_secondary_label = 'Start a Project',
  profile_badge_text = '@youssef_tayibi',
  agency_tag_text = '@prodyous.ma'
where id = true;

insert into home_hero_stats (value, label, sort_order) values
('+200', 'Clients', 1),
('5', 'Years', 2),
('100+', 'Projects', 3);

-- ==========================================================================
-- Stats bar (Stats.tsx) — deliberately independent from home_hero_stats
-- ==========================================================================
insert into stats_bar (value, label, note, sort_order) values
('100+', 'Graduations Filmed', 'Hamdoulilah', 1),
('5+', 'Years of Experience', 'Since 2019', 2),
('2,440', 'Instagram Followers', '@youssef_tayibi', 3);

-- ==========================================================================
-- About page (About.tsx)
-- ==========================================================================
update about_page set
  eyebrow = 'Our Story',
  heading = E'Crafting cinematic\nnarratives in the\nheart of Morocco.',
  bio_paragraph_1 = 'Youssef Tayibi is a filmmaker and photographer based in Morocco, and the founder of ProdYous Visual Production Agency. With a sharp editorial eye and a cinematic approach, he helps brands, creatives, and individuals stand out in a saturated visual landscape.',
  bio_paragraph_2 = E'From wedding films to corporate events, from graduation ceremonies to brand commercials — every project is treated as an opportunity to push the frame further. Nothing is left to chance. From preparation to final delivery.',
  location_badge_line_1 = 'Morocco',
  location_badge_line_2 = 'ProdYous',
  cta_1_label = 'Start a Project →',
  cta_1_href = '#contact',
  cta_2_label = 'View Work →',
  cta_2_href = '#work'
where id = true;

insert into about_highlights (label, count, sort_order) values
('Graduation 🧑‍🎓', '100+', 1),
('Corporate 💼', 'Events', 2),
('Content Creation 🤳', 'Social', 3),
('Avis Clients 😍', '★★★★★', 4),
('Wedding', 'Films', 5);

-- ==========================================================================
-- Contact (Contact.tsx)
-- ==========================================================================
update contact_info set
  eyebrow = 'Ready to Collaborate?',
  heading = E'Let''s create\nsomething real.',
  location = 'Morocco',
  email = 'contact@prodyous.com'
where id = true;

insert into contact_instagram_handles (handle, description, sort_order) values
('@youssef_tayibi', 'Personal', 1),
('@prodyous.ma', 'Agency', 2);

-- ==========================================================================
-- Footer social links (Footer.tsx)
-- ==========================================================================
insert into social_links (label, href, sort_order) values
('Instagram — Youssef', 'https://www.instagram.com/youssef_tayibi/', 1),
('Instagram — ProdYous', 'https://www.instagram.com/prodyous.ma/', 2);

-- ==========================================================================
-- Site settings (branding — Navbar.tsx / Footer.tsx)
-- ==========================================================================
update site_settings set
  wordmark_text = 'PRODYOUS',
  tagline = 'From concept to screen — we craft visuals that speak.',
  copyright_template = '© {year} Youssef Tayibi · ProdYous Visual Production Agency · Morocco · All Rights Reserved'
where id = true;
