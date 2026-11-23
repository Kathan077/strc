const mongoose = require('mongoose');

const AboutPageContentSchema = new mongoose.Schema(
  {
    // Section 1: Hero Banner
    hero: {
      backgroundImage: { type: String, default: '/images/hero/hero-truck-cinematic.jpg' },
      title: { type: String, default: 'About' },
      titleGold: { type: String, default: 'SRTC Logistics' },
      subtitle: {
        type: String,
        default:
          'Two Decades of Heavy Freight Mastery, Port Evacuation & Guaranteed SLA Industrial Corridors.',
      },
      breadcrumbHome: { type: String, default: 'Home' },
      breadcrumbCurrent: { type: String, default: 'About Us' },
    },

    // Section 2: Transport Stats & Chamfered Overview
    stats: {
      kicker: { type: String, default: 'HIGH-VELOCITY ROAD FREIGHT' },
      title: { type: String, default: 'Digital & Trusted Transport Logistic Company' },
      description: {
        type: String,
        default:
          'Pioneering technology-driven road transport, real-time GPS tracking, and guaranteed zero-demurrage turnaround across key corridors.',
      },
      image: { type: String, default: '/images/about/srtc-dryport-terminal.jpg' },
      imageAlt: {
        type: String,
        default: 'SRTC Inland Container Depot Dry Port Freight Logistics Terminal',
      },
      ctaText: { type: String, default: 'Request A Quote!' },
      ctaLink: { type: String, default: '/contact' },
      statCards: [
        {
          id: { type: String, default: '' },
          title: { type: String, default: '' },
          number: { type: String, default: '' },
          icon: { type: String, default: 'History' },
          description: { type: String, default: '' },
          variant: { type: String, default: 'white' }, // 'white' | 'gold' | 'navy'
          delay: { type: String, default: '80ms' },
        },
      ],
    },

    // Section 3: Company Heritage, Collage & Industrial Clients
    company: {
      eyebrowText: { type: String, default: '' },
      title: { type: String, default: 'Our services increase the' },
      titleAccent: { type: String, default: 'velocity & productivity' },
      titleSuffix: { type: String, default: 'of your supply chain.' },
      leadText: {
        type: String,
        default:
          'Shree Ram Transportation Corporation, founded in 2003 by Mr. Menandbhai Odedara, has set road logistics benchmarks across major industrial corridors for over two decades. Building on this legacy, SRTC Supply Chain Pvt. Ltd. commands 840+ heavy commercial vehicles delivering scalable FTL, container haulage, and warehouse handling for premier industrial leaders.',
      },
      imgSupervisor: { type: String, default: '/images/about/operations-supervisor.jpg' },
      ribbonTag: { type: String, default: 'ESTD. 2003' },
      ribbonText: { type: String, default: '23+ Years Experience' },
      imgTruck: { type: String, default: '/images/about/srtc-highway-truck.jpg' },
      sealLabel: { type: String, default: 'BEST ROAD FREIGHT' },
      sealSub: { type: String, default: 'SRTC FLEET' },
      imgDetail: { type: String, default: '/images/about/highway-truck-detail.jpg' },
      milestones: [
        {
          year: { type: String, default: '' },
          title: { type: String, default: '' },
          icon: { type: String, default: 'Calendar' },
          highlight: { type: String, default: '' },
          description: { type: String, default: '' },
          delay: { type: String, default: '220ms' },
        },
      ],
      topClients: [{ type: String }],
      actionBtnText: { type: String, default: 'Explore Fleet Services' },
      actionBtnLink: { type: String, default: '/services' },
      phoneLabel: { type: String, default: 'Call Central Dispatch:' },
      phoneNumber: { type: String, default: '+91 9426646095' },
      phoneTel: { type: String, default: 'tel:+919426646095' },
    },

    // Section 4: Strategic Compass (Vision, Mission & Founder Strip)
    visionMission: {
      kicker: { type: String, default: 'STRATEGIC COMPASS & CORPORATE PURPOSE' },
      title: { type: String, default: 'Driven by Mission, Powered by Vision' },
      subtitle: {
        type: String,
        default:
          'Founded on two decades of heavy highway transit leadership, our corporate compass guides every haul, secures every industrial cargo, and powers enterprise supply chains.',
      },
      mission: {
        docId: { type: String, default: 'DOC: MSN-2003 / REV-04' },
        barcodeText: { type: String, default: '||||||| 2003 840 994' },
        badge: { type: String, default: 'OPERATIONAL ROADMAP' },
        seal: { type: String, default: 'SEAL: SRTC-MSN-2003' },
        title: { type: String, default: 'Our Mission' },
        tagline: { type: String, default: "Revolutionizing India's Transportation Landscape" },
        paragraph: {
          type: String,
          default:
            'Our mission is to revolutionize the transportation landscape by delivering seamless, eco-friendly, and technology-advanced transport solutions. We are dedicated to enhancing mobility, reducing environmental impact, and providing exceptional service across all our operations with full traffic compliance and rigorously trained driver staff.',
        },
        pillars: [
          {
            icon: { type: String, default: 'Leaf' },
            title: { type: String, default: '' },
            desc: { type: String, default: '' },
          },
        ],
        specs: {
          payload: { type: String, default: '32,500 KG' },
          corridors: { type: String, default: '180+ EXPRESS' },
          compliance: { type: String, default: '100% REGULATORY' },
        },
      },
      vision: {
        docId: { type: String, default: 'DOC: VSN-2030 / REV-02' },
        barcodeText: { type: String, default: '||||||| 2030 180 001' },
        badge: { type: String, default: 'STRATEGIC HORIZON' },
        seal: { type: String, default: 'SEAL: SRTC-VSN-2030' },
        title: { type: String, default: 'Our Vision' },
        tagline: { type: String, default: 'Foremost & Most Preferred Transportation Enterprise' },
        paragraph: {
          type: String,
          default:
            "Our vision and dream is to become Gujarat’s foremost and India's most promising transport service with cutting-edge digital technology. Our core vision is to delight customers, set industry benchmarks in highway safety, and remain the nation’s most trusted freight and linehaul partner.",
        },
        pillars: [
          {
            icon: { type: String, default: 'Award' },
            title: { type: String, default: '' },
            desc: { type: String, default: '' },
          },
        ],
        specs: {
          horizon: { type: String, default: 'INDUSTRY LEADERSHIP' },
          activeFleet: { type: String, default: '840+ HEAVY TRUCKS' },
          reliability: { type: String, default: '23+ YEARS PROVEN' },
        },
      },
      chassisCommitments: [
        {
          icon: { type: String, default: 'Truck' },
          label: { type: String, default: '' },
          sub: { type: String, default: '' },
        },
      ],
      founderStrip: {
        avatar: { type: String, default: '/images/about/menand-odedara-founder.jpg' },
        badge: { type: String, default: 'FOUNDER' },
        quote: {
          type: String,
          default:
            '“Our commitment is simple yet unwavering: to deliver reliability, speed, and tangible value every single time our trucks hit the highway. Technology empowers our drivers, and trust drives our journey.”',
        },
        name: { type: String, default: 'MENAND BALUBHAI ODEDARA' },
        role: {
          type: String,
          default: 'Founder & Managing Director — Shree Ram Transportation Corporation',
        },
        btnText: { type: String, default: 'View Haulage Services' },
        btnLink: { type: String, default: '/services' },
      },
    },

    // Section 5: 4-Step Freight Wheel Process Lifecycle
    process: {
      kicker: { type: String, default: 'HOW IT WORKS • 4-STEP FREIGHT LIFECYCLE' },
      title: { type: String, default: 'Simple, Transparent &' },
      titleGold: { type: String, default: 'Precision-Driven.' },
      description: {
        type: String,
        default:
          'From instant freight allocation to zero-demurrage gate delivery, our heavy linehaul fleet moves your cargo across 180+ express corridors with guaranteed SLA precision.',
      },
      steps: [
        {
          number: { type: String, default: '01' },
          km: { type: String, default: 'KM 00' },
          terminal: { type: String, default: 'DISPATCH HUB' },
          icon: { type: String, default: 'CalendarCheck' },
          badge: { type: String, default: '15-Min Allocation' },
          title: { type: String, default: 'Booking & Dispatch' },
          tagline: { type: String, default: 'Instant Rate & Fleet Allocation' },
          desc: { type: String, default: '' },
          tireModel: { type: String, default: 'SRTC LINEHAUL 295/80 R22.5' },
          tireSpec: { type: String, default: 'STEEL BELTED RADIAL • TUBELESS • 152/148M' },
        },
      ],
    },

    // Section 6: Highway Fleet CTA
    truckContactCTA: {
      statusText: {
        type: String,
        default: '24/7 NATIONWIDE LINEHAUL FLEET READY FOR DISPATCH',
      },
      buttonText: { type: String, default: 'Initiate Urgent Fleet Request' },
      buttonLink: { type: String, default: '/contact' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AboutPageContent', AboutPageContentSchema);

