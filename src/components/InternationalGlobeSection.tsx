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
    <section
      className="border-t border-[var(--border)] bg-[#0c0c0c]"
      aria-labelledby="international-band-title"
    >
      <div className="page-container py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-20">
          <div className="max-w-2xl">
            <p className="section-eyebrow section-eyebrow--on-dark">Drehkreuz MUC</p>
            <h2
              id="international-band-title"
              className="heading-display section-header__title text-[clamp(1.5rem,3.4vw,2.125rem)] text-white"
            >
              Internationale Sendungen brauchen eine starke lokale Schnittstelle.
            </h2>
            <p className="mt-5 max-w-lg text-[15px] font-normal leading-[1.7] text-white/70">
              Am Cargo-Standort München verbinden wir globales Netzwerk und
              operative Realität: kurze Wege, dokumentierte Übergaben, ein
              Ansprechpartner vor Ort.
            </p>
          </div>

          <ul className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1 lg:gap-3">
            {highlights.map((item) => (
              <li
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4"
              >
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-white/55">
                  {item.label}
                </p>
                <p className="mt-1.5 text-[13.5px] leading-snug text-white/80">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
