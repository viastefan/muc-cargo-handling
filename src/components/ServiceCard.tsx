import Image from "next/image";
import { CheckIcon } from "./ArrowIcon";

export function ServiceCard({
  image,
  title,
  description,
  bullets,
}: {
  image: string;
  title: string;
  description?: string;
  bullets?: string[];
}) {
  return (
    <article className="overflow-hidden border border-[var(--border)] bg-white">
      <div className="relative aspect-[16/10] w-full">
        <Image src={image} alt={title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[var(--foreground)]">{title}</h3>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
        )}
        {bullets && bullets.length > 0 && (
          <ul className="mt-4 space-y-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-[var(--muted)]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8eef3] text-[#4a6b82]">
                  <CheckIcon />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export function InfoStat({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--surface)] p-6">
      <h3 className="text-base font-bold">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{children}</div>
    </div>
  );
}
