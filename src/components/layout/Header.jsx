'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navigation, business } from '@/data/content';
import { useScrollHeader } from '@/hooks/useScrollHeader';
import { useDrawer } from '@/context/DrawerContext';
import { IconPhone, IconChevronDown } from '@/components/ui/Icons';
import Button from '@/components/ui/Button';
import MobileNav from './MobileNav';

export default function Header() {
  const scrolled = useScrollHeader(60);
  const { openDrawer } = useDrawer();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner">
          {/* Logo */}
          <Link href="/" className="header__logo">
            <img
              src={navigation.logo.src}
              alt={navigation.logo.alt}
              className="header__logo-img"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="header__nav" aria-label="Main navigation">
            {navigation.links.map((link) =>
              link.children ? (
                <div key={link.label} className="header__dropdown">
                  <Link href={link.href} className="header__link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {link.label}
                    <IconChevronDown size={14} />
                  </Link>
                  <div className="header__dropdown-menu">
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={link.href} href={link.href} className="header__link">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="header__actions">
            <a href={business.phoneHref} className="header__phone">
              <IconPhone size={18} />
              {business.phone}
            </a>

            <Button
              variant="primary"
              size="sm"
              className="header__cta"
              onClick={openDrawer}
            >
              {navigation.cta.label}
            </Button>

            {/* Mobile Hamburger */}
            <button
              className={`header__hamburger ${mobileOpen ? 'header__hamburger--open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
