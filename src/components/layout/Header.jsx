'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navigation, business } from '@/data/content';
import { useScrollHeader } from '@/hooks/useScrollHeader';
import { useScrollSpy, scrollToSection } from '@/hooks/useScrollSpy';
import { useDrawer } from '@/context/DrawerContext';
import { useTheme } from '@/context/ThemeContext';
import { IconPhone, IconArrowRight } from '@/components/ui/Icons';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';
import MobileNav from './MobileNav';

export default function Header() {
  const scrolled = useScrollHeader(60);
  const activeHash = useScrollSpy(80);
  const { openDrawer } = useDrawer();
  const { theme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const logoSrc = theme === 'light' ? '/images/SextonRoofingLogo.svg' : navigation.logo.src;

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner">
          {/* Logo */}
          <Link href="#hero" className="header__logo" onClick={scrollToSection}>
            <img
              src={logoSrc}
              alt={navigation.logo.alt}
              className="header__logo-img"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="header__nav" aria-label="Main navigation">
            {navigation.links.map((link) => {
              const isActive = link.href === activeHash;

              return link.children ? (
                <div key={link.label} className="header__dropdown">
                  <Link
                    href={link.href}
                    className={`header__link ${isActive ? 'header__link--active' : ''}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    onClick={scrollToSection}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    <IconChevronDown size={14} />
                  </Link>
                  <div className="header__dropdown-menu">
                    {link.children.map((child) => (
                      <Link key={child.label} href={child.href} onClick={scrollToSection}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`header__link ${isActive ? 'header__link--active' : ''}`}
                  onClick={scrollToSection}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="header__actions">
            <ThemeToggle />

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
              <IconArrowRight size={16} />
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

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeHash={activeHash}
      />
    </>
  );
}
