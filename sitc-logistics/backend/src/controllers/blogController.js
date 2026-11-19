const BlogPost = require('../models/BlogPost');

// Helper to slugify a title if slug is missing
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

// @desc    Get all blog posts (supports search, category, featured filters)
// @route   GET /api/blogs
// @access  Public
exports.getAllBlogs = async (req, res) => {
  try {
    const { category, search, featured, all } = req.query;
    let query = {};

    // For public frontend, only show published posts unless all=true (for admin)
    if (all !== 'true') {
      query.isPublished = true;
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ title: regex }, { excerpt: regex }, { tags: regex }, { kicker: regex }];
    }

    // Sort featured first, then newest first
    const posts = await BlogPost.find(query).sort({ featured: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching blogs',
      error: error.message,
    });
  }
};

// @desc    Get single blog post by slug
// @route   GET /api/blogs/:slug
// @access  Public
exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ slug: slug.toLowerCase() });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Blog post with slug '${slug}' not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching blog post',
      error: error.message,
    });
  }
};

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private (Admin)
exports.createBlog = async (req, res) => {
  try {
    const body = req.body;

    if (!body.title || !body.title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Article title is required',
      });
    }

    // Generate or clean slug
    let baseSlug = body.slug ? slugify(body.slug) : slugify(body.title);
    if (!baseSlug) baseSlug = 'article-' + Date.now();

    // Ensure slug uniqueness
    let finalSlug = baseSlug;
    let counter = 1;
    while (await BlogPost.findOne({ slug: finalSlug })) {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Set publish dates if not provided
    const now = new Date();
    const publishedDate =
      body.publishedDate ||
      now.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    const isoDate = body.isoDate || now.toISOString();

    const newPost = await BlogPost.create({
      ...body,
      slug: finalSlug,
      publishedDate,
      isoDate,
    });

    res.status(201).json({
      success: true,
      message: 'Blog post published successfully',
      data: newPost,
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating blog post',
      error: error.message,
    });
  }
};

// @desc    Update an existing blog post
// @route   PUT /api/blogs/:id
// @access  Private (Admin)
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    let post = await BlogPost.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    // If slug is changed, check for collisions
    if (req.body.slug && req.body.slug !== post.slug) {
      const cleanSlug = slugify(req.body.slug);
      const existing = await BlogPost.findOne({ slug: cleanSlug, _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `Slug '${cleanSlug}' is already in use by another article. Please choose a unique slug.`,
        });
      }
      req.body.slug = cleanSlug;
    }

    post = await BlogPost.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: post,
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating blog post',
      error: error.message,
    });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private (Admin)
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    await BlogPost.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully',
      deletedId: id,
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting blog post',
      error: error.message,
    });
  }
};

// @desc    Toggle featured status of a blog post
// @route   PATCH /api/blogs/:id/featured
// @access  Private (Admin)
exports.toggleFeatured = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    post.featured = !post.featured;
    await post.save();

    res.status(200).json({
      success: true,
      message: `Blog post ${post.featured ? 'marked as featured' : 'unmarked from featured'}`,
      data: post,
    });
  } catch (error) {
    console.error('Error toggling featured status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while toggling featured status',
      error: error.message,
    });
  }
};

