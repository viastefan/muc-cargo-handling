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
import { requireAdmin } from "@/lib/admin-session";
import { listUsers } from "@/lib/admin-users";
import { InquiryRow } from "./InquiryRow";
import { StatusBadge } from "./StatusBadge";
import { Assignee } from "./Assignee";
import { PushToggle } from "./PushToggle";

/**
 * Nie aus dem Cache bedienen: Anfragen treffen von aussen ein, ohne dass in
 * dieser Sitzung etwas revalidiert wird. Eine zwischengespeicherte Liste wuerde
 * nach einer Push-Meldung eine leere Uebersicht zeigen.
 */
export const dynamic = "force-dynamic";

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

type SP = { status?: string; topic?: string; q?: string; page?: string; mine?: string };

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const principal = await requireAdmin();

  const sp = await searchParams;
  const status = (INQUIRY_STATUSES as string[]).includes(sp.status ?? "")
    ? (sp.status as InquiryStatus)
    : "all";
  const topic = (TOPICS as string[]).includes(sp.topic ?? "")
    ? (sp.topic as InquiryTopic)
    : "all";
  const search = (sp.q ?? "").slice(0, 80);
  const page = Math.max(1, Number(sp.page) || 1);
  const mine = sp.mine === "1" && !principal.isRoot;

  const [stats, list, users] = await Promise.all([
    inquiryStats(),
    listInquiries({
      status,
      topic,
      search,
      assignedTo: mine ? principal.uid : undefined,
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    }),
    listUsers(),
  ]);
  const { rows, total, error: listError } = list;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const vapidPublicKey = process.env.VAPID_PUBLIC_KEY?.trim() ?? "";
  const userMap = new Map(users.map((u) => [u.id, u]));

  const widgets = [
    { label: "Gesamt", value: stats.total },
    { label: STATUS_LABEL.new, value: stats.new, accent: true },
    { label: STATUS_LABEL.in_progress, value: stats.inProgress },
    { label: STATUS_LABEL.done, value: stats.done },
    { label: "Letzte 7 Tage", value: stats.last7Days },
  ];

  const statusCounts: Record<string, number> = {
    all: stats.total,
    new: stats.new,
    in_progress: stats.inProgress,
    done: stats.done,
    archived: stats.archived,
  };

  const query = (next: Partial<SP>) => {
    const params = new URLSearchParams();
    const merged = {
      status,
      topic,
      q: search,
      mine: mine ? "1" : "",
      ...next,
    } as Record<string, string>;
    for (const [k, v] of Object.entries(merged)) {
      if (v && v !== "all") params.set(k, v);
    }
    const qs = params.toString();
    return qs ? `/admin?${qs}` : "/admin";
  };

  return (
    <>
      <h1 className="admin-page-title">Anfragen</h1>

      <div className="admin-widgets">
        {widgets.map((w) => (
          <div
            key={w.label}
            className={`admin-widget${w.accent ? " admin-widget--accent" : ""}`}
          >
            <div className="admin-widget__value">{w.value}</div>
            <div className="admin-widget__label">{w.label}</div>
          </div>
        ))}
      </div>

      {vapidPublicKey ? <PushToggle vapidPublicKey={vapidPublicKey} /> : null}

      <div className="admin-segmented">
        {(["all", ...INQUIRY_STATUSES] as const).map((s) => (
          <Link
            key={s}
            href={query({ status: s, page: undefined })}
            data-active={status === s}
          >
            {s === "all" ? "Alle" : STATUS_LABEL[s]}
            <span className="admin-seg-count">{statusCounts[s] ?? 0}</span>
          </Link>
        ))}
      </div>

      <form className="admin-filters" method="get">
        {status !== "all" ? <input type="hidden" name="status" value={status} /> : null}
        {mine ? <input type="hidden" name="mine" value="1" /> : null}
        {!principal.isRoot ? (
          <Link
            href={query({ mine: mine ? "" : "1", page: undefined })}
            className={`admin-btn admin-btn--sm${mine ? "" : " admin-btn--plain"}`}
          >
            Mir zugewiesen
          </Link>
        ) : null}
        <select name="topic" defaultValue={topic} className="admin-select" aria-label="Thema">
          <option value="all">Alle Themen</option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {TOPIC_LABEL[t]}
            </option>
          ))}
        </select>
        <input
          name="q"
          defaultValue={search}
          className="admin-input"
          placeholder="Name, Firma, E-Mail, Referenz, Text …"
          aria-label="Suche"
        />
        <button type="submit" className="admin-btn admin-btn--sm">
          Suchen
        </button>
        {(topic !== "all" || search) && (
          <Link href={query({ topic: "all", q: "" })} className="admin-btn admin-btn--plain admin-btn--sm">
            Zurücksetzen
          </Link>
        )}
      </form>

      {listError ? (
        <p className="admin-error">
          Speicher verbunden, aber Zugriff fehlgeschlagen — wahrscheinlich fehlt
          eine Tabelle. Migrationen <code>0001_inquiries.sql</code> und{" "}
          <code>0002_admin_users.sql</code> im Supabase-SQL-Editor ausführen.
        </p>
      ) : null}

      <div className="admin-group">
        {rows.length === 0 ? (
          <p className="admin-empty">Keine Anfragen für diese Auswahl.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Referenz</th>
                  <th>Eingang</th>
                  <th>Thema</th>
                  <th>Absender</th>
                  <th>Zugewiesen</th>
                  <th>Status</th>
                  <th aria-hidden="true" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const u = row.assignedTo ? userMap.get(row.assignedTo) : null;
                  return (
                    <InquiryRow key={row.id} reference={row.reference}>
                      <td className="admin-table__ref">{row.reference}</td>
                      <td style={{ whiteSpace: "nowrap", color: "var(--muted)" }}>
                        {dateFmt(row.createdAt)}
                      </td>
                      <td>{TOPIC_LABEL[row.topic]}</td>
                      <td>
                        <div style={{ fontWeight: 550 }}>
                          {row.firstName} {row.lastName}
                        </div>
                        <div style={{ color: "var(--muted)", fontSize: "12.5px" }}>
                          {row.company || row.email}
                        </div>
                      </td>
                      <td>
                        {u ? (
                          <Assignee name={u.name} />
                        ) : (
                          <span style={{ color: "var(--muted-light)" }}>—</span>
                        )}
                      </td>
                      <td>
                        <StatusBadge status={row.status} />
                      </td>
                      <td>
                        <svg
                          className="admin-table__chev"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M6 3.5 10.5 8 6 12.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </td>
                    </InquiryRow>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pages > 1 ? (
        <div
          style={{
            display: "flex",
            gap: "0.6rem",
            marginTop: "1rem",
            alignItems: "center",
          }}
        >
          {page > 1 ? (
            <Link href={query({ page: String(page - 1) })} className="admin-btn admin-btn--sm">
              Zurück
            </Link>
          ) : null}
          <span style={{ fontSize: "13px", color: "var(--muted)" }}>
            Seite {page} / {pages} · {total} Anfragen
          </span>
          {page < pages ? (
            <Link href={query({ page: String(page + 1) })} className="admin-btn admin-btn--sm">
              Weiter
            </Link>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
