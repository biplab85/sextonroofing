'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { faq } from '@/data/content';
import SectionHeader from '@/components/ui/SectionHeader';

function FAQItem({ item, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  const measure = useCallback(() => {
    if (innerRef.current) {
      setHeight(innerRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure, { passive: true });
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <button
        className="faq-item__header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq-item__question">{item.question}</span>
        <span className="faq-item__icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        ref={bodyRef}
        className="faq-item__body"
        style={{
          maxHeight: isOpen ? `${height}px` : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={innerRef}>
          <p className="faq-item__answer">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <SectionHeader badge="FAQs" title={faq.sectionTitle} subtitle={faq.sectionSubtitle} variant="dark" />

        <div className="faq-section__list">
          {faq.items.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
