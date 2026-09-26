import { redirect } from "next/navigation";
import { adminConfigured } from "@/lib/admin-auth";
import { hasAdminSession } from "@/lib/admin-session";
import { LoginForm } from "./LoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ config?: string }>;
}) {
  if (adminConfigured && (await hasAdminSession())) redirect("/admin");
  const { config } = await searchParams;

  return (
    <div className="admin-login">
      <div className="admin-login__hero">
        <p className="admin-login__eyebrow">MUC Cargohandling</p>
        <h1 className="admin-login__title">Anfragen</h1>
        <p className="admin-login__hint">Mit Ihren Zugangsdaten anmelden.</p>
      </div>
      <div className="admin-login__card">
        <LoginForm configError={config === "1" || !adminConfigured} />
      </div>
      <p className="admin-login__foot">Interner Bereich · Zugriff protokolliert</p>
    </div>
  );
}
