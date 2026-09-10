import Link from "next/link";
import {
  INQUIRY_STATUSES,
  STATUS_LABEL,
  TOPIC_LABEL,
  inquiryStats,
  listInquiries,
  type InquiryStatus,
  type InquiryTopic,
} from "@/lib/inquiries";
import { hasAdminSession } from "@/lib/admin-session";
import { InquiryRow } from "./InquiryRow";
import { StatusBadge } from "./StatusBadge";

const PAGE_SIZE = 40;
const TOPICS = Object.keys(TOPIC_LABEL) as InquiryTopic[];

function dateFmt(iso: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

type SP = {
  status?: string;
  topic?: string;
  q?: string;
  page?: string;
};

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  // Das Layout leitet Unangemeldete um; hier zusätzlich, damit bei einem
  // (parallel gerenderten) Fremdzugriff keine DB-Abfragen anlaufen.
  if (!(await hasAdminSession())) return null;

  const sp = await searchParams;
  const status = (INQUIRY_STATUSES as string[]).includes(sp.status ?? "")
    ? (sp.status as InquiryStatus)
    : "all";
  const topic = (TOPICS as string[]).includes(sp.topic ?? "")
    ? (sp.topic as InquiryTopic)
    : "all";
  const search = (sp.q ?? "").slice(0, 80);
  const page = Math.max(1, Number(sp.page) || 1);

  const [stats, list] = await Promise.all([
    inquiryStats(),
    listInquiries({
      status,
      topic,
      search,
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    }),
  ]);
  const { rows, total, error: listError } = list;

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));


  const statCards = [
    { label: "Gesamt", value: stats.total },
    { label: STATUS_LABEL.new, value: stats.new },
    { label: STATUS_LABEL.in_progress, value: stats.inProgress },
    { label: STATUS_LABEL.done, value: stats.done },
    { label: "Letzte 7 Tage", value: stats.last7Days },
  ];

  const buildQuery = (next: Partial<SP>) => {
    const params = new URLSearchParams();
    const merged = { status, topic, q: search, ...next } as Record<string, string>;
    for (const [k, v] of Object.entries(merged)) {
      if (v && v !== "all") params.set(k, v);
    }
    const qs = params.toString();
    return qs ? `/admin?${qs}` : "/admin";
  };

  return (
    <>
      {listError ? (
        <p className="admin-error" style={{ marginBottom: "1.5rem" }}>
          Speicher verbunden, aber Zugriff fehlgeschlagen. Wahrscheinlich fehlt
          die Tabelle — Migration <code>supabase/migrations/0001_inquiries.sql</code>{" "}
          im Supabase-SQL-Editor ausführen.
        </p>
      ) : null}

      <div className="admin-stats">
        {statCards.map((card) => (
          <div key={card.label} className="admin-stat">
            <div className="admin-stat__value">{card.value}</div>
            <div className="admin-stat__label">{card.label}</div>
          </div>
        ))}
      </div>

      <form className="admin-filters" method="get">
        <div className="admin-filters__group">
          <label className="admin-label" htmlFor="f-status">
            Status
          </label>
          <select
            id="f-status"
            name="status"
            defaultValue={status}
            className="admin-select"
          >
            <option value="all">Alle</option>
            {INQUIRY_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-filters__group">
          <label className="admin-label" htmlFor="f-topic">
            Thema
          </label>
          <select
            id="f-topic"
            name="topic"
            defaultValue={topic}
            className="admin-select"
          >
            <option value="all">Alle</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {TOPIC_LABEL[t]}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-filters__group admin-filters__group--grow">
          <label className="admin-label" htmlFor="f-q">
            Suche
          </label>
          <input
            id="f-q"
            name="q"
            defaultValue={search}
            className="admin-input"
            placeholder="Name, Firma, E-Mail, Referenz, Text"
          />
        </div>
        <button type="submit" className="admin-btn">
          Filtern
        </button>
        {(status !== "all" || topic !== "all" || search) && (
          <Link href="/admin" className="admin-btn admin-btn--sm">
            Zurücksetzen
          </Link>
        )}
      </form>

      <div className="admin-table-wrap">
        {rows.length === 0 ? (
          <p className="admin-empty">Keine Anfragen für diese Auswahl.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Referenz</th>
                <th>Eingang</th>
                <th>Thema</th>
                <th>Absender</th>
                <th>Nachricht</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <InquiryRow key={row.id} reference={row.reference}>
                  <td style={{ fontWeight: 600, color: "var(--brand-text)" }}>
                    {row.reference}
                  </td>
                  <td>{dateFmt(row.createdAt)}</td>
                  <td>{TOPIC_LABEL[row.topic]}</td>
                  <td>
                    <div style={{ fontWeight: 500 }}>
                      {row.firstName} {row.lastName}
                    </div>
                    <div style={{ color: "var(--muted)", fontSize: "12.5px" }}>
                      {row.company || row.email}
                    </div>
                  </td>
                  <td>
                    <div className="admin-table__msg">{row.message}</div>
                  </td>
                  <td>
                    <StatusBadge status={row.status} />
                  </td>
                </InquiryRow>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {pages > 1 ? (
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginTop: "1rem",
            alignItems: "center",
          }}
        >
          {page > 1 ? (
            <Link
              href={buildQuery({ page: String(page - 1) })}
              className="admin-btn admin-btn--sm"
            >
              Zurück
            </Link>
          ) : null}
          <span style={{ fontSize: "13px", color: "var(--muted)" }}>
            Seite {page} / {pages} · {total} Anfragen
          </span>
          {page < pages ? (
            <Link
              href={buildQuery({ page: String(page + 1) })}
              className="admin-btn admin-btn--sm"
            >
              Weiter
            </Link>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
