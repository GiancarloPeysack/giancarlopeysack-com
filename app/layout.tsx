import type { Metadata } from "next";
import "./globals.css";
import { chivoMono, displaySerif, inter, interDisplay, interSite, neutralSansVariable, schibsted, switzer } from "./fonts";

const fontVariables = [inter, switzer, neutralSansVariable, interDisplay, schibsted, chivoMono, displaySerif]
  .map((f) => f.variable)
  .join(" ");

export const metadata: Metadata = {
  title: "Gianni Peysack",
  description: "Product Manager. Case studies on Genzi, Lexfall, MarketOpsIQ, and Zharo.",
  openGraph: {
    title: "Gianni Peysack",
    description: "Product Manager. I build and ship products end to end.",
    url: "https://giancarlopeysack.com",
    siteName: "Gianni Peysack",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Gianni Peysack",
    description: "Product Manager. I build and ship products end to end.",
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
