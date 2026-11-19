const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleFeatured,
} = require('../controllers/blogController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Public endpoints
router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);

// Protected admin endpoints
router.post('/', protectAdmin, createBlog);
router.put('/:id', protectAdmin, updateBlog);
router.delete('/:id', protectAdmin, deleteBlog);
router.patch('/:id/featured', protectAdmin, toggleFeatured);

module.exports = router;

