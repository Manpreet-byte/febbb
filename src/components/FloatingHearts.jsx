import { useMemo } from 'react';

const hearts = ['♥', '♡', '❤'];

export default function FloatingHearts() {
  const items = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      heart: hearts[i % hearts.length],
      left: `${Math.random() * 100}%`,
      size: `${0.6 + Math.random() * 1.4}rem`,
      duration: `${12 + Math.random() * 20}s`,
      delay: `${Math.random() * 15}s`,
    })),
    []
  );

  return (
    <div className="hearts-container">
      {items.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDuration: h.duration,
            animationDelay: h.delay,
          }}
        >
          {h.heart}
        </span>
      ))}
    </div>
  );
}
