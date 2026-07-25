import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await loadCms();
  const post = data.newsPosts.find((p) => p.slug === slug && p.status === "published");
  if (!post) return { title: "News" };
  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await loadCms();
  const post = data.newsPosts.find((p) => p.slug === slug && p.status === "published");
  if (!post) notFound();

  return (
    <article className="section-y !pt-16 md:!pt-20">
      <div className="page-container" style={{ maxWidth: "44rem" }}>
        <p style={{ margin: 0 }}>
          <Link href="/news" className="prose-muted">
            ← Alle News
          </Link>
        </p>
        <p
          style={{
            margin: "1.25rem 0 0",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          {post.category}
          {post.publishedAt ? ` · ${new Date(post.publishedAt).toLocaleDateString("de-DE")}` : ""}
        </p>
        <h1 className="heading-display" style={{ marginTop: "0.5rem" }}>
          {post.title}
        </h1>
        {post.excerpt ? (
          <p className="prose-muted" style={{ marginTop: "0.85rem", fontSize: "1.05rem" }}>
            {post.excerpt}
          </p>
        ) : null}
        <div
          style={{
            marginTop: "1.75rem",
            whiteSpace: "pre-wrap",
            lineHeight: 1.65,
            fontSize: "1rem",
          }}
        >
          {post.body}
        </div>
      </div>
    </article>
  );
}
