import Link from "next/link";
import { site } from "@/content/site";
import styles from "./Logo.module.css";

/** Template component "Logo": "small logo white" (38px, nav/footer) or "Big logo white" (84px). */
export function Logo({ variant = "small", color = "#fff" }: { variant?: "small" | "big"; color?: string }) {
  return (
    <Link href="/" className={`${styles.logo} ${variant === "big" ? styles.big : ""}`}>
      <div className={styles.textBox}>
        <p className={styles.text} style={{ color }}>
          {site.logo}
        </p>
      </div>
    </Link>
  );
}
