import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const roses = [
  {
    src: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80',
    alt: 'Lush rose bouquet',
    caption: 'Every petal reminds me of you',
    span: 'rose-tall rose-wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=600&q=80',
    alt: 'Delicate pink roses',
    caption: 'Soft as your touch',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&q=80',
    alt: 'Single red rose',
    caption: 'One rose, one heart, one you',
    span: 'rose-tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1548094891-c4ba474efd16?w=600&q=80',
    alt: 'Red roses close-up',
    caption: 'The colour of my love',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1518882460567-3bf34a5d2a6d?w=600&q=80',
    alt: 'Pink rose arrangement',
    caption: 'Arranged with care, like my feelings',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=800&q=80',
    alt: 'Garden roses',
    caption: 'A garden of love for you',
    span: 'rose-wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=80',
    alt: 'Elegant rose display',
    caption: 'Elegance, like you',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=600&q=80',
    alt: 'Roses in soft light',
    caption: 'You light up my darkest days',
    span: 'rose-tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1574684891174-df6b02ab38d7?w=600&q=80',
    alt: 'Rose petals scattered',
    caption: 'Scattered like my thoughts of you',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=600&q=80',
    alt: 'Deep red roses',
    caption: 'Deep, like my love',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=800&q=80',
    alt: 'Roses in golden light',
    caption: 'Golden moments with you',
    span: 'rose-wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=600&q=80',
    alt: 'A single perfect rose',
    caption: 'Perfect, like you',
    span: '',
  },
];

export default function RoseGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="relative px-4 md:px-8 py-12 max-w-6xl mx-auto">
      {/* Gallery grid */}
      <div className="rose-gallery-grid">
        {roses.map((rose, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              delay: 0.1 + i * 0.08,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`group relative rounded-2xl overflow-hidden cursor-pointer ${rose.span}`}
          >
            {/* Image — fills entire card */}
            <img
              src={rose.src}
              alt={rose.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            {/* Permanent gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-[#050208]/80 via-[#050208]/10 to-transparent" />

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-t from-rose-900/40 via-transparent to-gold-400/10" />

            {/* Gold border on hover */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-gold-400/0 group-hover:ring-gold-400/30 transition-all duration-500" />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <p className="font-serif italic text-white/0 group-hover:text-white/80 text-sm md:text-base transition-colors duration-500 leading-relaxed">
                {rose.caption}
              </p>
            </div>

            {/* Subtle sparkle on hover */}
            <div className="absolute top-3 right-3 text-gold-400/0 group-hover:text-gold-400/50 transition-colors duration-700 text-xs font-serif">
              ♦
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom flourish */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
        className="text-center mt-12"
      >
        <p className="font-serif italic text-rose-300/40 text-sm">
          ♦ &nbsp;each one chosen with love&nbsp; ♦
        </p>
      </motion.div>
    </section>
  );
}
