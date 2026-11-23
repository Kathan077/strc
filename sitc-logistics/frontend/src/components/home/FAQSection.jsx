'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import './FAQSection.css';

const DEFAULT_FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'Which routes and industrial regions does SRTC primarily serve?',
    answer:
      'We provide direct point-to-point Full Truck Load (FTL) and Part Truck Load (PTL) transportation across Gujarat, Maharashtra, Rajasthan, and key regional industrial corridors connecting major manufacturing hubs, ICDs, and warehouses.',
    category: 'Routes & Network',
  },
  {
    id: 'faq-2',
    question: 'What types of commercial vehicles and container sizes are available?',
    answer:
      'Our fleet includes 20ft, 32ft, and 40ft closed containers, heavy multi-axle trailers, and open trucks suitable for industrial machinery, FMCG, chemicals, polymers, and commercial goods.',
    category: 'Fleet & Capacity',
  },
  {
    id: 'faq-3',
    question: 'How do you ensure cargo safety and damage prevention during transit?',
    answer:
      'Consignments are loaded under trained dock supervision with industrial strapping, lashing, and weather-proof container sealing. Shipments move directly via verified long-haul drivers with no mid-route transshipment.',
    category: 'Cargo Safety',
  },
  {
    id: 'faq-4',
    question: 'How can shippers track consignment status during transit?',
    answer:
      'All fleet vehicles are GPS-equipped. Our 24/7 central dispatch desk provides regular milestone updates and location confirmation directly via phone and WhatsApp.',
    category: 'Transit Tracking',
  },
  {
    id: 'faq-5',
    question: 'What is the procedure for Bilty (LR) and Proof of Delivery (POD)?',
    answer:
      'We issue verified Bilty (LR) and E-Way bills at dispatch. Upon destination dock unloading, duly signed physical and digital Proof of Delivery (POD) are handed over promptly.',
    category: 'Documentation & POD',
  },
];

function FAQSection({ data }) {
  const [openIndex, setOpenIndex] = useState(0);

  const title = data?.title || 'Commercial Freight & Logistics FAQs';
  const subtitle =
    data?.subtitle ||
    'Key answers to common questions about freight booking, fleet availability, cargo safety, and transit tracking.';

  const rawItems = data?.items && data.items.length > 0 ? data.items : DEFAULT_FAQ_ITEMS;
  // If raw items still contain the old fake SLA questions, replace with our grounded realistic questions
  const items =
    rawItems.length > 0 &&
    !rawItems.some((it) => it.question?.includes('turnaround SLA') || it.question?.includes('green corridors'))
      ? rawItems
      : DEFAULT_FAQ_ITEMS;

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="freight-faq"
      className="srtc-faq-section"
      data-section-name="FREQUENTLY ASKED QUESTIONS"
      aria-label="Frequently Asked Questions - Commercial Freight & Logistics"
    >
      {/* Soft Ambient Depth Glows */}
      <div className="srtc-faq-ambient srtc-faq-ambient--left" aria-hidden="true" />
      <div className="srtc-faq-ambient srtc-faq-ambient--right" aria-hidden="true" />

      <div className="srtc-faq-container">
        {/* ===================================================================
            1. SECTION HEADER: Clean H2 Heading & Subtitle
            =================================================================== */}
        <div className="srtc-faq-header">
          <h2 className="srtc-faq-heading">{title}</h2>
          <p className="srtc-faq-lead">{subtitle}</p>
        </div>

        {/* ===================================================================
            2. CLEAN CORPORATE ACCORDION GRID
            =================================================================== */}
        <div className="srtc-faq-accordion" role="region" aria-label="Freight Questions Accordion">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.id || idx}
                className={`srtc-faq-card ${isOpen ? 'is-open' : ''}`}
              >
                {/* Question Trigger Button */}
                <button
                  type="button"
                  className="srtc-faq-trigger"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <div className="srtc-faq-trigger-left">
                    {item.category && (
                      <span className="srtc-faq-category-tag">{item.category}</span>
                    )}
                    <h3 className="srtc-faq-question-text">{item.question}</h3>
                  </div>

                  <div className="srtc-faq-trigger-right">
                    <div className={`srtc-faq-chevron-wrap ${isOpen ? 'is-rotated' : ''}`}>
                      <ChevronDown size={18} className="srtc-faq-chevron" />
                    </div>
                  </div>
                </button>

                {/* Answer Accordion Expand */}
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className={`srtc-faq-collapse ${isOpen ? 'is-expanded' : ''}`}
                >
                  <div className="srtc-faq-interior">
                    <div className="srtc-faq-guide-line" />

                    <div className="srtc-faq-interior-content">
                      <p className="srtc-faq-answer-text">{item.answer}</p>

                      <div className="srtc-faq-bay-footer">
                        <span className="srtc-faq-verified-tag">
                          Verified Regional Linehaul Standard
                        </span>

                        <Link href="/contact" className="srtc-faq-bay-cta">
                          <span>Ask Dispatch Team</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===================================================================
            3. BOTTOM FLEET CAPACITY DISPATCH CALLOUT
            =================================================================== */}
       
      </div>
    </section>
  );
}

export default React.memo(FAQSection);
