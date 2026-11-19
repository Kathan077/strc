'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Truck,
  Maximize2,
  Weight,
  ShieldCheck,
  Radio,
  Lock,
  ArrowRight,
  Check,
  Info,
} from 'lucide-react';
import './ServicesFleetSpecSection.css';

export default function ServicesFleetSpecSection() {
  const fleetSpecs = [
    {
      id: 'sxl-32',
      name: '32 Ft Single Axle (SXL)',
      category: 'MEDIUM LINEHAUL',
      payload: '7.5 – 9.0 Metric Tons',
      volume: '1,850 Cu. Ft',
      dimensions: '32′ (L) × 8.0′ (W) × 8.5′ (H)',
      axleConfig: '4×2 Single Rear Axle (6 Wheeler)',
      image: '/images/services/srtc-brochure-container-truck.png',
      imageCaption: 'SRTC 32ft Linehaul Container Truck on Highway Corridor',
      bestFor: 'FMCG, D2C Retail Distribution, Packaged Consumer Goods, Light Industrial',
      features: [
        'Weather-tight corrugated aluminum & steel composite body',
        'Direct dock-level rear loading height',
        'Real-time GPS telematics with speed limiter integration',
        'Electronic security bolt seals on container doors',
      ],
      specsList: [
        { label: 'Length', val: '32 Feet (9.75 m)' },
        { label: 'Internal Width', val: '8.0 Feet (2.44 m)' },
        { label: 'Internal Height', val: '8.5 Feet (2.59 m)' },
        { label: 'Gross Vehicle Wt', val: '18,500 Kg' },
        { label: 'Locking Mechanism', val: 'High-Tensile Cam Lock Bars' },
      ],
    },
    {
      id: 'mxl-32',
      name: '32 Ft Multi Axle (MXL)',
      category: 'HEAVY INDUSTRIAL LINEHAUL',
      payload: '14.0 – 18.0 Metric Tons',
      volume: '1,980 Cu. Ft',
      dimensions: '32′ (L) × 8.2′ (W) × 9.0′ (H)',
      axleConfig: '6×2 / 8×2 Tandem Multi-Axle (10–12 Wheeler)',
      image: '/images/services/srtc-brochure-warehouse-truck.png',
      imageCaption: 'SRTC 32ft MXL Container Truck at Industrial Warehouse Hub',
      bestFor: 'Polymer Pellets, Petrochemical Resins, Flour/Besan, Packaging Material',
      features: [
        'Reinforced heavy-duty floor rated for forklift entry',
        'Contamination-free interior sealed for food & polymers',
        'AIS-140 certified GPS telematics & panic button system',
        'Reinforced chassis engineered for high GVW highway stability',
      ],
      specsList: [
        { label: 'Length', val: '32 Feet (9.75 m)' },
        { label: 'Internal Width', val: '8.2 Feet (2.50 m)' },
        { label: 'Internal Height', val: '9.0 Feet (2.74 m)' },
        { label: 'Gross Vehicle Wt', val: '28,000 to 35,000 Kg' },
        { label: 'Locking Mechanism', val: 'Double Stamped Cam Locks + E-Lock' },
      ],
      isPopular: true,
    },
    {
      id: 'hc-40',
      name: '40 Ft High Cube (HC) Intermodal',
      category: 'MAX-CUBIC HEAVY LINEHAUL',
      payload: '24.0 – 28.0 Metric Tons',
      volume: '2,690 Cu. Ft',
      dimensions: '40′ (L) × 8.0′ (W) × 9.6′ (H)',
      axleConfig: '3-Axle Skeletal Trailer with Prime Mover (18–22 Wheeler)',
      image: '/images/services/srtc-brochure-container-truck.png',
      imageCaption: 'SRTC 40ft High Cube Container Tractor-Trailer Unit',
      bestFor: 'Bulk Polymers, Port Evacuation, Automotive Assemblies, Export Freight',
      features: [
        'Extra 1-foot vertical clearance for max volumetric loading',
        'Direct ISO container corner casting lock on chassis',
        'Zero mid-route transshipment straight to factory gate',
        'Dual driver relay system for 24/7 non-stop linehaul',
      ],
      specsList: [
        { label: 'Length', val: '40 Feet (12.19 m)' },
        { label: 'Internal Width', val: '8.0 Feet (2.44 m)' },
        { label: 'Internal Height', val: '9.6 Feet (2.90 m)' },
        { label: 'Gross Vehicle Wt', val: '40,000 to 49,000 Kg' },
        { label: 'Locking Mechanism', val: 'Twistlock Pins + Tamper-Evident RFID Seal' },
      ],
    },
    {
      id: 'flatbed-heavy',
      name: 'Heavy Multi-Axle Flatbed / Lowbed',
      category: 'PROJECT & OVER-DIMENSIONAL (ODC)',
      payload: '35.0 – 45+ Metric Tons',
      volume: 'Open Deck / High Cleared',
      dimensions: '40′ to 55′ (L) × 8.5′ (W) Low Deck',
      axleConfig: 'Multi-Axle Hydraulic Puller & Steerable Bogie',
      image: '/images/services/service-truck-5.jpg',
      imageCaption: 'SRTC Heavy Project Freight & Hydraulic Lowbed Deployment',
      bestFor: 'Plant Machinery, Fabricated Steel, Power Transformers, Heavy Equipment',
      features: [
        'Low ground clearance for high center-of-gravity loads',
        'High-tensile Grade 80 chain binders and ratchets',
        'Route survey and pilot vehicle escort coordination',
        'Heavy-duty hydraulic suspension for sensitive equipment',
      ],
      specsList: [
        { label: 'Platform Length', val: '40 to 55 Feet Expandable' },
        { label: 'Deck Height', val: '2.5 to 3.2 Feet from Road' },
        { label: 'Rated Capacity', val: 'Up to 45+ Metric Tons' },
        { label: 'Gross Vehicle Wt', val: 'Up to 55,000 Kg' },
        { label: 'Security System', val: 'Special ODC Transit Transit Permits' },
      ],
    },
    {
      id: 'reefer-cold',
      name: 'Insulated Reefer Container',
      category: 'TEMPERATURE CONTROLLED (COLD CHAIN)',
      payload: '10.0 – 16.0 Metric Tons',
      volume: '1,650 Cu. Ft',
      dimensions: '24′ to 32′ (L) × 7.8′ (W) × 8.2′ (H)',
      axleConfig: 'Dedicated Reefer Chassis with Microprocessor Chiller',
      image: '/images/services/service-truck-4.jpg',
      imageCaption: 'SRTC Climate-Controlled Active Refrigerated Container',
      bestFor: 'Pharmaceutical Formulations, Vaccines, Dairy Products, Frozen Agro Goods',
      features: [
        'Active temperature range: -25°C to +25°C with micro-tuning',
        'Continuous remote telematics temperature datalogging',
        'Pre-cooling protocols before cargo dock stuffing',
        'Backup generator and fail-safe power switchover',
      ],
      specsList: [
        { label: 'Temp Capability', val: '-25°C to +25°C Microprocessor' },
        { label: 'Insulation', val: 'Polyurethane Foam Core 100mm' },
        { label: 'Internal Volume', val: '1,650 Cu. Ft' },
        { label: 'Real-time Telemetry', val: 'Live Probe Sensors with Alert API' },
        { label: 'Certifications', val: 'GDP Validated Pharma Clean Room' },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(fleetSpecs[1].id);
  const activeVehicle = fleetSpecs.find((v) => v.id === activeTab) || fleetSpecs[0];

  return (
    <section className="srtc-fleet-specs-section" aria-label="Truck and Container Specifications">
      <div className="srtc-specs-container">
        {/* Section Header */}
        <div className="srtc-specs-header">
          <div className="srtc-specs-kicker">
            <Truck size={14} className="srtc-specs-kicker-icon" />
            <span>FLEET ARCHITECTURE // TRUCK &amp; CONTAINER SPECIFICATIONS</span>
          </div>

          <h2 className="srtc-specs-title">
            Commercial Fleet &amp;{' '}
            <span className="srtc-specs-title-gold">Container Spec Matrix</span>
          </h2>

          <p className="srtc-specs-subtitle">
            Explore payload capacities, volumetric dimensions, and security standards for SRTC’s
            heavy commercial container fleet. Designed to match your industry’s dispatch volume with
            maximum highway efficiency.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="srtc-specs-tabs-wrap">
          <div className="srtc-specs-tabs-list" role="tablist">
            {fleetSpecs.map((vehicle) => (
              <button
                key={vehicle.id}
                role="tab"
                aria-selected={activeTab === vehicle.id}
                onClick={() => setActiveTab(vehicle.id)}
                className={`srtc-specs-tab-btn ${
                  activeTab === vehicle.id ? 'srtc-specs-tab-btn--active' : ''
                }`}
              >
                <span className="srtc-specs-tab-name">{vehicle.name}</span>
                {vehicle.isPopular && <span className="srtc-specs-tab-badge">POPULAR</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Detail Card Display */}
        <div className="srtc-specs-display-panel">
          {/* Left Column: Visual Truck & Container Image Frame */}
          <div className="srtc-specs-visual-col">
            <div className="srtc-specs-img-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeVehicle.image}
                alt={activeVehicle.name}
                className="srtc-specs-vehicle-img"
              />
              <div className="srtc-specs-img-gradient" />

              {/* Category Stencil Tag */}
              <div className="srtc-specs-img-badge">
                <Radio size={12} className="srtc-specs-live-icon" />
                <span>{activeVehicle.category}</span>
              </div>

              {/* Caption Overlay */}
              <div className="srtc-specs-caption-box">
                <p>{activeVehicle.imageCaption}</p>
              </div>
            </div>

            {/* Quick 3-Metric Bar */}
            <div className="srtc-specs-quick-metrics">
              <div className="srtc-specs-metric-item">
                <Weight size={18} className="srtc-specs-m-icon" />
                <div className="srtc-specs-m-text">
                  <span className="srtc-specs-m-lbl">MAX PAYLOAD</span>
                  <span className="srtc-specs-m-val">{activeVehicle.payload}</span>
                </div>
              </div>

              <div className="srtc-specs-metric-item">
                <Maximize2 size={18} className="srtc-specs-m-icon" />
                <div className="srtc-specs-m-text">
                  <span className="srtc-specs-m-lbl">TOTAL VOLUME</span>
                  <span className="srtc-specs-m-val">{activeVehicle.volume}</span>
                </div>
              </div>

              <div className="srtc-specs-metric-item">
                <ShieldCheck size={18} className="srtc-specs-m-icon" />
                <div className="srtc-specs-m-text">
                  <span className="srtc-specs-m-lbl">AXLE CONFIG</span>
                  <span className="srtc-specs-m-val">{activeVehicle.axleConfig}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Specifications & Feature Capabilities */}
          <div className="srtc-specs-info-col">
            <div className="srtc-specs-info-head">
              <span className="srtc-specs-info-category">{activeVehicle.category}</span>
              <h3 className="srtc-specs-info-title">{activeVehicle.name}</h3>
              <p className="srtc-specs-bestfor">
                <strong>Best Suited For:</strong> {activeVehicle.bestFor}
              </p>
            </div>

            {/* Technical Dimensional Spec Table */}
            <div className="srtc-specs-table-box">
              <h4 className="srtc-specs-table-title">ENGINEERING SPECIFICATIONS</h4>
              <div className="srtc-specs-table">
                {activeVehicle.specsList.map((row, idx) => (
                  <div key={idx} className="srtc-specs-table-row">
                    <span className="srtc-specs-col-label">{row.label}</span>
                    <span className="srtc-specs-col-val">{row.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Features */}
            <div className="srtc-specs-features-box">
              <h4 className="srtc-specs-table-title">TRANSIT &amp; SECURITY PROTOCOLS</h4>
              <ul className="srtc-specs-features-list">
                {activeVehicle.features.map((feat, fIdx) => (
                  <li key={fIdx} className="srtc-specs-feature-item">
                    <Check size={16} className="srtc-specs-check-icon" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Booking Trigger */}
            <div className="srtc-specs-cta-box">
              <Link href="/quote" className="srtc-specs-book-btn">
                <span>Book This Container Specification</span>
                <ArrowRight size={16} />
              </Link>

              <div className="srtc-specs-guarantee-note">
                <Info size={14} className="srtc-specs-info-icon" />
                <span>100% Insured Freight // Zero Transshipment Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

