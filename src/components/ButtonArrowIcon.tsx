type Props = {
  className?: string;
  light?: boolean;
};

/**
 * Eck-Pfeil der Buttons (früher die Material-Symbols-Ligatur
 * `arrow_forward_ios` über Google Fonts). Jetzt inline-SVG — kein externer
 * Font-Request mehr, kein Verbindungsaufbau zu Google beim Seitenaufruf.
 * Die Rotation/Hover-Animation kommt weiter aus `.btn-corner-symbol`.
 */
export function ButtonArrowIcon({ className = "", light = false }: Props) {
  return (
    <span
      className={["btn-corner-symbol", light ? "btn-corner-symbol-light" : "", className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
        <path
          d="M5.5 2.5 11 8l-5.5 5.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
