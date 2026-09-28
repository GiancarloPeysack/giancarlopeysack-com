// Text presets of the About page, aligned with the site's type scale in
// components/julian/ui/text.module.css: Neutral Sans for headings (the
// `font-schibsted` alias now resolves to it), Switzer for body and UI,
// Chivo Mono for labels. Sizes are fluid rather than stepped per breakpoint.
import styles from "./about.module.css";

/** Section headings (h1) */
export const h1Cls = `${styles.grotesk} font-schibsted text-[clamp(30px,4vw,54px)] font-extrabold uppercase leading-[1.02em] tracking-[-0.04em] text-[color:var(--fg)]`;

/** Process step titles (h2) */
export const h2Cls = `${styles.grotesk} font-schibsted text-[clamp(24px,2.4vw,34px)] font-extrabold uppercase leading-[1.1em] tracking-[-0.035em] text-[color:var(--fg)]`;

/** Experience / milestone titles (h4), colour set per use */
export const h4Cls = "font-switzer text-[clamp(18px,1.4vw,21px)] font-semibold leading-[1.3em] tracking-[-0.02em]";

/** Body copy, colour set per use (defaults to --muted at the call site) */
export const bodyCls = "font-switzer text-[clamp(16px,1.15vw,18px)] font-[450] leading-[1.5em] tracking-[-0.01em]";

/** Stat labels and experience periods, colour set per use */
export const captionCls = "font-switzer text-[clamp(16px,1.3vw,19px)] font-medium leading-[1.35em] tracking-[-0.01em]";

/** Small mono labels (step numbers, milestone years), colour set per use */
export const monoCls = "font-chivo text-[12px] font-normal uppercase leading-[1.3em] tracking-[0.12em] tabular-nums";

/** The bio paragraphs */
export const bioCls =
  "font-switzer text-[clamp(21px,2.2vw,30px)] font-semibold leading-[1.28em] tracking-[-0.025em] text-left text-[color:var(--fg)]";
