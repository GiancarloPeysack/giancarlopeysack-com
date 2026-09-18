import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import styles from "./WorkTogether.module.css";

/**
 * Template component "CTA". The text link carries the custom cursor on
 * desktop only (the template passes no cursor on tablet and phone), which
 * CustomCursor picks up through data-cursor.
 */
export function WorkTogether() {
  const { cta } = site;
  return (
    <div className={styles.wrapper}>
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.picture}>
          <Image src={cta.image} alt="" fill unoptimized sizes="416px" />
        </div>

        <Link href={cta.href} className={`${styles.textLink} ${styles.desktopOnly}`} data-cursor="cta">
          <div className={styles.text}>
            <p className={`${styles.line} ${styles.desktopLine}`}>{cta.desktopText}</p>
          </div>
        </Link>

        <Link href={cta.href} className={`${styles.textLink} ${styles.tabletOnly}`}>
          <FitText viewBox="0 0 633.9552967502626 185" lines={cta.tabletLines} lineClass={styles.tabletLine} />
        </Link>

        <Link href={cta.href} className={`${styles.textLink} ${styles.phoneOnly}`}>
          <FitText viewBox="0 0 350 150" lines={cta.phoneLines} lineClass={styles.phoneLine} />
        </Link>
      </div>
    </section>
    </div>
  );
}

// Framer "fit text": the lines are laid out in the viewBox's coordinate
// space and the svg scales them to the element's width.
function FitText({ viewBox, lines, lineClass }: { viewBox: string; lines: string[]; lineClass: string }) {
  return (
    <svg className={styles.text} viewBox={viewBox}>
      <foreignObject
        className={styles.fitText}
        width="100%"
        height="100%"
        style={{ overflow: "visible", transformOrigin: "center center" }}
        transform="scale(1)"
      >
        {lines.map((line) => (
          <p key={line} className={`${styles.line} ${lineClass}`}>
            {line}
          </p>
        ))}
      </foreignObject>
    </svg>
  );
}
