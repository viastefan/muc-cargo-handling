export function InternationalGlobeSection() {
  const highlights = [
    {
      label: "Zeitfenster",
      text: "Express- und AOG-Sendungen stimmen wir direkt am Standort ab.",
    },
    {
      label: "Security",
      text: "Freigaben und Kontrollen ohne Umweg über entfernte Zentralen.",
    },
    {
      label: "Übergabe",
      text: "Klare Schnittstelle zu Airline, Spedition und Warehouse vor Ort.",
    },
  ];

  return (
    <section className="mt-4 bg-[#0c0c0c]" aria-labelledby="international-band-title">
      <div className="page-container py-12 sm:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <div className="max-w-2xl">
            <p className="section-eyebrow section-eyebrow--on-dark">Drehkreuz MUC</p>
            <h3
              id="international-band-title"
              className="heading-display section-header__title text-[clamp(1.375rem,3.5vw,2rem)] text-white"
            >
              Internationale Sendungen brauchen eine starke lokale Schnittstelle.
            </h3>
            <p className="mt-4 max-w-lg text-[14px] font-normal leading-[1.7] text-white/72 sm:text-[15px]">
              Am Cargo-Standort München halten wir die Verbindung zwischen globalem Netzwerk und
              operativer Realität: kurze Wege, dokumentierte Übergaben und eine Ansprechpartnerin
              oder einen Ansprechpartner vor Ort – wenn es auf Minuten ankommt.
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4">
            {highlights.map((item) => (
              <li
                key={item.label}
                className="border border-white/12 bg-white/[0.03] px-4 py-3.5"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/45">
                  {item.label}
                </p>
                <p className="mt-1.5 text-[13px] leading-snug text-white/78">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
