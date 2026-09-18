import { fxAppearRuntime } from "./appearRuntime";

// Framer's appear runner: an inline script after the page content that
// starts every load-time appear animation on the first frame, before the JS
// bundle hydrates. Must be rendered after all <Appear> elements.
const BOOT = `window.__fxAppear=(${fxAppearRuntime.toString()})();window.__fxAppear.boot();`;

export function AppearBoot() {
  return <script dangerouslySetInnerHTML={{ __html: BOOT }} />;
}
