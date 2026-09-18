"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Button.module.css";
import { useHover } from "./useHover";

// Framer layout-animates the underline from a 1px dot to full width with
// this tween when the "Primary black" variant is hovered.
const UNDERLINE_TRANSITION = { duration: 0.2, ease: [0, 0, 1, 1], type: "tween" } as const;

/** Template component "Buttons": variants "Primary black" (default) and "No-hover". */
export function Button({
  text,
  link,
  variant = "Primary black",
  className,
}: {
  text: string;
  link: string;
  variant?: "Primary black" | "No-hover";
  className?: string;
}) {
  const hoverEnabled = variant === "Primary black";
  const [hovered, hoverProps] = useHover(hoverEnabled);
  return (
    <Link
      href={link}
      className={[styles.button, hoverEnabled ? "" : styles.noHover, className ?? ""].join(" ")}
      {...hoverProps}
    >
      <div className={styles.textBox}>
        <p className={styles.text}>{text}</p>
      </div>
      <motion.div
        layout
        transition={UNDERLINE_TRANSITION}
        className={`${styles.underline} ${hovered ? styles.underlineHover : ""}`}
      />
    </Link>
  );
}
