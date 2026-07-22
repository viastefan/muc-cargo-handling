"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mt-10 border border-[var(--border)] bg-[var(--surface)] p-8">
        <p className="text-lg font-bold text-[var(--brand)]">Vielen Dank!</p>
        <p className="mt-2 text-[15px] text-[var(--muted)]">
          Ihre Anfrage wurde entgegengenommen. Wir melden uns in Kürze.
        </p>
        <button
          type="button"
          className="mt-6 text-sm font-semibold text-[var(--brand)] underline"
          onClick={() => setSent(false)}
        >
          Weitere Anfrage senden
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Vorname *" name="firstName" required />
        <Field label="Nachname *" name="lastName" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Unternehmen" name="company" />
        <Field label="E-Mail *" name="email" type="email" required />
      </div>
      <Field label="Telefon" name="phone" type="tel" />
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.06em] text-[var(--muted-light)]">
          Thema *
        </label>
        <select
          name="topic"
          required
          className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--brand)]"
          defaultValue=""
        >
          <option value="" disabled>
            Bitte wählen
          </option>
          <option>Luftfracht Import/Export</option>
          <option>Airline Handling</option>
          <option>Röntgen / Sicherheitskontrolle</option>
          <option>Allgemeine Anfrage</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.06em] text-[var(--muted-light)]">
          Ihre Nachricht *
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full resize-y border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--brand)]"
        />
      </div>
      <Button type="submit" arrow="corner">
        Anfrage absenden
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.06em] text-[var(--muted-light)]">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--brand)]"
      />
    </div>
  );
}
