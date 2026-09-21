import { COMPANY } from "@/lib/company";
import {
  CHI_NEIGHBOR,
  GOOGLE_LISTING,
  GOOGLE_LISTING_FIELDS,
} from "@/lib/google-listing";
import { CopyButton } from "./CopyButton";

export function GoogleListingKit() {
  const linked = Boolean(COMPANY.googlePlaceId);

  return (
    <div className="admin-card">
      <p className="admin-card__title">Google Maps Pin</p>
      <div className="admin-card__body admin-listing">
        <p className="admin-listing__warn">
          Bei der Suche „muc cargo handling“ zeigt Google rechts{" "}
          <strong>{CHI_NEIGHBOR.name}</strong> — das ist ein anderes
          Unternehmen ({CHI_NEIGHBOR.address}, Tel. {CHI_NEIGHBOR.phone}).
          Deren Karte, Sterne und den Button „Inhaber dieses Unternehmens?“
          nicht verwenden. Unser Profil muss neu angelegt werden, damit rechts
          MUC Cargohandling GmbH steht.
        </p>

        {linked ? (
          <p className="admin-listing__lead">
            Place ID ist verknüpft. Der öffentliche Pin hängt am bestätigten
            Unternehmensprofil — Position dort prüfen, falls er versetzt sitzt.
          </p>
        ) : (
          <p className="admin-listing__lead">
            Links in der Suche erscheint schon muc-cargo.de. Rechts (Wissenspanel
            / Maps-Pin) fehlt unser Eintrag, deshalb rückt Google CHI nach.
            Anlegen kann nur der Inhaber oder eine bevollmächtigte Person
            (Postkarte, Anruf oder Video).
          </p>
        )}

        <ol className="admin-listing__steps">
          <li>
            CHI-Profil nur zur Kontrolle öffnen:{" "}
            <a
              href={CHI_NEIGHBOR.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {CHI_NEIGHBOR.name}
            </a>
            . Nicht klaimen.
          </li>
          <li>
            Eigenes Profil unter{" "}
            <a
              href={GOOGLE_LISTING.createUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              business.google.com/create
            </a>{" "}
            anlegen. Name genau <strong>{COMPANY.legalName}</strong> (ein Wort
            Cargohandling). Felder unten übernehmen.
          </li>
          <li>
            Standort auf der Karte anpassen und den Pin auf{" "}
            <a
              href={GOOGLE_LISTING.pinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {GOOGLE_LISTING.coordinates}
            </a>{" "}
            setzen — Büro Modul H, nicht CHI in Modul F und nicht die
            Warenannahme.
          </li>
          <li>
            Profil bestätigen. Sobald es live ist, Place ID im{" "}
            <a
              href={GOOGLE_LISTING.placeIdFinderUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Place-ID-Finder
            </a>{" "}
            kopieren und in Vercel als <code>GOOGLE_PLACE_ID</code> setzen,
            danach Redeploy.
          </li>
        </ol>

        {linked ? (
          <p className="admin-listing__placeid">
            <span>Aktuelle Place ID</span>
            <code>{COMPANY.googlePlaceId}</code>
          </p>
        ) : null}

        <div className="admin-listing__fields">
          {GOOGLE_LISTING_FIELDS.map((field) => (
            <div key={field.label} className="admin-copyrow">
              <div>
                <p className="admin-copyrow__label">{field.label}</p>
                <p className="admin-copyrow__value">{field.value}</p>
                {field.hint ? (
                  <p className="admin-copyrow__hint">{field.hint}</p>
                ) : null}
              </div>
              <CopyButton value={field.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
