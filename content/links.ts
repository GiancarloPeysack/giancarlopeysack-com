// Content of /links, the page that goes in his Instagram and TikTok bios.
// The page's shape is the original one he liked: a narrow white column of
// plain sentences, each ending in a row of brand tiles. What 2026-10 added
// are the pictures - a rail of his posts under the writing line and a rail
// of app shots under the apps line - and the reasons to get in touch at the
// bottom. Nothing invented: tiles, URLs and app shots all come from the
// products themselves.
import type { Post } from "@/lib/substack";

export const EMAIL = "gc.peysack@gmail.com";

export const linksUrls = {
  marketops: "https://marketopsiq.com",
  genzi: "https://genzi.app",
  lexfall: "https://lexfall.app",
  zharo: "https://zharo.club",
  linkedin: "https://linkedin.com/in/gcpeysack",
  tiktok: "",
  instagram: "",
  substack: "https://giancarlopeysack.substack.com",
  sayHi: `mailto:${EMAIL}?subject=Hi`,
};

export const linksMeta = {
  title: "Gianni Peysack · Links",
  description: "Writing, the apps I have built, where I post, and how to start a project.",
};

export const linksContent = {
  /** Shown if the Substack feed cannot be reached at build time. */
  writingFallback: [
    {
      title: "The Study Everyone Quotes Wrong: Is AI Actually Making Us Dumber?",
      description: "The data says we are not losing our minds to AI. The detail is in how we use it.",
      date: "September 2026",
      href: "https://giancarlopeysack.substack.com/p/the-study-everyone-quotes-wrong-is",
    },
  ] as Post[],

  /** Slugs come from content/projects.ts; `site` is where the product lives.
   *  `image` / `note` override the case study card on this page only. */
  apps: [
    {
      slug: "lexfall",
      site: linksUrls.lexfall,
      image: "/portfolio/projects/lexfall/links-card-2026-11.jpg",
      note: "Short daily lessons for advanced English. A path built for your field or exam, from your level up to Expert.",
    },
    { slug: "zharo", site: linksUrls.zharo },
    { slug: "marketopsiq", site: linksUrls.marketops },
    { slug: "genzi", site: linksUrls.genzi },
    { slug: "campusmart", site: "" },
  ] as { slug: string; site: string; image?: string; note?: string }[],
};
