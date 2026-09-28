import type { Metadata } from "next";

// The page itself is "use client" (form state), so metadata lives here.
const TITLE = "AI video tool waitlist · Gianni Peysack";
const DESCRIPTION =
  "Join the waitlist for an AI video tool built for creators who publish frequently.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://giancarlopeysack.com/waitlist/video" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://giancarlopeysack.com/waitlist/video",
    siteName: "Gianni Peysack",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function VideoWaitlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
