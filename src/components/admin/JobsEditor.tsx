"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteJobAction, upsertJobAction } from "@/lib/cms/actions";
import type { JobPost } from "@/lib/cms/types";
import { ConfirmDeleteButton, SaveBar } from "@/components/admin/AdminWidgets";

const blank = (): Partial<JobPost> & { title: string } => ({
  title: "",
  location: "München Flughafen",
  type: "Vollzeit",
  summary: "",
  body: "",
  active: true,
});

export function JobsEditor({ initial }: { initial: JobPost[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<(Partial<JobPost> & { title: string }) | null>(null);

  return (
    <>
      <div className="admin-btn-row" style={{ marginBottom: "1rem" }}>
        <button type="button" className="admin-btn admin-btn--brand" onClick={() => setEditing(blank())}>
          Job anlegen
        </button>
      </div>

      {editing ? (
        <section className="admin-panel" style={{ marginBottom: "1rem" }}>
          <div className="admin-panel__head">
            <h2>{editing.id ? "Job bearbeiten" : "Neuer Job"}</h2>
            <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setEditing(null)}>
              Schließen
            </button>
          </div>
          <div className="admin-panel__body">
            <div className="admin-grid cols-2">
              <div className="admin-field">
                <label>Titel</label>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                />
              </div>
              <div className="admin-field">
                <label>Standort</label>
                <input
                  value={editing.location || ""}
                  onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                />
              </div>
              <div className="admin-field">
                <label>Art</label>
                <input
                  value={editing.type || ""}
                  onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                />
              </div>
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={editing.active ?? true}
                  onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                />
                Aktiv
              </label>
              <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
                <label>Kurztext</label>
                <textarea
                  value={editing.summary || ""}
                  onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
                />
              </div>
              <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
                <label>Beschreibung</label>
                <textarea
                  value={editing.body || ""}
                  onChange={(e) => setEditing({ ...editing, body: e.target.value })}
                  style={{ minHeight: "10rem" }}
                />
              </div>
            </div>
            <SaveBar
              label="Job speichern"
              onSave={async () => {
                if (!editing.title.trim()) return { ok: false, error: "Titel erforderlich." };
                const result = await upsertJobAction(editing);
                setEditing(null);
                router.refresh();
                return result;
              }}
            />
          </div>
        </section>
      ) : null}

      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>{initial.length} Jobs</h2>
        </div>
        <div className="admin-panel__body">
          {initial.length === 0 ? (
            <div className="admin-empty">
              <p>Noch keine Jobs — ersten anlegen.</p>
            </div>
          ) : (
            initial.map((job) => (
              <div key={job.id} className="admin-list-item">
                <div>
                  <strong>{job.title}</strong>
                  <p className="admin-muted" style={{ margin: "0.25rem 0 0", fontSize: "0.8125rem" }}>
                    {job.location} · {job.type} · {job.active ? "Aktiv" : "Inaktiv"}
                  </p>
                </div>
                <div className="admin-btn-row">
                  <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setEditing(job)}>
                    Bearbeiten
                  </button>
                  <ConfirmDeleteButton
                    onConfirm={async () => {
                      await deleteJobAction(job.id);
                      router.refresh();
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
