'use client';

import { useState, useEffect, useRef } from 'react';

export default function VideoSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
      const handleKey = (e) => {
        if (e.key === 'Escape') setModalOpen(false);
      };
      window.addEventListener('keydown', handleKey);
      return () => {
        window.removeEventListener('keydown', handleKey);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [modalOpen]);

  return (
    <>
      <section className="vid-section" id="video">
        {/* Honeycomb pattern overlay */}
        <svg className="vid-section__honeycomb" width="100%" height="100%" aria-hidden="true">
          <defs>
            <pattern id="honeycomb" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
              <path d="M28 66L0 50V16L28 0L56 16V50L28 66Z" fill="none" stroke="rgba(232, 97, 45, 0.5)" strokeWidth="0.5" />
              <path d="M28 166L0 150V116L28 100L56 116V150L28 166Z" fill="none" stroke="rgba(232, 97, 45, 0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#honeycomb)" />
        </svg>

        <div className="vid-section__inner">
          {/* Left: Gradient Title */}
          <div className="vid-section__content">
            <h2 className="vid-section__title">
              <span className="vid-section__title-line vid-section__title-line--1">Life at</span>
              <span className="vid-section__title-line vid-section__title-line--2">Sexton</span>
            </h2>
          </div>

          {/* Right: Video Player Area */}
          <div className="vid-section__player">
            {/* Stacked cascading frames */}
            <div className="vid-section__frame vid-section__frame--1" />
            <div className="vid-section__frame vid-section__frame--2" />
            <div className="vid-section__frame vid-section__frame--3" />

            {/* Green atmospheric glow */}
            <div className="vid-section__glow" />

            {/* Play button with rotating text ring */}
            <button
              className="vid-section__play"
              onClick={() => setModalOpen(true)}
              aria-label="Play video about life at Sexton Roofing"
            >
              {/* Outer ring background */}
              <div className="vid-section__ring-bg" />

              {/* Rotating SVG text */}
              <svg className="vid-section__ring-svg" viewBox="0 0 200 200">
                <defs>
                  <path
                    id="vidCirclePath"
                    d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
                  />
                </defs>
                <text className="vid-section__ring-text">
                  <textPath href="#vidCirclePath" startOffset="0%">
                    Have a look at who we are &bull;&nbsp;&nbsp;&nbsp;&nbsp;Have a look at who we are &bull;
                  </textPath>
                </text>
              </svg>

              {/* Yellow play icon */}
              <div className="vid-section__play-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Video Lightbox Modal */}
      {modalOpen && (
        <div
          className="vid-modal"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
        >
          <button
            className="vid-modal__close"
            onClick={() => setModalOpen(false)}
            aria-label="Close video"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          <div className="vid-modal__wrap" onClick={(e) => e.stopPropagation()}>
            <video
              ref={videoRef}
              src="https://vid.cdn-website.com/315baaa1/videos/EZE1bhIT9KTglMVQV1CA_Sexton+Homepage+Video-v.mp4"
              autoPlay
              controls
              playsInline
              className="vid-modal__video"
            />
          </div>
        </div>
      )}
    </>
  );
}
