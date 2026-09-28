"use client";

import { useEffect, useRef, useState } from "react";
import s from "./sections.module.css";

/**
 * A muted loop behind a section, under a heavy scrim. The poster renders
 * straight away and the <video> only mounts once the section is close to
 * the viewport, so a background flourish never costs anyone a download they
 * do not see. Reduced motion keeps the still.
 */
export function SectionVideo({
  mp4,
  webm,
  poster,
}: {
  mp4: string;
  webm: string;
  poster: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPlay(true);
          io.disconnect();
        }
      },
      { rootMargin: "500px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={s.sectionMedia} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" />
      {play && (
        <video autoPlay muted loop playsInline preload="auto" poster={poster}>
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
