import { CSSProperties } from "react";

// The template's icon components ("Menu", "Close", "Arrow Up Right") are
// 24x24 divs painted with an SVG mask, so the color comes from background-color.
function maskStyle(svg: string, color: string, extra?: CSSProperties): CSSProperties {
  const mask = `url('data:image/svg+xml,${svg}') alpha no-repeat center / auto add`;
  return {
    WebkitMask: mask,
    mask,
    aspectRatio: "1",
    width: 24,
    height: 24,
    flex: "none",
    position: "relative",
    backgroundColor: color,
    ...extra,
  };
}

const MENU_SVG = encodeURIComponent(
  '<svg display="block" role="presentation" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M 0 12 L 18 12 L 18 10 L 0 10 Z M 0 7 L 18 7 L 18 5 L 0 5 Z M 0 0 L 0 2 L 18 2 L 18 0 Z" fill="black" transform="translate(3 6)"/></svg>',
);
const CLOSE_SVG = encodeURIComponent(
  '<svg display="block" role="presentation" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M 14 1.41 L 12.59 0 L 7 5.59 L 1.41 0 L 0 1.41 L 5.59 7 L 0 12.59 L 1.41 14 L 7 8.41 L 12.59 14 L 14 12.59 L 8.41 7 Z" fill="black" transform="translate(5 5)"/></svg>',
);
const ARROW_SVG = encodeURIComponent(
  '<svg display="block" role="presentation" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M 0 10 L 10 0" fill="transparent" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="black" transform="translate(7 7)"/><path d="M 0 0 L 10 0 L 10 10" fill="transparent" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="black" transform="translate(7 7)"/></svg>',
);

export function MenuIcon({ color = "#fff" }: { color?: string }) {
  return <div aria-hidden style={maskStyle(MENU_SVG, color)} />;
}

export function CloseIcon({ color = "#fff" }: { color?: string }) {
  return <div aria-hidden style={maskStyle(CLOSE_SVG, color)} />;
}

export function ArrowUpRightIcon({ color = "#000" }: { color?: string }) {
  return <div aria-hidden style={maskStyle(ARROW_SVG, color)} />;
}
