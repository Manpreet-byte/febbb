import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import OurStoryPage from './pages/OurStoryPage';
import RosesPage from './pages/RosesPage';
import PlayPage from './pages/PlayPage';
import LettersPage from './pages/LettersPage';
import ForeverPage from './pages/ForeverPage';

export default function App() {
  const location = useLocation();

  return (
    <>
      {/* Fixed backgrounds */}
      <div className="mesh-bg" />
      <FloatingHearts />

      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Navigation bar */}
      <Navigation />

      {/* Page content */}
      <main className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/roses" element={<RosesPage />} />
            <Route path="/play" element={<PlayPage />} />
            <Route path="/letters" element={<LettersPage />} />
            <Route path="/forever" element={<ForeverPage />} />
          </Routes>
        </AnimatePresence>

        {/* Footer */}
        <footer className="py-10 pb-24 text-center text-gold-400/20 text-xs tracking-[0.3em] uppercase font-light">
          Made with love, for you
        </footer>
      </main>
    </>
  );
}
