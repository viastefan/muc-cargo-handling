/**
 * Winziger Store fuer den Anfrage-Flow (InquiryFlow).
 *
 * Bewusst kein React-Context: der Flow haengt einmal im Layout, geoeffnet
 * wird er aus Header, Mobile-Menue und dem schwebenden Button — quer durch
 * den Baum. Ein Modul-Store mit useSyncExternalStore spart den Provider und
 * haelt die Aufrufstelle bei einer Zeile: openInquiry().
 */

export type InquiryTopic = "luftfracht" | "airline" | "roentgen" | "allgemein";

let open = false;
let requestedTopic: InquiryTopic | null = null;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeInquiry(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getInquiryOpen() {
  return open;
}

/** SSR/Hydration: der Dialog ist serverseitig immer zu. */
export function getInquiryOpenServer() {
  return false;
}

/** Beim Oeffnen vorgewaehltes Thema — erlaubt den Einstieg ab Schritt 2. */
export function getInquiryTopic() {
  return requestedTopic;
}

export function openInquiry(topic: InquiryTopic | null = null) {
  requestedTopic = topic;
  open = true;
  emit();
}

export function closeInquiry() {
  open = false;
  emit();
}
