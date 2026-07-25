/** Inline admin icons — no external icon font dependency. */

export type AdminIconName =
  | "dashboard"
  | "building"
  | "news"
  | "services"
  | "ops"
  | "banner"
  | "inbox"
  | "jobs"
  | "faq"
  | "docs"
  | "content"
  | "team"
  | "settings"
  | "external"
  | "logout"
  | "plus"
  | "edit"
  | "check"
  | "persist"
  | "search"
  | "arrowUp"
  | "arrowDown"
  | "trash"
  | "lock"
  | "spark";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function AdminIcon({
  name,
  className = "",
  size = 18,
}: {
  name: AdminIconName;
  className?: string;
  size?: number;
}) {
  const common = {
    className: `admin-icon ${className}`.trim(),
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "dashboard":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" {...stroke} />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" {...stroke} />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" {...stroke} />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" {...stroke} />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M4.5 20.5h15" {...stroke} />
          <path d="M6.5 20.5V6.5A1.5 1.5 0 0 1 8 5h8a1.5 1.5 0 0 1 1.5 1.5v14" {...stroke} />
          <path d="M10 8.5h.01M14 8.5h.01M10 12h.01M14 12h.01M10 15.5h.01M14 15.5h.01" {...stroke} />
        </svg>
      );
    case "news":
      return (
        <svg {...common}>
          <path d="M5 5.5h10.5L19 9v9.5A1.5 1.5 0 0 1 17.5 20h-12A1.5 1.5 0 0 1 4 18.5v-12A1.5 1.5 0 0 1 5.5 5" {...stroke} />
          <path d="M15 5.5V9h3.5M8 12.5h8M8 15.5h5" {...stroke} />
        </svg>
      );
    case "services":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" {...stroke} />
          <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M5.8 18.2l1.6-1.6M16.6 7.4l1.6-1.6" {...stroke} />
        </svg>
      );
    case "ops":
      return (
        <svg {...common}>
          <path d="M12 4.5 19 8v5c0 4-2.8 6.9-7 8.4C7.8 19.9 5 17 5 13V8l7-3.5Z" {...stroke} />
          <path d="m9.2 12.2 1.9 1.9 3.7-3.9" {...stroke} />
        </svg>
      );
    case "banner":
      return (
        <svg {...common}>
          <rect x="3.5" y="6" width="17" height="12" rx="1.5" {...stroke} />
          <path d="M7 10.5h10M7 13.5h6" {...stroke} />
        </svg>
      );
    case "inbox":
      return (
        <svg {...common}>
          <path d="M4.5 8.5 12 13l7.5-4.5" {...stroke} />
          <path d="M4.5 8.5v8A1.5 1.5 0 0 0 6 18h12a1.5 1.5 0 0 0 1.5-1.5v-8L12 4.5 4.5 8.5Z" {...stroke} />
        </svg>
      );
    case "jobs":
      return (
        <svg {...common}>
          <rect x="3.5" y="7.5" width="17" height="12" rx="1.5" {...stroke} />
          <path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17" {...stroke} />
        </svg>
      );
    case "faq":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" {...stroke} />
          <path d="M9.8 9.4a2.3 2.3 0 1 1 3.5 2c-.8.5-1.3 1-1.3 2.1" {...stroke} />
          <circle cx="12" cy="16.6" r="0.7" fill="currentColor" stroke="none" />
        </svg>
      );
    case "docs":
      return (
        <svg {...common}>
          <path d="M8 4.5h6.5L18.5 8.5V19A1.5 1.5 0 0 1 17 20.5H8A1.5 1.5 0 0 1 6.5 19V6A1.5 1.5 0 0 1 8 4.5Z" {...stroke} />
          <path d="M14 4.5V8h3.5M9.5 12h5M9.5 15h5" {...stroke} />
        </svg>
      );
    case "content":
      return (
        <svg {...common}>
          <path d="M5 6.5h14M5 12h14M5 17.5h9" {...stroke} />
        </svg>
      );
    case "team":
      return (
        <svg {...common}>
          <circle cx="9" cy="8.5" r="2.4" {...stroke} />
          <circle cx="16" cy="9" r="2" {...stroke} />
          <path d="M4.5 18.5c.7-2.4 2.3-3.6 4.5-3.6s3.8 1.2 4.5 3.6M13.2 14.2c.7-.4 1.5-.6 2.4-.6 1.7 0 3.1 1 3.8 2.9" {...stroke} />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" {...stroke} />
          <path
            d="M12 3.8v1.8M12 18.4v1.8M3.8 12h1.8M18.4 12h1.8M6.1 6.1l1.3 1.3M16.6 16.6l1.3 1.3M6.1 17.9l1.3-1.3M16.6 7.4l1.3-1.3"
            {...stroke}
          />
        </svg>
      );
    case "external":
      return (
        <svg {...common}>
          <path d="M9 5.5H5.5A1.5 1.5 0 0 0 4 7v11.5A1.5 1.5 0 0 0 5.5 20H17a1.5 1.5 0 0 0 1.5-1.5V15" {...stroke} />
          <path d="M12.5 4.5H19.5V11.5M19 5 10.5 13.5" {...stroke} />
        </svg>
      );
    case "logout":
      return (
        <svg {...common}>
          <path d="M10 5.5H6A1.5 1.5 0 0 0 4.5 7v10A1.5 1.5 0 0 0 6 18.5h4" {...stroke} />
          <path d="M13.5 12H20M17 8.5 20.5 12 17 15.5" {...stroke} />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5.5v13M5.5 12h13" {...stroke} />
        </svg>
      );
    case "edit":
      return (
        <svg {...common}>
          <path d="M4.5 16.5 15.8 5.2a1.6 1.6 0 0 1 2.3 0l.7.7a1.6 1.6 0 0 1 0 2.3L7.5 19.5H4.5v-3Z" {...stroke} />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5.5 12.5 4 4 9-10" {...stroke} />
        </svg>
      );
    case "persist":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6.5" rx="6.5" ry="2.5" {...stroke} />
          <path d="M5.5 6.5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5" {...stroke} />
          <path d="M5.5 11.5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5" {...stroke} />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="5.5" {...stroke} />
          <path d="m15.5 15.5 4 4" {...stroke} />
        </svg>
      );
    case "arrowUp":
      return (
        <svg {...common}>
          <path d="M12 18.5V5.5M7.5 10 12 5.5 16.5 10" {...stroke} />
        </svg>
      );
    case "arrowDown":
      return (
        <svg {...common}>
          <path d="M12 5.5v13M7.5 14 12 18.5 16.5 14" {...stroke} />
        </svg>
      );
    case "trash":
      return (
        <svg {...common}>
          <path d="M5 8h14M9.5 8V5.8A1.3 1.3 0 0 1 10.8 4.5h2.4A1.3 1.3 0 0 1 14.5 5.8V8M7.5 8l.7 10.2A1.5 1.5 0 0 0 9.7 19.5h4.6a1.5 1.5 0 0 0 1.5-1.3L16.5 8" {...stroke} />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5.5" y="10.5" width="13" height="9" rx="1.5" {...stroke} />
          <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" {...stroke} />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3.5 13.4 9.1 19 10.5 13.4 11.9 12 17.5 10.6 11.9 5 10.5l5.6-1.4L12 3.5Z" {...stroke} />
        </svg>
      );
    default:
      return null;
  }
}
