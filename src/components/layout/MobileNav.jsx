'use client';

import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { navigation, business } from '@/data/content';
import { useDrawer } from '@/context/DrawerContext';
import { scrollToSection } from '@/hooks/useScrollSpy';
import { IconPhone } from '@/components/ui/Icons';
import Button from '@/components/ui/Button';

export default function MobileNav({ isOpen, onClose, activeHash }) {
  const { openDrawer } = useDrawer();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = useCallback((e) => {
    scrollToSection(e, 80);
    onClose();
  }, [onClose]);

  return (
    <nav
      className={`mobile-nav ${isOpen ? 'mobile-nav--open' : ''}`}
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
    >
      <div className="mobile-nav__links">
        {navigation.links.map((link) => {
          const isActive = link.href === activeHash;

          return (
            <div key={link.label}>
              <Link
                href={link.href}
                className={`mobile-nav__link ${isActive ? 'mobile-nav__link--active' : ''}`}
                onClick={handleNavClick}
                aria-current={isActive ? 'true' : undefined}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="mobile-nav__sub-links">
                  {link.children.map((child) => (
                    <Link key={child.href} href={child.href} onClick={handleNavClick}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
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
