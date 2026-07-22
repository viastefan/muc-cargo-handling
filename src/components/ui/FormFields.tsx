"use client";

import { useId } from "react";

const inputBase =
  "w-full border border-transparent bg-[var(--surface)] px-4 py-3.5 text-[15px] text-[var(--foreground)] outline-none transition-[border-color,box-shadow,background] placeholder:text-[var(--muted-light)] focus:border-[var(--border)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(217,13,58,0.08)]";

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
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-[var(--brand)]"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${inputBase} ${error ? "border-[var(--brand)]/40 bg-white" : ""}`}
      />
      {error && (
        <p id={`${id}-error`} className="form-error" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="form-hint">
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
      <div className="mb-2 flex items-end justify-between gap-4">
        <label htmlFor={id} className="form-label mb-0">
          {label}
          {required && <span className="text-[var(--brand)]"> *</span>}
        </label>
        <span className="text-[11px] tabular-nums text-[var(--muted-light)]">
          {remaining}
        </span>
      </div>
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
        placeholder="Beschreiben Sie Sendung, Zeitfenster, besondere Anforderungen…"
        className={`${inputBase} resize-y min-h-[140px] ${error ? "border-[var(--brand)]/40 bg-white" : ""}`}
      />
      {error && (
        <p id={`${id}-error`} className="form-error" role="alert">
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
              className={`rounded-none border px-4 py-3.5 text-left transition-all duration-300 ease-out ${
                selected
                  ? "border-[var(--foreground)] bg-[var(--foreground)] text-white scale-[1.01]"
                  : "border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--muted-light)] hover:bg-[var(--surface)] active:scale-[0.99]"
              }`}
            >
              <span className="block text-[14px] font-normal">{opt.label}</span>
              <span
                className={`mt-0.5 block text-[12px] ${
                  selected ? "text-white/75" : "text-[var(--muted)]"
                }`}
              >
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
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[var(--brand)]"
        />
        <span className="text-[13px] leading-relaxed text-[var(--muted)]">
          Ich habe die{" "}
          <a href="/kontakt#datenschutz" className="link-underline text-[var(--foreground)]">
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
