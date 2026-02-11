import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const memories = [
  {
    date: 'The Day It Began',
    title: 'When I First Saw You',
    description: 'My heart skipped a beat and I just knew — you were going to change my life forever.',
    accent: 'from-rose-500/20 to-rose-400/5',
    image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&q=75',
  },
  {
    date: 'The Butterflies',
    title: 'Our First Conversation',
    description: 'I was so nervous, but your smile made everything feel easy. I could have talked to you forever.',
    accent: 'from-rose-400/15 to-rose-300/5',
    image: 'https://images.unsplash.com/photo-1518882460567-3bf34a5d2a6d?w=600&q=75',
  },
  {
    date: 'The Moment',
    title: 'When You Made Me Laugh',
    description: 'That silly joke nobody else found funny — I could not stop laughing. That is when I knew you were special.',
    accent: 'from-rose-600/15 to-rose-400/5',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=75',
  },
  {
    date: 'The Warmth',
    title: 'You Held My Hand',
    description: 'My whole world went quiet and the only thing I could feel was your warmth. I never wanted to let go.',
    accent: 'from-rose-500/15 to-rose-300/5',
    image: 'https://images.unsplash.com/photo-1548094891-c4ba474efd16?w=600&q=75',
  },
  {
    date: 'The Comfort',
    title: 'You Were There For Me',
    description: 'On my worst day, you showed up. No questions, no judgement — just you, holding me together.',
    accent: 'from-rose-400/20 to-rose-500/5',
    image: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=600&q=75',
  },
  {
    date: 'Forever Starts Here',
    title: 'Falling Deeper Every Day',
    description: 'Every single day I find a new reason to love you more. This is just the beginning of us.',
    accent: 'from-rose-500/20 to-rose-400/5',
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=75',
  },
];

function MemoryCard({ memory, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-center w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-center`}>
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-400 border-4 border-[#050208] z-20 shadow-[0_0_12px_rgba(201,168,78,0.4)] animate-pulse-dot"
      />

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -100 : 100, y: 30 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isLeft ? -100 : 100, y: 30 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        whileHover={{ y: -5, transition: { duration: 0.3, ease: 'easeOut' } }}
        className={`glass-strong w-full max-w-md md:max-w-lg ${isLeft ? 'md:mr-auto md:ml-8' : 'md:ml-auto md:mr-8'} md:w-[45%] group hover:border-gold-400/20 transition-colors duration-500`}
      >
        {/* Decorative header with rose image */}
        <div className={`relative overflow-hidden rounded-t-[0.9rem] h-32 flex items-center justify-center`}>
          <img
            src={memory.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-linear-to-br ${memory.accent}`} />
          <div className="absolute inset-0 bg-linear-to-t from-[rgba(5,2,8,0.8)] via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 64 } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
              className="h-px bg-rose-400/30"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.3, delay: 0.8, type: 'spring' }}
              className="mx-3 w-2 h-2 rounded-full bg-rose-400/40"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 64 } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
              className="h-px bg-rose-400/30"
            />
          </div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-3 left-4 text-xs text-rose-300/50 tracking-wider uppercase font-medium"
          >
            {memory.date}
          </motion.span>
        </div>

        {/* Content with staggered reveal */}
        <div className="p-5 pt-4">
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
            className="font-display text-xl md:text-2xl text-white/95 mb-2"
          >
            {memory.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
            className="text-rose-100/60 text-sm md:text-base leading-relaxed"
          >
            {memory.description}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  const containerRef = useRef(null);
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Calculate how far we've scrolled through the timeline
      const scrolled = Math.max(0, -containerTop + viewportHeight * 0.5);
      const progress = Math.min(1, Math.max(0, scrolled / containerHeight));
      setFillHeight(progress * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative py-24 md:py-36 px-4">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-16 md:mb-24"
      >
        <div className="heading-ornament">♦</div>
        <h2 className="font-display text-4xl md:text-6xl text-white/95 mb-4">How You Stole My Heart</h2>
        <p className="text-rose-200/50 text-base md:text-lg max-w-md mx-auto">Every moment that made me fall a little more for you...</p>
      </motion.div>

      <div ref={containerRef} className="relative max-w-5xl mx-auto">
        {/* Timeline track */}
        <div className="timeline-line hidden md:block" />
        <div
          className="timeline-line-fill hidden md:block"
          style={{ height: `${fillHeight}%` }}
        />

        {/* Memory cards */}
        <div className="flex flex-col gap-12 md:gap-20">
          {memories.map((memory, i) => (
            <MemoryCard key={i} memory={memory} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
