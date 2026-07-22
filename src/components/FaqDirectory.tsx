"use client";

import { useCallback, useEffect, useId, useState } from "react";
import type { FaqCategory } from "@/lib/faq";

type Props = {
  categories: readonly FaqCategory[];
};

export function FaqDirectory({ categories }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const [menuOpen, setMenuOpen] = useState(false);
  const baseId = useId();
  const menuTitleId = `${baseId}-menu-title`;

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

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const goToCategory = (categoryId: string) => {
    const target = document.getElementById(`faq-${categoryId}`);
    closeMenu();
    if (!target) return;

    window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveCategory(categoryId);
    }, 60);
  };

  const activeTitle =
    categories.find((category) => category.id === activeCategory)?.title ?? "Inhalt";

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

      <button
        type="button"
        className={`faq-toc-fab${menuOpen ? " is-open" : ""}`}
        aria-expanded={menuOpen}
        aria-controls={`${baseId}-menu`}
        aria-haspopup="dialog"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="faq-toc-fab__icon" aria-hidden="true">
          {menuOpen ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path
                d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path
                d="M5 7.5h14M5 12h14M5 16.5h10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
        <span className="faq-toc-fab__copy">
          <span className="faq-toc-fab__label">{menuOpen ? "Schließen" : "Inhalt"}</span>
          {!menuOpen ? <span className="faq-toc-fab__active">{activeTitle}</span> : null}
        </span>
      </button>

      {menuOpen ? (
        <div className="faq-toc-sheet" id={`${baseId}-menu`}>
          <button
            type="button"
            className="faq-toc-sheet__backdrop"
            aria-label="Verzeichnis schließen"
            onClick={closeMenu}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={menuTitleId}
            className="faq-toc-sheet__panel"
          >
            <div className="faq-toc-sheet__handle-wrap" aria-hidden="true">
              <span className="faq-toc-sheet__handle" />
            </div>

            <div className="faq-toc-sheet__header">
              <div>
                <p className="faq-toc-sheet__eyebrow">FAQ</p>
                <h2 id={menuTitleId} className="faq-toc-sheet__title">
                  Verzeichnis
                </h2>
              </div>
              <button
                type="button"
                className="faq-toc-sheet__close"
                aria-label="Schließen"
                onClick={closeMenu}
              >
                ×
              </button>
            </div>

            <nav className="faq-toc-sheet__nav" aria-label="FAQ-Kategorien">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  type="button"
                  className={`faq-toc-sheet__link${
                    activeCategory === category.id ? " is-active" : ""
                  }`}
                  onClick={() => goToCategory(category.id)}
                >
                  <span className="faq-toc-sheet__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="faq-toc-sheet__text">
                    <span className="faq-toc-sheet__name">{category.title}</span>
                    <span className="faq-toc-sheet__meta">
                      {category.items.length}{" "}
                      {category.items.length === 1 ? "Frage" : "Fragen"}
                    </span>
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
