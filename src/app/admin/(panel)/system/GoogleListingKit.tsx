import { COMPANY } from "@/lib/company";
import {
  CHI_NEIGHBOR,
  GOOGLE_HOURS_FIELDS,
  GOOGLE_LISTING,
  GOOGLE_LISTING_FIELDS,
  GOOGLE_PHOTOS,
  GOOGLE_POST,
  GOOGLE_QA_FIELDS,
  GOOGLE_SERVICE_FIELDS,
  type ListingField,
} from "@/lib/google-listing";
import { CopyButton } from "./CopyButton";

function FieldList({ fields }: { fields: readonly ListingField[] }) {
  return (
    <div className="admin-listing__fields">
      {fields.map((field) => (
        <div key={field.label} className="admin-copyrow">
          <div>
            <p className="admin-copyrow__label">{field.label}</p>
            <p className="admin-copyrow__value">{field.value}</p>
            {field.hint ? <p className="admin-copyrow__hint">{field.hint}</p> : null}
          </div>
          <CopyButton value={field.value} />
        </div>
      ))}
    </div>
  );
}

export function GoogleListingKit() {
  const linked = Boolean(COMPANY.googlePlaceId);

  return (
    <div className="admin-card">
      <p className="admin-card__title">Google Maps Pin</p>
      <div className="admin-card__body admin-listing">
        <p className="admin-listing__warn">
          Bei der Suche „muc cargo handling“ zeigt Google rechts{" "}
          <strong>{CHI_NEIGHBOR.name}</strong> (Modul F). Der Pin bei unseren
          Koordinaten hängt oft an <strong>transmaritim international</strong>{" "}
          (Modul G, Raum 333+335). Beides andere Firmen. Deren Adresse nicht
          übernehmen, nicht „Änderung vorschlagen“ und nicht „Inhaber dieses
          Unternehmens?“ klicken. Eigenes Profil mit Adresse Modul H, Pavillon.
        </p>

        {linked ? (
          <p className="admin-listing__lead">
            Place ID ist verknüpft. Der öffentliche Pin hängt am bestätigten
            Unternehmensprofil — Position dort prüfen, falls er versetzt sitzt.
          </p>
        ) : (
          <p className="admin-listing__lead">
            Das Profil ist angelegt, aber noch <strong>nicht öffentlich sichtbar</strong>.
            Google prüft die Angaben (kann ein paar Tage dauern). Solange kannst du
            alles andere ausfüllen: Zeiten, Beschreibung, Leistungen, Fotos.
            „Produkte“, „Buchungen“ und „Werben“ bleiben leer.
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
              href="https://business.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              business.google.com
            </a>{" "}
            öffnen. Name genau <strong>{COMPANY.legalName}</strong> (ein Wort
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

        <h3 className="admin-listing__section">1. Profil bearbeiten</h3>
        <FieldList fields={GOOGLE_LISTING_FIELDS} />

        <h3 className="admin-listing__section">2. Öffnungszeiten hinzufügen</h3>
        <FieldList fields={GOOGLE_HOURS_FIELDS} />

        <h3 className="admin-listing__section">3. Dienstleistungen</h3>
        <p className="admin-listing__lead">
          Nicht unter „Produkte“. Jede Zeile: Name kopieren, dann Beschreibung.
        </p>
        <FieldList fields={GOOGLE_SERVICE_FIELDS} />

        <h3 className="admin-listing__section">4. Fotos</h3>
        <p className="admin-listing__lead">
          Dateien liegen im Repo unter den angegebenen Pfaden. Logo und Titelbild
          zuerst, danach die Betriebsfotos. Keine Weltkugel, keine Grafiken mit
          Schrift.
        </p>
        <FieldList fields={GOOGLE_PHOTOS} />

        <h3 className="admin-listing__section">5. Erster Beitrag</h3>
        <FieldList fields={[GOOGLE_POST]} />

        <h3 className="admin-listing__section">6. Fragen und Antworten</h3>
        <FieldList fields={GOOGLE_QA_FIELDS} />
      </div>
    </div>
  );
}
