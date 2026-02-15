'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * Unified section header — reviews-section style everywhere.
 *
 * @param {string}  badge      – Badge label text (e.g. "Reviews", "FAQs")
 * @param {string}  title      – Section title
 * @param {string}  subtitle   – Section subtitle / description
 * @param {"dark"|"light"} variant – "dark" for dark-bg sections, "light" for white/alt-bg
 */
export default function SectionHeader({ badge, title, subtitle, variant = 'light' }) {
  const ref = useScrollReveal();
  const isDark = variant === 'dark';

  return (
    <div className={`sh ${isDark ? 'sh--dark' : 'sh--light'}`} ref={ref}>
      <div className="sh__badge reveal">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="badge-cmd-icon">
          <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
        </svg>
        <span>{badge}</span>
        <span className="badge-dot" aria-hidden="true" />
      </div>

      <h2 className="sh__title reveal">
        <svg className="sh__ornament" viewBox="0 0 48 12" fill="none" aria-hidden="true">
          <circle cx="2" cy="6" r="1.2" fill="currentColor" opacity="0.3" />
          <line x1="7" y1="6" x2="34" y2="6" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.35" />
          <path d="M38 6l5-4 5 4-5 4z" fill="currentColor" opacity="0.55" />
        </svg>
        <span>{title}</span>
        <svg className="sh__ornament sh__ornament--flip" viewBox="0 0 48 12" fill="none" aria-hidden="true">
          <circle cx="2" cy="6" r="1.2" fill="currentColor" opacity="0.3" />
          <line x1="7" y1="6" x2="34" y2="6" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.35" />
          <path d="M38 6l5-4 5 4-5 4z" fill="currentColor" opacity="0.55" />
        </svg>
      </h2>

      {subtitle && <p className="sh__subtitle reveal">{subtitle}</p>}
    </div>
  );
}
