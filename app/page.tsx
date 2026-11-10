import type { Metadata } from "next";
import { LinksView } from "@/components/LinksView";
import { linksMeta } from "@/content/links";

// The home page is the link-in-bio page (owner ask 2026-11-10). The
// portfolio home moved to /portfolio; its other pages are unchanged.
export const metadata: Metadata = {
  title: "Gianni Peysack",
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

export default function HomePage() {
  return <LinksView />;
}
