"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { deleteNewsAction, setNewsStatusAction } from "@/lib/cms/actions";
import type { NewsPost } from "@/lib/cms/types";
import { AdminIcon } from "@/components/admin/AdminIcon";
import { ConfirmDeleteButton } from "@/components/admin/AdminWidgets";
import { useRouter } from "next/navigation";

export function NewsListClient({ posts }: { posts: NewsPost[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "draft" | "published">("all");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.category).filter(Boolean))).sort(),
    [posts],
  );

  const filtered = posts.filter((p) => {
    if (status !== "all" && p.status !== status) return false;
    if (category !== "all" && p.category !== category) return false;
    if (!q.trim()) return true;
    const hay = `${p.title} ${p.excerpt} ${p.slug}`.toLowerCase();
    return hay.includes(q.trim().toLowerCase());
  });

  return (
    <>
      <div className="admin-grid cols-3" style={{ marginBottom: "1rem" }}>
        <div className="admin-field" style={{ marginBottom: 0 }}>
          <label htmlFor="news-q">Suche</label>
          <input id="news-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Titel, Slug…" />
        </div>
        <div className="admin-field" style={{ marginBottom: 0 }}>
          <label htmlFor="news-status">Status</label>
          <select id="news-status" value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
            <option value="all">Alle</option>
            <option value="draft">Entwurf</option>
            <option value="published">Veröffentlicht</option>
          </select>
        </div>
        <div className="admin-field" style={{ marginBottom: 0 }}>
          <label htmlFor="news-cat">Kategorie</label>
          <select id="news-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">Alle</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>
            <AdminIcon name="news" size={16} />
            {filtered.length} Einträge
          </h2>
          <Link href="/admin/news/new" className="admin-btn admin-btn--brand">
            <AdminIcon name="plus" size={15} />
            Neue News
          </Link>
        </div>
        <div className="admin-panel__body">
          {filtered.length === 0 ? (
            <div className="admin-empty">
              <span className="admin-empty__icon">
                <AdminIcon name="search" size={20} />
              </span>
              <p>Keine News gefunden.</p>
              <Link href="/admin/news/new" className="admin-btn admin-btn--brand">
                <AdminIcon name="plus" size={15} />
                Erste News anlegen
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Titel</th>
                    <th>Status</th>
                    <th>Kategorie</th>
                    <th>Aktualisiert</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((post) => (
                    <tr key={post.id}>
                      <td>
                        <strong>{post.title}</strong>
                        <div className="admin-muted admin-mono">/{post.slug}</div>
                        {post.featured ? <span className="admin-badge">Featured</span> : null}
                      </td>
                      <td>
                        <span className={`admin-badge admin-badge--${post.status === "published" ? "ok" : "warn"}`}>
                          {post.status === "published" ? "Live" : "Draft"}
                        </span>
                      </td>
                      <td>{post.category}</td>
                      <td className="admin-muted">{new Date(post.updatedAt).toLocaleString("de-DE")}</td>
                      <td>
                        <div className="admin-btn-row">
                          <Link href={`/admin/news/${post.id}`} className="admin-btn admin-btn--ghost">
                            <AdminIcon name="edit" size={14} />
                            Bearbeiten
                          </Link>
                          <button
                            type="button"
                            className="admin-btn admin-btn--soft"
                            onClick={async () => {
                              await setNewsStatusAction(
                                post.id,
                                post.status === "published" ? "draft" : "published",
                              );
                              router.refresh();
                            }}
                          >
                            <AdminIcon name={post.status === "published" ? "ops" : "check"} size={14} />
                            {post.status === "published" ? "Unpublish" : "Publish"}
                          </button>
                          <ConfirmDeleteButton
                            onConfirm={async () => {
                              await deleteNewsAction(post.id);
                              router.refresh();
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
