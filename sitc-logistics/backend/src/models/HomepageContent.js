const mongoose = require('mongoose');

const HomepageContentSchema = new mongoose.Schema(
  {
    hero: {
      videoUrl: { type: String, default: '/videos/video_no_logo_clean.mp4' },
      slides: [
        {
          kicker: { type: String, default: '' },
          titleLine1: { type: String, default: '' },
          titleLine2: { type: String, default: '' },
          titleLine3: { type: String, default: '' },
          description: { type: String, default: '' },
          ctaPrimary: {
            text: { type: String, default: 'Explore Transport Solutions' },
            link: { type: String, default: '/services' },
          },
          ctaSecondary: {
            text: { type: String, default: 'Request Linehaul Quote' },
            link: { type: String, default: '/contact' },
          },
          image: { type: String, default: '' },
          stats: [
            {
              num: { type: String, default: '' },
              label: { type: String, default: '' },
            },
          ],
        },
      ],
    },
    about: {
      kicker: { type: String, default: 'ABOUT SRTC LOGISTICS' },
      titleLine1: { type: String, default: 'Engineering India\'s Most Reliable' },
      highlightText: { type: String, default: 'High-Velocity Linehaul' },
      titleLine2: { type: String, default: 'Supply Chain Corridors' },
      description: { type: String, default: '' },
      ctaText: { type: String, default: 'Learn More About Us' },
      ctaLink: { type: String, default: '/about' },
      image: { type: String, default: '/images/about/srtc-blue-container-truck.jpg' },
      tabCard1: {
        label: { type: String, default: 'Industry Experience' },
        stat: { type: String, default: '23+ Years' },
        sub: { type: String, default: 'Est. 2003 by Menandbhai' },
      },
      tabCard2: {
        label: { type: String, default: 'Freight Network' },
        stat: { type: String, default: 'Largest' },
        sub: { type: String, default: 'Privately Owned Fleets' },
      },
      stats: {
        shipments: { type: Number, default: 50000 },
        corridors: { type: Number, default: 28 },
        fleet: { type: Number, default: 850 },
        sla: { type: Number, default: 99.4 },
      },
      capabilities: [
        {
          id: { type: String, default: '' },
          title: { type: String, default: '' },
          detail: { type: String, default: '' },
          tag: { type: String, default: '' },
        },
      ],
    },
    services: {
      kicker: { type: String, default: 'PRECISION SERVICES & SPECIALIZED FLEET' },
      title: { type: String, default: 'Integrated Logistics Infrastructure' },
      subtitle: {
        type: String,
        default: 'Purpose-built transportation solutions engineered for critical industries across India.',
      },
      serviceCards: [
        {
          id: { type: String, default: '' },
          category: { type: String, default: '' },
          title: { type: String, default: '' },
          description: { type: String, default: '' },
          badge: { type: String, default: '' },
          image: { type: String, default: '' },
          specs: [{ type: String }],
          ctaText: { type: String, default: 'View Service Details' },
          ctaLink: { type: String, default: '/services' },
        },
      ],
    },
    operationalSystems: {
      kicker: { type: String, default: 'DIGITAL ARCHITECTURE & ENTERPRISE EXECUTION' },
      title: { type: String, default: 'Engineered For Supply Chain Reliability' },
      subtitle: {
        type: String,
        default: 'From pre-dispatch planning to terminal handover, our operating system guarantees absolute visibility and control.',
      },
      stages: [
        {
          id: { type: String, default: '' },
          number: { type: String, default: '' },
          category: { type: String, default: '' },
          stepTag: { type: String, default: '' },
          title: { type: String, default: '' },
          subtitle: { type: String, default: '' },
          description: { type: String, default: '' },
          highlight: { type: String, default: '' },
          icon: { type: String, default: 'ClipboardCheck' },
          meta: { type: String, default: '' },
          clientPain: { type: String, default: '' },
          srtcSolution: { type: String, default: '' },
          specs: [{ type: String }],
          cardMeta: {
            label: { type: String, default: '' },
            badge: { type: String, default: '' },
            route: { type: String, default: '' },
            docket: { type: String, default: '' },
            metric: { type: String, default: '' },
            sla: { type: String, default: '' },
          },
        },
      ],
    },
    process: {
      kicker: { type: String, default: 'HOW WE DELIVER' },
      title: { type: String, default: 'Predictable Transit In 4 Simple Steps' },
      subtitle: {
        type: String,
        default: 'A battle-tested operational workflow engineered to eliminate highway delays and ensure 99.4% SLA adherence.',
      },
      steps: [
        {
          stepNum: { type: String, default: '' },
          title: { type: String, default: '' },
          desc: { type: String, default: '' },
          pill: { type: String, default: '' },
        },
      ],
    },
    faq: {
      kicker: { type: String, default: 'FREQUENTLY ASKED QUESTIONS' },
      title: { type: String, default: 'Commercial Freight & Linehaul Queries' },
      subtitle: {
        type: String,
        default: 'Everything corporate shippers need to know about booking, transit safety, fleet capacities, and real-time tracking.',
      },
      items: [
        {
          id: { type: String, default: '' },
          question: { type: String, default: '' },
          answer: { type: String, default: '' },
          category: { type: String, default: 'FTL Transit' },
          badge: { type: String, default: '' },
        },
      ],
    },
    values: {
      image: { type: String, default: '/images/values/srtc-blue-linehaul-truck.jpg' },
      title: { type: String, default: 'Built on Trust, Safety & Operational Excellence' },
      subtitle: {
        type: String,
        default: 'Every consignment entrusted to SRTC moves under uncompromised corporate governance, strict safety mandates, and verified sustainability practices.',
      },
      pillars: [
        {
          id: { type: String, default: '' },
          stepNumber: { type: Number, default: 1 },
          stepLabel: { type: String, default: '' },
          title: { type: String, default: '' },
          badge: { type: String, default: '' },
          desc: { type: String, default: '' },
          metric: { type: String, default: '' },
        },
      ],
    },
    truckContactCTA: {
      statusText: {
        type: String,
        default: 'SRTC CENTRAL FREIGHT DISPATCH // ACTIVE FLEET',
      },
      buttonText: { type: String, default: 'Contact Dispatch / Book Linehaul' },
      buttonLink: { type: String, default: '/contact' },
      contactInfo: {
        phone: { type: String, default: '+91 98251 64095' },
        email: { type: String, default: 'dispatch@srtclogistics.com' },
        tagline: {
          type: String,
          default: 'Enterprise logistics contracts and scheduled linehaul inquiries answered within 15 minutes.',
        },
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HomepageContent', HomepageContentSchema);

