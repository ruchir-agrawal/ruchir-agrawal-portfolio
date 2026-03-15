import { useState, useEffect, useCallback } from 'react';

function applyIconColors(theme) {
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  if (!sunIcon || !moonIcon) return;

  if (theme === 'dark') {
    sunIcon.style.stroke = '#8A8A8F'; sunIcon.style.color = '#8A8A8F';
    moonIcon.style.fill = '#F4F4FB'; moonIcon.style.color = '#F4F4FB';
    moonIcon.setAttribute('fill', '#F4F4FB');
    moonIcon.setAttribute('stroke', 'none');
  } else {
    sunIcon.style.stroke = '#686771'; sunIcon.style.color = '#686771';
    sunIcon.setAttribute('fill', '#686771');
    moonIcon.setAttribute('fill', 'none');
    moonIcon.style.stroke = '#ABABB4';
    moonIcon.setAttribute('stroke', '#ABABB4');
    moonIcon.setAttribute('stroke-width', '1.5');
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Apply theme to <html> class and icons
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'light') {
      html.classList.add('light');
    } else {
      html.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
    // Icons may not exist on first render; retry after paint
    requestAnimationFrame(() => applyIconColors(theme));
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return [theme, toggleTheme];
}
