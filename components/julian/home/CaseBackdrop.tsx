"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import s from "./sections.module.css";

export type Backdrop = { slug: string; src: string };

/**
 * The section takes on the project you are pointing at, the way rigocm.com
 * does on its work list. The images are the same files the cards already
 * load, so hovering costs no extra bytes, and they are blurred and dimmed
 * hard enough that the work stays the thing you read.
 *
 * Hover is the wrong signal on touch, so there it stays on the first
 * project; keyboard focus moves it too.
 */
export function CaseBackdrop({ items }: { items: Backdrop[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    if (!window.matchMedia("(any-hover: hover)").matches) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-case]"));
    const enter = (event: Event) => {
      const slug = (event.currentTarget as HTMLElement).dataset.case ?? null;
      setActive(slug);
    };
    const leave = () => setActive(null);

    cards.forEach((card) => {
      card.addEventListener("pointerenter", enter);
      card.addEventListener("focusin", enter);
      card.addEventListener("pointerleave", leave);
      card.addEventListener("focusout", leave);
    });
    return () => {
      cards.forEach((card) => {
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("focusin", enter);
        card.removeEventListener("pointerleave", leave);
        card.removeEventListener("focusout", leave);
      });
    };
  }, []);

  return (
    <div ref={ref} className={s.caseBackdrop} aria-hidden="true">
      {items.map((item) => (
        <div
          key={item.slug}
          className={s.caseBackdropLayer}
          style={{ opacity: active === item.slug ? 1 : 0 }}
        >
          <Image src={item.src} alt="" fill unoptimized sizes="100vw" />
        </div>
      ))}
    </div>
  );
}
