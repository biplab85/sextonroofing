'use client';

import { gallery } from '@/data/content';
import SectionHeader from '@/components/ui/SectionHeader';
import { useScrollRevealGroup } from '@/hooks/useScrollReveal';

export default function GalleryPreview() {
  const groupRef = useScrollRevealGroup();

  return (
    <section className="gallery-section" id="gallery">
      {/* ── Background layers ── */}
      <div className="gallery-section__bg">
        <div className="gallery-section__bg-base" />
        <div className="gallery-section__orb gallery-section__orb--a" />
        <div className="gallery-section__orb gallery-section__orb--b" />
        <svg className="gallery-section__mesh" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="galleryMesh" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#galleryMesh)" />
        </svg>
      </div>

      <div className="container gallery-section__content">
        <SectionHeader badge="Our Work" title={gallery.sectionTitle} subtitle={gallery.sectionSubtitle} variant="dark" />

        <div className="gallery-preview__grid" ref={groupRef}>
          {gallery.projects.map((project) => (
            <div key={project.title} className="gallery-preview__item reveal-stagger">
              {/* Safari browser chrome */}
              <div className="gallery-preview__chrome">
                <div className="gallery-preview__dots">
                  <span className="gallery-preview__dot gallery-preview__dot--red" />
                  <span className="gallery-preview__dot gallery-preview__dot--yellow" />
                  <span className="gallery-preview__dot gallery-preview__dot--green" />
                </div>
                <div className="gallery-preview__url-bar">
                  <svg className="gallery-preview__lock" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <span className="gallery-preview__url-text">sextonroofing.com</span>
                </div>
              </div>

              {/* Card viewport */}
              <div className="gallery-preview__viewport">
                <div className="gallery-preview__img-wrap">
                  <img
                    src={project.src}
                    alt={project.alt}
                    loading="lazy"
                  />
                </div>
                <div className="gallery-preview__overlay">
                  <span className="gallery-preview__tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </span>
                  <div className="gallery-preview__info">
                    <h3 className="gallery-preview__item-title">{project.title}</h3>
                    <span className="gallery-preview__title-line" />
                    <p className="gallery-preview__item-desc">{project.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
