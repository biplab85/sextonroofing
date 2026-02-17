'use client';

import { useCallback, useEffect, useRef } from 'react';
import { hero, business } from '@/data/content';
import { useDrawer } from '@/context/DrawerContext';
import HeroFormAnimation from '@/components/home/HeroFormAnimation';
import { IconShield, IconStar, IconAward } from '@/components/ui/Icons';

/* ── Floating particles (green / purple / gold themed) ── */
const particles = [
  { type: 'circle', size: 5, x: '7%', y: '15%', color: '58,107,85', opacity: 0.2, dur: '24s', dx: 30, dy: -35 },
  { type: 'circle', size: 3, x: '92%', y: '22%', color: '126,104,145', opacity: 0.25, dur: '20s', dx: -20, dy: 25 },
  { type: 'circle', size: 7, x: '80%', y: '78%', color: '81,60,96', opacity: 0.15, dur: '28s', dx: 25, dy: -30 },
  { type: 'circle', size: 4, x: '15%', y: '85%', color: '58,107,85', opacity: 0.2, dur: '22s', dx: -35, dy: 20 },
  { type: 'dot', size: 2, x: '25%', y: '10%', color: '126,104,145', opacity: 0.35, dur: '18s', dx: 15, dy: -20 },
  { type: 'dot', size: 2, x: '70%', y: '12%', color: '81,60,96', opacity: 0.3, dur: '16s', dx: -12, dy: 18 },
  { type: 'dot', size: 3, x: '95%', y: '50%', color: '58,107,85', opacity: 0.25, dur: '20s', dx: -18, dy: -15 },
  { type: 'dot', size: 2, x: '5%', y: '55%', color: '212,175,55', opacity: 0.3, dur: '19s', dx: 20, dy: 12 },
  { type: 'square', size: 5, x: '88%', y: '35%', color: '126,104,145', opacity: 0.12, dur: '30s', dx: -25, dy: 30, rotate: 45 },
  { type: 'square', size: 4, x: '12%', y: '40%', color: '81,60,96', opacity: 0.1, dur: '26s', dx: 20, dy: -25, rotate: 30 },
  { type: 'triangle', size: 7, x: '38%', y: '8%', color: '212,175,55', opacity: 0.1, dur: '28s', dx: 20, dy: 25, rotate: 15 },
  { type: 'triangle', size: 5, x: '82%', y: '60%', color: '58,107,85', opacity: 0.08, dur: '34s', dx: -25, dy: -20, rotate: 40 },
  { type: 'ring', size: 14, x: '55%', y: '5%', color: '58,107,85', opacity: 0.06, dur: '36s', dx: 15, dy: 30 },
  { type: 'ring', size: 10, x: '3%', y: '70%', color: '126,104,145', opacity: 0.07, dur: '30s', dx: 25, dy: -15 },
  { type: 'cross', size: 6, x: '60%', y: '92%', color: '81,60,96', opacity: 0.1, dur: '25s', dx: -20, dy: -30, rotate: 25 },
];

/* ── Cursor trail shapes ── */
const cursorTrails = [
  { size: 5, color: '58,107,85', opacity: 0.35, speed: 0.045, ox: 25, oy: 20 },
  { size: 4, color: '126,104,145', opacity: 0.3, speed: 0.03, ox: -30, oy: -15 },
  { size: 3, color: '81,60,96', opacity: 0.25, speed: 0.02, ox: 15, oy: -30 },
  { size: 6, color: '212,175,55', opacity: 0.2, speed: 0.012, ox: -20, oy: 25 },
];

/* ── Social proof stats ── */
const stats = [
  { value: '40+', label: 'Years Experience' },
  { value: '5/5', label: 'GuildQuality Rating' },
  { value: '100%', label: 'Recommendation Rate' },
];

/* ── Highlight words in headline ── */
const highlightWords = ['Expert', 'Massachusetts'];

export default function Hero() {
  const { openDrawer } = useDrawer();
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const trailRefs = useRef([]);
  const trailPos = useRef(cursorTrails.map((t) => ({ x: 0, y: 0, speed: t.speed, ox: t.ox, oy: t.oy })));
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  // Mouse tracking with requestAnimationFrame (desktop only)
  const handleMouseMove = useCallback((e) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    section.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.04;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.04;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${posRef.current.x - 400}px, ${posRef.current.y - 400}px)`;
      }

      trailPos.current.forEach((tp, i) => {
        const tx = mouseRef.current.x + tp.ox;
        const ty = mouseRef.current.y + tp.oy;
        tp.x += (tx - tp.x) * tp.speed;
        tp.y += (ty - tp.y) * tp.speed;
        const el = trailRefs.current[i];
        if (el) el.style.transform = `translate(${tp.x}px, ${tp.y}px)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <section ref={sectionRef} className="hero" id="hero">
      {/* ===== Background Layers ===== */}
      <div className="hero__bg-layers">
        {/* Deep dark base */}
        <div
          className="hero__overlay-base"
          style={{ background: 'linear-gradient(145deg, #050510 0%, #0a1410 20%, #0c1c14 40%, #081e16 65%, #0a0a18 100%)' }}
        />

        <div
          className="hero__aurora"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(58,107,85,0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, rgba(126,104,145,0.3) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 50% 80%, rgba(81,60,96,0.25) 0%, transparent 50%)' }}
        />

        <div
          className="hero__grid-bg"
          style={{ backgroundImage: 'linear-gradient(rgba(58,107,85,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(58,107,85,0.25) 1px, transparent 1px)', backgroundSize: '80px 80px' }}
        />

        <div
          className="hero__horizon"
          style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(58,107,85,0.15) 25%, rgba(126,104,145,0.2) 50%, rgba(81,60,96,0.15) 75%, transparent 95%)' }}
        />

        <div className="hero__orb hero__orb--a" style={{ background: 'radial-gradient(circle, rgba(58,107,85,0.5) 0%, transparent 70%)' }} />
        <div className="hero__orb hero__orb--b" style={{ background: 'radial-gradient(circle, rgba(126,104,145,0.4) 0%, transparent 70%)' }} />
        <div className="hero__orb hero__orb--c" style={{ background: 'radial-gradient(circle, rgba(81,60,96,0.35) 0%, transparent 70%)' }} />

        <div
          ref={glowRef}
          className="hero__mouse-glow"
          style={{ background: 'radial-gradient(circle, rgba(58,107,85,0.4) 0%, rgba(126,104,145,0.15) 40%, transparent 70%)' }}
        />

        {particles.map((p, i) => (
          <div
            key={`p-${i}`}
            className={`hero__particle hero-p-float-${i}`}
            style={{ left: p.x, top: p.y, opacity: p.opacity }}
          >
            {p.type === 'circle' && (
              <div style={{ width: p.size, height: p.size, borderRadius: '50%', background: `rgba(${p.color},0.8)`, boxShadow: `0 0 ${p.size * 2}px rgba(${p.color},0.3)` }} />
            )}
            {p.type === 'dot' && (
              <div style={{ width: p.size, height: p.size, borderRadius: '50%', background: `rgba(${p.color},1)`, boxShadow: `0 0 ${p.size * 4}px rgba(${p.color},0.5)` }} />
            )}
            {p.type === 'square' && (
              <div style={{ width: p.size, height: p.size, background: `rgba(${p.color},0.6)`, border: `1px solid rgba(${p.color},0.3)`, transform: `rotate(${p.rotate || 0}deg)` }} />
            )}
            {p.type === 'triangle' && (
              <div style={{ width: 0, height: 0, borderLeft: `${p.size / 2}px solid transparent`, borderRight: `${p.size / 2}px solid transparent`, borderBottom: `${p.size}px solid rgba(${p.color},0.5)`, filter: `drop-shadow(0 0 ${p.size}px rgba(${p.color},0.3))`, transform: `rotate(${p.rotate || 0}deg)` }} />
            )}
            {p.type === 'ring' && (
              <div style={{ width: p.size, height: p.size, borderRadius: '50%', border: `1px solid rgba(${p.color},0.4)`, boxShadow: `0 0 ${p.size}px rgba(${p.color},0.15)` }} />
            )}
            {p.type === 'cross' && (
              <div style={{ position: 'relative', width: p.size, height: p.size, transform: `rotate(${p.rotate || 0}deg)` }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 1, background: `rgba(${p.color},0.5)`, transform: 'translateY(-50%)' }} />
                <div style={{ position: 'absolute', left: '50%', top: 0, width: 1, height: '100%', background: `rgba(${p.color},0.5)`, transform: 'translateX(-50%)' }} />
              </div>
            )}
          </div>
        ))}

        {cursorTrails.map((t, i) => (
          <div
            key={`trail-${i}`}
            ref={(el) => { trailRefs.current[i] = el; }}
            className="hero__trail"
            style={{ opacity: t.opacity }}
          >
            <div style={{ width: t.size, height: t.size, borderRadius: '50%', background: `rgba(${t.color},0.9)`, boxShadow: `0 0 ${t.size * 4}px rgba(${t.color},0.4)` }} />
          </div>
        ))}
      </div>

      {/* ===== Content ===== */}
      <div className="hero__inner">
        <div className="hero__grid-layout">
          {/* Left: Content */}
          <div className="hero__content">
            <div
              className="hero__badge hero-entrance hero-entrance--1"
              style={{ background: 'linear-gradient(135deg, rgba(58,107,85,0.15) 0%, rgba(126,104,145,0.1) 100%)', border: '1px solid rgba(58,107,85,0.25)' }}
            >
              <span className="hero__badge-ping">
                <span className="hero__badge-ping-wave" />
                <span className="hero__badge-ping-dot" />
              </span>
              <span className="hero__badge-text">Family-Owned Since {business.established}</span>
            </div>

            <h1 className="hero__headline hero-entrance hero-entrance--2">
              {hero.headline.split(' ').map((word, i) => {
                const isHighlight = highlightWords.includes(word);
                return (
                  <span key={i} className={isHighlight ? 'hero__headline-highlight' : 'hero__headline-word'}>
                    {word}
                  </span>
                );
              })}
            </h1>

            <p className="hero__subheadline hero-entrance hero-entrance--3">
              {hero.subheadline}
            </p>

            <div className="hero__ctas hero-entrance hero-entrance--4">
              <button type="button" onClick={openDrawer} className="hero__cta-primary">
                <IconShield size={18} />
                {hero.primaryCta.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </button>
              <a href={hero.secondaryCta.href} className="hero__cta-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                {hero.secondaryCta.label}
              </a>
            </div>

            <div className="hero__stats hero-entrance hero-entrance--5">
              {stats.map((stat, index) => (
                <div key={index} className="hero__stat">
                  <div className="hero__stat-value">{stat.value}</div>
                  <div className="hero__stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form Card */}
          <div className="formCardOnHero hero__form-wrapper hero-entrance hero-entrance--6">
            <div className="hero__ring hero__ring--a" />
            <div className="hero__ring hero__ring--b" />

            <div className="hero__form-card" id="estimate-form">
              <div className="hero__form-card-shine" />
              <h2 className="hero__form-title">{hero.form.title}</h2>
              <HeroFormAnimation />
            </div>

            <div className="hero__float-card hero__float-card--a">
              <div className="hero__float-card-icon" style={{ background: 'rgba(58,107,85,0.1)', borderColor: 'rgba(58,107,85,0.2)' }}>
                <IconAward size={16} style={{ color: '#3A6B55' }} />
              </div>
              <div>
                <div className="hero__float-card-title">40+ Years</div>
                <div className="hero__float-card-desc">Trusted Service</div>
              </div>
            </div>

            <div className="hero__float-card hero__float-card--b">
              <div className="hero__float-card-icon" style={{ background: 'rgba(126,104,145,0.1)', borderColor: 'rgba(126,104,145,0.2)' }}>
                <IconStar size={16} style={{ color: '#7E6891' }} />
              </div>
              <div>
                <div className="hero__float-card-title">5/5 Stars</div>
                <div className="hero__float-card-desc">GuildQuality</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CSS Animations (inline for dynamic keyframes) ===== */}
      <style>{`
        .hero__orb--a{animation:heroOrbA 26s ease-in-out infinite}
        .hero__orb--b{animation:heroOrbB 32s ease-in-out infinite}
        .hero__orb--c{animation:heroOrbC 28s ease-in-out infinite}
        @keyframes heroOrbA{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(40px,-30px) scale(1.06)}66%{transform:translate(-30px,25px) scale(0.94)}}
        @keyframes heroOrbB{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-35px,20px) scale(1.05)}66%{transform:translate(25px,-25px) scale(0.95)}}
        @keyframes heroOrbC{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(20px,30px) scale(1.04)}66%{transform:translate(-25px,-20px) scale(0.96)}}
        .hero__ring--a{animation:heroRingSpin 60s linear infinite}
        .hero__ring--b{animation:heroRingSpin 45s linear infinite reverse}
        @keyframes heroRingSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .hero__float-card--a{animation:heroFloat 4s ease-in-out infinite}
        .hero__float-card--b{animation:heroFloat 5s ease-in-out infinite 0.5s}
        @keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .hero__badge-ping-wave{animation:heroPing 1.5s cubic-bezier(0,0,0.2,1) infinite}
        @keyframes heroPing{75%,100%{transform:scale(2);opacity:0}}
        @keyframes heroGradText{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        ${particles.map((p, i) => `.hero-p-float-${i}{animation:heroPF${i} ${p.dur} ease-in-out infinite}@keyframes heroPF${i}{0%,100%{transform:translate(0,0)}25%{transform:translate(${p.dx * 0.6}px,${p.dy * 0.4}px)}50%{transform:translate(${p.dx}px,${p.dy}px)}75%{transform:translate(${p.dx * 0.3}px,${p.dy * 0.7}px)}}`).join('')}
      `}</style>
    </section>
  );
}
