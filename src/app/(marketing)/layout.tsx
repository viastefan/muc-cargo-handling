import { CookieConsent } from "@/components/CookieConsent";
import { Header } from "@/components/Header";
import { InquiryFlow } from "@/components/InquiryFlow";
import { LeadCaptureWidget } from "@/components/LeadCaptureWidget";
import { RouteScrollReset } from "@/components/RouteScrollReset";
import { SiteFooter } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
    </>
  );
}
