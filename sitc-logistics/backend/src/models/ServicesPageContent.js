const mongoose = require('mongoose');

const ServicesPageContentSchema = new mongoose.Schema(
  {
    // Section 1: Hero Banner
    hero: {
      backgroundImage: { type: String, default: '/images/hero/hero-truck-cinematic.jpg' },
      title: { type: String, default: 'Our' },
      titleGold: { type: String, default: 'Services' },
      subtitle: {
        type: String,
        default:
          'Comprehensive Transport, Container Linehaul & Scalable Industrial Warehouse Solutions.',
      },
      breadcrumbHome: { type: String, default: 'Home' },
      breadcrumbCurrent: { type: String, default: 'Our Services' },
    },

    // Section 2: Core Transport & Warehouse Solutions (FTL, PTL, Warehouse)
    core: {
      kicker: { type: String, default: '' },
      title: { type: String, default: 'Core Transportation & Warehouse Solutions' },
      description: {
        type: String,
        default:
          'Built upon two decades of logistical leadership, SRTC delivers high-velocity road freight with purpose-built equipment and guaranteed SLA precision.',
      },
      coreServices: [
        {
          id: { type: String, default: '' },
          unitCode: { type: String, default: '' },
          unitType: { type: String, default: '' },
          statusTag: { type: String, default: '' },
          metricBadge: { type: String, default: '' },
          title: { type: String, default: '' },
          category: { type: String, default: '' },
          description: { type: String, default: '' },
          image: { type: String, default: '' },
          icon: { type: String, default: 'Truck' },
          specs: [
            {
              label: { type: String, default: '' },
              val: { type: String, default: '' },
            },
          ],
          features: [{ type: String }],
          ctaText: { type: String, default: 'Deploy FTL Corridor' },
          ctaHref: { type: String, default: '/quote' },
          isFeatured: { type: Boolean, default: false },
          featuredBadge: { type: String, default: '' },
        },
      ],
    },

    // Section 3: Specialized Intermodal Container Architecture (6 Vertical Industries)
    industries: {
      kicker: { type: String, default: 'ENGINEERED CONTAINER ARCHITECTURE' },
      title: { type: String, default: 'Vertical Industry Container Solutions' },
      subtitle: {
        type: String,
        default:
          'From high-cube food-grade dry vans to temperature-monitored reefers, our equipment is certified and configured for India’s premier industrial cargo corridors.',
      },
      industryCards: [
        {
          id: { type: String, default: '' },
          serial: { type: String, default: '' },
          isoCode: { type: String, default: '' },
          title: { type: String, default: '' },
          badge: { type: String, default: '' },
          icon: { type: String, default: 'Layers' },
          image: { type: String, default: '' },
          clients: { type: String, default: '' },
          description: { type: String, default: '' },
          specs: [
            {
              label: { type: String, default: '' },
              val: { type: String, default: '' },
            },
          ],
          highlight: { type: String, default: '' },
          isFeatured: { type: Boolean, default: false },
        },
      ],
    },

    // Section 4: 4-Step Freight Execution Pipeline
    workflow: {
      kicker: { type: String, default: '' },
      title: { type: String, default: 'Streamlined 4-Step Industrial Freight Execution Pipeline' },
      description: {
        type: String,
        default:
          'From instant algorithmic vehicle allocation to geo-fenced electronic seal verification, our operating lifecycle ensures zero demurrage and maximum transit velocity.',
      },
      steps: [
        {
          stepNum: { type: String, default: '01' },
          plateCode: { type: String, default: '' },
          title: { type: String, default: '' },
          tag: { type: String, default: '' },
          desc: { type: String, default: '' },
          icon: { type: String, default: 'FileText' },
          metric: { type: String, default: '' },
        },
      ],
    },

    // Section 5: Enterprise Industrial Partners
    trustClients: {
      kicker: { type: String, default: '' },
      title: { type: String, default: 'Dedicated Highway Fleet: Trusted By Industrial Giants' },
      subtitle: {
        type: String,
        default:
          'SRTC’s compact commercial linehaul fleet in continuous motion across National Highways. Dedicated container trucks transporting petrochemicals, polymers, agro commodities, and heavy industrial freight.',
      },
      stats: [
        {
          num: { type: String, default: '23+' },
          lbl: { type: String, default: 'Years Industry Legacy' },
        },
      ],
      laneEast: [
        {
          id: { type: String, default: '' },
          name: { type: String, default: '' },
          displayName: { type: String, default: '' },
          logo: { type: String, default: '' },
          primaryColor: { type: String, default: '#003366' },
          accentColor: { type: String, default: '#E8B94F' },
          truckModel: { type: String, default: 'Volvo FM 420 Cute Express' },
          trailerType: { type: String, default: '28ft Express Container' },
          cargoType: { type: String, default: 'Polymer Pellets & Petrochemical Freight' },
          corridor: { type: String, default: 'Jamnagar Petrochem Belt ➔ Hazira Port' },
          verifiedSince: { type: String, default: '2008' },
          slaScore: { type: String, default: '99.9%' },
        },
      ],
      laneWest: [
        {
          id: { type: String, default: '' },
          name: { type: String, default: '' },
          displayName: { type: String, default: '' },
          logo: { type: String, default: '' },
          primaryColor: { type: String, default: '#154284' },
          accentColor: { type: String, default: '#E8B94F' },
          truckModel: { type: String, default: 'Tata Ultra T.16 High Cube' },
          trailerType: { type: String, default: '24ft Food-Grade FMCG Container' },
          cargoType: { type: String, default: 'Packaged Food Grade Besan & Flour Distribution' },
          corridor: { type: String, default: 'Ahmedabad Hub ➔ Interstate Retail Corridors' },
          verifiedSince: { type: String, default: '2005' },
          slaScore: { type: String, default: '99.9%' },
        },
      ],
    },

    // Section 6: Fleet CTA
    truckContactCTA: {
      statusText: {
        type: String,
        default: '24/7 NATIONWIDE LINEHAUL FLEET READY FOR DISPATCH',
      },
      buttonText: { type: String, default: 'Request Transport Quote' },
      buttonLink: { type: String, default: '/contact' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ServicesPageContent', ServicesPageContentSchema);

