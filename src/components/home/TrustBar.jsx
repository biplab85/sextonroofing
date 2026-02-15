'use client';

import { trustBar } from '@/data/content';
import { Icon } from '@/components/ui/Icons';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function TrustBar() {
  const ref = useScrollReveal();

  return (
    <section className="trust-bar">
      <div className="trust-bar__inner reveal" ref={ref}>
        <div className="trust-bar__list">
          {trustBar.items.map((item) => (
            <div key={item.label} className="trust-bar__item">
              <div className="trust-bar__icon">
                <Icon name={item.icon} size={22} />
              </div>
              <div className="trust-bar__text">
                <div className="trust-bar__text-label">{item.label}</div>
                <div className="trust-bar__text-desc">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
