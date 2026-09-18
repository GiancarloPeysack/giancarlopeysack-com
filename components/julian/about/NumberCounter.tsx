"use client";

/**
 * Port of the template's "Animated Number Counter" code component (Framer
 * University), as configured on the About page: mode "default", trigger
 * "layerInView" with replay, spring { duration: 1, bounce: 0 }.
 *
 * Runtime semantics (from the page module): the visible number is an absolutely
 * positioned <p> observed with useInView({ amount: "some" }); a second,
 * invisible <p> holds the animation target and gives the box its size (so the
 * width jumps from the start value to the end value when counting starts and
 * keeps the end value afterwards). Entering the viewport animates start -> end
 * with framer-motion's `animate`; leaving it stops the animation and resets the
 * visible value to `start` (replay).
 */
import { animate, useInView, type AnimationPlaybackControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FONT =
  "m-0 text-center font-switzer text-[63px] font-normal not-italic leading-[1.2em] tracking-[-0.02em]";

export function NumberCounter({
  start = 0,
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  commas = true,
  replay = true,
  duration = 1,
  bounce = 0,
}: {
  start?: number;
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: 0 | 1 | 2 | 3;
  commas?: boolean;
  replay?: boolean;
  duration?: number;
  bounce?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: !replay, amount: "some" });
  const [value, setValue] = useState(start);
  const [target, setTarget] = useState(start);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    controls.current?.stop();
    if (inView) {
      setTarget(end);
      controls.current = animate(start, end, {
        type: "spring",
        duration,
        bounce,
        delay: 0,
        onUpdate: (v) => setValue(v),
      });
    } else {
      setValue(start);
    }
    // the counter's values are static per instance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => () => controls.current?.stop(), []);

  const format = (n: number) => {
    let t = n.toFixed(decimals);
    if (commas) t = t.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return t;
  };

  return (
    <div className="relative h-auto w-auto flex-none">
      {/* sizing ghost: shows the target so the box has the final width */}
      <p aria-hidden className={`${FONT} pointer-events-none select-none text-black opacity-0`}>
        {prefix}
        {format(target)}
        {suffix}
      </p>
      <p ref={ref} className={`${FONT} absolute inset-0 text-white no-underline`}>
        {prefix}
        {format(value)}
        {suffix}
      </p>
    </div>
  );
}
