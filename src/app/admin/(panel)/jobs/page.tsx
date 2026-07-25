import { AdminShell } from "@/components/admin/AdminShell";
import { JobsEditor } from "@/components/admin/JobsEditor";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export default async function AdminJobsPage() {
  const data = await loadCms();
  return (
    <AdminShell title="Jobs">
      <JobsEditor initial={data.jobs} />
    </AdminShell>
  );
}
