import type { Metadata } from "next";

// The page itself is "use client" (form state), so metadata lives here.
const TITLE = "Sponsor a video · Giancarlo Peysack";
const DESCRIPTION =
  "Sponsor a video from Giancarlo Peysack: product, startup and build-in-public content.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://giancarlopeysack.com/sponsor" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://giancarlopeysack.com/sponsor",
    siteName: "Giancarlo Peysack",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function SponsorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
