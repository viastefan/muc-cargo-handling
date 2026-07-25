"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteNewsAction, setNewsStatusAction, upsertNewsAction } from "@/lib/cms/actions";
import type { NewsPost } from "@/lib/cms/types";
import { ConfirmDeleteButton, SaveBar } from "@/components/admin/AdminWidgets";

function emptyPost(): Omit<NewsPost, "id" | "createdAt" | "updatedAt" | "publishedAt" | "sortOrder"> & {
  id?: string;
} {
  return {
    title: "",
    slug: "",
    excerpt: "",
    body: "",
    coverUrl: "",
    category: "Allgemein",
    status: "draft",
    featured: false,
  };
}

export function NewsEditor({ initial }: { initial?: NewsPost }) {
  const router = useRouter();
  const [post, setPost] = useState(() => initial ?? emptyPost());
  const previewPath = useMemo(() => (post.slug ? `/news/${post.slug}` : "#"), [post.slug]);

  const set = <K extends keyof typeof post>(key: K, value: (typeof post)[K]) =>
    setPost((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <div className="admin-grid cols-2">
        <div className="admin-field">
          <label htmlFor="title">Titel</label>
          <input id="title" value={post.title} onChange={(e) => set("title", e.target.value)} required />
        </div>
        <div className="admin-field">
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            value={post.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="auto aus Titel beim Speichern"
          />
          <span className="hint">Leer lassen für Auto-Slug</span>
        </div>
        <div className="admin-field">
          <label htmlFor="category">Kategorie</label>
          <input id="category" value={post.category} onChange={(e) => set("category", e.target.value)} />
        </div>
        <div className="admin-field">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={post.status}
            onChange={(e) => set("status", e.target.value as NewsPost["status"])}
          >
            <option value="draft">Entwurf</option>
            <option value="published">Veröffentlicht</option>
          </select>
        </div>
        <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="coverUrl">Cover-Bild URL</label>
          <input id="coverUrl" value={post.coverUrl} onChange={(e) => set("coverUrl", e.target.value)} />
        </div>
        <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="excerpt">Teaser</label>
          <textarea id="excerpt" value={post.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
        </div>
        <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="body">Inhalt</label>
          <textarea id="body" value={post.body} onChange={(e) => set("body", e.target.value)} style={{ minHeight: "14rem" }} />
        </div>
        <label className="admin-check">
          <input
            type="checkbox"
            checked={Boolean(post.featured)}
            onChange={(e) => set("featured", e.target.checked)}
          />
          Featured on Home
        </label>
      </div>

      <div className="admin-btn-row" style={{ marginTop: "0.5rem" }}>
        <a href={previewPath} className="admin-btn admin-btn--ghost" target="_blank" rel="noreferrer">
          Vorschau
        </a>
        {initial?.id ? (
          <>
            <button
              type="button"
              className="admin-btn admin-btn--soft"
              onClick={async () => {
                await setNewsStatusAction(initial.id, post.status === "published" ? "draft" : "published");
                router.refresh();
              }}
            >
              {post.status === "published" ? "Unpublish" : "Publish Now"}
            </button>
            <ConfirmDeleteButton
              onConfirm={async () => {
                await deleteNewsAction(initial.id);
                router.push("/admin/news");
                router.refresh();
              }}
            />
          </>
        ) : null}
      </div>

      <SaveBar
        label="News speichern"
        onSave={async () => {
          if (!post.title.trim()) return { ok: false, error: "Titel ist erforderlich." };
          const result = await upsertNewsAction({
            id: "id" in post ? post.id : undefined,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            body: post.body,
            coverUrl: post.coverUrl,
            category: post.category,
            status: post.status,
            featured: post.featured,
          });
          if (result.ok && result.id && !initial?.id) {
            router.replace(`/admin/news/${result.id}`);
          }
          router.refresh();
          return result;
        }}
      />
    </>
  );
}
