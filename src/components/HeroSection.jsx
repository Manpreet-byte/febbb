import { motion } from 'framer-motion';
import { useMemo } from 'react';

/* ── Sparkle particles floating around the title ── */
function Sparkles() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${8 + Math.random() * 84}%`,
        top: `${15 + Math.random() * 70}%`,
        size: 1.5 + Math.random() * 2.5,
        delay: Math.random() * 6,
        duration: 2.5 + Math.random() * 3,
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-gold-300/60"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.5 },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 80, rotateX: -90, scale: 0.5, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 14, stiffness: 120 },
  },
};

const subtitleVariant = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, delay: 1.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scrollHintVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { delay: 2.8, duration: 1.2, ease: 'easeOut' } },
};

const title = 'For You, My Love';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Cinematic rose bouquet background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover opacity-[0.07] img-vignette scale-110"
          loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#050208] via-transparent to-[#050208]" />
      </div>

      {/* Dual breathing glow orbs */}
      <div className="absolute w-150 h-150 rounded-full bg-gold-500/8 animate-breathe pointer-events-none" />
      <div
        className="absolute w-100 h-100 rounded-full bg-rose-500/6 animate-breathe pointer-events-none"
        style={{ animationDelay: '2s' }}
      />

      {/* Sparkle particles */}
      <Sparkles />

      {/* Title with 3D letter reveal + hover */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 z-10"
        style={{ perspective: 800 }}
      >
        {title.split('').map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariant}
            whileHover={{
              scale: 1.15,
              color: '#d4b872',
              textShadow: '0 0 30px rgba(201,168,78,0.3)',
              transition: { duration: 0.2 },
            }}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white/95 tracking-tight cursor-default"
            style={{
              display: char === ' ' ? 'inline' : 'inline-block',
              minWidth: char === ' ' ? '0.3em' : undefined,
              transformStyle: 'preserve-3d',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>

      {/* Subtitle with blur-in + gentle float */}
      <motion.p
        variants={subtitleVariant}
        initial="hidden"
        animate="show"
        className="mt-6 md:mt-8 text-rose-200/80 text-lg md:text-2xl font-light tracking-wide text-center z-10 max-w-xl animate-float"
      >
        From my heart to yours — every word, every beat, every moment is{' '}
        <span className="text-shimmer italic font-medium">for you</span>
      </motion.p>

      {/* Explore hint */}
      <motion.div
        variants={scrollHintVariant}
        initial="hidden"
        animate="show"
        className="absolute bottom-10 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-gold-300/30 text-xs uppercase tracking-[0.25em]">Explore below</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-gold-400/30 text-lg"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
