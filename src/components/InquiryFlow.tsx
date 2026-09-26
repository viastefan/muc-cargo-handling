"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { ButtonArrowIcon } from "@/components/ButtonArrowIcon";
import {
  closeInquiry,
  getInquiryOpen,
  getInquiryOpenServer,
  getInquiryTopic,
  subscribeInquiry,
  type InquiryTopic,
} from "@/lib/inquiry-store";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

/**
 * Anfrage-Flow: eine Frage pro Schritt statt eines langen Formulars.
 *
 * Desktop oeffnet als zentriertes Popup, ab Mobil als Bottom-Sheet mit
 * Greifer, das sich nach unten wegziehen laesst. Gesendet wird auf denselben
 * Endpunkt wie /kontakt (/api/contact) — die Seite bleibt als vollstaendige
 * Variante bestehen, dieser Flow ist der kurze Weg.
 */

const TOPICS: { id: InquiryTopic; label: string; desc: string }[] = [
  { id: "luftfracht", label: "Luftfracht Import & Export", desc: "Abfertigung, Dokumente, Zoll" },
  { id: "airline", label: "Airline Handling", desc: "Operative Abwicklung am Vorfeld" },
  { id: "roentgen", label: "Röntgen & Sicherheit", desc: "Kontrolle als reglementierter Beauftragter" },
  { id: "allgemein", label: "Etwas anderes", desc: "Allgemeine Anfrage" },
];

const STEPS = ["topic", "name", "contact", "message", "confirm"] as const;
type StepId = (typeof STEPS)[number];

const QUESTIONS: Record<StepId, { title: string; hint: string }> = {
  topic: {
    title: "Worum geht es?",
    hint: "Damit landet Ihre Anfrage direkt beim richtigen Ansprechpartner.",
  },
  name: {
    title: "Wie heißen Sie?",
    hint: "Damit wir Sie persönlich ansprechen können.",
  },
  contact: {
    title: "Wie erreichen wir Sie?",
    hint: "Rückmeldung in der Regel innerhalb eines Werktags.",
  },
  message: {
    title: "Was können wir für Sie tun?",
    hint: "Sendung, Zeitfenster, besondere Anforderungen – oder einfach überspringen.",
  },
  confirm: {
    title: "Passt alles?",
    hint: "Kurz prüfen, zustimmen, absenden.",
  },
};

const MESSAGE_MAX = 2000;
/** Ab hier ist der Griff aktiv und das Panel liegt als Sheet unten. */
const SHEET_QUERY = "(max-width: 767px)";
/** Zieh-Distanz, ab der das Sheet schliesst statt zurueckzufedern. */
const DISMISS_PX = 110;

type FormState = {
  topic: InquiryTopic | "";
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
  /** Honeypot — muss leer bleiben */
  website: string;
};

const INITIAL: FormState = {
  topic: "",
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  privacy: false,
  website: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

function validateStep(step: StepId, data: FormState): Errors {
  const errors: Errors = {};

  if (step === "topic" && !data.topic) {
    errors.topic = "Bitte ein Thema wählen.";
  }

  if (step === "name") {
    if (!data.firstName.trim()) errors.firstName = "Bitte Vornamen angeben.";
    if (!data.lastName.trim()) errors.lastName = "Bitte Nachnamen angeben.";
  }

  if (step === "contact") {
    if (!data.email.trim()) {
      errors.email = "E-Mail ist erforderlich.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) {
      errors.email = "Bitte eine gültige E-Mail eingeben.";
    }
  }

  // Der Nachrichten-Schritt lässt sich überspringen: Kontaktdaten und Thema
  // reichen für eine Anfrage, den Rest klärt der Rückruf.

  if (step === "confirm" && !data.privacy) {
    errors.privacy = "Zustimmung erforderlich.";
  }

  return errors;
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  optional,
  autoFocus,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}) {
  return (
    <label className={`inq-field${error ? " inq-field--error" : ""}`}>
      <span className="inq-field__label">
        {label}
        {optional ? <span className="inq-field__optional"> optional</span> : null}
      </span>
      <input
        className="inq-field__input"
        type={type}
        inputMode={type === "email" ? "email" : type === "tel" ? "tel" : undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        data-autofocus={autoFocus ? "true" : undefined}
      />
      {error ? (
        <span className="inq-field__error" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export function InquiryFlow() {
  const open = useSyncExternalStore(
    subscribeInquiry,
    getInquiryOpen,
    getInquiryOpenServer,
  );

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"fwd" | "back">("fwd");
  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState<string | null>(null);
  const [dragY, setDragY] = useState(0);

  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startY: number; pointerId: number } | null>(null);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = STEPS[index];
  const isLast = index === STEPS.length - 1;

  const reset = useCallback(() => {
    setIndex(0);
    setDirection("fwd");
    setData(INITIAL);
    setErrors({});
    setStatus("idle");
    setServerError("");
    setReference(null);
  }, []);

  const close = useCallback(() => {
    closeInquiry();
  }, []);

  // Beim Oeffnen: Zieh-Offset zuruecksetzen, abgeschickte Anfrage verwerfen
  // und ein vorgewaehltes Thema uebernehmen (dann startet der Flow bei der
  // Namensfrage). Halbfertige Eingaben bleiben dagegen erhalten — ein
  // versehentlicher Klick auf den Hintergrund soll sie nicht loeschen.
  //
  // Bewusst waehrend des Renders angepasst statt in einem Effekt (React-
  // Pattern "Adjusting state when a prop changes") — vermeidet einen
  // unnoetigen zusaetzlichen Commit nach dem Oeffnen.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setDragY(0);
      setStatus((previous) => (previous === "success" ? "idle" : previous));
      const requested = getInquiryTopic();
      if (requested) {
        setData((previous) =>
          previous.topic === requested ? previous : { ...previous, topic: requested },
        );
        setIndex((previous) => (previous === 0 ? 1 : previous));
      }
    }
  }

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      unlockScroll();
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  // Fokus auf das erste Feld des Schritts — aber nur mit Maus/Trackpad.
  // Auf Touch wuerde sonst bei jedem Schritt die Tastatur hochspringen und
  // das Sheet zusammenschieben.
  useEffect(() => {
    if (!open || status === "success") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const target = panelRef.current?.querySelector<HTMLElement>("[data-autofocus]");
    const timer = setTimeout(() => target?.focus(), 60);
    return () => clearTimeout(timer);
  }, [open, index, status]);

  useEffect(() => {
    return () => {
      if (advanceRef.current) clearTimeout(advanceRef.current);
    };
  }, []);

  const patch = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!(key in previous)) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }, []);

  const goBack = useCallback(() => {
    setErrors({});
    setDirection("back");
    setIndex((previous) => Math.max(0, previous - 1));
  }, []);

  const submit = useCallback(async (payload: FormState) => {
    setStatus("loading");
    setServerError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "inquiry-flow" }),
      });
      const json = (await response.json()) as {
        ok?: boolean;
        error?: string;
        reference?: string;
      };
      if (!response.ok || !json.ok) throw new Error(json.error ?? "Senden fehlgeschlagen");
      setReference(json.reference ?? null);
      setStatus("success");
      // Formular sofort zuruecksetzen — der Erfolgs-Screen zeigt ohnehin nur
      // eine statische Dankesnachricht. So startet der Flow beim naechsten
      // Oeffnen wieder bei Schritt 1 (Status wird dort separat zurueckgesetzt).
      setData(INITIAL);
      setIndex(0);
      setErrors({});
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Senden fehlgeschlagen");
      setStatus("error");
    }
  }, []);

  const goNext = useCallback(
    (override?: Partial<FormState>) => {
      const next = override ? { ...data, ...override } : data;
      const stepErrors = validateStep(step, next);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
      setErrors({});
      if (isLast) {
        void submit(next);
        return;
      }
      setDirection("fwd");
      setIndex((previous) => Math.min(STEPS.length - 1, previous + 1));
    },
    [data, step, isLast, submit],
  );

  const chooseTopic = useCallback(
    (topic: InquiryTopic) => {
      patch("topic", topic);
      if (advanceRef.current) clearTimeout(advanceRef.current);
      // Kurze Verzoegerung, damit die Auswahl noch sichtbar aufleuchtet.
      advanceRef.current = setTimeout(() => goNext({ topic }), 160);
    },
    [patch, goNext],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== "Enter") return;
      const target = event.target as HTMLElement;
      const isTextarea = target.tagName === "TEXTAREA";
      // Im Freitext bleibt Enter ein Zeilenumbruch, Cmd/Ctrl+Enter geht weiter.
      if (isTextarea && !(event.metaKey || event.ctrlKey)) return;
      if (target.tagName === "BUTTON" || target.tagName === "A") return;
      event.preventDefault();
      goNext();
    },
    [goNext],
  );

  const onGripDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia(SHEET_QUERY).matches) return;
    dragRef.current = { startY: event.clientY, pointerId: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const onGripMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setDragY(Math.max(0, event.clientY - drag.startY));
  }, []);

  const onGripUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      const distance = Math.max(0, event.clientY - drag.startY);
      dragRef.current = null;
      setDragY(0);
      if (distance > DISMISS_PX) close();
    },
    [close],
  );

  const summary = useMemo(
    () => [
      { label: "Thema", value: TOPICS.find((t) => t.id === data.topic)?.label ?? "—" },
      {
        label: "Name",
        value: [data.firstName, data.lastName].filter(Boolean).join(" ") || "—",
      },
      { label: "Firma", value: data.company.trim() || "—" },
      { label: "E-Mail", value: data.email.trim() || "—" },
      { label: "Telefon", value: data.phone.trim() || "—" },
      ...(data.message.trim()
        ? [{ label: "Nachricht", value: data.message.trim() }]
        : []),
    ],
    [data],
  );

  if (!open) return null;

  const question = QUESTIONS[step];
  const messageLength = data.message.trim().length;

  return (
    <div className="inq" role="presentation">
      <button
        type="button"
        className="inq__backdrop"
        aria-label="Anfrage schließen"
        onClick={close}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="inq-question"
        className="inq__panel"
        data-dragging={dragY > 0 ? "true" : undefined}
        style={dragY > 0 ? { transform: `translate3d(0, ${dragY}px, 0)` } : undefined}
        onKeyDown={onKeyDown}
      >
        <div
          className="inq__grip"
          onPointerDown={onGripDown}
          onPointerMove={onGripMove}
          onPointerUp={onGripUp}
          onPointerCancel={onGripUp}
        >
          <span className="inq__grip-bar" aria-hidden="true" />
        </div>

        <div className="inq__head">
          <p className="inq__title heading-display">Anfrage stellen</p>
          <button type="button" className="inq__close" aria-label="Schließen" onClick={close}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div
          className="inq__progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={STEPS.length}
          aria-valuenow={status === "success" ? STEPS.length : index + 1}
          aria-label="Fortschritt"
        >
          {STEPS.map((id, i) => (
            <span
              key={id}
              className="inq__progress-seg"
              data-done={status === "success" || i <= index ? "true" : undefined}
            />
          ))}
        </div>

        {status === "success" ? (
          <div className="inq__stage">
            <div className="inq__step" data-dir="fwd">
              <div className="inq__done-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12.5 9.5 17 19 7"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 id="inq-question" className="inq__question">
                Danke – wir haben Ihre Anfrage.
              </h2>
              <p className="inq__hint">
                Wir melden uns in der Regel innerhalb eines Werktags bei Ihnen.
              </p>
              {reference ? (
                <p className="inq__reference">
                  Ihre Referenz: <strong>{reference}</strong>
                </p>
              ) : null}
              <div className="inq__done-actions">
                <button type="button" className="inq__next" onClick={close}>
                  <span>Schließen</span>
                  <ButtonArrowIcon light className="inq__next-arrow" />
                </button>
                <button type="button" className="inq__ghost" onClick={reset}>
                  Weitere Anfrage
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="inq__stage">
              <div className="inq__step" key={step} data-dir={direction}>
                <p className="inq__counter">
                  Schritt {index + 1} von {STEPS.length}
                </p>
                <h2 id="inq-question" className="inq__question">
                  {question.title}
                </h2>
                <p className="inq__hint">{question.hint}</p>

                <div className="inq__fields">
                  {step === "topic" ? (
                    <div className="inq__choices">
                      {TOPICS.map((topic, topicIndex) => (
                        <button
                          key={topic.id}
                          type="button"
                          className="inq__choice"
                          aria-pressed={data.topic === topic.id}
                          onClick={() => chooseTopic(topic.id)}
                          data-autofocus={topicIndex === 0 ? "true" : undefined}
                        >
                          <span className="inq__choice-key" aria-hidden="true">
                            {String.fromCharCode(65 + topicIndex)}
                          </span>
                          <span className="inq__choice-text">
                            <span className="inq__choice-label">{topic.label}</span>
                            <span className="inq__choice-desc">{topic.desc}</span>
                          </span>
                        </button>
                      ))}
                      {errors.topic ? (
                        <p className="inq-field__error" role="alert">
                          {errors.topic}
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {step === "name" ? (
                    <>
                      <div className="inq__row">
                        <Field
                          label="Vorname"
                          value={data.firstName}
                          onChange={(v) => patch("firstName", v)}
                          error={errors.firstName}
                          autoComplete="given-name"
                          autoFocus
                        />
                        <Field
                          label="Nachname"
                          value={data.lastName}
                          onChange={(v) => patch("lastName", v)}
                          error={errors.lastName}
                          autoComplete="family-name"
                        />
                      </div>
                      <Field
                        label="Firma"
                        optional
                        value={data.company}
                        onChange={(v) => patch("company", v)}
                        autoComplete="organization"
                      />
                    </>
                  ) : null}

                  {step === "contact" ? (
                    <>
                      <Field
                        label="E-Mail"
                        type="email"
                        value={data.email}
                        onChange={(v) => patch("email", v)}
                        error={errors.email}
                        autoComplete="email"
                        placeholder="name@firma.de"
                        autoFocus
                      />
                      <Field
                        label="Telefon"
                        type="tel"
                        optional
                        value={data.phone}
                        onChange={(v) => patch("phone", v)}
                        autoComplete="tel"
                      />
                    </>
                  ) : null}

                  {step === "message" ? (
                    <label
                      className={`inq-field${errors.message ? " inq-field--error" : ""}`}
                    >
                      <span className="inq-field__label">
                        Ihre Nachricht
                        <span className="inq-field__optional"> optional</span>
                      </span>
                      <textarea
                        className="inq-field__input inq-field__input--area"
                        rows={5}
                        value={data.message}
                        maxLength={MESSAGE_MAX}
                        onChange={(event) =>
                          patch("message", event.target.value.slice(0, MESSAGE_MAX))
                        }
                        placeholder="Sendung, Zeitfenster, besondere Anforderungen…"
                        aria-invalid={Boolean(errors.message)}
                        data-autofocus="true"
                      />
                      <span className="inq-field__meta">
                        {errors.message ? (
                          <span className="inq-field__error" role="alert">
                            {errors.message}
                          </span>
                        ) : (
                          <span className="inq-field__counter">
                            {messageLength
                              ? `${messageLength} Zeichen`
                              : "Sie können diesen Schritt überspringen"}
                          </span>
                        )}
                      </span>
                    </label>
                  ) : null}

                  {step === "confirm" ? (
                    <>
                      <dl className="inq__summary">
                        {summary.map((row) => (
                          <div key={row.label} className="inq__summary-row">
                            <dt>{row.label}</dt>
                            <dd>{row.value}</dd>
                          </div>
                        ))}
                      </dl>
                      <label
                        className={`inq__consent${errors.privacy ? " inq__consent--error" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={data.privacy}
                          onChange={(event) => patch("privacy", event.target.checked)}
                          data-autofocus="true"
                        />
                        <span>
                          Ich habe die{" "}
                          <a href="/datenschutz" target="_blank" rel="noreferrer">
                            Datenschutzhinweise
                          </a>{" "}
                          gelesen und stimme der Verarbeitung meiner Angaben zu.
                        </span>
                      </label>
                      {errors.privacy ? (
                        <p className="inq-field__error" role="alert">
                          {errors.privacy}
                        </p>
                      ) : null}
                    </>
                  ) : null}

                  <div className="inq__honeypot" aria-hidden="true">
                    <label htmlFor="inq-website">Website</label>
                    <input
                      id="inq-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={data.website}
                      onChange={(event) => patch("website", event.target.value)}
                    />
                  </div>
                </div>

                {status === "error" ? (
                  <p className="inq__server-error" role="alert">
                    {serverError || "Senden fehlgeschlagen. Bitte erneut versuchen."}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="inq__foot">
              <button
                type="button"
                className="inq__ghost"
                onClick={goBack}
                disabled={index === 0}
              >
                Zurück
              </button>

              <div className="inq__foot-right">
                <span className="inq__enter-hint" aria-hidden="true">
                  <kbd>{step === "message" ? "⌘ + ⏎" : "⏎"}</kbd>
                </span>
                <button
                  type="button"
                  className="inq__next"
                  onClick={() => goNext()}
                  disabled={status === "loading"}
                  aria-busy={status === "loading"}
                >
                  <span>
                    {status === "loading"
                      ? "Wird gesendet…"
                      : isLast
                        ? "Anfrage absenden"
                        : "Weiter"}
                  </span>
                  <ButtonArrowIcon light className="inq__next-arrow" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
