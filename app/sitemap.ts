import type { MetadataRoute } from "next";
import { projectsIndex } from "@/content/projects";

const SITE = "https://giancarlopeysack.com";

// The portfolio pages and the link-in-bio page. The form pages (/pilot,
// /sponsor, /waitlist/*) are left out: visitors reach them from /links.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/projects",
    ...projectsIndex.order.map((slug) => `/projects/${slug}`),
    "/about",
    "/contact",
    "/links",
  ];
  return paths.map((path) => ({ url: `${SITE}${path === "/" ? "" : path}` }));
}
