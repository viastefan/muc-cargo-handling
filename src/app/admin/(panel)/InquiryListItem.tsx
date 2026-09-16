import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import type { InquiryStatus } from "@/lib/inquiries";

export function InquiryListItem({
  reference,
  name,
  subtitle,
  topic,
  whenIso,
  whenLabel,
  status,
  assignee,
}: {
  reference: string;
  name: string;
  subtitle: string;
  topic: string;
  whenIso: string;
  whenLabel: string;
  status: InquiryStatus;
  assignee?: string;
}) {
  return (
    <Link
      href={`/admin/${encodeURIComponent(reference)}`}
      className="admin-inbox__row"
    >
      <div className="admin-inbox__body">
        <div className="admin-inbox__topline">
          <p className="admin-inbox__name">{name}</p>
          <time className="admin-inbox__when" dateTime={whenIso}>
            {whenLabel}
          </time>
        </div>
        <p className="admin-inbox__subtitle">{subtitle}</p>
        <div className="admin-inbox__meta">
          <StatusBadge status={status} />
          <span className="admin-inbox__topic">{topic}</span>
          {assignee ? <span className="admin-inbox__assignee">{assignee}</span> : null}
        </div>
      </div>
      <svg
        className="admin-inbox__chev"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 3.5 10.5 8 6 12.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
