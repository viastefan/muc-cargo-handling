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
  duration = 1000,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -6% 0px",
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
          "--reveal-delay": `${delay}ms`,
          "--reveal-duration": `${duration}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
