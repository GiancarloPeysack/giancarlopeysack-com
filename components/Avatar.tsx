"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

/**
 * Clickable avatar. Tap/click → fullscreen lightbox with the original-size
 * photo. Close on Esc, click outside, or click the X.
 */
export function Avatar({
  src,
  alt = "Giancarlo Peysack",
  size = 56,
}: {
  src: string;
  alt?: string;
  size?: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    // lock body scroll while modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open photo"
        className="avatar inline-block rounded-full overflow-hidden align-middle cursor-zoom-in transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400"
        style={{ padding: 0, border: 0, background: "transparent" }}
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          priority
          className="object-cover w-full h-full"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 cursor-zoom-out"
          style={{ animation: "avatar-fade 180ms ease-out" }}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white text-2xl leading-none w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            ×
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-full overflow-hidden"
            style={{
              width: "min(80vw, 480px)",
              height: "min(80vw, 480px)",
            }}
          >
            <Image
              src={src}
              alt={alt}
              width={720}
              height={720}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes avatar-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
