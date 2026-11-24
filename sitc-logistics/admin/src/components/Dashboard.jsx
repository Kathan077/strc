import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  LayoutDashboard,
  Layers,
  FileText,
  Boxes,
  Workflow,
  HeartHandshake,
  PhoneCall,
  ExternalLink,
  LogOut,
  KeyRound,
  Database,
  CheckCircle2,
  RefreshCw,
  Loader2,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Folder,
  Sparkles,
  BookOpen,
  Send,
  Compass,
  HelpCircle,
  Truck,
  Video,
} from 'lucide-react';
import Toast from './Toast';
import ErrorBoundary from './ErrorBoundary';
import { apiUrl } from '../config/api';

// ================= HOMEPAGE EDITORS =================
import HeroEditor from './HeroEditor';
import AboutEditor from './AboutEditor';
import ServicesEditor from './ServicesEditor';
import OperationsEditor from './OperationsEditor';
import ProcessEditor from './ProcessEditor';
import FaqEditor from './FaqEditor';
import ValuesEditor from './ValuesEditor';
import CtaEditor from './CtaEditor';
import SecurityEditor from './SecurityEditor';

// ================= ABOUT US PAGE EDITORS =================
import AboutHeroEditor from './about/AboutHeroEditor';
import AboutStatsEditor from './about/AboutStatsEditor';
import AboutCompanyEditor from './about/AboutCompanyEditor';
import AboutVisionMissionEditor from './about/AboutVisionMissionEditor';
import AboutProcessEditor from './about/AboutProcessEditor';

// ================= SERVICES PAGE EDITORS =================
import ServicesHeroEditor from './services/ServicesHeroEditor';
import ServicesCoreEditor from './services/ServicesCoreEditor';
import ServicesIndustryEditor from './services/ServicesIndustryEditor';
import ServicesWorkflowEditor from './services/ServicesWorkflowEditor';
import ServicesClientsEditor from './services/ServicesClientsEditor';

// ================= CONTACT US PAGE EDITORS =================
import ContactHeroEditor from './contact/ContactHeroEditor';
import ContactVaultsEditor from './contact/ContactVaultsEditor';
import ContactFormConfigEditor from './contact/ContactFormConfigEditor';

// ================= BLOG & ARTICLES CMS =================
import BlogManager from './blog/BlogManager';

const HOMEPAGE_SECTIONS = [
  { id: 'hero', label: '1. Cinematic Hero Video', icon: Video },
  { id: 'about', label: '2. About Bento & Counters', icon: FileText },
  { id: 'services', label: '3. Multi-Modal Services', icon: Boxes },
  { id: 'operationalSystems', label: '4. Operational Lifecycle', icon: Workflow },
  { id: 'faq', label: '5. Container & Truck FAQs', icon: HelpCircle },
  { id: 'values', label: '6. Corporate Values', icon: HeartHandshake },
  { id: 'truckContactCTA', label: '7. Highway CTA & Contact', icon: PhoneCall },
];

const ABOUT_PAGE_SECTIONS = [
  { id: 'aboutHero', label: '1. Hero & Breadcrumbs', icon: Layers },
  { id: 'aboutStats', label: '2. Transport Stats & Cards', icon: FileText },
  { id: 'aboutCompany', label: '3. Heritage, Collage & Clients', icon: BookOpen },
  { id: 'aboutVisionMission', label: '4. Vision, Mission & Founder', icon: Compass },
  { id: 'aboutProcess', label: '5. 4-Step Freight Wheel Process', icon: RefreshCw },
];

const SERVICES_PAGE_SECTIONS = [
  { id: 'servicesHero', label: '1. Services Hero & Banner', icon: Layers },
  { id: 'servicesCore', label: '2. Core Transport Pillars (FTL, PTL, 3PL)', icon: Boxes },
  { id: 'servicesIndustry', label: '3. Specialized Industry Containers', icon: FileText },
  { id: 'servicesWorkflow', label: '4. 4-Step Execution Pipeline', icon: Workflow },
  { id: 'servicesTrustClients', label: '5. Highway Client Trucks & Moving Fleet', icon: Truck },
];

const CONTACT_PAGE_SECTIONS = [
  { id: 'contactHero', label: '1. Contact Hero & Banner', icon: Layers },
  { id: 'contactVaults', label: '2. 4 Dispatch Vaults (Phone, WA, HQ, Hubs)', icon: PhoneCall },
  { id: 'contactFormConfig', label: '3. Booking Form & CSC Plate Settings', icon: FileText },
];

export default function Dashboard({ user, onLogout }) {
  // Page accordion states
  const [openPages, setOpenPages] = useState({
    homepage: true, // Default open so all 7 homepage sections are visible immediately
    aboutPage: false,
    servicesPage: false,
    contactPage: false,
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [homepageData, setHomepageData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [servicesData, setServicesData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState(null);
  const [toast, setToast] = useState(null);

  const togglePage = (pageKey) => {
    setOpenPages((prev) => ({
      ...prev,
      [pageKey]: !prev[pageKey],
    }));
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch(apiUrl('/api/blogs?all=true'));
      const json = await res.json();
      if (json.success && json.data) {
        setBlogsData(json.data);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  const fetchContent = async () => {
    setLoading(true);
    try {
      // 1. Fetch Homepage
      const resHome = await fetch(apiUrl('/api/homepage'));
      const jsonHome = await resHome.json();
      if (jsonHome.success && jsonHome.data) setHomepageData(jsonHome.data);

      // 2. Fetch About Page
      const resAbout = await fetch(apiUrl('/api/about'));
      const jsonAbout = await resAbout.json();
      if (jsonAbout.success && jsonAbout.data) setAboutData(jsonAbout.data);

      // 3. Fetch Services Page
      const resServices = await fetch(apiUrl('/api/services'));
      const jsonServices = await resServices.json();
      if (jsonServices.success && jsonServices.data) setServicesData(jsonServices.data);

      // 4. Fetch Contact Page
      const resContact = await fetch(apiUrl('/api/contact'));
      const jsonContact = await resContact.json();
      if (jsonContact.success && jsonContact.data) setContactData(jsonContact.data);

      // 5. Fetch Blogs
      await fetchBlogs();
    } catch (err) {
      setToast({ type: 'error', message: 'Network error connecting to API: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Save Homepage Section
  const handleSaveHomepageSection = async (sectionName, sectionPayload) => {
    setSavingSection(sectionName);
    try {
      const token = localStorage.getItem('srtc_admin_token');
      const res = await fetch(apiUrl(`/api/homepage/section/${sectionName}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sectionPayload),
      });

      const result = await res.json();
      if (result.success) {
        setHomepageData((prev) => ({
          ...prev,
          [sectionName]: result.data,
        }));
        setToast({
          type: 'success',
          message: `Homepage '${sectionName.toUpperCase()}' successfully saved to MongoDB Atlas!`,
        });
      } else {
        setToast({
          type: 'error',
          message: result.message || 'Failed to update section',
        });
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: 'Network error while saving: ' + err.message,
      });
    } finally {
      setSavingSection(null);
    }
  };

  // Save About Page Section
  const handleSaveAboutSection = async (sectionName, sectionPayload) => {
    setSavingSection(sectionName);
    try {
      const token = localStorage.getItem('srtc_admin_token');
      const res = await fetch(apiUrl(`/api/about/section/${sectionName}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sectionPayload),
      });

      const result = await res.json();
      if (result.success) {
        setAboutData((prev) => ({
          ...prev,
          [sectionName]: result.data,
        }));
        setToast({
          type: 'success',
          message: `About Us '${sectionName.toUpperCase()}' successfully saved to MongoDB Atlas!`,
        });
      } else {
        setToast({
          type: 'error',
          message: result.message || 'Failed to update section',
        });
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: 'Network error while saving: ' + err.message,
      });
    } finally {
      setSavingSection(null);
    }
  };

  // Save Services Page Section
  const handleSaveServicesSection = async (sectionName, sectionPayload) => {
    setSavingSection(sectionName);
    try {
      const token = localStorage.getItem('srtc_admin_token');
      const res = await fetch(apiUrl(`/api/services/section/${sectionName}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sectionPayload),
      });

      const result = await res.json();
      if (result.success) {
        setServicesData((prev) => ({
          ...prev,
          [sectionName]: result.data,
        }));
        setToast({
          type: 'success',
          message: `Services '${sectionName.toUpperCase()}' successfully saved to MongoDB Atlas!`,
        });
      } else {
        setToast({
          type: 'error',
          message: result.message || 'Failed to update Services section',
        });
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: 'Network error while saving: ' + err.message,
      });
    } finally {
      setSavingSection(null);
    }
  };

  // Save Contact Page Section
  const handleSaveContactSection = async (sectionName, sectionPayload) => {
    setSavingSection(sectionName);
    try {
      const token = localStorage.getItem('srtc_admin_token');
      const res = await fetch(apiUrl(`/api/contact/section/${sectionName}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sectionPayload),
      });

      const result = await res.json();
      if (result.success) {
        setContactData((prev) => ({
          ...prev,
          [sectionName]: result.data,
        }));
        setToast({
          type: 'success',
          message: `Contact '${sectionName.toUpperCase()}' successfully saved to MongoDB Atlas!`,
        });
      } else {
        setToast({
          type: 'error',
          message: result.message || 'Failed to update Contact section',
        });
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: 'Network error while saving: ' + err.message,
      });
    } finally {
      setSavingSection(null);
    }
  };

  // Active section metadata & breadcrumb label
  const isAboutSection = ABOUT_PAGE_SECTIONS.some((s) => s.id === activeSection);
  const isServicesSection = SERVICES_PAGE_SECTIONS.some((s) => s.id === activeSection);
  const isContactSection = CONTACT_PAGE_SECTIONS.some((s) => s.id === activeSection);
  const isBlogSection = activeSection === 'blogs';

  const currentSectionMeta =
    ABOUT_PAGE_SECTIONS.find((s) => s.id === activeSection) ||
    SERVICES_PAGE_SECTIONS.find((s) => s.id === activeSection) ||
    CONTACT_PAGE_SECTIONS.find((s) => s.id === activeSection) ||
    HOMEPAGE_SECTIONS.find((s) => s.id === activeSection) ||
    (activeSection === 'blogs' ? { label: 'Blog & Articles CMS' } : null) ||
    (activeSection === 'security' ? { label: 'Admin Security & Password' } : null);

  const activePageGroupLabel = isAboutSection
    ? 'ABOUT US PAGE'
    : isServicesSection
    ? 'SERVICES PAGE'
    : isContactSection
    ? 'CONTACT US PAGE'
    : isBlogSection
    ? 'KNOWLEDGE HUB'
    : activeSection === 'security'
    ? 'SETTINGS'
    : 'HOMEPAGE';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-deep)' }}>
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* ================= EXECUTIVE NAVY SIDEBAR ================= */}
      <aside
        className="admin-sidebar"
        style={{
          width: '300px',
          background: 'linear-gradient(180deg, #071f33 0%, #0b2f4a 100%)',
          borderRight: '1px solid rgba(232, 185, 79, 0.22)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          boxShadow: '4px 0 24px rgba(7, 31, 51, 0.18)',
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '24px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(232, 185, 79, 0.3) 0%, rgba(7, 31, 51, 0.9) 100%)',
              border: '1.5px solid var(--gold-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(232, 185, 79, 0.25)',
            }}
          >
            <ShieldCheck size={26} color="#e8b94f" />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                fontSize: '1.1rem',
                color: '#ffffff',
                letterSpacing: '0.04em',
              }}
            >
              SRTC ADMIN
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--gold-primary)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Central Console v2.0
            </div>
          </div>
        </div>

        {/* Database Status HUD */}
        <div
          style={{
            padding: '12px 20px',
            background: 'rgba(0, 0, 0, 0.25)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
              }}
            />
            <span style={{ color: '#ffffff', fontWeight: 600 }}>MongoDB Atlas</span>
            <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Cluster0 (westchemist)</span>
          </div>
        </div>

        {/* ================= HIERARCHICAL NAVIGATION TREE ================= */}
        <nav style={{ padding: '20px 14px', flex: 1, overflowY: 'auto' }}>
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '0 8px 12px',
            }}
          >
            WEBSITE PAGES & SECTIONS
          </div>

          {/* ---------------- 1. HOMEPAGE ACCORDION GROUP ---------------- */}
          <div className="nav-page-group">
            <button
              type="button"
              onClick={() => togglePage('homepage')}
              className={`nav-parent-btn ${openPages.homepage ? 'is-open' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FolderOpen size={18} color="var(--gold-primary)" />
                <span>Homepage</span>
                <span
                  style={{
                    background: 'rgba(232, 185, 79, 0.2)',
                    color: 'var(--gold-primary)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  7 Sections
                </span>
              </div>
              {openPages.homepage ? (
                <ChevronDown size={16} color="var(--gold-primary)" />
              ) : (
                <ChevronRight size={16} color="#94a3b8" />
              )}
            </button>

            {openPages.homepage && (
              <div className="nav-sub-list animate-fade-in">
                {HOMEPAGE_SECTIONS.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setActiveSection(sec.id)}
                      className={`nav-sub-item ${isActive ? 'is-active' : ''}`}
                    >
                      <Icon size={15} color={isActive ? 'var(--gold-primary)' : '#94a3b8'} />
                      <span>{sec.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ---------------- 2. ABOUT US PAGE ACCORDION GROUP ---------------- */}
          <div className="nav-page-group">
            <button
              type="button"
              onClick={() => togglePage('aboutPage')}
              className={`nav-parent-btn ${openPages.aboutPage ? 'is-open' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BookOpen size={18} color="var(--gold-primary)" />
                <span>About Us Page</span>
                <span
                  style={{
                    background: 'rgba(232, 185, 79, 0.2)',
                    color: 'var(--gold-primary)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  5 Sections
                </span>
              </div>
              {openPages.aboutPage ? (
                <ChevronDown size={16} color="var(--gold-primary)" />
              ) : (
                <ChevronRight size={16} color="#94a3b8" />
              )}
            </button>

            {openPages.aboutPage && (
              <div className="nav-sub-list animate-fade-in">
                {ABOUT_PAGE_SECTIONS.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setActiveSection(sec.id)}
                      className={`nav-sub-item ${isActive ? 'is-active' : ''}`}
                    >
                      <Icon size={15} color={isActive ? 'var(--gold-primary)' : '#94a3b8'} />
                      <span>{sec.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ---------------- 3. SERVICES PAGE ACCORDION GROUP ---------------- */}
          <div className="nav-page-group">
            <button
              type="button"
              onClick={() => togglePage('servicesPage')}
              className={`nav-parent-btn ${openPages.servicesPage ? 'is-open' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Boxes size={18} color="var(--gold-primary)" />
                <span>Services Page</span>
                <span
                  style={{
                    background: 'rgba(232, 185, 79, 0.2)',
                    color: 'var(--gold-primary)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  4 Sections
                </span>
              </div>
              {openPages.servicesPage ? (
                <ChevronDown size={16} color="var(--gold-primary)" />
              ) : (
                <ChevronRight size={16} color="#94a3b8" />
              )}
            </button>

            {openPages.servicesPage && (
              <div className="nav-sub-list animate-fade-in">
                {SERVICES_PAGE_SECTIONS.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setActiveSection(sec.id)}
                      className={`nav-sub-item ${isActive ? 'is-active' : ''}`}
                    >
                      <Icon size={15} color={isActive ? 'var(--gold-primary)' : '#94a3b8'} />
                      <span>{sec.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ---------------- 4. CONTACT US PAGE ACCORDION GROUP ---------------- */}
          <div className="nav-page-group">
            <button
              type="button"
              onClick={() => togglePage('contactPage')}
              className={`nav-parent-btn ${openPages.contactPage ? 'is-open' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Send size={18} color="var(--gold-primary)" />
                <span>Contact Us Page</span>
                <span
                  style={{
                    background: 'rgba(232, 185, 79, 0.2)',
                    color: 'var(--gold-primary)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  3 Sections
                </span>
              </div>
              {openPages.contactPage ? (
                <ChevronDown size={16} color="var(--gold-primary)" />
              ) : (
                <ChevronRight size={16} color="#94a3b8" />
              )}
            </button>

            {openPages.contactPage && (
              <div className="nav-sub-list animate-fade-in">
                {CONTACT_PAGE_SECTIONS.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setActiveSection(sec.id)}
                      className={`nav-sub-item ${isActive ? 'is-active' : ''}`}
                    >
                      <Icon size={15} color={isActive ? 'var(--gold-primary)' : '#94a3b8'} />
                      <span>{sec.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ---------------- 5. BLOG ARTICLES HUB ---------------- */}
          <div className="nav-page-group" style={{ marginTop: '4px' }}>
            <button
              type="button"
              onClick={() => setActiveSection('blogs')}
              className={`nav-parent-btn ${activeSection === 'blogs' ? 'is-open' : ''}`}
              style={{
                background: activeSection === 'blogs' ? 'rgba(232, 185, 79, 0.22)' : 'transparent',
                borderColor: activeSection === 'blogs' ? 'rgba(232, 185, 79, 0.5)' : 'transparent',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={18} color="var(--gold-primary)" />
                <span>Blog Articles Hub</span>
                <span
                  style={{
                    background: 'rgba(232, 185, 79, 0.2)',
                    color: 'var(--gold-primary)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  {blogsData.length} Posts
                </span>
              </div>
            </button>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '14px 0' }} />

          {/* ---------------- 5. ADMIN SECURITY & PASSWORD ---------------- */}
          <button
            type="button"
            onClick={() => setActiveSection('security')}
            className={`nav-parent-btn ${activeSection === 'security' ? 'is-open' : ''}`}
            style={{
              background: activeSection === 'security' ? 'rgba(232, 185, 79, 0.22)' : 'transparent',
              borderColor: activeSection === 'security' ? 'rgba(232, 185, 79, 0.5)' : 'transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <KeyRound size={17} color={activeSection === 'security' ? 'var(--gold-primary)' : '#94a3b8'} />
              <span>Admin Security</span>
            </div>
          </button>
        </nav>

        {/* Footer Actions */}
        <div
          style={{
            padding: '16px 14px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(0, 0, 0, 0.25)',
          }}
        >
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: 600,
              textDecoration: 'none',
              marginBottom: '10px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--gold-primary)';
              e.currentTarget.style.color = 'var(--gold-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.color = '#ffffff';
            }}
          >
            <ExternalLink size={14} />
            <span>Open Public Website</span>
          </a>

          <button
            type="button"
            onClick={onLogout}
            className="btn-danger"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', padding: '9px' }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT WORKSPACE ================= */}
      <div className="admin-workspace" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: '100vh' }}>
        {/* Crisp Pure White Topbar with Hierarchical Breadcrumbs */}
        <header
          className="admin-topbar"
          style={{
            height: '70px',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 4px 20px rgba(7, 31, 51, 0.04)',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '2px',
              }}
            >
              <span>SRTC CMS</span>
              <span>/</span>
              <span style={{ color: 'var(--gold-primary)' }}>{activePageGroupLabel}</span>
              <span>/</span>
              <span>{currentSectionMeta?.label || activeSection}</span>
            </div>

            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-primary)' }}>
              {currentSectionMeta?.label || 'Content Editor'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              type="button"
              onClick={fetchContent}
              disabled={loading}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
              title="Refresh from MongoDB"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh Content</span>
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 14px',
                borderRadius: '10px',
                background: '#f8fafc',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e8b94f 0%, #c4962c 100%)',
                  color: '#0b2f4a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  boxShadow: '0 2px 6px rgba(232, 185, 79, 0.3)',
                }}
              >
                SA
              </div>
              <div style={{ fontSize: '0.82rem' }}>
                <div style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>
                  {user?.name || 'Administrator'}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{user?.email}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main style={{ padding: '32px', flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
          {loading && !homepageData && !aboutData && !servicesData && !contactData ? (
            <div
              style={{
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
              }}
            >
              <Loader2 size={38} color="var(--gold-primary)" className="animate-spin" />
              <div style={{ color: 'var(--navy-primary)', fontWeight: 600, fontSize: '0.94rem' }}>
                Fetching live content from MongoDB Atlas...
              </div>
            </div>
          ) : (
            <ErrorBoundary>
              {/* ================= HOMEPAGE SECTION EDITORS ================= */}
              {activeSection === 'hero' && (
                <HeroEditor
                  key={`hero-${homepageData?._id || 'init'}`}
                  initialData={homepageData?.hero}
                  onSave={handleSaveHomepageSection}
                  isSaving={savingSection === 'hero'}
                />
              )}
              {activeSection === 'about' && (
                <AboutEditor
                  key={`about-${homepageData?._id || 'init'}`}
                  initialData={homepageData?.about}
                  onSave={handleSaveHomepageSection}
                  isSaving={savingSection === 'about'}
                />
              )}
              {activeSection === 'services' && (
                <ServicesEditor
                  key={`services-${homepageData?._id || 'init'}`}
                  initialData={homepageData?.services}
                  onSave={handleSaveHomepageSection}
                  isSaving={savingSection === 'services'}
                />
              )}
              {activeSection === 'operationalSystems' && (
                <OperationsEditor
                  key={`operationalSystems-${homepageData?._id || 'init'}`}
                  initialData={homepageData?.operationalSystems}
                  onSave={handleSaveHomepageSection}
                  isSaving={savingSection === 'operationalSystems'}
                />
              )}
              {activeSection === 'process' && (
                <ProcessEditor
                  key={`process-${homepageData?._id || 'init'}`}
                  initialData={homepageData?.process}
                  onSave={handleSaveHomepageSection}
                  isSaving={savingSection === 'process'}
                />
              )}
              {activeSection === 'faq' && (
                <FaqEditor
                  key={`faq-${homepageData?._id || 'init'}`}
                  initialData={homepageData?.faq}
                  onSave={handleSaveHomepageSection}
                  isSaving={savingSection === 'faq'}
                />
              )}
              {activeSection === 'values' && (
                <ValuesEditor
                  key={`values-${homepageData?._id || 'init'}`}
                  initialData={homepageData?.values}
                  onSave={handleSaveHomepageSection}
                  isSaving={savingSection === 'values'}
                />
              )}
              {activeSection === 'truckContactCTA' && (
                <CtaEditor
                  key={`truckContactCTA-${homepageData?._id || 'init'}`}
                  initialData={homepageData?.truckContactCTA}
                  onSave={handleSaveHomepageSection}
                  isSaving={savingSection === 'truckContactCTA'}
                />
              )}

              {/* ================= ABOUT US PAGE SECTION EDITORS ================= */}
              {activeSection === 'aboutHero' && (
                <AboutHeroEditor
                  key={`aboutHero-${aboutData?._id || 'init'}`}
                  initialData={aboutData?.hero}
                  onSave={handleSaveAboutSection}
                  isSaving={savingSection === 'hero'}
                />
              )}
              {activeSection === 'aboutStats' && (
                <AboutStatsEditor
                  key={`aboutStats-${aboutData?._id || 'init'}`}
                  initialData={aboutData?.stats}
                  onSave={handleSaveAboutSection}
                  isSaving={savingSection === 'stats'}
                />
              )}
              {activeSection === 'aboutCompany' && (
                <AboutCompanyEditor
                  key={`aboutCompany-${aboutData?._id || 'init'}`}
                  initialData={aboutData?.company}
                  onSave={handleSaveAboutSection}
                  isSaving={savingSection === 'company'}
                />
              )}
              {activeSection === 'aboutVisionMission' && (
                <AboutVisionMissionEditor
                  key={`aboutVisionMission-${aboutData?._id || 'init'}`}
                  initialData={aboutData?.visionMission}
                  onSave={handleSaveAboutSection}
                  isSaving={savingSection === 'visionMission'}
                />
              )}
              {activeSection === 'aboutProcess' && (
                <AboutProcessEditor
                  key={`aboutProcess-${aboutData?._id || 'init'}`}
                  initialData={aboutData?.process}
                  onSave={handleSaveAboutSection}
                  isSaving={savingSection === 'process'}
                />
              )}

              {/* ================= SERVICES PAGE SECTION EDITORS ================= */}
              {activeSection === 'servicesHero' && (
                <ServicesHeroEditor
                  key={`servicesHero-${servicesData?._id || 'init'}`}
                  initialData={servicesData?.hero}
                  onSave={handleSaveServicesSection}
                  isSaving={savingSection === 'hero'}
                />
              )}
              {activeSection === 'servicesCore' && (
                <ServicesCoreEditor
                  key={`servicesCore-${servicesData?._id || 'init'}`}
                  initialData={servicesData?.core}
                  onSave={handleSaveServicesSection}
                  isSaving={savingSection === 'core'}
                />
              )}
              {activeSection === 'servicesIndustry' && (
                <ServicesIndustryEditor
                  key={`servicesIndustry-${servicesData?._id || 'init'}`}
                  initialData={servicesData?.industries}
                  onSave={handleSaveServicesSection}
                  isSaving={savingSection === 'industries'}
                />
              )}
              {activeSection === 'servicesWorkflow' && (
                <ServicesWorkflowEditor
                  key={`servicesWorkflow-${servicesData?._id || 'init'}`}
                  initialData={servicesData?.workflow}
                  onSave={handleSaveServicesSection}
                  isSaving={savingSection === 'workflow'}
                />
              )}
              {activeSection === 'servicesTrustClients' && (
                <ServicesClientsEditor
                  key={`servicesTrustClients-${servicesData?._id || 'init'}`}
                  initialData={servicesData?.trustClients}
                  onSave={handleSaveServicesSection}
                  isSaving={savingSection === 'trustClients'}
                />
              )}

              {/* ================= CONTACT US PAGE SECTION EDITORS ================= */}
              {activeSection === 'contactHero' && (
                <ContactHeroEditor
                  key={`contactHero-${contactData?._id || 'init'}`}
                  initialData={contactData?.hero}
                  onSave={handleSaveContactSection}
                  isSaving={savingSection === 'hero'}
                />
              )}
              {activeSection === 'contactVaults' && (
                <ContactVaultsEditor
                  key={`contactVaults-${contactData?._id || 'init'}`}
                  initialData={contactData}
                  onSave={handleSaveContactSection}
                  isSaving={savingSection === 'vaults'}
                />
              )}
              {activeSection === 'contactFormConfig' && (
                <ContactFormConfigEditor
                  key="contactFormConfig"
                  initialData={contactData?.bookingFormConfig}
                  onSave={handleSaveContactSection}
                  isSaving={savingSection === 'bookingFormConfig'}
                />
              )}

              {/* ================= BLOG ARTICLES CMS ================= */}
              {activeSection === 'blogs' && (
                <BlogManager
                  blogs={blogsData}
                  onRefresh={fetchBlogs}
                  setToast={setToast}
                />
              )}

              {/* ================= ADMIN SECURITY ================= */}
              {activeSection === 'security' && (
                <SecurityEditor
                  onPasswordChanged={() => {
                    setToast({ type: 'success', message: 'Admin password successfully updated!' });
                  }}
                />
              )}
            </ErrorBoundary>
          )}
        </main>
      </div>
    </div>
  );
}
