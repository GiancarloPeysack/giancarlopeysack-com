// Text presets of the About page (framer-styles-preset-* in about.html), as
// Tailwind class strings. Sizes follow the template's media queries:
// phone < 810, tablet 810–1199, desktop >= 1200 (the h1 preset switches to
// 44px only from 1418px up, like the template).
import styles from "./about.module.css";

/** preset 1t6oofe: section headings (h1) */
export const h1Cls = `${styles.grotesk} font-schibsted text-[26px] font-bold uppercase leading-[1.2em] tracking-[-0.04em] text-white tablet:text-[36px] min-[1418px]:text-[44px]`;

/** preset 1w89x6l: process step titles (h2) */
export const h2Cls = `${styles.grotesk} font-schibsted text-[22px] font-bold uppercase leading-[1.2em] tracking-[-0.04em] text-white tablet:text-[27px] desktop:text-[28px]`;

/** preset 8ncpym: experience / award titles (h4), color set per use */
export const h4Cls = `${styles.grotesk} font-schibsted text-[20px] font-medium leading-[1.2em] tracking-[-0.04em] tablet:text-[21px] desktop:text-[22px]`;

/** preset 11amz3l: body copy, color set per use (default #8f8f8f) */
export const bodyCls = "font-switzer text-[18px] font-medium leading-[1.3em] tracking-[-0.03em]";

/** preset pd9o0r: stat labels and experience periods, color set per use */
export const captionCls = "font-switzer text-[22px] font-medium leading-[1.2em] tracking-[-0.01em]";

/** preset g4c1c: small mono labels (step numbers, award years), color set per use */
export const monoCls = "font-chivo text-[16px] font-light uppercase leading-[1.2em] tracking-[-0.04em]";

/** preset q2jpgg: the bio paragraphs */
export const bioCls =
  "font-switzer text-[24px] font-bold leading-[1.2em] tracking-[-0.03em] text-left text-[#f0f0f0] tablet:text-[28px] tablet:leading-[1.1em] desktop:text-[32px]";
