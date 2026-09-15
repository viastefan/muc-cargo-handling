import { CookieConsent } from "@/components/CookieConsent";
import { Header } from "@/components/Header";
import { InquiryFlow } from "@/components/InquiryFlow";
import { LeadCaptureWidget } from "@/components/LeadCaptureWidget";
import { LocationPeek } from "@/components/LocationPeek";
import { RouteScrollReset } from "@/components/RouteScrollReset";
import { SiteFooter } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { TopBar } from "@/components/TopBar";
import { AppTabBar } from "@/components/AppTabBar";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <RouteScrollReset />
      <StructuredData />
      <div className="site-chrome">
        <TopBar />
        <Header />
      </div>
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <AppTabBar />
      <CookieConsent />
      <LeadCaptureWidget />
      <LocationPeek />
      <InquiryFlow />
    </>
  );
}
