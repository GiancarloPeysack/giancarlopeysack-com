import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Giancarlo Peysack",
  description:
    "I like to build stuff. Founder of MarketOpsIQ and Genzi. Currently shipping a LinkedIn weekly tool and a content agent tool.",
  openGraph: {
    title: "Giancarlo Peysack",
    description: "I like to build stuff.",
    url: "https://giancarlopeysack.com",
    siteName: "Giancarlo Peysack",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Giancarlo Peysack",
    description: "I like to build stuff.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
