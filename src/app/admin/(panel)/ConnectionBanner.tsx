import Link from "next/link";
import type { ConnectionProbe } from "@/lib/system-check";

export function ConnectionBanner({
  probe,
  showSetupLink,
}: {
  probe: ConnectionProbe;
  showSetupLink: boolean;
}) {
  if (probe.state === "ok") {
    return (
      <div className="admin-conn admin-conn--ok" role="status">
        <span className="admin-conn__dot" aria-hidden="true" />
        <span className="admin-conn__label">Verbunden</span>
        {probe.latencyMs != null ? (
          <span className="admin-conn__meta">{probe.latencyMs} ms</span>
        ) : null}
        {probe.host ? <span className="admin-conn__meta admin-conn__host">{probe.host}</span> : null}
      </div>
    );
  }

  return (
    <div className="admin-conn admin-conn--bad" role="status">
      <span className="admin-conn__dot" aria-hidden="true" />
      <div className="admin-conn__copy">
        <p className="admin-conn__label">{probe.detail}</p>
        {probe.fix ? <p className="admin-conn__fix">{probe.fix}</p> : null}
      </div>
      {showSetupLink ? (
        <Link href="/admin/system" className="admin-btn admin-btn--sm">
          Einrichtung
        </Link>
      ) : null}
    </div>
  );
}
