import { Link } from 'react-router-dom';
import { haptics } from '../utils/haptics';

export default function Nav({ theme, toggleTheme }) {
  // Smooth-scroll for same-page hash links
  const handleAnchor = (e, hash) => {
    e.preventDefault();
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    haptics.tick(1200, 0.01);
  };

  const handleToggle = () => {
    toggleTheme();
    haptics.flip();
  };

  return (
    <nav>
      <Link className="logo" to="/">RA</Link>

      <ul>
        <li><a href="#projects" onClick={e => handleAnchor(e, '#projects')}>Work</a></li>
        <li><a href="#skills"   onClick={e => handleAnchor(e, '#skills')}>Skills</a></li>
        <li><a href="#about"    onClick={e => handleAnchor(e, '#about')}>About</a></li>
        <li><a href="#contact"  onClick={e => handleAnchor(e, '#contact')}>Contact</a></li>
      </ul>

      <div className="nav-right">
        {/* Watermelon-style theme toggle */}
        <button
          id="themeToggle"
          className="sw-btn"
          data-theme={theme}
          onClick={handleToggle}
          onMouseEnter={() => haptics.tick(3000, 0.002)}
          aria-label="Toggle theme"
        >
          <span className="sw-knob" />

          {/* Sun icon */}
          <span className="sw-icon sw-sun">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" id="sun-icon">
              <circle cx="12" cy="12" r="4"/>
              <line x1="12" y1="2" x2="12" y2="4"/>
              <line x1="12" y1="20" x2="12" y2="22"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="2" y1="12" x2="4" y2="12"/>
              <line x1="20" y1="12" x2="22" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </span>

          {/* Moon icon */}
          <span className="sw-icon sw-moon">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" id="moon-icon">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </span>
        </button>
      </div>
    </nav>
  );
}
