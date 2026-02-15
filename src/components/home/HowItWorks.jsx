'use client';

import { useRef, useState, useEffect } from 'react';
import { howItWorks } from '@/data/content';
import SectionHeader from '@/components/ui/SectionHeader';

/* ── Per-step accent colors ── */
const stepAccents = [
  { gradient: 'linear-gradient(135deg, #274939, #3A6B55)', glow: '58,107,85' },
  { gradient: 'linear-gradient(135deg, #513C60, #7E6891)', glow: '126,104,145' },
  { gradient: 'linear-gradient(135deg, #1B4B6B, #2A7BA8)', glow: '42,123,168' },
  { gradient: 'linear-gradient(135deg, #15803D, #22C55E)', glow: '22,163,74' },
];

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

  /* Hammer — Professional Installation */
  <svg key="ico-hammer" viewBox="0 0 48 48" fill="none" className="step-icon__svg">
    <path d="M22 22L34 10a3 3 0 014.2 0l1.8 1.8a3 3 0 010 4.2L28 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="step-icon__frame" />
    <line x1="22" y1="22" x2="10" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="step-icon__handle" />
    <path d="M36 8l3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="step-icon__spark" />
    <path d="M42 14l3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="step-icon__spark step-icon__spark--2" />
    <path d="M39 5l2-2" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" className="step-icon__spark step-icon__spark--3" />
  </svg>,

  /* Shield Check — Final Walkthrough */
  <svg key="ico-shield" viewBox="0 0 48 48" fill="none" className="step-icon__svg">
    <path d="M24 4L8 12v12c0 10 7 18 16 22 9-4 16-12 16-22V12L24 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="step-icon__frame" />
    <path d="M16 24l6 6 12-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="step-icon__check" />
  </svg>,
];

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
            return (
              <div
                key={step.step}
                className="step-card"
                style={{
                  '--step-glow': accent.glow,
                  '--step-delay': `${idx * 150}ms`,
                }}
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
