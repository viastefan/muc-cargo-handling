function CardSkel({ lines = 2 }: { lines?: number }) {
  return (
    <div className="admin-card">
      <p className="admin-card__title">
        <span className="admin-skel" style={{ display: "inline-block", width: "5rem", height: "10px" }} />
      </p>
      <div className="admin-card__body" style={{ display: "grid", gap: "0.5rem" }}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="admin-skel"
            style={{ width: i === lines - 1 ? "60%" : "100%", height: "13px" }}
          />
        ))}
      </div>
    </div>
  );
}

/** Platzhalter fuer die Anfrage-Detailansicht, waehrend RSC-Daten nachladen. */
export default function InquiryDetailLoading() {
  return (
    <>
      <div className="admin-back" style={{ opacity: 0.5 }}>
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 3.5 5.5 8 10 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Alle Anfragen
      </div>

      <div className="admin-detail-head">
        <div className="admin-skel" style={{ width: "10rem", height: "22px" }} />
        <div className="admin-skel" style={{ width: "4.5rem", height: "20px", borderRadius: "999px" }} />
      </div>

      <div className="admin-detail">
        <div>
          <CardSkel lines={3} />
          <CardSkel lines={2} />
        </div>
        <div>
          <CardSkel lines={1} />
          <CardSkel lines={1} />
          <CardSkel lines={4} />
        </div>
      </div>
    </>
  );
}
