import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Proposal from '../components/Proposal';

export default function ForeverPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Minimal back button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gold-400/25 hover:text-gold-400/50 transition-colors duration-300 text-xs uppercase tracking-[0.2em] group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
          <span>Home</span>
        </Link>
      </div>
      <Proposal />
    </motion.div>
  );
}
