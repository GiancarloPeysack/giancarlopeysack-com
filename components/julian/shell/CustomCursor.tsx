"use client";

import Image from "next/image";
import { animate, motion, useMotionValue, type MotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { homeContent } from "@/content/home";
import { site } from "@/content/site";
import { ArrowUpRightIcon } from "@/components/julian/ui/icons";
import services from "@/components/julian/home/services.module.css";
import styles from "./CustomCursor.module.css";

const FADE = { type: "tween", duration: 0.2 } as const;
// "Cursor images" variant change
const SLIDE = { type: "spring", bounce: 0, duration: 0.4, delay: 0 } as const;
// Stack offset and width per variant (the template's own values)
const STACK = [
  { top: 0, width: 189 },
  { top: -204, width: 189 },
  { top: -408, width: 189 },
  { top: -612, width: 188 },
  { top: -818, width: 189 },
];

/**
 * Port of Framer's custom-cursor renderer: only on devices that can hover,
 * shown while the element under the pointer (checked every frame) has
 * data-cursor, centered on the pointer with no lag, fading in on pointer move
 * and out when the pointer leaves the window. The cursor configs have no
 * placement/alignment, so the native cursor is hidden.
 *
 * Cursors: "cta" (the "GET IN TOUCH" pill) and "service-0".."service-4"
 * (the Home services image cursor). Moving between service rows keeps the
 * same cursor and slides it to the next image, like a Framer variant change.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia("(any-hover: hover)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let px = -1;
    let py = -1;
    let raf = 0;
    const check = () => {
      const el = px >= 0 ? document.elementFromPoint(px, py) : null;
      const id = el?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? null;
      setActive((prev) => (prev === id ? prev : id));
      raf = requestAnimationFrame(check);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      px = e.clientX;
      py = e.clientY;
      x.set(px);
      y.set(py);
      animate(opacity, 1, FADE);
    };
    const onLeave = () => animate(opacity, 0, FADE);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    raf = requestAnimationFrame(check);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      setActive(null);
    };
  }, [enabled, opacity, x, y]);

  useEffect(() => {
    document.body.classList.toggle("cursor-none", !!active);
    return () => document.body.classList.remove("cursor-none");
  }, [active]);

  if (!enabled || !active) return null;
  if (active === "cta") return <CtaCursor x={x} y={y} opacity={opacity} />;
  const service = /^service-(\d)$/.exec(active);
  if (service) return <ServiceCursor key="service" index={Number(service[1])} x={x} y={y} opacity={opacity} />;
  return null;
}

type Position = { x: MotionValue<number>; y: MotionValue<number>; opacity: MotionValue<number> };

const centered = (_: unknown, generated: string) => `translate(-50%, -50%) ${generated}`;

function CtaCursor({ x, y, opacity }: Position) {
  return (
    <motion.div className={styles.root} style={{ x, y, opacity }} transformTemplate={centered}>
      <div className={styles.pill}>
        <div className={styles.textBox}>
          <p className={styles.text}>{site.cta.cursorText}</p>
        </div>
        <ArrowUpRightIcon color="#000" />
      </div>
    </motion.div>
  );
}

function ServiceCursor({ index, x, y, opacity }: Position & { index: number }) {
  const { cursorImages } = homeContent.services;
  const target = STACK[index] ?? STACK[0];
  return (
    <motion.div
      className={`${styles.root} ${services.cursor}`}
      style={{ x, y, opacity }}
      transformTemplate={centered}
      initial={false}
      animate={{ width: target.width }}
      transition={SLIDE}
    >
      <motion.div className={services.cursorStack} initial={false} animate={{ top: target.top }} transition={SLIDE}>
        {cursorImages.map((image) => (
          <div key={image.src} className={services.cursorImage}>
            <Image src={image.src} alt="" fill unoptimized sizes="189px" style={{ objectPosition: image.position }} />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
