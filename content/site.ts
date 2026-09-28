// Shared portfolio content: nav bar, mobile menu, footer and the
// "LET'S WORK TOGETHER" CTA.

export type NavLink = { title: string; href: string };
export type OptionalLink = { title: string; href?: string };

const EMAIL = "gc.peysack@gmail.com";
const LINKEDIN = "https://linkedin.com/in/gcpeysack";
const SUBSTACK = "https://giancarlopeysack.substack.com";

export const site = {
  // No ® (the template's): the name isn't a registered trademark.
  logo: "Gianni.p",

  nav: {
    links: [
      { title: "Case studies", href: "/projects" },
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
    ] satisfies NavLink[],
  },

  mobileMenu: {
    links: [
      { title: "Home", href: "/" },
      { title: "Case studies", href: "/projects" },
      { title: "About", href: "/about" },
      { title: "contact", href: "/contact" },
    ] satisfies NavLink[],
    socials: [
      { title: "LinkedIn", href: LINKEDIN },
      { title: "Substack", href: SUBSTACK },
    ] satisfies OptionalLink[],
    contacts: [{ title: EMAIL, href: `mailto:${EMAIL}` }] satisfies NavLink[],
  },

  footer: {
    links: [
      { title: "About", href: "/about" },
      { title: "Case studies", href: "/projects" },
      { title: "Contact", href: "/contact" },
    ] satisfies NavLink[],
    socials: [
      { title: "LINKEDIN", href: LINKEDIN },
      { title: "SUBSTACK", href: SUBSTACK },
      { title: "LINKS", href: "/links" },
    ] satisfies NavLink[],
    copyright: "© 2026 Gianni Peysack. All rights reserved. Madrid, Spain.",
  },

  /**
   * The closing section. The template ended on a wall of type reading
   * "LET'S WORK TOGETHER" with a photo behind it, which asked for nothing.
   * This asks for the project, and says what happens next.
   */
  closing: {
    label: "Work with me",
    heading: "Tell me what you are building.",
    body:
      "Send the idea, roughly when you need it and the budget range. You get a straight answer on whether I am the right person for it, what it would take, and what I would do first.",
    primary: { text: "Start a project", link: "/contact" },
    secondary: { text: EMAIL, link: `mailto:${EMAIL}` },
    image: { src: "/portfolio/me/cta.jpg", alt: "Gianni Peysack" },
    availability: "Taking projects for 2026",
    contacts: [
      { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
      { label: "LinkedIn", value: "in/gcpeysack", href: LINKEDIN },
      { label: "Writing", value: "Substack", href: SUBSTACK },
    ],
  },

  cta: {
    href: "/contact",
    image: "/portfolio/me/cta.jpg",
    // The desktop text wraps naturally; tablet and phone use fixed lines
    // scaled to fit (Framer "fit text"), so they are listed line by line.
    desktopText: "LET'S WORK TOGETHER ",
    tabletLines: ["LET'S WORK ", "TOGETHER "],
    phoneLines: ["LET'S ", "WORK", "TOGETHER "],
    cursorText: "START A PROJECT",
  },
};

export const contactLinks = { email: EMAIL, linkedin: LINKEDIN, substack: SUBSTACK };
