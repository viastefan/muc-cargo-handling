"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/lib/faq";

type Props = {
  items: readonly FaqItem[];
  className?: string;
  /** Allow multiple items open at once. Default: one at a time. */
  allowMultiple?: boolean;
};

export function FaqList({ items, className = "", allowMultiple = false }: Props) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const isOpen = current.includes(id);
      if (allowMultiple) {
        return isOpen ? current.filter((item) => item !== id) : [...current, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className={`faq-accordion faq-accordion--home ${className}`.trim()}>
      {items.map((item, index) => {
        const itemId = `${baseId}-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-btn-${index}`;
        const isOpen = openIds.includes(itemId);

        return (
          <div key={item.q} className={`faq-accordion__item${isOpen ? " is-open" : ""}`}>
            <h3 className="faq-accordion__heading">
              <button
                type="button"
                id={buttonId}
                className="faq-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(itemId)}
              >
                <span className="faq-accordion__question">{item.q}</span>
                <span className="faq-accordion__icon" aria-hidden="true">
                  <span className="faq-accordion__icon-bar faq-accordion__icon-bar--h" />
                  <span className="faq-accordion__icon-bar faq-accordion__icon-bar--v" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="faq-accordion__panel"
            >
              <div className="faq-accordion__panel-inner">
                <p className="faq-accordion__answer">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
