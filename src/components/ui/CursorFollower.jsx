'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const hovering = useRef(false);
  const clicking = useRef(false);
  const rafId = useRef(null);

  const animate = useCallback(() => {
    // Smooth lag for the outer ring (lerp)
    ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
    ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;

    if (dotRef.current) {
      dotRef.current.style.transform =
        `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${clicking.current ? 0.6 : 1})`;
    }

    if (ringRef.current) {
      const scale = hovering.current ? 1.8 : clicking.current ? 0.8 : 1;
      ringRef.current.style.transform =
        `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${scale})`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Skip on touch devices
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      if (!visible.current) {
        visible.current = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const onMouseEnter = () => {
      visible.current = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const onMouseLeave = () => {
      visible.current = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMouseDown = () => {
      clicking.current = true;
      dot.classList.add('cursor-dot--click');
      ring.classList.add('cursor-ring--click');
    };

    const onMouseUp = () => {
      clicking.current = false;
      dot.classList.remove('cursor-dot--click');
      ring.classList.remove('cursor-ring--click');
    };

    // Detect hovering over interactive elements
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, select, textarea, .btn, .swiper-button-next, .swiper-button-prev');
      if (target) {
        hovering.current = true;
        dot.classList.add('cursor-dot--hover');
        ring.classList.add('cursor-ring--hover');
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, select, textarea, .btn, .swiper-button-next, .swiper-button-prev');
      if (target) {
        hovering.current = false;
        dot.classList.remove('cursor-dot--hover');
        ring.classList.remove('cursor-ring--hover');
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    // Start animation loop
    rafId.current = requestAnimationFrame(animate);

    // Enable cursor-active class on body to hide default cursor
    document.body.classList.add('cursor-active');

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.body.classList.remove('cursor-active');
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
