/**
 * Ref-gezählte Scroll-Sperre für den <body>.
 *
 * Mehrere Overlays (Anfrage-Flow, Cookie-Einstellungen, …) können gleichzeitig
 * offen sein bzw. sich überlappend öffnen/schließen. Wenn jedes für sich
 * `document.body.style.overflow` setzt und den „vorherigen" Wert zurückschreibt,
 * fängt sich eins davon irgendwann das „hidden" des anderen ein — der Scroll
 * bleibt dauerhaft gesperrt. Ein gemeinsamer Zähler verhindert das.
 */

let count = 0;
let savedOverflow = "";
let savedPaddingRight = "";

export function lockScroll(): void {
  if (typeof document === "undefined") return;
  if (count === 0) {
    const { body } = document;
    savedOverflow = body.style.overflow;
    savedPaddingRight = body.style.paddingRight;
    // Scrollbar-Breite ausgleichen, damit das Layout nicht springt.
    const gap = window.innerWidth - document.documentElement.clientWidth;
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    body.style.overflow = "hidden";
  }
  count += 1;
}

export function unlockScroll(): void {
  if (typeof document === "undefined") return;
  count = Math.max(0, count - 1);
  if (count === 0) {
    document.body.style.overflow = savedOverflow;
    document.body.style.paddingRight = savedPaddingRight;
  }
}
