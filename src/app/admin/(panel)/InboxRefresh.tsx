"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

/**
 * Leichtes Auto-Refresh der Anfragen-Liste — alle 45s, pausiert wenn der Tab
 * im Hintergrund liegt. Manuell über den Button jederzeit.
 */
export function InboxRefresh() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [lastAt, setLastAt] = useState(() => new Date());

  useEffect(() => {
    const tick = () => {
      if (document.visibilityState !== "visible") return;
      startTransition(() => {
        router.refresh();
        setLastAt(new Date());
      });
    };
    const id = window.setInterval(tick, 45_000);
    return () => window.clearInterval(id);
  }, [router]);

  const label = new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(lastAt);

  return (
    <div className="admin-refresh">
      <span className="admin-hint" style={{ margin: 0 }}>
        Stand {label}
      </span>
      <button
        type="button"
        className="admin-btn admin-btn--sm admin-btn--plain"
        disabled={pending}
        onClick={() => {
          startTransition(() => {
            router.refresh();
            setLastAt(new Date());
          });
        }}
      >
        {pending ? "Aktualisiere …" : "Aktualisieren"}
      </button>
    </div>
  );
}
