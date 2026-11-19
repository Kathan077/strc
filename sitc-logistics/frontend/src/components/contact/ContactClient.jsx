'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Zap,
  ArrowRight,
  Boxes,
  FileCheck2,
  Navigation,
  Building2,
  User,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

/**
 * Industrial Rivet Line (Row of high-tensile steel rivets along container structural beams)
 */
function ContainerRivetLine({ count = 28 }) {
  return (
    <div className="srtc-container-rivet-line" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span key={`rivet-c-${i}`} className="srtc-rivet-head" />
      ))}
    </div>
  );
}

/**
 * CSC Safety Approval Metal Plate for Booking Container
 */
function CscBookingPlate({ config }) {
  const terminalUnit = config?.terminalUnit || 'SRTC-45G1-HC';
  const maxGvw = config?.maxGvw || '42,000 KG';
  const fleetRating = config?.fleetRating || 'EST. 2003 • 23+ YRS';
  const customsStatus = config?.customsStatus || '100% e-WAY SYNC';

  return (
    <div className="srtc-csc-data-plate srtc-csc-data-plate--contact" aria-label="CSC Safety Approval Plate">
      <div className="srtc-csc-header">
        <span>CSC SAFETY APPROVAL</span>
        <span className="srtc-csc-id">IND/SRTC/DISPATCH-2026</span>
      </div>
      <div className="srtc-csc-grid">
        <div className="srtc-csc-cell">
          <span className="srtc-csc-lbl">TERMINAL UNIT</span>
          <span className="srtc-csc-val">{terminalUnit}</span>
        </div>
        <div className="srtc-csc-cell">
          <span className="srtc-csc-lbl">MAX HIGHWAY GVW</span>
          <span className="srtc-csc-val">{maxGvw}</span>
        </div>
        <div className="srtc-csc-cell">
          <span className="srtc-csc-lbl">FLEET RATING</span>
          <span className="srtc-csc-val">{fleetRating}</span>
        </div>
        <div className="srtc-csc-cell">
          <span className="srtc-csc-lbl">CUSTOMS STATUS</span>
          <span className="srtc-csc-val">{customsStatus}</span>
        </div>
      </div>
    </div>
  );
}

export default function ContactClient({ data }) {
  const vaultPhone = data?.vaultPhone;
  const vaultWhatsApp = data?.vaultWhatsApp;
  const vaultEmail = data?.vaultEmail;
  const vaultHubs = data?.vaultHubs;
  const bookingFormConfig = data?.bookingFormConfig;

  const defaultServices = [
    'Full Truck Load (FTL)',
    'Part Truck Load (PTL)',
    'Superfast Cargo & Small Packages',
    'Warehousing & Handling Services',
    'Contract Logistics Solutions',
    'General Inquiry / Rate Advisory',
  ];

  const servicesList =
    bookingFormConfig?.servicesList && bookingFormConfig.servicesList.length > 0
      ? bookingFormConfig.servicesList
      : defaultServices;

  const defaultHubs = [
    'Mundra & Kandla Port',
    'Nhava Sheva (JNPT)',
    'Delhi-NCR Corridor',
    'Pune / Chakan Industrial',
    'Ahmedabad Logistics Hub',
    'Vapi / Surat Chemical Belt',
  ];

  const hubsList =
    vaultHubs?.hubsList && vaultHubs.hubsList.length > 0 ? vaultHubs.hubsList : defaultHubs;

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    serviceType: servicesList[0] || '40ft High-Cube Container',
    pickupLocation: '',
    dropLocation: '',
    weightTons: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [manifestRef, setManifestRef] = useState('849201');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate instant dispatch processing
    setTimeout(() => {
      setManifestRef(String(Math.floor(100000 + Math.random() * 900000)));
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <div className="srtc-contact-universe">
      <div className="srtc-contact-container">
        {/* ====================================================================
            2. TWO-COLUMN INDUSTRIAL LOGISTICS ARCHITECTURE (CONTAINERS ONLY)
            Left Deck: 4 Pro-Level Intermodal Container Vaults
            Right Deck: Master 40ft High-Cube Freight Dispatch Booking Container
            ==================================================================== */}
        <div className="srtc-contact-main-grid">
          {/* ------------------------------------------------------------------
              LEFT COLUMN: 4 CONTAINER DISPATCH VAULTS
              ------------------------------------------------------------------ */}
          <div className="srtc-contact-vaults-col">
            {/* CONTAINER VAULT 1: 24/7 CENTRAL VOICE HOTLINE */}
            <div className="srtc-contact-mini-container">
              {/* 4 Corner Castings */}
              <div className="srtc-iso-casting srtc-iso-tl" aria-hidden="true" />
              <div className="srtc-iso-casting srtc-iso-tr" aria-hidden="true" />
              <div className="srtc-iso-casting srtc-iso-bl" aria-hidden="true" />
              <div className="srtc-iso-casting srtc-iso-br" aria-hidden="true" />

              {/* Top Structural Steel Rail with Rivets */}
              <div className="srtc-container-top-rail srtc-top-rail--compact">
                <ContainerRivetLine count={18} />
              </div>

              {/* Stencil Bar */}
              <div className="srtc-container-stencil-bar srtc-stencil-bar--compact">
                <div className="srtc-stencil-left">
                  <span className="srtc-stencil-dot" />
                  <span className="srtc-stencil-unit">{vaultPhone?.unitCode || 'SRTC-LINE-01'}</span>
                  <span className="srtc-unit-axle-tag">{vaultPhone?.tag || 'VOICE CONTROL'}</span>
                </div>
                <div className="srtc-stencil-right">
                  <span className="srtc-stencil-chevrons" aria-hidden="true">///</span>
                </div>
              </div>

              <div className="srtc-vault-card-body srtc-container-corrugated-wall">
                <div className="srtc-vault-icon-badge">
                  <Phone size={22} className="srtc-vault-icon" />
                </div>
                <div className="srtc-vault-info">
                  <span className="srtc-vault-kicker">{vaultPhone?.kicker || '24/7 CENTRAL DISPATCH HOTLINE'}</span>
                  <a
                    href={vaultPhone?.ctaLink || `tel:${vaultPhone?.phone?.replace(/\s+/g, '') || '+919426646095'}`}
                    className="srtc-vault-headline-link"
                  >
                    {vaultPhone?.phone || '+91 9426646095'}
                  </a>
                  <p className="srtc-vault-desc">
                    {vaultPhone?.description ||
                      'Speak directly with our heavy linehaul controllers. Instant rate quote and vehicle dispatch across 180+ express corridors.'}
                  </p>
                  <a
                    href={vaultPhone?.ctaLink || `tel:${vaultPhone?.phone?.replace(/\s+/g, '') || '+919426646095'}`}
                    className="srtc-vault-cta-btn"
                  >
                    <span>{vaultPhone?.ctaText || 'CALL DISPATCH DESK NOW'}</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Bottom Structural Sill Rail with Rivets */}
              <div className="srtc-container-bottom-rail srtc-bottom-rail--compact">
                <div className="srtc-container-hazard-strip srtc-hazard-strip--compact" aria-hidden="true" />
                <ContainerRivetLine count={18} />
              </div>
            </div>

            {/* CONTAINER VAULT 2: INSTANT WHATSAPP FREIGHT DISPATCH */}
            <div className="srtc-contact-mini-container">
              <div className="srtc-iso-casting srtc-iso-tl" aria-hidden="true" />
              <div className="srtc-iso-casting srtc-iso-tr" aria-hidden="true" />
              <div className="srtc-iso-casting srtc-iso-bl" aria-hidden="true" />
              <div className="srtc-iso-casting srtc-iso-br" aria-hidden="true" />

              <div className="srtc-container-top-rail srtc-top-rail--compact">
                <ContainerRivetLine count={18} />
              </div>

              <div className="srtc-container-stencil-bar srtc-stencil-bar--compact">
                <div className="srtc-stencil-left">
                  <span className="srtc-stencil-dot" />
                  <span className="srtc-stencil-unit">{vaultWhatsApp?.unitCode || 'SRTC-LINE-02'}</span>
                  <span className="srtc-unit-axle-tag">{vaultWhatsApp?.tag || 'WHATSAPP CHAT'}</span>
                </div>
                <div className="srtc-stencil-right">
                  <span className="srtc-stencil-chevrons" aria-hidden="true">///</span>
                </div>
              </div>

              <div className="srtc-vault-card-body srtc-container-corrugated-wall">
                <div className="srtc-vault-icon-badge srtc-vault-icon-badge--wa">
                  <Send size={22} className="srtc-vault-icon" />
                </div>
                <div className="srtc-vault-info">
                  <span className="srtc-vault-kicker">{vaultWhatsApp?.kicker || 'INSTANT WHATSAPP FREIGHT DESK'}</span>
                  <a
                    href={
                      vaultWhatsApp?.waLink ||
                      `https://wa.me/${vaultWhatsApp?.phone?.replace(/\D/g, '') || '919426646095'}?text=Hello%20SRTC%20Logistics%2C%20I%20need%20a%20freight%20quote.`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="srtc-vault-headline-link"
                  >
                    {vaultWhatsApp?.phone || '+91 9426646095'}
                  </a>
                  <p className="srtc-vault-desc">
                    {vaultWhatsApp?.description ||
                      'Send pickup/drop pincodes and container requirements. Receive corridor tariffs, transit SLA, and vehicle allocation in minutes.'}
                  </p>
                  <a
                    href={
                      vaultWhatsApp?.waLink ||
                      `https://wa.me/${vaultWhatsApp?.phone?.replace(/\D/g, '') || '919426646095'}?text=Hello%20SRTC%20Logistics%2C%20I%20need%20a%20freight%20quote.`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="srtc-vault-cta-btn srtc-vault-cta-btn--wa"
                  >
                    <span>{vaultWhatsApp?.ctaText || 'CHAT ON WHATSAPP DISPATCH'}</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              <div className="srtc-container-bottom-rail srtc-bottom-rail--compact">
                <div className="srtc-container-hazard-strip srtc-hazard-strip--compact" aria-hidden="true" />
                <ContainerRivetLine count={18} />
              </div>
            </div>

            {/* CONTAINER VAULT 3: OFFICIAL EMAIL & GUJARAT CORPORATE HQ */}
            <div className="srtc-contact-mini-container">
              <div className="srtc-iso-casting srtc-iso-tl" aria-hidden="true" />
              <div className="srtc-iso-casting srtc-iso-tr" aria-hidden="true" />
              <div className="srtc-iso-casting srtc-iso-bl" aria-hidden="true" />
              <div className="srtc-iso-casting srtc-iso-br" aria-hidden="true" />

              <div className="srtc-container-top-rail srtc-top-rail--compact">
                <ContainerRivetLine count={18} />
              </div>

              <div className="srtc-container-stencil-bar srtc-stencil-bar--compact">
                <div className="srtc-stencil-left">
                  <span className="srtc-stencil-dot" />
                  <span className="srtc-stencil-unit">{vaultEmail?.unitCode || 'SRTC-HQ-03'}</span>
                  <span className="srtc-unit-axle-tag">{vaultEmail?.tag || 'EDI & CORPORATE HQ'}</span>
                </div>
                <div className="srtc-stencil-right">
                  <span className="srtc-stencil-chevrons" aria-hidden="true">///</span>
                </div>
              </div>

              <div className="srtc-vault-card-body srtc-container-corrugated-wall">
                <div className="srtc-vault-icon-badge">
                  <Mail size={22} className="srtc-vault-icon" />
                </div>
                <div className="srtc-vault-info">
                  <span className="srtc-vault-kicker">{vaultEmail?.kicker || 'ENTERPRISE EDI & INQUIRIES'}</span>
                  <a
                    href={`mailto:${vaultEmail?.email || 'srtcpvtltd09@gmail.com'}`}
                    className="srtc-vault-headline-link srtc-email-link"
                  >
                    {vaultEmail?.email || 'srtcpvtltd09@gmail.com'}
                  </a>

                  <div className="srtc-hq-address-block">
                    <div className="srtc-hq-item">
                      <MapPin size={15} className="srtc-hq-icon" />
                      <span>
                        <strong>Headquarters:</strong>{' '}
                        {vaultEmail?.hqAddress ||
                          'Gujarat, India (Multimodal Hubs across Porbandar, Ahmedabad, Mundra & Mumbai)'}
                      </span>
                    </div>
                    <div className="srtc-hq-item">
                      <Clock size={15} className="srtc-hq-icon" />
                      <span>
                        <strong>Operations:</strong>{' '}
                        {vaultEmail?.operationsHours || '24 Hours • 365 Days Non-Stop Dispatch Coverage'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="srtc-container-bottom-rail srtc-bottom-rail--compact">
                <div className="srtc-container-hazard-strip srtc-hazard-strip--compact" aria-hidden="true" />
                <ContainerRivetLine count={18} />
              </div>
            </div>

            {/* CONTAINER VAULT 4: MULTIMODAL CORRIDOR HUBS & PORT YARDS */}
            <div className="srtc-contact-mini-container">
              <div className="srtc-iso-casting srtc-iso-tl" aria-hidden="true" />
              <div className="srtc-iso-casting srtc-iso-tr" aria-hidden="true" />
              <div className="srtc-iso-casting srtc-iso-bl" aria-hidden="true" />
              <div className="srtc-iso-casting srtc-iso-br" aria-hidden="true" />

              <div className="srtc-container-top-rail srtc-top-rail--compact">
                <ContainerRivetLine count={18} />
              </div>

              <div className="srtc-container-stencil-bar srtc-stencil-bar--compact">
                <div className="srtc-stencil-left">
                  <span className="srtc-stencil-dot" />
                  <span className="srtc-stencil-unit">{vaultHubs?.unitCode || 'SRTC-YARD-04'}</span>
                  <span className="srtc-unit-axle-tag">{vaultHubs?.tag || 'PORT & TRANSIT YARDS'}</span>
                </div>
                <div className="srtc-stencil-right">
                  <span className="srtc-stencil-chevrons" aria-hidden="true">///</span>
                </div>
              </div>

              <div className="srtc-vault-card-body srtc-container-corrugated-wall">
                <div className="srtc-vault-icon-badge">
                  <Navigation size={22} className="srtc-vault-icon" />
                </div>
                <div className="srtc-vault-info">
                  <span className="srtc-vault-kicker">{vaultHubs?.kicker || 'KEY PAN-INDIA CORRIDOR HUBS'}</span>
                  <strong className="srtc-vault-headline-static">
                    {vaultHubs?.title || 'Strategic Gateway Terminals'}
                  </strong>

                  <div className="srtc-hubs-chips-grid">
                    {hubsList.map((hub, idx) => (
                      <span key={idx} className="srtc-hub-chip">
                        {hub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="srtc-container-bottom-rail srtc-bottom-rail--compact">
                <div className="srtc-container-hazard-strip srtc-hazard-strip--compact" aria-hidden="true" />
                <ContainerRivetLine count={18} />
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------
              RIGHT COLUMN: 40-FOOT HIGH-CUBE DISPATCH BOOKING MANIFEST FORM
              ------------------------------------------------------------------ */}
          <div className="srtc-contact-manifest-col">
            <div className="srtc-booking-container-vault">
              {/* 4 Heavy ISO Corner Castings */}
              <div className="srtc-iso-casting srtc-iso-tl" aria-hidden="true" />
              <div className="srtc-iso-casting srtc-iso-tr" aria-hidden="true" />
              <div className="srtc-iso-casting srtc-iso-bl" aria-hidden="true" />
              <div className="srtc-iso-casting srtc-iso-br" aria-hidden="true" />

              {/* Top Structural Steel Rail with Rivets */}
              <div className="srtc-container-top-rail">
                <ContainerRivetLine count={28} />
              </div>

              {/* Container Top Stencil Bar */}
              <div className="srtc-container-stencil-bar">
                <div className="srtc-stencil-left">
                  <span className="srtc-stencil-dot" />
                  <span className="srtc-stencil-unit">SRTC-U 992014 [0]</span>
                  <span className="srtc-stencil-type">45G1 HC DISPATCH MANIFEST</span>
                  <span className="srtc-stencil-status-pill">CENTRAL DISPATCH READY</span>
                </div>
                <div className="srtc-stencil-right">
                  <span className="srtc-stencil-spec">ALL-INDIA CORRIDOR GATEWAY</span>
                  <span className="srtc-stencil-chevrons" aria-hidden="true">///</span>
                </div>
              </div>

              {/* Form Body with 3D Corrugated Sheet Styling */}
              <div className="srtc-booking-manifest-body srtc-container-corrugated-wall">
                {/* Form Header */}
                <div className="srtc-manifest-header">
                  <div className="srtc-manifest-kicker">
                    <Truck size={14} color="#D49D28" />
                    <span>INSTANT FREIGHT ALLOCATION &bull; SHIPMENT MANIFEST</span>
                  </div>
                  <h2 className="srtc-manifest-title">
                    Request Immediate Freight Allocation &amp; Rate Dossier
                  </h2>
                  <p className="srtc-manifest-desc">
                    Submit your corridor specifications below. Our central logistics controllers verify payload
                    weight, route permits, and dispatch immediate freight availability within 15 minutes.
                  </p>
                </div>

                {/* CSC Metal Data Plate */}
                <CscBookingPlate config={bookingFormConfig} />

                {/* Success Banner if submitted */}
                {isSubmitted ? (
                  <div className="srtc-booking-success-box" role="status">
                    <div className="srtc-success-icon-wrap">
                      <CheckCircle2 size={36} color="#16A34A" />
                    </div>
                    <div className="srtc-success-content">
                      <h3 className="srtc-success-title">Freight Manifest Transmitted Successfully!</h3>
                      <p className="srtc-success-desc">
                        Your shipment details have been allocated to SRTC Central Operations Desk. A dedicated
                        logistics planner will call you at{' '}
                        <strong>{formData.phone || vaultPhone?.phone || '+91 9426646095'}</strong> with route
                        confirmation and official tariff quote.
                      </p>
                      <div className="srtc-success-tracking-badge">
                        <span>DISPATCH REF: SRTC-MANIFEST-#{manifestRef}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        className="srtc-success-reset-btn"
                      >
                        Submit Another Freight Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="srtc-manifest-form" noValidate>
                    {/* Section 1: Customer & Enterprise Identity */}
                    <div className="srtc-form-grid-2">
                      <div className="srtc-form-field">
                        <label htmlFor="fullName" className="srtc-field-label">
                          <User size={13} className="srtc-label-icon" />
                          <span>Full Name / Contact Person *</span>
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Rajesh Sharma"
                          className="srtc-input-control"
                        />
                      </div>

                      <div className="srtc-form-field">
                        <label htmlFor="companyName" className="srtc-field-label">
                          <Building2 size={13} className="srtc-label-icon" />
                          <span>Enterprise / Company Name *</span>
                        </label>
                        <input
                          id="companyName"
                          type="text"
                          name="companyName"
                          required
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="e.g. Tata Motors / Reliance / Apollo"
                          className="srtc-input-control"
                        />
                      </div>
                    </div>

                    {/* Section 2: Contact Numbers & Email */}
                    <div className="srtc-form-grid-2">
                      <div className="srtc-form-field">
                        <label htmlFor="phone" className="srtc-field-label">
                          <Phone size={13} className="srtc-label-icon" />
                          <span>Phone Number (+91 Mobile) *</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="srtc-input-control"
                        />
                      </div>

                      <div className="srtc-form-field">
                        <label htmlFor="email" className="srtc-field-label">
                          <Mail size={13} className="srtc-label-icon" />
                          <span>Official Email Address *</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="corporate@enterprise.com"
                          className="srtc-input-control"
                        />
                      </div>
                    </div>

                    {/* Section 3: Shipment Type & Payload */}
                    <div className="srtc-form-grid-2">
                      <div className="srtc-form-field">
                        <label htmlFor="serviceType" className="srtc-field-label">
                          <Boxes size={13} className="srtc-label-icon" />
                          <span>Required Equipment / Service Type *</span>
                        </label>
                        <select
                          id="serviceType"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleInputChange}
                          className="srtc-select-control"
                        >
                          {servicesList.map((service, idx) => (
                            <option key={idx} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="srtc-form-field">
                        <label htmlFor="weightTons" className="srtc-field-label">
                          <Sparkles size={13} className="srtc-label-icon" />
                          <span>Estimated Gross Cargo Weight (Tons)</span>
                        </label>
                        <input
                          id="weightTons"
                          type="text"
                          name="weightTons"
                          value={formData.weightTons}
                          onChange={handleInputChange}
                          placeholder="e.g. 18 - 24 Tons"
                          className="srtc-input-control"
                        />
                      </div>
                    </div>

                    {/* Section 4: Freight Highway Corridor */}
                    <div className="srtc-form-grid-2">
                      <div className="srtc-form-field">
                        <label htmlFor="pickupLocation" className="srtc-field-label">
                          <MapPin size={13} className="srtc-label-icon" />
                          <span>Pickup City / Port / Plant Location *</span>
                        </label>
                        <input
                          id="pickupLocation"
                          type="text"
                          name="pickupLocation"
                          required
                          value={formData.pickupLocation}
                          onChange={handleInputChange}
                          placeholder="e.g. Jamnagar, Dahej, Porbandar, Hazira"
                          className="srtc-input-control"
                        />
                      </div>

                      <div className="srtc-form-field">
                        <label htmlFor="dropLocation" className="srtc-field-label">
                          <Navigation size={13} className="srtc-label-icon" />
                          <span>Destination City / CFS / Delivery Hub *</span>
                        </label>
                        <input
                          id="dropLocation"
                          type="text"
                          name="dropLocation"
                          required
                          value={formData.dropLocation}
                          onChange={handleInputChange}
                          placeholder="e.g. Nhava Sheva, Delhi-NCR, Pune, Bhiwandi"
                          className="srtc-input-control"
                        />
                      </div>
                    </div>

                    {/* Section 5: Specific Cargo Notes / Hazardous Class */}
                    <div className="srtc-form-field">
                      <label htmlFor="notes" className="srtc-field-label">
                        <MessageSquare size={13} className="srtc-label-icon" />
                        <span>Cargo Description, Material Classification or Special SLA Notes</span>
                      </label>
                      <input
                        id="notes"
                        type="text"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="e.g. Automotive components, urgent dispatch required"
                        className="srtc-input-control"
                      />
                    </div>

                    {/* Form Submit Button: Transmit Manifest */}
                    <div className="srtc-form-action-bar">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="srtc-transmit-manifest-btn"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="srtc-transmit-spinner" />
                            <span>TRANSMITTING DISPATCH MANIFEST...</span>
                          </>
                        ) : (
                          <>
                            <span>
                              {bookingFormConfig?.submitBtnText || 'TRANSMIT FREIGHT DISPATCH INQUIRY'}
                            </span>
                            <ArrowRight size={17} />
                          </>
                        )}
                      </button>

                      <div className="srtc-form-trust-text">
                        <ShieldCheck size={14} color="#16A34A" />
                        <span>Instant 15-Minute Response Guaranteed &bull; Zero Spam</span>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Bottom Structural Sill Rail with Rivets & Hazard Tape */}
              <div className="srtc-container-bottom-rail">
                <div className="srtc-container-hazard-strip" aria-hidden="true" />
                <ContainerRivetLine count={28} />
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            3. FREIGHT CORRIDOR DISPATCH TELEMETRY BANNER (4 TRUST METRICS)
            ==================================================================== */}
        <div className="srtc-contact-metrics-hud">
          <div className="srtc-hud-metric-card">
            <div className="srtc-hud-icon-wrap">
              <Zap size={20} color="#E8B94F" />
            </div>
            <div className="srtc-hud-info">
              <strong className="srtc-hud-val">15-Min SLA</strong>
              <span className="srtc-hud-lbl">Fastest Rate &amp; Fleet Allocation</span>
            </div>
          </div>

          <div className="srtc-hud-metric-card">
            <div className="srtc-hud-icon-wrap">
              <ShieldCheck size={20} color="#E8B94F" />
            </div>
            <div className="srtc-hud-info">
              <strong className="srtc-hud-val">100% Sealed</strong>
              <span className="srtc-hud-lbl">Fastest, Secured &amp; Tamper-Evident</span>
            </div>
          </div>

          <div className="srtc-hud-metric-card">
            <div className="srtc-hud-icon-wrap">
              <Navigation size={20} color="#E8B94F" />
            </div>
            <div className="srtc-hud-info">
              <strong className="srtc-hud-val">180+ Corridors</strong>
              <span className="srtc-hud-lbl">Pan-India Industrial Expressways</span>
            </div>
          </div>

          <div className="srtc-hud-metric-card">
            <div className="srtc-hud-icon-wrap">
              <CheckCircle2 size={20} color="#E8B94F" />
            </div>
            <div className="srtc-hud-info">
              <strong className="srtc-hud-val">Zero Demurrage</strong>
              <span className="srtc-hud-lbl">Guaranteed On-Time Gate Arrival</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
