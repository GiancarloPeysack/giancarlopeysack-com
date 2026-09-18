"use client";

import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useTransform,
  wrap,
  type MotionValue,
} from "framer-motion";
import { useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Appear, type FxState } from "@/components/julian/fx/effects";
import s from "./home.module.css";

// Framer's ticker effect on the "Logos Thicker" stack: velocity 30 px/s,
// direction "reverse", gap 0, hover modifier 100% (no change on hover),
// draggable with momentum.
const VELOCITY = 30 * -1;
const GAP = 0;

// Its appear runs in JS after hydration (the optimized appear entry is empty).
const APPEAR: { initial: FxState; animate: FxState } = {
  initial: { opacity: 0.001, y: 23 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", damping: 80, stiffness: 400, mass: 1, delay: 1.1 } },
};

type Bounds = { start: number; end: number };
type Measure = { visible: number; total: number; inset: number; positions: Bounds[] };

export function LogoTicker({ logos }: { logos: { src: string; fit: "cover" | "contain"; width: number }[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const offset = useMotionValue(0);
  const [m, setM] = useState<Measure>({ visible: 0, total: 0, inset: 0, positions: [] });
  const drag = useRef({ endedAt: 0, momentum: false, dragging: false });

  useLayoutEffect(() => {
    containerRef.current = listRef.current?.parentElement ?? null;
  }, []);
  // measured (and shown) once it comes within 100px of the viewport
  const inView = useInView(containerRef, { margin: "100px" });

  useLayoutEffect(() => {
    const container = containerRef.current;
    const list = listRef.current;
    if (!inView || !container || !list) return;
    const measure = () => {
      const items = Array.from(list.querySelectorAll<HTMLElement>(".ticker-item"));
      if (!items.length) return;
      const positions = items.map((el) => ({ start: el.offsetLeft, end: el.offsetLeft + el.offsetWidth }));
      const next = {
        visible: Math.min(container.offsetWidth, window.innerWidth),
        total: positions[positions.length - 1].end - positions[0].start,
        inset: parseInt(getComputedStyle(container).paddingLeft) || 0,
        positions,
      };
      setM((prev) =>
        prev.visible === next.visible &&
        prev.total === next.total &&
        prev.inset === next.inset &&
        prev.positions.length === next.positions.length &&
        prev.positions.every((p, i) => p.start === next.positions[i].start && p.end === next.positions[i].end)
          ? prev
          : next,
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [inView]);

  // Auto-scroll; after a drag it waits until the momentum is slower than the
  // ticker, then stops the momentum and takes over.
  useAnimationFrame((_, delta) => {
    const d = drag.current;
    const speed = Math.abs(offset.getVelocity());
    if (performance.now() > d.endedAt && (!d.momentum || speed < Math.abs(VELOCITY))) {
      const next = offset.get() - (delta / 1000) * VELOCITY;
      if (d.momentum) {
        offset.stop();
        d.momentum = false;
      }
      offset.set(next);
    }
  });

  const measured = m.total > 0;
  const rendered = useTransform(() => (measured ? wrap(-m.total - GAP - m.inset, -m.inset, offset.get()) : 0));
  const clones = measured && m.visible ? cloneCount(m.visible, m.positions, GAP) : 0;
  const listSize = measured ? (m.total + GAP) * (clones + 1) : 0;

  const item = (logo: (typeof logos)[number]) => (
    <div className={s.logo} style={{ width: logo.width }}>
      <div className={s.logoImage}>
        <Image src={logo.src} alt="" fill unoptimized sizes="54px" draggable={false} style={{ objectFit: logo.fit }} />
      </div>
    </div>
  );

  return (
    <Appear
      startOnMount
      className={s.ticker}
      style={{ overflowX: "clip", display: "flex", position: "relative" }}
      drag="x"
      _dragX={offset}
      dragMomentum
      onDragStart={() => {
        drag.current.dragging = true;
      }}
      onDragEnd={() => {
        drag.current.endedAt = performance.now();
        drag.current.momentum = true;
        setTimeout(() => {
          drag.current.dragging = false;
        }, 5);
      }}
      onClickCapture={(e: MouseEvent) => {
        if (drag.current.dragging && e.target !== e.currentTarget) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      {...APPEAR}
    >
      <motion.ul
        ref={listRef}
        style={{
          display: "flex",
          position: "relative",
          listStyleType: "none",
          padding: 0,
          margin: 0,
          justifyContent: "flex-start",
          flexDirection: "row",
          gap: `${GAP}px`,
          x: rendered,
          opacity: measured ? 1 : 0,
          alignItems: "center",
          willChange: measured && inView ? "transform" : undefined,
          width: "100%",
          height: "100%",
          maxHeight: "100%",
          maxWidth: "100%",
        }}
      >
        {logos.map((logo, i) => (
          <TickerItem key={`original-${i}`} rendered={rendered} bounds={m.positions[i]} listSize={listSize} inset={m.inset} index={i} count={logos.length}>
            {item(logo)}
          </TickerItem>
        ))}
        {Array.from({ length: clones }, (_, group) =>
          logos.map((logo, i) => {
            const shift = (m.total + GAP) * (group + 1);
            const b = m.positions[i];
            return (
              <TickerItem
                key={`clone-${group}-${i}`}
                rendered={rendered}
                bounds={b ? { start: b.start + shift, end: b.end + shift } : undefined}
                listSize={listSize}
                inset={m.inset}
                clone
              >
                {item(logo)}
              </TickerItem>
            );
          }),
        )}
      </motion.ul>
    </Appear>
  );
}

// An item that has scrolled fully out on the start side is moved one list
// length forward, so a short list never shows a gap.
function TickerItem({
  rendered,
  bounds,
  listSize,
  inset,
  clone = false,
  index,
  count,
  children,
}: {
  rendered: MotionValue<number>;
  bounds?: Bounds;
  listSize: number;
  inset: number;
  clone?: boolean;
  index?: number;
  count?: number;
  children: ReactNode;
}) {
  const x = useTransform(() => {
    const offset = rendered.get();
    if (!bounds || (!bounds.start && !bounds.end) || !listSize) return 0;
    return offset + bounds.end <= -inset ? listSize : 0;
  });
  const aria = clone
    ? { "aria-hidden": true }
    : { "aria-hidden": false, "aria-posinset": (index ?? 0) + 1, "aria-setsize": count };
  return (
    <motion.li
      className={clone ? "clone-item" : "ticker-item"}
      style={{ flexGrow: 0, flexShrink: 0, position: "relative", height: "fit-content", width: "fit-content", x }}
      {...aria}
    >
      {children}
    </motion.li>
  );
}

// Number of extra copies needed to fill the visible length.
function cloneCount(visible: number, positions: Bounds[], gap: number) {
  const total = positions[positions.length - 1].end - positions[0].start;
  const longest = Math.max(...positions.map((p) => p.end - p.start));
  let copies = 0;
  let covered = 0;
  while (covered < visible) {
    covered = (total + gap) * (copies + 1) - longest;
    copies++;
  }
  return Math.max(copies - 1, 0);
}
