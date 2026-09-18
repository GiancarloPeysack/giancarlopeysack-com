"use client";

import { motion, MotionConfig, type Transition } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { homeContent } from "@/content/home";
import { InViewAppear } from "@/components/julian/fx/effects";
import { useHover } from "@/components/julian/ui/useHover";
import text from "@/components/julian/ui/text.module.css";
import styles from "./services.module.css";
import s from "./home.module.css";

type Service = (typeof homeContent.services.items)[number];

// Transitions of the service card: variant changes use a soft spring, but
// opening on desktop ("Expanded") is a quick linear tween.
const SPRING: Transition = { type: "spring", bounce: 0.2, duration: 1, delay: 0 };
const OPEN: Transition = { type: "tween", duration: 0.2, ease: [0, 0, 1, 1], delay: 0 };
// In-view appear of each card
const CARD_ENTER = { opacity: 0, y: 55 };
const CARD_APPEAR = { transition: { type: "spring", bounce: 0.1, duration: 1.8, delay: 0 } as Transition };

/**
 * The services list. Framer renders one copy per breakpoint: desktop cards
 * with the image cursor, the same cards without it on tablet, and the
 * "Mobile" card variant on phone.
 */
export function ServiceList() {
  const { items } = homeContent.services;
  return (
    <>
      <List items={items} className={s.desktopOnly} cursor />
      <List items={items} className={s.tabletOnly} />
      <List items={items} className={s.phoneOnly} mobile />
    </>
  );
}

function List({ items, className, cursor = false, mobile = false }: { items: Service[]; className: string; cursor?: boolean; mobile?: boolean }) {
  return (
    <div className={`${styles.list} ${className}`}>
      {items.map((item, i) => (
        <Row key={item.number} cursor={cursor ? `service-${i}` : undefined}>
          <ServiceCard item={item} mobile={mobile} />
        </Row>
      ))}
    </div>
  );
}

// "Layout Jump Preventer": every frame the container takes the card's
// on-screen height, so the rows below follow the card's layout animation.
function Row({ cursor, children }: { cursor?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const row = ref.current;
    if (!row) return;
    let raf = 0;
    const tick = () => {
      const card = row.firstElementChild;
      if (card && row.offsetParent !== null) row.style.height = `${card.getBoundingClientRect().height}px`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      row.style.height = "";
    };
  }, []);
  return (
    <div ref={ref} className={styles.row} data-cursor={cursor}>
      {children}
    </div>
  );
}

function ServiceCard({ item, mobile }: { item: Service; mobile: boolean }) {
  const [open, setOpen] = useState(false);
  const [hovered, hoverProps] = useHover(!mobile);
  const variant = mobile ? (open ? "mobile-open" : "mobile") : open ? "open" : hovered ? "hover" : "desktop";
  const lit = !mobile && (open || hovered);

  return (
    <MotionConfig transition={!mobile && open ? OPEN : SPRING}>
      <InViewAppear
        className={[styles.card, mobile ? styles.mobile : "", open ? (mobile ? styles.mobileExpanded : styles.expanded) : ""].join(" ")}
        enter={CARD_ENTER}
        animate={CARD_APPEAR}
        animateOnce
        threshold={0}
        layout
        layoutDependency={variant}
        tabIndex={0}
        onTap={() => setOpen((o) => !o)}
        {...hoverProps}
      >
        <motion.div layout layoutDependency={variant} className={styles.head}>
          <motion.div layout layoutDependency={variant} className={styles.titleRow}>
            <motion.div
              layout
              layoutDependency={variant}
              className={`${styles.rt} ${styles.number}`}
              initial={false}
              animate={{ opacity: mobile || lit ? 1 : 0.5 }}
            >
              <p className={`${text.t} ${text.mono}`} style={mobile ? { color: "#e5e5e5" } : lit ? { color: "#fff" } : undefined}>
                {item.number}
              </p>
            </motion.div>
            <motion.div
              layout
              layoutDependency={variant}
              className={`${styles.rt} ${styles.title}`}
              initial={false}
              animate={{ opacity: mobile || lit ? 1 : 0.2 }}
            >
              {mobile ? (
                <h2 className={`${text.t} ${text.h2}`} style={{ color: "#e5e5e5" }}>
                  {item.title}
                </h2>
              ) : (
                <h1 className={`${text.t} ${text.h1}`}>{item.title}</h1>
              )}
            </motion.div>
          </motion.div>
          <motion.div
            layout
            layoutDependency={variant}
            className={styles.plus}
            initial={false}
            animate={{ opacity: !mobile && open ? 1 : 0.7, rotate: !mobile && open ? 44 : 0 }}
          >
            <motion.div layout layoutDependency={variant} className={styles.line} />
            <motion.div layout layoutDependency={variant} className={styles.line} style={{ rotate: 270 }} />
          </motion.div>
        </motion.div>
        {open && (
          <motion.div layout layoutDependency={variant} className={styles.body}>
            <motion.div layout layoutDependency={variant} className={`${styles.rt} ${styles.description}`}>
              <p className={`${text.t} ${text.body18} ${styles.descriptionText}`}>{item.description}</p>
            </motion.div>
          </motion.div>
        )}
      </InViewAppear>
    </MotionConfig>
  );
}
