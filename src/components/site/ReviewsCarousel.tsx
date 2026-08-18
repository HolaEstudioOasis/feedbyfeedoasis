import { useState } from "react";

type Review = { name: string; text: string };

const reviews: Review[] = [
  {
    name: "Andrea Enríquez Tostado",
    text: "Alicia not only has an impeccable level of professionalism and an incredible quality of care, but she also helped me throughout my entire journey and prepared me for the wonderful world of breastfeeding. She was there for me via WhatsApp during those difficult days when you feel like you just can't get your baby to latch. Her warmth and patience were an incredible source of support. Her visits were always punctual and professional, and her approach was always very respectful. When we transitioned from breastfeeding to bottle-feeding, it was one of the hardest parts of the process. When I reached out to her again for help, she truly saved me. After trying everything, she helped my baby successfully take the bottle. Thank you, Alicia! You made my breastfeeding journey such a beautiful experience. ❤️ I highly recommend Alicia as a lactation consultant, 100%!",
  },
  {
    name: "Giovana Figliolia",
    text: "I can't recommend her enough! Alicia supported me when my son was just a couple of weeks old and struggling with a tongue tie. Her patience, care, and deep expertise in oral motor skills made a huge difference in our breastfeeding journey. Beyond her technical skills, she made me feel reassured, supported, and so much more confident during a vulnerable postpartum period. I'm so grateful to have had her in our corner!",
  },
  {
    name: "Léa Beauvais",
    text: "Alicia helped with my breastfeeding journey enormously! She visited me on day 2 postpartum and helped with a painful latch by adjusting my positioning, gave me many tips and also assessed my baby for a tongue and lip tie. She was very generous with her time and energy and also gave me alternative options to consider to encourage longterm breastfeeding. The next day, my milk came in strong. I couldn't have done it without her! Thank you, Ali!",
  },
  {
    name: "Maria Bermudez",
    text: "I can't recommend her enough! She has supported me with both of my daughters, always with so much patience, kindness, and genuine care. She made me feel comfortable and supported every step of the way, especially during those challenging early days of breastfeeding. She also identified my first daughter's tongue tie early on, which made a huge difference for us. I will always be grateful for her knowledge, compassion, and dedication. She is truly exceptional at what she does, and I would highly recommend her to any mom looking for breastfeeding support. ❤️",
  },
  {
    name: "Maria Fernanda Gomez de la Garza",
    text: "I highly recommend that every mom-to-be and new mom have a few sessions with Alicia. I had the opportunity to receive guidance from her through virtual sessions while living in Germany, just a few days before my son's birth and during the postpartum period. Her support helped us so much. Thank you, Alicia, for being so patient and for providing us with all the information we needed to have a successful breastfeeding journey. 😊 Our son is now five months old and growing so well. We're so grateful for your guidance!",
  },
];

function Stars() {
  return (
    <div className="stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20">
          <path d="M10 1l2.6 5.9 6.4.6-4.8 4.3 1.4 6.2L10 14.9 4.4 18l1.4-6.2L1 7.5l6.4-.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const total = reviews.length;
  const go = (next: number) => setIndex((next + total) % total);
  const review = reviews[index]!;

  return (
    <div className="reviews-carousel">
      <div className="reviews-carousel-viewport" aria-live="polite">
        <article className="review-card">
          <Stars />
          <blockquote className="quote">"{review.text}"</blockquote>
          <p className="review-author">— {review.name}</p>
        </article>
      </div>

      <div className="reviews-carousel-controls">
        <button
          type="button"
          className="carousel-arrow"
          onClick={() => go(index - 1)}
          aria-label="Previous review"
        >
          ‹
        </button>
        <div className="carousel-dots">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              className={`carousel-dot${i === index ? " is-active" : ""}`}
              onClick={() => go(i)}
              aria-label={`Show review ${i + 1} of ${total}`}
              aria-current={i === index}
            />
          ))}
        </div>
        <button
          type="button"
          className="carousel-arrow"
          onClick={() => go(index + 1)}
          aria-label="Next review"
        >
          ›
        </button>
      </div>

      <div className="reviews-carousel-cta">
        <a
          className="btn btn-outline"
          href="https://share.google/luL8T06U9Xhubl4aQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more reviews on Google
        </a>
      </div>
    </div>
  );
}
