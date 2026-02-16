'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { hero } from '@/data/content';
import HeroFormAnimation from '@/components/home/HeroFormAnimation';

const stats = [
  { value: 40, suffix: '+', label: 'Years of Excellence', desc: 'Serving Western MA since 1985' },
  { value: 5, suffix: '/5', label: 'Customer Rating', desc: 'GuildQuality verified reviews' },
  { value: 100, suffix: '%', label: 'Recommendation Rate', desc: 'From surveyed homeowners' },
];

function useCountUp(target, isVisible, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isVisible || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return count;
}

function StatCard({ stat, index, isVisible }) {
  const count = useCountUp(stat.value, isVisible, 2200 + index * 300);

  return (
    <div
      className={`brand-showcase__stat${isVisible ? ' brand-showcase__stat--visible' : ''}`}
      style={{ '--stat-delay': `${600 + index * 200}ms` }}
    >
      <div className="brand-showcase__stat-value">
        <span className="brand-showcase__stat-number">{count}</span>
        <span className="brand-showcase__stat-suffix">{stat.suffix}</span>
      </div>
      <div className="brand-showcase__stat-label">{stat.label}</div>
      <div className="brand-showcase__stat-desc">{stat.desc}</div>
      <div className="brand-showcase__stat-line" />
    </div>
  );
}

export default function BrandShowcase() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const glowRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const posRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef(0);

  const onMouseMove = useCallback((e) => {
    const s = sectionRef.current;
    if (!s) return;
    const r = s.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if ('ontouchstart' in window) return;

    section.addEventListener('mousemove', onMouseMove);
    const animate = () => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.03;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.03;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${posRef.current.x * 100 - 50}%, ${posRef.current.y * 100 - 50}%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onMouseMove]);

  return (
    <section className="brand-showcase" ref={sectionRef}>
      {/* ── Background ── */}
      <div className="brand-showcase__bg">
        <div className="brand-showcase__bg-base" />
        <div className="brand-showcase__bg-orb brand-showcase__bg-orb--a" />
        <div className="brand-showcase__bg-orb brand-showcase__bg-orb--b" />
        <div className="brand-showcase__bg-orb brand-showcase__bg-orb--c" />
        <div ref={glowRef} className="brand-showcase__mouse-glow" />

        {/* Diagonal lines */}
        <svg className="brand-showcase__lines" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="bsLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(58,107,85,0)" />
              <stop offset="50%" stopColor="rgba(58,107,85,0.08)" />
              <stop offset="100%" stopColor="rgba(126,104,145,0)" />
            </linearGradient>
          </defs>
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1={`${-10 + i * 10}%`}
              y1="0%"
              x2={`${10 + i * 10}%`}
              y2="100%"
              stroke="url(#bsLineGrad)"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Floating geometric shapes */}
        <div className="brand-showcase__shape brand-showcase__shape--1" />
        <div className="brand-showcase__shape brand-showcase__shape--2" />
        <div className="brand-showcase__shape brand-showcase__shape--3" />
      </div>

      {/* ── Content ── */}
      <div className="brand-showcase__inner">
        <div className="brand-showcase__grid">
          {/* Left: Content */}
          <div className="brand-showcase__content">
            {/* Badge */}
            <div className={`brand-showcase__badge${isVisible ? ' brand-showcase__badge--visible' : ''}`}>
              <span className="brand-showcase__badge-dot" />
              <span>Family-Owned &amp; Operated</span>
            </div>

            {/* Headline */}
            <h2 className={`brand-showcase__headline${isVisible ? ' brand-showcase__headline--visible' : ''}`}>
              <span className="brand-showcase__headline-line">
                Built on <span className="brand-showcase__headline-accent">Trust.</span>
              </span>
              <span className="brand-showcase__headline-line brand-showcase__headline-line--2">
                Proven by <span className="brand-showcase__headline-accent brand-showcase__headline-accent--alt">Results.</span>
              </span>
            </h2>

            {/* Description */}
            <p className={`brand-showcase__desc${isVisible ? ' brand-showcase__desc--visible' : ''}`}>
              For over four decades, Sexton Roofing &amp; Siding has protected homes across Western Massachusetts with expert craftsmanship, premium materials, and a commitment to excellence that sets the standard in the industry.
            </p>

            {/* Stats */}
            <div className="brand-showcase__stats">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} isVisible={isVisible} />
              ))}
            </div>

          </div>

          {/* Right: Form Card */}
          <div className={`brand-showcase__form-wrap${isVisible ? ' brand-showcase__form-wrap--visible' : ''}`}>
            <div className="hero__form-card">
              <div className="hero__form-card-shine" />
              <h2 className="hero__form-title">{hero.form.title}</h2>
              <HeroFormAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
