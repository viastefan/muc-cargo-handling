import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const data = await loadCms();
  const openInquiries = data.inquiries.filter((i) => i.status !== "erledigt").length;
  const latestNews = [...data.newsPosts]
    .sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""))
    .slice(0, 4);
  const persistLabel = `${data.meta.backend}${data.meta.lastWriteAt ? ` · ${new Date(data.meta.lastWriteAt).toLocaleString("de-DE")}` : ""}`;

  return (
    <AdminShell title="Dashboard" persistLabel={persistLabel}>
      <div className="admin-grid cols-4" style={{ marginBottom: "1rem" }}>
        <div className="admin-card">
          <p className="admin-card__label">Offene Anfragen</p>
          <p className="admin-card__value">{openInquiries}</p>
          <p className="admin-card__meta">Neu / In Arbeit</p>
        </div>
        <div className="admin-card">
          <p className="admin-card__label">News</p>
          <p className="admin-card__value">{data.newsPosts.length}</p>
          <p className="admin-card__meta">
            {data.newsPosts.filter((n) => n.status === "published").length} veröffentlicht
          </p>
        </div>
        <div className="admin-card">
          <p className="admin-card__label">Ops-Status</p>
          <p className="admin-card__value" style={{ fontSize: "1.15rem" }}>
            {data.opsStatus.title}
          </p>
          <p className="admin-card__meta">
            {data.opsStatus.publicVisible ? "Öffentlich sichtbar" : "Nur intern"}
          </p>
        </div>
        <div className="admin-card">
          <p className="admin-card__label">Persistenz</p>
          <p className="admin-card__value" style={{ fontSize: "1.15rem" }}>
            {data.meta.ok ? "OK" : "Hinweis"}
          </p>
          <p className="admin-card__meta">{data.meta.detail}</p>
        </div>
      </div>

      <div className="admin-btn-row" style={{ marginBottom: "1rem" }}>
        <Link href="/admin/news/new" className="admin-btn admin-btn--brand">
          Neue News
        </Link>
        <Link href="/admin/ops" className="admin-btn admin-btn--soft">
          Status ändern
        </Link>
        <Link href="/admin/inquiries" className="admin-btn admin-btn--soft">
          Anfragen öffnen
        </Link>
      </div>

      <div className="admin-grid cols-2">
        <section className="admin-panel">
          <div className="admin-panel__head">
            <h2>Letzte News</h2>
            <Link href="/admin/news" className="admin-btn admin-btn--ghost">
              Alle
            </Link>
          </div>
          <div className="admin-panel__body">
            {latestNews.length === 0 ? (
              <div className="admin-empty">
                <p>Noch keine News — erste anlegen.</p>
                <Link href="/admin/news/new" className="admin-btn admin-btn--brand">
                  News anlegen
                </Link>
              </div>
            ) : (
              latestNews.map((post) => (
                <div key={post.id} className="admin-list-item">
                  <div>
                    <strong>{post.title}</strong>
                    <p className="admin-muted" style={{ margin: "0.25rem 0 0", fontSize: "0.8125rem" }}>
                      {post.status === "published" ? "Veröffentlicht" : "Entwurf"} · {post.category}
                    </p>
                  </div>
                  <Link href={`/admin/news/${post.id}`} className="admin-btn admin-btn--ghost">
                    Bearbeiten
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel__head">
            <h2>Aktueller Ops-Status</h2>
            <Link href="/admin/ops" className="admin-btn admin-btn--ghost">
              Bearbeiten
            </Link>
          </div>
          <div className="admin-panel__body">
            <p style={{ margin: 0 }}>
              <span className={`admin-badge admin-badge--${data.opsStatus.level === "normal" ? "ok" : "warn"}`}>
                {data.opsStatus.level}
              </span>
            </p>
            <p style={{ margin: "0.75rem 0 0.35rem", fontWeight: 560 }}>{data.opsStatus.title}</p>
            <p className="admin-muted" style={{ margin: 0, lineHeight: 1.5 }}>
              {data.opsStatus.message}
            </p>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
