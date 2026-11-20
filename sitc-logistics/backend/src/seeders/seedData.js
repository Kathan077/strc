require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');
const HomepageContent = require('../models/HomepageContent');

const seedAdminUser = async () => {
  const email = (process.env.ADMIN_INITIAL_EMAIL || 'admin@srtclogistics.com').toLowerCase().trim();
  const password = process.env.ADMIN_INITIAL_PASSWORD || 'SRTC@Admin#2026!Secure';

  let user = await AdminUser.findOne({ email });
  if (!user) {
    user = new AdminUser({
      email,
      password, // Mongoose pre-save hook will hash this with bcrypt
      name: 'SRTC Super Administrator',
      role: 'superadmin',
    });
    await user.save();
    console.log(`[Seed] Default Admin User created: ${email}`);
  } else {
    // Ensure password matches initial password for easy login
    user.password = password;
    await user.save();
    console.log(`[Seed] Admin User exists, password refreshed for: ${email}`);
  }
};

const initialHomepageData = {
  hero: {
    slides: [
      {
        kicker: 'STRATEGIC LINEHAUL INFRASTRUCTURE · ESTD. 2003',
        titleLine1: 'ENGINEERED',
        titleLine2: 'SUPPLY CHAIN',
        titleLine3: 'EXCELLENCE',
        description:
          "High-density enterprise freight transit connecting India's critical industrial manufacturing corridors with zero-compromise precision and telemetry.",
        ctaPrimary: { text: 'Explore Transport Solutions', link: '/services' },
        ctaSecondary: { text: 'Request Linehaul Quote', link: '/contact' },
        image: '/images/hero/hero-slide-1.jpg',
        stats: [
          { num: '23+', label: 'Years Linehaul Dominance' },
          { num: '99.4%', label: 'On-Time Highway SLA' },
          { num: '100%', label: 'GPS Telematics Tracking' },
        ],
      },
      {
        kicker: 'HEAVY COMMERCIAL INFRASTRUCTURE · NATIONWIDE',
        titleLine1: 'PRECISION',
        titleLine2: 'LINEHAUL',
        titleLine3: 'LOGISTICS',
        description:
          'Customized Full Truck Load and Part Truck Load transit designed for Polymers, Agro, Pharma, and Heavy Industrial enterprises nationwide.',
        ctaPrimary: { text: 'Explore Fleet & Routes', link: '/services' },
        ctaSecondary: { text: 'Book Highway Transit', link: '/contact' },
        image: '/images/hero/hero-slide-2.jpg',
        stats: [
          { num: '850+', label: 'Company-Managed Fleet' },
          { num: '28+', label: 'Operating Hubs' },
          { num: 'Zero', label: 'Loss Transit Mandate' },
        ],
      },
      {
        kicker: 'DIGITAL FLEET DISPATCH & TELEMATICS INTELLIGENCE',
        titleLine1: 'CONNECTED',
        titleLine2: 'COMMERCIAL',
        titleLine3: 'TRANSPORT',
        description:
          'Live geofenced lane tracking, digital proof of delivery, and proactive exception handling across 28+ nationwide transit hubs.',
        ctaPrimary: { text: 'Digital Fleet Intelligence', link: '/services' },
        ctaSecondary: { text: 'Get Instant Quote', link: '/contact' },
        image: '/images/hero/hero-slide-3.jpg',
        stats: [
          { num: '50K+', label: 'Loads Delivered Safely' },
          { num: '24/7', label: 'Central Command Room' },
          { num: '15 min', label: 'Quote Turnaround SLA' },
        ],
      },
    ],
  },
  about: {
    kicker: 'SRTC SUPPLY CHAIN PVT. LTD.',
    titleLine1: 'Legacy of',
    highlightText: 'Reliability,',
    titleLine2: 'Delivering Value Every Single Time.',
    description:
      'Shree Ram Transportation Corporation, founded in 2003 by Mr. Menandbhai Odedara, has been Gujarat’s trusted transport benchmark for over two decades. Building on this legacy, SRTC Supply Chain Pvt. Ltd. delivers modern, technology-driven, end-to-end logistics & warehousing nationwide.',
    ctaText: 'Contact Us',
    ctaLink: '/contact',
    stats: {
      shipments: 1.2,
      corridors: 180,
      fleet: 840,
      sla: 99.4,
    },
    capabilities: [
      {
        id: '01',
        title: 'Full Truck Load (FTL)',
        detail:
          'Dedicated point-to-point heavy commercial transport across pan-India industrial corridors.',
        tag: 'FTL Pan-India',
      },
      {
        id: '02',
        title: 'Part Truck Load (PTL)',
        detail:
          'Scheduled, safe, and cost-effective freight movement ensuring reliable on-time delivery.',
        tag: 'PTL Express',
      },
      {
        id: '03',
        title: 'Warehousing & Storage',
        detail:
          'Scalable, secure storage and modern handling facilities designed to eliminate corporate bottlenecks.',
        tag: 'Secure Storage',
      },
    ],
  },
  services: {
    kicker: 'PRECISION SERVICES & SPECIALIZED FLEET',
    title: 'Custom Logistics Solutions for Your Business',
    subtitle:
      'Purpose-built transportation solutions engineered for critical industries across India.',
    serviceCards: [
      {
        id: 'truck-1',
        category: 'Dedicated Freight',
        title: 'Full Truck Load (FTL) Linehaul',
        description:
          'Comprehensive multi-axle dedicated linehaul transport with real-time GPS tracking and pre-planned routes for industrial goods.',
        badge: 'FTL LINEHAUL',
        image: '/images/services/service-truck-1.jpg',
        specs: ['Multi-Axle Trailers', 'Zero Transshipment', 'Dedicated GPS'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
      {
        id: 'truck-2',
        category: 'Consolidated Cargo',
        title: 'Part Truck Load (PTL) & Superfast Cargo',
        description:
          'Cost-effective consolidated transit for partial truck loads and urgent small packages with reliable, guaranteed on-time delivery.',
        badge: 'SUPERFAST PTL',
        image: '/images/services/service-truck-2.jpg',
        specs: ['Hub-and-Spoke', 'Barcode Tagged', 'Daily Departures'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
      {
        id: 'truck-3',
        category: 'Contract Logistics',
        title: 'Warehousing & Handling Services',
        description:
          'Scalable modern storage facilities, contract logistics, and inventory management designed for corporates and manufacturing hubs.',
        badge: 'WAREHOUSING',
        image: '/images/services/service-truck-3.jpg',
        specs: ['Grade-A Storage', 'WMS Integrated', 'Cross-Docking'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
      {
        id: 'container-1',
        category: 'Commercial Distribution',
        title: 'D to C & B to B',
        description:
          'High-velocity omni-channel distribution connecting mother warehouses, regional fulfillment hubs, and retail/B2B distributor networks.',
        badge: 'SRTC-D2C-B2B',
        image: '',
        specs: ['Scheduled Daily Departures', 'Direct Plant to B2B Hubs'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
      {
        id: 'container-2',
        category: 'Plant Logistics',
        title: 'Manufacturer',
        description:
          'Integrated manufacturing inbound raw material infeed and outbound finished goods evacuation with dedicated fleet deployment.',
        badge: 'SRTC-MANUFACTURING',
        image: '',
        specs: ['Dedicated Multi-Axle Fleet', 'Zero Stoppage JIT'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
      {
        id: 'container-3',
        category: 'Heavy Haulage',
        title: 'Industrial',
        description:
          'Engineered transport for industrial equipment, precision engineering assemblies, structural steel, and plant machinery nationwide.',
        badge: 'SRTC-INDUSTRIAL',
        image: '',
        specs: ['Heavy Multi-Axle Trailers', '100% Traffic Compliant'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
      {
        id: 'container-4',
        category: 'Healthcare',
        title: 'Pharmaceuticals',
        description:
          'Clean, secure, time-critical transportation for active pharmaceutical ingredients (APIs), formulations, and healthcare supplies.',
        badge: 'SRTC-PHARMA',
        image: '',
        specs: ['Sealed Weather-Proof Pods', 'GPS Real-Time Tracking'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
      {
        id: 'container-5',
        category: 'Agro & Food',
        title: 'Food & Beverages',
        description:
          'Hygiene-compliant, weather-sealed transport for flour mills, packaged foods, spices, grains, and FMCG agro-distribution networks.',
        badge: 'SRTC-FOOD-BEVERAGES',
        image: '',
        specs: ['GAAY CHHAP BESAN', 'Food-Grade Certified Containers'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
      {
        id: 'container-6',
        category: 'Petrochemicals',
        title: 'Polymers',
        description:
          'High-capacity bulk container transport engineered for polymer pellets, resins, HDPE, and petrochemical supply chains from refinery complexes.',
        badge: 'SRTC-POLYMERS',
        image: '',
        specs: ['IOCL / NAYARA / RELIANCE / OPAL', 'High-Volume Bulk Multi-Axle'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
    ],
  },
  operationalSystems: {
    kicker: 'DIGITAL ARCHITECTURE & ENTERPRISE EXECUTION',
    title: 'Engineered For Supply Chain Reliability',
    subtitle:
      'From pre-dispatch planning to terminal handover, our operating system guarantees absolute visibility and control.',
    stages: [
      {
        id: 'stage-1',
        number: '01',
        category: 'ORDER PLACEMENT & FLEET ALLOCATION',
        title: 'Instant Demand Raising & Automated Consignment',
        subtitle:
          'From factory purchase order to dedicated vehicle assignment in under 15 minutes.',
        clientPain:
          'Traditional transport brokers take 6-12 hours just to confirm vehicle availability, causing factory staging congestion.',
        srtcSolution:
          'Our automated allocation engine matches your cargo weight with dedicated 20ft/40ft multi-axle trailers instantly, generating authenticated dockets and e-Way bills before loading starts.',
        specs: [
          'Vehicle Assignment SLA: < 15 Minutes Guaranteed',
          'Documentation: Automated GST & e-Way Bill Linked',
          'Trailer Allocation: Dedicated Multi-Axle Twist-Lock',
          'Pilot Verification: 100% KYC & Commercial License Checked',
        ],
        cardMeta: {
          label: 'ALLOCATED & DISPATCH READY',
          badge: 'STAGE 01',
          route: 'Reliance Hazira -> Sanand Automotive Hub',
          docket: 'SRTC-DKT-2026-9042',
          metric: '< 15 Mins',
          sla: '100% On-Time Allocation',
        },
      },
      {
        id: 'stage-2',
        number: '02',
        category: 'HIGHWAY LINEHAUL & ROUTE GOVERNANCE',
        title: 'Dedicated Express Linehaul & Corridors Protocol',
        subtitle:
          'Pre-assigned industrial green corridors with continuous 24/7 central desk dispatch management.',
        clientPain:
          'Cargo pilferage, unexpected highway detours, and untraceable night halts risk cargo integrity and delay factory schedules.',
        srtcSolution:
          'Strict highway corridor governance across NH-48 and Western freight spines. Dual-driver continuous shifts, speed-governed fleet operations, and 24/7 central desk dispatch monitoring ensure zero unscheduled transit stoppage and guaranteed SLA delivery.',
        specs: [
          'Highway Routing: Pre-Approved Green Corridors',
          'Corridor Governance: Strict Route Protocol • Tollway Priority',
          'Central Command: 24/7/365 Vadodara Operations Desk',
          'Demurrage Risk: 0% Unscheduled Transit Stoppage',
        ],
        cardMeta: {
          label: 'IN TRANSIT • GREEN CORRIDOR',
          badge: 'STAGE 02',
          route: 'NH-48 Golden Quadrilateral Western Spine',
          docket: 'SRTC-CORR-NH48-EXPRESS',
          metric: '58.4 KM/H',
          sla: '24/7 Central Desk Active',
        },
      },
      {
        id: 'stage-3',
        number: '03',
        category: 'PLANT DOCK ARRIVAL & LINE-FEEDING',
        title: 'Precision Factory Bay Scheduling & 45-Min Turnaround',
        subtitle:
          'Pre-intimated plant arrival and dedicated trailer spotting to keep production lines uninterrupted.',
        clientPain:
          'Trucks waiting outside factory gates for hours cause traffic bottlenecks, detention fees, and delayed production line feeding.',
        srtcSolution:
          'Plant gate officers receive automated pre-alerts 2 hours before arrival with exact vehicle details and seal numbers. The trailer moves directly to the designated unloading bay, completing de-stuffing in under 45 minutes.',
        specs: [
          'Pre-Arrival Alert: 120 Mins & 30 Mins Before Gate-In',
          'Average Bay Turnaround: < 45 Minutes Dock Turnaround',
          'Trailer Spotting: Precision Twist-Lock Bay Marshaling',
          'Line-Feeding Status: Zero Factory Assembly Downtime',
        ],
        cardMeta: {
          label: 'AT RECEIVING DOCK',
          badge: 'STAGE 03',
          route: 'Unloading Bay 03 (North Receiving Dock)',
          docket: 'SEAL #SRTC-99412 VERIFIED',
          metric: '< 45 Mins',
          sla: 'Zero Detention Incurred',
        },
      },
      {
        id: 'stage-4',
        number: '04',
        category: 'PAPERLESS CLOSURE & VENDOR RECONCILIATION',
        title: '60-Second Digital e-POD & Audit-Ready Delivery',
        subtitle:
          'Instant mobile unsealing, geo-tagged consignee signatures, and zero paperwork delays for finance teams.',
        clientPain:
          'Finance and billing teams waiting 20-30 days for physical bilties (consignment receipts) to arrive before releasing vendor payments.',
        srtcSolution:
          'As soon as cargo is inspected, our pilot captures geo-tagged container seal photos, receiver sign-offs, and condition timestamps. The verified digital e-POD is uploaded to your client portal within 60 seconds.',
        specs: [
          'e-POD Upload SLA: < 60 Seconds Post-Unloading',
          'Signature Security: Geo-Tagged Receiver Authentication',
          'Audit Retention: 7-Year Bank-Grade Cloud Archival',
          'Payment Cycle: Same-Day Fast Invoice Clearance',
        ],
        cardMeta: {
          label: 'DELIVERED & RECONCILED',
          badge: 'STAGE 04',
          route: 'Verified & Digitally Countersigned',
          docket: 'R. K. Sharma (Materials Manager)',
          metric: '< 60 Secs',
          sla: 'Audit Compliant POD',
        },
      },
    ],
  },
  process: {
    kicker: 'HOW WE DELIVER',
    title: 'Predictable Transit In 4 Simple Steps',
    subtitle:
      'A battle-tested operational workflow engineered to eliminate highway delays and ensure 99.4% SLA adherence.',
    steps: [
      {
        stepNum: '01',
        title: 'Request a Quote',
        desc: 'Share your shipment specifications, cargo requirements, and destination for an instant commercial quote.',
        pill: '15-MIN SLA',
      },
      {
        stepNum: '02',
        title: 'Plan the Shipment',
        desc: 'Route AI maps the most efficient highway corridor, balancing fuel efficiency, road safety, and fast transit.',
        pill: 'ROUTE AI',
      },
      {
        stepNum: '03',
        title: 'Direct Express Linehaul',
        desc: 'Continuous highway linehaul with pre-approved green corridors, dual-driver shifts, and proactive dispatch updates.',
        pill: 'DIRECT LINEHAUL',
      },
      {
        stepNum: '04',
        title: 'Deliver with Confidence',
        desc: 'Safe, punctual delivery backed by strict zero-loss handling protocols and instant digital proof of delivery (e-POD).',
        pill: 'ZERO LOSS',
      },
    ],
  },
  faq: {
    kicker: 'FREQUENTLY ASKED QUESTIONS',
    title: 'Commercial Freight & Linehaul Queries',
    subtitle:
      'Everything corporate shippers need to know about booking, transit safety, fleet capacities, and real-time tracking.',
    items: [
      {
        id: 'faq-1',
        question: 'What types of commercial vehicles and container capacities are available for FTL?',
        answer:
          'SRTC operates an extensive dedicated fleet including 20ft, 32ft, and 40ft high-cube multi-axle trailers, closed container trucks, and specialized heavy haulage flatbeds capable of handling up to 40+ MT payloads across India’s industrial corridors.',
        category: 'Fleet & Capacity',
        badge: '20FT / 32FT / 40FT',
      },
      {
        id: 'faq-2',
        question: 'How do you guarantee cargo safety and zero-loss transit across interstate highways?',
        answer:
          'Every consignment moves under 100% insured transit with dual-driver shifts, 24/7 central desk monitoring, tamper-evident container bolt seals, speed governors, and pre-approved green corridors with zero unscheduled night stoppages.',
        category: 'Safety Protocol',
        badge: 'ZERO-LOSS SLA',
      },
      {
        id: 'faq-3',
        question: 'What is your turnaround SLA for freight booking and vehicle placement?',
        answer:
          'We guarantee commercial vehicle placement and dispatch confirmation within 15 minutes of booking for primary corridors (Gujarat, Maharashtra, Rajasthan, Delhi-NCR) and nationwide linehaul networks.',
        category: 'Booking & SLA',
        badge: '15-MIN PLACEMENT',
      },
      {
        id: 'faq-4',
        question: 'How quickly is the electronic Proof of Delivery (e-POD) made available?',
        answer:
          'Our pilots upload verified digital e-PODs to the client portal within 60 seconds of destination dock handover, complete with geo-tagged consignee signatures, unsealing timestamps, and photographic condition proof.',
        category: 'Digital e-POD',
        badge: '< 60 SEC UPLOAD',
      },
      {
        id: 'faq-5',
        question: 'Which core industrial supply chains does SRTC specialize in?',
        answer:
          'We specialize in petrochemicals (IOCL, Nayara, Reliance, OPaL polymers), agro-commodities & flour mills (Gaay Chhap Besan and FMCG), pharmaceuticals (clean sealed pods), industrial plant machinery, and Tier-1 automotive assemblies.',
        category: 'Industries Served',
        badge: 'PETRO / AGRO / PHARMA',
      },
      {
        id: 'faq-6',
        question: 'Can we track our consignment live, and is a dedicated account manager assigned?',
        answer:
          'Yes, all shipments are integrated with real-time GPS telematics and live geofenced milestone alerts. Additionally, every corporate contract is assigned a dedicated Key Account Manager available 24/7/365.',
        category: 'Live Telematics',
        badge: '24/7 TELEMATICS',
      },
    ],
  },
  values: {
    kicker: 'OUR COMMITMENT & FOUNDATIONAL VALUES',
    title: 'Built on Trust, Safety & Operational Excellence',
    subtitle:
      'Every consignment entrusted to SRTC moves under uncompromised corporate governance, strict safety mandates, and verified sustainability practices.',
    pillars: [
      {
        id: 'safety',
        stepNumber: 1,
        stepLabel: 'Safety',
        title: 'Safety First Protocol',
        badge: 'ZERO-HARM STANDARD',
        desc: 'Advanced telematics, 100% insured cargo transit, and rigorous driver safety audits across every highway mile.',
        metric: '100% Insured',
      },
      {
        id: 'customer',
        stepNumber: 2,
        stepLabel: 'Customer',
        title: 'Customer-Centric Focus',
        badge: 'DEDICATED KEY MGRS',
        desc: 'Tailored enterprise contracts, proactive status notifications, and dedicated single-point-of-contact account managers.',
        metric: '24/7 Response',
      },
      {
        id: 'green',
        stepNumber: 3,
        stepLabel: 'Green',
        title: 'Sustainable Fleet Routing',
        badge: 'ECO-TRANSIT INITIATIVE',
        desc: 'Optimized multi-axle payloads and smart corridor dispatch reducing fuel burn and highway emissions across India.',
        metric: 'BS-VI Fleet',
      },
      {
        id: 'excellence',
        stepNumber: 4,
        stepLabel: 'Excellence',
        title: 'Operational Excellence',
        badge: '99.4% ON-TIME SLA',
        desc: 'Continuous highway operations, disciplined bay marshaling, and zero-defect transit standards honed over 23 years.',
        metric: '99.4% SLA',
      },
    ],
  },
  truckContactCTA: {
    statusText: 'HIGHWAY DISPATCH DESK ACTIVE - 24/7 NATIONWIDE LINEHAUL SUPPORT',
    buttonText: 'Contact Dispatch / Book Linehaul',
    buttonLink: '/contact',
    contactInfo: {
      phone: '+91 9426646095 / +91 9825646095',
      email: 'srtcpvtltd09@gmail.com',
      tagline:
        'D/1101, 11th Floor, PNTC, Times Of India Press Road, Vejalpur, Ahmedabad - 380015',
    },
  },
  isActive: true,
};

const seedHomepageContent = async () => {
  let content = await HomepageContent.findOne({ isActive: true });
  if (!content) {
    content = new HomepageContent(initialHomepageData);
    await content.save();
    console.log('[Seed] Homepage Content created in MongoDB Atlas successfully!');
  } else {
    // Deep update homepage content with brochure data
    content.hero = initialHomepageData.hero;
    content.about = initialHomepageData.about;
    content.services = initialHomepageData.services;
    content.operationalSystems = initialHomepageData.operationalSystems;
    content.process = initialHomepageData.process;
    content.faq = initialHomepageData.faq;
    content.values = initialHomepageData.values;
    content.truckContactCTA = initialHomepageData.truckContactCTA;
    content.markModified('services');
    content.markModified('about');
    content.markModified('hero');
    content.markModified('faq');
    await content.save();
    console.log('[Seed] Homepage Content verified & refreshed in MongoDB Atlas.');
  }
};

const runSeeder = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('[Seed] Connected to Atlas successfully.');

    await seedAdminUser();
    await seedHomepageContent();

    console.log('[Seed] Database seeding completed 100%!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    process.exit(1);
  }
};

runSeeder();

