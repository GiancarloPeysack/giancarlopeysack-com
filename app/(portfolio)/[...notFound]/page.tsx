import { notFound } from "next/navigation";

// Sends every unmatched URL to (portfolio)/not-found.tsx so the 404 page
// renders inside the portfolio layout (nav + footer), like the template.
export default function CatchAll() {
  notFound();
}
