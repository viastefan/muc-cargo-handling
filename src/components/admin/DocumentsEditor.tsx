"use client";

import { useState } from "react";
import { saveDocumentsAction } from "@/lib/cms/actions";
import type { DocumentItem } from "@/lib/cms/types";
import { newClientId } from "@/components/admin/clientIds";
import { SaveBar } from "@/components/admin/AdminWidgets";

export function DocumentsEditor({ initial }: { initial: DocumentItem[] }) {
  const [items, setItems] = useState(initial);

  return (
    <>
      {items.map((item, index) => (
        <div key={item.id} className="admin-list-item">
          <div className="admin-grid cols-2" style={{ width: "100%" }}>
            <div className="admin-field">
              <label>Titel</label>
              <input
                value={item.title}
                onChange={(e) => {
                  const copy = [...items];
                  copy[index] = { ...item, title: e.target.value };
                  setItems(copy);
                }}
              />
            </div>
            <div className="admin-field">
              <label>Kategorie</label>
              <input
                value={item.category}
                onChange={(e) => {
                  const copy = [...items];
                  copy[index] = { ...item, category: e.target.value };
                  setItems(copy);
                }}
              />
            </div>
            <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
              <label>URL / Download</label>
              <input
                value={item.url}
                onChange={(e) => {
                  const copy = [...items];
                  copy[index] = { ...item, url: e.target.value };
                  setItems(copy);
                }}
              />
            </div>
            <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
              <label>Beschreibung</label>
              <textarea
                value={item.description}
                onChange={(e) => {
                  const copy = [...items];
                  copy[index] = { ...item, description: e.target.value };
                  setItems(copy);
                }}
              />
            </div>
          </div>
          <button
            type="button"
            className="admin-btn admin-btn--danger"
            onClick={() => setItems(items.filter((x) => x.id !== item.id))}
          >
            Entfernen
          </button>
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
                id: newClientId("doc"),
                title: "Neues Dokument",
                category: "Allgemein",
                url: "",
                description: "",
                sortOrder: items.length,
                updatedAt: new Date().toISOString(),
              },
            ])
          }
        >
          Dokument hinzufügen
        </button>
      </div>
      <SaveBar onSave={() => saveDocumentsAction(items)} />
    </>
  );
}
