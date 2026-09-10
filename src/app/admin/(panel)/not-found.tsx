import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div style={{ padding: "3rem 0", textAlign: "center" }}>
      <p style={{ margin: 0, fontWeight: 600 }}>Anfrage nicht gefunden</p>
      <p style={{ margin: "0.5rem 0 1.5rem", color: "var(--muted)", fontSize: "13px" }}>
        Diese Referenz existiert nicht oder wurde gelöscht.
      </p>
      <Link href="/admin" className="admin-btn admin-btn--sm">
        Zur Übersicht
      </Link>
    </div>
  );
}
