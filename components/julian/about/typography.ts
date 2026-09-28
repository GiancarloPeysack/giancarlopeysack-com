// Text presets of the About page, aligned with the site's type scale in
// components/julian/ui/text.module.css: the display serif for headings and
// the bio (the `font-schibsted` alias resolves to it), Switzer for body and
// UI, Chivo Mono for labels. The headings dropped uppercase and bold: the
// serif carries them, and shouting was the template's idea, not ours.
import styles from "./about.module.css";

/** Section headings (h1) */
export const h1Cls = `${styles.grotesk} font-schibsted text-[clamp(34px,4.6vw,62px)] font-normal leading-[1.04em] tracking-[-0.015em] text-[color:var(--fg)]`;

/** Process step titles (h2) */
export const h2Cls = `${styles.grotesk} font-schibsted text-[clamp(26px,2.8vw,40px)] font-normal leading-[1.12em] tracking-[-0.01em] text-[color:var(--fg)]`;

/** Experience / milestone titles (h4), colour set per use */
export const h4Cls = "font-switzer text-[clamp(17px,1.3vw,20px)] font-medium leading-[1.35em] tracking-[-0.015em]";

/** Body copy, colour set per use (defaults to --muted at the call site) */
export const bodyCls = "font-switzer text-[clamp(16px,1.15vw,18px)] font-normal leading-[1.6em] tracking-[-0.01em]";

/** Stat labels and experience periods, colour set per use */
export const captionCls = "font-switzer text-[clamp(16px,1.3vw,19px)] font-medium leading-[1.35em] tracking-[-0.01em]";

/** Small mono labels (step numbers, milestone years), colour set per use */
export const monoCls = "font-chivo text-[12px] font-normal uppercase leading-[1.3em] tracking-[0.12em] tabular-nums";

/** The bio paragraphs */
export const bioCls =
  "font-schibsted text-[clamp(22px,2.4vw,34px)] font-normal leading-[1.32em] tracking-[-0.01em] text-left text-[color:var(--fg)]";
