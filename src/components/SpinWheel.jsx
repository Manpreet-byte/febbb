import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const dares = [
  { text: 'Send me a photo of yourself right now', label: 'Photo' },
  { text: 'Give me a forehead kiss', label: 'Kiss' },
  { text: 'Tell me your favorite thing about me', label: 'Confess' },
  { text: 'Let me keep your hoodie for a week', label: 'Hoodie' },
  { text: 'Play with my hair for five minutes', label: 'Gentle' },
  { text: 'Write me a love note on paper', label: 'Write' },
  { text: 'Slow dance with me to no music', label: 'Dance' },
  { text: 'Let me pick the movie tonight', label: 'Movie' },
  { text: 'Hold my hand and do not let go for ten minutes', label: 'Hold' },
  { text: 'Say I love you in three different languages', label: 'Speak' },
  { text: 'Give me the warmest hug you can', label: 'Hug' },
  { text: 'Surprise me with my favorite treat', label: 'Treat' },
];

const COLORS = [
  '#be185d', '#9f1239', '#881337', '#4c1d95',
  '#be185d', '#9f1239', '#881337', '#4c1d95',
  '#be185d', '#9f1239', '#881337', '#4c1d95',
];

export default function SpinWheel() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const segmentAngle = 360 / dares.length;
    const randomIndex = Math.floor(Math.random() * dares.length);
    // Spin at least 5 full rotations + land on segment
    const newRotation = rotation + 1800 + (randomIndex * segmentAngle) + (segmentAngle / 2);
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(dares[randomIndex]);
    }, 4000);
  };

  const segmentAngle = 360 / dares.length;

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
        <h2 className="font-display text-4xl md:text-6xl text-white/95 mb-4">Spin the Wheel</h2>
        <p className="text-rose-200/50 text-base md:text-lg max-w-md mx-auto">
          Spin the wheel and honor whatever it lands on... no backing out
        </p>
      </motion.div>

      <div className="max-w-sm mx-auto flex flex-col items-center gap-8">
        {/* Wheel container */}
        <div className="relative">
          {/* Pointer triangle */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-xl text-rose-400 drop-shadow-lg">
            ▼
          </div>

          {/* Wheel */}
          <div
            ref={wheelRef}
            className={`w-64 h-64 md:w-72 md:h-72 rounded-full relative overflow-hidden border-4 transition-all duration-500 ${
              spinning
                ? 'border-gold-400/40 shadow-[0_0_60px_rgba(201,168,78,0.25)]'
                : 'border-rose-400/30 shadow-[0_0_40px_rgba(244,63,94,0.2)]'
            }`}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            }}
          >
            {/* SVG wheel segments */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {dares.map((dare, i) => {
                const startAngle = i * segmentAngle;
                const endAngle = (i + 1) * segmentAngle;
                const startRad = (startAngle - 90) * (Math.PI / 180);
                const endRad = (endAngle - 90) * (Math.PI / 180);
                const x1 = 100 + 100 * Math.cos(startRad);
                const y1 = 100 + 100 * Math.sin(startRad);
                const x2 = 100 + 100 * Math.cos(endRad);
                const y2 = 100 + 100 * Math.sin(endRad);
                const largeArc = segmentAngle > 180 ? 1 : 0;

                const midAngle = ((startAngle + endAngle) / 2 - 90) * (Math.PI / 180);
                const emojiX = 100 + 60 * Math.cos(midAngle);
                const emojiY = 100 + 60 * Math.sin(midAngle);

                return (
                  <g key={i}>
                    <path
                      d={`M100,100 L${x1},${y1} A100,100 0 ${largeArc},1 ${x2},${y2} Z`}
                      fill={COLORS[i % COLORS.length]}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="0.5"
                    />
                    <text
                      x={emojiX}
                      y={emojiY}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="8"
                      fill="rgba(255,255,255,0.7)"
                      fontFamily="Inter, sans-serif"
                    >
                      {dare.label}
                    </text>
                  </g>
                );
              })}
              {/* Center circle */}
              <circle cx="100" cy="100" r="18" fill="#1a0510" stroke="rgba(244,63,94,0.4)" strokeWidth="2" />
              <text x="100" y="100" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="rgba(251,113,133,0.8)" fontFamily="serif">♥</text>
            </svg>
          </div>
        </div>

        {/* Spin button */}
        <motion.button
          onClick={spin}
          disabled={spinning}
          whileHover={!spinning ? { scale: 1.05 } : {}}
          whileTap={!spinning ? { scale: 0.95 } : {}}
          className={`px-8 py-3 rounded-full font-medium text-sm tracking-wide transition-all duration-300 ${
            spinning
              ? 'bg-white/5 text-white/30 cursor-not-allowed'
              : 'bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40'
          }`}
        >
          {spinning ? 'Spinning...' : 'Spin the Wheel'}
        </motion.button>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 30, rotateZ: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateZ: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 12, stiffness: 120 }}
              className="glass p-6 text-center max-w-xs"
            >
              <span className="font-serif text-2xl text-gold-400/40 block mb-3">♥</span>
              <p className="text-rose-100/80 text-sm md:text-base font-medium mb-2">{result.text}</p>
              <span className="text-rose-300/30 text-xs">You gave your word. No excuses.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
