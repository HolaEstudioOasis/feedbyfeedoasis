import { useEffect, useRef, useState } from "react";
import slide1 from "@/assets/carrusel-1.webp.asset.json";
import slide2 from "@/assets/carrusel-2.webp.asset.json";
import slide3 from "@/assets/carrusel-3.webp.asset.json";

const slides = [
  { url: slide1.url, alt: "Parents holding their newborn baby together at home, foreheads touching" },
  { url: slide2.url, alt: "Baby in a high chair being spoon fed by two smiling parents" },
  { url: slide3.url, alt: "Two women smiling and holding a baby outdoors in a garden" },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <img
          key={s.url}
          src={s.url}
          alt={s.alt}
          className={`hero-slide${i === index ? " is-active" : ""}`}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : undefined}
        />
      ))}
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-dots">
        {slides.map((s, i) => (
          <button
            key={s.url}
            type="button"
            className={`hero-dot${i === index ? " is-active" : ""}`}
            aria-label={`Show photo ${i + 1} of ${slides.length}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
