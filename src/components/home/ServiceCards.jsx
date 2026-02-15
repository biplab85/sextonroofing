'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { services } from '@/data/content';
import { IconArrowRight } from '@/components/ui/Icons';
import SectionHeader from '@/components/ui/SectionHeader';

/* ── SVG icons per service ── */
const serviceIcons = {
  Roofing: (
    <svg viewBox="0 0 64 64" fill="none" className="svc-icon__svg">
      <path d="M32 8L4 32h8v20h40V32h8L32 8z" stroke="currentColor" strokeWidth="2" fill="none" className="svc-icon__roof" />
      <rect x="42" y="14" width="6" height="14" rx="1" stroke="currentColor" strokeWidth="2" fill="none" className="svc-icon__chimney" />
      <path d="M16 28l16-14 16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="svc-icon__detail" />
      <path d="M20 32l12-10 12 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" className="svc-icon__detail" />
      <line x1="24" y1="22" x2="28" y2="22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="svc-icon__shingle" />
      <line x1="34" y1="22" x2="38" y2="22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="svc-icon__shingle" />
      <line x1="29" y1="26" x2="33" y2="26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="svc-icon__shingle" />
    </svg>
  ),
  Siding: (
    <svg viewBox="0 0 64 64" fill="none" className="svc-icon__svg">
      <rect x="10" y="16" width="44" height="40" rx="2" stroke="currentColor" strokeWidth="2" fill="none" className="svc-icon__house" />
      <line x1="10" y1="24" x2="54" y2="24" stroke="currentColor" strokeWidth="1.5" className="svc-icon__siding-line" />
      <line x1="10" y1="32" x2="54" y2="32" stroke="currentColor" strokeWidth="1.5" className="svc-icon__siding-line" />
      <line x1="10" y1="40" x2="54" y2="40" stroke="currentColor" strokeWidth="1.5" className="svc-icon__siding-line" />
      <line x1="10" y1="48" x2="54" y2="48" stroke="currentColor" strokeWidth="1.5" className="svc-icon__siding-line" />
      <rect x="22" y="26" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" className="svc-icon__window" />
      <line x1="27" y1="26" x2="27" y2="36" stroke="currentColor" strokeWidth="1" className="svc-icon__detail" />
      <line x1="22" y1="31" x2="32" y2="31" stroke="currentColor" strokeWidth="1" className="svc-icon__detail" />
      <rect x="38" y="26" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" className="svc-icon__window" />
    </svg>
  ),
  Windows: (
    <svg viewBox="0 0 64 64" fill="none" className="svc-icon__svg">
      <rect x="12" y="10" width="40" height="44" rx="3" stroke="currentColor" strokeWidth="2" fill="none" className="svc-icon__frame" />
      <line x1="32" y1="10" x2="32" y2="54" stroke="currentColor" strokeWidth="2" className="svc-icon__divider" />
      <line x1="12" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="2" className="svc-icon__divider" />
      <path d="M16 14l6 0l-6 8z" fill="currentColor" opacity="0.15" className="svc-icon__shine" />
      <path d="M36 14l6 0l-6 8z" fill="currentColor" opacity="0.15" className="svc-icon__shine" />
      <circle cx="29" cy="32" r="1.5" fill="currentColor" className="svc-icon__handle" />
      <circle cx="35" cy="32" r="1.5" fill="currentColor" className="svc-icon__handle" />
      <circle cx="50" cy="10" r="3" stroke="currentColor" strokeWidth="1" fill="none" className="svc-icon__sun" />
      <line x1="50" y1="4" x2="50" y2="6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="svc-icon__ray" />
      <line x1="56" y1="10" x2="54" y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="svc-icon__ray" />
      <line x1="54.24" y1="5.76" x2="52.83" y2="7.17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="svc-icon__ray" />
    </svg>
  ),
  Doors: (
    <svg viewBox="0 0 64 64" fill="none" className="svc-icon__svg">
      <rect x="14" y="8" width="36" height="48" rx="3" stroke="currentColor" strokeWidth="2" fill="none" className="svc-icon__frame" />
      <path d="M14 8 Q32 -2 50 8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="svc-icon__arch" />
      <rect x="20" y="16" width="24" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" className="svc-icon__panel" />
      <rect x="20" y="36" width="24" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" className="svc-icon__panel" />
      <circle cx="40" cy="34" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" className="svc-icon__knob" />
      <circle cx="40" cy="34" r="0.8" fill="currentColor" className="svc-icon__knob-center" />
      <line x1="10" y1="56" x2="54" y2="56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="svc-icon__threshold" />
    </svg>
  ),
};

/* ── Card accent colors ── */
const cardGradients = [
  { bg: 'linear-gradient(135deg, #274939 0%, #3A6B55 50%, #2D5A45 100%)', glow: '58,107,85', accent: '#3A6B55' },
  { bg: 'linear-gradient(135deg, #513C60 0%, #7E6891 50%, #5E4570 100%)', glow: '126,104,145', accent: '#7E6891' },
  { bg: 'linear-gradient(135deg, #1B4B6B 0%, #2A7BA8 50%, #1E5578 100%)', glow: '42,123,168', accent: '#2A7BA8' },
  { bg: 'linear-gradient(135deg, #6B3A2A 0%, #A85C3A 50%, #7A4433 100%)', glow: '168,92,58', accent: '#A85C3A' },
];

/* ── Constellation data ── */
const constellationNodes = [
  { baseX: 0.06, baseY: 0.10, r: 3, color: '#3A6B55', drift: 0.6 },
  { baseX: 0.22, baseY: 0.06, r: 2.5, color: '#7E6891', drift: 0.8 },
  { baseX: 0.40, baseY: 0.16, r: 3.5, color: '#2A7BA8', drift: 0.5 },
  { baseX: 0.58, baseY: 0.05, r: 2, color: '#A85C3A', drift: 0.9 },
  { baseX: 0.76, baseY: 0.12, r: 3, color: '#3A6B55', drift: 0.7 },
  { baseX: 0.92, baseY: 0.08, r: 2.5, color: '#7E6891', drift: 0.6 },
  { baseX: 0.04, baseY: 0.44, r: 2, color: '#A85C3A', drift: 0.85 },
  { baseX: 0.16, baseY: 0.54, r: 3, color: '#2A7BA8', drift: 0.55 },
  { baseX: 0.34, baseY: 0.47, r: 2.5, color: '#3A6B55', drift: 0.75 },
  { baseX: 0.50, baseY: 0.40, r: 3.5, color: '#7E6891', drift: 0.65 },
  { baseX: 0.66, baseY: 0.50, r: 2, color: '#A85C3A', drift: 0.9 },
  { baseX: 0.84, baseY: 0.44, r: 3, color: '#2A7BA8', drift: 0.5 },
  { baseX: 0.96, baseY: 0.52, r: 2.5, color: '#3A6B55', drift: 0.7 },
  { baseX: 0.08, baseY: 0.80, r: 3, color: '#7E6891', drift: 0.6 },
  { baseX: 0.28, baseY: 0.86, r: 2, color: '#A85C3A', drift: 0.8 },
  { baseX: 0.46, baseY: 0.76, r: 3.5, color: '#3A6B55', drift: 0.55 },
  { baseX: 0.64, baseY: 0.84, r: 2.5, color: '#2A7BA8', drift: 0.75 },
  { baseX: 0.80, baseY: 0.88, r: 3, color: '#7E6891', drift: 0.65 },
  { baseX: 0.94, baseY: 0.78, r: 2, color: '#A85C3A', drift: 0.85 },
];

const constellationEdges = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12],
  [13, 14], [14, 15], [15, 16], [16, 17], [17, 18],
  [1, 8], [3, 10], [8, 15], [10, 16],
  [2, 9], [9, 15], [4, 11], [11, 17],
];

export default function ServiceCards() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef(0);
  const nodesRef = useRef([]);
  const linesRef = useRef([]);
  const glowRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCard, setActiveCard] = useState(-1);

  /* Sequential auto-cycle: Roofing → Siding → Windows → Doors → repeat */
  useEffect(() => {
    if (!isVisible || hoveredCard !== null) return;
    setActiveCard((prev) => (prev < 0 ? 0 : prev));
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % services.cards.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isVisible, hoveredCard]);

  /* Intersection observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Mouse tracking */
  const onMouseMove = useCallback((e) => {
    const s = sectionRef.current;
    if (!s) return;
    const r = s.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    };
  }, []);

  /* Constellation animation loop */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      const svg = svgRef.current;
      if (!svg) { rafRef.current = requestAnimationFrame(animate); return; }
      const w = svg.clientWidth;
      const h = svg.clientHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      constellationNodes.forEach((node, i) => {
        const el = nodesRef.current[i];
        if (!el) return;
        const offsetX = (mx - 0.5) * node.drift * 60;
        const offsetY = (my - 0.5) * node.drift * 60;
        const cx = node.baseX * w + offsetX;
        const cy = node.baseY * h + offsetY;
        el.setAttribute('cx', String(cx));
        el.setAttribute('cy', String(cy));
        const dist = Math.hypot(mx - node.baseX, my - node.baseY);
        el.setAttribute('opacity', String(Math.max(0.15, Math.min(0.7, 1 - dist * 1.5))));
      });

      constellationEdges.forEach((edge, i) => {
        const line = linesRef.current[i];
        if (!line) return;
        const a = nodesRef.current[edge[0]];
        const b = nodesRef.current[edge[1]];
        if (!a || !b) return;
        line.setAttribute('x1', a.getAttribute('cx'));
        line.setAttribute('y1', a.getAttribute('cy'));
        line.setAttribute('x2', b.getAttribute('cx'));
        line.setAttribute('y2', b.getAttribute('cy'));
        const ax = parseFloat(a.getAttribute('cx')) / w;
        const ay = parseFloat(a.getAttribute('cy')) / h;
        const bx = parseFloat(b.getAttribute('cx')) / w;
        const by = parseFloat(b.getAttribute('cy')) / h;
        const midDist = Math.hypot(mx - (ax + bx) / 2, my - (ay + by) / 2);
        line.setAttribute('opacity', String(Math.max(0.02, Math.min(0.15, 0.3 - midDist * 0.5))));
      });

      if (glowRef.current) {
        glowRef.current.setAttribute('cx', String(mx * w));
        glowRef.current.setAttribute('cy', String(my * h));
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
    <section className="services-section" id="services" ref={sectionRef}>
      {/* ===== Background layers (appwedo Benefits style) ===== */}
      <div className="services-section__bg">
        {/* Layer 1: Dark gradient base */}
        <div className="services-section__bg-base" />

        {/* Layer 2: Ambient orbs */}
        <div className="services-section__orb services-section__orb--a" />
        <div className="services-section__orb services-section__orb--b" />

        {/* Layer 3: Mesh grid */}
        <svg className="services-section__grid-pattern" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="svcGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#svcGrid)" />
        </svg>

        {/* Layer 4 + 5: Interactive constellation + mouse glow */}
        <svg
          ref={svgRef}
          className="services-section__constellation"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="svcMouseGlow">
              <stop offset="0%" stopColor="#3A6B55" stopOpacity="0.12" />
              <stop offset="60%" stopColor="#274939" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#274939" stopOpacity="0" />
            </radialGradient>
            <filter id="svcNodeGlow">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <circle ref={glowRef} r="220" fill="url(#svcMouseGlow)" cx="50%" cy="50%" />

          <g strokeWidth="1">
            {constellationEdges.map((_, i) => (
              <line
                key={`edge-${i}`}
                ref={(el) => { if (el) linesRef.current[i] = el; }}
                stroke="rgba(58,107,85,0.5)"
                opacity="0.04"
                strokeLinecap="round"
              />
            ))}
          </g>

          <g filter="url(#svcNodeGlow)">
            {constellationNodes.map((node, i) => (
              <circle
                key={`node-${i}`}
                ref={(el) => { if (el) nodesRef.current[i] = el; }}
                r={node.r}
                fill={node.color}
                opacity="0.2"
                cx="0"
                cy="0"
              />
            ))}
          </g>
        </svg>
      </div>

      {/* ===== Content ===== */}
      <div className="container services-section__content">
        <SectionHeader badge={services.sectionTitle} title="What We Offer" subtitle={services.sectionSubtitle} variant="dark" />

        <div className={`services-section__grid ${isVisible ? 'is-visible' : ''}`}>
          {services.cards.map((card, idx) => {
            const gradient = cardGradients[idx % cardGradients.length];
            const isAutoActive = hoveredCard === null && activeCard === idx;
            const isActive = isAutoActive || hoveredCard === idx;
            return (
              <div
                key={card.title}
                className="service-card"
                data-active={isAutoActive || undefined}
                style={{
                  '--card-glow': gradient.glow,
                  transitionDelay: `${300 + idx * 100}ms`,
                }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="service-card__icon-area" style={{ background: gradient.bg }}>
                  <div className="svc-icon">
                    {serviceIcons[card.title]}
                  </div>
                  <div className="service-card__icon-orb service-card__icon-orb--a" />
                  <div className="service-card__icon-orb service-card__icon-orb--b" />
                </div>

                <div className="service-card__body">
                  <h3 className="service-card__title">{card.title}</h3>
                  <p className="service-card__description">{card.description}</p>
                  <Link href={card.href} className="service-card__link">
                    {card.linkLabel}
                    <IconArrowRight size={18} />
                  </Link>
                </div>

                {/* Accent top line on hover */}
                <div
                  className="service-card__accent-top"
                  style={{
                    background: `linear-gradient(90deg, transparent 10%, rgba(${gradient.glow}, 0.6) 50%, transparent 90%)`,
                    opacity: isActive ? 1 : 0,
                  }}
                />

                {/* Bottom progress bar */}
                <div className="service-card__bar">
                  <div
                    className="service-card__bar-fill"
                    style={{
                      width: isActive ? '100%' : '0%',
                      background: `linear-gradient(90deg, ${gradient.accent}, rgba(${gradient.glow}, 0.3))`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
