"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "up" | "fade" | "scale";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
  duration?: number;
};

export function ScrollReveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  duration = 480,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  // Cap long reveals so pages stay snappy even with older duration props.
  const resolvedDuration = Math.min(duration, 560);
  const resolvedDelay = Math.min(delay, 120);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Already in view on mount (above-the-fold): show immediately.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      const id = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -4% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "scroll-reveal",
        `scroll-reveal--${variant}`,
        visible ? "is-visible" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--reveal-delay": `${resolvedDelay}ms`,
          "--reveal-duration": `${resolvedDuration}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
