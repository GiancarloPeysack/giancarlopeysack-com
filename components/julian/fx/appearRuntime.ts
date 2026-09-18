/**
 * Load-time appear runtime: a port of the part of Framer's appear animator
 * (itself built on Motion's spring) that the Julian template uses.
 *
 * Framer starts appear effects from an inline script at the end of <body>,
 * on the first animation frame, with the Web Animations API. They run before
 * and independently of hydration, so the stagger is exact even when the JS
 * bundle is slow. This runtime does the same:
 *
 *   - `boot()` (inline script, see AppearBoot) starts every `[data-fx-appear]`
 *     element in the document with one shared start time.
 *   - `start(el)` (called by <Appear> on mount) starts elements that mounted
 *     later, e.g. after a client-side navigation, from now with their full
 *     delay. It is idempotent, so an element booted by the script is not
 *     restarted.
 *   - When the animations finish, the final values are written to the inline
 *     style and the WAAPI animations are cancelled, handing the element back
 *     to framer-motion (see <Appear>).
 *
 * Springs are sampled every 10 ms until they settle and played as linear
 * keyframes; every property of an element shares the longest duration.
 *
 * The function must stay self-contained (no imports or outer references):
 * AppearBoot serializes it into the inline script with toString().
 */
export function fxAppearRuntime() {
  type State = Record<string, unknown> & { transition?: Record<string, unknown> };
  type Plan = Record<string, { keyframes: (number | string)[]; options: KeyframeAnimationOptions }>;
  type Record_ = { animations: Animation[]; done: Promise<State | null> };

  const records = new WeakMap<Element, Record_>();
  const springCache = new Map<string, { keyframes: number[]; duration: number }>();

  const DEFAULTS: Record<string, number> = {
    opacity: 1,
    scale: 1,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    x: 0,
    y: 0,
    z: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
  };
  const TRANSFORM_ORDER = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ];
  const TRANSFORM_NAME: Record<string, string> = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  };
  const UNIT: Record<string, string> = {
    translateX: "px",
    translateY: "px",
    translateZ: "px",
    x: "px",
    y: "px",
    z: "px",
    perspective: "px",
    transformPerspective: "px",
    rotate: "deg",
    rotateX: "deg",
    rotateY: "deg",
  };
  const NAMED_EASE: Record<string, string> = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: "cubic-bezier(0, 0.65, 0.55, 1)",
    circOut: "cubic-bezier(0.55, 0, 1, 0.45)",
    backIn: "cubic-bezier(0.31, 0.01, 0.66, -0.59)",
    backOut: "cubic-bezier(0.33, 1.53, 0.69, 0.99)",
  };

  const isTransform = (key: string) => TRANSFORM_ORDER.indexOf(key) !== -1;
  const clamp = (min: number, max: number, v: number) => (v > max ? max : v < min ? min : v);

  function breakpoint() {
    if (window.matchMedia("(min-width: 1200px)").matches) return "desktop";
    if (window.matchMedia("(min-width: 810px)").matches) return "tablet";
    return "phone";
  }

  function pick(value: any, bp: string): State {
    if (!value || typeof value !== "object" || !("desktop" in value)) return value || {};
    return (bp === "phone" ? value.phone ?? value.tablet : bp === "tablet" ? value.tablet : undefined) ?? value.desktop;
  }

  /* ---------------- spring (Motion's spring generator) ---------------- */

  function dampedFreq(undamped: number, ratio: number) {
    return undamped * Math.sqrt(1 - ratio * ratio);
  }

  // Resolves stiffness/damping from duration + bounce (Newton's method).
  function findSpring(durationMs: number, bounce: number, velocity: number, mass: number) {
    const SAFE_MIN = 0.001;
    let envelope: (f: number) => number;
    let derivative: (f: number) => number;
    const ratio = clamp(0.05, 1, 1 - bounce);
    const duration = clamp(0.01, 10, durationMs / 1000);
    if (ratio < 1) {
      envelope = (f) => {
        const decay = f * ratio;
        const delta = decay * duration;
        return SAFE_MIN - ((decay - velocity) / dampedFreq(f, ratio)) * Math.exp(-delta);
      };
      derivative = (f) => {
        const delta = f * ratio * duration;
        const d = delta * velocity + velocity;
        const e = Math.pow(ratio, 2) * Math.pow(f, 2) * duration;
        const g = dampedFreq(Math.pow(f, 2), ratio);
        const factor = -envelope(f) + SAFE_MIN > 0 ? -1 : 1;
        return (factor * ((d - e) * Math.exp(-delta))) / g;
      };
    } else {
      envelope = (f) => -SAFE_MIN + Math.exp(-f * duration) * ((f - velocity) * duration + 1);
      derivative = (f) => Math.exp(-f * duration) * ((velocity - f) * (duration * duration));
    }
    let root = 5 / duration;
    for (let i = 1; i < 12; i++) root = root - envelope(root) / derivative(root);
    if (isNaN(root)) return { stiffness: 100, damping: 10, duration: duration * 1000 };
    const stiffness = Math.pow(root, 2) * mass;
    return { stiffness, damping: ratio * 2 * Math.sqrt(mass * stiffness), duration: duration * 1000 };
  }

  function spring(opts: Record<string, any>, from: number, to: number) {
    let stiffness = 100;
    let damping = 10;
    let mass = 1;
    let velocity = -((opts.velocity || 0) / 1000);
    let fixedDuration = 0;
    const physics = ["stiffness", "damping", "mass"].some((k) => opts[k] !== undefined);
    const timed = ["duration", "bounce"].some((k) => opts[k] !== undefined);
    if (!physics && timed) {
      velocity = 0;
      if (opts.visualDuration) {
        const root = (2 * Math.PI) / (opts.visualDuration * 1.2);
        stiffness = root * root;
        damping = 2 * clamp(0.05, 1, 1 - (opts.bounce || 0)) * Math.sqrt(stiffness);
      } else {
        const found = findSpring(opts.duration ?? 800, opts.bounce ?? 0.3, 0, 1);
        stiffness = found.stiffness;
        damping = found.damping;
        fixedDuration = found.duration;
      }
    } else {
      stiffness = opts.stiffness ?? 100;
      damping = opts.damping ?? 10;
      mass = opts.mass ?? 1;
    }

    const ratio = damping / (2 * Math.sqrt(stiffness * mass));
    const delta = to - from;
    const w0 = Math.sqrt(stiffness / mass) / 1000;
    const granular = Math.abs(delta) < 5;
    const restSpeed = opts.restSpeed || (granular ? 0.01 : 2);
    const restDelta = opts.restDelta || (granular ? 0.005 : 0.5);

    let position: (t: number) => number;
    let speed: (t: number) => number;
    if (ratio < 1) {
      const wd = dampedFreq(w0, ratio);
      const a = (velocity + ratio * w0 * delta) / wd;
      const b = ratio * w0 * a + delta * wd;
      const c = ratio * w0 * delta - a * wd;
      position = (t) => to - Math.exp(-ratio * w0 * t) * (a * Math.sin(wd * t) + delta * Math.cos(wd * t));
      speed = (t) => Math.exp(-ratio * w0 * t) * (b * Math.sin(wd * t) + c * Math.cos(wd * t));
    } else if (ratio === 1) {
      const k = velocity + w0 * delta;
      position = (t) => to - Math.exp(-w0 * t) * (delta + (velocity + w0 * delta) * t);
      speed = (t) => Math.exp(-w0 * t) * (w0 * k * t - velocity);
    } else {
      const wd = w0 * Math.sqrt(ratio * ratio - 1);
      const a = (velocity + ratio * w0 * delta) / wd;
      const b = ratio * w0 * a - delta * wd;
      const c = ratio * w0 * delta - a * wd;
      position = (t) => {
        const p = Math.min(wd * t, 300);
        return to - (Math.exp(-ratio * w0 * t) * ((velocity + ratio * w0 * delta) * Math.sinh(p) + wd * delta * Math.cosh(p))) / wd;
      };
      speed = (t) => {
        const p = Math.min(wd * t, 300);
        return Math.exp(-ratio * w0 * t) * (b * Math.sinh(p) + c * Math.cosh(p));
      };
    }

    return (t: number) => {
      const value = position(t);
      const done = fixedDuration
        ? t >= fixedDuration
        : Math.abs(speed(t) * 1000) <= restSpeed && Math.abs(to - value) <= restDelta;
      return { done, value: done ? to : value };
    };
  }

  // Spring sampled every 10 ms until it settles (max 10 s).
  function springKeyframes(from: number, to: number, transition: Record<string, any>) {
    const timed = !["stiffness", "damping", "mass"].some((k) => k in transition) && ["duration", "bounce"].some((k) => k in transition);
    const key = timed
      ? `${from}-${to}-${transition.duration}-${transition.bounce}`
      : `${from}-${to}-${transition.damping}-${transition.stiffness}-${transition.mass}`;
    const cached = springCache.get(key);
    if (cached) return cached;
    const next = spring(timed ? { ...transition, duration: transition.duration * 1000 } : transition, from, to);
    const keyframes: number[] = [];
    let state = { done: false, value: from };
    let t = 0;
    while (!state.done && t < 10000) {
      state = next(t);
      keyframes.push(state.value);
      t += 10;
    }
    const result = { keyframes, duration: t - 10 };
    springCache.set(key, result);
    return result;
  }

  /* ---------------- keyframes -> WAAPI plan ---------------- */

  function withUnit(key: string, value: number | string) {
    const unit = UNIT[key];
    return !unit || (typeof value === "string" && value.endsWith(unit)) ? value : `${value}${unit}`;
  }

  // `template` wraps the generated transform, e.g. "translate(-50%, -50%) {}"
  // for centered elements (Framer's transformTemplate).
  function transformString(frame: Record<string, number | string>, template?: string) {
    let out = "";
    let isDefault = true;
    const keys = Object.keys(frame).sort((a, b) => TRANSFORM_ORDER.indexOf(a) - TRANSFORM_ORDER.indexOf(b));
    for (const key of keys) {
      const value = frame[key];
      const valueIsDefault =
        typeof value === "number" ? value === (key.startsWith("scale") ? 1 : 0) : parseFloat(value) === 0;
      if (!valueIsDefault) {
        isDefault = false;
        out += `${TRANSFORM_NAME[key] || key}(${value}) `;
      }
    }
    out = out.trim();
    if (template) return template.replace("{}", out);
    return isDefault ? "none" : out;
  }

  function transformKeyframes(byKey: Record<string, (number | string)[]>, template?: string) {
    const keys = Object.keys(byKey);
    const length = keys.length ? byKey[keys[0]].length : 0;
    const frames: string[] = [];
    for (let i = 0; i < length; i++) {
      const frame: Record<string, number | string> = {};
      for (const key of keys) if (byKey[key][i] !== undefined) frame[key] = withUnit(key, byKey[key][i] as number | string);
      frames.push(transformString(frame, template));
    }
    return frames;
  }

  function pad<T>(values: T[], length: number) {
    const missing = length - values.length;
    return missing <= 0 ? values : values.concat(new Array(missing).fill(values[values.length - 1]));
  }

  function easing(ease: unknown): string {
    if (Array.isArray(ease) && typeof ease[0] === "number") return `cubic-bezier(${ease.join(", ")})`;
    return NAMED_EASE[ease as string] || "ease-out";
  }

  function plan(initial: State, target: State, transition: Record<string, any>, template?: string): Plan {
    const delay = (transition.delay || 0) * 1000;
    const keys = Array.from(new Set(Object.keys(initial).concat(Object.keys(target)))).filter((k) => k !== "transition");
    const result: Plan = {};

    if (transition.type === "spring") {
      const byKey: Record<string, number[]> = {};
      let longest = 0;
      let length = 0;
      for (const key of keys) {
        const from = (initial[key] ?? DEFAULTS[key]) as number | undefined;
        const to = (target[key] ?? DEFAULTS[key]) as number | undefined;
        if (from === undefined || to === undefined) continue;
        if (key !== "transformPerspective" && from === to && from === DEFAULTS[key]) continue;
        const { keyframes, duration } = springKeyframes(from, to, transition);
        if (duration > longest) {
          longest = duration;
          length = keyframes.length;
        }
        byKey[key] = keyframes;
      }
      if (!length) return result;
      const options = { easing: "linear", duration: longest, delay };
      const transforms: Record<string, number[]> = {};
      for (const key of Object.keys(byKey)) {
        if (isTransform(key)) transforms[key] = pad(byKey[key], length);
        else result[key] = { keyframes: pad(byKey[key], length), options };
      }
      if (Object.keys(transforms).length) result.transform = { keyframes: transformKeyframes(transforms, template), options };
      return result;
    }

    const options = { easing: easing(transition.ease ?? "easeOut"), duration: (transition.duration ?? 0.3) * 1000, delay };
    const transforms: Record<string, number[]> = {};
    for (const key of keys) {
      const from = (initial[key] ?? DEFAULTS[key]) as number | undefined;
      const to = (target[key] ?? DEFAULTS[key]) as number | undefined;
      if (from === undefined || to === undefined) continue;
      if (key !== "transformPerspective" && from === to) continue;
      if (isTransform(key)) transforms[key] = [from, to];
      else result[key] = { keyframes: [from, to], options };
    }
    if (Object.keys(transforms).length) result.transform = { keyframes: transformKeyframes(transforms, template), options };
    return result;
  }

  /* ---------------- public API ---------------- */

  function start(el: Element, startTime?: number): Record_ | null {
    const existing = records.get(el);
    if (existing) return existing;
    let config: { initial: unknown; animate: unknown; transformTemplate?: string } | null = null;
    try {
      // data-fx-appear-mount: started by <Appear> on mount only, never by boot()
      config = JSON.parse(el.getAttribute("data-fx-appear") || el.getAttribute("data-fx-appear-mount") || "null");
    } catch {
      config = null;
    }
    if (!config) return null;

    const bp = breakpoint();
    const initial = pick(config.initial, bp);
    const { transition = {}, ...target } = pick(config.animate, bp);
    const steps = plan(initial, target, transition, config.transformTemplate);
    const animations: Animation[] = [];
    const finals: Record<string, string> = {};
    for (const prop of Object.keys(steps)) {
      const { keyframes, options } = steps[prop];
      const animation = el.animate(
        { [prop]: keyframes as string[] },
        { ...options, fill: "both", iterations: 1, direction: "normal" },
      );
      if (startTime !== undefined) animation.startTime = startTime;
      animations.push(animation);
      finals[prop] = String(keyframes[keyframes.length - 1]);
    }

    // The settled state, including values that only appear in `initial`.
    const settled: State = {};
    for (const key of Object.keys(initial)) if (key !== "transition") settled[key] = target[key] ?? DEFAULTS[key];
    for (const key of Object.keys(target)) settled[key] = target[key];

    const done = Promise.all(animations.map((a) => a.finished)).then(
      () => {
        const style = (el as HTMLElement).style;
        for (const prop of Object.keys(finals)) style.setProperty(prop, finals[prop]);
        for (const a of animations) a.cancel();
        return settled;
      },
      () => null,
    );
    const record = { animations, done };
    records.set(el, record);
    return record;
  }

  // Inline-script entry: start everything in the SSR'd document on the first
  // frame, all with one start time (Framer holds the first element on its
  // initial value until that animation is ready, then syncs every start).
  function boot() {
    requestAnimationFrame(() => {
      const elements = Array.from(document.querySelectorAll("[data-fx-appear]"));
      if (!elements.length) return;
      const first = elements[0] as HTMLElement;
      const opacity = getComputedStyle(first).opacity;
      const hold = first.animate({ opacity: [opacity, opacity] }, { duration: 10000, easing: "linear", fill: "both" });
      const go = () => {
        hold.cancel();
        const time = performance.now();
        for (const el of elements) start(el, time);
      };
      if (hold.ready) hold.ready.then(go).catch(go);
      else go();
    });
  }

  return { start, boot };
}

export type FxAppearRuntime = ReturnType<typeof fxAppearRuntime>;
