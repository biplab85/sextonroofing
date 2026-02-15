'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { testimonials } from '@/data/content';
import { IconStar, IconChevronLeft, IconChevronRight } from '@/components/ui/Icons';
import SectionHeader from '@/components/ui/SectionHeader';

const accentColors = [
  { bg: 'rgba(58,107,85,0.9)', rgb: '58,107,85' },
  { bg: 'rgba(126,104,145,0.9)', rgb: '126,104,145' },
  { bg: 'rgba(234,179,8,0.9)', rgb: '234,179,8' },
  { bg: 'rgba(22,163,74,0.9)', rgb: '22,163,74' },
  { bg: 'rgba(236,72,153,0.9)', rgb: '236,72,153' },
];

function getAccentColor(index) {
  return accentColors[index % accentColors.length];
}

function getInitials(name) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2);
}

export default function Testimonials() {
  const swiperInstanceRef = useRef(null);
  const swiperElRef = useRef(null);
  const initialized = useRef(false);
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const slides = [...testimonials.reviews, ...testimonials.reviews];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const onMouseMove = useCallback((e) => {
    const s = sectionRef.current;
    if (!s) return;
    const r = s.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  }, []);

  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    s.addEventListener('mousemove', onMouseMove);
    const tick = () => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.06;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.06;
      if (glowRef.current)
        glowRef.current.style.transform =
          `translate(${posRef.current.x - 300}px,${posRef.current.y - 300}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { s.removeEventListener('mousemove', onMouseMove); cancelAnimationFrame(rafRef.current); };
  }, [onMouseMove]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    async function initSwiper() {
      const { Swiper } = await import('swiper');
      const { EffectCoverflow, Autoplay } = await import('swiper/modules');
      await import('swiper/css');
      await import('swiper/css/effect-coverflow');

      if (!swiperElRef.current) return;

      swiperInstanceRef.current = new Swiper(swiperElRef.current, {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        modules: [EffectCoverflow, Autoplay],
        speed: 650,
      });
    }

    initSwiper();
  }, []);

  return (
    <section className="reviews-section" id="testimonials" ref={sectionRef}>
      {/* Background layers */}
      <div className="reviews-section__bg">
        <div className="reviews-section__bg-base" />
        <div className="reviews-section__bg-grid" />
        <div className="reviews-section__orb reviews-section__orb--a" />
        <div className="reviews-section__orb reviews-section__orb--b" />
        <div ref={glowRef} className="reviews-section__glow" />
        <svg className="reviews-section__rays" viewBox="0 0 1200 800"><line x1="600" y1="400" x2="1400" y2="400" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="1372.74" y2="607.06" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="1292.82" y2="800" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="1165.69" y2="965.69" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="1000" y2="1092.82" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="807.06" y2="1172.74" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="600" y2="1200" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="392.94" y2="1172.74" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="200" y2="1092.82" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="34.31" y2="965.69" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="-92.82" y2="800" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="-172.74" y2="607.06" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="-200" y2="400" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="-172.74" y2="192.94" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="-92.82" y2="0" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="34.31" y2="-165.69" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="200" y2="-292.82" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="392.94" y2="-372.74" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="600" y2="-400" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="807.06" y2="-372.74" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="1000" y2="-292.82" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="1165.69" y2="-165.69" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="1292.82" y2="0" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /><line x1="600" y1="400" x2="1372.74" y2="192.94" stroke="rgba(232,97,45,0.3)" strokeWidth="0.5" /></svg>
      </div>

      {/* Header */}
      <div className="container reviews-section__header">
        <SectionHeader badge="Reviews" title={testimonials.sectionTitle} subtitle={testimonials.sectionSubtitle} variant="dark" />
      </div>

      {/* Coverflow slider */}
      <div className={`reviews-section__slider-wrap ${isVisible ? 'is-visible' : ''}`}>
        <button
          className="reviews-nav-btn reviews-nav-btn--prev"
          onClick={() => swiperInstanceRef.current?.slidePrev()}
          aria-label="Previous review"
        >
          <IconChevronLeft size={20} />
        </button>
        <button
          className="reviews-nav-btn reviews-nav-btn--next"
          onClick={() => swiperInstanceRef.current?.slideNext()}
          aria-label="Next review"
        >
          <IconChevronRight size={20} />
        </button>

        <div className="swiper reviews-coverflow-slider" ref={swiperElRef}>
          <div className="swiper-wrapper">
            {slides.map((review, idx) => {
              const clr = getAccentColor(idx % testimonials.reviews.length);
              const hovered = hoveredCard === idx;

              return (
                <div key={idx} className="swiper-slide reviews-slide">
                  <div
                    className="review-card"
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{ '--accent-rgb': clr.rgb }}
                  >
                    {/* Top area */}
                    <div className="review-card__top">
                      <div
                        className="review-card__bg"
                        style={{
                          background: `linear-gradient(160deg, rgba(${clr.rgb},0.15) 0%, rgba(${clr.rgb},0.05) 40%, transparent 70%)`,
                        }}
                      />
                      <div
                        className="review-card__overlay"
                        style={{ opacity: hovered ? 0.95 : 0.7 }}
                      />
                      <div
                        className="review-card__accent-line"
                        style={{
                          background: `linear-gradient(90deg,transparent 5%,rgba(${clr.rgb},.8) 50%,transparent 95%)`,
                          opacity: hovered ? 1 : 0,
                        }}
                      />

                      {/* Source badge */}
                      <div className="review-card__badge">
                        <span
                          style={{
                            background: clr.bg,
                            boxShadow: `0 4px 16px -3px rgba(${clr.rgb},0.5)`,
                          }}
                        >
                          <IconStar size={12} />
                          {review.source}
                        </span>
                      </div>

                      {/* Quote content */}
                      <div className="review-card__content">
                        <div className="review-card__stars">
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <IconStar key={j} size={16} />
                          ))}
                        </div>
                        <p className="review-card__quote">&ldquo;{review.quote}&rdquo;</p>
                        <div className="review-card__avatar">
                          {getInitials(review.author)}
                        </div>
                      </div>

                      {/* Card image border */}
                      <div
                        className="review-card__border-top"
                        style={{
                          borderTop: `1px solid ${hovered ? `rgba(${clr.rgb},0.35)` : 'rgba(255,255,255,0.05)'}`,
                          borderLeft: `1px solid ${hovered ? `rgba(${clr.rgb},0.35)` : 'rgba(255,255,255,0.05)'}`,
                          borderRight: `1px solid ${hovered ? `rgba(${clr.rgb},0.35)` : 'rgba(255,255,255,0.05)'}`,
                        }}
                      />
                    </div>

                    {/* Bottom info panel */}
                    <div
                      className="review-card__info"
                      style={{
                        borderLeft: `1px solid ${hovered ? `rgba(${clr.rgb},0.35)` : 'rgba(255,255,255,0.05)'}`,
                        borderRight: `1px solid ${hovered ? `rgba(${clr.rgb},0.35)` : 'rgba(255,255,255,0.05)'}`,
                        borderBottom: `1px solid ${hovered ? `rgba(${clr.rgb},0.35)` : 'rgba(255,255,255,0.05)'}`,
                      }}
                    >
                      <h3
                        className="review-card__name"
                        style={{ color: hovered ? `rgba(${clr.rgb},1)` : 'rgba(255,255,255,.9)' }}
                      >
                        {review.author}
                      </h3>
                      <p className="review-card__location">{review.location}</p>
                      <div
                        className="review-card__underline"
                        style={{
                          background: `linear-gradient(90deg,rgba(${clr.rgb},.9),rgba(${clr.rgb},.15))`,
                          width: hovered ? '50%' : '0%',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
