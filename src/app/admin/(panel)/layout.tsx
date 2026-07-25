import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/cms/session.server";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
  return children;
}
