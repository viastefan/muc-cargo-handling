import { STATUS_LABEL, type InquiryStatus } from "@/lib/inquiries";

export function StatusBadge({ status }: { status: InquiryStatus }) {
  return (
    <span className={`admin-badge admin-badge--${status}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}
