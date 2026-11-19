const express = require('express');
const router = express.Router();
const {
  getHomepageContent,
  updateHomepageSection,
  updateFullHomepage,
} = require('../controllers/contentController');
const { uploadMiddleware, uploadImage } = require('../controllers/uploadController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Public route for public frontend
router.get('/', getHomepageContent);

// Protected routes for admin management
router.put('/', protectAdmin, updateFullHomepage);
router.put('/section/:sectionName', protectAdmin, updateHomepageSection);

// Image upload route
router.post('/upload', protectAdmin, uploadMiddleware, uploadImage);

module.exports = router;

