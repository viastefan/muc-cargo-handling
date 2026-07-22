import type { Metadata } from "next";
import { CookieConsent } from "@/components/CookieConsent";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/Footer";
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
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
