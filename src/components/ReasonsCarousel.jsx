import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const reasons = [
  { text: 'Your smile — it makes my whole day better, instantly' },
  { text: 'How you always make me laugh, even when I am mad at you' },
  { text: 'The way you pull me closer without saying a word' },
  { text: 'How you remember every little thing I say' },
  { text: 'Your voice — especially when you say my name' },
  { text: 'How safe and warm I feel in your arms' },
  { text: 'The way you look at me like I am the only girl in the world' },
  { text: 'Your silly side that only I get to see' },
  { text: 'How you hold my hand tighter in a crowd' },
  { text: 'Your sleepy good morning texts that make me melt' },
  { text: 'How you always show up, no matter what' },
  { text: 'The way you tease me and then kiss my forehead' },
  { text: 'Your patience with my overthinking' },
  { text: 'How you make me believe in forever' },
  { text: 'Your hugs — they feel like home' },
  { text: 'Simply everything about you' },
];

function ReasonCard({ reason, index, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.3, y: 0, scale: 0.92 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`glass p-6 md:p-8 text-center transition-all duration-500 ${
        isActive ? 'border-gold-400/20 shadow-[0_0_40px_rgba(201,168,78,0.08)]' : ''
      }`}
    >
      <motion.span
        animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
        transition={{ duration: 0.8 }}
        className="inline-block font-serif text-4xl md:text-5xl mb-4 text-gold-400/30"
      >
        “
      </motion.span>
      <p className="font-serif text-lg md:text-xl text-white/90 leading-relaxed">
        "{reason.text}"
      </p>
      <p className="text-rose-400/40 text-xs mt-4 uppercase tracking-widest">
        Reason #{index + 1}
      </p>
    </motion.div>
  );
}

export default function ReasonsCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplaying, setAutoplaying] = useState(true);

  // Autoplay
  useEffect(() => {
    if (!isInView || !autoplaying) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % reasons.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isInView, autoplaying]);

  const goTo = (idx) => {
    setActiveIndex(idx);
    setAutoplaying(false);
    // Resume autoplay after 8s of inactivity
    setTimeout(() => setAutoplaying(true), 8000);
  };

  const prev = () => goTo((activeIndex - 1 + reasons.length) % reasons.length);
  const next = () => goTo((activeIndex + 1) % reasons.length);

  return (
    <section ref={ref} className="relative py-24 md:py-36 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-12 md:mb-16"
      >
        <div className="heading-ornament">♦</div>
        <h2 className="font-display text-4xl md:text-6xl text-white/95 mb-4">Why I Love You</h2>
        <p className="text-rose-200/50 text-base md:text-lg max-w-md mx-auto">
          I could go on forever, but here are a few reasons you stole my heart...
        </p>
      </motion.div>

      <div className="max-w-lg mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 80, rotateY: 12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80, rotateY: -12, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ perspective: 800 }}
          >
            <ReasonCard reason={reasons[activeIndex]} index={activeIndex} isActive={true} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-rose-300/60 hover:text-rose-300 hover:border-rose-400/30 transition-all cursor-pointer"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {reasons.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex ? 'bg-gold-400 w-6' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-rose-300/60 hover:text-rose-300 hover:border-rose-400/30 transition-all cursor-pointer"
          >
            →
          </button>
        </div>

        {/* Counter */}
        <p className="text-center text-rose-300/30 text-xs mt-4">
          {activeIndex + 1} of {reasons.length} reasons (and counting...)
        </p>
      </div>
    </section>
  );
}
