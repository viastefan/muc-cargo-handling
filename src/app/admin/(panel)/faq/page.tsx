import { AdminShell } from "@/components/admin/AdminShell";
import { FaqEditor } from "@/components/admin/FaqEditor";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  const data = await loadCms();
  return (
    <AdminShell title="FAQ">
      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>FAQ-Einträge</h2>
        </div>
        <div className="admin-panel__body">
          {data.faqs.length === 0 ? (
            <div className="admin-empty" style={{ marginBottom: "1rem" }}>
              <p>Noch keine FAQ — erste anlegen.</p>
            </div>
          ) : null}
          <FaqEditor initial={data.faqs} />
        </div>
      </section>
    </AdminShell>
  );
}
