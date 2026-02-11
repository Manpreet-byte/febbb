import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Home', icon: '♥' },
  { path: '/our-story', label: 'Story', icon: '♦' },
  { path: '/roses', label: 'Roses', icon: '✿' },
  { path: '/play', label: 'Play', icon: '♠' },
  { path: '/letters', label: 'Letters', icon: '♣' },
  { path: '/forever', label: 'Forever', icon: '★' },
];

export default function Navigation() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 px-3 pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-3 py-2.5 rounded-2xl bg-[#0a0515]/80 backdrop-blur-2xl border border-gold-400/10 shadow-[0_-4px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(201,168,78,0.05)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center px-2.5 sm:px-4 py-1.5 rounded-xl transition-colors duration-300 group"
            >
              {/* Active glow background */}
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-xl bg-gold-400/8 border border-gold-400/15"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              {/* Icon */}
              <span
                className={`relative z-10 text-base sm:text-lg transition-all duration-300 ${
                  isActive
                    ? 'text-gold-400 drop-shadow-[0_0_8px_rgba(201,168,78,0.4)]'
                    : 'text-white/25 group-hover:text-white/50'
                }`}
              >
                {item.icon}
              </span>

              {/* Label */}
              <span
                className={`relative z-10 text-[9px] sm:text-[10px] tracking-wider uppercase mt-0.5 transition-all duration-300 ${
                  isActive
                    ? 'text-gold-300/80'
                    : 'text-white/20 group-hover:text-white/40'
                }`}
              >
                {item.label}
              </span>

              {/* Active dot */}
              {isActive && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute -top-1 w-1 h-1 rounded-full bg-gold-400/60"
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
}
