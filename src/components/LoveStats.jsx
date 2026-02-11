import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Stats data ── */
const stats = [
  { label: 'Days I\'ve Loved You', value: 1341, suffix: '+', icon: '—', span: 'col-span-2 md:col-span-2' },
  { label: 'Times You Made Me Smile', value: 9999, suffix: '+', icon: '—', span: '' },
  { label: 'Butterflies You Gave Me', value: 999, suffix: '\u221e', icon: '—', span: '' },
  { label: 'Songs That Remind Me of You', value: 412, suffix: '+', icon: '—', span: 'md:col-span-2' },
  { label: 'Late Night Conversations', value: 547, suffix: '+', icon: '—', span: '' },
  { label: 'Flowers I Owe You', value: 100, suffix: '+', icon: '—', span: '' },
  { label: 'Reasons I Love You', value: 999, suffix: '\u221e', icon: '—', span: 'col-span-2 md:col-span-2' },
];

/* ── Animated Counter ── */
function Counter({ target, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white/95">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

/* ── Stat Card ── */
function StatCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3, ease: 'easeOut' } }}
      className={`glass group hover:border-gold-400/20 transition-all duration-500 p-6 md:p-8 flex flex-col items-center justify-center text-center gap-3 ${stat.span}`}
    >
      <span className="text-gold-400/40 text-lg md:text-xl font-serif group-hover:text-gold-400/60 transition-colors duration-300">
        ♦
      </span>
      <Counter target={stat.value} suffix={stat.suffix} inView={isInView} />
      <span className="text-rose-200/50 text-xs md:text-sm uppercase tracking-[0.2em]">
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function LoveStats() {
  return (
    <section className="relative py-24 md:py-36 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-12 md:mb-20"
      >
        <div className="heading-ornament">♦</div>
        <h2 className="font-display text-4xl md:text-6xl text-white/95 mb-4">Us in Numbers</h2>
        <p className="text-rose-200/50 text-base md:text-lg max-w-md mx-auto">
          Every moment with you counts, and here is the proof
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}
