import { COMPANY } from "@/lib/company";

export function TopBar() {
  return (
    <div className="top-bar" role="region" aria-label="Schnellkontakt">
      <div className="page-container top-bar__inner">
        <div className="top-bar__items">
          <div className="top-bar__item">
            <p className="top-bar__label">Reglementierter Beauftragter</p>
            <p className="top-bar__value">Reg.B. {COMPANY.regAgent}</p>
          </div>

          <div className="top-bar__contact-row">
            <div className="top-bar__item">
              <p className="top-bar__label">Telefon</p>
              <a href={`tel:${COMPANY.phoneTel}`} className="top-bar__value top-bar__link">
                T. {COMPANY.phone}
              </a>
            </div>

            <div className="top-bar__item">
              <p className="top-bar__label">E-Mail</p>
              <a href={`mailto:${COMPANY.email}`} className="top-bar__value top-bar__link">
                {COMPANY.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
