import Link from "next/link";

/**
 * Tabellenzeile mit echtem Link statt Klick-Handler: die Referenz-Zelle
 * enthaelt ein <a href>, das per ::after (admin.css) auf die ganze Zeile
 * gestreckt wird. Dadurch funktionieren Rechtsklick/Mittelklick/Prefetch/
 * Tastaturfokus wie bei jedem normalen Link — vorher gab es keinen href,
 * nur `router.push` per onClick.
 */
export function InquiryRow({
  reference,
  children,
}: {
  reference: string;
  children: React.ReactNode;
}) {
  const href = `/admin/${encodeURIComponent(reference)}`;
  return (
    <tr>
      <td className="admin-table__ref">
        <Link href={href} className="admin-row-link" aria-label={`Anfrage ${reference} öffnen`}>
          {reference}
        </Link>
      </td>
      {children}
    </tr>
  );
}
