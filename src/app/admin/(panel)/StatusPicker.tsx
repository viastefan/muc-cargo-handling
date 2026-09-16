import {
  INQUIRY_STATUSES,
  STATUS_LABEL,
  type InquiryStatus,
} from "@/lib/inquiries";
import { setStatusAction } from "./actions";

export function StatusPicker({
  reference,
  current,
}: {
  reference: string;
  current: InquiryStatus;
}) {
  return (
    <div className="admin-status-picker" role="group" aria-label="Status setzen">
      {INQUIRY_STATUSES.map((status) => (
        <form action={setStatusAction} key={status}>
          <input type="hidden" name="reference" value={reference} />
          <input type="hidden" name="status" value={status} />
          <button
            type="submit"
            className={`admin-status-pill${current === status ? " is-active" : ""}`}
            data-status={status}
            disabled={current === status}
            aria-pressed={current === status}
          >
            {STATUS_LABEL[status]}
          </button>
        </form>
      ))}
    </div>
  );
}
