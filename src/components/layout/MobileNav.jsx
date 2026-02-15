'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { navigation, business } from '@/data/content';
import { useDrawer } from '@/context/DrawerContext';
import { IconPhone } from '@/components/ui/Icons';
import Button from '@/components/ui/Button';

export default function MobileNav({ isOpen, onClose }) {
  const { openDrawer } = useDrawer();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <nav
      className={`mobile-nav ${isOpen ? 'mobile-nav--open' : ''}`}
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
    >
      <div className="mobile-nav__links">
        {navigation.links.map((link) => (
          <div key={link.label}>
            <Link href={link.href} className="mobile-nav__link" onClick={onClose}>
              {link.label}
            </Link>
            {link.children && (
              <div className="mobile-nav__sub-links">
                {link.children.map((child) => (
                  <Link key={child.href} href={child.href} onClick={onClose}>
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mobile-nav__bottom">
        <a href={business.phoneHref} className="mobile-nav__phone-link">
          <IconPhone size={22} />
          {business.phone}
        </a>
        <Button
          variant="primary"
          size="full"
          onClick={() => { onClose(); openDrawer(); }}
        >
          {navigation.cta.label}
        </Button>
      </div>
    </nav>
  );
}
