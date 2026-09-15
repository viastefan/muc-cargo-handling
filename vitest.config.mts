import { defineConfig } from "vitest/config";
import path from "node:path";

/**
 * Nur für die paar sicherheitskritischen, reinen Funktionen gedacht, bei
 * denen ein stiller Regressionsfehler ein echtes Sicherheitsproblem wäre
 * (Session-Tokens, Passwort-Hashing, Rate-Limiter, CSV-/HTML-Escaping) —
 * keine breite Coverage, kein Component-/Integrationstest-Aufbau.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    // Module wie admin-auth.ts lesen process.env.ADMIN_PASSWORD beim Import
    // (Modul-Top-Level) — hier setzen, bevor irgendein Testfile importiert,
    // statt sich auf Reihenfolge einzelner Tests zu verlassen.
    env: {
      ADMIN_PASSWORD: "test-only-admin-password-1234",
      ADMIN_SESSION_SECRET: "test-only-session-secret-0123456789abcdef",
    },
  },
});
