import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const hiddenMessages = [
  { message: 'I love you more than words could ever say', color: 'from-rose-500/30 to-pink-500/30' },
  { message: 'You make my world infinitely more beautiful', color: 'from-red-500/30 to-rose-500/30' },
  { message: 'You give me butterflies every single day', color: 'from-purple-500/30 to-rose-500/30' },
  { message: 'You are my favorite kind of magic', color: 'from-amber-500/30 to-rose-500/30' },
  { message: 'You are my last thought before I fall asleep', color: 'from-indigo-500/30 to-rose-500/30' },
  { message: 'You make my heart race like nothing else', color: 'from-orange-500/30 to-rose-500/30' },
];

function ScratchCard({ data, index }) {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const scratchedRef = useRef(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Fill with scratch cover
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#3d1020');
    gradient.addColorStop(1, '#1a0510');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw text
    ctx.fillStyle = 'rgba(251, 113, 133, 0.4)';
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to reveal', rect.width / 2, rect.height / 2 + 5);

    // Decorative corners
    ctx.font = '14px Playfair Display, serif';
    ctx.fillText('♥', 25, 25);
    ctx.fillText('♥', rect.width - 25, rect.height - 25);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const scratch = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    scratchedRef.current += 1;
    if (scratchedRef.current > 40) {
      setIsRevealed(true);
    }
  }, [isRevealed]);

  const handlePointerDown = () => setIsScratching(true);
  const handlePointerUp = () => setIsScratching(false);
  const handlePointerMove = (e) => {
    if (!isScratching) return;
    const touch = e.touches ? e.touches[0] : e;
    scratch(touch.clientX, touch.clientY);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative glass overflow-hidden aspect-3/2 flex items-center justify-center"
    >
      {/* Hidden content */}
      <div className={`absolute inset-0 bg-linear-to-br ${data.color} flex flex-col items-center justify-center p-4 text-center gap-2`}>
        <span className="font-serif text-2xl md:text-3xl text-rose-300/60">♥</span>
        <p className="font-serif text-sm md:text-base text-white/90 leading-relaxed">{data.message}</p>
      </div>

      {/* Scratch canvas overlay */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.canvas
            ref={canvasRef}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-none"
            onMouseDown={handlePointerDown}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onMouseMove={handlePointerMove}
            onTouchStart={handlePointerDown}
            onTouchEnd={handlePointerUp}
            onTouchMove={handlePointerMove}
          />
        )}
      </AnimatePresence>

      {/* Revealed sparkle */}
      {isRevealed && (
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: [0, 1.8, 1], rotate: [-90, 15, 0] }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute top-2 right-2 text-sm text-rose-300/60 z-20 font-serif"
        >
          ✓
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ScratchCards() {
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
        <h2 className="font-display text-4xl md:text-6xl text-white/95 mb-4">Scratch & Reveal</h2>
        <p className="text-rose-200/50 text-base md:text-lg max-w-md mx-auto">
          Scratch each card to find hidden messages from my heart to yours...
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {hiddenMessages.map((msg, i) => (
          <ScratchCard key={i} data={msg} index={i} />
        ))}
      </div>
    </section>
  );
}
