import { AppearBoot } from "@/components/julian/fx/AppearBoot";
import { SmoothScroll } from "@/components/julian/fx/SmoothScroll";
import { CustomCursor } from "@/components/julian/shell/CustomCursor";
import { Footer } from "@/components/julian/shell/Footer";
import { Nav } from "@/components/julian/shell/Nav";
import styles from "./layout.module.css";

// Mirrors the template's "Template layout": black page, fixed nav, page
// content, a spacer that pins the footer to the bottom of short pages, and
// the footer. Smooth scroll (Lenis, intensity 10) runs on every page.
export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`portfolio-root ${styles.page}`}>
      <SmoothScroll />
      <CustomCursor />
      <Nav />
      {children}
      <div className={styles.spacer} />
      <Footer />
      <AppearBoot />
    </div>
  );
}
