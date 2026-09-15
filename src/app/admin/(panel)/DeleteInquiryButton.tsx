"use client";

import { useState } from "react";
import { deleteInquiryAction } from "./actions";
import { AdminSubmitButton } from "./AdminSubmitButton";

export function DeleteInquiryButton({ reference }: { reference: string }) {
  const [armed, setArmed] = useState(false);

  if (!armed) {
    return (
      <button
        type="button"
        className="admin-btn admin-btn--sm"
        onClick={() => setArmed(true)}
      >
        Anfrage löschen
      </button>
    );
  }

  return (
    <form action={deleteInquiryAction} className="admin-inline-form">
      <input type="hidden" name="reference" value={reference} />
      <span style={{ fontSize: "13px", color: "var(--muted)" }}>
        Endgültig löschen?
      </span>
      <AdminSubmitButton pendingLabel="Wird gelöscht …" className="admin-btn admin-btn--sm admin-btn--danger">
        Ja, löschen
      </AdminSubmitButton>
      <button
        type="button"
        className="admin-btn admin-btn--sm admin-btn--plain"
        onClick={() => setArmed(false)}
      >
        Abbrechen
      </button>
    </form>
  );
}
