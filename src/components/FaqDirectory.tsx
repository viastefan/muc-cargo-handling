"use client";

import { useEffect, useId, useState } from "react";
import type { FaqCategory } from "@/lib/faq";

type Props = {
  categories: readonly FaqCategory[];
};

export function FaqDirectory({ categories }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const baseId = useId();

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(`faq-${category.id}`))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveCategory(visible.target.id.replace(/^faq-/, ""));
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="faq-layout">
      <aside className="faq-toc" aria-label="FAQ-Verzeichnis">
        <p className="faq-toc__label">Inhalt</p>
        <nav className="faq-toc__nav">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#faq-${category.id}`}
              className={`faq-toc__link${activeCategory === category.id ? " is-active" : ""}`}
            >
              <span>{category.title}</span>
              <span className="faq-toc__count">{category.items.length}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="faq-main">
        {categories.map((category) => (
          <section
            key={category.id}
            id={`faq-${category.id}`}
            className="faq-section"
            aria-labelledby={`${baseId}-${category.id}`}
          >
            <h2 id={`${baseId}-${category.id}`} className="faq-section__title">
              {category.title}
            </h2>

            <div className="faq-accordion">
              {category.items.map((item, index) => {
                const itemId = `${category.id}-${index}`;
                const panelId = `${baseId}-panel-${itemId}`;
                const buttonId = `${baseId}-btn-${itemId}`;
                const isOpen = openId === itemId;

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
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="faq-accordion__panel"
                      hidden={!isOpen}
                    >
                      <p className="faq-accordion__answer">{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
