import Link from "next/link";
import { ReactNode } from "react";

type BrandTileProps = {
  href: string;
  label: string;
  tooltip?: string;
  bg: string;
  fg?: string;
  letter?: string;
  italic?: boolean;
  children?: ReactNode;
  borderColor?: string;
};

/**
 * Square brand tile (Chris Raroque app-icon style). Either render a centered
 * letter (e.g. M, z) or pass children for a custom glyph/SVG.
 */
export function BrandTile({
  href,
  label,
  tooltip,
  bg,
  fg = "#FFFFFF",
  letter,
  italic,
  children,
  borderColor,
}: BrandTileProps) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="tile inline-flex shrink-0 align-middle no-underline"
    >
      <span
        className="brand-tile inline-flex items-center justify-center"
        style={{
          background: bg,
          boxShadow: borderColor
            ? `0 0 0 1px ${borderColor}, 0 1px 3px rgba(0,0,0,0.10)`
            : "0 1px 3px rgba(0,0,0,0.10)",
        }}
      >
        {children ? (
          children
        ) : (
          <span
            className="brand-tile-letter"
            style={{
              color: fg,
              fontStyle: italic ? "italic" : "normal",
            }}
          >
            {letter}
          </span>
        )}
      </span>
      <span className="tile-tooltip">{tooltip ?? label}</span>
    </Link>
  );
}
