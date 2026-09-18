import localFont from "next/font/local";
import { Chivo_Mono, Inter, Schibsted_Grotesk } from "next/font/google";

// The light pages (/links, /pilot, /sponsor, /waitlist/*) keep the variable
// Google Inter they always used (weights 100–900, incl. 800 headings).
export const interSite = Inter({
  subsets: ["latin"],
  display: "swap",
});

// Fonts used by the Julian template. Switzer (Fontshare, ITF FFL), Neutral Sans,
// Inter and Inter Display (all SIL OFL) are self-hosted from their official
// releases. Inter is self-hosted too because it's the static Inter 4 build
// Framer serves (same metrics), and it avoids a flaky Google Fonts download.
export const switzer = localFont({
  src: [
    { path: "./fonts/switzer/Switzer-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/switzer/Switzer-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/switzer/Switzer-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/switzer/Switzer-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/switzer/Switzer-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/switzer/Switzer-600-italic.woff2", weight: "600", style: "italic" },
    { path: "./fonts/switzer/Switzer-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/switzer/Switzer-700-italic.woff2", weight: "700", style: "italic" },
    { path: "./fonts/switzer/Switzer-900.woff2", weight: "900", style: "normal" },
    { path: "./fonts/switzer/Switzer-900-italic.woff2", weight: "900", style: "italic" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

export const neutralSansVariable = localFont({
  src: "./fonts/neutral-sans/NeutralSansVF.woff2",
  weight: "400 900",
  variable: "--font-neutral-sans",
  display: "swap",
});

export const interDisplay = localFont({
  src: [
    { path: "./fonts/inter-display/InterDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-display/InterDisplay-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-inter-display",
  display: "swap",
});

export const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-schibsted",
  display: "swap",
});

export const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-chivo-mono",
  display: "swap",
});

export const inter = localFont({
  src: [
    { path: "./fonts/inter/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter/Inter-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter/Inter-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/inter/Inter-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/inter/Inter-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});
