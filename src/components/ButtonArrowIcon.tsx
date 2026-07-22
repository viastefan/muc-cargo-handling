type Props = {
  className?: string;
  light?: boolean;
};

/** Corner arrow — local SVG (no external font dependency) */
export function ButtonArrowIcon({ className = "", light = false }: Props) {
  return (
    <svg
      className={[
        "btn-corner-symbol",
        light ? "btn-corner-symbol-light" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 12.5 12.5 3.5M12.5 3.5H6.75M12.5 3.5V9.25"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
