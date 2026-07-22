import type { FaqItem } from "@/lib/faq";

type Props = {
  items: readonly FaqItem[];
  compact?: boolean;
  className?: string;
};

export function FaqList({ items, compact = false, className = "" }: Props) {
  return (
    <dl
      className={`divide-y divide-[var(--border)] border-y border-[var(--border)] ${compact ? "faq-list--compact" : ""} ${className}`.trim()}
    >
      {items.map((item) => (
        <div key={item.q} className={compact ? "faq-list__item--compact" : "py-6 md:py-7"}>
          <dt
            className={
              compact
                ? "text-[14px] font-normal tracking-[-0.01em] text-[var(--foreground)]"
                : "text-[15px] font-normal tracking-[-0.01em] text-[var(--foreground)]"
            }
          >
            {item.q}
          </dt>
          <dd className={`prose-muted ${compact ? "mt-2 text-[13px] leading-relaxed" : "mt-2.5 text-[14px]"}`}>
            {item.a}
          </dd>
        </div>
      ))}
    </dl>
  );
}
