"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Port of the template's "Smooth Scroll" code component (Lenis 1.1.2,
 * intensity 10 => duration 1). Pinned to lenis@1.1.2 because later versions
 * changed the lerp default, which changes the scroll feel.
 */
export function SmoothScroll({ intensity = 10 }: { intensity?: number }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isFirstPath = useRef(true);
  const cameFromHistory = useRef(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: (intensity || 10) / 10 });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [intensity]);

  // New pages open at the top, like the template. Lenis keeps its own scroll
  // target, so without this a click during a smooth scroll (or the next wheel
  // after arriving) carries the old position over to the new page. Back and
  // forward keep the position the browser restores; Lenis just syncs to it.
  useEffect(() => {
    const onPop = () => {
      cameFromHistory.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return;
    }
    const lenis = lenisRef.current;
    if (cameFromHistory.current) {
      cameFromHistory.current = false;
      requestAnimationFrame(() => lenis?.scrollTo(window.scrollY, { immediate: true, force: true }));
      return;
    }
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  // Pause while a menu/modal marks the page with data-frameruni-stop-scroll
  // or locks <html> overflow, like the original component does.
  useEffect(() => {
    const check = () => {
      const lenis = lenisRef.current;
      if (!lenis) return;
      const stop =
        document.querySelector("[data-frameruni-stop-scroll]") !== null ||
        document.documentElement.style.overflow === "hidden";
      if (stop) lenis.stop();
      else lenis.start();
    };
    check();
    const bodyObserver = new MutationObserver(check);
    const htmlObserver = new MutationObserver(check);
    bodyObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-frameruni-stop-scroll"],
    });
    htmlObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });
    return () => {
      bodyObserver.disconnect();
      htmlObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("*").forEach((el) => {
      if (getComputedStyle(el).getPropertyValue("overflow") === "auto") {
        el.setAttribute("data-lenis-prevent", "true");
      }
    });
  }, []);

  return null;
}
