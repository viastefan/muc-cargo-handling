"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/Button";
import {
  FormCheckbox,
  FormField,
  FormTextarea,
} from "@/components/ui/FormFields";
import { CONSENT_COOKIE, CONSENT_EVENT, readCookie } from "@/lib/consent-cookies";

const TEASER_DISMISS_KEY = "muc-lead-teaser-dismissed";
const TEASER_DELAY_MS = 1800;

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
  website: string; // honeypot
};

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  privacy: false,
  website: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(data: FormState): Errors {
  const errors: Errors = {};
  if (!data.firstName.trim()) errors.firstName = "Erforderlich.";
  if (!data.lastName.trim()) errors.lastName = "Erforderlich.";
  if (!data.email.trim()) {
    errors.email = "E-Mail ist erforderlich.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
    errors.email = "Bitte gültige E-Mail eingeben.";
  }
  if (!data.message.trim()) {
    errors.message = "Bitte kurz Ihr Anliegen beschreiben.";
  } else if (data.message.trim().length < 20) {
    errors.message = "Mindestens 20 Zeichen.";
  }
  if (!data.privacy) errors.privacy = "Zustimmung erforderlich.";
  return errors;
}

function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

// Hydration-Snapshot nach demselben Muster wie CookieConsent.tsx statt
// setState in einem Effekt (vermeidet kaskadierende Renders).
function subscribeMounted() {
  return () => {};
}
function getMountedSnapshot() {
  return true;
}
function getServerMountedSnapshot() {
  return false;
}

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="lead-fab__icon">
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H10l-4.2 3.4a.6.6 0 0 1-.98-.47V16h-.32A2.5 2.5 0 0 1 4 13.5v-7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M8 8.75h8M8 11.75h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Schwebender Anfrage-Button unten rechts mit Teaser-Sprechblase, oeffnet
 * ein seitlich einschiebendes Kurzformular — auf Wunsch analog zum
 * Chat-Widget von AVS (airport-verpackungen.de), dort aber ein
 * proprietaeres Wix-Chat-Widget. Hier stattdessen ein eigenes, kompaktes
 * Anfrageformular auf denselben Feldern/Endpunkt wie /kontakt.
 *
 * Erscheint erst, nachdem die Cookie-Entscheidung getroffen wurde (beide
 * sitzen unten rechts) und nicht auf /kontakt selbst, wo das volle
 * Formular ohnehin direkt sichtbar ist.
 */
export function LeadCaptureWidget() {
  const pathname = usePathname();
  const consentDecided = useSyncExternalStore(
    subscribeConsent,
    () => readCookie(CONSENT_COOKIE) !== null,
    () => false,
  );

  const mounted = useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getServerMountedSnapshot,
  );
  const [teaserVisible, setTeaserVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (!consentDecided) return;
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(TEASER_DISMISS_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (dismissed) return;
    const timer = setTimeout(() => setTeaserVisible(true), TEASER_DELAY_MS);
    return () => clearTimeout(timer);
  }, [consentDecided]);

  const dismissTeaser = useCallback(() => {
    setTeaserVisible(false);
    try {
      sessionStorage.setItem(TEASER_DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const openDrawer = useCallback(() => {
    dismissTeaser();
    setOpen(true);
  }, [dismissTeaser]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const patch = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const touch = (key: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const fieldErrors = validate(data);
    if (fieldErrors[key]) setErrors((prev) => ({ ...prev, [key]: fieldErrors[key] }));
  };

  const resetForm = () => {
    setData(INITIAL);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setServerError("");
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors = validate(data);
    setErrors(nextErrors);
    setTouched({ firstName: true, lastName: true, email: true, message: true, privacy: true });
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, topic: "allgemein" }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Senden fehlgeschlagen");
      setStatus("success");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Senden fehlgeschlagen");
      setStatus("error");
    }
  }

  // Nicht auf /kontakt selbst — dort steht das vollstaendige Formular schon
  // direkt sichtbar auf der Seite, ein zweiter schwebender Einstieg waere
  // redundant. Vor der Cookie-Entscheidung ausgeblendet, da beide unten
  // rechts sitzen wuerden.
  if (!mounted || pathname === "/kontakt" || !consentDecided) return null;

  return (
    <>
      {teaserVisible && !open ? (
        <div className="lead-teaser" role="note">
          <button
            type="button"
            className="lead-teaser__close"
            aria-label="Hinweis schließen"
            onClick={dismissTeaser}
          >
            ×
          </button>
          <button type="button" className="lead-teaser__body" onClick={openDrawer}>
            <p className="lead-teaser__text">
              Kurze Frage zu Ihrer Sendung? Schreiben Sie uns direkt.
            </p>
            <span className="lead-teaser__cta">Anfrage stellen →</span>
          </button>
        </div>
      ) : null}

      <button
        type="button"
        className="lead-fab"
        aria-label="Kontaktformular öffnen"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={openDrawer}
      >
        <ChatBubbleIcon />
      </button>

      {open ? (
        <div className="lead-drawer" data-open="true">
          <button
            type="button"
            className="lead-drawer__backdrop"
            aria-label="Schließen"
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-drawer-title"
            className="lead-drawer__panel"
          >
            <div className="lead-drawer__handle-wrap" aria-hidden="true">
              <span className="lead-drawer__handle" />
            </div>

            <div className="lead-drawer__header">
              <div>
                <p className="lead-drawer__eyebrow">Direkt anfragen</p>
                <h2 id="lead-drawer-title" className="lead-drawer__title">
                  Schreiben Sie uns
                </h2>
              </div>
              <button
                type="button"
                className="lead-drawer__close"
                aria-label="Schließen"
                onClick={close}
              >
                ×
              </button>
            </div>

            <div className="lead-drawer__body">
              {status === "success" ? (
                <div className="form-success">
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
                  <h3 className="heading-display text-[20px] text-[var(--foreground)]">
                    Vielen Dank!
                  </h3>
                  <p className="prose-muted mt-2 text-[14px]">
                    Wir haben Ihre Nachricht erhalten und melden uns in der Regel innerhalb
                    eines Werktags.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-6 text-[13px] font-medium text-[var(--brand-text)] underline underline-offset-4 hover:opacity-80"
                  >
                    Weitere Anfrage senden
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="form-shell" noValidate>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <FormField
                      label="Vorname"
                      name="lead-firstName"
                      required
                      value={data.firstName}
                      onChange={(v) => patch("firstName", v)}
                      onBlur={() => touch("firstName")}
                      error={touched.firstName ? errors.firstName : undefined}
                      autoComplete="given-name"
                    />
                    <FormField
                      label="Nachname"
                      name="lead-lastName"
                      required
                      value={data.lastName}
                      onChange={(v) => patch("lastName", v)}
                      onBlur={() => touch("lastName")}
                      error={touched.lastName ? errors.lastName : undefined}
                      autoComplete="family-name"
                    />
                  </div>
                  <div className="mt-3">
                    <FormField
                      label="E-Mail"
                      name="lead-email"
                      type="email"
                      required
                      value={data.email}
                      onChange={(v) => patch("email", v)}
                      onBlur={() => touch("email")}
                      error={touched.email ? errors.email : undefined}
                      autoComplete="email"
                    />
                  </div>
                  <div className="mt-3">
                    <FormField
                      label="Telefon (optional)"
                      name="lead-phone"
                      type="tel"
                      value={data.phone}
                      onChange={(v) => patch("phone", v)}
                      autoComplete="tel"
                    />
                  </div>
                  <div className="mt-3">
                    <FormTextarea
                      label="Ihre Nachricht"
                      name="lead-message"
                      required
                      rows={3}
                      value={data.message}
                      onChange={(v) => patch("message", v)}
                      onBlur={() => touch("message")}
                      error={touched.message ? errors.message : undefined}
                    />
                  </div>
                  <div className="mt-3">
                    <FormCheckbox
                      checked={data.privacy}
                      onChange={(v) => patch("privacy", v)}
                      error={touched.privacy ? errors.privacy : undefined}
                    />
                  </div>

                  <div className="form-honeypot" aria-hidden="true">
                    <label htmlFor="lead-website">Website</label>
                    <input
                      id="lead-website"
                      name="website"
                      type="text"
                      value={data.website}
                      onChange={(event) => patch("website", event.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {status === "error" && (
                    <p className="form-error mt-3" role="alert">
                      {serverError || "Senden fehlgeschlagen. Bitte erneut versuchen."}
                    </p>
                  )}

                  <div className="mt-5">
                    <Button
                      type="submit"
                      arrow
                      fullWidth
                      disabled={status === "loading"}
                      aria-busy={status === "loading"}
                    >
                      {status === "loading" ? "Wird gesendet…" : "Anfrage absenden"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
