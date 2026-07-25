"use client";

import { useState } from "react";
import { saveTeamAction } from "@/lib/cms/actions";
import type { TeamMember } from "@/lib/cms/types";
import { newClientId } from "@/components/admin/clientIds";
import { SaveBar } from "@/components/admin/AdminWidgets";

export function TeamEditor({ initial }: { initial: TeamMember[] }) {
  const [items, setItems] = useState(initial);

  return (
    <>
      {items.map((item, index) => (
        <div key={item.id} className="admin-list-item">
          <div className="admin-grid cols-2" style={{ width: "100%" }}>
            {(
              [
                ["name", "Name"],
                ["role", "Rolle"],
                ["email", "E-Mail"],
                ["phone", "Telefon"],
                ["photoUrl", "Foto URL"],
              ] as const
            ).map(([key, label]) => (
              <div className="admin-field" key={key}>
                <label>{label}</label>
                <input
                  value={item[key]}
                  onChange={(e) => {
                    const copy = [...items];
                    copy[index] = { ...item, [key]: e.target.value };
                    setItems(copy);
                  }}
                />
              </div>
            ))}
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
                id: newClientId("team"),
                name: "Neuer Kontakt",
                role: "",
                email: "",
                phone: "",
                photoUrl: "",
                visible: true,
                sortOrder: items.length,
                updatedAt: new Date().toISOString(),
              },
            ])
          }
        >
          Person hinzufügen
        </button>
      </div>
      <SaveBar onSave={() => saveTeamAction(items)} />
    </>
  );
}
