"use client";

import { Children } from "react";
import { ScrollReveal } from "./ScrollReveal";

type Props = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  variant?: "up" | "fade" | "scale";
  duration?: number;
  itemClassName?: string;
};

export function ScrollRevealStagger({
  children,
  className = "",
  stagger = 100,
  variant = "up",
  duration = 1000,
  itemClassName = "",
}: Props) {
  const items = Children.toArray(children);

  return (
    <div className={className}>
      {items.map((child, index) => (
        <ScrollReveal
          key={index}
          delay={index * stagger}
          variant={variant}
          duration={duration}
          className={itemClassName}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
