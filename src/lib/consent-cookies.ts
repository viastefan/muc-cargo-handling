export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

export const CONSENT_COOKIE = "muc_consent";
export const ANALYTICS_COOKIE = "muc_analytics";
export const MARKETING_COOKIE = "muc_marketing";
export const CONSENT_EVENT = "muc:cookie-consent";

/** 6 months — typical consent lifetime */
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
const LEGACY_STORAGE_KEY = "muc-cookie-consent-v1";

function isSecureContext() {
  return typeof window !== "undefined" && window.location.protocol === "https:";
}

function cookieAttributes(maxAge = CONSENT_MAX_AGE) {
  const parts = [`Path=/`, `Max-Age=${maxAge}`, `SameSite=Lax`];
  if (isSecureContext()) parts.push("Secure");
  return parts.join("; ");
}

export function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const prefix = `${encodeURIComponent(name)}=`;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(prefix));
  if (!match) return null;
  try {
    return decodeURIComponent(match.slice(prefix.length));
  } catch {
    return match.slice(prefix.length);
  }
}

export function writeCookie(name: string, value: string, maxAge = CONSENT_MAX_AGE) {
  if (typeof document === "undefined") return;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ${cookieAttributes(maxAge)}`;
}

export function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  const base = `${encodeURIComponent(name)}=; Path=/; Max-Age=0; SameSite=Lax`;
  document.cookie = isSecureContext() ? `${base}; Secure` : base;
}

export function serializeConsent(state: ConsentState) {
  return [
    "v1",
    state.analytics ? "a1" : "a0",
    state.marketing ? "m1" : "m0",
    `t${state.decidedAt}`,
  ].join("|");
}

export function parseConsentValue(raw: string | null): ConsentState | null {
  if (!raw) return null;

  // Compact cookie format: v1|a0|m1|t2026-...
  if (raw.startsWith("v1|")) {
    const parts = raw.split("|");
    const analytics = parts.includes("a1");
    const marketing = parts.includes("m1");
    const ts = parts.find((part) => part.startsWith("t"))?.slice(1) ?? "";
    return {
      necessary: true,
      analytics,
      marketing,
      decidedAt: ts || new Date().toISOString(),
    };
  }

  // Legacy JSON (localStorage migration)
  try {
    const parsed = JSON.parse(raw) as ConsentState;
    if (!parsed || typeof parsed !== "object") return null;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      decidedAt: typeof parsed.decidedAt === "string" ? parsed.decidedAt : "",
    };
  } catch {
    return null;
  }
}

export function readConsent(): ConsentState | null {
  const fromCookie = parseConsentValue(readCookie(CONSENT_COOKIE));
  if (fromCookie) return fromCookie;

  // One-time migration from older localStorage consent
  if (typeof window === "undefined") return null;
  try {
    const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    const migrated = parseConsentValue(legacy);
    if (migrated) {
      persistConsent(migrated);
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      return migrated;
    }
  } catch {
    // ignore storage access errors
  }
  return null;
}

export function persistConsent(state: ConsentState) {
  writeCookie(CONSENT_COOKIE, serializeConsent(state));

  if (state.analytics) {
    writeCookie(ANALYTICS_COOKIE, "1");
  } else {
    deleteCookie(ANALYTICS_COOKIE);
  }

  if (state.marketing) {
    writeCookie(MARKETING_COOKIE, "1");
  } else {
    deleteCookie(MARKETING_COOKIE);
  }

  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // ignore
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
  }
}

export function hasAnalyticsConsent(state: ConsentState | null = readConsent()) {
  return Boolean(state?.analytics);
}

export function hasMarketingConsent(state: ConsentState | null = readConsent()) {
  return Boolean(state?.marketing);
}
