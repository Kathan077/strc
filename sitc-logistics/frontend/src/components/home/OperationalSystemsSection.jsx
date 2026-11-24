'use client';

import React from 'react';
import {
  ArrowRight,
  ArrowDown,
} from 'lucide-react';
import './OperationalSystemsSection.css';

const PROCESS_STEPS = [
  {
    id: 'step-1',
    number: '01',
    bayId: 'BAY-01',
    category: 'CONSIGNMENT BOOKING',
    title: 'Freight Requirement & Vehicle Allocation',
    description:
      'Consignor shares cargo specifications; we allocate dedicated fleet vehicles (FTL, PTL, or trailers) with prompt dispatch scheduling.',
    deliverable: 'Dedicated vehicle allocation & confirmed reporting schedule',
    icon: 'ClipboardCheck',
  },
  {
    id: 'step-2',
    number: '02',
    bayId: 'BAY-02',
    category: 'LOADING & COMPLIANCE',
    title: 'Dock Loading, Securing & Documentation',
    description:
      'Supervised dock loading with industrial lashing, weight distribution, weather-proof sealing, and full E-Way bill & LR compliance.',
    deliverable: 'Zero-damage lashing & verified transit documentation',
    icon: 'Boxes',
  },
  {
    id: 'step-3',
    number: '03',
    bayId: 'BAY-03',
    category: 'HIGHWAY TRANSIT',
    title: 'Dedicated Corridor Transit & GPS Tracking',
    description:
      'Direct point-to-point transit via key industrial corridors with zero mid-route transshipment and continuous 24/7 route tracking.',
    deliverable: 'Direct corridor linehaul with 24/7 route tracking',
    icon: 'Truck',
  },
  {
    id: 'step-4',
    number: '04',
    bayId: 'BAY-04',
    category: 'DESTINATION DELIVERY',
    title: 'Safe Dock Handover & Signed POD',
    description:
      'Supervised dock arrival and cargo verification in receiver presence, followed by prompt signed Proof of Delivery (e-POD).',
    deliverable: 'Verified dock handover & prompt signed POD confirmation',
    icon: 'FileCheck2',
  },
];

function OperationalSystemsSection({ data }) {
  const kicker = data?.kicker || 'HOW WE WORK • TRANSPARENT LOGISTICS PROCESS';
  const title = data?.title || 'Our Step-by-Step Freight & Transportation Process';
  const subtitle =
    data?.subtitle ||
    'From initial vehicle allocation to dock handover, every consignment moves through an accountable, verified operational workflow built on two decades of Gujarat linehaul excellence.';

  // Map incoming stages if provided
  const steps = (data?.stages && data.stages.length > 0)
    ? data.stages.map((stg, i) => ({
        id: stg.id || `step-${i + 1}`,
        number: stg.number || `0${i + 1}`,
        bayId: `BAY-0${i + 1}`,
        category: stg.stepTag || stg.category || PROCESS_STEPS[i]?.category || `STEP 0${i + 1}`,
        title: stg.title || PROCESS_STEPS[i]?.title,
        description: stg.description || PROCESS_STEPS[i]?.description,
        deliverable: stg.highlight || PROCESS_STEPS[i]?.deliverable,
        icon: stg.icon || PROCESS_STEPS[i]?.icon || 'ClipboardCheck',
      }))
    : PROCESS_STEPS;

  return (
    <section
      id="operational-systems"
      className="srtc-process-section"
      aria-label="Our Step-by-Step Logistics Process"
    >
      {/* Subtle Warm Ambient Glows (Zero Grid / Zero Lines) */}
      <div className="srtc-process-glow srtc-process-glow--gold" aria-hidden="true" />
      <div className="srtc-process-glow srtc-process-glow--navy" aria-hidden="true" />

      <div className="srtc-process-container">
        {/* Section Header */}
        <header className="srtc-process-header">
          <h2 className="srtc-process-title">{title}</h2>
          <p className="srtc-process-subtitle">{subtitle}</p>
        </header>

        {/* 4 Step Process Cards Flow: Container & Truck Bays */}
        <div className="srtc-process-flow">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;

            return (
              <React.Fragment key={step.id || idx}>
                <article className="srtc-step-box srtc-container-truck-card">
                  {/* Container 4 Corner Castings (ISO Twist-Lock Plates) */}
                  <span className="srtc-casting srtc-casting--tl" aria-hidden="true" />
                  <span className="srtc-casting srtc-casting--tr" aria-hidden="true" />
                  <span className="srtc-casting srtc-casting--bl" aria-hidden="true" />
                  <span className="srtc-casting srtc-casting--br" aria-hidden="true" />

                  {/* Vertical Container Door Lock-Rod Bar Accent */}
                  <div className="srtc-container-lockbar" aria-hidden="true">
                    <div className="srtc-container-lockbar__bracket srtc-container-lockbar__bracket--top" />
                    <div className="srtc-container-lockbar__rod" />
                    <div className="srtc-container-lockbar__cam" />
                    <div className="srtc-container-lockbar__bracket srtc-container-lockbar__bracket--bottom" />
                  </div>

                  {/* Card Main Body Content */}
                  <div className="srtc-container-content">
                    {/* Step Category Tag */}
                    <span className="srtc-step-box__category">{step.category}</span>

                    {/* Title & Description */}
                    <h3 className="srtc-step-box__title">{step.title}</h3>
                    <p className="srtc-step-box__desc">{step.description}</p>

                    {/* Grounded Key Deliverable Output Box */}
                    <div className="srtc-step-box__deliverable">
                      <div className="srtc-deliverable-head">
                        <span className="srtc-deliverable-label">KEY OUTPUT</span>
                        <span className="srtc-deliverable-status">VERIFIED</span>
                      </div>
                      <span className="srtc-deliverable-val">{step.deliverable}</span>
                    </div>
                  </div>
                </article>

                {/* Heavy-Duty Trailer Coupler / Highway Connector Between Steps */}
                {!isLast && (
                  <div className="srtc-step-connector" aria-hidden="true">
                    <div className="srtc-step-connector__line" />
                    <div className="srtc-step-connector__arrow" title="Next Linehaul Sequence">
                      <ArrowRight size={16} className="srtc-arrow--desktop" />
                      <ArrowDown size={16} className="srtc-arrow--mobile" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default React.memo(OperationalSystemsSection);
