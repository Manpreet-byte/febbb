import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYMBOLS = ['♥', '♦', '♠', '♣', '✧', '✻', '✶', '❀'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createBoard() {
  const pairs = [...SYMBOLS, ...SYMBOLS];
  return shuffle(pairs).map((symbol, i) => ({
    id: i,
    symbol,
    flipped: false,
    matched: false,
  }));
}

function Card({ card, onClick, disabled }) {
  const isRevealed = card.flipped || card.matched;

  return (
    <motion.button
      onClick={() => !disabled && !card.matched && !card.flipped && onClick(card.id)}
      whileHover={!isRevealed ? { scale: 1.06 } : {}}
      whileTap={!isRevealed ? { scale: 0.95 } : {}}
      className="relative aspect-square cursor-pointer"
      style={{ perspective: 600 }}
    >
      <motion.div
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 180, damping: 22 }}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front (hidden) */}
        <div
          className="absolute inset-0 rounded-xl bg-linear-to-br from-rose-500/30 to-rose-700/30 border border-rose-400/20 flex items-center justify-center backdrop-blur-sm"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-2xl md:text-3xl text-rose-300/40">♥</span>
        </div>

        {/* Back (revealed) */}
        <div
          className={`absolute inset-0 rounded-xl flex items-center justify-center border ${
            card.matched
              ? 'bg-rose-500/20 border-gold-400/30 shadow-[0_0_25px_rgba(201,168,78,0.15)]'
              : 'bg-white/10 border-white/20'
          }`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-2xl md:text-3xl font-serif text-rose-200/90">{card.symbol}</span>
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function MemoryGame() {
  const [cards, setCards] = useState(createBoard);
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [won, setWon] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const s = localStorage.getItem('matchBest');
    return s ? JSON.parse(s) : null;
  });
  const intervalRef = useRef(null);

  // Timer
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  // Check match
  useEffect(() => {
    if (selected.length === 2) {
      const [a, b] = selected;
      if (cards[a].symbol === cards[b].symbol) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true, flipped: false } : c))
          );
          setMatches((m) => m + 1);
          setSelected([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === a || c.id === b ? { ...c, flipped: false } : c))
          );
          setSelected([]);
        }, 800);
      }
    }
  }, [selected, cards]);

  // Win check
  useEffect(() => {
    if (matches === SYMBOLS.length && matches > 0) {
      setRunning(false);
      setWon(true);
      const score = { moves, timer };
      if (!bestScore || moves < bestScore.moves) {
        setBestScore(score);
        localStorage.setItem('matchBest', JSON.stringify(score));
      }
    }
  }, [matches, moves, timer, bestScore]);

  const handleClick = useCallback(
    (id) => {
      if (!running && moves === 0) setRunning(true);
      if (selected.length >= 2) return;
      setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));
      setSelected((prev) => [...prev, id]);
      setMoves((m) => m + 1);
    },
    [selected, running, moves]
  );

  const reset = () => {
    setCards(createBoard());
    setSelected([]);
    setMoves(0);
    setMatches(0);
    setTimer(0);
    setRunning(false);
    setWon(false);
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

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
        <h2 className="font-display text-4xl md:text-6xl text-white/95 mb-4">Memory Match</h2>
        <p className="text-rose-200/50 text-base md:text-lg max-w-md mx-auto">
          Find all the matching pairs — just like how I found you
        </p>
      </motion.div>

      <div className="max-w-md mx-auto">
        {/* Stats bar */}
        <div className="flex items-center justify-between mb-6 glass px-5 py-3">
          <div className="flex items-center gap-2 text-sm text-rose-200/70">
            <span className="text-gold-400/30 font-serif">•</span>
            <span>{moves} moves</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-rose-200/70">
            <span className="text-gold-400/30 font-serif">•</span>
            <span>{formatTime(timer)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-rose-200/70">
            <span className="text-gold-400/30 font-serif">•</span>
            <span>{matches}/{SYMBOLS.length}</span>
          </div>
        </div>

        {/* Board */}
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={handleClick}
              disabled={selected.length >= 2}
            />
          ))}
        </div>

        {/* Reset */}
        <div className="text-center mt-6">
          <button
            onClick={reset}
            className="text-rose-300/50 text-sm hover:text-rose-300 transition-colors cursor-pointer underline underline-offset-4"
          >
            Shuffle & Restart
          </button>
        </div>

        {/* Best score */}
        {bestScore && (
          <p className="text-center text-rose-300/30 text-xs mt-3">
            — Best: {bestScore.moves} moves in {formatTime(bestScore.timer)}
          </p>
        )}
      </div>

      {/* Win overlay */}
      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0, rotateZ: -10 }}
              animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 14, stiffness: 120 }}
              className="glass-strong p-10 text-center max-w-sm w-full"
            >
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-block font-display text-5xl text-gold-400/40 mb-4"
              >
                ♥
              </motion.span>
              <h3 className="font-display text-3xl text-white/95 mb-2">Beautifully Done</h3>
              <p className="text-rose-200/60 text-sm mb-1">{moves} moves • {formatTime(timer)}</p>
              <p className="text-rose-200/40 text-xs mb-6">Our love is unforgettable, just like you!</p>
              <button
                onClick={reset}
                className="px-8 py-3 rounded-xl bg-linear-to-r from-rose-500 to-rose-600 text-white font-semibold shadow-lg hover:shadow-rose-500/30 transition-shadow cursor-pointer"
              >
                Play Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
