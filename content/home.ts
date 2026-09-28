// Content of the Home page (route /). Every string, link and image the page
// shows lives here. Facts come from Giancarlo's own products, the project
// folders and their code; nothing is invented.
//
// Positioning (2026-09-28): the site sells work, it does not ask for a job.
// One person who designs and builds: apps, websites, B2B software and AI.

export const homeContent = {
  meta: {
    title: "Giancarlo Peysack · Product builder, design to development",
    description:
      "I design and build products: apps, websites, B2B software and AI workflows. Case studies on MarketOpsIQ, Lexfall, Zharo, CampusMart and Genzi. Based in Madrid, working with companies anywhere.",
  },

  hero: {
    // Poster frame of the loop, so the arch is never empty and reduced-motion
    // visitors still see something.
    portrait: { src: "/portfolio/me/hero-loop.jpg", alt: "Giancarlo Peysack working on a laptop" },
    /** Muted loop inside the hero arch. Built by tools/build_hero_video.sh. */
    video: {
      mp4: "/portfolio/me/hero-loop.mp4",
      webm: "/portfolio/me/hero-loop.webm",
      poster: "/portfolio/me/hero-loop.jpg",
    },
    firstName: "Giancarlo",
    lastName: "Peysack",
    tagline: ["Product builder in Madrid.", "From design to development."],
    labels: ["MADRID, ES", "TAKING PROJECTS"],
  },

  intro: {
    label: "[Intro]",
    reveal: {
      desktop:
        "I design and build products end to end: B2B software that answers to company rules and audit trails, consumer apps on the App Store, and AI that does real work inside a business.",
      tablet:
        "I design and build products end to end: B2B software that answers to company rules and audit trails, consumer apps on the App Store, and AI that does real work inside a business.",
      phone:
        "I design and build products end to end: B2B software that answers to company rules and audit trails, consumer apps on the App Store, and AI that does real work inside a business.",
    },
    /** Marks of the products Giancarlo built, in the logo ticker; `fit` is the image's object-fit */
    logos: [
      { src: "/portfolio/logos/marketopsiq.png", fit: "contain", width: 101 },
      { src: "/portfolio/logos/genzi.png", fit: "contain", width: 101 },
      { src: "/portfolio/logos/lexfall.png", fit: "contain", width: 101 },
      { src: "/portfolio/logos/zharo.png", fit: "contain", width: 102 },
      { src: "/portfolio/logos/campusmart.png", fit: "contain", width: 102 },
    ] as { src: string; fit: "cover" | "contain"; width: number }[],
    button: { text: "More about me", link: "/about" },
  },

  selectedCases: {
    heading: "CASE STUDIES",
    button: { text: "All case studies", link: "/projects" },
  },

  services: {
    label: "Services",
    heading: "What I build.",
    items: [
      {
        number: "01",
        title: "Apps & MVPs",
        description:
          "iOS, Android and web, from an empty repo to a live store listing. Lexfall went from nothing to paying subscribers in its first month, designed and built by me alone.",
      },
      {
        number: "02",
        title: "Websites that convert",
        description:
          "Marketing sites and landing pages in Next.js instead of a page builder: fast, indexable, and yours to keep. This site is one of them.",
      },
      {
        number: "03",
        title: "Product design",
        description:
          "Flows, UI and a design system in Figma, drawn by the person who then builds it, so nothing is lost between the file and the release.",
      },
      {
        number: "04",
        title: "AI workflows & automation",
        description:
          "Agents, internal tools and automations that remove real work. I map the process first, then build the smallest thing that kills the manual step.",
      },
      {
        number: "05",
        title: "B2B software with rules",
        description:
          "Software for teams that answer to somebody: role permissions, audit trails and data handling built in from the start. That is what MarketOpsIQ runs on.",
      },
    ],
    /**
     * Images of the hover cursor on desktop, one per item in order. The
     * cursor slides a vertical stack of them (template component "Cursor images").
     */
    cursorImages: [
      { src: "/portfolio/services/1.jpg", position: "center center" },
      { src: "/portfolio/services/2.jpg", position: "center center" },
      { src: "/portfolio/services/3.jpg", position: "center center" },
      { src: "/portfolio/services/4.jpg", position: "center center" },
      { src: "/portfolio/services/5.jpg", position: "center center" },
    ],
  },

  /** Rigo-style process columns: the same three steps on every project. */
  process: {
    label: "Process",
    heading: "How I work.",
    columns: [
      {
        title: "Strategy",
        items: [
          "Calls with the people who will use it",
          "Scope, and what we are not building",
          "One number that says it worked",
          "Price and timeline before we start",
        ],
      },
      {
        title: "Design",
        items: ["Flows and wireframes", "UI in Figma", "Design system and components", "A prototype you can click"],
      },
      {
        title: "Build & ship",
        items: ["Web, iOS and Android", "Integrations, data and dashboards", "Store listing and launch", "Analytics, then the next round"],
      },
    ],
  },

  /** The AI section: how it shows up in the work and what I sell around it. */
  ai: {
    label: "AI",
    heading: "AI that earns its place.",
    columns: [
      {
        title: "Built with AI",
        body:
          "Every project on this page was built with AI in the loop. That is how one person ships an iOS app, a B2B platform and this site in the same year.",
      },
      {
        title: "AI inside your product",
        body:
          "The part people pay for: a price scanner that reads a shelf photo, outreach that writes in your voice, the manual step in your process gone.",
      },
      {
        title: "AI for your team",
        body:
          "Setup, workflows and training so your team uses these tools on real work instead of pasting into a chat window.",
      },
    ],
  },

  /**
   * Writing. The list is pulled from the Substack RSS feed at build time (see
   * components/julian/home/Writing.tsx); these entries are the fallback when
   * the feed cannot be reached.
   */
  writing: {
    label: "Writing",
    heading: "Thinking out loud.",
    feed: "https://giancarlopeysack.substack.com/feed",
    posts: [
      {
        title: "The Study Everyone Quotes Wrong: Is AI Actually Making Us Dumber?",
        description:
          "The data says we are not losing our minds to AI. The detail is in how we use it.",
        date: "September 2026",
        href: "https://giancarlopeysack.substack.com/p/the-study-everyone-quotes-wrong-is",
      },
    ],
    button: { text: "Read on Substack", link: "https://giancarlopeysack.substack.com" },
  },
};
