import type { Metadata } from "next";
import { ContactHero } from "@/components/julian/contact/ContactHero";
import { contactMeta } from "@/content/contact";

export const metadata: Metadata = {
  title: contactMeta.title,
  description: contactMeta.description,
};

export default function ContactPage() {
  return (
    <main className="flex w-full flex-col items-center">
      <ContactHero />
    </main>
  );
}
