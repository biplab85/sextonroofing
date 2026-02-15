'use client';

import { serviceArea } from '@/data/content';
import SectionHeader from '@/components/ui/SectionHeader';
import { IconMap } from '@/components/ui/Icons';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ServiceArea() {
  const ref = useScrollReveal();

  return (
    <section className="section section--alt service-area">
      <div className="container">
        <SectionHeader title={serviceArea.sectionTitle} subtitle={serviceArea.sectionSubtitle} />

        <div className="service-area__content reveal" ref={ref}>
          {/* Map placeholder — replace with real map integration */}
          <div className="service-area__map-placeholder">
            <IconMap size={48} />
            <span>Interactive map will be displayed here<br />Hampshire, Franklin &amp; Hampden Counties</span>
          </div>

          {/* County / Town Lists */}
          <div className="service-area__counties">
            {serviceArea.counties.map((county) => (
              <div key={county.name} className="service-area__county">
                <div className="service-area__county-name">{county.name}</div>
                <div className="service-area__county-towns">
                  {county.towns.map((town) => (
                    <span key={town} className="service-area__county-town">
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
