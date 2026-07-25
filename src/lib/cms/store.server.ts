import "server-only";

import { promises as fs } from "fs";
import path from "path";
import { createDefaultCmsData } from "./defaults";
import type { CmsData, Inquiry, PersistMeta, SaveResult } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "cms");
const DATA_FILE = path.join(DATA_DIR, "store.json");

type GlobalStore = {
  cache: CmsData | null;
  writeQueue: Promise<void>;
};

const globalForCms = globalThis as typeof globalThis & { __mucCmsStore?: GlobalStore };

function getGlobal(): GlobalStore {
  if (!globalForCms.__mucCmsStore) {
    globalForCms.__mucCmsStore = { cache: null, writeQueue: Promise.resolve() };
  }
  return globalForCms.__mucCmsStore;
}

function stampMeta(data: CmsData, source: string, backend: PersistMeta["backend"], ok: boolean, detail: string) {
  data.meta = {
    lastWriteAt: new Date().toISOString(),
    lastWriteSource: source,
    backend,
    ok,
    detail,
  };
}

async function readFromDisk(): Promise<CmsData | null> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as CmsData;
    if (parsed?.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function writeToDisk(data: CmsData): Promise<{ ok: boolean; detail: string; backend: PersistMeta["backend"] }> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const tmp = `${DATA_FILE}.${process.pid}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
    await fs.rename(tmp, DATA_FILE);
    return { ok: true, detail: "Written to data/cms/store.json", backend: "filesystem" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Filesystem write failed";
    // Vercel serverless FS may be read-only outside /tmp — keep in-memory cache.
    return { ok: false, detail: `${message} (in-memory fallback active)`, backend: "memory" };
  }
}

export async function loadCms(): Promise<CmsData> {
  const g = getGlobal();
  if (g.cache) return structuredClone(g.cache);

  const fromDisk = await readFromDisk();
  if (fromDisk) {
    g.cache = fromDisk;
    return structuredClone(fromDisk);
  }

  const seeded = createDefaultCmsData();
  g.cache = seeded;
  const result = await writeToDisk(seeded);
  stampMeta(seeded, "seed", result.backend, result.ok, result.detail);
  g.cache = seeded;
  return structuredClone(seeded);
}

export async function saveCms(mutator: (draft: CmsData) => void, source: string): Promise<SaveResult> {
  const g = getGlobal();

  const run = async (): Promise<SaveResult> => {
    const current = g.cache ?? (await loadCms());
    const draft = structuredClone(current);
    mutator(draft);

    const persist = await writeToDisk(draft);
    stampMeta(draft, source, persist.backend, persist.ok || persist.backend === "memory", persist.detail);
    g.cache = draft;

    if (!persist.ok && persist.backend === "memory") {
      // Still accept write for this instance so admin remains usable on Vercel without Blob.
      return { ok: true, savedAt: draft.meta.lastWriteAt ?? undefined, error: persist.detail };
    }

    return persist.ok
      ? { ok: true, savedAt: draft.meta.lastWriteAt ?? undefined }
      : { ok: false, error: persist.detail };
  };

  const next = g.writeQueue.then(run, run);
  g.writeQueue = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
}

export async function getPersistMeta(): Promise<PersistMeta> {
  const data = await loadCms();
  return data.meta;
}

export async function appendInquiry(input: Omit<Inquiry, "id" | "status" | "internalNote" | "updatedAt"> & { id?: string }) {
  const now = new Date().toISOString();
  return saveCms((draft) => {
    draft.inquiries.unshift({
      id: input.id ?? `inq_${Date.now().toString(36)}`,
      reference: input.reference,
      topic: input.topic,
      name: input.name,
      company: input.company,
      email: input.email,
      phone: input.phone,
      message: input.message,
      status: "neu",
      internalNote: "",
      createdAt: input.createdAt ?? now,
      updatedAt: now,
    });
  }, "contact-form");
}
