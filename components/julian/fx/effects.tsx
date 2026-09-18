"use client";

/**
 * Ports of the Framer runtime effects used by the Julian template
 * (framer.ZOIpVyCw.mjs). Prop names mirror the Framer props with the
 * `__framer__` prefix removed, so configs can be copied from the page
 * modules almost verbatim:
 *
 *   __framer__presenceInitial / appear JSON "initial"  -> <Appear initial>
 *   __framer__presenceAnimate / appear JSON "animate"  -> <Appear animate>
 *   __framer__styleAppearEffectEnabled + enter/animate/exit/threshold/animateOnce
 *                                                      -> <InViewAppear>
 *   __framer__scrollDirection {direction,target}       -> <ScrollDirection>
 *   __framer__speed / offset / adjustPosition          -> <Parallax>
 *   __framer__transformTargets / transformTrigger / spring
 *                                                      -> <ScrollTransform>
 */

import {
  animate as animateValue,
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type Transition,
} from "framer-motion";
import {
  CSSProperties,
  ElementType,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { fxAppearRuntime, type FxAppearRuntime } from "./appearRuntime";

export type FxState = {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  rotateX?: number;
  rotateY?: number;
  skewX?: number;
  skewY?: number;
  transformPerspective?: number;
  transition?: Transition;
};

const KEYS = [
  "opacity",
  "x",
  "y",
  "scale",
  "rotate",
  "rotateX",
  "rotateY",
  "skewX",
  "skewY",
  "transformPerspective",
] as const;
type Key = (typeof KEYS)[number];

const DEFAULTS: Record<Key, number> = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  skewX: 0,
  skewY: 0,
  transformPerspective: 0,
};

type Breakpoint = "desktop" | "tablet" | "phone";

/** Framer breakpoints: phone < 810, tablet 810–1199, desktop >= 1200. */
export function currentBreakpoint(): Breakpoint {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia("(min-width: 1200px)").matches) return "desktop";
  if (window.matchMedia("(min-width: 810px)").matches) return "tablet";
  return "phone";
}

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");
  useEffect(() => {
    const update = () => setBp(currentBreakpoint());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

/** A value that may differ per Framer breakpoint. Missing breakpoints fall back to desktop. */
export type Responsive<T> = T | { desktop: T; tablet?: T; phone?: T };

function isResponsive<T>(v: Responsive<T>): v is { desktop: T; tablet?: T; phone?: T } {
  return typeof v === "object" && v !== null && "desktop" in (v as object);
}

export function pick<T>(v: Responsive<T>, bp: Breakpoint): T {
  if (!isResponsive(v)) return v;
  return (bp === "phone" ? v.phone ?? v.tablet : bp === "tablet" ? v.tablet : undefined) ?? v.desktop;
}

function fill(state?: FxState): Record<Key, number> {
  const out = { ...DEFAULTS };
  if (state) for (const k of KEYS) if (typeof state[k] === "number") out[k] = state[k] as number;
  return out;
}

function useFxValues(initial?: FxState) {
  const start = fill(initial);
  const opacity = useMotionValue(start.opacity);
  const x = useMotionValue(start.x);
  const y = useMotionValue(start.y);
  const scale = useMotionValue(start.scale);
  const rotate = useMotionValue(start.rotate);
  const rotateX = useMotionValue(start.rotateX);
  const rotateY = useMotionValue(start.rotateY);
  const skewX = useMotionValue(start.skewX);
  const skewY = useMotionValue(start.skewY);
  const transformPerspective = useMotionValue(start.transformPerspective);
  return useMemo(
    () => ({ opacity, x, y, scale, rotate, rotateX, rotateY, skewX, skewY, transformPerspective }),
    // motion values are stable for the component lifetime
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  ) as Record<Key, MotionValue<number>>;
}

function fxStyle(values: Record<Key, MotionValue<number>>): CSSProperties {
  const style: Record<string, unknown> = { willChange: "transform" };
  for (const k of KEYS) {
    if (k === "transformPerspective") continue;
    style[k] = values[k];
  }
  return style as CSSProperties;
}

type BaseProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
} & Record<string, unknown>;

function motionTag(as?: ElementType) {
  const tag = (as ?? "div") as keyof typeof motion;
  return (motion[tag] ?? motion.div) as ElementType;
}

/* ------------------------------------------------------------------------ */
/* Load-time appear (Framer "appear" JSON / __framer__presenceInitial|Animate) */
/* ------------------------------------------------------------------------ */

function appearRuntime(): FxAppearRuntime {
  const w = window as Window & { __fxAppear?: FxAppearRuntime };
  return (w.__fxAppear ??= fxAppearRuntime());
}

/**
 * Like Framer, the animation itself runs on the Web Animations API (see
 * appearRuntime.ts). Elements in the server HTML are started by the inline
 * boot script on the first frame, before hydration, so the template's
 * stagger holds however slow the JS is. Elements mounted later (client-side
 * navigation, menus) start on mount with their full delay. Once finished,
 * the final values are committed to motion values so framer-motion owns the
 * element again (e.g. the mobile nav's layout animation).
 */
export function Appear({
  initial,
  animate,
  transformTemplate,
  startOnMount = false,
  as,
  children,
  className,
  style,
  ...rest
}: BaseProps & {
  initial: Responsive<FxState>;
  animate: Responsive<FxState>;
  /** Wraps the animated transform, e.g. "translate(-50%, -50%) {}" for centered elements. */
  transformTemplate?: string;
  /**
   * Start on mount (after hydration) instead of from the boot script, for
   * appears Framer runs in JS rather than as optimized appear animations.
   */
  startOnMount?: boolean;
}) {
  const Tag = motionTag(as);
  const ref = useRef<HTMLElement>(null);
  const values = useFxValues(pick(initial, "desktop"));
  // Static per element; the boot script reads it from the server HTML.
  const config = useMemo(() => JSON.stringify({ initial, animate, transformTemplate }), []); // eslint-disable-line react-hooks/exhaustive-deps
  const template = useMemo(
    () => (transformTemplate ? (_: unknown, generated: string) => transformTemplate.replace("{}", generated) : undefined),
    [transformTemplate],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let alive = true;
    appearRuntime()
      .start(el)
      ?.done.then((settled) => {
        if (!alive || !settled) return;
        for (const k of KEYS) if (typeof settled[k] === "number") values[k].set(settled[k] as number);
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const motionStyle: Record<string, unknown> = {};
  for (const k of KEYS) if (k !== "transformPerspective") motionStyle[k] = values[k];

  return (
    <Tag
      ref={ref}
      {...{ [startOnMount ? "data-fx-appear-mount" : "data-fx-appear"]: config }}
      className={className}
      style={{ ...motionStyle, ...style }}
      transformTemplate={template}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------------ */
/* Scroll-triggered appear (__framer__styleAppearEffectEnabled)              */
/* ------------------------------------------------------------------------ */

const IO_THRESHOLDS = Array.from({ length: 100 }, (_, i) => i / 100);

function isInViewAtThreshold(entry: IntersectionObserverEntry, threshold: number) {
  const { boundingClientRect: b, intersectionRect: r, isIntersecting } = entry;
  if (b.height === 0) return isIntersecting;
  const ratio = b.height === 0 ? 0 : r.height / Math.min(b.height, window.innerHeight);
  return isIntersecting && ratio >= threshold;
}

export function InViewAppear({
  enter,
  animate,
  exit,
  threshold = 0,
  animateOnce = false,
  transition,
  as,
  children,
  className,
  style,
  ...rest
}: BaseProps & {
  /** Hidden state the element starts from each time it enters. */
  enter?: Responsive<FxState>;
  /** Visible state it animates to (may carry its own transition). */
  animate?: Responsive<FxState>;
  /** State it animates to when leaving the viewport (default: fully visible). */
  exit?: Responsive<FxState>;
  threshold?: number;
  animateOnce?: boolean;
  transition?: Transition;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const bp = useBreakpoint();
  const enterState = enter ? pick(enter, bp) : undefined;
  const animateState = animate ? pick(animate, bp) : undefined;
  const exitState = exit ? pick(exit, bp) : undefined;
  const values = useFxValues(enter ? pick(enter, "desktop") : undefined);
  const chain = useRef<Promise<unknown>>(Promise.resolve());
  const state = useRef({ isInView: false, hasAnimatedOnce: false });

  const run = useCallback(
    (target: FxState | undefined, entering: boolean) => {
      const { transition: own, ...rest } = target ?? {};
      const t = own ?? animateState?.transition ?? transition;
      chain.current = chain.current.then(() =>
        Promise.all(
          KEYS.map((k) => {
            if (entering) values[k].set(fill(enterState)[k]);
            const to = typeof (rest as FxState)[k] === "number" ? ((rest as FxState)[k] as number) : DEFAULTS[k];
            if (reduced && k !== "opacity") {
              values[k].set(to);
              return Promise.resolve();
            }
            return new Promise<void>((resolve) => {
              animateValue(values[k], to, {
                ...(t as object),
                restDelta: k === "scale" ? 0.001 : undefined,
                onComplete: () => resolve(),
              } as Transition);
            });
          }),
        ),
      );
    },
    [animateState, enterState, reduced, transition, values],
  );

  useEffect(() => {
    // re-seed the hidden state when the breakpoint changes before first reveal
    if (!state.current.hasAnimatedOnce) {
      const s = fill(enterState);
      for (const k of KEYS) values[k].set(s[k]);
    }
  }, [enterState, values]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const { isInView, hasAnimatedOnce } = state.current;
        const visible = isInViewAtThreshold(entry, threshold);
        if (visible && !isInView) {
          if (animateOnce && hasAnimatedOnce) return;
          state.current = { isInView: true, hasAnimatedOnce: true };
          run(animateState ?? { opacity: 1 }, true);
          return;
        }
        if (!visible && isInView) {
          state.current.isInView = false;
          if (animateOnce) return;
          run(exitState, false);
        }
      },
      { threshold: IO_THRESHOLDS, rootMargin: "0px 0px 0px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animateOnce, animateState, exitState, run, threshold]);

  const Tag = motionTag(as);
  return (
    <Tag ref={ref} className={className} style={{ ...style, ...fxStyle(values) }} {...rest}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------------ */
/* Scroll direction (__framer__scrollDirection) — used by the nav bar       */
/* ------------------------------------------------------------------------ */

const DIRECTION_THRESHOLD_PX = 4;

export function ScrollDirection({
  direction,
  target,
  animate,
  transition,
  repeat = true,
  as,
  children,
  className,
  style,
  ...rest
}: BaseProps & {
  direction: "up" | "down";
  /** State applied while scrolling in `direction`. */
  target: FxState;
  /** State applied otherwise (default: fully visible). */
  animate?: FxState;
  transition?: Transition;
  repeat?: boolean;
}) {
  const values = useFxValues(animate);
  const reduced = useReducedMotion();

  const to = useCallback(
    (state: FxState | undefined) => {
      const s = fill(state ?? animate);
      const t = state?.transition ?? animate?.transition ?? transition;
      for (const k of KEYS) {
        if (reduced && k !== "opacity") values[k].set(s[k]);
        else animateValue(values[k], s[k], { ...(t as object), restDelta: k === "scale" ? 0.001 : undefined } as Transition);
      }
    },
    [animate, reduced, transition, values],
  );

  useEffect(() => {
    let last: number | undefined;
    let anchor = 0;
    let lastDir: "up" | "down" | undefined;
    let current: FxState | undefined;
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if ((!repeat && current === target) || y > max || y < 0) return;
      const dir = y < (last ?? 0) ? "up" : "down";
      last = y;
      const changed = dir !== lastDir;
      lastDir = dir;
      if (changed) {
        anchor = y;
        return;
      }
      if (Math.abs(y - anchor) < DIRECTION_THRESHOLD_PX) return;
      const next = dir === direction ? target : undefined;
      if (next !== current) to(next);
      current = next;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [direction, repeat, target, to]);

  const Tag = motionTag(as);
  return (
    <Tag className={className} style={{ ...style, ...fxStyle(values) }} {...rest}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------------ */
/* Parallax (__framer__speed)                                               */
/* ------------------------------------------------------------------------ */

export function Parallax({
  speed = 100,
  offset = 0,
  adjustPosition = false,
  as,
  children,
  className,
  style,
  ...rest
}: BaseProps & { speed?: number; offset?: number; adjustPosition?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const top = useRef<number | null>(null);
  const [measured, setMeasured] = useState(!adjustPosition);
  const { scrollY } = useScroll();
  const factor = speed / 100 - 1;
  const y = useTransform(scrollY, (sy) => {
    if (top.current === null || speed === 100) return 0;
    return (adjustPosition ? (top.current - offset) * factor : 0) + -sy * factor;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      top.current = entry.boundingClientRect.top;
      y.set(
        speed === 100 ? 0 : (adjustPosition ? (top.current - offset) * factor : 0) + -scrollY.get() * factor,
      );
      setMeasured(true);
      io.disconnect();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [adjustPosition, factor, offset, scrollY, speed, y]);

  const Tag = motionTag(as);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{ ...style, y, visibility: measured ? style?.visibility : "hidden", willChange: "transform" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------------ */
/* Scroll-linked transform (__framer__transformTargets)                     */
/* ------------------------------------------------------------------------ */

function interpolate(progress: number, from: number, to: number) {
  const p = Math.min(1, Math.max(0, progress));
  return from + (to - from) * p;
}

export function ScrollTransform({
  targets,
  trigger,
  spring,
  as,
  children,
  className,
  style,
  ...rest
}: BaseProps & {
  /** Two (or more) states; progress 0..1 is spread evenly across them. */
  targets: Responsive<FxState[]>;
  /** undefined = whole-page scroll progress; "onInView" = element progress (start end -> end end). */
  trigger?: "onInView";
  /** Optional spring smoothing, e.g. { type: "spring", stiffness, damping, mass }. */
  spring?: Transition;
}) {
  const ref = useRef<HTMLElement>(null);
  const bp = useBreakpoint();
  const reduced = useReducedMotion();
  const list = pick(targets, bp);
  const values = useFxValues(list[0]);
  const { scrollYProgress } = useScroll(
    trigger === "onInView" ? { target: ref, offset: ["start end", "end end"] } : undefined,
  );

  useEffect(() => {
    const apply = (progress: number) => {
      const segments = list.length - 1;
      if (segments < 1) return;
      const scaled = Math.min(segments, Math.max(0, progress * segments));
      const i = Math.min(segments - 1, Math.floor(scaled));
      const a = fill(list[i]);
      const b = fill(list[i + 1]);
      for (const k of KEYS) {
        if (reduced && k !== "opacity") continue;
        const v = interpolate(scaled - i, a[k], b[k]);
        if (spring) animateValue(values[k], v, { ...(spring as object), restDelta: 0.001 } as Transition);
        else values[k].set(v);
      }
    };
    apply(scrollYProgress.get());
    return scrollYProgress.on("change", apply);
  }, [list, reduced, scrollYProgress, spring, values]);

  const Tag = motionTag(as);
  return (
    <Tag ref={ref} className={className} style={{ ...style, ...fxStyle(values) }} {...rest}>
      {children}
    </Tag>
  );
}
