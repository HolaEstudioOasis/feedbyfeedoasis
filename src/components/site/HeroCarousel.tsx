import { useEffect, useRef, useState } from "react";
import slide1 from "@/assets/carrusel-1.webp.asset.json";
import slide2 from "@/assets/carrusel-2.webp.asset.json";
import slide3 from "@/assets/carrusel-3.webp.asset.json";

const slides = [
  { url: slide1.url, alt: "Two women smiling as they hold a baby together outdoors" },
  { url: slide2.url, alt: "Parents holding their newborn baby close together, foreheads touching" },
  { url: slide3.url, alt: "A father smiling as he spoon feeds his baby in a high chair" },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => window.clearInterval(id);
  }, [paused, tick]);

  const goTo = (i: number) => {
    setIndex(i);
    setTick((t) => t + 1); // restart autoplay timer
  };

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
          className={`hero-slide hero-slide--${i + 1}${i === index ? " is-active" : ""}`}
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
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

