import { createHash } from "node:crypto";

/** Erste IP aus den Proxy-Headern (Vercel setzt x-forwarded-for). */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Gehashte IP für Missbrauchsanalyse — kein Klartext in der Datenbank.
 * Ohne `IP_HASH_SALT` wird ein fixer Prozess-Salt genutzt (weniger stabil,
 * aber nie eine rückrechenbare Klartext-IP).
 */
const SALT = process.env.IP_HASH_SALT?.trim() || "muc-cargo-inquiry-v1";

export function hashIp(ip: string): string | null {
  if (!ip || ip === "unknown") return null;
  return createHash("sha256").update(`${SALT}:${ip}`).digest("hex").slice(0, 32);
}

/** Fixed-window Rate-Limiter im Speicher (pro Instanz). */
export class RateLimiter {
  private readonly hits = new Map<string, { count: number; resetAt: number }>();

  constructor(
    private readonly windowMs: number,
    private readonly max: number,
  ) {}

  check(key: string): { ok: boolean; retryAfter: number } {
    const now = Date.now();
    const entry = this.hits.get(key);
    if (!entry || now >= entry.resetAt) {
      this.hits.set(key, { count: 1, resetAt: now + this.windowMs });
      return { ok: true, retryAfter: 0 };
    }
    if (entry.count >= this.max) {
      return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
    }
    entry.count += 1;
    return { ok: true, retryAfter: 0 };
  }
}
