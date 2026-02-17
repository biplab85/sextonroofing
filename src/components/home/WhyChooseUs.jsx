'use client';

import Image from 'next/image';
import { whyChooseUs } from '@/data/content';
import SectionHeader from '@/components/ui/SectionHeader';
import { useScrollRevealGroup } from '@/hooks/useScrollReveal';

export default function WhyChooseUs() {
  const groupRef = useScrollRevealGroup();

  return (
    <section className="why-section" id="about">
      {/* ── Background layers ── */}
      <div className="why-section__bg">
        <div className="why-section__bg-base" />
        <div className="why-section__orb why-section__orb--a" />
        <div className="why-section__orb why-section__orb--b" />
        <svg className="why-section__mesh" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="whyMesh" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#whyMesh)" />
        </svg>
      </div>

      <div className="container why-section__content">
        <SectionHeader badge="Why Us" title={whyChooseUs.sectionTitle} subtitle={whyChooseUs.sectionSubtitle} variant="dark" />

        <div className="why-section__grid" ref={groupRef}>
          {whyChooseUs.items.map((item) => (
            <div key={item.title} className="feature-card reveal-stagger">
              <div className="feature-card__image">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
              <h3 className="feature-card__title">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
