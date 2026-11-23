import React, { useState } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  Star,
  ExternalLink,
  Search,
  ArrowLeft,
  Save,
  Loader2,
  FileText,
  Sparkles,
  Calendar,
  Clock,
  Tag,
  Truck,
  User,
  Image as ImageIcon,
  CheckCircle,
  Eye,
} from 'lucide-react';
import ImageUploader from '../ImageUploader';

export default function BlogManager({ blogs = [], onRefresh, setToast }) {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'editor'
  const [editingPost, setEditingPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);

  // Form State
  const initialFormState = {
    title: '',
    slug: '',
    kicker: 'Fleet Optimization & Corridors',
    category: 'Container Linehaul',
    publishedDate: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    isoDate: new Date().toISOString(),
    readTime: '5 min read',
    featured: false,
    coverImage: '/images/blog/blog-container-expressway.jpg',
    containerId: 'SRTC-U 940215 [7]',
    containerType: '45G1 HIGH-CUBE',
    corridor: 'WESTERN EXPRESSWAY',
    maxGross: '32,500 KG',
    excerpt: '',
    content: '',
    author: {
      name: 'Menandbhai Odedara',
      role: 'Founder & Managing Director',
      avatar: '/images/about/menand-odedara-founder.jpg',
    },
    metrics: [
      { label: 'Cubic Capacity Increase', value: '+27%' },
      { label: 'Corridor Transit Speed', value: '62 km/h' },
      { label: 'Damage-Free Trips', value: '99.8%' },
    ],
    tags: '40ft Containers, Linehaul Fleet, Express Corridors',
  };

  const [formData, setFormData] = useState(initialFormState);

  // Categories list derived from current blogs
  const categories = ['All', ...new Set(blogs.map((b) => b.category).filter(Boolean))];

  // Helper to slugify title
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleStartCreate = () => {
    setEditingPost(null);
    setFormData(initialFormState);
    setViewMode('editor');
  };

  const handleStartEdit = (post) => {
    setEditingPost(post);
    setFormData({
      ...post,
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
      metrics:
        post.metrics && post.metrics.length > 0
          ? post.metrics
          : [
              { label: 'Cubic Capacity', value: '+27%' },
              { label: 'Corridor Speed', value: '62 km/h' },
              { label: 'Trip Safety', value: '99.8%' },
            ],
      author: post.author || {
        name: 'Menandbhai Odedara',
        role: 'Founder & Managing Director',
        avatar: '/images/about/menand-odedara-founder.jpg',
      },
    });
    setViewMode('editor');
  };

  const handleTitleChange = (val) => {
    setFormData((prev) => {
      const next = { ...prev, title: val };
      // Auto-update slug only when creating new post and slug wasn't manually customized
      if (!editingPost && (!prev.slug || prev.slug === slugify(prev.title))) {
        next.slug = slugify(val);
      }
      return next;
    });
  };

  const handleMetricChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.metrics];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, metrics: updated };
    });
  };

  // Save Blog (Create or Update)
  const handleSaveBlog = async (e) => {
    if (e) e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter an article title');
      return;
    }
    if (!formData.excerpt.trim()) {
      alert('Please enter an article excerpt');
      return;
    }
    if (!formData.content.trim()) {
      alert('Please enter the article content');
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem('srtc_admin_token');
      const payload = {
        ...formData,
        tags: typeof formData.tags === 'string'
          ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : formData.tags,
      };

      const url = editingPost ? `/api/blogs/${editingPost._id}` : '/api/blogs';
      const method = editingPost ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setToast({
          type: 'success',
          message: editingPost
            ? `Article '${formData.title}' updated successfully!`
            : `Article '${formData.title}' published live!`,
        });
        setViewMode('list');
        onRefresh();
      } else {
        setToast({ type: 'error', message: json.message || 'Failed to save article' });
      }
    } catch (err) {
      setToast({ type: 'error', message: 'Error saving article: ' + err.message });
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle Featured
  const handleToggleFeatured = async (post) => {
    try {
      const token = localStorage.getItem('srtc_admin_token');
      const res = await fetch(`/api/blogs/${post._id}/featured`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json.success) {
        setToast({
          type: 'success',
          message: json.message,
        });
        onRefresh();
      } else {
        setToast({ type: 'error', message: json.message || 'Failed to toggle featured status' });
      }
    } catch (err) {
      setToast({ type: 'error', message: 'Network error: ' + err.message });
    }
  };

  // Delete Blog
  const handleDeleteBlog = async (post) => {
    if (!window.confirm(`Are you sure you want to delete article "${post.title}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(post._id);
    try {
      const token = localStorage.getItem('srtc_admin_token');
      const res = await fetch(`/api/blogs/${post._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json.success) {
        setToast({
          type: 'success',
          message: `Article "${post.title}" deleted from database.`,
        });
        onRefresh();
      } else {
        setToast({ type: 'error', message: json.message || 'Failed to delete article' });
      }
    } catch (err) {
      setToast({ type: 'error', message: 'Error deleting article: ' + err.message });
    } finally {
      setIsDeleting(null);
    }
  };

  // Filtered list
  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.tags && b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '60px' }}>
      {/* =========================================================================
          TOP COMMAND HEADER
          ========================================================================= */}
      <div
        className="card-box"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: 'rgba(232, 185, 79, 0.15)',
                color: 'var(--gold-primary)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
              }}
            >
              CMS // KNOWLEDGE HUB
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              • {blogs.length} Published Articles
            </span>
          </div>
          <h1
            style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              color: 'var(--navy-primary)',
              marginTop: '6px',
            }}
          >
            Blog & Industrial Article Management
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
            Full control over logistics articles, container case studies, telematics insights & author profiles.
          </p>
        </div>

        <div>
          {viewMode === 'list' ? (
            <button
              type="button"
              onClick={handleStartCreate}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.9rem' }}
            >
              <Plus size={18} />
              <span>Write & Publish New Article</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="btn-outline"
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
            >
              <ArrowLeft size={16} />
              <span>Back to Articles List</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: DIRECTORY / LIST VIEW
          ========================================================================= */}
      {viewMode === 'list' && (
        <>
          {/* Search & Category Filter Toolbar */}
          <div
            className="card-box"
            style={{
              marginBottom: '20px',
              display: 'flex',
              gap: '14px',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: '280px', flex: 1 }}>
              <Search
                size={17}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="text"
                placeholder="Search articles by title, excerpt or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '38px', width: '100%' }}
              />
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border:
                      selectedCategory === cat
                        ? '1px solid var(--gold-primary)'
                        : '1px solid var(--border-subtle)',
                    background:
                      selectedCategory === cat
                        ? 'linear-gradient(135deg, rgba(232, 185, 79, 0.2) 0%, rgba(212, 157, 40, 0.1) 100%)'
                        : '#FFFFFF',
                    color: selectedCategory === cat ? 'var(--navy-primary)' : 'var(--text-muted)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
            {filteredBlogs.length === 0 ? (
              <div
                className="card-box"
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '50px 20px',
                }}
              >
                <FileText size={44} color="var(--gold-primary)" style={{ opacity: 0.5, marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy-primary)' }}>
                  No Articles Found
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>
                  {searchQuery || selectedCategory !== 'All'
                    ? 'Try clearing your search query or category filters.'
                    : 'Get started by publishing your first logistics article!'}
                </p>
                <button
                  type="button"
                  onClick={handleStartCreate}
                  className="btn-primary"
                  style={{ marginTop: '16px', display: 'inline-flex' }}
                >
                  <Plus size={16} />
                  <span>Create First Article</span>
                </button>
              </div>
            ) : (
              filteredBlogs.map((post) => (
                <div
                  key={post._id || post.slug}
                  className="card-box"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    border: post.featured ? '2px solid rgba(232, 185, 79, 0.5)' : '1px solid var(--border-subtle)',
                    boxShadow: post.featured ? '0 8px 24px rgba(232, 185, 79, 0.12)' : 'none',
                  }}
                >
                  {/* Top Cover Thumbnail */}
                  <div
                    style={{
                      height: '180px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      background: '#071f33',
                      marginBottom: '14px',
                    }}
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.9,
                      }}
                      onError={(e) => {
                        e.target.src = '/images/blog/blog-container-expressway.jpg';
                      }}
                    />

                    {/* Featured Star Badge */}
                    {post.featured && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: 'linear-gradient(135deg, #e8b94f, #d49d28)',
                          color: '#071f33',
                          fontWeight: 800,
                          fontSize: '0.72rem',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}
                      >
                        <Star size={12} fill="#071f33" />
                        FEATURED
                      </span>
                    )}

                    {/* Category Tag */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        background: 'rgba(7, 31, 51, 0.85)',
                        backdropFilter: 'blur(4px)',
                        color: '#E8B94F',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '3px 9px',
                        borderRadius: '4px',
                        border: '1px solid rgba(232, 185, 79, 0.3)',
                      }}
                    >
                      {post.category}
                    </span>

                    {/* Read Time Tag */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        background: 'rgba(0, 0, 0, 0.75)',
                        color: '#FFFFFF',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-primary)', marginBottom: '4px' }}>
                      {post.kicker}
                    </div>

                    <h3
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 800,
                        color: 'var(--navy-primary)',
                        lineHeight: 1.35,
                        marginBottom: '8px',
                      }}
                    >
                      {post.title}
                    </h3>

                    <p
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.82rem',
                        lineHeight: 1.5,
                        marginBottom: '14px',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Container Technical Stencil */}
                    <div
                      style={{
                        background: '#F8FAFC',
                        border: '1px dashed #CBD5E1',
                        borderRadius: '6px',
                        padding: '8px 10px',
                        fontSize: '0.72rem',
                        fontFamily: 'monospace',
                        color: 'var(--navy-primary)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '14px',
                      }}
                    >
                      <span>{post.containerId || 'SRTC-UNIT-01'}</span>
                      <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>
                        {post.corridor || 'EXPRESS CORRIDOR'}
                      </span>
                    </div>

                    {/* Author Meta */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                      <img
                        src={post.author?.avatar || '/images/about/menand-odedara-founder.jpg'}
                        alt={post.author?.name}
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '1px solid var(--gold-primary)',
                        }}
                      />
                      <div style={{ fontSize: '0.75rem' }}>
                        <span style={{ fontWeight: 700, color: 'var(--navy-primary)' }}>
                          {post.author?.name}
                        </span>
                        <span style={{ color: 'var(--text-muted)' }}> • {post.publishedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div
                    style={{
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {/* Toggle Featured Star */}
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(post)}
                        title={post.featured ? 'Unfeature this post' : 'Mark as primary featured'}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-subtle)',
                          background: post.featured ? 'rgba(232, 185, 79, 0.2)' : '#FFFFFF',
                          color: post.featured ? '#B8860B' : 'var(--text-muted)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        <Star size={13} fill={post.featured ? '#B8860B' : 'none'} />
                        <span>{post.featured ? 'Featured' : 'Feature'}</span>
                      </button>

                      {/* View on live site */}
                      <a
                        href={`http://localhost:3000/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View live article"
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-subtle)',
                          background: '#FFFFFF',
                          color: 'var(--navy-primary)',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </a>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => handleStartEdit(post)}
                        className="btn-primary"
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        <Edit3 size={13} />
                        <span>Edit</span>
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteBlog(post)}
                        disabled={isDeleting === post._id}
                        title="Delete article"
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: '1px solid rgba(220, 38, 38, 0.3)',
                          background: 'rgba(220, 38, 38, 0.05)',
                          color: '#DC2626',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {isDeleting === post._id ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <Trash2 size={13} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* =========================================================================
          VIEW 2: ARTICLE CREATOR & EDITOR
          ========================================================================= */}
      {viewMode === 'editor' && (
        <form onSubmit={handleSaveBlog} className="animate-fade-in">
          {/* Editor Header Banner */}
          <div
            className="card-box"
            style={{
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(7, 31, 51, 0.03) 0%, rgba(232, 185, 79, 0.08) 100%)',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--gold-primary)',
                  letterSpacing: '0.05em',
                }}
              >
                {editingPost ? 'EDITING ARTICLE' : 'CREATING NEW ARTICLE'}
              </span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-primary)', marginTop: '2px' }}>
                {editingPost ? `Edit: ${editingPost.title}` : 'Draft & Publish New Logistics Article'}
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="btn-outline"
                style={{ padding: '9px 16px', fontSize: '0.85rem' }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="btn-primary"
                style={{ padding: '9px 22px', fontSize: '0.88rem' }}
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                <span>{isSaving ? 'Saving to Atlas...' : editingPost ? 'Update Article' : 'Publish Article Live'}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>
            {/* LEFT COLUMN: MAIN CONTENT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* 1. Core Article Metadata */}
              <div className="card-box">
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-primary)', marginBottom: '16px' }}>
                  1. Title, Slug & Taxonomy
                </h3>

                <div style={{ marginBottom: '16px' }}>
                  <label className="input-label">Article Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. The 40ft Container Advantage: Optimizing High-Cube Cargo Flow"
                    className="input-field"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                  <div>
                    <label className="input-label">URL Slug * (Used for page route /blog/[slug])</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                      placeholder="e.g. the-40ft-container-advantage"
                      className="input-field"
                      required
                    />
                    <small style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block', marginTop: '4px' }}>
                      Live URL: http://localhost:3000/blog/{formData.slug || 'slug'}
                    </small>
                  </div>

                  <div>
                    <label className="input-label">Kicker / Overline</label>
                    <input
                      type="text"
                      value={formData.kicker}
                      onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                      placeholder="e.g. Fleet Optimization & Corridors"
                      className="input-field"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                  <div>
                    <label className="input-label">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Container Linehaul"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="input-label">Estimated Read Time</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      placeholder="e.g. 5 min read"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="input-label">Published Date Text</label>
                    <input
                      type="text"
                      value={formData.publishedDate}
                      onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                      placeholder="e.g. November 12, 2026"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Excerpt & Full Article Content */}
              <div className="card-box">
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-primary)', marginBottom: '16px' }}>
                  2. Excerpt & Article Markdown Body
                </h3>

                <div style={{ marginBottom: '18px' }}>
                  <label className="input-label">Article Excerpt * (Brief 2-line summary for cards & Google SEO)</label>
                  <textarea
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Enter short summary of the article..."
                    className="input-field"
                    style={{ resize: 'vertical' }}
                    required
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label className="input-label" style={{ margin: 0 }}>
                      Full Article Body * (Markdown Supported)
                    </label>
                    <span style={{ fontSize: '0.72rem', color: 'var(--gold-primary)', fontWeight: 600 }}>
                      Tip: Use ## for Headings, - for Bullets, **text** for Bold
                    </span>
                  </div>

                  <textarea
                    rows={16}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="## The Industrial Shift to 40ft Shipping Containers&#10;&#10;In modern enterprise industrial supply chains...&#10;&#10;---&#10;&#10;## 1. Volumetric Efficiency&#10;&#10;- Pallet Configuration: Up to 25 Euro-pallets&#10;- Payload Balance: Multi-axle air-suspension..."
                    className="input-field"
                    style={{
                      fontFamily: 'Consolas, monospace',
                      fontSize: '0.85rem',
                      lineHeight: '1.6',
                      resize: 'vertical',
                    }}
                    required
                  />
                </div>
              </div>

              {/* 3. Telemetry Highlight Metrics */}
              <div className="card-box">
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-primary)', marginBottom: '14px' }}>
                  3. Key Article Telemetry Metrics (3 Stat Badges)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                  {formData.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#F8FAFC',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '12px',
                      }}
                    >
                      <label className="input-label" style={{ fontSize: '0.75rem' }}>Metric #{idx + 1} Label</label>
                      <input
                        type="text"
                        value={metric.label}
                        onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                        placeholder="e.g. Damage-Free Trips"
                        className="input-field"
                        style={{ marginBottom: '8px' }}
                      />
                      <label className="input-label" style={{ fontSize: '0.75rem' }}>Metric #{idx + 1} Value</label>
                      <input
                        type="text"
                        value={metric.value}
                        onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                        placeholder="e.g. 99.8%"
                        className="input-field"
                        style={{ fontWeight: 800, color: 'var(--gold-primary)' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: MEDIA, CONTAINER & AUTHOR SETTINGS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Featured Switch */}
              <div
                className="card-box"
                style={{
                  background: formData.featured
                    ? 'linear-gradient(135deg, rgba(232, 185, 79, 0.15) 0%, rgba(212, 157, 40, 0.05) 100%)'
                    : '#FFFFFF',
                  border: formData.featured ? '1.5px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#D49D28' }}
                  />
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--navy-primary)', display: 'block' }}>
                      Primary Featured Article
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Spotlighted prominently in the main hero card on /blog
                    </span>
                  </div>
                </label>
              </div>

              {/* Cover Image Uploader */}
              <div className="card-box">
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-primary)', marginBottom: '12px' }}>
                  Cover Image
                </h4>
                <ImageUploader
                  label="Select or Upload Article Cover"
                  value={formData.coverImage}
                  onChange={(path) => setFormData({ ...formData, coverImage: path })}
                />
              </div>

              {/* SRTC Container Technical Identity */}
              <div className="card-box">
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-primary)', marginBottom: '12px' }}>
                  SRTC Container Stencil Data
                </h4>

                <div style={{ marginBottom: '10px' }}>
                  <label className="input-label" style={{ fontSize: '0.75rem' }}>Container Serial ID</label>
                  <input
                    type="text"
                    value={formData.containerId}
                    onChange={(e) => setFormData({ ...formData, containerId: e.target.value })}
                    placeholder="e.g. SRTC-U 940215 [7]"
                    className="input-field"
                  />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label className="input-label" style={{ fontSize: '0.75rem' }}>Container ISO Type</label>
                  <input
                    type="text"
                    value={formData.containerType}
                    onChange={(e) => setFormData({ ...formData, containerType: e.target.value })}
                    placeholder="e.g. 45G1 HIGH-CUBE"
                    className="input-field"
                  />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label className="input-label" style={{ fontSize: '0.75rem' }}>Express Corridor</label>
                  <input
                    type="text"
                    value={formData.corridor}
                    onChange={(e) => setFormData({ ...formData, corridor: e.target.value })}
                    placeholder="e.g. WESTERN EXPRESSWAY"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="input-label" style={{ fontSize: '0.75rem' }}>Max Gross Weight</label>
                  <input
                    type="text"
                    value={formData.maxGross}
                    onChange={(e) => setFormData({ ...formData, maxGross: e.target.value })}
                    placeholder="e.g. 32,500 KG"
                    className="input-field"
                  />
                </div>
              </div>

              {/* Author Profile */}
              <div className="card-box">
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-primary)', marginBottom: '12px' }}>
                  Author Profile
                </h4>

                <div style={{ marginBottom: '10px' }}>
                  <label className="input-label" style={{ fontSize: '0.75rem' }}>Author Name</label>
                  <input
                    type="text"
                    value={formData.author.name}
                    onChange={(e) =>
                      setFormData({ ...formData, author: { ...formData.author, name: e.target.value } })
                    }
                    placeholder="e.g. Menandbhai Odedara"
                    className="input-field"
                  />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label className="input-label" style={{ fontSize: '0.75rem' }}>Author Role / Title</label>
                  <input
                    type="text"
                    value={formData.author.role}
                    onChange={(e) =>
                      setFormData({ ...formData, author: { ...formData.author, role: e.target.value } })
                    }
                    placeholder="e.g. Founder & Managing Director"
                    className="input-field"
                  />
                </div>

                <div>
                  <ImageUploader
                    label="Author Avatar"
                    value={formData.author.avatar}
                    onChange={(path) =>
                      setFormData({ ...formData, author: { ...formData.author, avatar: path } })
                    }
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="card-box">
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-primary)', marginBottom: '8px' }}>
                  Article Tags (Comma-separated)
                </h4>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="40ft Containers, Linehaul, Express, Logistics"
                  className="input-field"
                />
              </div>

              {/* Action Buttons */}
              <div className="card-box" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px', justifyContent: 'center' }}
                >
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  <span>{isSaving ? 'Saving to Atlas...' : editingPost ? 'Save Changes' : 'Publish Article Live'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="btn-outline"
                  style={{ width: '100%', padding: '10px', justifyContent: 'center' }}
                >
                  Cancel & Return to List
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

