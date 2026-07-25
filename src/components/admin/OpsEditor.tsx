"use client";

import { useState } from "react";
import { saveOpsStatusAction } from "@/lib/cms/actions";
import type { OpsStatus } from "@/lib/cms/types";
import { SaveBar } from "@/components/admin/AdminWidgets";

export function OpsEditor({ initial }: { initial: OpsStatus }) {
  const [ops, setOps] = useState(initial);
  return (
    <>
      <div className="admin-grid cols-2">
        <div className="admin-field">
          <label htmlFor="level">Status-Level</label>
          <select
            id="level"
            value={ops.level}
            onChange={(e) => setOps({ ...ops, level: e.target.value as OpsStatus["level"] })}
          >
            <option value="normal">Normal</option>
            <option value="hinweis">Hinweis</option>
            <option value="stoerung">Störung</option>
            <option value="kritisch">Kritisch</option>
          </select>
        </div>
        <div className="admin-field">
          <label htmlFor="validUntil">Gültig bis (optional)</label>
          <input
            id="validUntil"
            type="datetime-local"
            value={ops.validUntil ? ops.validUntil.slice(0, 16) : ""}
            onChange={(e) =>
              setOps({
                ...ops,
                validUntil: e.target.value ? new Date(e.target.value).toISOString() : null,
              })
            }
          />
        </div>
        <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="title">Titel</label>
          <input id="title" value={ops.title} onChange={(e) => setOps({ ...ops, title: e.target.value })} />
        </div>
        <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="message">Text</label>
          <textarea
            id="message"
            value={ops.message}
            onChange={(e) => setOps({ ...ops, message: e.target.value })}
          />
        </div>
        <label className="admin-check">
          <input
            type="checkbox"
            checked={ops.publicVisible}
            onChange={(e) => setOps({ ...ops, publicVisible: e.target.checked })}
          />
          Öffentlich anzeigen (bereit für Website-Einbindung)
        </label>
      </div>
      <SaveBar onSave={() => saveOpsStatusAction(ops)} />
    </>
  );
}
