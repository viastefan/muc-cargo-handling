type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Icon vor dem Text statt danach (z. B. bei rechtsbündigen Zeilen). */
  iconBefore?: boolean;
};

/** Material-Symbols „open_in_new" — als Inline-SVG (kein Google-Fonts-Request). */
export function OpenInNewIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
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
      {iconBefore ? <OpenInNewIcon /> : null}
      <span>{children}</span>
      {iconBefore ? null : <OpenInNewIcon />}
    </a>
  );
}
