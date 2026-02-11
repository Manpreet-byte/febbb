import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

function fireConfetti() {
  const duration = 4000;
  const end = Date.now() + duration;

  const colors = ['#fb7185', '#f43f5e', '#e11d48', '#c9a84e', '#d4b872', '#f5e6c8', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors,
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  // Big bursts
  setTimeout(() => confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors }), 0);
  setTimeout(() => confetti({ particleCount: 100, spread: 120, origin: { y: 0.5 }, colors }), 500);
  setTimeout(() => confetti({ particleCount: 80, spread: 140, origin: { y: 0.55 }, colors }), 1200);
}

export default function Proposal() {
  const [answered, setAnswered] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noMoves, setNoMoves] = useState(0);
  const noBtnRef = useRef(null);

  const moveNoButton = useCallback(() => {
    const maxX = window.innerWidth < 640 ? 100 : 200;
    const maxY = window.innerWidth < 640 ? 80 : 150;
    setNoPos({
      x: (Math.random() - 0.5) * maxX * 2,
      y: (Math.random() - 0.5) * maxY * 2,
    });
    setNoMoves((p) => p + 1);
  }, []);

  const handleYes = () => {
    setAnswered(true);
    fireConfetti();
  };

  const noMessages = [
    'No',
    'Wait, really?',
    'Are you sure?',
    'Think again...',
    'I might cry',
    'Please do not do this to me',
    'I made this entire thing for you',
    'You are breaking my heart',
    'Okay fine... just kidding, try again',
    'Please... I am asking nicely',
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
      {/* Rose petals background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1200&q=70"
          alt=""
          className="w-full h-full object-cover opacity-[0.05] img-vignette scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#050208]/70" />
      </div>

      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.6 }}
            className="glass-strong p-8 md:p-14 text-center max-w-lg w-full"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1, 1.1, 1], rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="inline-block font-display text-5xl md:text-6xl text-gold-400/40 mb-6"
            >
              ♥
            </motion.span>

            <div className="heading-ornament">♦</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white/95 mb-3">
              Will You Be My Valentine?
            </h2>
            <p className="text-rose-200/50 text-base md:text-lg mb-10">
              Your girl is asking... please do not break her heart
            </p>

            <div className="relative flex items-center justify-center gap-6 min-h-20">
              {/* YES Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="px-10 py-4 rounded-2xl bg-linear-to-r from-rose-500 to-rose-600 text-white font-semibold text-lg shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:shadow-[0_0_50px_rgba(244,63,94,0.6)] transition-shadow duration-300 cursor-pointer z-10"
              >
                Yes
              </motion.button>

              {/* NO Button - runs away */}
              <motion.button
                ref={noBtnRef}
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                className="px-8 py-4 rounded-2xl border border-white/20 text-white/60 font-medium text-lg hover:border-white/30 transition-colors cursor-pointer z-10"
              >
                {noMessages[Math.min(noMoves, noMessages.length - 1)]}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            initial={{ opacity: 0, scale: 0.3, rotateZ: -8 }}
            animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.3 }}
            className="glass-strong p-10 md:p-16 text-center max-w-lg w-full"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.5 }}
              className="font-display text-6xl md:text-7xl text-gold-400/40 mb-6"
            >
              ♥
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="font-display text-4xl md:text-6xl text-white/95 mb-4"
            >
              I Knew You Would Say Yes
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="text-rose-200/70 text-lg md:text-xl leading-relaxed mb-6"
            >
              You make my heart do things I never knew it could. Being yours is the best thing that ever happened to me. I love you endlessly.
            </motion.p>

            {/* Bouquet image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, type: 'spring', stiffness: 80 }}
              className="relative w-40 h-40 md:w-52 md:h-52 mx-auto my-6 rounded-full overflow-hidden ring-2 ring-gold-400/20"
            >
              <img
                src="https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=500&q=80"
                alt="Rose bouquet"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#050208]/60 via-transparent to-transparent" />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-gold-400/10" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="font-serif italic text-rose-300/80 text-xl md:text-2xl"
            >
              Forever yours
            </motion.p>

            {/* Floating hearts around the card */}
            {[...Array(14)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -150 - Math.random() * 100],
                  x: [(Math.random() - 0.5) * 300],
                  rotate: [0, Math.random() * 360],
                }}
                transition={{ delay: 0.3 + i * 0.15, duration: 2.5, ease: 'easeOut' }}
                className="absolute text-xl pointer-events-none text-rose-400/60 font-serif"
                style={{ left: `${20 + Math.random() * 60}%`, bottom: '30%' }}
              >
                ♥
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
