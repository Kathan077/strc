require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const ServicesPageContent = require('../models/ServicesPageContent');

const servicesSeedData = {
  hero: {
    backgroundImage: '/images/hero/hero-truck-cinematic.jpg',
    title: 'Our',
    titleGold: 'Services',
    subtitle:
      'Logistics & Warehouse Handling Services. Delivering Reliability, Speed, and Value Every Single Time.',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Our Services',
  },
  core: {
  
    title: 'Core Logistics & Warehouse Solutions',
    description:
      'We specialize in FTL (Full Truck Load), PTL (Part Truck Load), small packages, superfast cargo, warehousing, and contract logistics, ensuring reliable and on-time delivery through a strong network and professional team.',
    coreServices: [
      {
        id: 'ftl',
        badgeText: 'FULL TRUCK LOAD',
        unitCode: 'SRTC // FTL-01',
        unitType: 'FULL TRUCK LOAD',
        statusTag: 'DIRECT PLANT CORRIDOR',
        metricBadge: '42 TONS MAX GVW',
        title: 'Full Truck Load (FTL)',
        tagline: 'Dedicated End-to-End Linehaul Deployment',
        category: 'DEDICATED FLEET DEPLOYMENT',
        description:
          'Dedicated point-to-point vehicle deployment engineered for heavy industrial manufacturers, refineries, and petrochemical producers. Consignments are allocated exclusively to single company-owned heavy linehaul vehicles with guaranteed zero mid-route transshipment, ensuring maximum cargo safety and non-stop highway transit across critical freight corridors.',
        image: '/images/services/service-truck-1.jpg',
        icon: 'Truck',
        specs: [
          { label: 'Payload Capacity', val: '16 to 42 Metric Tons (GVW)' },
          { label: 'Vehicle Types', val: 'Volvo FM, BharatBenz & Multi-Axle' },
          { label: 'Container Mandate', val: '24ft, 28ft, 32ft High-Cube Steel' },
          { label: 'Transit Security', val: 'AIS-140 GPS & Digital E-Seals' },
        ],
        features: [
          'Dedicated vehicle allocated exclusively to a single consignor',
          'Direct refinery, port & plant evacuation with zero transshipment',
          'Non-stop highway corridor transit with trained commercial pilots',
          'Real-time GPS telematics with 24/7 control room surveillance',
        ],
        ctaText: 'Inquire FTL Fleet',
        ctaHref: '/contact',
        isFeatured: true,
        featuredBadge: 'HIGH CAPACITY',
      },
      {
        id: 'ptl',
        badgeText: 'PART TRUCK LOAD',
        unitCode: 'SRTC // PTL-02',
        unitType: 'PART TRUCK LOAD',
        statusTag: 'DAILY SCHEDULED DEPARTURE',
        metricBadge: 'SUPERFAST CARGO',
        title: 'Part Truck Load (PTL)',
        tagline: 'Consolidated Freight & Superfast Cargo Parcels',
        category: 'CONSOLIDATED FREIGHT & PARCELS',
        description:
          'Cost-optimized consolidated highway logistics engineered for partial consignments, regional commercial distribution, and urgent small packages. Operating on scheduled daily departures across Gujarat and national transport nodes, PTL maximizes volumetric efficiency while delivering express linehaul speed and complete shipment visibility.',
        image: '/images/services/service-truck-2.jpg',
        icon: 'Package',
        specs: [
          { label: 'Consignment Size', val: '50 Kg to 12 Metric Tons' },
          { label: 'Departure Schedule', val: 'Daily Fixed Evening Linehaul' },
          { label: 'Consolidation Grid', val: 'Hub & Spoke Network Routing' },
          { label: 'Handling Mandate', val: 'Zero-Damage Stacking & Palletizing' },
        ],
        features: [
          'Economical shared capacity with flexible pay-per-weight pricing',
          'Daily scheduled linehaul departures with strict arrival SLAs',
          'Door-to-door express pickup and last-mile delivery available',
          'Full compliance with highway safety rules and digital e-Way bills',
        ],
        ctaText: 'Book PTL Cargo',
        ctaHref: '/contact',
        isFeatured: false,
        featuredBadge: '',
      },
      {
        id: 'warehousing',
        badgeText: 'WAREHOUSING',
        unitCode: 'SRTC // WAREHOUSE-03',
        unitType: 'WAREHOUSE HANDLING',
        statusTag: 'OPERATIONAL 24/7',
        metricBadge: 'GRADE-A STORAGE',
        title: 'Warehousing & Storage',
        tagline: 'Grade-A Strategic Inventory & Distribution Hubs',
        category: 'CONTRACT LOGISTICS & STORAGE',
        description:
          'Modern, scalable, technology-driven warehousing and contract logistics facilities strategically positioned along key industrial corridors and port links. We provide climate-controlled staging, automated inventory management, high-density racking, and seamless multi-modal transshipment to eliminate logistics bottlenecks for corporate enterprises.',
        image: '/images/services/service-truck-3.jpg',
        icon: 'Warehouse',
        specs: [
          { label: 'Facility Grade', val: 'Grade-A Industrial Warehousing Hubs' },
          { label: 'Handling Equipment', val: 'Hydraulic Docks, Reach Trucks & WMS' },
          { label: 'Security & Access', val: '24/7 High-Definition CCTV & Biometric' },
          { label: 'Contract Models', val: 'Flexible 3PL, Dedicated & Shared Space' },
        ],
        features: [
          'Strategic locations near major state highways, ports & freight corridors',
          'Dedicated cargo handling, sorting, palletizing and cross-docking',
          'Customized inventory staging with digital barcoding and tracking',
          '24/7 operational surveillance with fire suppression compliance',
        ],
        ctaText: 'Inquire Warehouse Space',
        ctaHref: '/contact',
        isFeatured: false,
        featuredBadge: '',
      },
    ],
  },
  industries: {
    kicker: '',
    title: 'Industry Sectors We Serve',
    subtitle:
      'Tailored transportation and handling solutions engineered for India’s premier commercial and industrial sectors.',
    industryCards: [
      {
        id: 'engineering',
        serial: 'SRTC-ENGINEERING',
        isoCode: 'HEAVY FABRICATION',
        title: 'Engineering',
        badge: 'HEAVY MACHINERY',
        icon: 'Wrench',
        image: '/images/industries/engineering.jpg',
        clients: 'ENGINEERING PLANTS, MACHINERY & TURNKEY PROJECTS',
        description:
          'Specialized heavy-duty road haulage for precision engineering assemblies, plant machinery, turbines, power equipment, CNC machines, fabricated steel, and capital project cargo across India.',
        specs: [
          { label: 'FLEET CONFIG', val: 'Low-Bed, Semi-Low-Bed & Multi-Axle Trailers' },
          { label: 'PAYLOAD RATING', val: 'Heavy Engineering Loads up to 35-42 Metric Tons' },
          { label: 'LASHING PROTOCOL', val: 'High-Tensile Steel Tie-Downs & Weight Distribution Certification' },
        ],
        highlight: 'Two decades of zero-damage heavy engineering linehaul discipline across Gujarat and national industrial spines.',
        isFeatured: false,
      },
      {
        id: 'manufacturer',
        serial: 'SRTC-MANUFACTURING',
        isoCode: 'PLANT LOGISTICS',
        title: 'Manufacturer',
        badge: 'PRODUCTION LINE INFEED',
        icon: 'Factory',
        image: '/images/industries/manufacturer.jpg',
        clients: 'MANUFACTURING PLANTS & HEAVY FACTORIES',
        description:
          'Integrated manufacturing supply chain support — managing inbound raw material infeed to factory production lines and outbound finished goods evacuation.',
        specs: [
          { label: 'SERVICE TYPE', val: 'Just-In-Time (JIT) Factory Dock Infeed' },
          { label: 'EQUIPMENT FLEET', val: 'Heavy Multi-Axle Dedicated Trailers' },
          { label: 'TURNAROUND SLA', val: 'Zero Factory Gate Stoppage Mandate' },
        ],
        highlight: 'Dedicated fleet deployment ensuring seamless factory operations without supply chain bottlenecks.',
        isFeatured: false,
      },
      {
        id: 'industrial',
        serial: 'SRTC-INDUSTRIAL',
        isoCode: 'HEAVY EQUIPMENT',
        title: 'Industrial',
        badge: 'HEAVY HAULAGE',
        icon: 'Cpu',
        image: '/images/industries/industrial.jpg',
        clients: 'INDUSTRIAL & ENGINEERING ENTERPRISES',
        description:
          'Engineered road transportation for industrial hardware, heavy machinery, engineering assemblies, structural steel, and plant equipment across India.',
        specs: [
          { label: 'FLEET CONFIG', val: 'Multi-Axle High-Strength Heavy Trailers' },
          { label: 'PAYLOAD RATING', val: 'Up to 38-42 Metric Tons' },
          { label: 'SAFETY COMPLIANCE', val: 'High-Tensile Securing & Full Road Compliance' },
        ],
        highlight: 'Two decades of proven heavy haulage discipline across Gujarat and national highway spines.',
        isFeatured: false,
      },
      {
        id: 'chemical',
        serial: 'SRTC-CHEMICALS',
        isoCode: 'SPECIALTY CHEMICALS',
        title: 'Chemical',
        badge: 'SAFETY CERTIFIED',
        icon: 'FlaskConical',
        image: '/images/industries/chemical.jpg',
        clients: 'CHEMICAL PLANTS, DYES, RESINS & SOLVENTS',
        description:
          'Dedicated, safety-certified transportation for specialty chemicals, pigments, industrial dyes, non-hazardous intermediate compounds, and bulk chemical bags from major chemical corridors.',
        specs: [
          { label: 'CONTAINMENT', val: 'Secondary Spill-Containment Ready & Weather-Proof Beds' },
          { label: 'PACKAGING SPEC', val: 'Certified Handling for IBC Containers, Steel Drums & Palletized Bags' },
          { label: 'KEY CORRIDORS', val: 'Dahej, Ankleshwar, Vapi & Hazira to Major Industrial Corridors' },
        ],
        highlight: 'Strict adherence to industrial transport safety and driver emergency response compliance.',
        isFeatured: false,
      },
      {
        id: 'pharmaceuticals',
        serial: 'SRTC-PHARMA',
        isoCode: 'HEALTHCARE POD',
        title: 'Pharmaceuticals',
        badge: 'SEALED & SECURE',
        icon: 'Thermometer',
        image: '/images/industries/pharmaceuticals.jpg',
        clients: 'PHARMA & HEALTHCARE ENTERPRISES',
        description:
          'High-security, weather-sealed cargo transit for active pharmaceutical ingredients (APIs), formulations, healthcare supplies, and sensitive consignments.',
        specs: [
          { label: 'POD GRADE', val: '100% Sealed Weather-Proof Containers' },
          { label: 'CARGO INTEGRITY', val: 'Zero Dust Ingress & Tamper-Evident Seals' },
          { label: 'TRACKING SLA', val: '24/7 Real-Time GPS Highway Visibility' },
        ],
        highlight: 'Dedicated sealed freight protecting critical medical supply chains nationwide.',
        isFeatured: false,
      },
      {
        id: 'food-beverages',
        serial: 'SRTC-FOOD-BEVERAGES',
        isoCode: 'FOOD GRADE',
        title: 'Food & Beverages',
        badge: 'HYGIENE SEALED',
        icon: 'Utensils',
        image: '/images/industries/food-beverages.jpg',
        clients: 'GAAY CHHAP BESAN (SHREE BHAGAWATI FLOUR & FOODS)',
        description:
          'Hygiene-compliant, weather-sealed transport for flour mills, packaged foods, spices, grains, and FMCG agro-distribution networks.',
        specs: [
          { label: 'CONTAINER SPEC', val: '40ft High Cube Moisture-Proof Dry Vans' },
          { label: 'SANITATION', val: 'Certified Clean, Odorless, Food-Grade' },
          { label: 'LONGTIME CLIENT', val: 'Gaay Chhap Besan (Decade-Long Trust)' },
        ],
        highlight: 'Primary transit carrier for Gujarat’s leading flour & besan brands.',
        isFeatured: true,
      },
      {
        id: 'polymers',
        serial: 'SRTC-POLYMERS',
        isoCode: 'PETROCHEMICAL BULK',
        title: 'Polymers',
        badge: 'HIGH-VOLUME BULK',
        icon: 'Layers',
        image: '/images/industries/polymers.jpg',
        clients: 'IOCL / NAYARA ENERGY / RELIANCE / OPAL / HMEL',
        description:
          'High-capacity bulk container transport engineered for polymer pellets, resins, HDPE, and petrochemical supply chains from premier refinery hubs.',
        specs: [
          { label: 'REFINERY CORRIDORS', val: 'Jamnagar, Dahej & Hazira Complexes' },
          { label: 'PAYLOAD RATING', val: '18 to 26 Metric Tons Multi-Axle' },
          { label: 'ESTEEMED CLIENTS', val: 'Indian Oil, Nayara, Reliance, OPaL, HMEL' },
        ],
        highlight: 'High-volume refinery evacuation with proven multi-axle bulk safety.',
        isFeatured: false,
      },
      {
        id: 'furniture',
        serial: 'SRTC-FURNITURE',
        isoCode: 'COMMERCIAL INTERIORS',
        title: 'Furniture',
        badge: 'SCRATCH-PROOF TRANSIT',
        icon: 'Armchair',
        image: '/images/industries/furniture.jpg',
        clients: 'MODULAR OFFICE FURNITURE & LUXURY INTERIOR BRANDS',
        description:
          'High-volume volumetric transport designed for commercial office setups, modular wooden and metal furniture, luxury home furnishings, and flat-pack retail fixtures with zero-scratch handling.',
        specs: [
          { label: 'CONTAINER TYPE', val: '40ft High-Cube High-Volume Weather-Sealed Containers' },
          { label: 'PROTECTION', val: 'Heavy Quilted Blanketing, Corner Protectors & Soft Straps' },
          { label: 'DELIVERY MODEL', val: 'Factory Direct to Corporate Campuses & Flagship Showrooms' },
        ],
        highlight: 'Volumetric cubic capacity optimization with dedicated damage-free transit guarantees.',
        isFeatured: false,
      },
      {
        id: 'cosmetics',
        serial: 'SRTC-COSMETICS',
        isoCode: 'PERSONAL CARE',
        title: 'Cosmetics',
        badge: 'MOISTURE SEALED',
        icon: 'Sparkles',
        image: '/images/industries/cosmetics.jpg',
        clients: 'BEAUTY, COSMETICS & PERSONAL CARE BRANDS',
        description:
          'Ultra-clean, temperature-buffered, and moisture-sealed container logistics for premium cosmetics, skincare formulations, hair care products, toiletries, and high-value beauty consumer goods.',
        specs: [
          { label: 'POD INTEGRITY', val: 'Certified Dust-Proof, Odorless & High-Sanitation Dry Vans' },
          { label: 'SECURITY PROTOCOL', val: 'Tamper-Evident High-Security Bolt Seals & Traceability' },
          { label: 'DISTRIBUTION', val: 'Scheduled Fast-Track Infeed to Central Hubs & Retail Chains' },
        ],
        highlight: 'Pristine packaging integrity ensuring cartons arrive in 100% shelf-ready retail condition.',
        isFeatured: false,
      },
    ],
  },
  workflow: {
    kicker: '',
    title: 'Streamlined 4-Step Industrial Freight Execution Pipeline',
    description:
      'From instant vehicle allocation to electronic seal verification, our operating lifecycle ensures zero demurrage and maximum transit velocity.',
    steps: [
      {
        stepNum: '01',
        plateCode: 'GJ-01-SRTC-01',
        title: 'Consignment Booking & Fleet Allocation',
        tag: 'DISPATCH PLANNING',
        desc: 'Direct requirement confirmation, load-to-vehicle allocation, and corridor route planning with trained drivers.',
        icon: 'FileText',
        metric: '< 15 Mins Allocation',
      },
      {
        stepNum: '02',
        plateCode: 'GJ-01-SRTC-02',
        title: 'Secure Loading & Digital Verification',
        tag: 'TERMINAL GATE-IN',
        desc: 'Weight verification, cargo securing, digital e-Way bill linkage, and tamper-evident container sealing.',
        icon: 'ShieldCheck',
        metric: '100% Sealed & Insured',
      },
      {
        stepNum: '03',
        plateCode: 'GJ-01-SRTC-03',
        title: 'Dedicated Express Linehaul',
        tag: 'HIGHWAY TRANSIT',
        desc: 'Continuous highway haulage with strict traffic compliance, dual-driver shifts, and 24/7 central tracking.',
        icon: 'Truck',
        metric: '24/7 Live Monitoring',
      },
      {
        stepNum: '04',
        plateCode: 'GJ-01-SRTC-04',
        title: 'Punctual Delivery & Instant e-POD',
        tag: 'TERMINAL DELIVERY',
        desc: 'Safe destination arrival, dock unloading, and instant electronic proof of delivery (e-POD) verification.',
        icon: 'CheckCircle',
        metric: 'Guaranteed On-Time',
      },
    ],
  },
  trustClients: {
    kicker: 'PDF BROCHURE: OUR TOP CLIENTS',
    title: 'Dedicated Highway Fleet: Trusted By Industrial Giants',
    subtitle:
      'SRTC’s compact commercial linehaul fleet in continuous motion across National Highways. Dedicated container trucks transporting petrochemicals, polymers, agro commodities, and heavy industrial freight.',
    stats: [
      { num: '23+', lbl: 'Years Industry Legacy' },
      { num: '100%', lbl: 'Insured Cargo Transit' },
      { num: '840+', lbl: 'Commercial Linehaul Fleet' },
      { num: '99.8%', lbl: 'On-Time SLA Delivery' },
    ],
    laneEast: [
      {
        id: 'reliance',
        name: 'Reliance Industries Limited',
        displayName: 'Reliance Industries',
        logo: '/images/clients/real/reliance.png',
        primaryColor: '#003366',
        accentColor: '#D32F2F',
        truckModel: 'Volvo FM 420 Cute Express',
        trailerType: '28ft Express Container',
        cargoType: 'Polymer Pellets & Petrochemical Freight',
        corridor: 'Jamnagar Petrochem Belt ➔ Hazira Port',
        verifiedSince: '2008',
        slaScore: '99.9%',
      },
      {
        id: 'indianoil',
        name: 'Indian Oil Corporation',
        displayName: 'IndianOil (IOCL)',
        logo: '/images/clients/real/indianoil.png',
        primaryColor: '#F37021',
        accentColor: '#0B2545',
        truckModel: 'Tata Signa City Express',
        trailerType: '24ft Weatherproof Container',
        cargoType: 'Refined Bulk Polymers & Industrial Lube Packs',
        corridor: 'Koyali Refinery ➔ Designated Regional Depots',
        verifiedSince: '2011',
        slaScore: '99.8%',
      },
      {
        id: 'nayara',
        name: 'Nayara Energy',
        displayName: 'Nayara Energy',
        logo: '/images/clients/real/nayara.png',
        primaryColor: '#004F71',
        accentColor: '#00A3E0',
        truckModel: 'Scania P360 Urban Hauler',
        trailerType: '28ft High Cube Container',
        cargoType: 'Specialized Polymers & Downstream Energy',
        corridor: 'Vadinar Refinery ➔ Hazira SEZ',
        verifiedSince: '2014',
        slaScore: '99.7%',
      },
      {
        id: 'ongc',
        name: 'Oil & Natural Gas Corporation',
        displayName: 'ONGC',
        logo: '/images/clients/real/ongc.png',
        primaryColor: '#A72B2A',
        accentColor: '#F59E0B',
        truckModel: 'BharatBenz 2823R Energy Liner',
        trailerType: '26ft Industrial Rig Container',
        cargoType: 'Industrial Valves & Energy Hardware',
        corridor: 'Ankleshwar Assets ➔ Hazira Logistics Base',
        verifiedSince: '2009',
        slaScore: '99.8%',
      },
    ],
    laneWest: [
      {
        id: 'gaay-besan',
        name: 'Gaay Chhap Besan',
        displayName: 'Gaay Chhap Besan',
        logo: '/images/clients/real/gaay-besan.png',
        primaryColor: '#D32F2F',
        accentColor: '#F59E0B',
        truckModel: 'Eicher Pro 3019 Clean Food Carrier',
        trailerType: '24ft Food-Grade FMCG Container',
        cargoType: 'Packaged Food Grade Besan & Flour Distribution',
        corridor: 'Ahmedabad Hub ➔ Interstate Retail Corridors',
        verifiedSince: '2005',
        slaScore: '99.9%',
      },
      {
        id: 'hpcl',
        name: 'Hindustan Petroleum Corporation',
        displayName: 'Hindustan Petroleum',
        logo: '/images/clients/real/hpcl.png',
        primaryColor: '#154284',
        accentColor: '#DE2010',
        truckModel: 'Volvo FM 380 Clean Linehaul',
        trailerType: '28ft Insulated Lube Container',
        cargoType: 'Packed Industrial Lubricants & Petroleum Goods',
        corridor: 'Mumbai / Vadodara ➔ Gujarat Industrial Belts',
        verifiedSince: '2007',
        slaScore: '99.8%',
      },
      {
        id: 'opal',
        name: 'ONGC Petro additions Limited',
        displayName: 'OPaL',
        logo: '/images/clients/real/opal.png',
        primaryColor: '#851A1D',
        accentColor: '#0D9488',
        truckModel: 'Tata Ultra T.16 High Cube',
        trailerType: '24ft Polymer Heavy Container',
        cargoType: 'High-Density Polyethylene & Polypropylene',
        corridor: 'Dahej SEZ Complex ➔ Major Industrial Belts',
        verifiedSince: '2015',
        slaScore: '99.9%',
      },
      {
        id: 'hmel',
        name: 'HPCL-Mittal Energy Limited',
        displayName: 'HMEL',
        logo: '/images/clients/real/hmel.png',
        primaryColor: '#1B4D3E',
        accentColor: '#0A2540',
        truckModel: 'Scania G410 Cute Liner',
        trailerType: '28ft High Cube Specialized Liner',
        cargoType: 'Petrochemical Polymers & Specialty Plastics',
        corridor: 'Bathinda Refinery / Gujarat ➔ Export Ports',
        verifiedSince: '2013',
        slaScore: '99.8%',
      },
    ],
  },
  truckContactCTA: {
    statusText: 'CENTRAL DISPATCH DESK ACTIVE • 24/7 DEDICATED FREIGHT SUPPORT',
    buttonText: 'Contact Dispatch / Book Linehaul',
    buttonLink: '/contact',
  },
};

async function seedServices() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGODB_URI not set');

    console.log('Connecting to MongoDB Atlas for Services...');
    await mongoose.connect(mongoUri);

    let doc = await ServicesPageContent.findOne();
    if (!doc) {
      doc = new ServicesPageContent(servicesSeedData);
      await doc.save();
      console.log('ServicesPageContent created successfully!');
    } else {
      Object.assign(doc, servicesSeedData);
      await doc.save();
      console.log('ServicesPageContent updated with 100% brochure-aligned data!');
    }

    await mongoose.disconnect();
    console.log('Services seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Services seeding failed:', err.message);
    process.exit(1);
  }
}

seedServices();
