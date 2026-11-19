import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from '@/data/blogData';
import TruckContactCTA from '@/components/home/TruckContactCTA';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Tag,
} from 'lucide-react';
import './blog-detail.css';

export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function fetchPost(slug) {
  try {
    const res = await fetch(`${API_BASE}/api/blogs/${slug}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) return json.data;
    }
  } catch (err) {
    console.error(`[API Fetch Error] Failed to fetch blog ${slug}:`, err.message);
  }
  return getPostBySlug(slug) || null;
}

async function fetchRelated(currentSlug) {
  try {
    const res = await fetch(`${API_BASE}/api/blogs`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data.filter((p) => p.slug !== currentSlug).slice(0, 3);
      }
    }
  } catch (err) {
    console.error('[API Fetch Error] Failed to fetch related blogs:', err.message);
  }
  return getRelatedPosts(currentSlug, 3);
}

// Pre-render all blog slugs statically for instant performance & SEO
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE}/api/blogs`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        return json.data.map((post) => ({ slug: post.slug }));
      }
    }
  } catch (err) {}
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Generate dynamic metadata for Google SEO & social sharing
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    return {
      title: 'Article Not Found | SRTC Logistics',
    };
  }

  const coverUrl = post.coverImage?.startsWith('http')
    ? post.coverImage
    : `https://srtclogistics.com${post.coverImage}`;

  return {
    title: `${post.title} | SRTC Logistics`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://srtclogistics.com/blog/${post.slug}`,
      siteName: 'SRTC Logistics',
      type: 'article',
      publishedTime: post.isoDate,
      authors: [post.author?.name || 'SRTC Logistics'],
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [coverUrl],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await fetchRelated(slug);

  const coverUrl = post.coverImage?.startsWith('http')
    ? post.coverImage
    : `https://srtclogistics.com${post.coverImage}`;

  // Article JSON-LD Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: coverUrl,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'SRTC Logistics',
      jobTitle: post.author?.role || 'Logistics Advisory Desk',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SRTC Logistics',
      logo: {
        '@type': 'ImageObject',
        url: 'https://srtclogistics.com/images/logo/srtc-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://srtclogistics.com/blog/${post.slug}`,
    },
  };

  return (
    <article className="srtc-article-page">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* 1. Header & Title Hero */}
      <header className="srtc-article-header">
        <div className="srtc-article-header__container">
          <Link href="/blog" className="srtc-back-to-hub" style={{ color: '#E8B94F' }}>
            <ArrowLeft size={16} /> Back to Knowledge Hub
          </Link>

          <div>
            <span className="srtc-article-meta-badge">
              ⚡ {post.category} • {post.kicker}
            </span>
          </div>

          <h1 className="srtc-article-title">{post.title}</h1>

          <p className="srtc-article-lead">{post.excerpt}</p>

          <div className="srtc-author-row">
            <div className="srtc-author-avatar-wrap">
              <img
                src={post.author?.avatar || '/images/about/menand-odedara-founder.jpg'}
                alt={post.author?.name || 'Author'}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #E8B94F',
                }}
              />
            </div>
            <div className="srtc-author-info">
              <span className="srtc-author-name">{post.author?.name || 'SRTC Editorial Desk'}</span>
              <span className="srtc-author-role">{post.author?.role || 'Fleet Operations'}</span>
            </div>
            <div className="srtc-article-publish-date">
              <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
              {post.publishedDate}
              <span style={{ margin: '0 8px' }}>•</span>
              <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
              {post.readTime}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Hero Cover Image */}
      <div className="srtc-article-cover-wrap">
        <img
          src={post.coverImage}
          alt={post.title}
          className="srtc-article-cover-img"
          style={{ width: '100%', maxHeight: '520px', objectFit: 'cover' }}
        />
      </div>

      {/* 3. Main Content Container */}
      <div className="srtc-article-container">
        {/* Container Telematics Blueprint Strip */}
        <div className="srtc-container-telematics-bar">
          <div className="srtc-telematics-item">
            <span className="srtc-telematics-label">EQUIPMENT SERIAL</span>
            <span className="srtc-telematics-val">{post.containerId || 'SRTC-LINEHAUL-01'}</span>
          </div>
          <div className="srtc-telematics-item">
            <span className="srtc-telematics-label">ISO SPECIFICATION</span>
            <span className="srtc-telematics-val">{post.containerType || '45G1 HC'}</span>
          </div>
          <div className="srtc-telematics-item">
            <span className="srtc-telematics-label">CORRIDOR ROUTE</span>
            <span className="srtc-telematics-val">{post.corridor || 'ALL-INDIA'}</span>
          </div>
          <div className="srtc-telematics-item">
            <span className="srtc-telematics-label">PAYLOAD RATING</span>
            <span className="srtc-telematics-val">{post.maxGross || '32,500 KG'}</span>
          </div>
        </div>

        {/* 3 Telemetry Metrics Highlights Grid */}
        {post.metrics && post.metrics.length > 0 && (
          <div className="srtc-article-metrics-grid">
            {post.metrics.map((m, idx) => (
              <div key={idx} className="srtc-metric-box">
                <span className="srtc-metric-num">{m.value}</span>
                <span className="srtc-metric-lbl">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Render Formatted Markdown Content */}
        <div className="srtc-article-body">
          {post.content.split('\n\n').map((block, idx) => {
            const trimmed = block.trim();

            // Horizontal Rule
            if (trimmed === '---') {
              return <hr key={idx} className="srtc-article-hr" />;
            }

            // H2
            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={idx} className="srtc-article-h2">
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }

            // H3
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={idx} className="srtc-article-h3">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }

            // Bullet List
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
              const items = trimmed.split('\n');
              return (
                <ul key={idx} className="srtc-article-list">
                  {items.map((item, itemIdx) => {
                    const cleanItem = item.replace(/^[-*]\s+/, '');
                    if (cleanItem.includes('**')) {
                      const parts = cleanItem.split('**');
                      return (
                        <li key={itemIdx}>
                          <strong>{parts[1]}</strong>
                          {parts.slice(2).join('')}
                        </li>
                      );
                    }
                    return <li key={itemIdx}>{cleanItem}</li>;
                  })}
                </ul>
              );
            }

            // Standard Paragraph
            return <p key={idx}>{trimmed}</p>;
          })}
        </div>

        {/* Tags & Meta Footer */}
        {post.tags && post.tags.length > 0 && (
          <div className="srtc-article-footer-meta">
            <div className="srtc-article-tags">
              <Tag size={15} color="#94A3B8" />
              {post.tags.map((tag) => (
                <span key={tag} className="srtc-article-tag">
                  #{tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>
                Share Article:
              </span>
              <Link
                href="/contact"
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#0B2F4A',
                  textDecoration: 'none',
                  padding: '0.35rem 0.85rem',
                  border: '1px solid #CBD5E1',
                  borderRadius: '9999px',
                }}
              >
                Discuss with Dispatch →
              </Link>
            </div>
          </div>
        )}

        {/* Corporate Advisory Desk Footer */}
        <div className="srtc-author-bio-card">
          <div style={{ flex: 1 }}>
            <h4 className="srtc-author-bio-name">SRTC Logistics Corridor Advisory Desk</h4>
            <div className="srtc-author-bio-role">PAN-INDIA INDUSTRIAL LINEHAUL & CONTAINER FLEET</div>
            <p className="srtc-author-bio-text">
              Over two decades leading industrial freight corridors, port evacuation infrastructure, and
              fleet safety engineering across India. Specializing in 40ft high-cube container drayage and
              enterprise SLA delivery.
            </p>
          </div>
        </div>

        {/* Related Articles Strip */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <h3
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#0B2F4A',
                marginBottom: '1.5rem',
              }}
            >
              Related Linehaul Intelligence
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 12px rgba(11, 47, 74, 0.04)',
                  }}
                >
                  <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = '/images/blog/blog-container-expressway.jpg';
                      }}
                    />
                  </div>
                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: '#B88214',
                        textTransform: 'uppercase',
                        marginBottom: '0.4rem',
                      }}
                    >
                      {rel.category}
                    </span>
                    <h4
                      style={{
                        fontSize: '0.96rem',
                        fontWeight: 700,
                        color: '#0B2F4A',
                        lineHeight: 1.35,
                        margin: '0 0 0.5rem 0',
                      }}
                    >
                      {rel.title}
                    </h4>
                    <span
                      style={{
                        marginTop: 'auto',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#0B2F4A',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      Read Analysis <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom Linehaul Truck Showcase */}
      <TruckContactCTA />
    </article>
  );
}
