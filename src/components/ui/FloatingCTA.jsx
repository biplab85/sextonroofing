'use client';

import { floatingCta } from '@/data/content';
import { IconPhone } from '@/components/ui/Icons';

export default function FloatingCTA() {
  return (
    <div className="floating-cta">
      <a
        href={floatingCta.phoneHref}
        className="floating-cta__button"
        aria-label={floatingCta.ariaLabel}
      >
        <IconPhone size={24} />
      </a>
    </div>
  );
}
