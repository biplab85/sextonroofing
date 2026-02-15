'use client';

import { useState } from 'react';
import { faq } from '@/data/content';
import SectionHeader from '@/components/ui/SectionHeader';

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
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'faq-item--open' : ''}`}
            >
              <button
                className="faq-item__header"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
              >
                <span className="faq-item__question">{item.question}</span>
                <span className="faq-item__icon" aria-hidden="true">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <div
                className="faq-item__body"
                style={{
                  maxHeight: openIndex === index ? '300px' : '0',
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <p className="faq-item__answer">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
