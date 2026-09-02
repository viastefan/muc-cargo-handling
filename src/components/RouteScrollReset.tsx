"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * html hat global `scroll-behavior: smooth` (fuer Anker-Links). Bei einer
 * Client-Navigation zwischen Seiten unterschiedlicher Laenge (z. B. von
 * einer langen Seite auf eine kurze wie /impressum) animiert der Browser
 * den Reset auf scrollY=0 dann statt ihn sofort zu setzen – und bricht die
 * Animation ab, sobald der neue, kuerzere Inhalt einrastet. Ergebnis: die
 * Seite bleibt mittendrin haengen statt ganz oben zu landen. Dieser
 * Wechsel-Reset setzt scrollY bei jedem Routenwechsel hart auf 0.
 */
export function RouteScrollReset() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
