import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fortunes = [
  { message: 'A surprise embrace is coming your way today', lucky: '♥' },
  { message: 'Someone is thinking about you right now... and it is me', lucky: '♥' },
  { message: 'Your smile today will make someone\'s entire week', lucky: '♥' },
  { message: 'The most beautiful kiss of your life is closer than you think', lucky: '♥' },
  { message: 'An unforgettable adventure with your favorite girl awaits', lucky: '♥' },
  { message: 'You will receive a love letter when you least expect it', lucky: '♥' },
  { message: 'Your girl is going to steal another one of your hoodies', lucky: '♥' },
  { message: 'A midnight snack date is written in your stars', lucky: '♥' },
  { message: 'Someone will play with your hair while you fall asleep', lucky: '♥' },
  { message: 'You are about to receive the warmest embrace of your life', lucky: '♥' },
  { message: 'A forehead kiss is on its way to you... from me', lucky: '♥' },
  { message: 'Your girl thinks you are the most handsome soul she knows', lucky: '♥' },
];

function Cookie({ fortune, index, onCrack }) {
  const [cracked, setCracked] = useState(false);

  const handleCrack = () => {
    if (cracked) return;
    setCracked(true);
    onCrack(fortune);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      onClick={handleCrack}
      whileHover={!cracked ? { scale: 1.1, rotate: [-3, 3, -3, 0], transition: { rotate: { duration: 0.4 }, scale: { duration: 0.2 } } } : {}}
      whileTap={!cracked ? { scale: 0.85 } : {}}
      className={`relative aspect-square rounded-2xl border transition-all duration-500 cursor-pointer flex items-center justify-center ${
        cracked
          ? 'bg-rose-500/15 border-rose-400/30 shadow-[0_0_20px_rgba(244,63,94,0.15)]'
          : 'bg-white/5 border-white/10 hover:border-rose-400/25 hover:bg-white/8'
      }`}
    >
      <AnimatePresence mode="wait">
        {!cracked ? (
          <motion.div
            key="closed"
            exit={{ scale: 0, rotate: 360, opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-1"
          >
            <span className="font-serif text-2xl md:text-3xl text-rose-300/50">♥</span>
            <span className="text-rose-300/30 text-[10px] uppercase tracking-widest">reveal</span>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ scale: 0, opacity: 0, rotateZ: -10 }}
            animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
            transition={{ type: 'spring', damping: 10, stiffness: 150, delay: 0.2 }}
            className="flex flex-col items-center gap-1 p-2"
          >
            <span className="text-2xl">{fortune.lucky}</span>
            <p className="text-rose-100/70 text-[10px] md:text-xs leading-tight text-center">
              {fortune.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function FortuneCookies() {
  const [crackedCount, setCrackedCount] = useState(0);
  const [lastFortune, setLastFortune] = useState(null);

  const handleCrack = (fortune) => {
    setCrackedCount((c) => c + 1);
    setLastFortune(fortune);
  };

  return (
    <section className="relative py-24 md:py-36 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-12 md:mb-16"
      >
        <div className="heading-ornament">♦</div>
        <h2 className="font-display text-4xl md:text-6xl text-white/95 mb-4">Love Fortunes</h2>
        <p className="text-rose-200/50 text-base md:text-lg max-w-md mx-auto">
          Crack open a cookie and see what love has in store for you...
        </p>
      </motion.div>

      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
          {fortunes.map((f, i) => (
            <Cookie key={i} fortune={f} index={i} onCrack={handleCrack} />
          ))}
        </div>

        {/* Progress */}
        <div className="text-center mt-6">
          <span className="text-rose-300/30 text-xs">
            {crackedCount} of {fortunes.length} fortunes revealed
          </span>
        </div>

        {/* Last fortune banner */}
        <AnimatePresence>
          {lastFortune && (
            <motion.div
              key={lastFortune.message}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-6 glass p-4 text-center"
            >
              <span className="text-lg mr-2">{lastFortune.lucky}</span>
              <span className="text-rose-100/70 text-sm italic">"{lastFortune.message}"</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
