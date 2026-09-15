/** Eigene Skeleton fuer /admin/system — siehe team/loading.tsx zur Begründung. */
export default function SystemLoading() {
  return (
    <>
      <h1 className="admin-page-title">Einrichtung</h1>
      <div className="admin-group" style={{ display: "grid", gap: "0.6rem" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="admin-card" style={{ padding: "0.9rem 1rem" }}>
            <div className="admin-skel" style={{ width: "45%", height: "13px" }} />
            <div className="admin-skel" style={{ width: "75%", height: "12px", marginTop: "0.5rem" }} />
          </div>
        ))}
      </div>
    </>
  );
}
