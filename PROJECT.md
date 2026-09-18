# giancarlopeysack.com — Project Handoff

Personal site for Giancarlo Peysack. Next.js on Vercel, with pilot/sponsor
contact forms and two product waitlists backed by Firebase Firestore and email
notifications via Resend.

**Portfolio rebuild: stages 1 and 2 done (2026-09-18), ready for review.** The public-facing
pages are being rebuilt as a portfolio for people evaluating Giancarlo as a Product
Manager, using the free Framer marketplace template "Juliand" (live demo:
https://juliandavid.framer.website, marketplace:
https://www.framer.com/marketplace/templates/juliand/) as the design.

Two stages:

1. **Exact copy (done).** The template is reproduced in code (layout, fonts,
   colors, hover states, animations, every breakpoint), still carrying the
   template's own placeholder text and images. Verified against the live original
   at 1920, 1440, 834 and 390px wide: every page has the same height and the same
   text boxes and styles, and the load, scroll, hover, accordion, ticker and
   cursor animations were timed against the original. Deliberately excluded:
   Framer's "Use for Free" pill and "Made in Framer" badge (their marketing, not
   the design).
2. **Personalize (done, open items below).** All copy and images are Giancarlo's
   own: PM positioning, five case studies (Lexfall, Zharo, MarketOpsIQ,
   CampusMart, Genzi, most recent first), about, contact. Facts come from the CV,
   the products' live sites and the project folders; client names stay anonymous.
   Every string and image path lives in `content/*.ts`. Images are local files in
   `public/portfolio/`, built by `../tools/build_images.py` (see "Website folder"
   below). Small changes beyond the template: the hero name is sized for longer
   names, new pages open at the top even mid smooth-scroll, the "More projects"
   heading now shows (hidden in the template by a clipping bug), and `/404` renders
   the portfolio 404.

The older minimal "chrisraroque.com" homepage still exists, moved to `/links`.

---

## Live URLs

- **Production:** https://giancarlopeysack.com (apex serves directly)
- **www:** redirects to apex
- **Vercel preview:** https://giancarlopeysack-com.vercel.app

## Where things live

| Thing | Location |
|---|---|
| Source repo | github.com/GiancarloPeysack/giancarlopeysack-com (public) |
| Local project | ~/Documents/giancarlopeysack.com/site (the repo) |
| Vercel project | vercel.com/giancarls-projects/giancarlopeysack-com |
| Firebase project | console.firebase.google.com/project/giancarlopeysack-f7171 |
| Firestore data | …/project/giancarlopeysack-f7171/firestore/databases/-default-/data |
| DNS | GoDaddy → giancarlopeysack.com |

## Website folder

`~/Documents/giancarlopeysack.com/` holds everything for the website:

- `site/`: this repo (the code).
- `tools/build_images.py`: builds `site/public/portfolio/` from sources read in
  place from each project's own folder (portraits in `~/Documents/Photos`,
  Lexfall screens in `~/Downloads/Lexfall/app-screenshots`, MarketOpsIQ App Store
  renders and CampusMart screenshots in `~/Downloads`, Zharo brand files in
  `~/Documents/Black Comet Studio`). Run with Pillow installed:
  `python3 tools/build_images.py [photos|marketopsiq|genzi|lexfall|zharo|campusmart|services|logos]`.
- `tools/captures/`: high-res captures of the products' websites and the
  downloaded logos the script also uses.
- `.claude/launch.json`: dev server config for Claude sessions.

Other projects keep their own folders. Never move them into the website folder;
read from them and copy only the files the site needs.

## Tech stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Firebase Firestore (client SDK) for form storage
- Resend (via /api/notify edge route) for email notifications
- Hosting: Vercel (auto-deploys on push to `main`)
- Portfolio pages only: framer-motion 13 for animation, lenis **pinned to 1.1.2**
  for smooth scrolling (the template bundles Lenis 1.1.x, where passing `duration`
  disables `lerp`; 1.1.3+ changed that default and changes the scroll feel)
- Fonts (all free licenses, self-hosted or via next/font, see `app/fonts.ts`):
  Switzer (Fontshare ITF FFL, files in `app/fonts/switzer/`), Neutral Sans
  (SIL OFL, from besignco/Neutral-Sans, `app/fonts/neutral-sans/`), Inter Display
  (SIL OFL, from rsms/inter, `app/fonts/inter-display/`), plus Schibsted Grotesk,
  Chivo Mono and Inter from Google Fonts. The light pages still use Inter.

## Deploy workflow

Push to `main` → Vercel auto-builds and deploys. Standard command used all session
(includes a lock-file cleanup that kept recurring):

```
cd ~/Documents/giancarlopeysack.com/site && rm -f .git/index.lock .git/HEAD.lock && git add -A && git commit -m "your message" && git push
```

(`gh` CLI is NOT installed on this machine — repo was created via the GitHub web UI.)

---

## Site structure

| Route | What it is |
|---|---|
| `/` | Portfolio home (Julian template). `app/(portfolio)/page.tsx`, copy in `content/home.ts`. |
| `/about` | Portfolio about page. `app/(portfolio)/about/`, `content/about.ts`. |
| `/projects` | Portfolio project index. `app/(portfolio)/projects/`, `content/projects.ts`. |
| `/projects/[slug]` | Case studies (template slugs until personalized). Same content file. |
| `/contact` | Portfolio contact page. The form posts to `/api/notify` with `type: "contact"`. `content/contact.ts`. |
| any unknown URL | Portfolio-styled 404 via the `app/(portfolio)/[...notFound]` catch-all → `app/(portfolio)/not-found.tsx`. |
| `/links` | Personal link-in-bio page (writing, apps, social, contact CTAs). The *old* homepage, moved here unchanged. Edit `app/links/page.tsx`. |
| `/pilot` | MarketOpsIQ pilot form → Firestore `pilot_requests`. Shows a Calendly embed on success. |
| `/sponsor` | Video sponsorship form → Firestore `sponsorship_requests`. |
| `/waitlist/linkedin` | Waitlist for the AI LinkedIn tool → Firestore `linkedin_tool_waitlist`. |
| `/waitlist/video` | Waitlist for the AI video tool → Firestore `video_tool_waitlist`. |
| `/api/notify` | Edge route. Forwards any form submission to gc.peysack@gmail.com via Resend. |

### Portfolio code layout

- `app/(portfolio)/layout.tsx`: shared shell for the portfolio routes (black
  page, smooth scroll, nav, footer). Route group, so it doesn't affect URLs or
  the light pages.
- `content/*.ts`: every string, link and image URL shown on the portfolio pages.
  Stage 2 personalization happens here.
- `components/julian/fx/`: ports of the Framer runtime effects the template uses
  (load appear, scroll-triggered appear, scroll-direction nav, parallax,
  scroll-linked transforms) and the Lenis smooth scroll.
  - Load-time appears work like Framer's: `appearRuntime.ts` turns each
    `<Appear>` config into Web Animations (springs sampled every 10 ms), and
    `AppearBoot.tsx` inlines it as a script at the end of the page so the
    animations start on the first frame, before React hydrates. The stagger is
    therefore right even on slow connections. After an animation ends, framer-motion
    takes over the element again.
  - `AppearBoot` must stay the last thing in `app/(portfolio)/layout.tsx`.
- `components/julian/shell/`: nav bar + mobile menu, footer, "LET'S WORK TOGETHER"
  CTA, and the custom cursor (the CTA's "GET IN TOUCH" pill and the Home
  services image cursor, both driven by `data-cursor` attributes).
- `components/julian/ui/`: Button, Label, ProjectCard, MenuLink.
- `components/julian/{home,about,projects,contact,notfound}/`: page sections.
  Home: hero (parallax name, load animation), intro (scroll-reveal text, draggable
  logo ticker), selected cases (zigzag of project cards), services accordion.
- `app/globals.css`: black background for portfolio pages via `:has(.portfolio-root)`,
  Lenis CSS.
- `public/portfolio/`: every portfolio image (photos, project cards, banners,
  galleries, logos, service cursor images), generated by `../tools/build_images.py`.

### Light-page components
- `components/Avatar.tsx` — click-to-zoom lightbox avatar
- `components/BrandTile.tsx` — square brand tile (letter or custom glyph), rotation + white separator, used in the `/links` tile decks
- `components/SocialIcons.tsx` — LinkedIn / TikTok / Instagram / Substack official SVGs
- `components/FormFields.tsx` — shared form inputs (label, text, select, radio cards, submit)
- `PhoneTile.tsx` / `SocialTile.tsx` — deprecated, kept as no-ops

`/links` copy (moved from the old homepage):
- "Hi, I'm Giancarlo Peysack [avatar]"
- "I like writing here [Substack]"
- "I've shipped some apps [Genzi][Lexfall][MarketOpsIQ][Zharo]"
- "I post here [LinkedIn][TikTok][Instagram]"
- Closing CTAs: pilot MarketOpsIQ / sponsor a video / say hi / evaluating me for a PM role (links to `/`)

---

## Firestore

Database: `(default)`, Standard edition, nam5 (US).
Security rules: public can only `create` on the four form collections (no read/update/delete).
Collections: `pilot_requests`, `sponsorship_requests`, `linkedin_tool_waitlist`, `video_tool_waitlist`.

To read submissions: open the Firestore data console (link above).

## Environment variables (set in Vercel → Settings → Environment Variables)

Already set (Production + Preview):
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN          = giancarlopeysack-f7171.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID           = giancarlopeysack-f7171
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET       = giancarlopeysack-f7171.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID  = 216153780728
NEXT_PUBLIC_FIREBASE_APP_ID
```

NOT yet set (needed for email notifications):
```
RESEND_API_KEY    ← sign up at resend.com, copy from API Keys, add to Vercel, redeploy
```

(Full firebaseConfig is also in the Firebase console → Project settings → Your apps.)

## DNS (GoDaddy)

- A record `@` → 216.198.79.1 (Vercel)
- CNAME `www` → a75d1094affb9a6b.vercel-dns-017.com
- NS records → GoDaddy default (unchanged)
- Old Framer records were removed. Framer site can be unpublished at leisure.

---

## DONE

- [x] Old homepage moved to `/links` unchanged
- [x] Next.js rebuild matching chrisraroque.com aesthetic
- [x] Live at giancarlopeysack.com (apex direct, www redirect, SSL valid)
- [x] Pilot + sponsor forms → Firestore
- [x] Two AI-tool waitlist pages → Firestore (slim, single-screen)
- [x] Firebase project + Firestore + security rules
- [x] Mobile-specific font size + tile rotation tuning
- [x] Click-to-zoom avatar, hover deck animation, tooltip stacking fix
- [x] /api/notify route wired into all 4 forms (awaiting RESEND_API_KEY)

## TODO / OPEN DECISIONS

- [x] **Portfolio stage 1: exact copy** of the Julian template, verified against the original at every breakpoint (2026-09-18). Not committed or deployed yet.
- [x] **Portfolio stage 2: personalize** (2026-09-18). Not committed or deployed yet; review locally first.
- [ ] **Sixth project**: Giancarlo will send one more (a website he built). Add it to `content/projects.ts` (order + card + case study) and build its images with `tools/build_images.py`.
- [ ] **Refresh early numbers** as they grow: Lexfall's first-month App Store Connect figures (2.17K impressions, 33 first downloads, 4 subscription starts, ~11% download-to-paid by day 14) and Genzi's TikTok stats (~1.5K followers, 36K likes, top video 100K views from April 2022).
- [ ] **Optional**: a handwritten signature image for the About hero (`aboutContent.hero.signature`), TikTok/Instagram links once live.
- [ ] **Social bio links:** once the portfolio is live, decide whether LinkedIn/TikTok/Instagram bios should point to `/` (portfolio) or `/links` (link-in-bio).
- [ ] **Add RESEND_API_KEY** in Vercel so form submissions email you (currently they only land in Firestore).
- [ ] **Name the two AI tools.** "Riff" and "Atom" were rejected (riff.ai + getriff.co + atom.com/Squadhelp conflicts). Pick names with a free .com and clean trademark in software classes 9 & 42. Tooltips + mailto subjects + the homepage "AI tools" line update when chosen.
- [ ] **Social URLs:** TikTok and Instagram links in `LINKS` (app/links/page.tsx) are still `#`. LinkedIn + Substack are real.
- [ ] **Optional proof points** (e.g. Genzi top-5 Product Hunt) — could surface in the Genzi tile tooltip.
- [ ] **Verify a Resend sending domain** (giancarlopeysack.com) so notification emails come from your domain instead of onboarding@resend.dev.
- [ ] **Unpublish the old Framer site** when convenient.
- [ ] **Validation thresholds:** decide how many waitlist signups = build it, before launch (so you don't move goalposts).

## Notes / gotchas

- Terminal on this Mac is locked to "click" tier for the assistant, so all git pushes must be run by you (the paste-able command is above).
- The `.git/index.lock` kept reappearing — the deploy command removes it preemptively.
- Don't run `npm run build` while `npm run dev` is running in this folder: both write to `.next` and the dev server breaks. Fix: stop dev, `rm -rf .next`, start dev again.
- Font sizing is mobile-first: bigger on phones (26px), tighter on desktop (22px). CTAs are ~70% of body size. Don't "fix" mobile being bigger — that's intentional, matching Chris's design.
