'use client';

import { useRef, useState, useEffect } from 'react';
import { highlightedProjects } from '@/data/content';
import SectionHeader from '@/components/ui/SectionHeader';

/* ── Per-card accent colors ── */
const projectAccents = [
  { gradient: 'linear-gradient(135deg, #274939, #3A6B55)', glow: '58,107,85' },
  { gradient: 'linear-gradient(135deg, #513C60, #7E6891)', glow: '126,104,145' },
  { gradient: 'linear-gradient(135deg, #1B4B6B, #2A7BA8)', glow: '42,123,168' },
];

export default function HighlightedProjects() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="highlight-section" id="projects" ref={sectionRef}>
      {/* ── Background layers ── */}
      <div className="highlight-section__bg">
        <div className="highlight-section__bg-base" />
        <div className="highlight-section__orb highlight-section__orb--a" />
        <div className="highlight-section__orb highlight-section__orb--b" />
        <div className="highlight-section__orb highlight-section__orb--c" />
        <svg className="highlight-section__mesh" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hlMesh" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hlMesh)" />
        </svg>
      </div>

      <div className="container highlight-section__content">
        <SectionHeader
          badge="Featured"
          title={highlightedProjects.sectionTitle}
          subtitle={highlightedProjects.sectionSubtitle}
          variant="dark"
        />

        <div className={`highlight-section__grid ${isVisible ? 'is-visible' : ''}`}>
          {highlightedProjects.projects.map((project, idx) => {
            const accent = projectAccents[idx];
            return (
              <div
                key={project.title}
                className="highlight-card"
                style={{
                  '--hl-glow': accent.glow,
                  '--hl-delay': `${idx * 180}ms`,
                }}
              >
                {/* Image */}
                <div className="highlight-card__image">
                  <img src={project.image.src} alt={project.image.alt} loading="lazy" />
                  <div className="highlight-card__image-overlay" />
                </div>

                {/* Category badge */}
                <div className="highlight-card__badge">{project.category}</div>

                {/* Content */}
                <div className="highlight-card__body">
                  <h3 className="highlight-card__title">{project.title}</h3>
                  <p className="highlight-card__location">
                    <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                      <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    {project.location}
                  </p>
                  <p className="highlight-card__description">{project.description}</p>

                  {/* Stats */}
                  <div className="highlight-card__stats">
                    <span className="highlight-card__stat">
                      <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M8 4.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {project.stats.duration}
                    </span>
                    <span className="highlight-card__stat">
                      <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                        <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                      {project.stats.scope}
                    </span>
                  </div>
                </div>

                {/* Accent glow line at top */}
                <div className="highlight-card__glow-top" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
