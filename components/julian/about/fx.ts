// Effect configs of the About page, copied from the page module
// (kz6JgVfLYqxP…: constants U, W, K, cn, un, fn, Y, X, dn and the appear JSON in
// about.html). Names describe the role; values are the template's.
import type { Transition } from "framer-motion";
import type { FxState } from "@/components/julian/fx/effects";

const SPRING = { type: "spring", damping: 80, mass: 1, stiffness: 400 } as const;

/** __framer__enter U: hidden 60px below */
export const enterUp60: FxState = { opacity: 0, y: 60 };
/** __framer__enter fn (phone step titles): hidden 20px below */
export const enterUp20: FxState = { opacity: 0, y: 20 };

/** W: labels and the step number */
export const revealNow: Transition = { ...SPRING, delay: 0 };
/** K: section headings, step title, experience cards, award rows */
export const revealSoon: Transition = { ...SPRING, delay: 0.1 };
/** cn: paragraphs */
export const revealLater: Transition = { ...SPRING, delay: 0.2 };
/** un: phone-only in-view reveal of the step 2 and 3 titles */
export const revealPhone: Transition = { ...SPRING, delay: 0.5 };

/** Statistics cards (Y / X): slide up 80px on a soft 1.8 s spring, no fade */
export const statsEnter: FxState = { opacity: 1, y: 80 };
export const statsTransition: Transition = { type: "spring", bounce: 0.1, duration: 1.8, delay: 0 };

/** Load-time appear (appear JSON): from `y` px below at opacity .001 */
export function loadUp(y: number, delay: number, opacity = 1): { initial: FxState; animate: FxState } {
  return {
    initial: { opacity: 0.001, y },
    animate: { opacity, y: 0, transition: { ...SPRING, delay } },
  };
}
