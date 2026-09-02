"use client";

import { useSyncExternalStore } from "react";
import { applyTheme, readStoredTheme, THEME_EVENT, type Theme } from "@/lib/theme";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(THEME_EVENT, onStoreChange);
  return () => window.removeEventListener(THEME_EVENT, onStoreChange);
}

function getSnapshot(): Theme {
  return readStoredTheme();
}

function getServerSnapshot(): Theme {
  return "dark";
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="theme-toggle__icon">
      <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="theme-toggle__icon">
      <path
        d="M20.2 14.4A8.5 8.5 0 0 1 9.6 3.8a8.5 8.5 0 1 0 10.6 10.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Schalter fuer Hell/Dunkel, unten im Footer. Die Seite startet standard-
 * maessig im Dunkelmodus (siehe THEME_BOOTSTRAP_SCRIPT in layout.tsx); wer
 * hier auf Hell wechselt, bekommt das per localStorage gemerkt.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Zu hellem Design wechseln" : "Zu dunklem Design wechseln"}
      className={`theme-toggle ${className}`.trim()}
      onClick={() => applyTheme(isDark ? "light" : "dark")}
    >
      <SunIcon />
      <MoonIcon />
      <span className="theme-toggle__thumb" aria-hidden="true" />
    </button>
  );
}
