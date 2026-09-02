export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "muc-theme";
export const THEME_EVENT = "muc:theme-change";
/** Ohne gespeicherte Wahl gilt Dunkelmodus als Standard – unabhängig vom
 *  Systemschema. Wer explizit auf Hell wechselt, bekommt das gemerkt. */
export const DEFAULT_THEME: Theme = "dark";

/**
 * Wird als Inline-Skript im <head> ausgeführt (siehe layout.tsx), noch vor
 * dem ersten Paint. Verhindert einen hell/dunkel-Flash beim Laden.
 */
export const THEME_BOOTSTRAP_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var theme = stored === "light" ? "light" : "${DEFAULT_THEME}";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "${DEFAULT_THEME}");
  }
})();
`;

export function readStoredTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }));
}
