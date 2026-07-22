import type { Metadata } from "next";
import { CookieConsent } from "@/components/CookieConsent";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MUC Cargo Handling | Luftfracht am Flughafen München",
    template: "%s | MUC Cargo Handling",
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
    <html lang="de" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&icon_names=arrow_forward_ios&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <TopBar />
        <Header />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
