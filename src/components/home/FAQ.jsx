'use client';

import { useState } from 'react';
import { faq } from '@/data/content';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="faq-section__badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="badge-cmd-icon">
            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
          </svg>
          <span>FAQs</span>
          <span className="badge-dot" aria-hidden="true" />
        </div>

        <h2 className="faq-section__title">
          <svg className="faq-section__curl" width="22" height="40" viewBox="0 0 22 40" fill="none" aria-hidden="true">
            <path d="M18 4C12 4 9 8 9 13C9 17 13 18 13 22C13 26 8 26 3 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M18 36C12 36 9 32 9 27C9 23 13 22 13 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span>{faq.sectionTitle}</span>
          <svg className="faq-section__curl faq-section__curl--flip" width="22" height="40" viewBox="0 0 22 40" fill="none" aria-hidden="true">
            <path d="M18 4C12 4 9 8 9 13C9 17 13 18 13 22C13 26 8 26 3 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M18 36C12 36 9 32 9 27C9 23 13 22 13 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </h2>
        <p className="faq-section__subtitle">{faq.sectionSubtitle}</p>

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
