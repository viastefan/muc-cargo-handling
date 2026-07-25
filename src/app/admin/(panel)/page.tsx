import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminIcon } from "@/components/admin/AdminIcon";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const data = await loadCms();
  const openInquiries = data.inquiries.filter((i) => i.status !== "erledigt").length;
  const publishedNews = data.newsPosts.filter((n) => n.status === "published").length;
  const latestNews = [...data.newsPosts]
    .sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""))
    .slice(0, 4);
  const persistLabel = `${data.meta.backend}${data.meta.lastWriteAt ? ` · ${new Date(data.meta.lastWriteAt).toLocaleString("de-DE")}` : ""}`;

  return (
    <AdminShell title="Dashboard" persistLabel={persistLabel}>
      <div className="admin-grid cols-4" style={{ marginBottom: "1rem" }}>
        <Link href="/admin/inquiries" className="admin-card admin-card--link">
          <span className="admin-card__icon admin-card__icon--brand">
            <AdminIcon name="inbox" size={18} />
          </span>
          <p className="admin-card__label">Offene Anfragen</p>
          <p className="admin-card__value">{openInquiries}</p>
          <p className="admin-card__meta">Neu / In Arbeit</p>
        </Link>
        <Link href="/admin/news" className="admin-card admin-card--link">
          <span className="admin-card__icon">
            <AdminIcon name="news" size={18} />
          </span>
          <p className="admin-card__label">News</p>
          <p className="admin-card__value">{data.newsPosts.length}</p>
          <p className="admin-card__meta">{publishedNews} veröffentlicht</p>
        </Link>
        <Link href="/admin/ops" className="admin-card admin-card--link">
          <span className="admin-card__icon admin-card__icon--ok">
            <AdminIcon name="ops" size={18} />
          </span>
          <p className="admin-card__label">Ops-Status</p>
          <p className="admin-card__value admin-card__value--sm">{data.opsStatus.title}</p>
          <p className="admin-card__meta">
            {data.opsStatus.publicVisible ? "Öffentlich sichtbar" : "Nur intern"}
          </p>
        </Link>
        <div className="admin-card">
          <span className={`admin-card__icon${data.meta.ok ? " admin-card__icon--ok" : " admin-card__icon--warn"}`}>
            <AdminIcon name="persist" size={18} />
          </span>
          <p className="admin-card__label">Persistenz</p>
          <p className="admin-card__value admin-card__value--sm">{data.meta.ok ? "OK" : "Hinweis"}</p>
          <p className="admin-card__meta">{data.meta.detail}</p>
        </div>
      </div>

      <div className="admin-btn-row" style={{ marginBottom: "1rem" }}>
        <Link href="/admin/news/new" className="admin-btn admin-btn--brand">
          <AdminIcon name="plus" size={15} />
          Neue News
        </Link>
        <Link href="/admin/ops" className="admin-btn admin-btn--soft">
          <AdminIcon name="ops" size={15} />
          Status ändern
        </Link>
        <Link href="/admin/inquiries" className="admin-btn admin-btn--soft">
          <AdminIcon name="inbox" size={15} />
          Anfragen öffnen
        </Link>
      </div>

      <div className="admin-grid cols-2">
        <section className="admin-panel">
          <div className="admin-panel__head">
            <h2>
              <AdminIcon name="news" size={16} />
              Letzte News
            </h2>
            <Link href="/admin/news" className="admin-btn admin-btn--ghost">
              Alle
            </Link>
          </div>
          <div className="admin-panel__body">
            {latestNews.length === 0 ? (
              <div className="admin-empty">
                <span className="admin-empty__icon">
                  <AdminIcon name="news" size={22} />
                </span>
                <p>Noch keine News — erste anlegen.</p>
                <Link href="/admin/news/new" className="admin-btn admin-btn--brand">
                  <AdminIcon name="plus" size={15} />
                  News anlegen
                </Link>
              </div>
            ) : (
              latestNews.map((post) => (
                <div key={post.id} className="admin-list-item">
                  <div className="admin-list-item__main">
                    <span className="admin-list-item__icon">
                      <AdminIcon name="news" size={15} />
                    </span>
                    <div>
                      <strong>{post.title}</strong>
                      <p className="admin-muted" style={{ margin: "0.25rem 0 0", fontSize: "0.8125rem" }}>
                        {post.status === "published" ? "Veröffentlicht" : "Entwurf"} · {post.category}
                      </p>
                    </div>
                  </div>
                  <Link href={`/admin/news/${post.id}`} className="admin-btn admin-btn--ghost">
                    <AdminIcon name="edit" size={14} />
                    Bearbeiten
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel__head">
            <h2>
              <AdminIcon name="ops" size={16} />
              Aktueller Ops-Status
            </h2>
            <Link href="/admin/ops" className="admin-btn admin-btn--ghost">
              <AdminIcon name="edit" size={14} />
              Bearbeiten
            </Link>
          </div>
          <div className="admin-panel__body">
            <p style={{ margin: 0 }}>
              <span className={`admin-badge admin-badge--${data.opsStatus.level === "normal" ? "ok" : "warn"}`}>
                <AdminIcon name="ops" size={12} />
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
