import type { Metadata } from "next";

// The page itself is "use client" (form state), so metadata lives here.
const TITLE = "LinkedIn AI tool waitlist · Giancarlo Peysack";
const DESCRIPTION =
  "Join the waitlist for an AI tool that drafts LinkedIn comments and posts in your own voice.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://giancarlopeysack.com/waitlist/linkedin" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://giancarlopeysack.com/waitlist/linkedin",
    siteName: "Giancarlo Peysack",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function LinkedInWaitlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
