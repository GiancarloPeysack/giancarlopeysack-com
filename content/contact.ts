// Content of the Contact page (template copy, stage 1). Every string, link and
// option shown by the page lives here so stage 2 (personalisation) is pure data
// editing. Sources: spec/contact/meta.json (head) and the Framer page module
// cOdIYR9N2Fn2… (form fields, select options, contact details, title).

export type ContactTextField = {
  kind: "text" | "email" | "textarea";
  /** key used in the JSON payload sent to /api/notify */
  key: string;
  /** DOM name attribute */
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
};

export type ContactSelectField = {
  kind: "select";
  key: string;
  name: string;
  label: string;
  required?: boolean;
  options: { title: string; value: string; disabled?: boolean }[];
};

export type ContactField = ContactTextField | ContactSelectField;

export const contactMeta = {
  title: "Contact · Gianni Peysack",
  description:
    "Tell me about the project: an app, a website, B2B software or an AI workflow. Also MarketOpsIQ pilots and video sponsorships.",
};

export const contactContent = {
  form: {
    fields: [
      { kind: "text", key: "name", name: "Name", label: "Name", placeholder: "Jane Smith", required: true },
      { kind: "text", key: "company", name: "Company", label: "Company", placeholder: "Acme Ltd." },
      { kind: "email", key: "email", name: "Email", label: "Email", placeholder: "jane@company.com", required: true },
      {
        kind: "select",
        key: "projectType",
        name: "Topic",
        label: "What's it about?",
        required: true,
        options: [
          { title: "Select…", value: "", disabled: true },
          { title: "App or MVP", value: "App or MVP" },
          { title: "Website or landing page", value: "Website or landing page" },
          { title: "AI workflow or automation", value: "AI workflow or automation" },
          { title: "Product design", value: "Product design" },
          { title: "MarketOpsIQ pilot", value: "MarketOpsIQ pilot" },
          { title: "Sponsor a video", value: "Sponsor a video" },
          { title: "Other", value: "Other" },
        ],
      },
      {
        kind: "select",
        key: "stage",
        name: "Stage",
        label: "Where are you?",
        options: [
          { title: "Select…", value: "", disabled: true },
          { title: "Idea, nothing built yet", value: "Idea, nothing built yet" },
          { title: "Early product, no revenue", value: "Early product, no revenue" },
          { title: "Product with revenue", value: "Product with revenue" },
          { title: "Established company", value: "Established company" },
          { title: "Something else", value: "Something else" },
        ],
      },
      {
        kind: "select",
        key: "budget",
        name: "Budget",
        label: "Budget",
        options: [
          { title: "Select…", value: "", disabled: true },
          { title: "Under 5K", value: "Under 5K" },
          { title: "5K to 15K", value: "5K to 15K" },
          { title: "15K to 40K", value: "15K to 40K" },
          { title: "Over 40K", value: "Over 40K" },
          { title: "Monthly retainer", value: "Monthly retainer" },
          { title: "Not sure yet", value: "Not sure yet" },
        ],
      },
      {
        kind: "textarea",
        key: "message",
        name: "Message",
        label: "Tell me more",
        placeholder: "A few lines about what you want built, and by when.",
      },
    ] as ContactField[],
    button: { default: "Submit", success: "Thank you", error: "Something went wrong" },
  },
  details: {
    email: { caption: "email", title: "gc.peysack@gmail.com", link: "mailto:gc.peysack@gmail.com" },
    resume: { caption: "resume", title: "Download CV (PDF)", link: "/Gianni-Peysack-CV.pdf" },
    // The template's phone slot, used for LinkedIn
    phone: { caption: "LinkedIn", title: "in/gcpeysack", link: "https://linkedin.com/in/gcpeysack" },
    socials: {
      caption: "social",
      links: [
        { title: "LINKEDIN", link: "https://linkedin.com/in/gcpeysack" },
        { title: "SUBSTACK", link: "https://giancarlopeysack.substack.com" },
      ],
    },
    title: {
      desktop: ["Let's build ", "something useful."],
      tablet: ["Let's build ", "something ", "useful."],
    },
  },
};
