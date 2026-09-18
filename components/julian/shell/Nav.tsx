"use client";

import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";
import { Appear, ScrollDirection, type FxState } from "@/components/julian/fx/effects";
import { CloseIcon, MenuIcon } from "@/components/julian/ui/icons";
import { Logo } from "@/components/julian/ui/Logo";
import { MenuLink } from "@/components/julian/ui/MenuLink";
import styles from "./Nav.module.css";

// Load appear of the nav (appear id 1rt5431), identical on every breakpoint.
const NAV_APPEAR: { initial: FxState; animate: FxState } = {
  initial: { opacity: 0.001, y: -90 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 60, stiffness: 300, mass: 1, delay: 1 },
  },
};

// Layout template: hide the whole nav while scrolling down.
const HIDE_ON_SCROLL_DOWN: FxState = { opacity: 0, y: -150 };
const SCROLL_TRANSITION = { type: "spring", bounce: 0.2, duration: 0.4, delay: 0 } as const;

// "mobile" <-> "mobile - Expanded" variant change.
const MENU_TRANSITION = { type: "tween", duration: 0.5, ease: [0.44, 0, 0.56, 1], delay: 0 } as const;

// Email / phone entrance once the menu is open (presence appear inside the menu).
const CONTACT_APPEAR = {
  initial: { opacity: 0.001, y: 23 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 80, stiffness: 400, mass: 1, delay: 1 },
  },
} as const;

export function Nav() {
  return (
    <ScrollDirection
      className={styles.container}
      direction="down"
      target={HIDE_ON_SCROLL_DOWN}
      transition={SCROLL_TRANSITION}
    >
      <Appear as="nav" className={`${styles.nav} ${styles.desktopOnly}`} {...NAV_APPEAR}>
        <div className={styles.row}>
          <div className={styles.logoBox}>
            <div className={styles.item}>
              <Logo />
            </div>
          </div>
          <div className={styles.links}>
            {site.nav.links.map((link) => (
              <div key={link.href} className={styles.item}>
                <MenuLink title={link.title} href={link.href} />
              </div>
            ))}
          </div>
        </div>
      </Appear>
      <MobileNav />
    </ScrollDirection>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const { links, socials, contacts } = site.mobileMenu;
  return (
    <MotionConfig transition={MENU_TRANSITION}>
      <Appear
        as="nav"
        layout
        className={`${styles.nav} ${styles.mobile} ${styles.phoneOnly} ${open ? styles.expanded : ""}`}
        onMouseLeave={open ? () => setOpen(false) : undefined}
        {...NAV_APPEAR}
      >
        <motion.div layout className={styles.row}>
          <motion.div layout className={styles.logoBox}>
            <div className={styles.item}>
              <Logo />
            </div>
          </motion.div>
          <motion.div layout className={styles.links}>
            <motion.div
              layout
              className={styles.toggle}
              onClick={() => setOpen((o) => !o)}
              role="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </motion.div>
          </motion.div>
        </motion.div>

        {open && (
          <motion.div layout className={styles.panel} onClick={() => setOpen(false)}>
            <div className={styles.menuBlock}>
              <div className={styles.menus}>
                <div className={styles.mainMenu}>
                  {links.map((link) => (
                    <div key={link.href} className={styles.textItem}>
                      <p className={styles.menuText}>
                        <Link href={link.href}>{link.title}</Link>
                      </p>
                    </div>
                  ))}
                </div>
                <div className={styles.social}>
                  {socials.map((social) => (
                    <div key={social.title} className={styles.textItem}>
                      <p className={styles.socialText}>
                        {social.href ? (
                          <a href={social.href} target="_blank" rel="noopener">
                            {social.title}
                          </a>
                        ) : (
                          <a>{social.title}</a>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.contacts}>
              {contacts.map((contact) => (
                <motion.div
                  key={contact.title}
                  className={styles.item}
                  initial={CONTACT_APPEAR.initial}
                  animate={CONTACT_APPEAR.animate}
                >
                  <MenuLink title={contact.title} href={contact.href} variant="No hover" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </Appear>
    </MotionConfig>
  );
}
