"use client";

import { motion } from "framer-motion";
import { contactContent } from "@/content/contact";
import { useHover } from "@/components/julian/ui/useHover";
import styles from "./contact.module.css";

export type FormState = "default" | "loading" | "success" | "error";

// Variant change transition of the "Form Button" component, and its spinner.
const UNDERLINE_TRANSITION = { type: "tween", duration: 0.2, ease: [0.44, 0, 0.56, 1], delay: 0 } as const;
const SPIN = { rotate: 360 };
const SPIN_TRANSITION = { duration: 1, ease: "linear", repeat: Infinity } as const;

/** Template component "Form Button": Default / Loading / Success / Error. */
export function FormButton({ state }: { state: FormState }) {
  const [hovered, hoverProps] = useHover(state === "default");
  const { button } = contactContent.form;
  const label = state === "success" ? button.success : state === "error" ? button.error : button.default;
  return (
    <button
      type="submit"
      className={[
        styles.formButton,
        state === "default" ? "" : styles.formButtonStatic,
        hovered ? styles.isHover : "",
      ].join(" ")}
      disabled={state === "loading"}
      aria-busy={state === "loading"}
      {...hoverProps}
    >
      {state === "loading" ? (
        <div className={styles.spinner} aria-label="Sending">
          <motion.div className={styles.conic} animate={SPIN} transition={SPIN_TRANSITION}>
            <div className={styles.rounding} />
          </motion.div>
        </div>
      ) : (
        <div className={styles.formButtonText}>
          <p className={styles.formButtonLabel}>{label}</p>
        </div>
      )}
      <motion.div layout transition={UNDERLINE_TRANSITION} className={styles.formButtonLine} />
    </button>
  );
}
