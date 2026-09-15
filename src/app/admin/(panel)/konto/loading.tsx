/** Eigene Skeleton fuer /admin/konto — siehe team/loading.tsx zur Begründung. */
export default function KontoLoading() {
  return (
    <>
      <h1 className="admin-page-title">Konto</h1>
      <div className="admin-card">
        <p className="admin-card__title">Angemeldet</p>
        <div className="admin-card__body" style={{ display: "grid", gap: "0.5rem" }}>
          <div className="admin-skel" style={{ width: "50%", height: "13px" }} />
          <div className="admin-skel" style={{ width: "65%", height: "13px" }} />
          <div className="admin-skel" style={{ width: "35%", height: "13px" }} />
        </div>
      </div>
      <div className="admin-card" style={{ marginTop: "1rem" }}>
        <p className="admin-card__title">Passwort ändern</p>
        <div className="admin-card__body" style={{ display: "grid", gap: "0.6rem", maxWidth: "22rem" }}>
          <div className="admin-skel" style={{ width: "100%", height: "38px" }} />
          <div className="admin-skel" style={{ width: "100%", height: "38px" }} />
        </div>
      </div>
    </>
  );
}
