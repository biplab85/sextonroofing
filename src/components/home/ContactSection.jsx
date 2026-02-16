'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { contact } from '@/data/content';
import { IconCheckCircle } from '@/components/ui/Icons';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

const MAX_W = 48;   // final width %
const MAX_H = 40;   // final height %

export default function ContactSection() {
  const ref = useScrollReveal();
  const [formData, setFormData] = useState({});
  const [selectedServices, setSelectedServices] = useState([]);
  const [status, setStatus] = useState('idle');
  const sectionRef = useRef(null);
  const arrowRef = useRef(null);
  const rafRef = useRef(null);
  const doneRef = useRef(false);

  const updateArrow = useCallback(() => {
    const section = sectionRef.current;
    const arrow = arrowRef.current;
    if (!section || !arrow || doneRef.current) return;

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    // Progress: 0 when section top hits viewport bottom, 1 when section top reaches 40% from top
    const start = vh;          // section top at bottom of screen
    const end = vh * 0.35;     // section top at 35% from top
    const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));

    const w = progress * MAX_W;
    const h = progress * MAX_H;

    arrow.style.width = w + '%';
    arrow.style.height = h + '%';

    // Mark done when fully grown — stop listening
    if (progress >= 1) {
      doneRef.current = true;
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (doneRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateArrow);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    // Run once on mount in case section is already in view
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateArrow]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckbox = (value) => {
    setSelectedServices((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact-v2" id="contact" ref={sectionRef}>
      {/* ── Premium Guided Arrow ── */}
      <svg ref={arrowRef} className="contact-v2__guide-arrow" viewBox="0 0 900 600" fill="none" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <linearGradient id="guideArrowGrad" x1="0" y1="0" x2="900" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(255,255,255,0.03)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="70%" stopColor="rgba(81,60,96,0.25)" />
            <stop offset="100%" stopColor="rgba(81,60,96,0.4)" />
          </linearGradient>
          <linearGradient id="guideArrowGlow" x1="0" y1="0" x2="900" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(81,60,96,0.08)" />
            <stop offset="100%" stopColor="rgba(81,60,96,0.15)" />
          </linearGradient>
          <filter id="arrowSoftGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Wide glow trail behind the main stroke */}
        <path
          className="contact-v2__guide-glow"
          d="M-20 30 C80 25, 140 50, 200 100 C280 165, 300 200, 380 260 C460 320, 560 360, 660 400 C740 430, 800 460, 860 500"
          stroke="url(#guideArrowGlow)"
          strokeWidth="60"
          strokeLinecap="round"
          fill="none"
        />

        {/* Main flowing curve — long elegant tail */}
        <path
          className="contact-v2__guide-path"
          d="M-20 30 C80 25, 140 50, 200 100 C280 165, 300 200, 380 260 C460 320, 560 360, 660 400 C740 430, 800 460, 860 500"
          stroke="url(#guideArrowGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#arrowSoftGlow)"
        />

        {/* Secondary parallel accent line */}
        <path
          className="contact-v2__guide-accent"
          d="M-10 50 C90 48, 160 72, 220 120 C295 182, 320 220, 395 278 C470 336, 570 374, 665 412 C740 440, 795 466, 850 506"
          stroke="rgba(81,60,96,0.12)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="8 12"
          fill="none"
        />

        {/* Arrowhead — elegant triangular pointer */}
        <path
          className="contact-v2__guide-head"
          d="M838 484 L868 510 L842 518"
          stroke="rgba(81,60,96,0.5)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Decorative sparkle dots along the path */}
        <circle className="contact-v2__guide-dot contact-v2__guide-dot--1" cx="200" cy="100" r="2" fill="rgba(255,255,255,0.35)" />
        <circle className="contact-v2__guide-dot contact-v2__guide-dot--2" cx="380" cy="260" r="2.5" fill="rgba(81,60,96,0.3)" />
        <circle className="contact-v2__guide-dot contact-v2__guide-dot--3" cx="560" cy="365" r="2" fill="rgba(81,60,96,0.35)" />
        <circle className="contact-v2__guide-dot contact-v2__guide-dot--4" cx="740" cy="430" r="3" fill="rgba(81,60,96,0.25)" />
      </svg>

      {/* ── Dark Header ── */}
      <div className="contact-v2__header">
        <div className="contact-v2__header-inner">
          <SectionHeader
            badge="Contact"
            title={contact.sectionTitle}
            subtitle={contact.sectionSubtitle}
            variant="dark"
          />

        </div>
      </div>

      {/* ── White Form Card ── */}
      <div className="contact-v2__card-wrap">
        <div className="contact-v2__card reveal" ref={ref}>
          {status === 'success' ? (
            <div className="contact-v2__success">
              <div className="contact-v2__success-icon">
                <IconCheckCircle size={40} />
              </div>
              <h3>Thank You!</h3>
              <p>{contact.form.successMessage}</p>
            </div>
          ) : (
            <form className="contact-v2__form" onSubmit={handleSubmit} noValidate>
              {/* Text fields — 2-column grid (excluding State) */}
              <div className="contact-v2__row">
                {contact.form.fields.filter((f) => f.name !== 'state').map((field) => (
                  <div key={field.name} className={`contact-v2__field${formData[field.name] ? ' contact-v2__field--filled' : ''}`}>
                    <input
                      id={`cf-${field.name}`}
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      className="contact-v2__input"
                      onChange={handleChange}
                      placeholder=" "
                    />
                    <label className="contact-v2__label" htmlFor={`cf-${field.name}`}>
                      {field.label}
                      {field.required && <span className="contact-v2__req"> *</span>}
                    </label>
                  </div>
                ))}
              </div>

              {/* Bottom section: State + Services (left) | Message (right) */}
              <div className="contact-v2__bottom-row">
                <div className="contact-v2__bottom-left">
                  {/* State field */}
                  {contact.form.fields.filter((f) => f.name === 'state').map((field) => (
                    <div key={field.name} className={`contact-v2__field${formData[field.name] ? ' contact-v2__field--filled' : ''}`}>
                      <input
                        id={`cf-${field.name}`}
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        className="contact-v2__input"
                        onChange={handleChange}
                        placeholder=" "
                      />
                      <label className="contact-v2__label" htmlFor={`cf-${field.name}`}>
                        {field.label}
                        {field.required && <span className="contact-v2__req"> *</span>}
                      </label>
                    </div>
                  ))}

                  {/* Service checkboxes */}
                  <div className="contact-v2__checkbox-group">
                    <span className="contact-v2__group-label">
                      Service Needed <span className="contact-v2__req">*</span>
                    </span>
                    <div className="contact-v2__checkboxes">
                      {contact.form.services.map((svc) => (
                        <label key={svc.value} className="contact-v2__checkbox">
                          <input
                            type="checkbox"
                            name="service"
                            value={svc.value}
                            checked={selectedServices.includes(svc.value)}
                            onChange={() => handleCheckbox(svc.value)}
                          />
                          <span className="contact-v2__checkmark" />
                          <span className="contact-v2__checkbox-label">{svc.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message textarea */}
                <div className={`contact-v2__field contact-v2__bottom-right${formData.message ? ' contact-v2__field--filled' : ''}`}>
                  <textarea
                    id="cf-message"
                    name="message"
                    className="contact-v2__textarea"
                    onChange={handleChange}
                    rows={4}
                    placeholder=" "
                  />
                  <label className="contact-v2__label" htmlFor="cf-message">
                    Message
                  </label>
                </div>
              </div>

              {status === 'error' && (
                <p className="contact-v2__error">{contact.form.errorMessage}</p>
              )}

              <button
                type="submit"
                className="contact-v2__submit"
                disabled={status === 'submitting'}
              >
                <span>{status === 'submitting' ? 'Sending...' : contact.form.submitLabel}</span>
                <span className="contact-v2__submit-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
