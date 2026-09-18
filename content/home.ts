// Content of the Home page (route /). Every string, link and image the page
// shows lives here. Facts come from Giancarlo's CV, the products' own sites
// and the project folders; nothing is invented.

export const homeContent = {
  meta: {
    title: "Giancarlo Peysack · Product Manager",
    description:
      "Product builder in Madrid. Case studies on MarketOpsIQ, Genzi, Lexfall, Zharo and CampusMart: from customer discovery to shipped products.",
  },

  hero: {
    portrait: { src: "/portfolio/me/hero.jpg", alt: "Portrait of Giancarlo Peysack" },
    firstName: "Giancarlo",
    lastName: "Peysack",
    tagline: ["Product builder based in Madrid", "open to product manager roles."],
    labels: ["MADRID, ES", "PRODUCT MANAGER"],
  },

  intro: {
    label: "[Intro]",
    reveal: {
      desktop:
        "I'm a product builder in Madrid. I took a B2B SaaS from zero to paid pilots, co-founded a music app that reached Product Hunt's top 5, and ship across mobile and web, always starting from the customer.",
      tablet:
        "I'm a product builder in Madrid. I took a B2B SaaS from zero to paid pilots, co-founded a music app that reached Product Hunt's top 5, and ship across mobile and web, always starting from the customer.",
      phone:
        "I'm a product builder in Madrid. I took a B2B SaaS from zero to paid pilots, co-founded a music app that reached Product Hunt's top 5, and ship across mobile and web, always starting from the customer.",
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
    heading: "SELECTED WORK",
    button: { text: "All Projects", link: "/projects" },
  },

  services: {
    label: "Focus",
    heading: "What I do.",
    items: [
      {
        number: "01",
        title: "Customer discovery",
        description:
          "I start on calls with the people who will use the product, and I build from what they say they need. MarketOpsIQ's AI price scanner came out of a single customer call.",
      },
      {
        number: "02",
        title: "Roadmaps & Prioritization",
        description:
          "Most of the job is saying no. I rank work by what moves the customer and the business, and keep the roadmap short enough to actually ship.",
      },
      {
        number: "03",
        title: "Shipping mobile & web",
        description:
          "I take products from Figma to release: iOS and Android apps, web dashboards and a Chrome extension, working directly with developers or building hands-on.",
      },
      {
        number: "04",
        title: "Go-to-market",
        description:
          "Positioning, launches and growth: a #5 Product Hunt launch, founder-led TikTok content with 100K+ views, App Store listings and pilot proposals for B2B buyers.",
      },
      {
        number: "05",
        title: "Data & Analytics",
        description:
          "Forecasting models, KPI dashboards and market research from consulting and Statista, used to decide what to build next and to show whether it worked.",
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
};
