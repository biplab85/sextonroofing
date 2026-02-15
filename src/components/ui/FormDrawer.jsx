'use client';

import { useEffect, useRef } from 'react';
import { useDrawer } from '@/context/DrawerContext';
import { hero, business } from '@/data/content';
import ContactForm from '@/components/ui/ContactForm';
import { IconPhone, IconShield } from '@/components/ui/Icons';

export default function FormDrawer() {
  const { isOpen, closeDrawer } = useDrawer();
  const drawerRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) closeDrawer();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeDrawer]);

  // Focus trap: focus first focusable element when opened
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const timer = setTimeout(() => {
        const focusable = drawerRef.current?.querySelector(
          'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable) focusable.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`drawer-overlay${isOpen ? ' drawer-overlay--open' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        ref={drawerRef}
        className={`drawer${isOpen ? ' drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Request a Free Estimate"
        aria-hidden={!isOpen}
      >
        {/* Top decorative shine */}
        <div className="drawer__shine" />

        {/* Header */}
        <div className="drawer__header">
          <div className="drawer__header-content">
            <div className="drawer__badge">
              <IconShield size={16} />
              <span>Free &amp; No Obligation</span>
            </div>
            <h2 className="drawer__title">{hero.form.title}</h2>
            <p className="drawer__subtitle">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
          <button
            className="drawer__close"
            onClick={closeDrawer}
            aria-label="Close estimate form"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Form body */}
        <div className="drawer__body">
          <div className="drawer__form-card">
            <ContactForm
              fields={hero.form.fields}
              submitLabel={hero.form.submitLabel}
              successMessage="Thank you! We'll get back to you within 24 hours."
              errorMessage="Something went wrong. Please call us at 413-534-1234."
              variant="drawer"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="drawer__footer">
          <p className="drawer__footer-text">Prefer to call?</p>
          <a href={business.phoneHref} className="drawer__phone-link">
            <IconPhone size={18} />
            {business.phone}
          </a>
        </div>

        {/* Background decorative orbs */}
        <div className="drawer__orb drawer__orb--a" />
        <div className="drawer__orb drawer__orb--b" />
      </aside>
    </>
  );
}
