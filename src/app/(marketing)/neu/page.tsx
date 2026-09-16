import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { HeroMedia } from "@/components/HeroMedia";
import { LocationMap } from "@/components/LocationMap";
import { COMPANY, MAPS_EMBED } from "@/lib/company";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Clean Startseite (Vorschau)",
  description:
    "Vorschau einer klaren, verkürzten MUC-Cargohandling-Startseite – Inspiration CHI Cargo, mit MUC-Rot als Akzent.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/neu" },
};

const HERO_SLIDES = [
  { src: "/images/home/hero.jpg", alt: "Luftfracht am Flughafen München" },
  {
    src: "/images/airline-handling/cargo-tarmac.jpg",
    alt: "Cargo-Handling auf dem Vorfeld",
  },
  {
    src: "/images/airline-handling/aircraft-loading.jpg",
    alt: "Beladung eines Frachtflugzeugs",
  },
  {
    src: "/images/roentgen/cargo-hold.jpg",
    alt: "Frachtraum und Sicherheitsprozesse",
  },
] as const;

const PILLARS = [
  {
    title: "Standort MUC",
    text: "Direkt am Cargo-Drehkreuz – kurze Wege, schnelle Abstimmung.",
  },
  {
    title: "Klare Prozesse",
    text: "Import, Export und Security mit dokumentierten Übergaben.",
  },
  {
    title: "Persönlich",
    text: "Direkte Ansprechpartner statt anonymer Abwicklungskette.",
  },
] as const;

/**
 * Alternative Startseite – bewusst getrennt von `/`.
 * Clean, verkürzt, CHI-Cargo-Anmutung mit MUC-Rot als Akzent.
 */
export default function CleanHomePreviewPage() {
  return (
    <div className="clean-home">
      <section className="clean-home__hero" aria-label="Hero">
        <HeroMedia slides={[...HERO_SLIDES]} />
        <div className="clean-home__hero-veil" aria-hidden="true" />
        <div className="clean-home__hero-copy">
          <p className="clean-home__eyebrow">MUC Cargohandling · Flughafen München</p>
          <h1 className="clean-home__slogan">
            Wir bewegen
            <br />
            <span>Ihre Luftfracht</span>
          </h1>
          <p className="clean-home__hero-lead">
            Import, Export, Airline Handling und Security – klar, zuverlässig, vor Ort.
          </p>
          <div className="clean-home__hero-actions">
            <Button href="/kontakt" variant="primary" size="hero">
              Anfrage stellen
            </Button>
            <Link href="/unternehmen" className="clean-home__ghost-link">
              Über uns
            </Link>
          </div>
        </div>
      </section>

      <section className="clean-home__welcome">
        <div className="clean-home__wrap">
          <p className="clean-home__kicker">Willkommen</p>
          <h2 className="clean-home__h2">
            Partner für Luftfracht
            <br />
            am Flughafen München
          </h2>
          <p className="clean-home__lead">
            Seit 2003 begleiten wir Sendungen von der Annahme bis zur Freigabe – mit
            kurzen Wegen, geprüften Sicherheitsprozessen und direkter Betreuung.
          </p>
          <p className="clean-home__meta">
            Reglementierter Beauftragter {COMPANY.regAgent}
          </p>
        </div>
      </section>

      <section className="clean-home__services" aria-label="Leistungen">
        <div className="clean-home__wrap">
          <p className="clean-home__kicker">Leistungen</p>
          <h2 className="clean-home__h2 clean-home__h2--sm">Was wir übernehmen</h2>
          <ul className="clean-home__service-grid">
            {SERVICES.map((service) => (
              <li key={service.href}>
                <Link href={service.href} className="clean-home__service">
                  <span className="clean-home__service-title">{service.title}</span>
                  <span className="clean-home__service-sub">{service.subtitle}</span>
                  <span className="clean-home__service-text">{service.description}</span>
                  <span className="clean-home__service-go" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="clean-home__pillars" aria-label="Warum MUC">
        <div className="clean-home__wrap">
          <ul className="clean-home__pillar-grid">
            {PILLARS.map((item) => (
              <li key={item.title} className="clean-home__pillar">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="clean-home__split">
        <div className="clean-home__split-media">
          <Image
            src="/images/home/team-band.jpg"
            alt="Team und Abwicklung am Standort München"
            fill
            className="object-cover"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className="clean-home__split-copy">
          <p className="clean-home__kicker">Sicherheit</p>
          <h2 className="clean-home__h2 clean-home__h2--sm">
            Security integriert in jeden Schritt
          </h2>
          <p className="clean-home__lead">
            Röntgen, Sichtkontrolle, Handdurchsuchung und ETD – dokumentiert und
            abstimmbar auf Ihr Zeitfenster.
          </p>
          <Button href="/roentgen" variant="primary" size="md">
            Röntgen & Security
          </Button>
        </div>
      </section>

      <section className="clean-home__map" id="standort">
        <div className="clean-home__wrap">
          <p className="clean-home__kicker">Standort</p>
          <h2 className="clean-home__h2 clean-home__h2--sm">
            Frachtzentrum München
          </h2>
          <p className="clean-home__lead clean-home__lead--narrow">
            {COMPANY.office.line1}, {COMPANY.office.line2}
          </p>
          <div className="clean-home__map-frame">
            <LocationMap embedSrc={MAPS_EMBED} />
          </div>
        </div>
      </section>

      <section className="clean-home__cta">
        <div className="clean-home__wrap clean-home__cta-inner">
          <h2 className="clean-home__h2 clean-home__h2--sm clean-home__h2--on-dark">
            Bereit für die nächste Sendung?
          </h2>
          <p className="clean-home__cta-text">
            Kurze Anfrage genügt – wir melden uns mit den nächsten Schritten.
          </p>
          <Button href="/kontakt" variant="primary" size="hero">
            Kontakt aufnehmen
          </Button>
        </div>
      </section>
    </div>
  );
}
