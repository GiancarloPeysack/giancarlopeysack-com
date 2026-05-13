import Link from "next/link";

type PhoneTileProps = {
  href: string;
  label: string;
  tooltip?: string;
  bg: string;
  fg: string;
  letter: string;
  italic?: boolean;
};

/**
 * Vertical mini phone mockup. Renders inside a `.tile-row` parent which
 * controls the overlap/spread + hover deck behavior.
 */
export function PhoneTile({
  href,
  label,
  tooltip,
  bg,
  fg,
  letter,
  italic,
}: PhoneTileProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="tile inline-flex shrink-0 align-middle no-underline"
    >
      <span
        className="phone-tile"
        style={{
          background: bg,
          boxShadow:
            "0 0 0 1.5px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.10)",
        }}
      >
        <span
          className="phone-tile-notch"
          style={{ background: "rgba(255,255,255,0.22)" }}
        />
        <span
          className="phone-tile-letter absolute inset-0 flex items-center justify-center"
          style={{ color: fg, fontStyle: italic ? "italic" : "normal" }}
        >
          {letter}
        </span>
      </span>
      <span className="tile-tooltip">{tooltip ?? label}</span>
    </Link>
  );
}
