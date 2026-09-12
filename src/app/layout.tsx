import type { Metadata } from "next";
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const TITLE = "MUC Cargohandling | Luftfracht am Flughafen München";
const DESCRIPTION =
  "Präzise Abwicklung und Sicherheit für Ihre Luftfracht am Flughafen München. Import, Export, Airline Handling und Röntgenkontrolle.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | MUC Cargohandling",
  },
  description: DESCRIPTION,
  applicationName: "MUC Cargohandling",
  authors: [{ name: "MUC Cargohandling GmbH" }],
  // Vorschaukarte beim Teilen in WhatsApp, LinkedIn, Slack & Co. Ohne diese
  // Angaben zeigen die Dienste nur die nackte URL.
  // Titel und Beschreibung bewusst NICHT hier setzen: Next.js uebernimmt sonst
  // diese Werte auf jeder Unterseite, und alle geteilten Links saehen gleich
  // aus. Ohne die Felder erbt og:title automatisch den Seitentitel.
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "MUC Cargohandling",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Setzt data-theme vor dem ersten Paint (Standard: dunkel, siehe
            src/lib/theme.ts) — verhindert einen hell/dunkel-Flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
