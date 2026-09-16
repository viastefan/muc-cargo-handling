import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import { SITE_URL } from "@/lib/site";

/**
 * Gemeinsame SEO-Helfer: kanonische Meta, Breadcrumbs und lokale Signale
 * für Google (Standort / Flughafen München).
 */

export type Crumb = {
  name: string;
  path: string;
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean === "/" ? "" : clean}`;
}

/** Seiten-Metadaten mit Canonical, Open Graph und Twitter Card. */
export function pageMeta(input: {
  title?: string;
  description: string;
  path: string;
  /** Wenn true, erscheint der Titel ohne Template-Suffix nur auf der Startseite. */
  bareTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(input.path);
  const title = input.title;

  return {
    ...(title
      ? input.bareTitle
        ? { title: { absolute: title } }
        : { title }
      : {}),
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      title: title ?? COMPANY.brandName,
      description: input.description,
      url,
      locale: "de_DE",
      siteName: COMPANY.brandName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? COMPANY.brandName,
      description: input.description,
    },
  };
}

/** Geo-Meta für lokale Suche (Flughafen München). */
export const LOCAL_GEO_META = {
  "geo.region": "DE-BY",
  "geo.placename": "München-Flughafen",
  "geo.position": `${COMPANY.coordinates.lat};${COMPANY.coordinates.lng}`,
  ICBM: `${COMPANY.coordinates.lat}, ${COMPANY.coordinates.lng}`,
} as const;
