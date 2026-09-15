import { describe, expect, it } from "vitest";
import { dummyPasswordCost, generatePassword, hashPassword, verifyPassword } from "./admin-users";

describe("admin-users password hashing", () => {
  it("round-trips a password through hash/verify", async () => {
    const hash = await hashPassword("correct horse battery staple");
    await expect(verifyPassword("correct horse battery staple", hash)).resolves.toBe(true);
  });

  it("rejects the wrong password", async () => {
    const hash = await hashPassword("correct horse battery staple");
    await expect(verifyPassword("wrong password", hash)).resolves.toBe(false);
  });

  it("produces a different salt (and hash) each time for the same password", async () => {
    const a = await hashPassword("same-password");
    const b = await hashPassword("same-password");
    expect(a).not.toBe(b);
    await expect(verifyPassword("same-password", a)).resolves.toBe(true);
    await expect(verifyPassword("same-password", b)).resolves.toBe(true);
  });

  it("fails closed on a malformed stored hash instead of throwing", async () => {
    await expect(verifyPassword("anything", "not-a-valid-hash")).resolves.toBe(false);
    await expect(verifyPassword("anything", "")).resolves.toBe(false);
  });

  it("dummyPasswordCost resolves without throwing (constant-time-cost path)", async () => {
    await expect(dummyPasswordCost("whatever")).resolves.toBeUndefined();
  });
});

describe("admin-users generatePassword", () => {
  it("matches the expected shape: 3 blocks of 4 unambiguous characters", () => {
    const pw = generatePassword();
    expect(pw).toMatch(/^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4}-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4}-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4}$/);
  });

  it("does not repeat across calls (sanity check on the random source)", () => {
    const passwords = new Set(Array.from({ length: 20 }, () => generatePassword()));
    expect(passwords.size).toBe(20);
  });
});
