import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

const pages = [
  {
    path: '/our-story',
    title: 'Our Story',
    desc: 'Memories, moments, reasons',
    icon: '♦',
    color: 'from-rose-500/20 to-rose-900/10',
  },
  {
    path: '/roses',
    title: 'Roses for You',
    desc: 'A garden of love',
    icon: '✿',
    color: 'from-rose-400/20 to-pink-900/10',
  },
  {
    path: '/play',
    title: 'Games & Fun',
    desc: 'Scratch, match, quiz, spin',
    icon: '♠',
    color: 'from-gold-400/15 to-gold-600/5',
  },
  {
    path: '/letters',
    title: 'Words & Dreams',
    desc: 'Letters, fortunes, wishes',
    icon: '♣',
    color: 'from-rose-300/15 to-gold-400/10',
  },
  {
    path: '/forever',
    title: 'Forever',
    desc: 'The question that matters',
    icon: '★',
    color: 'from-gold-300/20 to-rose-500/15',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />

      {/* Navigation cards */}
      <section className="relative px-4 md:px-8 pb-32 pt-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-gold-300/40 text-xs uppercase tracking-[0.3em] mb-3">Explore</p>
          <div className="heading-ornament">♦</div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {pages.map((page, i) => (
            <motion.div
              key={page.path}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Link
                to={page.path}
                className="group block glass p-4 md:p-5 text-center hover:border-gold-400/20 transition-all duration-500 relative overflow-hidden"
              >
                {/* Gradient glow on hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-b ${page.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div className="relative z-10 text-2xl md:text-3xl text-gold-400/30 group-hover:text-gold-400/60 transition-all duration-500 mb-3 group-hover:scale-110 transform">
                  {page.icon}
                </div>

                {/* Title */}
                <h3 className="relative z-10 font-display text-sm md:text-base text-white/80 group-hover:text-white/95 transition-colors duration-300 mb-1">
                  {page.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-[10px] md:text-xs text-rose-200/30 group-hover:text-rose-200/50 transition-colors duration-300 leading-relaxed">
                  {page.desc}
                </p>

                {/* Arrow hint */}
                <div className="relative z-10 mt-3 text-gold-400/0 group-hover:text-gold-400/40 transition-all duration-300 text-xs translate-y-1 group-hover:translate-y-0">
                  →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
