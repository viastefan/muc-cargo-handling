import { AdminShell } from "@/components/admin/AdminShell";
import { InquiriesClient } from "@/components/admin/InquiriesClient";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const data = await loadCms();
  return (
    <AdminShell title="Anfragen-Inbox">
      <InquiriesClient items={data.inquiries} />
    </AdminShell>
  );
}
