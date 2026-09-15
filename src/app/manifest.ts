import type { MetadataRoute } from "next";

/**
 * PWA-Manifest der oeffentlichen Marketing-Seite — gilt automatisch ueberall,
 * ausser eine Seite ueberschreibt `metadata.manifest` (das Admin-Panel tut
 * das, siehe admin/layout.tsx + public/admin/manifest.webmanifest). Vorher
 * stand hier faelschlich die admin-Identitaet ("MUC Cargohandling —
 * Anfragen", start_url /admin) — ein Besucher, der von der Startseite aus
 * "Zum Home-Bildschirm hinzufuegen" waehlte, bekam ein Icon fuers interne
 * Tool statt fuer die Firmenseite.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MUC Cargohandling GmbH",
    short_name: "MUC Cargohandling",
    description:
      "Luftfracht Import & Export, Airline Handling und Röntgenkontrolle am Flughafen München.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0f0f11",
    theme_color: "#d90d3a",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
