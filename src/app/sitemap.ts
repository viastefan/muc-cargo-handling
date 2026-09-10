import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/unternehmen", priority: 0.8 },
  { path: "/luftfracht", priority: 0.8 },
  { path: "/airline-handling", priority: 0.8 },
  { path: "/roentgen", priority: 0.8 },
  { path: "/kontakt", priority: 0.7 },
  { path: "/faq", priority: 0.5 },
  { path: "/impressum", priority: 0.3 },
  { path: "/datenschutz", priority: 0.3 },
  { path: "/agb", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
