import type { Metadata } from "next";

// The page itself is "use client" (form state, Calendly embed), so metadata
// has to live in a server-component layout instead of the page file.
const TITLE = "Pilot MarketOpsIQ · Gianni Peysack";
const DESCRIPTION =
  "Run a paid pilot of MarketOpsIQ, an AI shelf price and field operations platform for CPG brands, at your company.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://giancarlopeysack.com/pilot" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://giancarlopeysack.com/pilot",
    siteName: "Gianni Peysack",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function PilotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
