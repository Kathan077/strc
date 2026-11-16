import { Sparkles, Layers } from 'lucide-react';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import ProcessSection from '../components/home/ProcessSection';
import ValuesSection from '../components/home/ValuesSection';

const brandColors = [
  { name: 'Deep Navy Blue', hex: '#0B2F4A', role: 'Hero, Navbar & Headings', darkText: false },
  { name: 'Premium Gold', hex: '#E8B94F', role: 'Primary CTAs & Brand Accent', darkText: true },
  { name: 'Pure White', hex: '#FFFFFF', role: 'Content & Card Backgrounds', darkText: true, border: '#E3E8ED' },
  { name: 'Logistics Blue', hex: '#07557A', role: 'Sub-headings & Tech Icons', darkText: false },
  { name: 'Light Gold', hex: '#FFF1A8', role: 'Subtle Highlights & Badges', darkText: true, border: '#E8B94F' },
  { name: 'Soft Grey', hex: '#F4F6F8', role: 'Alternate Section Ground', darkText: true, border: '#E3E8ED' },
  { name: 'Body Text', hex: '#263746', role: 'Corporate Copy Legibility', darkText: false },
  { name: 'Footer Dark', hex: '#071F33', role: 'Footer & Deep Ground', darkText: false },
  { name: 'Border Grey', hex: '#E3E8ED', role: 'Dividers & Subtle Outlines', darkText: true, border: '#CBD5E1' },
];

const brandGradients = [
  { name: 'Navy Gradient', gradient: 'linear-gradient(120deg, #0B2F4A 0%, #07557A 100%)', label: '#0B2F4A → #07557A' },
  { name: 'Gold Gradient', gradient: 'linear-gradient(120deg, #E8B94F 0%, #FFF1A8 100%)', label: '#E8B94F → #FFF1A8' },
  { name: 'Light Gradient', gradient: 'linear-gradient(120deg, #FFFFFF 0%, #F4F6F8 100%)', label: '#FFFFFF → #F4F6F8', border: '#E3E8ED' },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Ultra Pro-Level Animated Hero Showcase */}
      <Hero />

      {/* 2. Signature Sculpted Bento About Section */}
      <AboutSection />

      {/* 3. Ultra-Unique Multi-Modal Services Command Console */}
      <ServicesSection />

      {/* 4. Streamlined 4-Step Delivery Process (How We Deliver) */}
      <ProcessSection />

      {/* 5. The Principles That Drive Us (Signature Values Showcase) */}
      <ValuesSection />

      {/* Brand Theme & Color System Showcase (Pure White Section) */}
      <section
        id="brand-system"
        data-section-name="BRAND IDENTITY"
        style={{
          backgroundColor: '#FFFFFF',
          padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(0.85rem, 3.5vw, 1.5rem)',
          borderBottom: '1px solid #E3E8ED',
          overflow: 'hidden',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        <div className="container" style={{ maxWidth: '1160px', margin: '0 auto', padding: 0 }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: 'clamp(0.72rem, 2vw, 0.8rem)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#0B2F4A',
                backgroundColor: '#FFF1A8',
                padding: '0.35rem 0.95rem',
                borderRadius: '9999px',
                border: '1px solid #E8B94F',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={14} color="#0B2F4A" />
              Official Brand Identity
            </span>

            <h2 style={{ fontSize: 'clamp(1.45rem, 4.2vw, 2.5rem)', color: '#0B2F4A', marginBottom: '0.85rem', lineHeight: 1.22 }}>
              Premium Navy Blue & Gold <span style={{ color: '#E8B94F' }}>Color System</span>
            </h2>

            <p style={{ color: '#263746', fontSize: 'clamp(0.85rem, 2.2vw, 1.025rem)', lineHeight: 1.62, margin: 0 }}>
              The finalized brand color system engineered for SRTC & SITC Logistics. Deep Navy Blue provides corporate authority, Premium Gold conveys trust and prestige, and Pure White delivers clarity and legibility.
            </p>
          </div>

          {/* 9 Core Swatches (Fully fluid responsive grid for 320px, 375px, 425px, 768px) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
              gap: 'clamp(0.75rem, 2vw, 1.25rem)',
              marginBottom: '2.5rem',
            }}
          >
            {brandColors.map((item) => (
              <div
                key={item.hex}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E3E8ED',
                  padding: 'clamp(0.75rem, 2vw, 1rem)',
                  boxShadow: '0 2px 8px rgba(11, 47, 74, 0.05)',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    height: '48px',
                    borderRadius: '8px',
                    backgroundColor: item.hex,
                    border: item.border ? `1.5px solid ${item.border}` : 'none',
                    marginBottom: '0.75rem',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)',
                  }}
                />
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#0B2F4A', marginBottom: '0.2rem' }}>
                  {item.name}
                </strong>
                <code style={{ fontSize: '0.75rem', color: '#07557A', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  {item.hex}
                </code>
                <span style={{ fontSize: '0.72rem', color: '#5A6E82', lineHeight: 1.35, display: 'block' }}>
                  {item.role}
                </span>
              </div>
            ))}
          </div>

          {/* 3 Official Gradients */}
          <div
            style={{
              backgroundColor: '#F4F6F8',
              borderRadius: '16px',
              border: '1px solid #E3E8ED',
              padding: 'clamp(1rem, 3vw, 2rem)',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Layers size={18} color="#0B2F4A" />
              <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: '#0B2F4A', margin: 0, fontWeight: 700 }}>
                Official Brand Gradients
              </h3>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                gap: 'clamp(0.75rem, 2vw, 1.25rem)',
              }}
            >
              {brandGradients.map((grad) => (
                <div
                  key={grad.name}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E3E8ED',
                    padding: 'clamp(0.75rem, 2vw, 1rem)',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      height: '48px',
                      borderRadius: '8px',
                      background: grad.gradient,
                      border: grad.border ? `1px solid ${grad.border}` : 'none',
                      marginBottom: '0.75rem',
                    }}
                  />
                  <strong style={{ fontSize: '0.85rem', color: '#0B2F4A', display: 'block' }}>
                    {grad.name}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: '#5A6E82' }}>
                    {grad.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
