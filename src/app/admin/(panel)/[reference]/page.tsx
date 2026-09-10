import Link from "next/link";
import { notFound } from "next/navigation";
import {
  INQUIRY_STATUSES,
  STATUS_LABEL,
  TOPIC_LABEL,
  getInquiry,
} from "@/lib/inquiries";
import { hasAdminSession } from "@/lib/admin-session";
import { StatusBadge } from "../StatusBadge";
import { DeleteInquiryButton } from "../DeleteInquiryButton";
import { setStatusAction, saveNoteAction } from "../actions";

function fullDate(iso: string | null) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(new Date(iso));
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default async function InquiryDetail({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  if (!(await hasAdminSession())) return null;

  const { reference } = await params;
  const inquiry = await getInquiry(reference);
  if (!inquiry) notFound();

  const telHref = inquiry.phone
    ? `tel:${inquiry.phone.replace(/[^+\d]/g, "")}`
    : null;

  return (
    <>
      <Link href="/admin" className="admin-back">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 3.5 5.5 8 10 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Alle Anfragen
      </Link>

      <div className="admin-detail-head">
        <h1>
          {inquiry.firstName} {inquiry.lastName}
        </h1>
        <StatusBadge status={inquiry.status} />
        <span className="admin-detail-head__ref">{inquiry.reference}</span>
      </div>

      <div className="admin-detail">
        <div>
          <div className="admin-card">
            <p className="admin-card__title">Nachricht</p>
            <p className="admin-message">{inquiry.message}</p>
          </div>

          <div className="admin-card">
            <p className="admin-card__title">Interne Notiz</p>
            <div className="admin-card__body">
              <form action={saveNoteAction}>
                <input type="hidden" name="reference" value={inquiry.reference} />
                <textarea
                  name="note"
                  className="admin-textarea"
                  defaultValue={inquiry.adminNote ?? ""}
                  placeholder="Nur intern — Gesprächsnotizen, nächste Schritte …"
                />
                <div style={{ marginTop: "0.6rem" }}>
                  <button type="submit" className="admin-btn admin-btn--sm">
                    Notiz speichern
                  </button>
                </div>
              </form>
            </div>
            {inquiry.handledAt ? (
              <p className="admin-note-meta">
                Erledigt / archiviert am {fullDate(inquiry.handledAt)}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <div className="admin-card">
            <p className="admin-card__title">Status</p>
            <div className="admin-card__body">
              <form
                action={setStatusAction}
                className="admin-inline-form"
                key={inquiry.status}
              >
                <input type="hidden" name="reference" value={inquiry.reference} />
                <select
                  name="status"
                  className="admin-select"
                  defaultValue={inquiry.status}
                  style={{ flex: "1 1 auto" }}
                >
                  {INQUIRY_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
                <button type="submit" className="admin-btn admin-btn--sm">
                  Setzen
                </button>
              </form>
            </div>
          </div>

          <div className="admin-card">
            <p className="admin-card__title">Kontakt</p>
            <div className="admin-card__body">
              <dl className="admin-dl">
                <Row label="Thema">{TOPIC_LABEL[inquiry.topic]}</Row>
                <Row label="E-Mail">
                  <a href={`mailto:${inquiry.email}?subject=Ihre Anfrage ${inquiry.reference}`}>
                    {inquiry.email}
                  </a>
                </Row>
                <Row label="Telefon">
                  {telHref ? <a href={telHref}>{inquiry.phone}</a> : "—"}
                </Row>
                <Row label="Firma">{inquiry.company || "—"}</Row>
                <Row label="Eingang">{fullDate(inquiry.createdAt)}</Row>
                <Row label="Quelle">{inquiry.source}</Row>
              </dl>
            </div>
          </div>

          <div className="admin-card">
            <p className="admin-card__title">Technisch</p>
            <div className="admin-card__body">
              <dl className="admin-dl">
                <Row label="IP-Hash">
                  <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                    {inquiry.ipHash || "—"}
                  </span>
                </Row>
                <Row label="User-Agent">
                  <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                    {inquiry.userAgent || "—"}
                  </span>
                </Row>
              </dl>
            </div>
          </div>

          <div className="admin-card">
            <p className="admin-card__title">Datenschutz</p>
            <div className="admin-card__body">
              <p className="admin-hint" style={{ marginTop: 0, marginBottom: "0.75rem" }}>
                Nach abgeschlossener Bearbeitung löschen (DSGVO-Datenminimierung).
              </p>
              <DeleteInquiryButton reference={inquiry.reference} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
