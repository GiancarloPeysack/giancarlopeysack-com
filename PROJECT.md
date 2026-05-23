# giancarlopeysack.com — Project Handoff

Personal site for Giancarlo Peysack, modeled on chrisraroque.com (minimal,
sentences-with-inline-app-icons aesthetic). Rebuilt from Framer into Next.js,
deployed on Vercel. Includes pilot/sponsor contact forms and two product
waitlists, all backed by Firebase Firestore with email notifications via Resend.

---

## Live URLs

- **Production:** https://giancarlopeysack.com (apex serves directly)
- **www:** redirects to apex
- **Vercel preview:** https://giancarlopeysack-com.vercel.app

## Where things live

| Thing | Location |
|---|---|
| Source repo | github.com/GiancarloPeysack/giancarlopeysack-com (public) |
| Local project | ~/Desktop/giancarlopeysack-com |
| Vercel project | vercel.com/giancarls-projects/giancarlopeysack-com |
| Firebase project | console.firebase.google.com/project/giancarlopeysack-f7171 |
| Firestore data | …/project/giancarlopeysack-f7171/firestore/databases/-default-/data |
| DNS | GoDaddy → giancarlopeysack.com |

## Tech stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Inter (variable) via next/font
- Firebase Firestore (client SDK) for form storage
- Resend (via /api/notify edge route) for email notifications
- Hosting: Vercel (auto-deploys on push to `main`)

## Deploy workflow

Push to `main` → Vercel auto-builds and deploys. Standard command used all session
(includes a lock-file cleanup that kept recurring):

```
cd ~/Desktop/giancarlopeysack-com && rm -f .git/index.lock .git/HEAD.lock && git add -A && git commit -m "your message" && git push
```

(`gh` CLI is NOT installed on this machine — repo was created via the GitHub web UI.)

---

## Site structure

| Route | What it is |
|---|---|
| `/` | Homepage. Copy + inline brand tiles. Edit everything via the `LINKS` object at the top of `app/page.tsx`. |
| `/pilot` | MarketOpsIQ pilot form → Firestore `pilot_requests`. Shows a Calendly embed on success. |
| `/sponsor` | Video sponsorship form → Firestore `sponsorship_requests`. |
| `/waitlist/linkedin` | Waitlist for the AI LinkedIn tool → Firestore `linkedin_tool_waitlist`. |
| `/waitlist/video` | Waitlist for the AI video tool → Firestore `video_tool_waitlist`. |
| `/api/notify` | Edge route. Forwards any form submission to gc.peysack@gmail.com via Resend. |

### Key components
- `components/Avatar.tsx` — click-to-zoom lightbox avatar
- `components/BrandTile.tsx` — square brand tile (letter or custom glyph), rotation + white separator
- `components/SocialIcons.tsx` — LinkedIn / TikTok / Instagram / Substack official SVGs
- `components/FormFields.tsx` — shared form inputs (label, text, select, radio cards, submit)
- `PhoneTile.tsx` / `SocialTile.tsx` — deprecated, kept as no-ops

### Homepage copy (current)
- "Hi, my name is Giancarlo Peysack [avatar]"
- "I make B2B and consumer apps [M] [z]" (MarketOpsIQ, Genzi)
- "and share about building [LinkedIn][TikTok][Instagram][Substack]"
- "Join the waitlist for my AI tools [in][✦]"
- CTAs: pilot MarketOpsIQ / sponsor a video / say hi

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

- [x] Next.js rebuild matching chrisraroque.com aesthetic
- [x] Live at giancarlopeysack.com (apex direct, www redirect, SSL valid)
- [x] Pilot + sponsor forms → Firestore
- [x] Two AI-tool waitlist pages → Firestore (slim, single-screen)
- [x] Firebase project + Firestore + security rules
- [x] Mobile-specific font size + tile rotation tuning
- [x] Click-to-zoom avatar, hover deck animation, tooltip stacking fix
- [x] /api/notify route wired into all 4 forms (awaiting RESEND_API_KEY)

## TODO / OPEN DECISIONS

- [ ] **Add RESEND_API_KEY** in Vercel so form submissions email you (currently they only land in Firestore).
- [ ] **Name the two AI tools.** "Riff" and "Atom" were rejected (riff.ai + getriff.co + atom.com/Squadhelp conflicts). Pick names with a free .com and clean trademark in software classes 9 & 42. Tooltips + mailto subjects + the homepage "AI tools" line update when chosen.
- [ ] **Social URLs:** TikTok and Instagram links in `LINKS` (app/page.tsx) are still `#`. LinkedIn + Substack are real.
- [ ] **Optional proof points** (e.g. Genzi top-5 Product Hunt) — could surface in the Genzi tile tooltip.
- [ ] **Verify a Resend sending domain** (giancarlopeysack.com) so notification emails come from your domain instead of onboarding@resend.dev.
- [ ] **Unpublish the old Framer site** when convenient.
- [ ] **Validation thresholds:** decide how many waitlist signups = build it, before launch (so you don't move goalposts).

## Notes / gotchas

- Terminal on this Mac is locked to "click" tier for the assistant, so all git pushes must be run by you (the paste-able command is above).
- The `.git/index.lock` kept reappearing — the deploy command removes it preemptively.
- Font sizing is mobile-first: bigger on phones (26px), tighter on desktop (22px). CTAs are ~70% of body size. Don't "fix" mobile being bigger — that's intentional, matching Chris's design.
