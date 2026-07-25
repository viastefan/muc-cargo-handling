import { createHash, pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

export function hashPassword(password: string, saltHex: string, iterations: number) {
  return pbkdf2Sync(password, saltHex, iterations, 32, "sha256").toString("hex");
}

export function createPasswordRecord(password: string, iterations = 120_000) {
  const salt = randomBytes(16).toString("hex");
  const hash = hashPassword(password, salt, iterations);
  return { salt, hash, iterations };
}

export function verifyPassword(
  password: string,
  saltHex: string,
  expectedHashHex: string,
  iterations: number,
) {
  const actual = Buffer.from(hashPassword(password, saltHex, iterations), "hex");
  const expected = Buffer.from(expectedHashHex, "hex");
  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}

export function signPayload(payload: string, secret: string) {
  return createHash("sha256").update(`${payload}.${secret}`).digest("hex");
}

export function newId(prefix: string) {
  return `${prefix}_${randomBytes(6).toString("hex")}`;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
