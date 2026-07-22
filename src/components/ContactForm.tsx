"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/Button";
import {
  FormCheckbox,
  FormField,
  FormTextarea,
  TopicSelector,
} from "@/components/ui/FormFields";

type FormData = {
  topic: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL: FormData = {
  topic: "",
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  privacy: false,
};

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.topic) errors.topic = "Bitte wählen Sie ein Thema.";
  if (!data.firstName.trim()) errors.firstName = "Vorname ist erforderlich.";
  if (!data.lastName.trim()) errors.lastName = "Nachname ist erforderlich.";
  if (!data.email.trim()) {
    errors.email = "E-Mail ist erforderlich.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail ein.";
  }
  if (!data.message.trim()) {
    errors.message = "Bitte beschreiben Sie Ihr Anliegen.";
  } else if (data.message.trim().length < 20) {
    errors.message = "Mindestens 20 Zeichen für eine aussagekräftige Anfrage.";
  }
  if (!data.privacy) errors.privacy = "Zustimmung erforderlich.";
  return errors;
}

export function ContactForm() {
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [reference, setReference] = useState("");

  const patch = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const touch = (key: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const fieldErrors = validate(data);
    if (fieldErrors[key]) {
      setErrors((prev) => ({ ...prev, [key]: fieldErrors[key] }));
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(data);
    setErrors(nextErrors);
    setTouched({
      topic: true,
      firstName: true,
      lastName: true,
      email: true,
      message: true,
      privacy: true,
    });

    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; reference?: string; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Senden fehlgeschlagen");
      setReference(json.reference ?? "");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <div className="form-success-icon" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path
              d="M5 12.5 9.5 17 19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="heading-display text-[22px] text-[var(--foreground)]">
          Vielen Dank für Ihre Anfrage
        </h3>
        <p className="prose-muted mt-3 max-w-md text-[14px]">
          Wir haben Ihre Nachricht erhalten und melden uns in der Regel innerhalb
          eines Werktags. {reference && <>Referenz: <strong>{reference}</strong>.</>}
        </p>
        <button
          type="button"
          onClick={() => {
            setData(INITIAL);
            setErrors({});
            setTouched({});
            setStatus("idle");
            setReference("");
          }}
          className="mt-8 text-[13px] font-medium text-[var(--brand)] underline underline-offset-4 hover:opacity-80"
        >
          Weitere Anfrage senden
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="form-shell" noValidate>
      <div className="form-section">
        <TopicSelector
          value={data.topic}
          onChange={(v) => patch("topic", v)}
          error={touched.topic ? errors.topic : undefined}
        />
      </div>

      <div className="form-section">
        <p className="form-section-label">Ihre Kontaktdaten</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Vorname"
            name="firstName"
            required
            value={data.firstName}
            onChange={(v) => patch("firstName", v)}
            onBlur={() => touch("firstName")}
            error={touched.firstName ? errors.firstName : undefined}
            autoComplete="given-name"
          />
          <FormField
            label="Nachname"
            name="lastName"
            required
            value={data.lastName}
            onChange={(v) => patch("lastName", v)}
            onBlur={() => touch("lastName")}
            error={touched.lastName ? errors.lastName : undefined}
            autoComplete="family-name"
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <FormField
            label="Unternehmen"
            name="company"
            value={data.company}
            onChange={(v) => patch("company", v)}
            hint="Optional"
            autoComplete="organization"
          />
          <FormField
            label="E-Mail"
            name="email"
            type="email"
            required
            value={data.email}
            onChange={(v) => patch("email", v)}
            onBlur={() => touch("email")}
            error={touched.email ? errors.email : undefined}
            autoComplete="email"
          />
        </div>
        <div className="mt-4">
          <FormField
            label="Telefon"
            name="phone"
            type="tel"
            value={data.phone}
            onChange={(v) => patch("phone", v)}
            hint="Optional – für Rückfragen bei zeitkritischer Fracht"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="form-section">
        <FormTextarea
          label="Ihre Nachricht"
          name="message"
          required
          value={data.message}
          onChange={(v) => patch("message", v)}
          onBlur={() => touch("message")}
          error={touched.message ? errors.message : undefined}
        />
      </div>

      <div className="form-section form-section--tight border-0 pb-0">
        <FormCheckbox
          checked={data.privacy}
          onChange={(v) => patch("privacy", v)}
          error={touched.privacy ? errors.privacy : undefined}
        />
      </div>

      {status === "error" && (
        <p className="form-error mb-4" role="alert">
          Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut
          oder rufen Sie uns direkt an.
        </p>
      )}

      <div className="form-actions">
        <Button
          type="submit"
          arrow
          className={status === "loading" ? "pointer-events-none opacity-70" : ""}
        >
          {status === "loading" ? "Wird gesendet…" : "Anfrage absenden"}
        </Button>
        <p className="form-actions__hint">
          Antwort in der Regel innerhalb von 24 Stunden
        </p>
      </div>
    </form>
  );
}
