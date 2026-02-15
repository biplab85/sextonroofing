'use client';

import { useState, useEffect, useRef } from 'react';

const formSteps = [
  { label: 'Your Name', value: 'John Smith', isSelect: false },
  { label: 'Phone Number', value: '(413) 555-0000', isSelect: false },
  { label: 'Service Needed', value: 'Roofing', isSelect: true },
  { label: 'Zip Code', value: '01040', isSelect: false },
];

const successParticles = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2;
  const distance = 55 + (i % 3) * 25;
  const colors = ['58,107,85', '126,104,145', '212,175,55'];
  return {
    color: colors[i % 3],
    size: 4 + (i % 3) * 2,
    tx: Math.round(Math.cos(angle) * distance * 100) / 100,
    ty: Math.round(Math.sin(angle) * distance * 100) / 100,
    delay: i * 0.04,
  };
});

export default function HeroFormAnimation() {
  const [visibleFields, setVisibleFields] = useState(0);
  const [activeField, setActiveField] = useState(-1);
  const [typedText, setTypedText] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const timeoutsRef = useRef([]);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    function schedule(fn, delay) {
      const id = setTimeout(() => {
        if (!cancelledRef.current) fn();
      }, delay);
      timeoutsRef.current.push(id);
    }

    function runCycle() {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      setVisibleFields(0);
      setActiveField(-1);
      setTypedText({});
      setShowButton(false);
      setButtonPressed(false);
      setShowSuccess(false);
      setFadeOut(false);

      let t = 900;

      formSteps.forEach((step, i) => {
        schedule(() => {
          setVisibleFields(i + 1);
          setActiveField(i);
        }, t);
        t += 500;

        if (step.isSelect) {
          schedule(() => {
            setTypedText((prev) => ({ ...prev, [i]: step.value }));
          }, t);
          t += 600;
        } else {
          for (let c = 0; c < step.value.length; c++) {
            const charIndex = c;
            schedule(() => {
              setTypedText((prev) => ({
                ...prev,
                [i]: step.value.substring(0, charIndex + 1),
              }));
            }, t + c * 70);
          }
          t += step.value.length * 70 + 300;
        }

        schedule(() => setActiveField(-1), t);
        t += 250;
      });

      schedule(() => setShowButton(true), t);
      t += 700;

      schedule(() => setButtonPressed(true), t);
      t += 500;

      schedule(() => setShowSuccess(true), t);
      t += 3500;

      schedule(() => setFadeOut(true), t);
      t += 900;

      schedule(() => {
        if (!cancelledRef.current) runCycle();
      }, t);
    }

    runCycle();

    return () => {
      cancelledRef.current = true;
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={`hero-anim ${fadeOut ? 'hero-anim--fade-out' : ''}`}>
      {/* Animated form fields */}
      <div className={`hero-anim__fields ${showSuccess ? 'hero-anim__fields--hidden' : ''}`}>
        {formSteps.map((step, i) => {
          const isVisible = i < visibleFields;
          const isActive = activeField === i;
          const isComplete = typedText[i] && typedText[i].length === step.value.length;

          return (
            <div
              key={i}
              className={`hero-anim__field${isVisible ? ' hero-anim__field--visible' : ''}${isActive ? ' hero-anim__field--active' : ''}${isComplete ? ' hero-anim__field--complete' : ''}`}
            >
              <div className="hero-anim__label">{step.label}</div>
              <div className="hero-anim__input">
                <span className="hero-anim__text">{typedText[i] || ''}</span>
                {isActive && !step.isSelect && (
                  <span className="hero-anim__cursor" />
                )}
                {step.isSelect && (
                  <span className="hero-anim__select-icon">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Animated submit button */}
        <div
          className={`hero-anim__submit${showButton ? ' hero-anim__submit--visible' : ''}${buttonPressed ? ' hero-anim__submit--pressed' : ''}`}
        >
          <div className="hero-anim__submit-inner">
            <span>Get My Free Estimate</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
          <div className="hero-anim__submit-shimmer" />
        </div>
      </div>

      {/* Success state */}
      <div className={`hero-anim__success${showSuccess ? ' hero-anim__success--visible' : ''}`}>
        <div className="hero-anim__check-wrap">
          <svg className="hero-anim__check-svg" viewBox="0 0 52 52" width="56" height="56">
            <circle
              className="hero-anim__check-circle"
              cx="26" cy="26" r="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="hero-anim__check-path"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 26l7 7 15-15"
            />
          </svg>
        </div>
        <h3 className="hero-anim__success-title">Thank You!</h3>
        <p className="hero-anim__success-text">We&apos;ll get back to you within 24 hours</p>

        {/* Celebration particles */}
        <div className="hero-anim__particles" aria-hidden="true">
          {successParticles.map((p, i) => (
            <div
              key={i}
              className="hero-anim__particle"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: `rgba(${p.color}, 0.75)`,
                boxShadow: `0 0 ${p.size * 2}px rgba(${p.color}, 0.3)`,
                '--particle-tx': `${p.tx}px`,
                '--particle-ty': `${p.ty}px`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
