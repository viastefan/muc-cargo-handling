"use client";

import { useState } from "react";
import { saveServicesAction } from "@/lib/cms/actions";
import type { ServiceItem } from "@/lib/cms/types";
import { newClientId } from "@/components/admin/clientIds";
import { SaveBar } from "@/components/admin/AdminWidgets";

export function ServicesEditor({ initial }: { initial: ServiceItem[] }) {
  const [items, setItems] = useState(initial);

  const move = (index: number, dir: -1 | 1) => {
    const next = index + dir;
    if (next < 0 || next >= items.length) return;
    const copy = [...items];
    const tmp = copy[index];
    copy[index] = copy[next];
    copy[next] = tmp;
    setItems(copy);
  };

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
              <label>Link</label>
              <input
                value={item.href}
                onChange={(e) => {
                  const copy = [...items];
                  copy[index] = { ...item, href: e.target.value };
                  setItems(copy);
                }}
              />
            </div>
            <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
              <label>Kurztext</label>
              <textarea
                value={item.summary}
                onChange={(e) => {
                  const copy = [...items];
                  copy[index] = { ...item, summary: e.target.value };
                  setItems(copy);
                }}
              />
            </div>
            <label className="admin-check">
              <input
                type="checkbox"
                checked={item.visible}
                onChange={(e) => {
                  const copy = [...items];
                  copy[index] = { ...item, visible: e.target.checked };
                  setItems(copy);
                }}
              />
              Sichtbar
            </label>
          </div>
          <div className="admin-btn-row">
            <button type="button" className="admin-btn admin-btn--ghost" onClick={() => move(index, -1)}>
              ↑
            </button>
            <button type="button" className="admin-btn admin-btn--ghost" onClick={() => move(index, 1)}>
              ↓
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={() => setItems(items.filter((x) => x.id !== item.id))}
            >
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
                id: newClientId("svc"),
                title: "Neuer Service",
                summary: "",
                href: "/",
                visible: true,
                sortOrder: items.length,
                updatedAt: new Date().toISOString(),
              },
            ])
          }
        >
          Service hinzufügen
        </button>
      </div>

      <SaveBar onSave={() => saveServicesAction(items)} />
    </>
  );
}
