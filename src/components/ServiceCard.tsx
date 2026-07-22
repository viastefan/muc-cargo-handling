import Image from "next/image";
import Link from "next/link";
import { CheckIcon } from "./ArrowIcon";
import { ButtonArrowIcon } from "./ButtonArrowIcon";

type Props = {
  image: string;
  title: string;
  description?: string;
  bullets?: string[];
  href?: string;
};

function CardBody({
  title,
  description,
  bullets,
  href,
}: Pick<Props, "title" | "description" | "bullets" | "href">) {
  return (
    <div className="service-card-body">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-[17px] font-medium leading-snug tracking-[-0.02em] text-[var(--foreground)] md:text-[18px]">
          {title}
        </h3>
        {href && (
          <span
            className="service-card-arrow shrink-0 text-[var(--muted-light)] transition-colors group-hover:text-[var(--brand)]"
            aria-hidden="true"
          >
            <ButtonArrowIcon className="!relative !top-0 !right-0 text-[1.05rem]" />
          </span>
        )}
      </div>
      {description && <p className="service-card-text">{description}</p>}
      {bullets && bullets.length > 0 && (
        <ul className="mt-5 space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-[14px] leading-relaxed text-[var(--muted)]">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--muted-accent)]">
                <CheckIcon />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ServiceCard({ image, title, description, bullets, href }: Props) {
  const inner = (
    <article className="service-card group flex h-full flex-col bg-white">
      <div className="service-card-media relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface)]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 50vw"
        />
      </div>
      <CardBody title={title} description={description} bullets={bullets} href={href} />
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="service-card-link h-full">
        {inner}
      </Link>
    );
  }

  return inner;
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
