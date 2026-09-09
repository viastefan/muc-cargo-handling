import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { Header } from "@/components/Header";
import { InquiryFlow } from "@/components/InquiryFlow";
import { LeadCaptureWidget } from "@/components/LeadCaptureWidget";
import { RouteScrollReset } from "@/components/RouteScrollReset";
import { SiteFooter } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
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
    <html
      lang="de"
      className={`h-full antialiased ${geist.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Setzt data-theme vor dem ersten Paint (Standard: dunkel, siehe
            src/lib/theme.ts) — verhindert einen hell/dunkel-Flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&icon_names=arrow_forward_ios&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <RouteScrollReset />
        {/* Kontaktleiste und Kopfzeile kleben gemeinsam als ein Block am
            Viewport. Frueher waren es zwei getrennt sticky Elemente, die ueber
            eine per ResizeObserver gemessene --topbar-h aneinander andockten —
            sobald der Messwert kurz nicht zur Layouthoehe passte (Umbruch,
            Zoom, Auf-/Zuklapp-Animation), klaffte dazwischen ein Spalt. */}
        <div className="site-chrome">
          <TopBar />
          <Header />
        </div>
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieConsent />
        <LeadCaptureWidget />
        <InquiryFlow />
      </body>
    </html>
  );
}
