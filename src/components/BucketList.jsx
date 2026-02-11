import { useState } from 'react';
import { motion } from 'framer-motion';

const bucketItems = [
  { text: 'Steal one of your hoodies', checked: true },
  { text: 'Make you watch my favorite film', checked: true },
  { text: 'Slow dance with you in the kitchen', checked: true },
  { text: 'Take a road trip with nothing but snacks and music', checked: false },
  { text: 'Get matching bracelets', checked: false },
  { text: 'Visit Paris together someday', checked: false },
  { text: 'Have a picnic under fairy lights', checked: false },
  { text: 'Build a blanket fort and watch movies all night', checked: true },
  { text: 'Write our initials somewhere secret', checked: true },
  { text: 'Watch a meteor shower together', checked: false },
  { text: 'Cook something together without burning it', checked: false },
  { text: 'Take a sunset boat ride', checked: false },
  { text: 'Get you to say I love you first, for once', checked: false },
  { text: 'Grow old and still hold your hand', checked: false },
];

export default function BucketList() {
  const [items, setItems] = useState(bucketItems);

  const toggle = (idx) => {
    setItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, checked: !item.checked } : item))
    );
  };

  const done = items.filter((i) => i.checked).length;
  const progress = (done / items.length) * 100;

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
        <h2 className="font-display text-4xl md:text-6xl text-white/95 mb-4">Our Bucket List</h2>
        <p className="text-rose-200/50 text-base md:text-lg max-w-md mx-auto">
          Things I want us to do together — let us check them off one by one
        </p>
      </motion.div>

      <div className="max-w-xl mx-auto">
        {/* Progress */}
        <div className="glass px-5 py-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-rose-200/60 text-sm">{done} of {items.length} completed</span>
            <span className="text-rose-400 font-semibold text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-rose-400 via-rose-500 to-rose-600 progress-shine"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-2">
          {items.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => toggle(i)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-300 cursor-pointer text-left ${
                item.checked
                  ? 'bg-rose-500/10 border-rose-400/20'
                  : 'bg-white/3 border-white/10 hover:border-rose-400/20 hover:bg-white/6'
              }`}
            >
              {/* Checkbox */}
              <div
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                  item.checked
                    ? 'bg-rose-500 border-rose-500'
                    : 'border-white/20'
                }`}
              >
                {item.checked && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className="text-white text-xs"
                  >
                    ✓
                  </motion.span>
                )}
              </div>

              <span
                className={`text-sm md:text-base transition-all duration-300 ${
                  item.checked ? 'text-rose-200/40 line-through' : 'text-rose-100/80'
                }`}
              >
                {item.text}
              </span>

              {item.checked && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-rose-400/60 text-xs font-serif italic"
                >
                  done
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
