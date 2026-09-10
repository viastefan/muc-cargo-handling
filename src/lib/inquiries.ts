/**
 * Datenzugriff für Website-Anfragen. NUR serverseitig verwenden
 * (API-Routen / Server-Komponenten).
 *
 * `SUPABASE_SERVICE_ROLE_KEY` trägt keinen `NEXT_PUBLIC_`-Präfix und wird von
 * Next.js daher niemals in ein Client-Bundle aufgenommen; ein versehentlicher
 * Client-Import ergäbe hier lediglich einen leeren Key (No-Op), nie einen Leak.
 *
 * Speicher ist eine einzelne Supabase-Tabelle (`inquiries`), angesprochen über
 * die PostgREST-HTTP-Schnittstelle mit dem Service-Role-Key — bewusst ohne
 * `@supabase/supabase-js`, damit das Projekt seine Null-Runtime-Dependencies
 * behält. Fehlen die Env-Variablen (lokale Entwicklung, Vorschau ohne Secrets),
 * arbeiten alle Funktionen als No-Op bzw. liefern leere Ergebnisse — die
 * Website bleibt funktionsfähig, Anfragen werden dann nur per Log/E-Mail
 * weitergereicht.
 */

const RAW_URL = process.env.SUPABASE_URL?.trim().replace(/\/+$/, "") ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";

export const inquiriesStorageReady = Boolean(RAW_URL && SERVICE_KEY);

const REST = `${RAW_URL}/rest/v1`;
const TIMEOUT_MS = 10_000;

export type InquiryStatus = "new" | "in_progress" | "done" | "archived";
export type InquiryTopic = "luftfracht" | "airline" | "roentgen" | "allgemein";
export type InquirySource = "inquiry-flow" | "contact-form";

export const INQUIRY_STATUSES: InquiryStatus[] = [
  "new",
  "in_progress",
  "done",
  "archived",
];

export const STATUS_LABEL: Record<InquiryStatus, string> = {
  new: "Neu",
  in_progress: "In Bearbeitung",
  done: "Erledigt",
  archived: "Archiviert",
};

export const TOPIC_LABEL: Record<InquiryTopic, string> = {
  luftfracht: "Luftfracht Import & Export",
  airline: "Airline Handling",
  roentgen: "Röntgen & Sicherheit",
  allgemein: "Allgemeine Anfrage",
};

export type InquiryInput = {
  reference: string;
  topic: InquiryTopic;
  source: InquirySource;
  firstName: string;
  lastName: string;
  company: string | null;
  email: string;
  phone: string | null;
  message: string;
  ipHash: string | null;
  userAgent: string | null;
};

export type InquiryRecord = {
  id: string;
  reference: string;
  createdAt: string;
  topic: InquiryTopic;
  source: string;
  firstName: string;
  lastName: string;
  company: string | null;
  email: string;
  phone: string | null;
  message: string;
  status: InquiryStatus;
  adminNote: string | null;
  handledAt: string | null;
  ipHash: string | null;
  userAgent: string | null;
};

type Row = {
  id: string;
  reference: string;
  created_at: string;
  topic: InquiryTopic;
  source: string;
  first_name: string;
  last_name: string;
  company: string | null;
  email: string;
  phone: string | null;
  message: string;
  status: InquiryStatus;
  admin_note: string | null;
  handled_at: string | null;
  ip_hash: string | null;
  user_agent: string | null;
};

function toRecord(row: Row): InquiryRecord {
  return {
    id: row.id,
    reference: row.reference,
    createdAt: row.created_at,
    topic: row.topic,
    source: row.source,
    firstName: row.first_name,
    lastName: row.last_name,
    company: row.company,
    email: row.email,
    phone: row.phone,
    message: row.message,
    status: row.status,
    adminNote: row.admin_note,
    handledAt: row.handled_at,
    ipHash: row.ip_hash,
    userAgent: row.user_agent,
  };
}

async function rest(path: string, init: RequestInit & { prefer?: string } = {}) {
  if (!inquiriesStorageReady) {
    throw new Error("inquiries storage not configured");
  }
  const { prefer, headers, ...rest } = init;
  const res = await fetch(`${REST}${path}`, {
    ...rest,
    // Server-zu-Server, nie aus dem Cache bedienen.
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
      ...headers,
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`supabase ${res.status}: ${body.slice(0, 300)}`);
  }
  return res;
}

/** Anfrage persistieren. Liefert `persisted:false`, wenn kein Speicher konfiguriert ist. */
export async function saveInquiry(
  input: InquiryInput,
): Promise<{ persisted: boolean }> {
  if (!inquiriesStorageReady) return { persisted: false };
  await rest("/inquiries", {
    method: "POST",
    prefer: "return=minimal",
    body: JSON.stringify({
      reference: input.reference,
      topic: input.topic,
      source: input.source,
      first_name: input.firstName,
      last_name: input.lastName,
      company: input.company,
      email: input.email,
      phone: input.phone,
      message: input.message,
      ip_hash: input.ipHash,
      user_agent: input.userAgent,
    }),
  });
  return { persisted: true };
}

export type InquiryQuery = {
  status?: InquiryStatus | "all";
  topic?: InquiryTopic | "all";
  search?: string;
  limit?: number;
  offset?: number;
};

export async function listInquiries(
  query: InquiryQuery = {},
): Promise<{ rows: InquiryRecord[]; total: number; error?: string }> {
  if (!inquiriesStorageReady) return { rows: [], total: 0 };
  try {
    return await listInquiriesUnsafe(query);
  } catch (error) {
    console.error("[inquiries] list failed", error);
    return { rows: [], total: 0, error: String(error) };
  }
}

async function listInquiriesUnsafe(
  query: InquiryQuery,
): Promise<{ rows: InquiryRecord[]; total: number }> {

  const limit = Math.min(Math.max(query.limit ?? 50, 1), 200);
  const offset = Math.max(query.offset ?? 0, 0);
  const params = new URLSearchParams();
  params.set("select", "*");
  params.set("order", "created_at.desc");

  if (query.status && query.status !== "all") {
    params.set("status", `eq.${query.status}`);
  }
  if (query.topic && query.topic !== "all") {
    params.set("topic", `eq.${query.topic}`);
  }
  if (query.search) {
    // PostgREST or-Filter: alle Zeichen entfernen, mit denen sich der
    // Filterausdruck manipulieren ließe (Klammern, Komma, Punkt, Stern,
    // Quotes, Backslash) — übrig bleibt ein reiner Suchbegriff.
    const term = query.search.replace(/[(),.*:"\\]/g, " ").trim().slice(0, 80);
    if (term) {
      const like = `*${term}*`;
      params.set(
        "or",
        `(first_name.ilike.${like},last_name.ilike.${like},email.ilike.${like},company.ilike.${like},reference.ilike.${like},message.ilike.${like})`,
      );
    }
  }

  const res = await rest(`/inquiries?${params.toString()}`, {
    headers: { Range: `${offset}-${offset + limit - 1}`, "Range-Unit": "items" },
    prefer: "count=exact",
  });
  const rows = (await res.json()) as Row[];
  const contentRange = res.headers.get("content-range") ?? "";
  const total = Number(contentRange.split("/")[1]) || rows.length;
  return { rows: rows.map(toRecord), total };
}

export async function getInquiry(reference: string): Promise<InquiryRecord | null> {
  if (!inquiriesStorageReady) return null;
  try {
    return await getInquiryUnsafe(reference);
  } catch (error) {
    console.error("[inquiries] get failed", error);
    return null;
  }
}

async function getInquiryUnsafe(reference: string): Promise<InquiryRecord | null> {
  const params = new URLSearchParams({
    select: "*",
    reference: `eq.${reference.replace(/[^A-Za-z0-9-]/g, "")}`,
    limit: "1",
  });
  const res = await rest(`/inquiries?${params.toString()}`);
  const rows = (await res.json()) as Row[];
  return rows[0] ? toRecord(rows[0]) : null;
}

export async function updateInquiry(
  reference: string,
  patch: { status?: InquiryStatus; adminNote?: string | null },
): Promise<InquiryRecord | null> {
  if (!inquiriesStorageReady) return null;
  const body: Record<string, unknown> = {};
  if (patch.status) {
    body.status = patch.status;
    body.handled_at =
      patch.status === "done" || patch.status === "archived"
        ? new Date().toISOString()
        : null;
  }
  if (patch.adminNote !== undefined) {
    body.admin_note = patch.adminNote?.slice(0, 4000) || null;
  }
  if (Object.keys(body).length === 0) return getInquiry(reference);

  const params = new URLSearchParams({
    reference: `eq.${reference.replace(/[^A-Za-z0-9-]/g, "")}`,
  });
  const res = await rest(`/inquiries?${params.toString()}`, {
    method: "PATCH",
    prefer: "return=representation",
    body: JSON.stringify(body),
  });
  const rows = (await res.json()) as Row[];
  return rows[0] ? toRecord(rows[0]) : null;
}

/** Anfrage endgültig löschen (DSGVO — nach abgeschlossener Bearbeitung). */
export async function deleteInquiry(reference: string): Promise<boolean> {
  if (!inquiriesStorageReady) return false;
  try {
    const params = new URLSearchParams({
      reference: `eq.${reference.replace(/[^A-Za-z0-9-]/g, "")}`,
    });
    await rest(`/inquiries?${params.toString()}`, {
      method: "DELETE",
      prefer: "return=minimal",
    });
    return true;
  } catch (error) {
    console.error("[inquiries] delete failed", error);
    return false;
  }
}

export type InquiryStats = {
  total: number;
  new: number;
  inProgress: number;
  done: number;
  last7Days: number;
};

export async function inquiryStats(): Promise<InquiryStats> {
  const empty = { total: 0, new: 0, inProgress: 0, done: 0, last7Days: 0 };
  if (!inquiriesStorageReady) return empty;
  try {
    return await inquiryStatsUnsafe();
  } catch (error) {
    console.error("[inquiries] stats failed", error);
    return empty;
  }
}

async function inquiryStatsUnsafe(): Promise<InquiryStats> {
  const countOnly = async (filter: string) => {
    const res = await rest(`/inquiries?select=id&${filter}`, {
      headers: { Range: "0-0", "Range-Unit": "items" },
      prefer: "count=exact",
    });
    await res.text();
    return Number((res.headers.get("content-range") ?? "").split("/")[1]) || 0;
  };
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const [total, newCount, inProgress, done, last7Days] = await Promise.all([
    countOnly("id=not.is.null"),
    countOnly("status=eq.new"),
    countOnly("status=eq.in_progress"),
    countOnly("status=eq.done"),
    countOnly(`created_at=gte.${since}`),
  ]);
  return { total, new: newCount, inProgress, done, last7Days };
}
