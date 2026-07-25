import type { Metadata } from "next";
import Link from "next/link";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News",
  description: "Aktuelle Hinweise und Meldungen von MUC Cargo Handling.",
};

export default async function NewsIndexPage() {
  const data = await loadCms();
  const posts = data.newsPosts
    .filter((p) => p.status === "published")
    .sort((a, b) => (b.publishedAt || b.updatedAt).localeCompare(a.publishedAt || a.updatedAt));

  return (
    <section className="section-y !pt-16 md:!pt-20">
      <div className="page-container" style={{ maxWidth: "48rem" }}>
        <p className="section-eyebrow">News</p>
        <h1 className="heading-display" style={{ marginTop: "0.5rem" }}>
          Aktuelles
        </h1>
        <p className="prose-muted" style={{ marginTop: "0.75rem" }}>
          Veröffentlichte Meldungen aus dem Admin-CMS.
        </p>

        <div style={{ marginTop: "2rem" }}>
          {posts.length === 0 ? (
            <p className="prose-muted">Derzeit keine veröffentlichten Beiträge.</p>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {posts.map((post) => (
                <li
                  key={post.id}
                  style={{
                    padding: "1.25rem 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>
                    {post.category}
                    {post.publishedAt ? ` · ${new Date(post.publishedAt).toLocaleDateString("de-DE")}` : ""}
                  </p>
                  <h2 style={{ margin: "0.35rem 0", fontSize: "1.25rem", fontWeight: 500 }}>
                    <Link href={`/news/${post.slug}`}>{post.title}</Link>
                  </h2>
                  {post.excerpt ? <p className="prose-muted" style={{ margin: 0 }}>{post.excerpt}</p> : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
