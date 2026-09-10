"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE } from "@/lib/admin-auth";
import { requireAdmin } from "@/lib/admin-session";
import {
  INQUIRY_STATUSES,
  deleteInquiry,
  updateInquiry,
  type InquiryStatus,
} from "@/lib/inquiries";

function cleanRef(value: FormDataEntryValue | null): string {
  return String(value ?? "").replace(/[^A-Za-z0-9-]/g, "").slice(0, 40);
}

export async function setStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const reference = cleanRef(formData.get("reference"));
  const status = String(formData.get("status") ?? "") as InquiryStatus;
  if (!reference || !INQUIRY_STATUSES.includes(status)) return;
  await updateInquiry(reference, { status });
  revalidatePath("/admin");
  revalidatePath(`/admin/${reference}`);
}

export async function saveNoteAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const reference = cleanRef(formData.get("reference"));
  const note = String(formData.get("note") ?? "").slice(0, 4000);
  if (!reference) return;
  await updateInquiry(reference, { adminNote: note });
  revalidatePath(`/admin/${reference}`);
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
