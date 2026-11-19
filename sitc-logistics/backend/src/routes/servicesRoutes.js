const express = require('express');
const router = express.Router();
const {
  getServicesContent,
  updateServicesSection,
  updateFullServices,
} = require('../controllers/servicesController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Public route for public frontend
router.get('/', getServicesContent);

// Protected routes for admin management
router.put('/', protectAdmin, updateFullServices);
router.put('/section/:sectionName', protectAdmin, updateServicesSection);

module.exports = router;

