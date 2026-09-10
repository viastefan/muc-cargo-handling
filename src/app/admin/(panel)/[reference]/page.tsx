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
import { setStatusAction, saveNoteAction } from "../actions";

function fullDate(iso: string | null) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(new Date(iso));
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
        ← Alle Anfragen
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1.25rem",
          flexWrap: "wrap",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>
          {inquiry.firstName} {inquiry.lastName}
        </h1>
        <StatusBadge status={inquiry.status} />
        <span style={{ color: "var(--muted)", fontSize: "13px" }}>
          {inquiry.reference}
        </span>
      </div>

      <div className="admin-detail">
        <div>
          <div className="admin-card">
            <p className="admin-card__title">Nachricht</p>
            <p className="admin-message">{inquiry.message}</p>
          </div>

          <div className="admin-card">
            <p className="admin-card__title">Interne Notiz</p>
            <form action={saveNoteAction}>
              <input type="hidden" name="reference" value={inquiry.reference} />
              <textarea
                name="note"
                className="admin-textarea"
                defaultValue={inquiry.adminNote ?? ""}
                placeholder="Nur intern sichtbar — Gesprächsnotizen, nächste Schritte…"
              />
              <div style={{ marginTop: "0.6rem" }}>
                <button type="submit" className="admin-btn admin-btn--sm">
                  Notiz speichern
                </button>
              </div>
            </form>
            {inquiry.handledAt ? (
              <p className="admin-note-meta">
                Erledigt/archiviert am {fullDate(inquiry.handledAt)}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <div className="admin-card">
            <p className="admin-card__title">Status</p>
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
              <button type="submit" className="admin-btn">
                Setzen
              </button>
            </form>
          </div>

          <div className="admin-card">
            <p className="admin-card__title">Kontakt</p>
            <dl className="admin-dl">
              <dt>Thema</dt>
              <dd>{TOPIC_LABEL[inquiry.topic]}</dd>
              <dt>E-Mail</dt>
              <dd>
                <a href={`mailto:${inquiry.email}?subject=Ihre Anfrage ${inquiry.reference}`}>
                  {inquiry.email}
                </a>
              </dd>
              <dt>Telefon</dt>
              <dd>{telHref ? <a href={telHref}>{inquiry.phone}</a> : "—"}</dd>
              <dt>Firma</dt>
              <dd>{inquiry.company || "—"}</dd>
              <dt>Eingang</dt>
              <dd>{fullDate(inquiry.createdAt)}</dd>
              <dt>Quelle</dt>
              <dd>{inquiry.source}</dd>
            </dl>
          </div>

          <div className="admin-card">
            <p className="admin-card__title">Technisch</p>
            <dl className="admin-dl">
              <dt>IP-Hash</dt>
              <dd style={{ fontSize: "12px", color: "var(--muted)" }}>
                {inquiry.ipHash || "—"}
              </dd>
              <dt>User-Agent</dt>
              <dd style={{ fontSize: "12px", color: "var(--muted)" }}>
                {inquiry.userAgent || "—"}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
