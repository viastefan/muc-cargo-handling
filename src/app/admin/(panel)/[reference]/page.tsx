import Link from "next/link";
import { notFound } from "next/navigation";
import {
  INQUIRY_STATUSES,
  STATUS_LABEL,
  TOPIC_LABEL,
  getInquiry,
  listInquiryEvents,
  type InquiryEvent,
} from "@/lib/inquiries";
import { requireAdmin } from "@/lib/admin-session";
import { listUsers } from "@/lib/admin-users";
import { COMPANY } from "@/lib/company";
import { StatusBadge } from "../StatusBadge";
import { DeleteInquiryButton } from "../DeleteInquiryButton";
import { Assignee } from "../Assignee";
import { ReplyForm } from "../ReplyForm";
import { setStatusAction, saveNoteAction, assignInquiryAction } from "../actions";

/** Status, Notiz und Verlauf aendern sich laufend — nie aus dem Cache. */
export const dynamic = "force-dynamic";

function fullDate(iso: string | null) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(new Date(iso));
}

const EVENT_ICON: Record<InquiryEvent["kind"], string> = {
  created: "＋",
  status: "◉",
  assign: "→",
  note: "✎",
  reply: "↩",
};

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
  await requireAdmin();

  const { reference } = await params;
  const [inquiry, events, users] = await Promise.all([
    getInquiry(reference),
    listInquiryEvents(reference),
    listUsers(),
  ]);
  if (!inquiry) notFound();

  const activeUsers = users.filter((u) => u.active);
  const assignedUser = inquiry.assignedTo
    ? users.find((u) => u.id === inquiry.assignedTo)
    : null;
  const telHref = inquiry.phone
    ? `tel:${inquiry.phone.replace(/[^+\d]/g, "")}`
    : null;

  return (
    <>
      <Link href="/admin" className="admin-back">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 3.5 5.5 8 10 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Anfragen
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
            {inquiry.message.trim() ? (
              <p className="admin-message">{inquiry.message}</p>
            ) : (
              <p className="admin-message admin-message--empty">
                Ohne Nachricht abgeschickt — bitte telefonisch oder per E-Mail
                nachfassen.
              </p>
            )}
          </div>

          <div className="admin-card">
            <p className="admin-card__title">Antworten</p>
            <div className="admin-card__body">
              <ReplyForm
                reference={inquiry.reference}
                to={inquiry.email}
                defaultBody={`Sehr geehrte(r) ${inquiry.firstName} ${inquiry.lastName},\n\nvielen Dank für Ihre Anfrage.\n\n\n\nMit freundlichen Grüßen\n${COMPANY.legalName}`}
              />
            </div>
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
          </div>

          <div className="admin-card">
            <p className="admin-card__title">Verlauf</p>
            <div className="admin-card__body">
              {events.length === 0 ? (
                <p className="admin-hint" style={{ margin: 0 }}>
                  Noch keine Aktivität.
                </p>
              ) : (
                <ol className="admin-timeline">
                  {events.map((e) => (
                    <li key={e.id}>
                      <span className="admin-timeline__icon" aria-hidden="true">
                        {EVENT_ICON[e.kind]}
                      </span>
                      <span className="admin-timeline__body">
                        <span className="admin-timeline__detail">
                          {e.detail ?? e.kind}
                        </span>
                        <span className="admin-timeline__meta">
                          {e.actorName} · {fullDate(e.createdAt)}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="admin-card">
            <p className="admin-card__title">Status</p>
            <div className="admin-card__body">
              <form action={setStatusAction} className="admin-inline-form" key={inquiry.status}>
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
            <p className="admin-card__title">Zuständigkeit</p>
            <div className="admin-card__body">
              {assignedUser ? (
                <p style={{ margin: "0 0 0.6rem" }}>
                  <Assignee name={assignedUser.name} />
                </p>
              ) : null}
              <form
                action={assignInquiryAction}
                className="admin-inline-form"
                key={inquiry.assignedTo ?? "none"}
              >
                <input type="hidden" name="reference" value={inquiry.reference} />
                <select
                  name="assignee"
                  className="admin-select"
                  defaultValue={inquiry.assignedTo ?? "none"}
                  style={{ flex: "1 1 auto" }}
                >
                  <option value="none">— niemand —</option>
                  {activeUsers.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
                <button type="submit" className="admin-btn admin-btn--sm">
                  Zuweisen
                </button>
              </form>
              {activeUsers.length === 0 ? (
                <p className="admin-hint" style={{ marginBottom: 0 }}>
                  Noch keine Team-Benutzer angelegt.
                </p>
              ) : null}
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
                {inquiry.handledAt ? (
                  <Row label="Erledigt">{fullDate(inquiry.handledAt)}</Row>
                ) : null}
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
