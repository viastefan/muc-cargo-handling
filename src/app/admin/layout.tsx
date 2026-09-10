import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

// Immer frisch rendern — nie statisch cachen.
export const dynamic = "force-dynamic";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-root">{children}</div>;
}
