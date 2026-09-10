import { hasAdminSession } from "@/lib/admin-session";
import { listInquiries, TOPIC_LABEL, STATUS_LABEL } from "@/lib/inquiries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvCell(value: unknown): string {
  const str = value == null ? "" : String(value);
  return `"${str.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
}

export async function GET() {
  if (!(await hasAdminSession())) {
    return new Response("Nicht autorisiert", { status: 401 });
  }

  const { rows } = await listInquiries({ limit: 200 });
  const header = [
    "Referenz",
    "Eingang",
    "Status",
    "Thema",
    "Vorname",
    "Nachname",
    "Firma",
    "E-Mail",
    "Telefon",
    "Quelle",
    "Nachricht",
    "Notiz",
  ];
  const lines = [header.map(csvCell).join(";")];
  for (const r of rows) {
    lines.push(
      [
        r.reference,
        r.createdAt,
        STATUS_LABEL[r.status],
        TOPIC_LABEL[r.topic],
        r.firstName,
        r.lastName,
        r.company,
        r.email,
        r.phone,
        r.source,
        r.message,
        r.adminNote,
      ]
        .map(csvCell)
        .join(";"),
    );
  }

  // BOM für korrektes Excel-Encoding
  const body = "﻿" + lines.join("\r\n");
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="anfragen-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
