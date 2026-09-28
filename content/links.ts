// Content of /links, the page that goes in his Instagram and TikTok bios.
// Someone lands here from a phone, so it is a short stack of things to tap:
// what he writes, what he has built, where he posts, and the three reasons
// a stranger would actually contact him.
import type { Post } from "@/lib/substack";

const EMAIL = "gc.peysack@gmail.com";
const SUBSTACK = "https://giancarlopeysack.substack.com";
const LINKEDIN = "https://linkedin.com/in/gcpeysack";

export const linksMeta = {
  title: "Gianni Peysack · Links",
  description: "Writing, the apps I have built, where I post, and how to start a project.",
};

export const linksContent = {
  greeting: "Hi, I'm Gianni Peysack",
  line: "Product builder in Madrid. I design and build apps, websites and AI that does real work.",
  avatar: { src: "/gianni.jpg", alt: "Gianni Peysack" },

  writing: {
    label: "I write here",
    cta: { text: "All posts on Substack", href: SUBSTACK },
    /** Shown if the Substack feed cannot be reached at build time. */
    fallback: [
      {
        title: "The Study Everyone Quotes Wrong: Is AI Actually Making Us Dumber?",
        description: "The data says we are not losing our minds to AI. The detail is in how we use it.",
        date: "September 2026",
        href: "https://giancarlopeysack.substack.com/p/the-study-everyone-quotes-wrong-is",
      },
    ] as Post[],
  },

  apps: {
    label: "I build apps",
    /** Slugs come from content/projects.ts; `site` is where the product lives. */
    items: [
      { slug: "lexfall", site: "https://lexfall.app" },
      { slug: "zharo", site: "https://zharo.club" },
      { slug: "marketopsiq", site: "https://marketopsiq.com" },
      { slug: "genzi", site: "https://genzi.app" },
      { slug: "campusmart", site: "" },
    ],
    cta: { text: "Read the case studies", href: "/projects" },
  },

  social: {
    label: "I post here",
    items: [
      { title: "LinkedIn", value: "in/gcpeysack", href: LINKEDIN },
      { title: "Substack", value: "Thinking out loud", href: SUBSTACK },
      // Waiting on his handles; disabled rather than linking nowhere.
      { title: "TikTok", value: "Soon", href: "" },
      { title: "Instagram", value: "Soon", href: "" },
    ],
  },

  actions: {
    label: "Work with me",
    items: [
      { title: "Need design, dev or AI help?", value: "Start a project", href: "/contact" },
      { title: "Want to sponsor a video?", value: "Sponsorship details", href: "/sponsor" },
      { title: "Running field teams or stores?", value: "Pilot MarketOpsIQ", href: "/pilot" },
    ],
    quiet: [
      { title: "Say hi", href: `mailto:${EMAIL}?subject=Hi` },
      { title: "Download CV", href: "/Gianni-Peysack-CV.pdf" },
    ],
  },
};
