"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  attemptLogin,
  changeAdminPassword,
  destroyAdminSession,
  requireAdmin,
} from "./session.server";
import { loadCms, saveCms } from "./store.server";
import { newId, slugify } from "./crypto.server";
import type {
  BusinessProfile,
  CmsData,
  DocumentItem,
  FaqItem,
  InquiryStatus,
  JobPost,
  NewsPost,
  NewsStatus,
  OpsStatus,
  ServiceItem,
  SiteContent,
  TeamMember,
  TopBanner,
} from "./types";

function revalidatePublic() {
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  const result = await attemptLogin(password);
  if (!result.ok) {
    return { ok: false as const, error: result.error };
  }
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function getCmsSnapshot(): Promise<CmsData> {
  await requireAdmin();
  return loadCms();
}

export async function saveBusinessProfileAction(profile: BusinessProfile) {
  await requireAdmin();
  const result = await saveCms((draft) => {
    draft.businessProfile = profile;
  }, "business-profile");
  revalidatePublic();
  return result;
}

export async function saveSiteContentAction(content: SiteContent) {
  await requireAdmin();
  const result = await saveCms((draft) => {
    draft.siteContent = content;
  }, "site-content");
  revalidatePublic();
  return result;
}

export async function saveOpsStatusAction(ops: OpsStatus) {
  await requireAdmin();
  const result = await saveCms((draft) => {
    draft.opsStatus = { ...ops, updatedAt: new Date().toISOString() };
  }, "ops-status");
  revalidatePublic();
  return result;
}

export async function saveTopBannerAction(banner: TopBanner) {
  await requireAdmin();
  const result = await saveCms((draft) => {
    draft.topBanner = { ...banner, updatedAt: new Date().toISOString() };
  }, "top-banner");
  revalidatePublic();
  return result;
}

export async function upsertNewsAction(input: Partial<NewsPost> & { title: string }) {
  await requireAdmin();
  const now = new Date().toISOString();
  let id = input.id;

  const result = await saveCms((draft) => {
    const slugBase = slugify(input.slug || input.title) || `news-${Date.now().toString(36)}`;
    let slug = slugBase;
    let n = 2;
    while (draft.newsPosts.some((p) => p.slug === slug && p.id !== input.id)) {
      slug = `${slugBase}-${n++}`;
    }

    if (input.id) {
      const idx = draft.newsPosts.findIndex((p) => p.id === input.id);
      if (idx >= 0) {
        const prev = draft.newsPosts[idx];
        const status = (input.status || prev.status) as NewsStatus;
        draft.newsPosts[idx] = {
          ...prev,
          title: input.title,
          slug,
          excerpt: input.excerpt ?? prev.excerpt,
          body: input.body ?? prev.body,
          coverUrl: input.coverUrl ?? prev.coverUrl,
          category: input.category ?? prev.category,
          status,
          featured: input.featured ?? prev.featured,
          publishedAt:
            status === "published"
              ? prev.publishedAt || input.publishedAt || now
              : null,
          updatedAt: now,
          sortOrder: input.sortOrder ?? prev.sortOrder,
        };
        id = prev.id;
        return;
      }
    }

    id = newId("news");
    const status = (input.status || "draft") as NewsStatus;
    draft.newsPosts.unshift({
      id,
      title: input.title,
      slug,
      excerpt: input.excerpt || "",
      body: input.body || "",
      coverUrl: input.coverUrl || "",
      category: input.category || "Allgemein",
      status,
      featured: Boolean(input.featured),
      publishedAt: status === "published" ? now : null,
      updatedAt: now,
      createdAt: now,
      sortOrder: input.sortOrder ?? draft.newsPosts.length,
    });
  }, "news-upsert");

  revalidatePublic();
  return { ...result, id };
}

export async function deleteNewsAction(id: string) {
  await requireAdmin();
  const result = await saveCms((draft) => {
    draft.newsPosts = draft.newsPosts.filter((p) => p.id !== id);
  }, "news-delete");
  revalidatePublic();
  return result;
}

export async function setNewsStatusAction(id: string, status: NewsStatus) {
  await requireAdmin();
  const now = new Date().toISOString();
  const result = await saveCms((draft) => {
    const post = draft.newsPosts.find((p) => p.id === id);
    if (!post) return;
    post.status = status;
    post.updatedAt = now;
    post.publishedAt = status === "published" ? post.publishedAt || now : null;
  }, "news-status");
  revalidatePublic();
  return result;
}

export async function saveServicesAction(services: ServiceItem[]) {
  await requireAdmin();
  const result = await saveCms((draft) => {
    draft.services = services.map((s, index) => ({
      ...s,
      sortOrder: index,
      updatedAt: new Date().toISOString(),
    }));
  }, "services");
  revalidatePublic();
  return result;
}

export async function updateInquiryAction(
  id: string,
  patch: { status?: InquiryStatus; internalNote?: string },
) {
  await requireAdmin();
  const result = await saveCms((draft) => {
    const item = draft.inquiries.find((i) => i.id === id);
    if (!item) return;
    if (patch.status) item.status = patch.status;
    if (typeof patch.internalNote === "string") item.internalNote = patch.internalNote;
    item.updatedAt = new Date().toISOString();
  }, "inquiry-update");
  revalidatePublic();
  return result;
}

export async function deleteInquiryAction(id: string) {
  await requireAdmin();
  const result = await saveCms((draft) => {
    draft.inquiries = draft.inquiries.filter((i) => i.id !== id);
  }, "inquiry-delete");
  revalidatePublic();
  return result;
}

export async function saveJobsAction(jobs: JobPost[]) {
  await requireAdmin();
  const result = await saveCms((draft) => {
    draft.jobs = jobs;
  }, "jobs");
  revalidatePublic();
  return result;
}

export async function upsertJobAction(input: Partial<JobPost> & { title: string }) {
  await requireAdmin();
  const now = new Date().toISOString();
  let id = input.id;
  const result = await saveCms((draft) => {
    if (input.id) {
      const idx = draft.jobs.findIndex((j) => j.id === input.id);
      if (idx >= 0) {
        draft.jobs[idx] = {
          ...draft.jobs[idx],
          ...input,
          title: input.title,
          updatedAt: now,
        };
        id = input.id;
        return;
      }
    }
    id = newId("job");
    draft.jobs.unshift({
      id,
      title: input.title,
      location: input.location || "München Flughafen",
      type: input.type || "Vollzeit",
      summary: input.summary || "",
      body: input.body || "",
      active: input.active ?? true,
      sortOrder: input.sortOrder ?? draft.jobs.length,
      updatedAt: now,
      createdAt: now,
    });
  }, "job-upsert");
  revalidatePublic();
  return { ...result, id };
}

export async function deleteJobAction(id: string) {
  await requireAdmin();
  const result = await saveCms((draft) => {
    draft.jobs = draft.jobs.filter((j) => j.id !== id);
  }, "job-delete");
  revalidatePublic();
  return result;
}

export async function saveFaqsAction(faqs: FaqItem[]) {
  await requireAdmin();
  const result = await saveCms((draft) => {
    draft.faqs = faqs.map((f, index) => ({ ...f, sortOrder: index, updatedAt: new Date().toISOString() }));
  }, "faqs");
  revalidatePublic();
  return result;
}

export async function saveDocumentsAction(documents: DocumentItem[]) {
  await requireAdmin();
  const result = await saveCms((draft) => {
    draft.documents = documents.map((d, index) => ({
      ...d,
      sortOrder: index,
      updatedAt: new Date().toISOString(),
    }));
  }, "documents");
  revalidatePublic();
  return result;
}

export async function saveTeamAction(team: TeamMember[]) {
  await requireAdmin();
  const result = await saveCms((draft) => {
    draft.team = team.map((t, index) => ({
      ...t,
      sortOrder: index,
      updatedAt: new Date().toISOString(),
    }));
  }, "team");
  revalidatePublic();
  return result;
}

export async function saveNotificationEmailAction(email: string) {
  await requireAdmin();
  const result = await saveCms((draft) => {
    draft.auth.notificationEmail = email.trim();
    draft.auth.updatedAt = new Date().toISOString();
  }, "notification-email");
  return result;
}

export async function changePasswordAction(currentPassword: string, nextPassword: string) {
  return changeAdminPassword(currentPassword, nextPassword);
}
