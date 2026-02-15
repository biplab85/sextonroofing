'use client';

import { serviceArea } from '@/data/content';
import SectionHeader from '@/components/ui/SectionHeader';
import ServiceAreaMap from './ServiceAreaMap';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ServiceArea() {
  const ref = useScrollReveal();

  return (
    <section className="coverage-section" id="coverage">
      {/* ── Background layers ── */}
      <div className="coverage-section__bg">
        <div className="coverage-section__bg-base" />
        <div className="coverage-section__orb coverage-section__orb--a" />
        <div className="coverage-section__orb coverage-section__orb--b" />
        <svg className="coverage-section__mesh" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="coverageMesh" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#coverageMesh)" />
        </svg>
      </div>

      <div className="container coverage-section__content">
        <SectionHeader badge="Coverage" title={serviceArea.sectionTitle} subtitle={serviceArea.sectionSubtitle} variant="dark" />

        <div className="service-area__content reveal" ref={ref}>
          {/* Animated SVG Map */}
          <ServiceAreaMap />

          {/* County / Town Lists */}
          <div className="service-area__counties">
            {serviceArea.counties.map((county) => (
              <div key={county.name} className="service-area__county">
                <div className="service-area__county-name service-area__county-name--dark">{county.name}</div>
                <div className="service-area__county-towns">
                  {county.towns.map((town) => (
                    <span key={town} className="service-area__county-town service-area__county-town--dark">
                      {town}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
