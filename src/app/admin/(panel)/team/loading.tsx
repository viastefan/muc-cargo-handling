/**
 * Eigene Skeleton fuer /admin/team — ohne diese Datei faellt Next.js sonst
 * auf das naechstgelegene loading.tsx zurueck ((panel)/loading.tsx, fuers
 * Dashboard gedacht) und zeigt kurz dessen Anfragen-Skelett auf dieser Seite.
 */
export default function TeamLoading() {
  return (
    <>
      <h1 className="admin-page-title">Team</h1>
      <div className="admin-skel" style={{ width: "100%", maxWidth: "42rem", height: "14px", marginBottom: "1.25rem" }} />
      <div className="admin-group" style={{ display: "grid", gap: "0.7rem" }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="admin-card" style={{ padding: "1rem" }}>
            <div className="admin-skel" style={{ width: "40%", height: "14px" }} />
            <div className="admin-skel" style={{ width: "60%", height: "12px", marginTop: "0.5rem" }} />
          </div>
        ))}
      </div>
    </>
  );
}
