// Content of the About page (route /about). Every string, link and image the
// page shows lives here. Facts come from Giancarlo's CV and project folders.

export type AboutStat = {
  /** Counter start value */
  start: number;
  /** Counter end value (the number shown once counted up) */
  end: number;
  prefix: string;
  suffix: string;
  /** Label under the number on tablet and desktop */
  label: string;
  /** Label under the number on phone (template override) */
  phoneLabel: string;
};

export type AboutExperience = {
  period: string;
  title: string;
  description: string;
  /** Company logo, 812x296 png shown 117x59 object-fit contain */
  logo: string;
};

export type AboutAward = {
  year: string;
  title: string;
  source: string;
};

export const aboutContent = {
  meta: {
    title: "About · Giancarlo Peysack",
    description:
      "Product builder in Madrid, finishing a BA in International Business. Founder of MarketOpsIQ, co-founder of Genzi, maker of Lexfall, Zharo and CampusMart.",
  },

  hero: {
    label: "About me",
    paragraphs: [
      "I'm a product builder based in Madrid, finishing a BA in International Business at Constructor University. Before that I studied international relations in Nicaragua and Costa Rica, and I work in English, Spanish and German.",
      "Since 2022 I've built products from zero: a music social app, a field-ops platform for CPG brands with paying pilots, a vocabulary app, a LinkedIn extension and a campus marketplace. Now I'm looking for a product manager role where I can keep shipping what customers need.",
    ],
    portrait: { src: "/portfolio/me/about.jpg", alt: "Portrait of Giancarlo Peysack" },
    /** Optional handwritten signature under the bio (the template shows one) */
    signature: undefined as { src: string; alt: string } | undefined,
  },

  process: {
    label: "Process",
    title: "MY APPROACH",
    intro: "Every product I build starts with a customer conversation and ends in someone's hands.",
    steps: [
      {
        number: "01",
        title: "Talk to users first",
        description:
          "I run discovery before I design anything. MarketOpsIQ's AI price scanner came out of a single customer call.",
      },
      {
        number: "02",
        title: "Cut to the core",
        description:
          "I prioritize ruthlessly: one clear problem, the smallest thing that solves it, and a roadmap short enough to ship.",
      },
      {
        number: "03",
        title: "Ship, measure, repeat",
        description:
          "Launches are how I learn. I ship early, watch the numbers and iterate with the people using the product.",
      },
    ],
  },

  stats: {
    items: [
      { start: 0, end: 5, prefix: "", suffix: "", label: "Products built", phoneLabel: "Products built" },
      { start: 0, end: 2, prefix: "", suffix: "", label: "Paid B2B pilots", phoneLabel: "Paid B2B pilots" },
      { start: 0, end: 200, prefix: "", suffix: "+", label: "Stores on MarketOpsIQ", phoneLabel: "Stores covered" },
      { start: 0, end: 1000, prefix: "", suffix: "+", label: "Research reports", phoneLabel: "Research reports" },
    ] as AboutStat[],
  },

  experience: {
    label: "Experience",
    title: "MY JOURNEY",
    items: [
      {
        period: "2025-now",
        title: "Founder & Builder, MarketOpsIQ",
        description:
          "Own the product end to end, from the mobile app and web dashboard to analytics. Landed two paid pilots with a CPG distributor.",
        logo: "/portfolio/companies/marketopsiq.png",
      },
      {
        period: "2025",
        title: "Business Consultant Intern, Stratle",
        description:
          "Built a 6-month forecasting model that informed a client's pricing and feature priorities, and GTM KPI dashboards across 3 launch cycles.",
        logo: "/portfolio/companies/stratle.png",
      },
      {
        period: "2025",
        title: "Product Marketing Intern, Constructor Tech",
        description:
          "Owned competitor research and GTM planning across 3+ software products, and turned the findings into product positioning.",
        logo: "/portfolio/companies/constructor.png",
      },
      {
        period: "2024-2025",
        title: "Research Assistant, Statista",
        description:
          "Published 1,000+ statistical reports across banking, corporate and advertising, plus custom analysis for premium clients.",
        logo: "/portfolio/companies/statista.png",
      },
    ] as AboutExperience[],
  },

  awards: {
    label: "Milestones",
    title: "Milestones & Education",
    /** Three lines separated by line breaks */
    quote: ["I build for users, not trophies,", "but when a launch takes off,", "I'll take the spotlight."],
    items: [
      { year: "2026", title: "#5 Product of the Day on Product Hunt", source: "Genzi" },
      { year: "2026", title: "Paying subscribers in the first month", source: "Lexfall" },
      { year: "2026", title: "Two paid B2B pilots", source: "MarketOpsIQ" },
      { year: "2022", title: "100K+ views on a founder-led TikTok", source: "Genzi" },
      { year: "2023-2026", title: "BA International Business", source: "Constructor University" },
      { year: "2019-2022", title: "International Relations studies", source: "Nicaragua & Costa Rica" },
    ] as AboutAward[],
  },
};

export type AboutContent = typeof aboutContent;
