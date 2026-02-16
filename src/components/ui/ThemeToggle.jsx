'use client';

import { useTheme } from '@/context/ThemeContext';
import { IconSun, IconMoon } from '@/components/ui/Icons';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Prevent layout shift before mount — render placeholder with same dimensions
  if (!mounted) {
    return <div className="theme-toggle" style={{ width: 40, height: 40 }} />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className={`theme-toggle__icon ${isDark ? 'theme-toggle__icon--visible' : ''}`}>
        <IconSun size={18} />
      </span>
      <span className={`theme-toggle__icon ${!isDark ? 'theme-toggle__icon--visible' : ''}`}>
        <IconMoon size={18} />
      </span>
    </button>
  );
}
