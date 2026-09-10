/**
 * Kanonische Site-URL — für absolute Links in E-Mails, Sitemap, Metadaten.
 * In Produktion über `SITE_URL` bzw. `NEXT_PUBLIC_SITE_URL` setzen
 * (z. B. https://www.muc-cargo.de). Ohne Wert greift die Vercel-URL, sonst
 * localhost.
 */
function resolveSiteUrl(): string {
  const explicit =
    process.env.SITE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
