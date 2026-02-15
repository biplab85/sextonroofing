'use client';

import { useState } from 'react';
import Link from 'next/link';
import { business, navigation, footer as footerContent, serviceArea } from '@/data/content';
import {
  IconPhone, IconMail, IconMapPin, IconClock,
  IconFacebook, IconInstagram, IconLinkedIn,
  IconPlus, IconMinus,
} from '@/components/ui/Icons';

const linkGroups = [
  {
    sections: [
      {
        title: 'Services',
        links: [
          { label: 'Roofing', href: '/services/roofing' },
          { label: 'Siding', href: '/services/siding' },
          { label: 'Windows', href: '/services/windows' },
          { label: 'Doors', href: '/services/doors' },
        ],
      },
      {
        title: 'How It Works',
        links: [
          { label: 'Free Estimate', href: '#contact' },
          { label: 'On-Site Inspection', href: '#contact' },
          { label: 'Installation', href: '#contact' },
          { label: 'Final Walkthrough', href: '#contact' },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: 'Company',
        links: [
          { label: 'About Us', href: '/about' },
          { label: 'Gallery', href: '/gallery' },
          { label: 'Reviews', href: '/reviews' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        title: 'Service Area',
        links: serviceArea.counties.map((c) => ({
          label: c.name,
          href: '#service-area',
        })),
      },
    ],
  },
  {
    sections: [
      {
        title: 'FAQ',
        links: [
          { label: 'Roof Replacement', href: '#faq' },
          { label: 'Free Estimates', href: '#faq' },
          { label: 'Materials', href: '#faq' },
          { label: 'Warranties', href: '#faq' },
        ],
      },
      {
        title: 'Useful Links',
        links: [
          { label: 'Free Estimate', href: '#contact' },
          { label: 'Privacy Policy', href: '/privacy' },
        ],
      },
    ],
  },
];

export default function Footer() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (key) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  // Flatten all sections for mobile accordion
  const allSections = linkGroups.flatMap((g) => g.sections);

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__main">
          {/* Left Column: Brand + Contact */}
          <div className="footer__brand-col">
            <img
              src={navigation.logo.src}
              alt={navigation.logo.alt}
              className="footer__logo"
            />
            <div className="footer__social">
              <a
                href={business.social.facebook}
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-icon footer__social-icon--fb"
              >
                <IconFacebook size={16} />
              </a>
              <a
                href={business.social.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-icon footer__social-icon--ig"
              >
                <IconInstagram size={16} />
              </a>
              <a
                href={business.social.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-icon footer__social-icon--li"
              >
                <IconLinkedIn size={16} />
              </a>
            </div>

            <div className="footer__contact-list">
              <div className="footer__contact-item">
                <IconMapPin size={18} />
                <div>
                  <span>{business.address.street},</span>
                  <span>{business.address.city}, {business.address.state} {business.address.zip}</span>
                </div>
              </div>
              <div className="footer__contact-item">
                <IconPhone size={18} />
                <div>
                  <a href={business.phoneHref}>{business.phone}</a>
                  <span>({business.hours.weekdays})</span>
                </div>
              </div>
              <div className="footer__contact-item">
                <IconMail size={18} />
                <div>
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="footer__divider" />

          {/* Right Zone: Link Columns (Desktop) */}
          <div className="footer__links-zone">
            {linkGroups.map((group, gi) => (
              <div key={gi} className="footer__link-col">
                {group.sections.map((section, si) => (
                  <div key={si} className="footer__link-group">
                    <h4 className="footer__col-title">{section.title}</h4>
                    <ul className="footer__links">
                      {section.links.map((link, li) => (
                        <li key={li}>
                          <Link href={link.href}>{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile Accordion */}
          <div className="footer__accordion">
            {allSections.map((section, idx) => {
              const isOpen = openAccordion === idx;
              return (
                <div key={idx} className="footer__accordion-item">
                  <button
                    className="footer__accordion-trigger"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{section.title}</span>
                    {isOpen ? <IconMinus size={20} /> : <IconPlus size={20} />}
                  </button>
                  <div
                    className="footer__accordion-body"
                    style={{
                      maxHeight: isOpen ? '300px' : '0',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <ul>
                      {section.links.map((link, li) => (
                        <li key={li}>
                          <Link href={link.href}>{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <Link href="#">Terms &amp; Conditions</Link>
            <Link href="#">Our Policy</Link>
          </div>
          <p className="footer__bottom-right">
            {footerContent.legal.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
