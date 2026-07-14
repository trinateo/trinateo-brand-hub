TrinaTeo Brand Hub — WordPress theme
=====================================

This is a full WordPress port of the original Next.js + Supabase build.
No plugins are required — every content type is a native WordPress
custom post type, editable from wp-admin.

INSTALL
-------
1. Zip this folder (trinateo-brand-hub) if it isn't already a .zip.
2. In wp-admin: Appearance -> Themes -> Add New -> Upload Theme.
3. Upload the zip and click Activate.
4. Sample content (profile, 3 services, 2 case studies, 3 testimonials,
   3 speaking engagements, 1 resource, 1 sample enquiry) and the site's
   pages (Home, About, Proof, Speaking, Resources, Contact) are created
   automatically the first time the theme is activated. Safe to leave
   in place — it only runs once.

WHERE TO EDIT CONTENT
----------------------
Every section has its own menu item in the wp-admin sidebar:

  Profile              -> bio, tagline, headshot (featured image),
                           LinkedIn URL, expertise tags. One entry only.
  Services             -> title, slug, summary (excerpt), description
                           (editor), who it's for, outcomes, CTA label.
                           Drag order in the list to reorder.
  Case Studies          -> title, client sector, challenge, approach,
                           outcome, tags (Case Study Tags panel).
  Testimonials          -> author name (title), quote (editor), role,
                           company, related service.
  Speaking Engagements   -> event name (title), date, location, topic,
                           audience, event URL, upcoming toggle.
  Resources             -> title, description (editor), type, file URL
                           or external URL.
  Enquiries             -> read-only visitor details + editable status
                           (New/Reviewed/Responded) and admin notes.
                           Created automatically by the contact form —
                           cannot be added manually, matching the
                           original security model.

CONTACT FORM / EMAIL NOTIFICATIONS
------------------------------------
The contact form (Contact page) posts to admin-post.php and uses
WordPress's built-in wp_mail() to notify the site admin email
(Settings -> General -> Administration Email Address) of new enquiries.
No API key needed. To send elsewhere, add this to functions.php or a
must-use plugin:

  add_filter( 'tt_enquiry_notification_email', function () {
      return 'you@example.com';
  } );

WHAT DIDN'T PORT 1:1
----------------------
- Auth: the original had a custom admin login (passphrase, then real
  Supabase Auth). WordPress's own user accounts + capabilities replace
  this entirely — no extra code needed, just create wp-admin users as
  normal and give them the Editor or Administrator role.
- AI/enquiry-summary fields from the original data model were nullable
  and unused in v1 there too, so they were left out here.
- SEO: WordPress core generates /sitemap.xml and appends /wp-admin to
  robots.txt automatically — no code needed. For custom meta
  descriptions and social images beyond the theme's defaults, install
  Yoast SEO or RankMath (optional, not required for the theme to work).

DESIGN
------
All styling is hand-authored CSS in style.css (no build step, no
Tailwind) so it's directly editable. CSS custom properties at the top
of the file (--tt-neutral-900, --tt-blue-600, etc.) control the palette.
