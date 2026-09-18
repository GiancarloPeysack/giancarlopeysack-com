// Effect configs of the Home page, copied from the page module
// (1ZvFZRzxb5sX…: constants yn, En, On, bn, Sn, An). Names describe the role;
// values are the template's.
import type { Transition } from "framer-motion";
import type { FxState } from "@/components/julian/fx/effects";

const spring = (delay: number): Transition => ({ type: "spring", damping: 80, stiffness: 400, mass: 1, delay });

/** yn: hidden 60px below */
export const up60: FxState = { opacity: 0, y: 60 };
/** En: hidden 20px below (phone variants, buttons) */
export const up20: FxState = { opacity: 0, y: 20 };

/** On */
export const now = spring(0);
/** bn */
export const soon = spring(0.1);
/** Sn */
export const later = spring(0.2);
/** An: phone override of the section headings */
export const phoneLate = spring(0.5);
