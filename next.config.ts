import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * Content-Security-Policy.
 *
 * `script-src`/`style-src` tragen `'unsafe-inline'`: die Seite hat genau ein
 * Inline-Skript (Theme-Bootstrap in app/layout.tsx) und Tailwind v4 gibt
 * Inline-Styles aus. Ein Nonce-Setup über Middleware wäre strenger, brächte
 * hier aber viel Bruchpotenzial für wenig Gewinn (statische Marketing-Seite,
 * einziger dynamischer Eingang ist das serverseitig validierte Kontaktformular).
 * Alles andere ist eng gefasst.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'" + (isProd ? "" : " 'unsafe-eval'"),
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: blob:",
  "frame-src https://www.google.com https://maps.google.com",
  "connect-src 'self'" + (isProd ? "" : " ws: http://localhost:*"),
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  ...(isProd
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Mehrere Lockfiles im Home-Verzeichnis — Root explizit setzen.
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Panel und Formular-Endpunkt nie cachen / nie indexieren.
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
