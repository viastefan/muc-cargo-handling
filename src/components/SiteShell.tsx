"use client";

import { usePathname } from "next/navigation";
import { CookieConsent } from "@/components/CookieConsent";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";

/** Keeps public chrome off /admin without restructuring marketing routes. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname?.startsWith("/admin/");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CookieConsent />
    </>
  );
}
