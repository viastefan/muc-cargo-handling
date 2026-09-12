import { ImageResponse } from "next/og";
import { COMPANY } from "@/lib/company";

/**
 * Vorschaukarte für geteilte Links (WhatsApp, LinkedIn, Slack, Google).
 * Wird beim Build einmal gerendert — bewusst ohne externe Schrift, damit der
 * Build nicht von einem fremden Dienst abhängt.
 *
 * Hinweis zum Renderer: Satori verlangt an jedem Element mit mehr als einem
 * Kind ein ausdrückliches `display` und kennt kein <br>.
 */
export const alt = "MUC Cargohandling — Luftfracht am Flughafen München";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0F0F11",
          padding: "72px 80px",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", width: 14, height: 44, background: "#D90D3A" }} />
          <div
            style={{
              display: "flex",
              marginLeft: 18,
              fontSize: 26,
              letterSpacing: 6,
              color: "#B8B8C0",
            }}
          >
            {COMPANY.legalName.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 70, letterSpacing: -1.5 }}>
            Luftfracht am
          </div>
          <div style={{ display: "flex", fontSize: 70, letterSpacing: -1.5, marginTop: 6 }}>
            Flughafen München
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 30,
              color: "#B8B8C0",
            }}
          >
            Import &amp; Export · Airline Handling · Röntgen &amp; Sicherheit
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: 24 }}>
          <div
            style={{
              display: "flex",
              padding: "10px 18px",
              background: "#D90D3A",
              color: "#FFFFFF",
              letterSpacing: 1,
            }}
          >
            Reglementierter Beauftragter
          </div>
          <div style={{ display: "flex", marginLeft: 18, color: "#B8B8C0" }}>
            {COMPANY.regAgent}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
