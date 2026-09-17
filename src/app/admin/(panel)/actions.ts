"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE } from "@/lib/admin-auth";
import { requireAdmin } from "@/lib/admin-session";
import {
  INQUIRY_STATUSES,
  STATUS_LABEL,
  deleteInquiry,
  getInquiry,
  logInquiryEvent,
  updateInquiry,
  type InquiryStatus,
} from "@/lib/inquiries";
import { getUserById } from "@/lib/admin-users";

function cleanRef(value: FormDataEntryValue | null): string {
  return String(value ?? "").replace(/[^A-Za-z0-9-]/g, "").slice(0, 40);
}

export async function setStatusAction(formData: FormData): Promise<void> {
  const principal = await requireAdmin();
  const reference = cleanRef(formData.get("reference"));
  const status = String(formData.get("status") ?? "") as InquiryStatus;
  if (!reference || !INQUIRY_STATUSES.includes(status)) return;

  const before = await getInquiry(reference);
  if (!before || before.status === status) return;

  await updateInquiry(reference, { status });
  await logInquiryEvent(reference, {
    actorName: principal.name,
    kind: "status",
    detail: `${STATUS_LABEL[before.status]} → ${STATUS_LABEL[status]}`,
  });

  // Beim Wechsel auf „Erledigt“ optional kurze Abschluss-Mail.
  if (status === "done" && before.status !== "done") {
    const { sendInquiryClosedNotice, emailReady } = await import("@/lib/notify");
    if (emailReady) {
      await sendInquiryClosedNotice({
        to: before.email,
        reference: before.reference,
        name: `${before.firstName} ${before.lastName}`.trim(),
      }).catch((error) => {
        console.error("[admin] closed notice failed", error);
      });
    }
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/${reference}`);
}

export async function saveNoteAction(formData: FormData): Promise<void> {
  const principal = await requireAdmin();
  const reference = cleanRef(formData.get("reference"));
  const note = String(formData.get("note") ?? "").slice(0, 4000);
  if (!reference) return;

  const before = await getInquiry(reference);
  if (!before || (before.adminNote ?? "") === note) return;

  await updateInquiry(reference, { adminNote: note });
  await logInquiryEvent(reference, {
    actorName: principal.name,
    kind: "note",
    detail: note ? "Notiz aktualisiert" : "Notiz geleert",
  });
  revalidatePath(`/admin/${reference}`);
}

export async function assignInquiryAction(formData: FormData): Promise<void> {
  const principal = await requireAdmin();
  const reference = cleanRef(formData.get("reference"));
  const raw = String(formData.get("assignee") ?? "").trim();
  if (!reference) return;

  const before = await getInquiry(reference);
  if (!before) return;

  const assignee = raw === "" || raw === "none" ? null : raw;
  if ((before.assignedTo ?? null) === assignee) return;

  const target = assignee ? await getUserById(assignee) : null;
  if (assignee && !target) return;

  await updateInquiry(reference, { assignedTo: assignee });
  await logInquiryEvent(reference, {
    actorName: principal.name,
    kind: "assign",
    detail: target ? `zugewiesen an ${target.name}` : "Zuweisung entfernt",
  });
  revalidatePath("/admin");
  revalidatePath(`/admin/${reference}`);
}

export async function saveReplyAction(reference: string, message: string): Promise<void> {
  const principal = await requireAdmin();
  const ref = cleanRef(reference);
  const text = message.trim().slice(0, 4000);
  if (!ref || !text) return;

  await logInquiryEvent(ref, {
    actorName: principal.name,
    kind: "reply",
    detail: text,
  });
  revalidatePath(`/admin/${ref}`);
}

/**
 * Antwort direkt per Resend an den Kunden senden und im Verlauf speichern.
 * Bei Erfolg wird „Neu“ auf „In Bearbeitung“ gesetzt; optional auf „Erledigt“.
 */
export async function sendReplyEmailAction(
  reference: string,
  message: string,
  markDone = false,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const principal = await requireAdmin();
  const ref = cleanRef(reference);
  const text = message.trim().slice(0, 4000);
  if (!ref || !text) {
    return { ok: false, error: "Bitte einen Antworttext eingeben." };
  }

  const inquiry = await getInquiry(ref);
  if (!inquiry) {
    return { ok: false, error: "Anfrage nicht gefunden." };
  }

  const { sendCustomerReply } = await import("@/lib/notify");
  const result = await sendCustomerReply({
    to: inquiry.email,
    reference: inquiry.reference,
    name: `${inquiry.firstName} ${inquiry.lastName}`.trim(),
    body: text,
    actorName: principal.name,
  });

  if (!result.ok) {
    if (result.reason === "not_configured") {
      return {
        ok: false,
        error: "E-Mail-Versand ist nicht eingerichtet (RESEND_API_KEY fehlt).",
      };
    }
    return {
      ok: false,
      error: "Versand fehlgeschlagen. Bitte Absender und Resend-Konto prüfen.",
    };
  }

  await logInquiryEvent(ref, {
    actorName: principal.name,
    kind: "reply",
    detail: text,
  });

  if (markDone && inquiry.status !== "done") {
    await updateInquiry(ref, { status: "done" });
    await logInquiryEvent(ref, {
      actorName: principal.name,
      kind: "status",
      detail: `${STATUS_LABEL[inquiry.status]} → ${STATUS_LABEL.done}`,
    });
  } else if (inquiry.status === "new") {
    await updateInquiry(ref, { status: "in_progress" });
    await logInquiryEvent(ref, {
      actorName: principal.name,
      kind: "status",
      detail: `${STATUS_LABEL.new} → ${STATUS_LABEL.in_progress}`,
    });
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/${ref}`);
  return { ok: true };
}

export async function deleteInquiryAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const reference = cleanRef(formData.get("reference"));
  if (!reference) return;
  await deleteInquiry(reference);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
