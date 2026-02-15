'use client';

import { howItWorks } from '@/data/content';
import SectionHeader from '@/components/ui/SectionHeader';
import { useScrollRevealGroup } from '@/hooks/useScrollReveal';

export default function HowItWorks() {
  const groupRef = useScrollRevealGroup();

  return (
    <section className="section how-section">
      <div className="container">
        <SectionHeader title={howItWorks.sectionTitle} subtitle={howItWorks.sectionSubtitle} />

        <div className="how-section__grid" ref={groupRef}>
          {howItWorks.steps.map((step, index) => (
            <div key={step.step} className="step-card reveal-stagger">
              {index < howItWorks.steps.length - 1 && (
                <div className="step-card__connector" />
              )}
              <div className="step-card__number">{step.step}</div>
              <h3 className="step-card__title">{step.title}</h3>
              <p className="step-card__description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
