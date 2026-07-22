import type { Metadata } from "next";
import Image from "next/image";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Röntgen",
};

const HIGHLIGHTS = [
  { title: "LBA-konforme Prozesse", text: "Verfahren nach geltenden Luftsicherheitsvorgaben." },
  { title: "Modernste Prüftechnik", text: "Röntgenanlagen für gängige Frachtmaße und Gewichte." },
  { title: "STI Kooperation", text: "Zusammenarbeit am Standort Flughafen München." },
  { title: "Flughafen München", text: "Kurze Wege – direkt am Cargo-Standort MUC." },
];

export default function RoentgenPage() {
  return (
    <>
      <Hero
        image="/images/roentgen/hero.jpg"
        title="Sichere Luftfracht nach höchsten Sicherheitsstandards."
        subtitle="Röntgen- und Sicherheitskontrollen nach aktuellen Vorgaben – für eine zuverlässige Freigabe Ihrer Sendungen am Flughafen München."
      />

      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
        <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
          <span className="text-[var(--muted-light)]">Sicherheit </span>
          in jedem Prozessschritt
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <p className="text-[15px] leading-relaxed text-[var(--muted)]">
            Unsere Kontrollverfahren kombinieren Technik und Fachpersonal.
            Je nach Sendung setzen wir Röntgenkontrolle, Sichtprüfung,
            Handdurchsuchung oder Sprengstoff-Spurendetektion ein – immer mit
            dem Ziel einer klaren, dokumentierten Entscheidung.
          </p>
          <p className="text-[15px] leading-relaxed text-[var(--muted)]">
            Als reglementierter Beauftragter arbeiten wir nach den Anforderungen
            der Luftsicherheit und stimmen uns eng mit Partnern am Flughafen
            München ab.
          </p>
        </div>

        <div className="mt-10 bg-[var(--surface)] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.06em] text-[var(--muted-light)]">
            Technische Eckdaten Röntgen
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">
            Durchlassbreite ca. <strong className="text-[var(--foreground)]">179 cm</strong>,
            Höhe ca. <strong className="text-[var(--foreground)]">170 cm</strong>,
            max. Gewicht ca. <strong className="text-[var(--foreground)]">2.000 kg</strong>.
            Für abweichende Abmessungen beraten wir Sie gerne zu Alternativverfahren.
          </p>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
          <span className="inline-block border border-[var(--border)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]">
            Röntgen
          </span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Unsere Kontrollverfahren</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ServiceCard
              image="/images/roentgen/kontrolle-roentgen.jpg"
              title="Röntgenkontrolle"
              description="Schnelle, bildgebende Prüfung großer Sendungsvolumina durch geschulte Operatoren."
            />
            <ServiceCard
              image="/images/roentgen/kontrolle-sicht.jpg"
              title="Sichtkontrolle"
              description="Äußere Prüfung auf Unversehrtheit, Kennzeichnung und Auffälligkeiten."
            />
            <ServiceCard
              image="/images/roentgen/kontrolle-hand.jpg"
              title="Handdurchsuchung"
              description="Manuelle Vertiefung, wenn Technik allein nicht ausreicht oder die Sendung es erfordert."
            />
            <ServiceCard
              image="/images/roentgen/kontrolle-etd.jpg"
              title="Sprengstoff-Spurendetektion"
              description="ETD als ergänzendes Verfahren zur Spurensuche im Sicherheitsprozess."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Unsere Zusammenarbeit mit STI
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--muted)]">
              Am Flughafen München kooperieren wir mit etablierten Partnern wie
              STI, um Sicherheits- und Handling-Prozesse effizient zu verzahnen.
              So entstehen kurze Wege und klare Verantwortlichkeiten.
            </p>
          </div>
          <div className="flex items-center gap-8 bg-[var(--surface)] p-8">
            <Image
              src="/images/shared/logo.svg"
              alt="MUC Cargo Handling"
              width={180}
              height={50}
            />
            <div className="h-10 w-px bg-[var(--border)]" />
            <div className="text-sm font-bold tracking-wide text-[var(--muted)]">
              STI Partner
              <span className="mt-1 block text-xs font-normal">
                Logo unter <code className="text-[11px]">public/images/shared/sti-logo.png</code> einfügen
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="bg-[var(--surface)] p-5">
              <h3 className="font-bold">{h.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      <FooterCta title="Sicherheit, die Ihre Luftfrachtprozesse beschleunigt." />
    </>
  );
}
