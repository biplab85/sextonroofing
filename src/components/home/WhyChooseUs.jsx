'use client';

import { whyChooseUs } from '@/data/content';
import SectionHeader from '@/components/ui/SectionHeader';
import { Icon } from '@/components/ui/Icons';
import { useScrollRevealGroup } from '@/hooks/useScrollReveal';

export default function WhyChooseUs() {
  const groupRef = useScrollRevealGroup();

  return (
    <section className="section section--alt why-section">
      <div className="container">
        <SectionHeader title={whyChooseUs.sectionTitle} subtitle={whyChooseUs.sectionSubtitle} />

        <div className="why-section__grid" ref={groupRef}>
          {whyChooseUs.items.map((item) => (
            <div key={item.title} className="feature-card reveal-stagger">
              <div className="feature-card__icon">
                <Icon name={item.icon} size={28} />
              </div>
              <h3 className="feature-card__title">{item.title}</h3>
              <p className="feature-card__description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
