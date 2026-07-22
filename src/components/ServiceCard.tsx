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
    <article className="group bg-white">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface)]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width:768px) 100vw, 50vw"
        />
      </div>
      <div className="pt-5 md:pt-6">
        <h3 className="text-[17px] font-normal tracking-[-0.01em] text-[var(--foreground)]">
          {title}
        </h3>
        {description && (
          <p className="prose-muted mt-2.5 text-[14px]">{description}</p>
        )}
        {bullets && bullets.length > 0 && (
          <ul className="mt-4 space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[14px] text-[var(--muted)]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--muted-accent)]">
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
    <article className="flex min-h-[160px] flex-col bg-[var(--surface)] p-6 md:p-7">
      <h3 className="text-[15px] font-normal tracking-[-0.01em]">{title}</h3>
      <div className="prose-muted mt-2 flex-1 text-[14px]">{children}</div>
    </article>
  );
}
