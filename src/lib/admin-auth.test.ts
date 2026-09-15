import { describe, expect, it, vi } from "vitest";
import {
  ROOT_UID,
  adminConfigured,
  createSessionToken,
  readSessionPayload,
  verifyMasterPassword,
} from "./admin-auth";

describe("admin-auth", () => {
  it("is configured from the test env's ADMIN_PASSWORD", () => {
    expect(adminConfigured).toBe(true);
  });

  it("verifies the master password and rejects a wrong one", () => {
    expect(verifyMasterPassword("test-only-admin-password-1234")).toBe(true);
    expect(verifyMasterPassword("wrong-password")).toBe(false);
  });

  it("round-trips a session token", () => {
    const token = createSessionToken("user-123", 42);
    const session = readSessionPayload(token);
    expect(session).toEqual({ uid: "user-123", tokenVersion: 42 });
  });

  it("round-trips the root uid", () => {
    const token = createSessionToken(ROOT_UID, 0);
    expect(readSessionPayload(token)?.uid).toBe(ROOT_UID);
  });

  it("rejects a token with a tampered payload", () => {
    const token = createSessionToken("user-123", 0);
    const parts = token.split(".");
    // uid-Segment aendern, Signatur unveraendert lassen.
    parts[1] = "attacker-uid";
    expect(readSessionPayload(parts.join("."))).toBeNull();
  });

  it("rejects a token with a tampered signature", () => {
    const token = createSessionToken("user-123", 0);
    const parts = token.split(".");
    parts[4] = parts[4].slice(0, -1) + (parts[4].endsWith("A") ? "B" : "A");
    expect(readSessionPayload(parts.join("."))).toBeNull();
  });

  it("rejects an expired token", () => {
    vi.useFakeTimers();
    try {
      const token = createSessionToken("user-123", 0);
      vi.advanceTimersByTime(9 * 60 * 60 * 1000); // 9h > 8h TTL
      expect(readSessionPayload(token)).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });

  it("rejects malformed tokens", () => {
    expect(readSessionPayload(null)).toBeNull();
    expect(readSessionPayload("")).toBeNull();
    expect(readSessionPayload("not.enough.parts")).toBeNull();
    expect(readSessionPayload("a.b.c.d.e.f")).toBeNull();
  });
});
