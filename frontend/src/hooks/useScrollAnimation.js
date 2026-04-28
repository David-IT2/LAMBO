// ─── useScrollAnimation ───────────────────────────────────────────────────────
import { useEffect } from "react";

export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const targets = document.querySelectorAll(".animate-on-scroll");
    targets.forEach((t) => observer.observe(t));
    return () => targets.forEach((t) => observer.unobserve(t));
  });
}