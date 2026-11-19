import React from 'react';
import Link from 'next/link';
import ContactClient from '@/components/contact/ContactClient';
import './contact.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Contact Central Dispatch & Freight Booking | SRTC Logistics',
  description:
    'Direct 24/7 access to SRTC central dispatch controllers. Instant 15-minute rate allocation for 40ft/20ft containers, FTL linehaul, and heavy industrial freight across India.',
  keywords: [
    'Contact SRTC Logistics',
    'Freight Dispatch Phone',
    'Container Booking India',
    'Truckload Rate Quote',
    '24/7 Logistics Helpline',
    'Gujarat Transport Office',
    'Nhava Sheva Mundra Dispatch',
    'Heavy Linehaul Booking',
  ],
  openGraph: {
    title: 'Contact Central Dispatch & Freight Booking | SRTC Logistics',
    description:
      'Direct 24/7 phone hotline, WhatsApp freight desk, and 40ft container dispatch manifest booking for heavy commercial logistics across India.',
    url: 'https://srtclogistics.com/contact',
    siteName: 'SRTC Logistics',
    images: [
      {
        url: '/images/blog/blog-container-expressway.jpg',
        width: 1200,
        height: 675,
        alt: 'SRTC Logistics Central Freight Dispatch',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getContactContent() {
  try {
    const res = await fetch(`${API_BASE}/api/contact`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('[API Fetch Error] Contact endpoint responded with status:', res.status);
      return null;
    }
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error('[API Fetch Error] Backend unreachable:', err.message);
    return null;
  }
}

export default async function ContactPage() {
  const content = await getContactContent();
  const hero = content?.hero;

  // Schema.org Structured Data for Search Engines & Google Rich Results
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'SRTC Logistics Central Dispatch Hub',
    description:
      'Contact SRTC Logistics 24/7 central dispatch for immediate container and trailer allocation across Indian industrial corridors.',
    url: 'https://srtclogistics.com/contact',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Shree Ram Transport Corporation (SRTC Logistics)',
      telephone: content?.vaultPhone?.phone || '+919426646095',
      email: content?.vaultEmail?.email || 'srtcpvtltd09@gmail.com',
      image: 'https://srtclogistics.com/images/logo/srtc-logo.png',
      priceRange: '₹₹₹',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: content?.vaultPhone?.phone || '+91-9426646095',
          contactType: 'customer service',
          availableLanguage: ['English', 'Hindi', 'Gujarati'],
          areaServed: 'IN',
        },
      ],
    },
  };

  return (
    <main className="srtc-contact-page">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      {/* 1. Industrial Header Hero Banner */}
      <header className="srtc-contact-hero">
        <div className="srtc-contact-hero__container">
          <nav className="srtc-contact-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">{hero?.breadcrumbHome || 'HOME'}</Link>
            <span className="srtc-contact-breadcrumb__sep">/</span>
            <span>{hero?.breadcrumbCurrent || 'CENTRAL DISPATCH'}</span>
          </nav>

          <h1 className="srtc-contact-hero__title">
            {hero?.title || 'Connect With'} <span>{hero?.titleSpan || 'Central Dispatch'}</span>
          </h1>

          <p className="srtc-contact-hero__subtitle">
            {hero?.subtitle ||
              'Need immediate container allocation, multi-axle linehaul booking, or corridor rate quotation? Our dispatch managers are on active highway duty 24/7.'}
          </p>
        </div>
      </header>

      {/* 2. Truck & Container Themed Contact & Manifest Hub */}
      <ContactClient data={content} />
    </main>
  );
}
