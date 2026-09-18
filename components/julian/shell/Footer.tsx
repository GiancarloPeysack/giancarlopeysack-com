"use client";

import { site } from "@/content/site";
import { Appear } from "@/components/julian/fx/effects";
import { Logo } from "@/components/julian/ui/Logo";
import { MenuLink } from "@/components/julian/ui/MenuLink";
import styles from "./Footer.module.css";

// Load appear of the copyright line (appear id 71nehu).
const COPYRIGHT_APPEAR = {
  initial: { opacity: 0.001, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 80, stiffness: 400, mass: 1, delay: 0.5 },
  },
} as const;

export function Footer() {
  const { links, socials, copyright } = site.footer;
  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.item}>
              <Logo />
            </div>
            <div className={styles.links}>
              {links.map((link) => (
                <div key={link.href} className={styles.item}>
                  <MenuLink title={link.title} href={link.href} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.bottom}>
            <Appear className={styles.copyrightBox} {...COPYRIGHT_APPEAR}>
              <p className={styles.copyright}>{copyright}</p>
            </Appear>
            <div className={styles.socials}>
              {socials.map((social) => (
                <div key={social.title} className={styles.item}>
                  <MenuLink title={social.title} href={social.href} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
