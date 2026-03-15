import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

import Nav from './components/Nav';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

import { useTheme } from './utils/theme';
import { initCursor } from './utils/cursor';
import { initScrollReveal } from './utils/scrollReveal';
import { initWordReveal } from './utils/wordReveal';

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const location = useLocation();

  // Init vanilla-JS utilities once on mount
  useEffect(() => {
    const cleanupCursor = initCursor();
    return () => {
      if (cleanupCursor) cleanupCursor();
    };
  }, []);

  // Re-run reveal utilities on route change
  useEffect(() => {
    // Small delay so new page DOM is painted
    const t = setTimeout(() => {
      initScrollReveal();
      initWordReveal();
      // Re-attach cursor hover listeners after route change
      initCursor();
    }, 100);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <>
      <CustomCursor />
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <CommandPalette theme={theme} toggleTheme={toggleTheme} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
