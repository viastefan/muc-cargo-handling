import type { MetadataRoute } from "next";

/**
 * PWA-Manifest — nötig, damit das Panel auf dem Handy zum Startbildschirm
 * hinzugefügt werden kann. Auf iOS ist das Voraussetzung für Push.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MUC Cargohandling — Anfragen",
    short_name: "MUC Anfragen",
    description: "Anfragen-Verwaltung der MUC Cargohandling GmbH.",
    start_url: "/admin",
    scope: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
