type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Icon vor dem Text statt danach (z. B. bei rechtsbündigen Zeilen). */
  iconBefore?: boolean;
};

function BoxArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 3.5h6.5V10M12.5 3.5 7 9M11 9.5v2A1.5 1.5 0 0 1 9.5 13h-5A1.5 1.5 0 0 1 3 11.5v-5A1.5 1.5 0 0 1 4.5 5h2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Externer Verweis im einheitlichen Stil: Apple-Blau, unterstrichen, mit
 * „öffnet in neuem Tab"-Icon. Immer target=_blank + rel gesichert.
 */
export function ExternalLink({ href, children, className = "", iconBefore }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-ext ${className}`.trim()}
    >
      {iconBefore ? <BoxArrowIcon /> : null}
      <span>{children}</span>
      {iconBefore ? null : <BoxArrowIcon />}
    </a>
  );
}
