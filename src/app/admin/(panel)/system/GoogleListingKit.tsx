import { COMPANY } from "@/lib/company";
import {
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
        {linked ? (
          <p className="admin-listing__lead">
            Place ID ist verknüpft. Der öffentliche Pin hängt am bestätigten
            Unternehmensprofil — Position dort prüfen, falls er versetzt sitzt.
          </p>
        ) : (
          <p className="admin-listing__lead">
            In Google Maps gibt es noch keinen Eintrag unter dem Firmennamen.
            Die Website zeigt den Standort über Koordinaten; den benannten Pin
            legt nur ein bestätigtes{" "}
            <strong>Google Unternehmensprofil</strong> an. Das muss der
            Inhaber oder eine bevollmächtigte Person mit einem Google-Konto
            bestätigen (Postkarte, Anruf oder Video).
          </p>
        )}

        <ol className="admin-listing__steps">
          <li>
            Zuerst prüfen, ob schon ein Eintrag existiert:{" "}
            <a
              href={GOOGLE_LISTING.searchExistingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              „{COMPANY.legalName}“ in Maps suchen
            </a>
            . Falls ja: Anspruch erheben statt neu anlegen.
          </li>
          <li>
            Sonst unter{" "}
            <a
              href={GOOGLE_LISTING.createUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              business.google.com/create
            </a>{" "}
            ein Profil anlegen und die Felder unten eins zu eins übernehmen.
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
            setzen (Büro Modul H, nicht die Warenannahme).
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
