import {
  createCipheriv,
  createECDH,
  createHmac,
  createPrivateKey,
  createSign,
  randomBytes,
} from "node:crypto";

/**
 * Web Push ohne Fremd-Bibliothek: Payload-Verschlüsselung nach RFC 8291
 * (aes128gcm) und VAPID-Authentifizierung nach RFC 8292 (ES256-JWT).
 */

const P256 = "prime256v1";

function hkdf(salt: Buffer, ikm: Buffer, info: Buffer, length: number): Buffer {
  const prk = createHmac("sha256", salt).update(ikm).digest();
  const output = createHmac("sha256", prk)
    .update(Buffer.concat([info, Buffer.from([1])]))
    .digest();
  return output.subarray(0, length);
}

export type PushSubscriptionKeys = {
  endpoint: string;
  p256dh: string;
  auth: string;
};

/** Verschlüsselt den Payload für genau ein Abo (aes128gcm-Body). */
function encryptPayload(subscription: PushSubscriptionKeys, payload: string): Buffer {
  const userPublic = Buffer.from(subscription.p256dh, "base64url");
  const authSecret = Buffer.from(subscription.auth, "base64url");

  const ecdh = createECDH(P256);
  ecdh.generateKeys();
  const serverPublic = ecdh.getPublicKey();
  const sharedSecret = ecdh.computeSecret(userPublic);

  const prk = hkdf(
    authSecret,
    sharedSecret,
    Buffer.concat([
      Buffer.from("WebPush: info\0"),
      userPublic,
      serverPublic,
    ]),
    32,
  );

  const salt = randomBytes(16);
  const cek = hkdf(salt, prk, Buffer.from("Content-Encoding: aes128gcm\0"), 16);
  const nonce = hkdf(salt, prk, Buffer.from("Content-Encoding: nonce\0"), 12);

  const cipher = createCipheriv("aes-128-gcm", cek, nonce);
  // 0x02 markiert den letzten (hier: einzigen) Record.
  const plaintext = Buffer.concat([Buffer.from(payload, "utf8"), Buffer.from([2])]);
  const ciphertext = Buffer.concat([
    cipher.update(plaintext),
    cipher.final(),
    cipher.getAuthTag(),
  ]);

  const recordSize = Buffer.alloc(4);
  recordSize.writeUInt32BE(4096, 0);

  return Buffer.concat([
    salt,
    recordSize,
    Buffer.from([serverPublic.length]),
    serverPublic,
    ciphertext,
  ]);
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

/** Signiertes VAPID-JWT für den Authorization-Header. */
function vapidToken(audience: string, subject: string, privateKeyD: string): string {
  const header = base64url(JSON.stringify({ typ: "JWT", alg: "ES256" }));
  const body = base64url(
    JSON.stringify({
      aud: audience,
      exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
      sub: subject,
    }),
  );
  const signingInput = `${header}.${body}`;

  // JWK verlangt den öffentlichen Punkt — aus dem privaten Skalar ableiten.
  const d = Buffer.from(privateKeyD, "base64url");
  const ecdh = createECDH(P256);
  ecdh.setPrivateKey(d);
  const point = ecdh.getPublicKey();

  const key = createPrivateKey({
    key: {
      kty: "EC",
      crv: "P-256",
      d: base64url(d),
      x: base64url(point.subarray(1, 33)),
      y: base64url(point.subarray(33, 65)),
    },
    format: "jwk",
  });

  const signature = createSign("SHA256")
    .update(signingInput)
    .sign({ key, dsaEncoding: "ieee-p1363" });

  return `${signingInput}.${base64url(signature)}`;
}

export type PushResult = { ok: boolean; status: number; gone: boolean };

/**
 * Stellt eine verschlüsselte Push-Nachricht an einen Push-Dienst zu.
 * `gone` signalisiert ein abgelaufenes Abo (404/410) — Aufrufer sollte es löschen.
 */
export async function sendPush(
  subscription: PushSubscriptionKeys,
  payload: string,
  vapid: { publicKey: string; privateKey: string; subject: string },
): Promise<PushResult> {
  const body = encryptPayload(subscription, payload);
  const audience = new URL(subscription.endpoint).origin;
  const token = vapidToken(audience, vapid.subject, vapid.privateKey);

  const res = await fetch(subscription.endpoint, {
    method: "POST",
    headers: {
      Authorization: `vapid t=${token}, k=${vapid.publicKey}`,
      "Content-Encoding": "aes128gcm",
      "Content-Type": "application/octet-stream",
      TTL: "86400",
      Urgency: "high",
    },
    body: new Uint8Array(body),
  });

  return {
    ok: res.ok,
    status: res.status,
    gone: res.status === 404 || res.status === 410,
  };
}
