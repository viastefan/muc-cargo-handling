/** Client-safe id helper (not cryptographic). */
export function newClientId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
