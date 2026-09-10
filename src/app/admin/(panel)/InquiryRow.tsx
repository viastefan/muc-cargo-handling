"use client";

import { useRouter } from "next/navigation";

/**
 * Klickbare Tabellenzeile. Die Zellen kommen als `children` (<td>…</td>) von
 * der Server-Komponente — hier wird nur das Navigationsverhalten ergänzt.
 */
export function InquiryRow({
  reference,
  children,
}: {
  reference: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const href = `/admin/${encodeURIComponent(reference)}`;
  return (
    <tr
      onClick={() => router.push(href)}
      onKeyDown={(e) => {
        if (e.key === "Enter") router.push(href);
      }}
      tabIndex={0}
      role="link"
      aria-label={`Anfrage ${reference} öffnen`}
    >
      {children}
    </tr>
  );
}
