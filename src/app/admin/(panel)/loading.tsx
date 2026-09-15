/** Platzhalter fuer die Anfragen-Liste, waehrend RSC-Daten nachladen. */
export default function AdminDashboardLoading() {
  return (
    <>
      <h1 className="admin-page-title">Anfragen</h1>

      <div className="admin-widgets">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="admin-widget">
            <div className="admin-skel" style={{ width: "2.5rem", height: "25px" }} />
            <div
              className="admin-skel"
              style={{ width: "70%", height: "12px", marginTop: "0.5rem" }}
            />
          </div>
        ))}
      </div>

      <div className="admin-group">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <tbody>
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i}>
                  <td>
                    <div className="admin-skel" style={{ width: "6rem", height: "13px" }} />
                  </td>
                  <td>
                    <div className="admin-skel" style={{ width: "7rem", height: "13px" }} />
                  </td>
                  <td>
                    <div className="admin-skel" style={{ width: "5rem", height: "13px" }} />
                  </td>
                  <td>
                    <div className="admin-skel" style={{ width: "9rem", height: "13px" }} />
                  </td>
                  <td>
                    <div className="admin-skel" style={{ width: "4rem", height: "13px" }} />
                  </td>
                  <td>
                    <div className="admin-skel" style={{ width: "4.5rem", height: "20px", borderRadius: "999px" }} />
                  </td>
                  <td aria-hidden="true" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
