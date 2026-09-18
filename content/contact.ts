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
  title: "Contact · Giancarlo Peysack",
  description:
    "Get in touch with Giancarlo Peysack about product manager roles, a MarketOpsIQ pilot, a video sponsorship or anything else.",
};

export const contactContent = {
  form: {
    fields: [
      { kind: "text", key: "name", name: "Name", label: "Name", placeholder: "Jane Smith" },
      { kind: "email", key: "email", name: "Email", label: "Email", placeholder: "jane@company.com" },
      {
        kind: "select",
        key: "projectType",
        name: "Topic",
        label: "What's it about?",
        required: true,
        options: [
          { title: "Select…", value: "", disabled: true },
          { title: "Product manager role", value: "Product manager role" },
          { title: "MarketOpsIQ pilot", value: "MarketOpsIQ pilot" },
          { title: "Sponsor a video", value: "Sponsor a video" },
          { title: "Just saying hi", value: "Just saying hi" },
          { title: "Other", value: "Other" },
        ],
      },
      {
        kind: "textarea",
        key: "message",
        name: "Message",
        label: "Tell me more",
        placeholder: "A few lines about the role, the project or the idea.",
      },
    ] as ContactField[],
    button: { default: "Submit", success: "Thank you", error: "Something went wrong" },
  },
  details: {
    email: { caption: "email", title: "gc.peysack@gmail.com", link: "mailto:gc.peysack@gmail.com" },
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
