import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/data/blogData';
import BlogClient from '@/components/blog/BlogClient';
import TruckContactCTA from '@/components/home/TruckContactCTA';
import './blog.css';

export const revalidate = 60;

export const metadata = {
  title: 'Logistics Knowledge Hub & Fleet Insights | SRTC Logistics',
  description:
    'In-depth industrial linehaul analysis, 40ft container optimization, ICD drayage protocols, and fleet telematics intelligence across India from SRTC Logistics.',
  keywords: [
    'Logistics Insights',
    '40ft Container Haulage',
    'ICD Container Drayage',
    'Pan-India Linehaul',
    'Fleet Telematics',
    'Port to Plant Delivery',
    'Zero Demurrage',
    'SRTC Logistics Blog',
  ],
  openGraph: {
    title: 'Logistics Knowledge Hub & Fleet Insights | SRTC Logistics',
    description:
      'Actionable freight intelligence, intermodal container strategies, and telematics engineering from two decades on India’s industrial expressways.',
    url: 'https://srtclogistics.com/blog',
    siteName: 'SRTC Logistics',
    images: [
      {
        url: '/images/blog/blog-container-expressway.jpg',
        width: 1200,
        height: 675,
        alt: 'SRTC Logistics Container Fleet Linehaul',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getBlogs() {
  try {
    const res = await fetch(`${API_BASE}/api/blogs`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error('[API Fetch Error] Blogs endpoint responded with status:', res.status);
      return getAllPosts();
    }
    const json = await res.json();
    return json.data && json.data.length > 0 ? json.data : getAllPosts();
  } catch (err) {
    console.error('[API Fetch Error] Backend unreachable for blogs:', err.message);
    return getAllPosts();
  }
}

export default async function BlogPage() {
  const posts = await getBlogs();

  // JSON-LD Structured Data for Google Search
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'SRTC Logistics Knowledge Hub',
    description:
      'Expert articles on heavy linehaul transport, container drayage velocity, zero-demurrage protocols, and fleet telematics.',
    url: 'https://srtclogistics.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'SRTC Logistics (Shree Ram Transportation Corporation)',
      logo: {
        '@type': 'ImageObject',
        url: 'https://srtclogistics.com/images/logo/srtc-logo.png',
      },
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.isoDate,
      image: post.coverImage?.startsWith('http')
        ? post.coverImage
        : `https://srtclogistics.com${post.coverImage}`,
      url: `https://srtclogistics.com/blog/${post.slug}`,
      author: {
        '@type': 'Person',
        name: post.author?.name || 'SRTC Editorial Desk',
      },
    })),
  };

  return (
    <main className="srtc-blog-page">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Header Hero Banner */}
      <header className="srtc-blog-hero">
        <div className="srtc-blog-hero__container">
          <nav className="srtc-blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">HOME</Link>
            <span className="srtc-blog-breadcrumb__sep">/</span>
            <span>OUR BLOGS</span>
          </nav>

          <h1 className="srtc-blog-hero__title">
            Our <span>Blogs</span>
          </h1>

          <p className="srtc-blog-hero__subtitle">
            Latest news, industry updates, and supply chain insights from SRTC Logistics.
          </p>
        </div>
      </header>

      {/* 2. Interactive Client Directory (Search, Filter, Featured Card, Articles Grid, Newsletter) */}
      <BlogClient posts={posts} />

      {/* 3. Interactive Linehaul CTA Truck Showcase */}
      <TruckContactCTA />
    </main>
  );
}
