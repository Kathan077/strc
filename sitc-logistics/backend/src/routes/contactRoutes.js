const express = require('express');
const router = express.Router();
const {
  getContactContent,
  updateContactSection,
  updateFullContact,
} = require('../controllers/contactController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Public route for public frontend
router.get('/', getContactContent);

// Protected routes for admin management
router.put('/', protectAdmin, updateFullContact);
router.put('/section/:sectionName', protectAdmin, updateContactSection);

module.exports = router;

