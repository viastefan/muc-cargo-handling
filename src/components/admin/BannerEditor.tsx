"use client";

import { useState } from "react";
import { saveTopBannerAction } from "@/lib/cms/actions";
import type { TopBanner } from "@/lib/cms/types";
import { SaveBar } from "@/components/admin/AdminWidgets";

export function BannerEditor({ initial }: { initial: TopBanner }) {
  const [banner, setBanner] = useState(initial);
  return (
    <>
      <div className="admin-grid cols-2">
        <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="text">Banner-Text</label>
          <input id="text" value={banner.text} onChange={(e) => setBanner({ ...banner, text: e.target.value })} />
        </div>
        <div className="admin-field">
          <label htmlFor="href">Link (optional)</label>
          <input id="href" value={banner.href} onChange={(e) => setBanner({ ...banner, href: e.target.value })} />
        </div>
        <div className="admin-field">
          <label htmlFor="style">Style</label>
          <select
            id="style"
            value={banner.style}
            onChange={(e) => setBanner({ ...banner, style: e.target.value as TopBanner["style"] })}
          >
            <option value="brand">Brand</option>
            <option value="dark">Dark</option>
            <option value="warn">Warn</option>
          </select>
        </div>
        <label className="admin-check">
          <input
            type="checkbox"
            checked={banner.active}
            onChange={(e) => setBanner({ ...banner, active: e.target.checked })}
          />
          Aktiv
        </label>
      </div>
      <SaveBar onSave={() => saveTopBannerAction(banner)} />
    </>
  );
}
