'use client';

import {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  Home,
  Layout,
  Mail,
  Moon,
  Github,
  Linkedin,
  ArrowRight,
} from 'lucide-react';

/**
 * COMMAND PALETTE UI v2
 * Based on user-provided snippet from watermelon.sh
 */

export default function CommandPalette({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Define actions inside the component or useMemo to use theme/navigate
  const actions = useMemo(() => [
    {
      id: 'home',
      title: 'Go to Home',
      section: 'Navigation',
      icon: <Home size={16} />,
      shortcut: 'H',
      action: () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    },
    {
      id: 'projects',
      title: 'View Projects',
      section: 'Navigation',
      icon: <Layout size={16} />,
      shortcut: 'P',
      action: () => { 
        const el = document.querySelector('#projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else navigate('/#projects');
      }
    },
    {
      id: 'about',
      title: 'About Me',
      section: 'Navigation',
      icon: <User size={16} />,
      shortcut: 'A',
      action: () => {
        const el = document.querySelector('#about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else navigate('/#about');
      }
    },
    {
      id: 'contact',
      title: 'Get in Touch',
      section: 'Navigation',
      icon: <Mail size={16} />,
      shortcut: 'C',
      action: () => {
        const el = document.querySelector('#contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else navigate('/#contact');
      }
    },
    {
      id: 'theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      section: 'Settings',
      icon: <Moon size={16} />,
      shortcut: 'T',
      action: () => toggleTheme()
    },
    {
      id: 'github',
      title: 'GitHub Profile',
      section: 'Social',
      icon: <Github size={16} />,
      action: () => window.open('https://github.com/ruchir-agrawal', '_blank')
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Profile',
      section: 'Social',
      icon: <Linkedin size={16} />,
      action: () => window.open('https://www.linkedin.com/in/ruchir-agrawal-b257a4374/', '_blank')
    },
  ], [theme, navigate, toggleTheme]);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Primary shortcut: Ctrl+K or Cmd+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      // Backup shortcut from snippet: 'F' (if not typing in an input)
      if (
        e.key.toLowerCase() === 'f' &&
        !isOpen &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen]);

  const filteredItems = useMemo(() => {
    return actions.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.section.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, actions]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const sections = useMemo(() => {
    const groups = {};
    filteredItems.forEach((item) => {
      if (!groups[item.section]) groups[item.section] = [];
      groups[item.section].push(item);
    });

    return Object.entries(groups).map(([name, items]) => ({
      name,
      items,
    }));
  }, [filteredItems]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + filteredItems.length) % filteredItems.length,
      );
    } else if (e.key === 'Enter') {
      const selectedItem = filteredItems[activeIndex];
      if (selectedItem) {
        selectedItem.action();
        setIsOpen(false);
        setQuery('');
      }
    }
  };

  const sharedTransition = {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.12,
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{ willChange: 'opacity' }}
            className="cp-overlay"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="cp-container">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="cp-modal-v2"
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={sharedTransition}
              style={{ willChange: 'transform, opacity' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Header */}
              <div className="cp-header-v2">
                <Search
                  size={18}
                  className="cp-search-icon-v2"
                  strokeWidth={2.5}
                />
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Find..."
                    className="cp-input-v2"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="cp-kbd-v2">Esc</span>
                </div>
              </div>

              {/* Results Body */}
              <div className="cp-results-v2 custom-scrollbar">
                {filteredItems.length === 0 ? (
                  <div className="cp-no-results-v2">
                    No results found for "{query}"
                  </div>
                ) : (
                  <div className="cp-sections-v2">
                    {sections.map((section) => (
                      <div key={section.name} className="cp-section-group-v2">
                        <h3 className="cp-section-title-v2">
                          {section.name}
                        </h3>
                        <div className="cp-items-list-v2">
                          {section.items.map((item) => {
                            const globalIndex = filteredItems.findIndex(
                              (fi) => fi.id === item.id,
                            );
                            const isActive = globalIndex === activeIndex;

                            return (
                              <button
                                key={item.id}
                                className={`cp-item-v2 ${isActive ? 'active' : ''}`}
                                onMouseEnter={() => setActiveIndex(globalIndex)}
                                onClick={() => {
                                  item.action();
                                  setIsOpen(false);
                                  setQuery('');
                                }}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`cp-item-icon-v2 ${isActive ? 'active' : ''}`}>
                                    {item.icon}
                                  </span>
                                  <span className="cp-item-text-v2">{item.title}</span>
                                </div>

                                {item.shortcut && (
                                  <kbd className={`cp-item-kbd-v2 ${isActive ? 'active' : ''}`}>
                                    {item.shortcut}
                                  </kbd>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="cp-footer-v2">
                <div className="cp-hint-v2"><span>↑↓</span> to navigate</div>
                <div className="cp-hint-v2"><span>↵</span> to select</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
