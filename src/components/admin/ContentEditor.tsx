"use client";

import { useState } from "react";
import { saveSiteContentAction } from "@/lib/cms/actions";
import type { SiteContent } from "@/lib/cms/types";
import { SaveBar } from "@/components/admin/AdminWidgets";

export function ContentEditor({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState(initial);
  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <div className="admin-alert" style={{ marginBottom: "1rem" }}>
        Gespeicherte Texte liegen bereit. Die bestehende Marketing-Website bleibt unverändert, bis die
        Einbindung bewusst freigeschaltet wird.
      </div>
      <div className="admin-grid cols-2">
        {(
          [
            ["homeHeroEyebrow", "Home Hero Eyebrow"],
            ["homeHeroTitle", "Home Hero Titel"],
            ["homeHeroLede", "Home Hero Lede", true],
            ["homeHeroCtaLabel", "Home CTA Label"],
            ["homeHeroCtaHref", "Home CTA Link"],
            ["closingTitle", "Closing Titel"],
            ["closingLede", "Closing Text", true],
            ["aboutIntro", "Über uns Intro"],
            ["aboutBody", "Über uns Text", true],
          ] as const
        ).map((entry) => {
          const [key, label, area] = entry as unknown as [keyof SiteContent, string, boolean?];
          return (
            <div className="admin-field" key={key} style={area ? { gridColumn: "1 / -1" } : undefined}>
              <label htmlFor={key}>{label}</label>
              {area ? (
                <textarea id={key} value={content[key]} onChange={(e) => set(key, e.target.value)} />
              ) : (
                <input id={key} value={content[key]} onChange={(e) => set(key, e.target.value)} />
              )}
            </div>
          );
        })}
      </div>
      <SaveBar onSave={() => saveSiteContentAction(content)} />
    </>
  );
}
