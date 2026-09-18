import type { Metadata } from "next";
import "./globals.css";
import { chivoMono, inter, interDisplay, interSite, neutralSansVariable, schibsted, switzer } from "./fonts";

const fontVariables = [inter, switzer, neutralSansVariable, interDisplay, schibsted, chivoMono]
  .map((f) => f.variable)
  .join(" ");

export const metadata: Metadata = {
  title: "Giancarlo Peysack",
  description: "Product Manager. Case studies on Genzi, Lexfall, MarketOpsIQ, and Zharo.",
  openGraph: {
    title: "Giancarlo Peysack",
    description: "Product Manager. I build and ship products end to end.",
    url: "https://giancarlopeysack.com",
    siteName: "Giancarlo Peysack",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Giancarlo Peysack",
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
