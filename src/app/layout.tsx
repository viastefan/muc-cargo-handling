import type { Metadata } from "next";
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MUC Cargohandling | Luftfracht am Flughafen München",
    template: "%s | MUC Cargohandling",
  },
  description:
    "Präzise Abwicklung und Sicherheit für Ihre Luftfracht am Flughafen München. Import, Export, Airline Handling und Röntgenkontrolle.",
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
