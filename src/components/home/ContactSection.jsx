'use client';

import { useState } from 'react';
import { hero, contact } from '@/data/content';
import { IconCheckCircle } from '@/components/ui/Icons';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ContactSection() {
  const ref = useScrollReveal();
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  const fields = hero.form.fields;

  return (
    <section className="contact-v2" id="contact">
      {/* ── Dark Header ── */}
      <div className="contact-v2__header">
        <div className="contact-v2__header-inner">
          {/* Badge */}
          <div className="contact-v2__badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="badge-cmd-icon">
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
            </svg>
            <span>Communicate</span>
            <span className="badge-dot" aria-hidden="true" />
          </div>

          {/* Title with decorative curls */}
          <h2 className="contact-v2__title">
            <svg className="contact-v2__curl" width="22" height="40" viewBox="0 0 22 40" fill="none" aria-hidden="true">
              <path d="M18 4C12 4 9 8 9 13C9 17 13 18 13 22C13 26 8 26 3 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M18 36C12 36 9 32 9 27C9 23 13 22 13 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span>Contact us anytime</span>
            <svg className="contact-v2__curl contact-v2__curl--flip" width="22" height="40" viewBox="0 0 22 40" fill="none" aria-hidden="true">
              <path d="M18 4C12 4 9 8 9 13C9 17 13 18 13 22C13 26 8 26 3 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M18 36C12 36 9 32 9 27C9 23 13 22 13 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </h2>

          <p className="contact-v2__desc">
            We are here to help out anytime. So, please fill up the form and send
            to us. We will get back to you within 2 business days. Thanks for
            your patience and support.
          </p>
        </div>

        {/* Decorative curved arrow */}
        <svg className="contact-v2__arrow" width="120" height="140" viewBox="0 0 120 140" fill="none" aria-hidden="true">
          <path
            d="M20 8C40 3 75 2 85 18C98 38 65 52 55 72C45 92 60 110 80 125"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          <path d="M74 120L82 128L88 118" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* ── White Form Card (overlaps dark header) ── */}
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
              {/* 2x2 Grid of fields */}
              <div className="contact-v2__row">
                {fields.map((field) => (
                  <div key={field.name} className="contact-v2__field">
                    <label className="contact-v2__label">
                      {field.label}
                      {field.required && <span className="contact-v2__req"> *</span>}
                    </label>

                    {field.type === 'select' ? (
                      <select
                        name={field.name}
                        className="contact-v2__select"
                        required={field.required}
                        onChange={handleChange}
                        defaultValue=""
                      >
                        {field.options.map((opt) => (
                          <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="contact-v2__input"
                        onChange={handleChange}
                      />
                    )}
                  </div>
                ))}
              </div>

              {status === 'error' && (
                <p className="contact-v2__error">{contact.form.errorMessage}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="contact-v2__submit"
                disabled={status === 'submitting'}
              >
                <span>{status === 'submitting' ? 'Sending...' : 'Get started'}</span>
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
