-- Links portfolio covers, hero mosaic, about photos, and the site logo to the
-- image files that are ALREADY live on the public website
-- (https://youssef-website-six.vercel.app/assets/images/*). Nothing is
-- re-uploaded to Supabase Storage — these rows just point at the existing
-- public URLs, so the admin has real cover images with zero manual uploading.
--
-- Run this AFTER 0001_init.sql and seed.sql.
--
-- Note: because these rows don't correspond to a real object in the "media"
-- Storage bucket, using "Replace file" on one of them in the Media Library
-- will still work (it uploads a new file to Storage and switches the row
-- over to it), but "Delete" will remove the database row without needing to
-- delete anything from Storage (there's nothing there to delete).

insert into media_assets (storage_path, storage_bucket, public_url, kind, mime_type, file_size_bytes, alt_text) values
('external/work-1.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/work-1.jpg', 'image', 'image/jpeg', 87635, 'Le Jour J'),
('external/work-2.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/work-2.jpg', 'image', 'image/jpeg', 99125, 'Ce Regard'),
('external/work-3.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/work-3.jpg', 'image', 'image/jpeg', 57431, 'Partager Ensemble'),
('external/work-4.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/work-4.jpg', 'image', 'image/jpeg', 67868, 'GITEX Morocco'),
('external/work-5.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/work-5.jpg', 'image', 'image/jpeg', 41606, 'Behind The Frame'),
('external/work-6.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/work-6.jpg', 'image', 'image/jpeg', 96179, 'Rien Au Hasard'),
('external/work-7.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/work-7.jpg', 'image', 'image/jpeg', 96705, 'Le Moment Décisif'),
('external/work-8.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/work-8.jpg', 'image', 'image/jpeg', 65834, 'AZ Atelier'),
('external/work-9.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/work-9.jpg', 'image', 'image/jpeg', 81839, 'Des Moments'),
('external/work-10.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/work-10.jpg', 'image', 'image/jpeg', 137091, 'We Came To Create'),
('external/work-11.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/work-11.jpg', 'image', 'image/jpeg', 61920, '100+ Soutenances'),
('external/work-12.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/work-12.jpg', 'image', 'image/jpeg', 48332, 'Produce With Youss'),
('external/agency-1.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/agency-1.jpg', 'image', 'image/jpeg', 72142, 'La Recherche'),
('external/agency-2.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/agency-2.jpg', 'image', 'image/jpeg', 30489, E'L''Expertise'),
('external/agency-3.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/agency-3.jpg', 'image', 'image/jpeg', 117551, E'L''Impact'),
('external/agency-4.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/agency-4.jpg', 'image', 'image/jpeg', 76704, 'Avant La Caméra'),
('external/agency-5.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/agency-5.jpg', 'image', 'image/jpeg', 30163, 'Certaines Marques'),
('external/agency-6.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/agency-6.jpg', 'image', 'image/jpeg', 28304, 'Congrès & Conférence'),
('external/agency-7.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/agency-7.jpg', 'image', 'image/jpeg', 46315, 'Brand Energy'),
('external/agency-8.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/agency-8.jpg', 'image', 'image/jpeg', 33219, 'Avant Les Résultats'),
('external/logo.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/logo.jpg', 'image', 'image/jpeg', 4079, 'ProdYous logo'),
('external/youssef-profile.jpg', 'external', 'https://youssef-website-six.vercel.app/assets/images/youssef-profile.jpg', 'image', 'image/jpeg', 14829, 'Youssef Tayibi');

-- Attach each portfolio project's cover image
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/work-1.jpg') where slug = 'le-jour-j';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/work-2.jpg') where slug = 'ce-regard';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/work-3.jpg') where slug = 'partager-ensemble';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/work-4.jpg') where slug = 'gitex-morocco';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/work-5.jpg') where slug = 'behind-the-frame';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/work-6.jpg') where slug = 'rien-au-hasard';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/work-7.jpg') where slug = 'le-moment-decisif';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/work-8.jpg') where slug = 'az-atelier';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/work-9.jpg') where slug = 'des-moments';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/work-10.jpg') where slug = 'we-came-to-create';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/work-11.jpg') where slug = '100-soutenances';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/work-12.jpg') where slug = 'produce-with-youss';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/agency-3.jpg') where slug = 'l-impact';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/agency-7.jpg') where slug = 'brand-energy';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/agency-1.jpg') where slug = 'la-recherche';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/agency-2.jpg') where slug = 'l-expertise';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/agency-4.jpg') where slug = 'avant-la-camera';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/agency-5.jpg') where slug = 'certaines-marques';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/agency-6.jpg') where slug = 'congres-conference';
update portfolio_projects set featured_media_id = (select id from media_assets where storage_path = 'external/agency-8.jpg') where slug = 'avant-les-resultats';

-- Hero mosaic (matches Hero.tsx: work-10, work-1, work-4)
insert into home_mosaic_images (media_id, sort_order)
select id, 0 from media_assets where storage_path = 'external/work-10.jpg'
union all
select id, 1 from media_assets where storage_path = 'external/work-1.jpg'
union all
select id, 2 from media_assets where storage_path = 'external/work-4.jpg';

-- About page images (matches About.tsx: work-3 main image, youssef-profile inset)
update about_page set
  main_image_media_id = (select id from media_assets where storage_path = 'external/work-3.jpg'),
  profile_photo_media_id = (select id from media_assets where storage_path = 'external/youssef-profile.jpg')
where id = true;

-- Site logo (Navbar.tsx / Footer.tsx)
update site_settings set
  logo_media_id = (select id from media_assets where storage_path = 'external/logo.jpg')
where id = true;
