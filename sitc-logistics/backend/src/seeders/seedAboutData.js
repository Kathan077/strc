require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const AboutPageContent = require('../models/AboutPageContent');

const aboutSeedData = {
  hero: {
    backgroundImage: '/images/hero/hero-truck-cinematic.jpg',
    title: 'About',
    titleGold: 'SRTC Logistics',
    subtitle:
      'Two Decades of Heavy Freight Mastery, One of India’s Largest Privately Owned Fleets & Guaranteed Transit Integrity.',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'About Us',
  },
  stats: {
    kicker: 'PROVEN LINEHAUL EXCELLENCE',
    title: 'Digital & Trusted Transport Logistic Company',
    description:
      'Delivering high-quality, end-to-end logistics solutions to corporates and individuals nationwide with guaranteed on-time delivery.',
    image: '/images/about/srtc-dryport-terminal.jpg',
    imageAlt: 'SRTC Logistics Terminal Hub',
    ctaText: 'Contact Us',
    ctaLink: '/contact',
    statCards: [
      {
        id: 'experience',
        title: 'Years Of Experience',
        number: '23+',
        icon: 'History',
        description: 'Established in 2003 with over two decades of highway transport trust.',
        variant: 'white',
        delay: '80ms',
      },
      {
        id: 'fleet',
        title: 'Privately Owned Fleet',
        number: 'Largest',
        icon: 'Truck',
        description: 'One of India’s largest privately owned fleets operating 24/7.',
        variant: 'gold',
        delay: '160ms',
      },
      {
        id: 'services',
        title: 'Specialized Offerings',
        number: '6 Core',
        icon: 'Route',
        description: 'FTL, PTL, small packages, superfast cargo, warehousing & contract logistics.',
        variant: 'navy',
        delay: '240ms',
      },
      {
        id: 'safety',
        title: 'Compliance & Safety',
        number: '100%',
        icon: 'ShieldCheck',
        description: 'Full traffic rule compliance with trained professional driver staff.',
        variant: 'white',
        delay: '320ms',
      },
    ],
  },
  company: {
    eyebrowText: 'ABOUT OUR COMPANY & HERITAGE',
    title: 'Delivering reliability, speed, and value',
    titleAccent: 'every single time',
    titleSuffix: 'our trucks hit the highway.',
    leadText:
      'Shree Ram Transportation Corporation, established in 2003 by Mr. Menandbhai Odedara, has been a trusted name in Gujarat’s transport sector for over two decades. Building on this strong foundation and legacy of reliability, SRTC Supply Chain Pvt. Ltd. was formed as a new venture to meet the growing demand for modern, technology-driven, and scalable logistics & warehouse solutions. Today, SRTC Supply Chain Pvt. Ltd. delivers high-quality, end-to-end logistics solutions to corporates and individuals nationwide.',
    imgSupervisor: '/images/about/founder-menandbhai.jpg',
    ribbonTag: 'ESTD. 2003',
    ribbonText: '23+ Years Experience',
    imgTruck: '/images/about/srtc-highway-truck.jpg',
    sealLabel: 'TRUSTED BRAND',
    sealSub: 'SRTC FLEET',
    imgDetail: '/images/about/highway-truck-detail.jpg',
    milestones: [
      {
        year: '2003',
        title: 'Visionary Inception',
        icon: 'Calendar',
        highlight: 'Founded by Mr. Menandbhai Odedara',
        description:
          'Started as Shree Ram Transportation Corporation in Gujarat, establishing an unshakeable benchmark in road logistics.',
        delay: '220ms',
      },
      {
        year: '23+ Yrs',
        title: 'Pan-India Reach',
        icon: 'Truck',
        highlight: 'Privately Owned Fleet',
        description:
          'Expanded nationwide with specialized FTL, PTL, superfast cargo, and modern warehousing facilities.',
        delay: '300ms',
      },
      {
        year: '100%',
        title: 'Customer Trust',
        icon: 'ShieldCheck',
        highlight: 'Esteemed Corporate Partners',
        description:
          'Proudly serving Indian Oil (IOCL), Nayara Energy, HPCL, Reliance, ONGC, OPaL, HMEL, and Gaay Chhap Besan.',
        delay: '380ms',
      },
    ],
    topClients: [
      'Indian Oil (IOCL)',
      'Nayara Energy',
      'HPCL',
      'Reliance Industries',
      'ONGC',
      'OPaL',
      'HMEL',
      'Gaay Chhap Besan',
    ],
    actionBtnText: 'Explore Our Services',
    actionBtnLink: '/services',
    phoneLabel: 'Direct Linehaul Hotline:',
    phoneNumber: '+91 9426646095',
    phoneTel: 'tel:+919426646095',
  },
  visionMission: {
    kicker: 'STRATEGIC PURPOSE & CORPORATE VALUES',
    title: 'Driven by Mission, Powered by Vision',
    subtitle:
      'Rooted in two decades of leadership, dedicated to revolutionizing transportation through eco-friendly, technology-driven solutions.',
    mission: {
      docId: 'DOC: SRTC-MISSION-2003',
      barcodeText: '||||||| 2003 SRTC 2026',
      badge: 'OUR MISSION',
      seal: 'SEAL: SRTC-MISSION',
      title: 'Our Mission',
      tagline: 'Delivering Seamless, Eco-Friendly & Tech-Advanced Solutions',
      paragraph:
        'Our mission is to revolutionize the transportation landscape by delivering seamless, eco-friendly, and technology-advanced transport solutions. We are dedicated to enhancing mobility, reducing environmental impact, and providing exceptional service across all our operations. We ensure the ability to transport in full compliance with traffic rules, supported by a team of well-trained and professional driver staff.',
      pillars: [
        {
          icon: 'Leaf',
          title: 'Eco-Friendly Transport Solutions',
          desc: 'Dedicated to reducing environmental impact through optimized vehicle routing and modern high-efficiency equipment.',
        },
        {
          icon: 'ShieldCheck',
          title: '100% Traffic & Regulatory Compliance',
          desc: 'Ensuring safe, accident-free transit in full compliance with road and highway safety rules nationwide.',
        },
        {
          icon: 'Users',
          title: 'Professional & Trained Driver Staff',
          desc: 'Supported by a dedicated team of rigorously trained, professional commercial pilots ensuring cargo integrity.',
        },
      ],
      specs: {
        compliance: '100% TRAFFIC COMPLIANT',
        safety: 'ZERO-HARM MANDATE',
        drivers: 'PROFESSIONAL STAFF',
      },
    },
    vision: {
      docId: 'DOC: SRTC-VISION-2026',
      barcodeText: '||||||| SRTC VISION GUJARAT',
      badge: 'OUR VISION',
      seal: 'SEAL: SRTC-VISION',
      title: 'Our Vision',
      tagline: 'Gujarat’s Foremost & Most Preferred Transportation Partner',
      paragraph:
        'Our vision and Dream to become Gujarat’s Foremost and promising Transport Service, with cutting edge and Digital Technology. But core visionis to Enlighted Customer and become most preferred Transportation',
      pillars: [
        {
          icon: 'Award',
          title: 'Gujarat’s Foremost Transport Service',
          desc: 'Pioneering road freight excellence across Gujarat and expanding reliable connections to industrial hubs nationwide.',
        },
        {
          icon: 'Cpu',
          title: 'Cutting-Edge & Digital Technology',
          desc: 'Deploying modern digital tools, real-time tracking, and automated logistics execution to eliminate transit delays.',
        },
        {
          icon: 'HeartHandshake',
          title: 'Enlightened Customers & Preferred Partner',
          desc: 'Building enduring enterprise trust by delivering value, speed, and bespoke logistics solutions every single time.',
        },
      ],
      specs: {
        position: 'GUJARAT FOREMOST',
        tech: 'DIGITAL LOGISTICS',
        trust: 'PREFERRED PARTNER',
      },
    },
    chassisCommitments: [
      {
        icon: 'Truck',
        label: 'Commercial Road Fleet',
        sub: 'One of India’s Largest Privately Owned Fleets',
      },
      {
        icon: 'ShieldCheck',
        label: 'Full Traffic Compliance',
        sub: 'Well-Trained & Professional Driver Staff',
      },
    ],
    founderStrip: {
      avatar: '/images/about/founder-menandbhai.jpg',
      badge: 'FOUNDER',
      quote:
        '“At SRTC, we believe every business deserves tailored logistics solutions — and we’re driven by our commitment to deliver reliability, speed, and value every single time.”',
      name: 'MENAND BALUBHAI ODEDARA',
      role: 'Founder — Shree Ram Transportation Corporation',
      btnText: 'Contact Dispatch Desk',
      btnLink: '/contact',
    },
  },
  process: {
    kicker: 'HOW IT WORKS • 4-STEP FREIGHT LIFECYCLE',
    title: 'Simple, Transparent &',
    titleGold: 'Precision-Driven.',
    description:
      'From instant freight allocation to zero-demurrage gate delivery, our heavy linehaul fleet moves your cargo across 180+ express corridors with guaranteed SLA precision.',
    steps: [
      {
        number: '01',
        stepNum: '01',
        km: 'KM 00',
        terminal: 'DISPATCH HUB',
        icon: 'CalendarCheck',
        badge: '15-Min Allocation',
        title: 'Booking & Dispatch',
        tagline: 'Instant Rate & Fleet Allocation',
        desc: 'Consignment specifications entered, algorithmically matched to dedicated heavy linehauls.',
        tireModel: 'SRTC LINEHAUL 295/80 R22.5',
        tireSpec: 'STEEL BELTED RADIAL • TUBELESS • 152/148M',
      },
      {
        number: '02',
        stepNum: '02',
        km: 'KM 140',
        terminal: 'GREEN CORRIDOR',
        icon: 'Route',
        badge: 'Route AI Planned',
        title: 'Shipment Planning',
        tagline: 'Precision Transit Pathing',
        desc: 'Pre-approved toll lanes, fuel optimization, and driver safety schedules mapped across NH corridors.',
        tireModel: 'SRTC EXPRESS 295/80 R22.5',
        tireSpec: 'DUAL DRIVE AXLE • HIGHWAY SPEED RATED',
      },
      {
        number: '03',
        stepNum: '03',
        km: 'KM 580',
        terminal: 'EXPRESS HIGHWAY',
        icon: 'Navigation',
        badge: 'Dual Drivers',
        title: 'Continuous Linehaul',
        tagline: '24/7 Telematics & Telemetry',
        desc: 'Non-stop corridor transit with geo-fenced electronic seal verification and real-time alerts.',
        tireModel: 'SRTC HAULAGE 295/80 R22.5',
        tireSpec: 'MAX LOAD 3750 KG • PAN-INDIA RATED',
      },
      {
        number: '04',
        stepNum: '04',
        km: 'KM 920',
        terminal: 'DESTINATION DOCK',
        icon: 'CheckCircle2',
        badge: 'e-POD Verified',
        title: 'Safe Punctual Delivery',
        tagline: 'Zero-Demurrage Gate Handover',
        desc: 'Punctual plant/warehouse arrival, verified unloading, and instant electronic proof-of-delivery.',
        tireModel: 'SRTC TERMINAL MASTER',
        tireSpec: 'ZERO TRANSIT LOSS • SLA COMPLIANT',
      },
    ],
  },
  truckContactCTA: {
    statusText: '24/7 NATIONWIDE LINEHAUL FLEET READY FOR DISPATCH',
    buttonText: 'Contact Dispatch / Book Linehaul',
    buttonLink: '/contact',
  },
};

async function seedAbout() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGODB_URI not set');

    console.log('Connecting to MongoDB Atlas for About...');
    await mongoose.connect(mongoUri);

    let doc = await AboutPageContent.findOne();
    if (!doc) {
      doc = new AboutPageContent(aboutSeedData);
      await doc.save();
      console.log('AboutPageContent created successfully!');
    } else {
      Object.assign(doc, aboutSeedData);
      await doc.save();
      console.log('AboutPageContent updated with 100% brochure-aligned data!');
    }

    await mongoose.disconnect();
    console.log('About seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('About seeding failed:', err.message);
    process.exit(1);
  }
}

seedAbout();
