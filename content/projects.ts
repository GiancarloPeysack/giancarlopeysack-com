// Projects index + case studies. Facts come from Giancarlo's CV, the
// products' own sites and the project folders; client names stay anonymous.
// Rich text bodies are plain semantic HTML (h3/h4/p/ul/ol/li/blockquote/
// strong/br) rendered with the template's rich-text styles; they are static
// strings from this file only.

export type ProjectImage = { src: string; alt: string };

export type ProjectCardData = {
  name: string;
  year: string;
  image: string;
  /** shown on hover */
  image2: string;
};

export type CaseStudy = {
  slug: string;
  meta: { title: string; description: string };
  card: ProjectCardData;
  title: string;
  subtitle: string;
  /** one string per paragraph; "" renders an empty paragraph */
  description: string[];
  details: { label: string; value: string }[];
  banner: ProjectImage;
  bodyHtml: string;
  /** full-width image, then the left and right halves */
  gallery: [ProjectImage, ProjectImage, ProjectImage];
  /** slugs of the three "other projects" cards */
  others: string[];
};

const img = (slug: string, name: string, alt: string): ProjectImage => ({
  src: `/portfolio/projects/${slug}/${name}.jpg`,
  alt,
});

export const projectsIndex = {
  meta: {
    title: "Projects · Giancarlo Peysack",
    description:
      "Products Giancarlo Peysack has built: MarketOpsIQ, Genzi, Lexfall, Zharo and CampusMart. B2B SaaS, consumer apps and browser tools.",
  },
  title: "Projects.",
  intro: {
    desktop: [
      "(2022-26©)",
      "        I've built products across B2B SaaS, consumer apps and browser tools. Here are the ones I've shipped.",
    ],
    phone: [
      "(2022-26©)",
      "        I've built products across B2B SaaS, consumer apps and browser tools. Here are the ones I've shipped.",
    ],
  },
  label: "Projects - 01",
  order: ["lexfall", "zharo", "marketopsiq", "campusmart", "genzi"],
};

/** Card order in the Home page's "Selected work": most recent first. */
export const homeProjectOrder: string[] = ["lexfall", "zharo", "marketopsiq", "campusmart", "genzi"];

/** Header of the "other projects" block under every case study. */
export const otherProjectsHeader = {
  label: { desktop: "More work", phone: "More work" },
  heading: { desktop: "More projects", phone: "More projects" },
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "lexfall",
    meta: {
      title: "Lexfall · Giancarlo Peysack",
      description:
        "Case study: designing, building and launching Lexfall solo, an advanced vocabulary app with a Home Screen widget and paying subscribers in its first month.",
    },
    card: {
      name: "Lexfall",
      year: "2026",
      image: "/portfolio/projects/lexfall/card.jpg",
      image2: "/portfolio/projects/lexfall/card-hover.jpg",
    },
    title: "Lexfall",
    subtitle: "Expand your vocabulary beyond average",
    description: [
      "Lexfall is a minimalist vocabulary app for advanced and native English speakers. It serves C1 to C2 words chosen for your field, from medicine and law to business, and delivers them to your Home and Lock Screen so you learn without opening the app. I designed, built and launched it solo in 2026, and it had paying subscribers in its first month.",
    ],
    details: [
      { label: "Role", value: "Founder, solo" },
      { label: "Year", value: "2026" },
      { label: "Industry", value: "Consumer, EdTech" },
      { label: "Platform", value: "iOS, Android soon" },
    ],
    banner: img("lexfall", "banner", "The Lexfall website: expand your vocabulary beyond average"),
    bodyHtml:
      "<h3>The problem</h3><p>Vocabulary apps stop at the basics. Advanced speakers, and professionals such as nurses and doctors working in English abroad, need the rare, exact words of their own field, in a habit that fits a busy day.</p>" +
      "<h3>What I did</h3><ul>" +
      "<li><p><strong>Positioning</strong><br>Researched who actually pays and moved from general vocabulary to field-specific tracks for medicine, law and business.</p></li>" +
      "<li><p><strong>The daily habit</strong><br>A swipeable feed of one word at a time with pronunciation, definitions and examples, spaced repetition so words stick, and a test that finds your real level.</p></li>" +
      "<li><p><strong>Learning without opening the app</strong><br>A Home and Lock Screen widget and daily notifications that teach a new word every few hours.</p></li>" +
      "</ul>" +
      "<h3>Early results</h3><p>Less than 30 days after launch, from App Store Connect:</p><ul>" +
      "<li><p>2.17K App Store impressions and 131 product page views</p></li>" +
      "<li><p>33 first downloads, a 2.6% conversion rate</p></li>" +
      "<li><p>4 subscription starts, with about 11% of downloads converting to a paid subscription by day 14</p></li>" +
      "<li><p>Built end to end by me: product, design, code and go-to-market</p></li>" +
      "</ul>",
    gallery: [
      img("lexfall", "wide", "Lexfall: exactly what's in the app"),
      img("lexfall", "left", "Lexfall on iPhone"),
      img("lexfall", "right", "Lexfall's Home Screen widget"),
    ],
    others: ["zharo", "marketopsiq", "campusmart"],
  },
  {
    slug: "zharo",
    meta: {
      title: "Zharo · Giancarlo Peysack",
      description:
        "Case study: Zharo, a Chrome extension that drafts LinkedIn comments and posts in your own voice, right inside LinkedIn.",
    },
    card: {
      name: "Zharo",
      year: "2026",
      image: "/portfolio/projects/zharo/card.jpg",
      image2: "/portfolio/projects/zharo/card-hover.jpg",
    },
    title: "Zharo",
    subtitle: "Comment and post on LinkedIn, in your voice",
    description: [
      "Zharo is a Chrome extension that lives inside LinkedIn. It learns how you write, scores which posts are worth your time, and drafts comments and posts in your voice, right where you're already scrolling.",
    ],
    details: [
      { label: "Role", value: "Founder" },
      { label: "Year", value: "2026" },
      { label: "Industry", value: "AI, creator tools" },
      { label: "Platform", value: "Chrome extension" },
    ],
    banner: img("zharo", "banner", "The Zharo website: comment and post on LinkedIn, in your voice"),
    bodyHtml:
      "<h3>The problem</h3><p>Posting and commenting on LinkedIn works, but it takes time, and generic AI tools sound like generic AI tools. People need help that sounds like them, without leaving the feed or babysitting another dashboard.</p>" +
      "<h3>What I did</h3><ul>" +
      "<li><p><strong>In the flow, not another app</strong><br>Built Zharo as a Chrome extension so it works inside LinkedIn, with nothing to switch to.</p></li>" +
      "<li><p><strong>Voice learning</strong><br>It learns from how you write, so comments and posts read like you, not like a template.</p></li>" +
      "<li><p><strong>Post scoring</strong><br>Every post in the feed gets a score for how worth engaging it is, so time goes where it matters.</p></li>" +
      "</ul>" +
      "<h3>Status</h3><p>In private beta ahead of the Chrome Web Store launch.</p>",
    gallery: [
      img("zharo", "wide", "Zharo scoring and drafting inside the LinkedIn feed"),
      img("zharo", "left", "The Zharo mark"),
      img("zharo", "right", "A post drafted in your voice with Zharo"),
    ],
    others: ["marketopsiq", "campusmart", "genzi"],
  },
  {
    slug: "marketopsiq",
    meta: {
      title: "MarketOpsIQ · Giancarlo Peysack",
      description:
        "Case study: taking a field operations and shelf price intelligence platform for CPG brands from zero to two paid pilots.",
    },
    card: {
      name: "MarketOpsIQ",
      year: "2025",
      image: "/portfolio/projects/marketopsiq/card.jpg",
      image2: "/portfolio/projects/marketopsiq/card-hover.jpg",
    },
    title: "MarketOpsIQ",
    subtitle: "Field operations and shelf price intelligence for CPG brands",
    description: [
      "MarketOpsIQ replaces spreadsheets, group chats and manual store reports for CPG field teams. Merchandisers snap a shelf photo, AI reads every price, and managers see verified visits, competitor prices and alerts in one place. I built it from zero to two paid pilots.",
    ],
    details: [
      { label: "Role", value: "Founder & Builder" },
      { label: "Year", value: "2025 - now" },
      { label: "Industry", value: "B2B SaaS, CPG" },
      { label: "Platform", value: "iOS, Android & web" },
    ],
    banner: img("marketopsiq", "banner", "The MarketOpsIQ website: field operations and AI shelf price intelligence for CPG brands"),
    bodyHtml:
      "<h3>The problem</h3><p>CPG brands and distributors lose money at the shelf without seeing it. Prices drift, competitor promotions launch, and field updates disappear into chat threads and spreadsheets. Managers can't tell which stores were visited, whether the checklist was done, or what a competitor changed yesterday.</p>" +
      "<h3>What I did</h3><ul>" +
      "<li><p><strong>Discovery first</strong><br>Ran customer discovery with field operations teams and turned their calls straight into the roadmap.</p></li>" +
      "<li><p><strong>End-to-end product</strong><br>Owned the mobile app, the web dashboard and the analytics: verified store visits, in-visit price capture, routes, structured team chat and auto-generated reports.</p></li>" +
      "<li><p><strong>AI price recognition</strong><br>Scoped and shipped an AI camera feature that reads every price from one shelf photo, after a single customer call and without a formal PM cycle.</p></li>" +
      "</ul>" +
      "<h3>Results</h3><ul>" +
      "<li><p>2 paid pilots with a CPG distributor</p></li>" +
      "<li><p>37 field merchandisers, 50+ SKUs and 200+ stores on the platform</p></li>" +
      "<li><p>Now the team's system of record, replacing manual field operations coordination</p></li>" +
      "</ul>" +
      "<h3>Highlights</h3><ul>" +
      "<li><p>Merchandiser app for iOS and Android</p></li>" +
      "<li><p>Web dashboard with KPI reports</p></li>" +
      "<li><p>AI shelf photo price extraction</p></li>" +
      "<li><p>Competitor web price monitoring and alerts</p></li>" +
      "</ul>",
    gallery: [
      img("marketopsiq", "wide", "MarketOpsIQ: how it works, from setup to insights"),
      img("marketopsiq", "left", "MarketOpsIQ app: structured store reports"),
      img("marketopsiq", "right", "MarketOpsIQ app: real-time insights"),
    ],
    others: ["campusmart", "genzi", "lexfall"],
  },
  {
    slug: "campusmart",
    meta: {
      title: "CampusMart · Giancarlo Peysack",
      description:
        "Case study: CampusMart, a student super-app for Constructor University with a marketplace, food ordering and a community feed.",
    },
    card: {
      name: "CampusMart",
      year: "2025",
      image: "/portfolio/projects/campusmart/card.jpg",
      image2: "/portfolio/projects/campusmart/card-hover.jpg",
    },
    title: "CampusMart",
    subtitle: "The student super-app for campus life",
    description: [
      "CampusMart brings campus life into one app for Constructor University students: a second-hand marketplace for furniture and housing, food ordering with student discounts, and a community feed. I founded it, designed it in Figma and led a contract developer to a launch-ready iOS and Android app.",
    ],
    details: [
      { label: "Role", value: "Founder & PM" },
      { label: "Year", value: "2025" },
      { label: "Industry", value: "Marketplace, students" },
      { label: "Platform", value: "iOS & Android" },
    ],
    banner: img("campusmart", "banner", "CampusMart screens: marketplace, food ordering and community"),
    bodyHtml:
      "<h3>The problem</h3><p>On a residential campus, students buy and sell furniture, look for housing and order food through scattered group chats. Nothing was built for how a campus actually works.</p>" +
      "<h3>What I did</h3><ul>" +
      "<li><p><strong>Company and scope</strong><br>Registered CampusMart as a business in Germany and defined the product scope version by version.</p></li>" +
      "<li><p><strong>Design</strong><br>Designed the app in Figma: marketplace, food ordering with student discounts, cart and checkout, and a communities feed for posts, housing offers and messages.</p></li>" +
      "<li><p><strong>Managing the build</strong><br>Hired and managed a contract developer in my own Firebase and GitHub, with Stripe Connect for payments, and prepared the iOS and Android releases.</p></li>" +
      "</ul>" +
      "<h3>Highlights</h3><ul>" +
      "<li><p>Marketplace, food ordering and community in one app</p></li>" +
      "<li><p>Stripe Connect payments and a Firebase backend</p></li>" +
      "<li><p>Built for iOS and Android</p></li>" +
      "</ul>",
    gallery: [
      img("campusmart", "wide", "CampusMart screens"),
      img("campusmart", "left", "CampusMart marketplace"),
      img("campusmart", "right", "CampusMart community feed"),
    ],
    others: ["genzi", "lexfall", "zharo"],
  },
  {
    slug: "genzi",
    meta: {
      title: "Genzi · Giancarlo Peysack",
      description:
        "Case study: co-founding Genzi, a social app for music fans: from concept to a live iOS app, #5 on Product Hunt and founder-led TikTok marketing.",
    },
    card: {
      name: "Genzi",
      year: "2022",
      image: "/portfolio/projects/genzi/card.jpg",
      image2: "/portfolio/projects/genzi/card-hover.jpg",
    },
    title: "Genzi",
    subtitle: "Music, made social",
    description: [
      "Genzi is a social app for music fans, musicians and organizers. You share what you're listening to, join communities built around genres and local scenes, and meet people at real events. I co-founded it in 2022, was its PM at the start, managing an external developer from concept to a live iOS app, and led the marketing: founder-led TikTok content since 2022 with 100K+ views, and a #5 Product of the Day launch on Product Hunt.",
    ],
    details: [
      { label: "Role", value: "Co-founder, PM & marketing" },
      { label: "Year", value: "2022 - now" },
      { label: "Industry", value: "Consumer social, music" },
      { label: "Platform", value: "iOS" },
    ],
    banner: img("genzi", "banner", "The Genzi website: music, made social"),
    bodyHtml:
      "<h3>The problem</h3><p>Most platforms are built for content, not connection. Music fans discover songs alone and rarely find the people who love the same niche scenes, even when they're at the same concert.</p>" +
      "<h3>What I did</h3><ul>" +
      "<li><p><strong>Product direction</strong><br>Defined the features and prioritized them against user feedback with a two-person founding team.</p></li>" +
      "<li><p><strong>PM for the first build</strong><br>At the start I worked as the product manager: I managed an external developer for six months, defining the features, setting priorities and directing the build, and took Genzi from concept to a shippable app with Spotify and Apple Music integrations.</p></li>" +
      "<li><p><strong>Design</strong><br>Led product vision and UX/UI direction in Figma.</p></li>" +
      "<li><p><strong>Founder-led marketing</strong><br>Started <a href=\"https://www.tiktok.com/@genzi.app\" target=\"_blank\" rel=\"noopener noreferrer\">Genzi's TikTok</a> in 2022 and fronted it myself: street interviews in Madrid asking people which song reminds them of someone special, and POV videos riding music trends, all pointing back to the app. Also ran positioning and IRL events.</p></li>" +
      "<li><p><strong>Product Hunt launch</strong><br><a href=\"https://www.producthunt.com/products/genzi\" target=\"_blank\" rel=\"noopener noreferrer\">Launched on Product Hunt</a> in 2026 as the social app built around music.</p></li>" +
      "</ul>" +
      "<h3>Results</h3><ul>" +
      "<li><p>#5 Product of the Day on Product Hunt with 201 upvotes, featured to 1M+ readers</p></li>" +
      "<li><p>TikTok: 100K+ views and 11K likes on the top street interview, 36K+ likes and ~1.5K followers on the account</p></li>" +
      "<li><p>~500 active users in the first 4 months after launch</p></li>" +
      "<li><p>Live on the App Store, with an Android waitlist</p></li>" +
      "</ul>",
    gallery: [
      img("genzi", "wide", "Genzi's TikTok: street interviews and POV music videos fronted by Giancarlo"),
      img("genzi", "left", "Genzi on Product Hunt: #5 Day Rank with 201 upvotes"),
      img("genzi", "right", "Friends laughing at a concert"),
    ],
    others: ["lexfall", "zharo", "marketopsiq"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  const decoded = safeDecode(slug);
  return caseStudies.find((c) => c.slug === decoded);
}

export function projectHref(slug: string) {
  return `/projects/${slug}`;
}

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}
