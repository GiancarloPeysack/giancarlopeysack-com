"use client";

import { useState } from "react";

/**
 * Substack's own /embed iframe, with a skeleton shown until it actually
 * paints so there's no blank gap while it loads.
 */
export function SubstackEmbed({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative" style={{ width: 480, maxWidth: "100%", height: 320 }}>
      {!loaded && (
        <div className="absolute inset-0 rounded-md border border-gray-200 bg-gray-50 animate-pulse" />
      )}
      <iframe
        src={src}
        width="480"
        height="320"
        style={{
          position: "relative",
          border: "1px solid #EEE",
          background: "white",
          maxWidth: "100%",
          opacity: loaded ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
        frameBorder={0}
        scrolling="no"
        title="Subscribe to Giancarlo Peysack's Substack"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
