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
        kicker: 'HEAVY COMMERCIAL INFRASTRUCTURE · REGIONAL LINEHAUL',
        titleLine1: 'PRECISION',
        titleLine2: 'LINEHAUL',
        titleLine3: 'LOGISTICS',
        description:
          'Customized Full Truck Load and Part Truck Load transit designed for Polymers, Agro, Pharma, and Heavy Industrial enterprises across key industrial corridors.',
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
          'Live geofenced lane tracking, digital proof of delivery, and proactive exception handling across 28+ regional transit hubs.',
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
    titleLine1: 'Reliable',
    highlightText: 'Logistics & Warehouse',
    titleLine2: 'Handling Services.',
    description:
      'SRTC Supply Chain Pvt. Ltd. delivers modern, technology-driven, end-to-end logistics and warehousing solutions across Gujarat and regional industrial corridors. Specializing in dedicated Full Truck Load (FTL), Part Truck Load (PTL), specialized container haulage, and scalable warehousing, we ensure secure, punctual, and transparent freight movement for industrial enterprises.',
    image: '/images/about/srtc-blue-container-truck.jpg',
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
          'Dedicated point-to-point heavy commercial transport across primary industrial corridors.',
        tag: 'FTL Freight',
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
        category: 'Heavy Engineering',
        title: 'Engineering',
        description:
          'Specialized heavy-duty road haulage for precision engineering assemblies, plant machinery, turbines, power equipment, CNC machines, fabricated steel, and capital project cargo across India.',
        badge: 'SRTC-ENGINEERING',
        image: '/images/industries/engineering.jpg',
        specs: ['Low-Bed & Multi-Axle Trailers', 'High-Tensile Lashing & Tie-Downs'],
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
        image: '/images/industries/manufacturer.jpg',
        specs: ['Dedicated Multi-Axle Fleet', 'Zero Stoppage JIT'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
      {
        id: 'container-3',
        category: 'Heavy Haulage',
        title: 'Industrial',
        description:
          'Engineered transport for industrial equipment, precision engineering assemblies, structural steel, and plant machinery across key industrial corridors.',
        badge: 'SRTC-INDUSTRIAL',
        image: '/images/industries/industrial.jpg',
        specs: ['Heavy Multi-Axle Trailers', '100% Traffic Compliant'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
      {
        id: 'container-4',
        category: 'Chemical Supply Chain',
        title: 'Chemical',
        description:
          'Dedicated, safety-certified transportation for specialty chemicals, pigments, industrial dyes, non-hazardous intermediate compounds, and bulk chemical bags from major chemical corridors.',
        badge: 'SRTC-CHEMICALS',
        image: '/images/industries/chemical.jpg',
        specs: ['Secondary Spill Containment', 'IBC Containers & Palletized Drums'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
      {
        id: 'container-5',
        category: 'Healthcare',
        title: 'Pharmaceuticals',
        description:
          'Clean, secure, time-critical transportation for active pharmaceutical ingredients (APIs), formulations, and healthcare supplies.',
        badge: 'SRTC-PHARMA',
        image: '/images/industries/pharmaceuticals.jpg',
        specs: ['Sealed Weather-Proof Pods', 'GPS Real-Time Tracking'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
      {
        id: 'container-6',
        category: 'Agro & Food',
        title: 'Food & Beverages',
        description:
          'Hygiene-compliant, weather-sealed transport for flour mills, packaged foods, spices, grains, and FMCG agro-distribution networks.',
        badge: 'SRTC-FOOD-BEVERAGES',
        image: '/images/industries/food-beverages.jpg',
        specs: ['GAAY CHHAP BESAN', 'Food-Grade Certified Containers'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
      {
        id: 'container-7',
        category: 'Petrochemicals',
        title: 'Polymers',
        description:
          'High-capacity bulk container transport engineered for polymer pellets, resins, HDPE, and petrochemical supply chains from refinery complexes.',
        badge: 'SRTC-POLYMERS',
        image: '/images/industries/polymers.jpg',
        specs: ['IOCL / NAYARA / RELIANCE / OPAL', 'High-Volume Bulk Multi-Axle'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
      {
        id: 'container-8',
        category: 'Commercial Interiors',
        title: 'Furniture',
        description:
          'High-volume volumetric transport designed for commercial office setups, modular wooden and metal furniture, luxury home furnishings, and flat-pack retail fixtures with zero-scratch handling.',
        badge: 'SRTC-FURNITURE',
        image: '/images/industries/furniture.jpg',
        specs: ['High-Cube Volumetric Containers', 'Scratch-Proof Quilted Blanketing'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
      {
        id: 'container-9',
        category: 'Personal Care',
        title: 'Cosmetics',
        description:
          'Ultra-clean, temperature-buffered, and moisture-sealed container logistics for premium cosmetics, skincare formulations, hair care products, toiletries, and high-value beauty consumer goods.',
        badge: 'SRTC-COSMETICS',
        image: '/images/industries/cosmetics.jpg',
        specs: ['Dust-Proof & Moisture-Sealed Pods', 'Tamper-Evident High-Security Seals'],
        ctaText: 'Explore System Spec',
        ctaLink: '/services',
      },
    ],
  },
  operationalSystems: {
    kicker: 'HOW WE WORK • TRANSPARENT LOGISTICS PROCESS',
    title: 'Our Step-by-Step Freight & Transportation Process',
    subtitle:
      'From initial vehicle allocation to dock handover, every consignment moves through an accountable, verified operational workflow built on two decades of Gujarat linehaul excellence.',
    stages: [
      {
        id: 'stage-1',
        number: '01',
        stepTag: 'CONSIGNMENT BOOKING',
        category: 'CONSIGNMENT BOOKING',
        title: 'Freight Requirement & Vehicle Allocation',
        subtitle: 'Fast consignment assessment and direct vehicle assignment.',
        description:
          'Consignor shares cargo specifications (volume, tonnage, and delivery node). We allocate dedicated vehicles (FTL, PTL, or heavy multi-axle trailers) from our fleet with immediate dispatch scheduling.',
        highlight: 'Immediate vehicle allocation & confirmed reporting schedule',
        icon: 'ClipboardCheck',
        meta: 'Immediate Vehicle Allocation',
        specs: ['Vehicle Assignment: Dedicated Fleet', 'Fleet: 20ft/40ft Multi-Axle'],
      },
      {
        id: 'stage-2',
        number: '02',
        stepTag: 'LOADING & COMPLIANCE',
        category: 'LOADING & COMPLIANCE',
        title: 'Dock Loading, Securing & Documentation',
        subtitle: 'Expert industrial dock securing and verified transit paperwork.',
        description:
          'Loading supervised by trained staff with high-tensile lashing, weight distribution, and weather-proof sealing. Full paperwork compliance with verified E-Way Bill and Bilty (LR).',
        highlight: 'Zero-damage lashing & 100% transit paperwork clearance',
        icon: 'Boxes',
        meta: 'E-Way Bill & Bilty Linked',
        specs: ['Lashing: High-Tensile Steel Tie-Downs', 'Compliance: 100% Tax & E-Way Ready'],
      },
      {
        id: 'stage-3',
        number: '03',
        stepTag: 'HIGHWAY TRANSIT',
        category: 'HIGHWAY TRANSIT',
        title: 'Dedicated Corridor Transit & GPS Tracking',
        subtitle: 'Direct industrial corridor linehaul with 24/7 route governance.',
        description:
          'Direct point-to-point transit via national arterial highway spines with zero mid-route transshipment. Professional verified drivers and continuous 24/7 central desk tracking.',
        highlight: 'Direct highway linehaul with continuous 24/7 route tracking',
        icon: 'Truck',
        meta: 'Continuous 24/7 Route Tracking',
        specs: ['Highway Corridors: NH-48 & National Spines', 'Transit: Zero Transshipment Guarantee'],
      },
      {
        id: 'stage-4',
        number: '04',
        stepTag: 'DESTINATION DELIVERY',
        category: 'DESTINATION DELIVERY',
        title: 'Safe Dock Handover & Signed POD',
        subtitle: 'Prompt dock arrival, physical verification, and instant e-POD handover.',
        description:
          'Direct arrival at receiving bay, supervised unloading, and physical verification in the presence of receiver staff, followed by instant signed Proof of Delivery (e-POD).',
        highlight: 'Verified physical cargo handover & same-day signed POD',
        icon: 'FileCheck2',
        meta: 'Signed e-POD Handover',
        specs: ['Delivery: Direct Receiving Bay', 'POD: Verified Paperless e-POD Handover'],
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
    title: 'Commercial Freight & Logistics FAQs',
    subtitle:
      'Key answers to common questions about freight booking, fleet availability, cargo safety, and transit tracking.',
    items: [
      {
        id: 'faq-1',
        question: 'Which routes and industrial regions does SRTC primarily serve?',
        answer:
          'We provide direct point-to-point Full Truck Load (FTL) and Part Truck Load (PTL) transportation across Gujarat, Maharashtra, Rajasthan, and key regional industrial corridors connecting major manufacturing hubs, ICDs, and warehouses.',
        category: 'Routes & Network',
        badge: '',
      },
      {
        id: 'faq-2',
        question: 'What types of commercial vehicles and container sizes are available?',
        answer:
          'Our fleet includes 20ft, 32ft, and 40ft closed containers, heavy multi-axle trailers, and open trucks suitable for industrial machinery, FMCG, chemicals, polymers, and commercial goods.',
        category: 'Fleet & Capacity',
        badge: '',
      },
      {
        id: 'faq-3',
        question: 'How do you ensure cargo safety and damage prevention during transit?',
        answer:
          'Consignments are loaded under trained dock supervision with industrial strapping, lashing, and weather-proof container sealing. Shipments move directly via verified long-haul drivers with no mid-route transshipment.',
        category: 'Cargo Safety',
        badge: '',
      },
      {
        id: 'faq-4',
        question: 'How can shippers track consignment status during transit?',
        answer:
          'All fleet vehicles are GPS-equipped. Our 24/7 central dispatch desk provides regular milestone updates and location confirmation directly via phone and WhatsApp.',
        category: 'Transit Tracking',
        badge: '',
      },
      {
        id: 'faq-5',
        question: 'What is the procedure for Bilty (LR) and Proof of Delivery (POD)?',
        answer:
          'We issue verified Bilty (LR) and E-Way bills at dispatch. Upon destination dock unloading, duly signed physical and digital Proof of Delivery (POD) are handed over promptly.',
        category: 'Documentation & POD',
        badge: '',
      },
    ],
  },
  values: {
    image: '/images/values/srtc-blue-linehaul-truck.jpg',
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
    statusText: 'SRTC CENTRAL FREIGHT DISPATCH // ACTIVE FLEET',
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

