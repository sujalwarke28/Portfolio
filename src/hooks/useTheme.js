import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return 'dark';
}

/**
 * Site defaults to dark (the design was built dark-first — canvases, the
 * terminal, and the corkboard stay dark regardless via `.screen-panel` /
 * `--color-canvas-deep`). Light is an explicit opt-in, persisted.
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}
