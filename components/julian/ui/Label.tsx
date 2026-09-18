import styles from "./Label.module.css";

/**
 * Template component "Label". The text renders with `white-space: pre`, so
 * titles keep the template's trailing spaces (e.g. "[PROJECTS] ", "Process ")
 * because they affect the label's width.
 */
export function Label({ title, className }: { title: string; className?: string }) {
  return (
    <div className={`${styles.label} ${className ?? ""}`}>
      <div className={styles.textBox}>
        <p className={styles.text}>{title}</p>
      </div>
    </div>
  );
}
