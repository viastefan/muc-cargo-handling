type IconName =
  | "route"
  | "process"
  | "shield"
  | "person"
  | "compliance"
  | "tech"
  | "partner"
  | "airport"
  | "link"
  | "docs"
  | "peak"
  | "xray"
  | "eye"
  | "hand"
  | "etd";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FeatureIcon({ name, className = "" }: { name: IconName; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", "aria-hidden": true as const };

  switch (name) {
    case "route":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.25" {...stroke} />
          <circle cx="18" cy="18" r="2.25" {...stroke} />
          <path d="M8.2 7.5 15.8 16.5" {...stroke} />
        </svg>
      );
    case "process":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.25" {...stroke} />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.25" {...stroke} />
          <rect x="8.5" y="13.5" width="7" height="7" rx="1.25" {...stroke} />
          <path d="M10.5 7h3M12 10.5v3" {...stroke} />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M12 3.25 19.25 6v5.2c0 4.35-2.95 7.45-7.25 9.05C7.7 18.65 4.75 15.55 4.75 11.2V6L12 3.25Z"
            {...stroke}
          />
          <path d="m9.2 12.1 1.9 1.9 3.7-3.9" {...stroke} />
        </svg>
      );
    case "person":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.1" {...stroke} />
          <path d="M5.5 19.25c1.35-2.7 3.45-4.05 6.5-4.05s5.15 1.35 6.5 4.05" {...stroke} />
        </svg>
      );
    case "compliance":
      return (
        <svg {...common}>
          <path d="M7 4.5h10a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 18V6A1.5 1.5 0 0 1 7 4.5Z" {...stroke} />
          <path d="m9 12 2 2 4-4" {...stroke} />
        </svg>
      );
    case "tech":
      return (
        <svg {...common}>
          <rect x="4" y="6" width="16" height="11" rx="1.5" {...stroke} />
          <path d="M9 20.5h6M12 17v3.5" {...stroke} />
          <path d="M8 10.5h8M8 13.5h5" {...stroke} />
        </svg>
      );
    case "partner":
      return (
        <svg {...common}>
          <circle cx="8.5" cy="8" r="2.6" {...stroke} />
          <circle cx="15.5" cy="8" r="2.6" {...stroke} />
          <path d="M4.5 18.5c.7-2.35 2.2-3.55 4-3.55.9 0 1.7.3 2.35.85" {...stroke} />
          <path d="M13.15 15.8c.65-.55 1.45-.85 2.35-.85 1.8 0 3.3 1.2 4 3.55" {...stroke} />
        </svg>
      );
    case "airport":
      return (
        <svg {...common}>
          <path d="M3.5 16.5h17" {...stroke} />
          <path d="M12 4.5v8.5" {...stroke} />
          <path d="m7 10.5 5-3 5 3" {...stroke} />
          <path d="M9.5 16.5 12 12l2.5 4.5" {...stroke} />
        </svg>
      );
    case "link":
      return (
        <svg {...common}>
          <path d="M9.5 12.5h5" {...stroke} />
          <path d="M10.2 15.2H8.4a3.2 3.2 0 0 1 0-6.4h1.8" {...stroke} />
          <path d="M13.8 8.8h1.8a3.2 3.2 0 1 1 0 6.4h-1.8" {...stroke} />
        </svg>
      );
    case "docs":
      return (
        <svg {...common}>
          <path d="M8 4.5h6.5L18.5 8.5V19a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 19V6A1.5 1.5 0 0 1 8 4.5Z" {...stroke} />
          <path d="M14 4.5V8h3.5M9.5 12h5M9.5 15h5" {...stroke} />
        </svg>
      );
    case "peak":
      return (
        <svg {...common}>
          <path d="m4 16.5 4.2-5.2 3.3 2.6L16.5 7 20 10.2" {...stroke} />
          <path d="M4 19.5h16" {...stroke} />
        </svg>
      );
    case "xray":
      return (
        <svg {...common}>
          <rect x="4" y="5.5" width="16" height="13" rx="1.5" {...stroke} />
          <path d="M8 9.5h8M8 12.5h5M8 15.5h6.5" {...stroke} />
          <circle cx="16.25" cy="15.25" r="1.35" {...stroke} />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M2.75 12s3.1-5.25 9.25-5.25S21.25 12 21.25 12s-3.1 5.25-9.25 5.25S2.75 12 2.75 12Z" {...stroke} />
          <circle cx="12" cy="12" r="2.35" {...stroke} />
        </svg>
      );
    case "hand":
      return (
        <svg {...common}>
          <path
            d="M8.5 11.2V6.8a1.35 1.35 0 0 1 2.7 0v4.4M11.2 10.6V5.9a1.35 1.35 0 0 1 2.7 0v5.3M13.9 11V7.4a1.35 1.35 0 0 1 2.7 0V14c0 2.85-1.85 5-4.6 5H11c-2.3 0-3.85-1.2-4.85-2.85L4.5 13.4a1.35 1.35 0 0 1 2.2-1.55l1.8 1.35"
            {...stroke}
          />
        </svg>
      );
    case "etd":
      return (
        <svg {...common}>
          <path d="M7.5 4.75h9A1.75 1.75 0 0 1 18.25 6.5v11A1.75 1.75 0 0 1 16.5 19.25h-9A1.75 1.75 0 0 1 5.75 17.5v-11A1.75 1.75 0 0 1 7.5 4.75Z" {...stroke} />
          <path d="M9 9.25h6M9 12.25h6M9 15.25h3.75" {...stroke} />
          <circle cx="15.35" cy="15.25" r="1.15" {...stroke} />
        </svg>
      );
    default:
      return null;
  }
}

export type { IconName };
