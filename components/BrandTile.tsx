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
  /** Vertical pixel nudge for the letter (e.g. -2 to lift a lowercase glyph). */
  letterOffsetY?: number;
  /** Renders a non-navigating, visually muted tile (e.g. a "coming soon" link). */
  disabled?: boolean;
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
  letterOffsetY = 0,
  disabled = false,
}: BrandTileProps) {
  const Wrapper: any = disabled ? "span" : Link;
  const wrapperProps = disabled
    ? {
        "aria-disabled": true as const,
        "aria-label": `${label} (soon)`,
        tabIndex: 0,
      }
    : {
        href,
        target: href.startsWith("http") ? ("_blank" as const) : undefined,
        rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
        "aria-label": label,
      };
  return (
    <Wrapper
      {...wrapperProps}
      className={`tile inline-flex shrink-0 align-middle no-underline${
        disabled ? " opacity-40 cursor-default" : ""
      }`}
    >
      <span
        className="brand-tile inline-flex items-center justify-center"
        style={{
          background: bg,
          // 2.5px white ring separates adjacent tiles (especially dark ones),
          // disappears visually against the white page background when isolated.
          boxShadow: borderColor
            ? `0 0 0 1px ${borderColor}, 0 1px 3px rgba(0,0,0,0.10)`
            : "0 0 0 2.5px #ffffff, 0 0 0 3px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.12)",
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
              transform: letterOffsetY
                ? `translateY(${letterOffsetY}px)`
                : undefined,
            }}
          >
            {letter}
          </span>
        )}
      </span>
      <span className="tile-tooltip">{tooltip ?? label}</span>
    </Wrapper>
  );
}
