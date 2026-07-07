-- Starter SEO rows for the 5 main sections of the site, using real copy
-- already established elsewhere in the CMS (Hero subtext, About heading,
-- Services heading, Contact heading) rather than placeholder text.
-- Run this once, any time after 0001_init.sql.

insert into seo_pages (page_key, meta_title, meta_description, canonical_url) values
('home', 'ProdYous — Visual Production Agency | Morocco', 'ProdYous is a visual production agency based in Morocco. We create cinematic films, photography, and branded content — from concept to screen, we craft visuals that speak.', 'https://youssef-website-six.vercel.app/'),
('work', 'Selected Work — ProdYous', 'Every frame tells a story. Browse wedding films, graduation films, corporate events, and branded content by ProdYous Visual Production Agency.', 'https://youssef-website-six.vercel.app/#work'),
('services', 'Services — ProdYous', 'Visual storytelling across every medium: film direction, graduation films, wedding films, corporate events, photography, and content creation.', 'https://youssef-website-six.vercel.app/#services'),
('about', 'About — ProdYous', 'Crafting cinematic narratives in the heart of Morocco. Meet Youssef Tayibi, filmmaker and photographer, founder of ProdYous Visual Production Agency.', 'https://youssef-website-six.vercel.app/#about'),
('contact', 'Contact — ProdYous', E'Let''s create something real. Get in touch with ProdYous Visual Production Agency, based in Morocco.', 'https://youssef-website-six.vercel.app/#contact')
on conflict (page_key) do nothing;
