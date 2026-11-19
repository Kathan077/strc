const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true,
    },
    kicker: {
      type: String,
      default: 'Fleet Optimization & Corridors',
      trim: true,
    },
    category: {
      type: String,
      default: 'Container Linehaul',
      trim: true,
      index: true,
    },
    publishedDate: {
      type: String,
      default: () =>
        new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
    },
    isoDate: {
      type: String,
      default: () => new Date().toISOString(),
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    coverImage: {
      type: String,
      default: '/images/blog/blog-container-expressway.jpg',
    },
    // SRTC Signature Container Specs
    containerId: {
      type: String,
      default: 'SRTC-U 940215 [7]',
    },
    containerType: {
      type: String,
      default: '45G1 HIGH-CUBE',
    },
    corridor: {
      type: String,
      default: 'WESTERN EXPRESSWAY',
    },
    maxGross: {
      type: String,
      default: '32,500 KG',
    },
    excerpt: {
      type: String,
      required: [true, 'Article excerpt is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Article content body is required'],
    },
    author: {
      name: { type: String, default: 'Menandbhai Odedara' },
      role: { type: String, default: 'Founder & Managing Director' },
      avatar: { type: String, default: '/images/about/menand-odedara-founder.jpg' },
    },
    metrics: [
      {
        label: { type: String, default: '' },
        value: { type: String, default: '' },
      },
    ],
    tags: [{ type: String, trim: true }],
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BlogPost', BlogPostSchema);

