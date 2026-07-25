"use client";

import { useState } from "react";
import { saveFaqsAction } from "@/lib/cms/actions";
import type { FaqItem } from "@/lib/cms/types";
import { AdminIcon } from "@/components/admin/AdminIcon";
import { newClientId } from "@/components/admin/clientIds";
import { SaveBar } from "@/components/admin/AdminWidgets";

export function FaqEditor({ initial }: { initial: FaqItem[] }) {
  const [items, setItems] = useState(initial);

  const move = (index: number, dir: -1 | 1) => {
    const next = index + dir;
    if (next < 0 || next >= items.length) return;
    const copy = [...items];
    [copy[index], copy[next]] = [copy[next], copy[index]];
    setItems(copy);
  };

  return (
    <>
      {items.map((item, index) => (
        <div key={item.id} className="admin-list-item">
          <div style={{ width: "100%" }}>
            <div className="admin-grid cols-2">
              <div className="admin-field">
                <label>Gruppe</label>
                <input
                  value={item.group}
                  onChange={(e) => {
                    const copy = [...items];
                    copy[index] = { ...item, group: e.target.value };
                    setItems(copy);
                  }}
                />
              </div>
              <div className="admin-field">
                <label>Frage</label>
                <input
                  value={item.question}
                  onChange={(e) => {
                    const copy = [...items];
                    copy[index] = { ...item, question: e.target.value };
                    setItems(copy);
                  }}
                />
              </div>
              <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
                <label>Antwort</label>
                <textarea
                  value={item.answer}
                  onChange={(e) => {
                    const copy = [...items];
                    copy[index] = { ...item, answer: e.target.value };
                    setItems(copy);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="admin-btn-row">
            <button type="button" className="admin-btn admin-btn--ghost" aria-label="Nach oben" onClick={() => move(index, -1)}>
              <AdminIcon name="arrowUp" size={15} />
            </button>
            <button type="button" className="admin-btn admin-btn--ghost" aria-label="Nach unten" onClick={() => move(index, 1)}>
              <AdminIcon name="arrowDown" size={15} />
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={() => setItems(items.filter((x) => x.id !== item.id))}
            >
              <AdminIcon name="trash" size={14} />
              Entfernen
            </button>
          </div>
        </div>
      ))}
      <div className="admin-btn-row" style={{ marginTop: "0.75rem" }}>
        <button
          type="button"
          className="admin-btn admin-btn--soft"
          onClick={() =>
            setItems([
              ...items,
              {
                id: newClientId("faq"),
                group: "Allgemein",
                question: "Neue Frage",
                answer: "",
                sortOrder: items.length,
                updatedAt: new Date().toISOString(),
              },
            ])
          }
        >
          <AdminIcon name="plus" size={15} />
          FAQ hinzufügen
        </button>
      </div>
      <SaveBar onSave={() => saveFaqsAction(items)} />
    </>
  );
}
