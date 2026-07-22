import { COMPANY } from "@/lib/company";

export function LocationMap({ embedSrc }: { embedSrc: string }) {
  return (
    <div className="location-map">
      <div className="location-map__frame">
        <iframe
          title="Standort MUC Cargo Handling am Flughafen München"
          src={embedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="location-map__info">
        <p className="location-map__name">{COMPANY.legalName}</p>
        <p className="location-map__address">
          {COMPANY.office.line1.replace("Büroadresse: ", "")}
          <br />
          {COMPANY.office.line2}
        </p>
        <a
          href="https://maps.google.com/?q=Südallee+Modul+F+85356+München-Flughafen"
          target="_blank"
          rel="noopener noreferrer"
          className="location-map__directions"
        >
          Anfahrt in Google Maps
        </a>
      </div>
    </div>
  );
}
