"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type HeroSlide = {
  src: string;
  alt?: string;
};

type Props = {
  slides: HeroSlide[];
  /** First slide loads with priority. */
  priority?: boolean;
};

const INTERVAL_MS = 6500;
const SWIPE_PX = 48;

/**
 * Crossfading hero background with slow Ken-Burns drift.
 * Auto-advances; swipe / buttons / dots for manual control.
 */
export function HeroMedia({ slides, priority = true }: Props) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);

  const go = useCallback(
    (next: number) => {
      if (count < 2) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count < 2 || paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => go(index + 1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [count, paused, index, go]);

  if (count === 0) return null;

  return (
    <div
      className="hero-media"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => setTouchX(e.changedTouches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touchX == null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touchX) - touchX;
        if (Math.abs(dx) >= SWIPE_PX) go(index + (dx < 0 ? 1 : -1));
        setTouchX(null);
      }}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`hero-media__slide${i === index ? " is-active" : ""}`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt ?? ""}
            fill
            priority={priority && i === 0}
            className="hero-image object-cover object-[center_32%] lg:object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {count > 1 ? (
        <div className="hero-media__controls" role="group" aria-label="Hero-Bilder">
          <button
            type="button"
            className="hero-media__arrow hero-media__arrow--prev"
            aria-label="Vorheriges Bild"
            onClick={() => go(index - 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M14.5 5.5 8 12l6.5 6.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="hero-media__dots">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                className={`hero-media__dot${i === index ? " is-active" : ""}`}
                aria-label={`Bild ${i + 1} von ${count}`}
                aria-current={i === index}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="hero-media__arrow hero-media__arrow--next"
            aria-label="Nächstes Bild"
            onClick={() => go(index + 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9.5 5.5 16 12l-6.5 6.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
