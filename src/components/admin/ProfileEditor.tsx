"use client";

import { useState } from "react";
import { saveBusinessProfileAction } from "@/lib/cms/actions";
import type { BusinessProfile } from "@/lib/cms/types";
import { SaveBar } from "@/components/admin/AdminWidgets";

export function ProfileEditor({ initial }: { initial: BusinessProfile }) {
  const [profile, setProfile] = useState(initial);
  const set = <K extends keyof BusinessProfile>(key: K, value: BusinessProfile[K]) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <div className="admin-grid cols-2">
        {(
          [
            ["legalName", "Firmenname"],
            ["brandName", "Marke"],
            ["shortName", "Kurzname"],
            ["tagline", "Tagline"],
            ["addressLine1", "Adresse Zeile 1"],
            ["addressLine2", "Adresse Zeile 2"],
            ["postalCode", "PLZ"],
            ["city", "Ort"],
            ["phone", "Telefon (Anzeige)"],
            ["phoneTel", "Telefon (tel:)"],
            ["emergencyPhone", "Notfalltelefon (Anzeige)"],
            ["emergencyPhoneTel", "Notfalltelefon (tel:)"],
            ["email", "E-Mail"],
            ["instagram", "Instagram URL"],
            ["linkedin", "LinkedIn URL"],
            ["hoursWeekday", "Öffnungszeiten Wochentags"],
            ["hoursWeekend", "Öffnungszeiten Wochenende"],
            ["mapsUrl", "Maps-Link"],
            ["logoUrl", "Logo URL"],
            ["regAgent", "Reg.B. Nummer"],
          ] as const
        ).map(([key, label]) => (
          <div className="admin-field" key={key}>
            <label htmlFor={key}>{label}</label>
            <input id={key} value={profile[key]} onChange={(e) => set(key, e.target.value)} />
          </div>
        ))}
      </div>
      <SaveBar onSave={() => saveBusinessProfileAction(profile)} />
    </>
  );
}
