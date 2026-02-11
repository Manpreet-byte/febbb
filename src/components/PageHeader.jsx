import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="pt-20 pb-8 text-center px-4">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-4xl mx-auto mb-8 text-left"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gold-400/30 hover:text-gold-400/60 transition-colors duration-300 text-xs uppercase tracking-[0.2em] group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
          <span>Home</span>
        </Link>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="heading-ornament">♦</div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white/95 mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-rose-200/50 text-base md:text-lg max-w-md mx-auto">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
