import type { Metadata } from "next";
import { LinksView } from "@/components/LinksView";
import { linksMeta } from "@/content/links";

// Same page as the home page, kept so old bio links keep working.
export const metadata: Metadata = {
  title: linksMeta.title,
  description: linksMeta.description,
  alternates: { canonical: "https://giancarlopeysack.com" },
  openGraph: {
    title: "Gianni Peysack",
    description: linksMeta.description,
    url: "https://giancarlopeysack.com",
    siteName: "Gianni Peysack",
    type: "website",
  },
  twitter: { card: "summary", title: "Gianni Peysack", description: linksMeta.description },
};

export default function LinksPage() {
  return <LinksView />;
}
