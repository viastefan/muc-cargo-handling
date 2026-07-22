import Link from "next/link";
import { Button } from "@/components/Button";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { InfoStat, ServiceCard } from "@/components/ServiceCard";
import { PinIcon } from "@/components/ArrowIcon";

export default function HomePage() {
  return (
    <>
      <Hero
        image="/images/home/hero.jpg"
        title="Präzise Abwicklung und Sicherheit für Ihre Luftfracht am Flughafen München"
        subtitle="Mit strukturierten Abläufen, erfahrenem Personal und hohen Qualitätsstandards begleiten wir Ihre Sendungen – von der Annahme bis zur Sicherheitskontrolle."
      />

      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-xl text-3xl font-bold leading-tight md:text-4xl">
            Ihr Partner für professionelle Luftfrachtabwicklung
          </h2>
          <Button href="/unternehmen" variant="gray" className="shrink-0 self-start">
            Mehr dazu
          </Button>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <p className="text-[15px] leading-relaxed text-[var(--muted)]">
            Seit 2003 stehen wir für zuverlässige Prozesse am Flughafen München.
            Als reglementierter Beauftragter übernehmen wir Import- und Export-
            Handling, Airline-Services sowie sicherheitsrelevante Kontrollen –
            klar, nachvollziehbar und termingerecht.
          </p>
          <p className="text-[15px] leading-relaxed text-[var(--muted)]">
            Unsere Teams arbeiten eng mit Airlines, Speditionen und Behörden
            zusammen. So entstehen kurze Wege, sichere Übergaben und eine
            Abwicklung, die internationalen Standards gerecht wird.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <InfoStat title="20+ Jahre Erfahrung">
            Langjährige Praxis in Airport-Cargo-Prozessen – von der Annahme bis
            zur Freigabe.
          </InfoStat>
          <InfoStat title="Reglementierter Beauftragter">
            Zulassung DE/RA/01278-01 – geprüfte Sicherheit nach geltenden
            Vorschriften.
          </InfoStat>
          <InfoStat title="Standort">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 underline decoration-[var(--brand)] underline-offset-4 hover:text-[var(--brand)]"
            >
              <PinIcon className="h-4 w-4 text-[var(--brand)]" />
              Südallee, 85356, Deutschland
            </Link>
          </InfoStat>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
          <h2 className="max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
            Sicherheit und Kontrolle für Ihre Luftfracht
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ServiceCard
              image="/images/home/service-roentgen.jpg"
              title="Röntgenkontrolle"
              description="Moderne Röntgentechnik für eine schnelle und regelkonforme Prüfung Ihrer Sendungen."
            />
            <ServiceCard
              image="/images/home/service-sichtkontrolle.jpg"
              title="Sichtkontrolle"
              description="Geschulte Fachkräfte prüfen äußerlich erkennbare Auffälligkeiten und Unversehrtheit."
            />
            <ServiceCard
              image="/images/home/service-handdurchsuchung.jpg"
              title="Handdurchsuchung"
              description="Manuelle Kontrolle dort, wo technisch oder inhaltlich eine vertiefte Prüfung nötig ist."
            />
            <ServiceCard
              image="/images/home/service-etd.jpg"
              title="Sprengstoff-Spurendetektion"
              description="ETD-Verfahren zur Spurensuche – ergänzend zu Röntgen und physischen Kontrollen."
            />
          </div>
        </div>
      </section>

      <FooterCta />
    </>
  );
}
