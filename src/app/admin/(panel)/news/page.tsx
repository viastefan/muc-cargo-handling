import { AdminShell } from "@/components/admin/AdminShell";
import { NewsListClient } from "@/components/admin/NewsListClient";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const data = await loadCms();
  return (
    <AdminShell title="News / Blog">
      <NewsListClient posts={data.newsPosts} />
    </AdminShell>
  );
}
