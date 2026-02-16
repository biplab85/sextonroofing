'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Section IDs in PAGE order (top to bottom) that correspond to nav links.
 * Only sections that have a matching nav link are tracked.
 */
const NAV_SECTIONS = ['hero', 'services', 'about', 'video', 'testimonials', 'gallery', 'faq', 'contact'];

/**
 * Scroll-spy hook — returns the hash (e.g. "#services") of the section
 * currently visible in the viewport. Uses rAF-throttled scroll listener.
 */
export function useScrollSpy(offset = 100) {
  const [activeHash, setActiveHash] = useState('#hero');
  const rafRef = useRef(null);

  const detect = useCallback(() => {
    const scrollY = window.scrollY + offset;
    let current = NAV_SECTIONS[0];

    for (const id of NAV_SECTIONS) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) {
        current = id;
      }
    }

    // At the very bottom of the page → activate the last nav section
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      current = NAV_SECTIONS[NAV_SECTIONS.length - 1];
    }

    const hash = `#${current}`;
    setActiveHash((prev) => (prev !== hash ? hash : prev));
  }, [offset]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(detect);
    };

    detect();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [detect]);

  return activeHash;
}

/**
 * Smooth-scroll to a hash-linked section, accounting for fixed header.
 * Call from onClick handlers on navigation links.
 */
export function scrollToSection(e, headerOffset = 80) {
  const href = e.currentTarget.getAttribute('href');
  if (!href || !href.startsWith('#')) return;

  e.preventDefault();
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: 'smooth' });

  // Update URL hash without triggering a scroll jump
  history.pushState(null, '', href);
}
