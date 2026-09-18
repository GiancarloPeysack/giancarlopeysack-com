"use client";

import { motion } from "framer-motion";
import styles from "./MenuLink.module.css";
import { SmartLink } from "./SmartLink";
import { useHover } from "./useHover";

// Underline layout animation of the "Menu Link" component.
const UNDERLINE_TRANSITION = { type: "spring", bounce: 0.2, duration: 0.6, delay: 0 } as const;

export type MenuLinkVariant = "White" | "M" | "No hover";

/** Template component "Menu Link": "White" (17px), "M" (22px), "No hover" (22px, no underline). */
export function MenuLink({
  title,
  href,
  variant = "White",
  newTab = false,
}: {
  title: string;
  href: string;
  variant?: MenuLinkVariant;
  /** Force target="_blank" (the template does this for mailto/tel links on Contact). */
  newTab?: boolean;
}) {
  const hoverEnabled = variant !== "No hover";
  const [hovered, hoverProps] = useHover(hoverEnabled);
  return (
    <SmartLink
      href={href}
      className={`${styles.link} ${hoverEnabled ? "" : styles.noHover}`}
      {...(newTab ? { target: "_blank", rel: "noopener" } : {})}
      {...hoverProps}
    >
      <div className={styles.textBox}>
        <p className={`${styles.text} ${variant === "White" ? "" : styles.text22}`}>{title}</p>
      </div>
      <motion.div
        layout
        transition={UNDERLINE_TRANSITION}
        className={`${styles.underline} ${hovered ? styles.underlineHover : ""}`}
      />
    </SmartLink>
  );
}
