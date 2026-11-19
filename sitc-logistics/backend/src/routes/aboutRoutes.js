const express = require('express');
const router = express.Router();
const {
  getAboutContent,
  updateAboutSection,
  updateFullAbout,
} = require('../controllers/aboutController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Public route for public frontend
router.get('/', getAboutContent);

// Protected routes for admin management
router.put('/', protectAdmin, updateFullAbout);
router.put('/section/:sectionName', protectAdmin, updateAboutSection);

module.exports = router;

