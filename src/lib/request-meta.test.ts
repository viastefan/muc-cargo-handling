import { afterEach, describe, expect, it, vi } from "vitest";
import { RateLimiter, clientIp, hashIp } from "./request-meta";

describe("RateLimiter", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows up to the configured limit, then blocks", () => {
    const limiter = new RateLimiter(60_000, 3);
    expect(limiter.check("a").ok).toBe(true);
    expect(limiter.check("a").ok).toBe(true);
    expect(limiter.check("a").ok).toBe(true);
    const fourth = limiter.check("a");
    expect(fourth.ok).toBe(false);
    expect(fourth.retryAfter).toBeGreaterThan(0);
  });

  it("tracks separate keys independently", () => {
    const limiter = new RateLimiter(60_000, 1);
    expect(limiter.check("a").ok).toBe(true);
    expect(limiter.check("b").ok).toBe(true);
    expect(limiter.check("a").ok).toBe(false);
  });

  it("resets once the window passes", () => {
    vi.useFakeTimers();
    const limiter = new RateLimiter(60_000, 1);
    expect(limiter.check("a").ok).toBe(true);
    expect(limiter.check("a").ok).toBe(false);
    vi.advanceTimersByTime(60_001);
    expect(limiter.check("a").ok).toBe(true);
  });
});

describe("hashIp", () => {
  it("is deterministic for the same input", () => {
    expect(hashIp("203.0.113.5")).toBe(hashIp("203.0.113.5"));
  });

  it("differs for different inputs", () => {
    expect(hashIp("203.0.113.5")).not.toBe(hashIp("203.0.113.6"));
  });

  it("never returns the plaintext IP", () => {
    const hash = hashIp("203.0.113.5");
    expect(hash).not.toContain("203.0.113.5");
  });

  it("returns null for an unknown/empty IP instead of hashing a placeholder", () => {
    expect(hashIp("unknown")).toBeNull();
    expect(hashIp("")).toBeNull();
  });
});

describe("clientIp", () => {
  it("takes the first entry of x-forwarded-for", () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.5, 70.41.3.18, 150.172.238.178" },
    });
    expect(clientIp(request)).toBe("203.0.113.5");
  });

  it("falls back to x-real-ip", () => {
    const request = new Request("http://localhost", {
      headers: { "x-real-ip": "203.0.113.9" },
    });
    expect(clientIp(request)).toBe("203.0.113.9");
  });

  it("returns 'unknown' when neither header is present", () => {
    const request = new Request("http://localhost");
    expect(clientIp(request)).toBe("unknown");
  });
});
