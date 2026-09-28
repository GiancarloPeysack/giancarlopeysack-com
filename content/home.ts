// Content of the Home page (route /). Every string, link and image the page
// shows lives here. Facts come from Gianni's own products, the project
// folders and their code; nothing is invented.
//
// Positioning (2026-09-28): the site sells work, it does not ask for a job.
// One person who designs and builds: apps, websites, B2B software and AI.

export const homeContent = {
  meta: {
    title: "Gianni Peysack · Product builder, design to development",
    description:
      "I design and build products: apps, websites, B2B software and AI workflows. Case studies on MarketOpsIQ, Lexfall, Zharo, CampusMart and Genzi. Based in Madrid, working with companies anywhere.",
  },

  hero: {
    // Poster frame of the loop, so the arch is never empty and reduced-motion
    // visitors still see something.
    portrait: { src: "/portfolio/me/hero-loop.jpg", alt: "Gianni Peysack working on a laptop" },
    /** Phone: one vertical clip. Built by tools/build_hero_video.sh. */
    video: {
      mp4: "/portfolio/me/hero-loop.mp4",
      webm: "/portfolio/me/hero-loop.webm",
      poster: "/portfolio/me/hero-loop.jpg",
    },
    /**
     * Desktop and tablet: three vertical clips side by side in one file,
     * each running uncut. Built by tools/build_hero_band.sh.
     */
    band: {
      mp4: "/portfolio/me/hero-band.mp4",
      webm: "/portfolio/me/hero-band.webm",
      poster: "/portfolio/me/hero-band.jpg",
      alt: "Gianni working: a cafe, hands on a keyboard, and an office with code on screen",
    },
    firstName: "Gianni",
    lastName: "Peysack",
    tagline: ["Product builder in Madrid.", "From design to development."],
    /** The next step, right under the tagline. */
    actions: {
      primary: { text: "Start a project", link: "/contact" },
      secondary: { text: "See case studies", link: "/projects" },
    },
    /** The left label also shows Madrid's local time (see LocalTime). */
    labels: ["MADRID, ES", "TAKING PROJECTS"],
  },

  intro: {
    label: "[Intro]",
    reveal: {
      desktop:
        "I design and build products end to end, from consumer apps on the App Store to B2B software that answers to company rules. I also help companies find where AI creates real value for them and build it.",
      tablet:
        "I design and build products end to end, from consumer apps on the App Store to B2B software that answers to company rules. I also help companies find where AI creates real value for them and build it.",
      phone:
        "I design and build products end to end, from consumer apps on the App Store to B2B software that answers to company rules. I also help companies find where AI creates real value for them and build it.",
    },
    /** Marks of the products Gianni built, in the logo ticker; `fit` is the image's object-fit */
    logos: [
      { src: "/portfolio/logos/marketopsiq.png", fit: "contain", width: 101 },
      { src: "/portfolio/logos/genzi.png", fit: "contain", width: 101 },
      { src: "/portfolio/logos/lexfall.png", fit: "contain", width: 101 },
      { src: "/portfolio/logos/zharo.png", fit: "contain", width: 102 },
      { src: "/portfolio/logos/campusmart.png", fit: "contain", width: 102 },
    ] as { src: string; fit: "cover" | "contain"; width: number }[],
    button: { text: "More about me", link: "/about" },
  },

  /** Proof numbers, straight after the intro. Every one is checkable. */
  proof: {
    items: [
      { value: "5", label: "Products shipped" },
      { value: "2", label: "Paid B2B pilots" },
      { value: "200+", label: "Stores on MarketOpsIQ" },
      { value: "#5", label: "Product of the Day, Product Hunt" },
    ],
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

  /** The last thing on the page. Keep the orb up. */
  game: {
    label: "One more thing",
    heading: "Keep the orb up.",
    body: "Everything above is the work. This is here because a site should be worth staying on.",
    hint: "Move to aim, click to start",
  },

  /**
   * Off the clock. Drafted from what is actually on record (his own footage,
   * his CV and the products), so it stays true; he can swap any line.
   */
  personal: {
    label: "Off the clock",
    heading: "When I am not building.",
    columns: [
      { title: "Doing", items: ["Chess", "Bouldering", "Street interviews with strangers", "Live music, the smaller the room the better"] },
      { title: "Speaking", items: ["English", "Spanish", "German"] },
      { title: "Places", items: ["Madrid, where I live", "Managua, where I am from", "San José, where I studied first"] },
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
