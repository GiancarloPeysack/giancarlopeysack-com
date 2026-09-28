"use client";

import { useEffect, useState } from "react";
import { homeContent } from "@/content/home";
import s from "./home.module.css";

/**
 * The looping footage in the hero. The poster image is server-rendered
 * underneath (see Hero.tsx), so the frame is never empty; this only mounts
 * the <video> on top once we know which breakpoint is showing.
 *
 * Both hero frames exist in the DOM at once and are swapped with
 * `display: none`, so mounting the video in both would download two files.
 * Each instance says which breakpoint it belongs to and renders nothing on
 * the other one. Reduced motion keeps the poster.
 */
export function HeroVideo({ phone = false }: { phone?: boolean }) {
  const [show, setShow] = useState(false);
  const { video, band } = homeContent.hero;
  const clip = phone ? video : band;

  useEffect(() => {
    if (!clip) return;
    const isPhone = window.matchMedia("(max-width: 809.98px)");
    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setShow(!stillness.matches && isPhone.matches === phone);
    sync();
    isPhone.addEventListener("change", sync);
    stillness.addEventListener("change", sync);
    return () => {
      isPhone.removeEventListener("change", sync);
      stillness.removeEventListener("change", sync);
    };
  }, [phone, clip]);

  if (!clip || !show) return null;
  return (
    <video
      className={s.heroVideo}
      poster={clip.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      // The poster image underneath carries the alt text.
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={clip.webm} type="video/webm" />
      <source src={clip.mp4} type="video/mp4" />
    </video>
  );
}
