/**
 * Wenige Wiederholungen mit Backoff für Aufrufe nach außen (Supabase-Lese-
 * zugriffe, Resend, Twilio, Web Push, Webhook) — ein einzelner Timeout oder
 * transienter Fehler (z. B. kurzzeitige 5xx-Antworten) soll nicht sofort
 * eine Leseanfrage scheitern lassen oder eine Benachrichtigung verlieren.
 *
 * Nur für Aufrufer gedacht, bei denen eine doppelte Ausführung unkritisch
 * ist — reine Lesezugriffe, oder Versand an Kanäle, die eine gelegentliche
 * doppelte Zustellung klaglos vertragen. Nicht blind auf Aufrufe anwenden,
 * die bei einem verlorenen Erfolgs-Response echte Duplikate anlegen würden
 * (z. B. das erstmalige Anlegen einer Anfrage).
 */
/** Wirft `fn()` diesen Fehler, bricht withRetry sofort ab statt es erneut zu
 *  versuchen — für Antworten, die ein Wiederholen nicht lösen kann (z. B.
 *  ein 4xx wie falscher API-Key oder ungültiger Empfänger). */
export class NonRetryableError extends Error {}

export async function withRetry<T>(
  fn: () => Promise<T>,
  { attempts = 3, baseDelayMs = 300 }: { attempts?: number; baseDelayMs?: number } = {},
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (error instanceof NonRetryableError) break;
      if (attempt < attempts - 1) {
        const delay = baseDelayMs * 2 ** attempt + Math.random() * baseDelayMs;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}
