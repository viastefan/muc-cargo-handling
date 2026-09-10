"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { openInquiry } from "@/lib/inquiry-store";
import { CONSENT_COOKIE, CONSENT_EVENT, readCookie } from "@/lib/consent-cookies";

const TEASER_DISMISS_KEY = "muc-lead-teaser-dismissed";
const TEASER_DELAY_MS = 1800;

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

function ChatBubbleIcon({ className = "lead-fab__icon" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
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

/** Runder Avatar-Chip — gibt dem Widget im Teaser und im Formular-Header
 * ein wiederkehrendes "Gesicht" statt einer nackten Sprechblase. */
function WidgetAvatar() {
  return (
    <span className="lead-avatar" aria-hidden="true">
      <ChatBubbleIcon className="lead-avatar__icon" />
    </span>
  );
}

/**
 * Schwebender Einstieg unten rechts (Launcher + Teaser-Sprechblase). Oeffnet
 * denselben Anfrage-Flow wie der Header-CTA — bewusst ein Formular fuer die
 * ganze Seite statt zweier leicht unterschiedlicher.
 *
 * Erscheint erst, nachdem die Cookie-Entscheidung getroffen wurde (beide
 * sitzen unten rechts) und nicht auf /kontakt selbst, wo das volle Formular
 * ohnehin direkt sichtbar ist.
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

  useEffect(() => {
    if (!consentDecided) return;
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(TEASER_DISMISS_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (dismissed) return;

    // Erst zeigen, wenn der Hero durchgescrollt ist — sonst konkurriert die
    // Sprechblase unten rechts mit dem Telefon-Feld im Hero.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const past = () => window.scrollY > window.innerHeight * 0.6;
    const reveal = () => {
      timer = setTimeout(() => setTeaserVisible(true), TEASER_DELAY_MS);
    };
    if (past()) {
      reveal();
      return () => timer && clearTimeout(timer);
    }
    const onScroll = () => {
      if (past()) {
        window.removeEventListener("scroll", onScroll);
        reveal();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, [consentDecided]);

  const dismissTeaser = useCallback(() => {
    setTeaserVisible(false);
    try {
      sessionStorage.setItem(TEASER_DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const launch = useCallback(() => {
    dismissTeaser();
    openInquiry();
  }, [dismissTeaser]);

  if (!mounted || pathname === "/kontakt" || !consentDecided) return null;

  return (
    <>
      {teaserVisible ? (
        <div className="lead-teaser" role="note">
          <button
            type="button"
            className="lead-teaser__close"
            aria-label="Hinweis schließen"
            onClick={dismissTeaser}
          >
            ×
          </button>
          <button type="button" className="lead-teaser__body" onClick={launch}>
            <WidgetAvatar />
            <span className="lead-teaser__content">
              <span className="lead-teaser__text">
                Kurze Frage zu Ihrer Sendung? Schreiben Sie uns direkt.
              </span>
              <span className="lead-teaser__cta">Anfrage stellen →</span>
            </span>
          </button>
        </div>
      ) : null}

      <button
        type="button"
        className="lead-fab"
        aria-label="Anfrage stellen"
        aria-haspopup="dialog"
        onClick={launch}
      >
        <ChatBubbleIcon />
      </button>
    </>
  );
}
