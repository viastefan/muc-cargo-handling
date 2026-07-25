import { redirect } from "next/navigation";
import { AdminIcon } from "@/components/admin/AdminIcon";
import { isAdminAuthenticated } from "@/lib/cms/session.server";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="admin-root">
      <div className="admin-login">
        <div className="admin-login__card">
          <span className="admin-login__icon" aria-hidden="true">
            <AdminIcon name="lock" size={20} />
          </span>
          <p className="admin-login__eyebrow">MUC Cargo Atelier</p>
          <h1 className="admin-login__title">Admin-Login</h1>
          <p className="admin-login__text">
            Geschützter Bereich für Inhalte, Status und Anfragen. Nur für autorisierte Nutzer.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
