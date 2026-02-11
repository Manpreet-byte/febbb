import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const letterText = `My Dearest,

I know I do not always say it the way I should, but you mean the absolute world to me.

You are the boy who turned my ordinary days into something extraordinary. Your laugh makes my heart do a little flip every single time. The way you look at me when you think I am not paying attention — I notice, and it makes me melt.

I love how you make me feel safe without even trying. I love that you remember the tiny things I mention and surprise me with them later. I love your silly jokes, your warm embrace, and the way you hold my hand just a little tighter when we are in a crowd.

You are my favorite person, my best friend, and the one I want to grow old with.

Thank you for choosing me. Thank you for loving me — messy hair, overthinking, and all.

I will keep falling for you, every single day.

Forever yours,
With all my love`;

export default function LoveLetter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [revealed, setRevealed] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isInView || isTyping) return;
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setRevealed(i);
      if (i >= letterText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 22);
    return () => clearInterval(interval);
  }, [isInView]);

  const displayText = letterText.slice(0, revealed);

  return (
    <section ref={ref} className="relative py-24 md:py-36 px-4 overflow-hidden">
      {/* Background rose decoration */}
      <div className="absolute -left-20 top-1/4 w-72 h-96 pointer-events-none opacity-[0.04] rotate-12 hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=500&q=60"
          alt=""
          className="w-full h-full object-cover img-vignette"
          loading="lazy"
        />
      </div>
      <div className="absolute -right-16 bottom-1/4 w-64 h-80 pointer-events-none opacity-[0.04] -rotate-12 hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1548094891-c4ba474efd16?w=500&q=60"
          alt=""
          className="w-full h-full object-cover img-vignette"
          loading="lazy"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-12 md:mb-16"
      >
        <div className="heading-ornament">♦</div>
        <h2 className="font-display text-4xl md:text-6xl text-white/95 mb-4">A Letter For You</h2>
        <p className="text-rose-200/50 text-base md:text-lg max-w-md mx-auto">
          Words from the deepest corner of my heart...
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: 20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-2xl mx-auto"
        style={{ perspective: 1000 }}
      >
        <div className="glass-strong p-8 md:p-12 relative overflow-hidden">
          {/* Decorative seal */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 w-14 h-14 md:w-16 md:h-16 rounded-lg border-2 border-rose-400/20 flex items-center justify-center rotate-12 opacity-50">
            <span className="font-serif text-gold-400/40 text-xl md:text-2xl italic">L</span>
          </div>

          {/* Paper texture lines */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(255,255,255,0.5) 31px, rgba(255,255,255,0.5) 32px)',
              backgroundPosition: '0 60px',
            }}
          />

          {/* Letter content */}
          <pre className="font-sans text-sm md:text-base text-rose-100/70 leading-loose whitespace-pre-wrap relative z-10">
            {displayText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="inline-block w-0.5 h-5 bg-rose-400 ml-0.5 align-middle"
              />
            )}
          </pre>

          {/* Wax seal */}
          {revealed >= letterText.length && (
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: [0, 1.4, 0.9, 1.1, 1], rotate: [-180, 15, -5, 0], opacity: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
              className="mt-8 flex justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-rose-500 to-rose-700 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.4)] border-2 border-rose-400/30">
                <span className="font-serif text-white text-lg">♥</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
