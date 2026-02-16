'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { howItWorks } from '@/data/content';
import SectionHeader from '@/components/ui/SectionHeader';

/* ── Per-step accent colors ── */
const stepAccents = [
  { gradient: 'linear-gradient(135deg, #274939, #3A6B55)', glow: '58,107,85' },
  { gradient: 'linear-gradient(135deg, #513C60, #7E6891)', glow: '126,104,145' },
  { gradient: 'linear-gradient(135deg, #1B4B6B, #2A7BA8)', glow: '42,123,168' },
  { gradient: 'linear-gradient(135deg, #15803D, #22C55E)', glow: '22,163,74' },
];

const STEP_COUNT = 4;
const ACTIVE_DURATION = 3000;   // ms each card stays active
const PAUSE_DURATION = 600;     // ms gap between cards

/* ── Custom SVG icons per step ── */
const stepIcons = [
  /* Phone — Request a Free Estimate */
  <svg key="ico-phone" viewBox="0 0 48 48" fill="none" className="step-icon__svg">
    <rect x="14" y="6" width="20" height="36" rx="4" stroke="currentColor" strokeWidth="1.5" className="step-icon__frame" />
    <line x1="20" y1="36" x2="28" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="step-icon__detail" />
    <circle cx="24" cy="11" r="1.2" fill="currentColor" opacity="0.4" className="step-icon__dot" />
    <path d="M36 12c1.5 2.5 2.5 5.5 2.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="step-icon__wave" />
    <path d="M39 8c2.5 3.5 4 8 4 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="step-icon__wave step-icon__wave--2" />
  </svg>,

  /* Clipboard — On-Site Inspection */
  <svg key="ico-clip" viewBox="0 0 48 48" fill="none" className="step-icon__svg">
    <rect x="10" y="8" width="28" height="36" rx="3" stroke="currentColor" strokeWidth="1.5" className="step-icon__frame" />
    <rect x="18" y="4" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" className="step-icon__clip" />
    <line x1="17" y1="22" x2="31" y2="22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" className="step-icon__line" />
    <line x1="17" y1="28" x2="27" y2="28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" className="step-icon__line" />
    <line x1="17" y1="34" x2="23" y2="34" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" className="step-icon__line" />
    <path d="M29 32l3 3 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="step-icon__check" />
  </svg>,

  /* Hard Hat & Wrench — Professional Installation */
  <svg key="ico-install" viewBox="0 0 48 48" fill="none" className="step-icon__svg">
    {/* Hard hat */}
    <path d="M12 26c0-7.2 5.4-13 12-13s12 5.8 12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="step-icon__frame" />
    <rect x="10" y="26" width="28" height="4" rx="2" stroke="currentColor" strokeWidth="1.5" className="step-icon__frame" />
    <line x1="24" y1="13" x2="24" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.4" className="step-icon__detail" />
    <line x1="16" y1="17" x2="16" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.3" className="step-icon__detail" />
    <line x1="32" y1="17" x2="32" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.3" className="step-icon__detail" />
    {/* Wrench */}
    <path d="M17 34l-5 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="step-icon__handle" />
    <path d="M12 42c-1.2.8-2.8.4-3.5-.7-.7-1.2-.3-2.8.9-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="step-icon__detail" />
    {/* Screwdriver */}
    <path d="M31 34l5 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="step-icon__handle" />
    <path d="M36 42c1.2.8 2.8.4 3.5-.7.7-1.2.3-2.8-.9-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="step-icon__detail" />
    {/* Star quality badge */}
    <path d="M24 7l1.2 2.4 2.6.4-1.9 1.8.4 2.6L24 13l-2.3 1.2.4-2.6-1.9-1.8 2.6-.4L24 7z" fill="currentColor" opacity="0.5" className="step-icon__dot" />
  </svg>,

  /* Shield Check — Final Walkthrough */
  <svg key="ico-shield" viewBox="0 0 48 48" fill="none" className="step-icon__svg">
    <path d="M24 4L8 12v12c0 10 7 18 16 22 9-4 16-12 16-22V12L24 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="step-icon__frame" />
    <path d="M16 24l6 6 12-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="step-icon__check" />
  </svg>,
];

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sequential animation cycle — starts after reveal
  useEffect(() => {
    if (!isVisible) return;

    // Small delay after reveal so entrance animations finish first
    const startDelay = setTimeout(() => {
      setActiveIndex(0);
    }, 800);

    return () => clearTimeout(startDelay);
  }, [isVisible]);

  useEffect(() => {
    if (activeIndex < 0) return;

    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % STEP_COUNT);
    }, ACTIVE_DURATION + PAUSE_DURATION);

    return () => clearTimeout(timerRef.current);
  }, [activeIndex]);

  const handleMouseEnter = useCallback((idx) => setHoverIndex(idx), []);
  const handleMouseLeave = useCallback(() => setHoverIndex(-1), []);

  return (
    <section className="how-section" id="process" ref={sectionRef}>
      {/* ── Background layers ── */}
      <div className="how-section__bg">
        <div className="how-section__bg-base" />
        <div className="how-section__orb how-section__orb--a" />
        <div className="how-section__orb how-section__orb--b" />
        <div className="how-section__orb how-section__orb--c" />
        <svg className="how-section__mesh" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="howMesh" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#howMesh)" />
        </svg>
      </div>

      <div className="container how-section__content">
        <SectionHeader badge="Process" title={howItWorks.sectionTitle} subtitle={howItWorks.sectionSubtitle} variant="dark" />

        <div className={`how-section__grid ${isVisible ? 'is-visible' : ''}`}>
          {howItWorks.steps.map((step, idx) => {
            const accent = stepAccents[idx];
            const isCycleActive = activeIndex === idx && hoverIndex === -1;
            return (
              <div
                key={step.step}
                className={`step-card${isCycleActive ? ' step-card--active' : ''}`}
                style={{
                  '--step-glow': accent.glow,
                  '--step-delay': `${idx * 150}ms`,
                }}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Connector line to next card (desktop) */}
                {idx < howItWorks.steps.length - 1 && (
                  <div className="step-card__connector" />
                )}

                {/* Gradient icon area */}
                <div className="step-card__icon-area" style={{ background: accent.gradient }}>
                  <div className="step-icon">{stepIcons[idx]}</div>
                  <div className="step-card__orb step-card__orb--a" />
                  <div className="step-card__orb step-card__orb--b" />
                </div>

                {/* Step number badge */}
                <div className="step-card__badge">
                  {String(step.step).padStart(2, '0')}
                </div>

                {/* Content */}
                <div className="step-card__content">
                  <h3 className="step-card__title">{step.title}</h3>
                  <p className="step-card__description">{step.description}</p>
                </div>

                {/* Accent glow line */}
                <div className="step-card__glow-top" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
