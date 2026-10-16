import type { Metadata } from "next";
import "./globals.css";
import { chivoMono, displaySerif, inter, interDisplay, interSite, neutralSansVariable, schibsted, switzer } from "./fonts";

const fontVariables = [inter, switzer, neutralSansVariable, interDisplay, schibsted, chivoMono, displaySerif]
  .map((f) => f.variable)
  .join(" ");

export const metadata: Metadata = {
  title: "Gianni Peysack",
  description:
    "A portfolio of shipped products: iOS apps, websites, B2B software and AI tools. Case studies on MarketOpsIQ, Lexfall, Zharo, CampusMart and Genzi.",
  openGraph: {
    title: "Gianni Peysack",
    description: "Apps, websites, B2B software and AI tools, designed and built end to end.",
    url: "https://giancarlopeysack.com",
    siteName: "Gianni Peysack",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Gianni Peysack",
    description: "Apps, websites, B2B software and AI tools, designed and built end to end.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${interSite.className} ${fontVariables}`}>
      <body>{children}</body>
    </html>
  );
}
