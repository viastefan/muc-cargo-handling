import Image from "next/image";
import { media } from "@/lib/media";

export function InternationalGlobeSection() {
  return (
    <section className="mt-4 overflow-hidden bg-[#0c0c0c]">
      <div className="page-container grid items-center gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 lg:py-14">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-[420px] lg:mx-0 lg:max-w-none">
          <Image
            src={media.weltkugel}
            alt=""
            fill
            className="object-contain object-center"
            sizes="(max-width: 1024px) 80vw, 420px"
          />
        </div>
        <div className="text-center lg:text-left">
          <p className="text-[11px] font-normal uppercase tracking-[0.12em] text-white/45">
            International
          </p>
          <h3 className="heading-display mt-3 text-[clamp(1.375rem,3.5vw,2rem)] text-white">
            Globale Luftfracht, lokale Präzision
          </h3>
          <p className="mt-4 max-w-lg text-[14px] font-normal leading-[1.7] text-white/72 sm:text-[15px]">
            Professionelle Abwicklung von Import- und Exportsendungen am Flughafen
            München – mit kurzen Wegen, klaren Prozessen und zuverlässiger
            Kommunikation entlang der gesamten Kette.
          </p>
        </div>
      </div>
    </section>
  );
}
