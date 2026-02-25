import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

const ScrollReveal = ({ children, className = "", delay = 0, direction = "up" }: Props) => {
  const { ref, isVisible } = useScrollAnimation();

  const directionStyles: Record<string, string> = {
    up: "translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${directionStyles[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
