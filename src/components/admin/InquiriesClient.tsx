"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteInquiryAction, updateInquiryAction } from "@/lib/cms/actions";
import type { Inquiry, InquiryStatus } from "@/lib/cms/types";
import { ConfirmDeleteButton } from "@/components/admin/AdminWidgets";

export function InquiriesClient({ items }: { items: Inquiry[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | InquiryStatus>("all");
  const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null);
  const [note, setNote] = useState(items[0]?.internalNote ?? "");
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(
    () => items.filter((i) => (filter === "all" ? true : i.status === filter)),
    [items, filter],
  );
  const selected = items.find((i) => i.id === selectedId) ?? filtered[0] ?? null;

  return (
    <div className="admin-grid cols-2">
      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>Inbox</h2>
          <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}>
            <option value="all">Alle</option>
            <option value="neu">Neu</option>
            <option value="in_arbeit">In Arbeit</option>
            <option value="erledigt">Erledigt</option>
          </select>
        </div>
        <div className="admin-panel__body">
          {filtered.length === 0 ? (
            <div className="admin-empty">
              <p>Keine Anfragen in diesem Filter.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                className="admin-list-item"
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: selected?.id === item.id ? "var(--admin-soft)" : "transparent",
                  border: 0,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedId(item.id);
                  setNote(item.internalNote);
                }}
              >
                <div>
                  <strong>{item.name}</strong>
                  <p className="admin-muted" style={{ margin: "0.2rem 0 0", fontSize: "0.8125rem" }}>
                    {item.topic} · {item.reference}
                  </p>
                </div>
                <span className={`admin-badge admin-badge--${item.status === "erledigt" ? "ok" : "warn"}`}>
                  {item.status}
                </span>
              </button>
            ))
          )}
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>Detail</h2>
        </div>
        <div className="admin-panel__body">
          {!selected ? (
            <div className="admin-empty">
              <p>Anfrage auswählen.</p>
            </div>
          ) : (
            <>
              <p className="admin-mono admin-muted">{selected.reference}</p>
              <p>
                <strong>{selected.name}</strong>
                {selected.company ? ` · ${selected.company}` : ""}
              </p>
              <p className="admin-muted">
                <a href={`mailto:${selected.email}`}>{selected.email}</a>
                {selected.phone ? ` · ${selected.phone}` : ""}
              </p>
              <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.55 }}>{selected.message}</p>

              <div className="admin-field">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={selected.status}
                  disabled={pending}
                  onChange={(e) => {
                    const status = e.target.value as InquiryStatus;
                    startTransition(async () => {
                      await updateInquiryAction(selected.id, { status });
                      router.refresh();
                    });
                  }}
                >
                  <option value="neu">Neu</option>
                  <option value="in_arbeit">In Arbeit</option>
                  <option value="erledigt">Erledigt</option>
                </select>
              </div>

              <div className="admin-field">
                <label htmlFor="note">Interne Notiz</label>
                <textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} />
              </div>

              <div className="admin-btn-row">
                <button
                  type="button"
                  className="admin-btn admin-btn--brand"
                  disabled={pending}
                  onClick={() => {
                    startTransition(async () => {
                      await updateInquiryAction(selected.id, { internalNote: note });
                      router.refresh();
                    });
                  }}
                >
                  Notiz speichern
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn--soft"
                  disabled={pending}
                  onClick={() => {
                    startTransition(async () => {
                      await updateInquiryAction(selected.id, { status: "erledigt" });
                      router.refresh();
                    });
                  }}
                >
                  Als erledigt markieren
                </button>
                <ConfirmDeleteButton
                  onConfirm={async () => {
                    await deleteInquiryAction(selected.id);
                    setSelectedId(null);
                    router.refresh();
                  }}
                />
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
