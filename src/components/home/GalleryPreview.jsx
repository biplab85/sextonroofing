'use client';

import { gallery } from '@/data/content';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { useScrollRevealGroup } from '@/hooks/useScrollReveal';

export default function GalleryPreview() {
  const groupRef = useScrollRevealGroup();
  // Show first 6 projects (after images)
  const projects = gallery.projects.slice(0, 6);

  return (
    <section className="section gallery-preview">
      <div className="container">
        <SectionHeader title={gallery.sectionTitle} subtitle={gallery.sectionSubtitle} />

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
          <Button href="/gallery" variant="secondary" size="lg">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
