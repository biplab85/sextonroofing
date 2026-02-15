'use client';

import { gallery } from '@/data/content';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { useScrollRevealGroup } from '@/hooks/useScrollReveal';

export default function GalleryPreview() {
  const groupRef = useScrollRevealGroup();
  const projects = gallery.projects.slice(0, 6);

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
        <SectionHeader badge="Gallery" title={gallery.sectionTitle} subtitle={gallery.sectionSubtitle} variant="dark" />

        <div className="gallery-preview__grid" ref={groupRef}>
          {projects.map((project, i) => (
            <div key={i} className="gallery-preview__item reveal-stagger">
              <img
                src={project.after.src}
                alt={project.after.alt}
                loading="lazy"
              />
              <div className="gallery-preview__overlay">
                <div className="gallery-preview__item-title">{project.title}</div>
                <div className="gallery-preview__item-location">{project.location}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-preview__cta">
          <Button href="#gallery" variant="secondary" size="lg">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
