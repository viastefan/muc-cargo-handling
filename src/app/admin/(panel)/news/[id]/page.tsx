import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { NewsEditor } from "@/components/admin/NewsEditor";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export default async function AdminNewsEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await loadCms();
  const post = data.newsPosts.find((p) => p.id === id);
  if (!post) notFound();

  return (
    <AdminShell title="News bearbeiten">
      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>{post.title}</h2>
        </div>
        <div className="admin-panel__body">
          <NewsEditor initial={post} />
        </div>
      </section>
    </AdminShell>
  );
}
