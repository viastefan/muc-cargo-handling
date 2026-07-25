import { AdminShell } from "@/components/admin/AdminShell";
import { SettingsClient } from "@/components/admin/SettingsClient";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const data = await loadCms();
  return (
    <AdminShell title="Einstellungen">
      <SettingsClient notificationEmail={data.auth.notificationEmail} meta={data.meta} />
    </AdminShell>
  );
}
