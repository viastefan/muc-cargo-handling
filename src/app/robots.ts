import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Solange noch keine eigene Domain hinterlegt ist, läuft die Seite unter der
// öffentlich erreichbaren *.vercel.app-Vorschau-URL. Die soll nie indexiert
// werden — erst mit der echten Domain wird regulär auf allow/index umgeschaltet.
const isPreviewHost = /(^|\.)vercel\.app$/i.test(new URL(SITE_URL).hostname);

export default function robots(): MetadataRoute.Robots {
  if (isPreviewHost) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
