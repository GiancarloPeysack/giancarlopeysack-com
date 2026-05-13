import Link from "next/link";
import { ReactNode } from "react";

type SocialTileProps = {
  href: string;
  label: string;
  tooltip?: string;
  bg: string;
  children: ReactNode;
};

export function SocialTile({
  href,
  label,
  tooltip,
  bg,
  children,
}: SocialTileProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="tile inline-flex shrink-0 align-middle no-underline"
    >
      <span
        className="social-tile"
        style={{ background: bg, boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}
      >
        {children}
      </span>
      <span className="tile-tooltip">{tooltip ?? label}</span>
    </Link>
  );
}
