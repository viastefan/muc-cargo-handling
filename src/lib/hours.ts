import { COMPANY } from "@/lib/company";

export type OpenStatus = {
  open: boolean;
  /** Kurzlabel, z. B. „Jetzt geöffnet" / „Geschlossen". */
  label: string;
  /** Zusatz, z. B. „schließt 17:00" / „öffnet Mo 08:00". */
  detail: string;
};

const DAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Aktuelle Wanduhrzeit in Europe/Berlin — unabhängig von der Geräte-Zeitzone. */
function berlinNow(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const wd = get("weekday");
  const dayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));
  return { day: dayMap[wd] ?? 1, minutes: hour * 60 + minute };
}

/**
 * Live-Öffnungsstatus des Büros (Mo–Fr). `null`, solange die Zeiten nicht
 * bestätigt sind — die Anzeige entfällt dann ersatzlos.
 */
export function getOpenStatus(): OpenStatus | null {
  if (!COMPANY.hours.confirmed) return null;

  const { day, minutes } = berlinNow();
  const open = toMinutes(COMPANY.hours.weekdays.open);
  const close = toMinutes(COMPANY.hours.weekdays.close);
  const isWeekday = day >= 1 && day <= 5;

  if (isWeekday && minutes >= open && minutes < close) {
    return {
      open: true,
      label: "Jetzt geöffnet",
      detail: `schließt ${COMPANY.hours.weekdays.close}`,
    };
  }

  // Nächster Öffnungstag bestimmen
  let nextDay = day;
  if (isWeekday && minutes < open) {
    // heute später
  } else {
    // morgen, ggf. Montag überspringen
    do {
      nextDay = (nextDay + 1) % 7;
    } while (nextDay === 0 || nextDay === 6);
  }
  const when =
    nextDay === day ? "heute" : nextDay === (day + 1) % 7 ? "morgen" : DAYS[nextDay];

  return {
    open: false,
    label: "Geschlossen",
    detail: `öffnet ${when} ${COMPANY.hours.weekdays.open}`,
  };
}
