import type { Metadata } from "next";
import { ContactHero } from "@/components/julian/contact/ContactHero";
import { contactMeta } from "@/content/contact";

export const metadata: Metadata = {
  title: contactMeta.title,
  description: contactMeta.description,
  alternates: { canonical: "https://giancarlopeysack.com/contact" },
  openGraph: {
    title: contactMeta.title,
    description: contactMeta.description,
    url: "https://giancarlopeysack.com/contact",
    siteName: "Gianni Peysack",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: contactMeta.title,
    description: contactMeta.description,
  },
};

export default function ContactPage() {
  return (
    <main className="flex w-full flex-col items-center">
      <ContactHero />
    </main>
  );
}
