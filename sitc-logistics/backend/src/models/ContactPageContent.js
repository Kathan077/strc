const mongoose = require('mongoose');

const ContactPageContentSchema = new mongoose.Schema(
  {
    // Section 1: Hero Banner
    hero: {
      title: { type: String, default: 'Connect With' },
      titleSpan: { type: String, default: 'Central Dispatch' },
      subtitle: {
        type: String,
        default:
          'Need immediate container allocation, multi-axle linehaul booking, or corridor rate quotation? Our dispatch managers are on active highway duty 24/7.',
      },
      breadcrumbHome: { type: String, default: 'HOME' },
      breadcrumbCurrent: { type: String, default: 'CENTRAL DISPATCH' },
    },

    // Section 2: Vault 1 - 24/7 Voice Hotline
    vaultPhone: {
      unitCode: { type: String, default: 'SRTC-LINE-01' },
      tag: { type: String, default: 'VOICE CONTROL' },
      kicker: { type: String, default: '24/7 CENTRAL DISPATCH HOTLINE' },
      phone: { type: String, default: '+91 9426646095' },
      description: {
        type: String,
        default:
          'Speak directly with our heavy linehaul controllers. Instant rate quote and vehicle dispatch across 180+ express corridors.',
      },
      ctaText: { type: String, default: 'CALL DISPATCH DESK NOW' },
      ctaLink: { type: String, default: 'tel:+919426646095' },
    },

    // Section 3: Vault 2 - Instant WhatsApp Desk
    vaultWhatsApp: {
      unitCode: { type: String, default: 'SRTC-LINE-02' },
      tag: { type: String, default: 'WHATSAPP CHAT' },
      kicker: { type: String, default: 'INSTANT WHATSAPP FREIGHT DESK' },
      phone: { type: String, default: '+91 9426646095' },
      description: {
        type: String,
        default:
          'Send pickup/drop pincodes and container requirements. Receive corridor tariffs, transit SLA, and vehicle allocation in minutes.',
      },
      ctaText: { type: String, default: 'CHAT ON WHATSAPP DISPATCH' },
      waLink: {
        type: String,
        default:
          'https://wa.me/919426646095?text=Hello%20SRTC%20Logistics%2C%20I%20need%20a%20freight%20quote%20for%20my%20shipment.',
      },
    },

    // Section 4: Vault 3 - Official Email & Corporate HQ
    vaultEmail: {
      unitCode: { type: String, default: 'SRTC-HQ-03' },
      tag: { type: String, default: 'EDI & CORPORATE HQ' },
      kicker: { type: String, default: 'ENTERPRISE EDI & INQUIRIES' },
      email: { type: String, default: 'srtcpvtltd09@gmail.com' },
      hqAddress: {
        type: String,
        default:
          'Gujarat, India (Multimodal Hubs across Porbandar, Ahmedabad, Mundra & Mumbai)',
      },
      operationsHours: {
        type: String,
        default: '24 Hours • 365 Days Non-Stop Dispatch Coverage',
      },
    },

    // Section 5: Vault 4 - Key Gateway Hubs & Port Yards
    vaultHubs: {
      unitCode: { type: String, default: 'SRTC-YARD-04' },
      tag: { type: String, default: 'PORT & TRANSIT YARDS' },
      kicker: { type: String, default: 'KEY REGIONAL CORRIDOR HUBS' },
      title: { type: String, default: 'Strategic Gateway Terminals' },
      hubsList: [{ type: String }],
    },

    // Section 6: Master 40ft High-Cube Booking Form Config & CSC Plate
    bookingFormConfig: {
      terminalUnit: { type: String, default: 'SRTC-45G1-HC' },
      maxGvw: { type: String, default: '49,000 KG' },
      fleetRating: { type: String, default: 'IBA APPROVED' },
      customsStatus: { type: String, default: '100% e-WAY SYNC' },
      servicesList: [{ type: String }],
      submitBtnText: { type: String, default: 'GENERATE INSTANT DISPATCH MANIFEST' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactPageContent', ContactPageContentSchema);

