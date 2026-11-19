require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const ContactPageContent = require('../models/ContactPageContent');

const contactSeedData = {
  hero: {
    title: 'Connect With',
    titleSpan: 'Central Dispatch',
    subtitle:
      'Direct access to SRTC central dispatch managers. Instant rate allocation for Full Truck Load (FTL), Part Truck Load (PTL), and Warehousing nationwide.',
    breadcrumbHome: 'HOME',
    breadcrumbCurrent: 'CENTRAL DISPATCH',
  },
  vaultPhone: {
    unitCode: 'SRTC-LINE-01',
    tag: 'VOICE CONTROL',
    kicker: '24/7 CENTRAL DISPATCH HOTLINE',
    phone: '+91 9426646095',
    description:
      'Speak directly with our commercial fleet controllers. Instant freight quotes and vehicle dispatch across Gujarat and nationwide corridors.',
    ctaText: 'CALL DISPATCH DESK NOW',
    ctaLink: 'tel:+919426646095',
  },
  vaultWhatsApp: {
    unitCode: 'SRTC-LINE-02',
    tag: 'WHATSAPP CHAT',
    kicker: 'INSTANT WHATSAPP FREIGHT DESK',
    phone: '+91 9426646095',
    description:
      'Send pickup/drop locations and cargo specifications. Receive corridor tariffs, transit SLA, and vehicle allocation in minutes.',
    ctaText: 'CHAT ON WHATSAPP DISPATCH',
    waLink:
      'https://wa.me/919426646095?text=Hello%20SRTC%20Logistics%2C%20I%20need%20a%20freight%20quote%20for%20my%20shipment.',
  },
  vaultEmail: {
    unitCode: 'SRTC-HQ-03',
    tag: 'REGISTERED HEAD OFFICE',
    kicker: 'CORPORATE HEADQUARTERS & DISPATCH',
    email: 'srtcpvtltd09@gmail.com',
    hqAddress:
      'D/1101, 11th Floor, Prahlad Nagar Trade Center (PNTC), Times Of India Press Road, Vejalpur, Ahmedabad - 380015',
    operationsHours: '24 Hours • 365 Days Non-Stop Dispatch Coverage',
  },
  vaultHubs: {
    unitCode: 'SRTC-YARD-04',
    tag: 'PRIMARY NETWORK HUBS',
    kicker: 'KEY REGIONAL CORRIDORS',
    title: 'Strategic Freight Gateways',
    hubsList: [
      'Ahmedabad (Corporate HQ & Hub)',
      'Vadodara Industrial Corridor',
      'Surat / Hazira Refinery Belt',
      'Dahej / Bharuch Chemical Hub',
      'Jamnagar Petrochemical Belt',
      'Rajkot & Saurashtra Industrial Spine',
    ],
  },
  bookingFormConfig: {
    terminalUnit: 'SRTC-LINEHAUL',
    maxGvw: '42,000 KG',
    fleetRating: 'EST. 2003 • 23+ YRS',
    customsStatus: '100% e-WAY SYNC',
    servicesList: [
      'Full Truck Load (FTL)',
      'Part Truck Load (PTL)',
      'Warehousing & Handling',
      'D to C & B to B Distribution',
      'Manufacturer Plant Infeed/Evacuation',
      'General Inquiry / Rate Advisory',
    ],
    submitBtnText: 'GENERATE INSTANT DISPATCH MANIFEST',
  },
};

async function seedContact() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGODB_URI not set');

    console.log('Connecting to MongoDB Atlas for Contact...');
    await mongoose.connect(mongoUri);

    let doc = await ContactPageContent.findOne();
    if (!doc) {
      doc = new ContactPageContent(contactSeedData);
      await doc.save();
      console.log('ContactPageContent created successfully!');
    } else {
      Object.assign(doc, contactSeedData);
      await doc.save();
      console.log('ContactPageContent updated with brochure-aligned data!');
    }

    await mongoose.disconnect();
    console.log('Contact seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Contact seeding failed:', err.message);
    process.exit(1);
  }
}

seedContact();
