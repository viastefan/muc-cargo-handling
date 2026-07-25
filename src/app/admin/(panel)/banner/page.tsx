import { AdminShell } from "@/components/admin/AdminShell";
import { BannerEditor } from "@/components/admin/BannerEditor";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export default async function AdminBannerPage() {
  const data = await loadCms();
  return (
    <AdminShell title="Top-Banner">
      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>Kampagnen- / Hinweisbanner</h2>
        </div>
        <div className="admin-panel__body">
          <BannerEditor initial={data.topBanner} />
        </div>
      </section>
    </AdminShell>
  );
}
