import { Appear } from "@/components/julian/fx/effects";
import { Button } from "@/components/julian/ui/Button";
import { notFoundContent } from "@/content/not-found";
import styles from "./notfound.module.css";

// Load appears of the 404 page (ids 1mt9zk3 / 1mrfjvh / 4gyivy).
const spring = (delay: number) => ({
  initial: { opacity: 0.001, y: 23 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 80, stiffness: 400, mass: 1, delay },
  },
});

export function NotFoundPage() {
  const { code, message, button } = notFoundContent;
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Appear className={`${styles.code} ${styles.desktopOnly}`} {...spring(0.9)}>
            <p className={styles.codeText}>{code}</p>
          </Appear>
          <Appear className={`${styles.code} ${styles.phoneOnly}`} {...spring(0.9)}>
            <h1 className={styles.codeTextPhone}>{code}</h1>
          </Appear>

          <Appear className={`${styles.message} ${styles.desktopOnly}`} {...spring(1)}>
            <h1 className={styles.messageText}>{message}</h1>
          </Appear>
          <Appear className={`${styles.message} ${styles.phoneOnly}`} {...spring(1)}>
            <h1 className={styles.messageTextPhone}>{message}</h1>
          </Appear>
        </div>
        <Appear className={styles.buttonContainer} {...spring(1.1)}>
          <Button text={button.text} link={button.link} />
        </Appear>
      </div>
    </main>
  );
}
