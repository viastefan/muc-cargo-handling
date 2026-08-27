"use client";

import { useId } from "react";

/** Passende Bildschirmtastatur je Feldtyp – spart Tipparbeit auf Mobilgeraeten. */
const INPUT_MODE: Record<string, "email" | "tel" | "text"> = {
  email: "email",
  tel: "tel",
};

export function FormField({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
  onBlur,
  error,
  hint,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  hint?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={`field ${error ? "field--error" : ""}`.trim()}>
        <span className="field__label">
          {label}
          {required && <span className="text-[var(--brand-text)]"> *</span>}
        </span>
        <input
          id={id}
          name={name}
          type={type}
          inputMode={INPUT_MODE[type]}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className="field__control"
        />
      </label>
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
    </div>
  );
}

export function FormTextarea({
  label,
  name,
  required,
  value,
  onChange,
  onBlur,
  error,
  maxLength = 2000,
  rows = 5,
}: {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  maxLength?: number;
  rows?: number;
}) {
  const id = useId();
  const remaining = maxLength - value.length;

  return (
    <div>
      <label htmlFor={id} className={`field ${error ? "field--error" : ""}`.trim()}>
        <span className="field__label">
          {label}
          {required && <span className="text-[var(--brand-text)]"> *</span>}
        </span>
        <textarea
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
          onBlur={onBlur}
          rows={rows}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          placeholder="Sendung, Zeitfenster, besondere Anforderungen…"
          className="field__control"
        />
        <span className="field__counter" aria-hidden="true">
          {remaining}
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TopicSelector({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const options = [
    {
      id: "luftfracht",
      label: "Luftfracht",
      desc: "Import & Export Handling",
    },
    {
      id: "airline",
      label: "Airline Handling",
      desc: "Operative Airline-Prozesse",
    },
    {
      id: "roentgen",
      label: "Röntgen & Security",
      desc: "Sicherheitskontrollen",
    },
    {
      id: "allgemein",
      label: "Allgemein",
      desc: "Sonstige Anfragen",
    },
  ];

  return (
    <fieldset>
      <legend className="form-label">Worum geht es?</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              aria-pressed={selected}
              className={`min-h-[64px] rounded-[10px] border px-4 py-3.5 text-left outline-none transition-[border-color,background-color,box-shadow,color] duration-200 ease-out ${
                selected
                  ? "border-[var(--focus)] bg-[color-mix(in_srgb,var(--focus)_10%,var(--card))] text-[var(--foreground)] shadow-[0_0_0_1px_var(--focus)]"
                  : "border-transparent bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-2)] focus-visible:border-[var(--focus)] focus-visible:shadow-[0_0_0_3px_var(--focus-ring)]"
              }`}
            >
              <span className="block text-[14px] font-normal">{opt.label}</span>
              <span className="mt-0.5 block text-[12px] text-[var(--muted)]">
                {opt.desc}
              </span>
            </button>
          );
        })}
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function FormCheckbox({
  checked,
  onChange,
  error,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          required
          aria-required="true"
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[var(--brand)]"
        />
        <span className="text-[13px] leading-relaxed text-[var(--muted)]">
          Ich habe die{" "}
          <a href="/datenschutz" className="link-underline text-[var(--foreground)]">
            Datenschutzhinweise
          </a>{" "}
          gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung der
          Anfrage zu.
        </span>
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
