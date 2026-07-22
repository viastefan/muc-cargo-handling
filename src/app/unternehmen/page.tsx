import type { Metadata } from "next";
import Image from "next/image";
import { FooterCta } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ClockIcon, GlobeIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ArrowIcon";

export const metadata: Metadata = {
  title: "Unternehmen",
};

const TIMELINE = [
  { year: "2003", text: "Gründung ALD – Airport Lagerdienste e.K." },
  { year: "2015", text: "MUC Cargo Handling GmbH" },
  { year: "2021", text: "Umwandlung zur GmbH" },
  { year: "Heute", text: "Erfahrener Partner für Airport Cargo Services." },
];

const TEAM = [
  { name: "John-Isacco Onyeke", role: "Geschäftsführer", phone: "089 – 975 948 77", email: "info@muc-cargohandling.com" },
  { name: "Lynn Onyeke", role: "Leitung Organisation", phone: "089 – 975 948 77", email: "info@muc-cargohandling.com" },
  { name: "Team Operations", role: "Leiter Logistik", phone: "089 – 975 948 77", email: "ops@muc-cargohandling.com" },
  { name: "Team Security", role: "Sicherheitskontrollen", phone: "089 – 975 948 77", email: "security@muc-cargohandling.com" },
];

export default function UnternehmenPage() {
  return (
    <>
      <Hero
        image="/images/unternehmen/hero.jpg"
        title="Über MUC Cargo Handling"
        subtitle="Mit Erfahrung, strukturierten Abläufen und höchsten Qualitätsstandards sorgen wir für eine sichere, effiziente und transparente Abwicklung Ihrer Sendungen am Flughafen München."
      />

      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
        <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
          Präzise Prozesse. Verlässliche Abläufe. Sichere Luftfracht
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-[15px] leading-relaxed text-[var(--muted)]">
            <p>
              MUC Cargo Handling steht für professionelle Luftfrachtabwicklung
              am Flughafen München. Wir verbinden operative Exzellenz mit klaren
              Kommunikationswegen – damit Airlines, Spediteure und Versender
              sich auf das Wesentliche konzentrieren können.
            </p>
            <p>
              Seit 2003 haben wir unsere Prozesse kontinuierlich weiterentwickelt:
              von der Annahme und Dokumentation über Zoll- und Compliance-
              Themen bis hin zu Sicherheitskontrollen nach aktuellen Vorgaben.
            </p>
            <p>
              Unser Anspruch ist einfach: jede Sendung so behandeln, als wäre
              sie die einzige – mit Sorgfalt, Nachvollziehbarkeit und Tempo.
            </p>
          </div>
          <ol className="relative border-l border-[var(--border)] pl-8">
            {TIMELINE.map((item) => (
              <li key={item.year} className="relative mb-10 last:mb-0">
                <span className="absolute -left-[41px] top-1 h-3.5 w-3.5 rounded-full border-2 border-[var(--brand)] bg-white" />
                <p className="text-sm font-bold text-[var(--brand)]">{item.year}</p>
                <p className="mt-1 text-[15px] text-[var(--foreground)]">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
          <span className="inline-block border border-[var(--border)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]">
            Unternehmen
          </span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Unser Team</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {TEAM.map((person) => (
              <article key={person.name} className="bg-white p-6">
                <h3 className="text-lg font-bold">{person.name}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{person.role}</p>
                <div className="mt-5 space-y-2 text-sm text-[var(--muted)]">
                  <p className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4 text-[var(--brand)]" />
                    {person.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <MailIcon className="text-[var(--brand)]" />
                    {person.email}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
        <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
          Erfahrung, Kompetenz und zuverlässige Cargo-Prozesse
        </h2>
        <div className="relative mt-10 aspect-[21/9] w-full overflow-hidden">
          <Image
            src="/images/unternehmen/stats.jpg"
            alt="Team bei der Arbeit"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-3xl font-bold text-[var(--brand)]">20+</p>
            <p className="mt-1 text-sm font-semibold">Jahre Erfahrung</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Airport Cargo seit 2003</p>
          </div>
          <div>
            <div className="text-[var(--brand)]"><ClockIcon /></div>
            <p className="mt-2 text-3xl font-bold">24/7</p>
            <p className="mt-1 text-sm font-semibold">Erreichbarkeit</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Operative Verfügbarkeit</p>
          </div>
          <div>
            <div className="text-[var(--brand)]"><PinIcon className="h-6 w-6" /></div>
            <p className="mt-2 text-3xl font-bold">MUC</p>
            <p className="mt-1 text-sm font-semibold">Standort</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Südallee 18/20, Flughafen München</p>
          </div>
          <div>
            <div className="text-[var(--brand)]"><GlobeIcon /></div>
            <p className="mt-2 text-3xl font-bold">Global</p>
            <p className="mt-1 text-sm font-semibold">International</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Import- und Export-Expertise</p>
          </div>
        </div>
      </section>

      <FooterCta title="Gemeinsam für sichere und effiziente Luftfrachtprozesse." />
    </>
  );
}
