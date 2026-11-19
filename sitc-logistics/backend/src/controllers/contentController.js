const HomepageContent = require('../models/HomepageContent');

// @desc    Get Active Homepage Content (Public)
// @route   GET /api/homepage
// @access  Public
exports.getHomepageContent = async (req, res) => {
  try {
    let content = await HomepageContent.findOne({ isActive: true });
    
    // Fallback if none flagged active: pick the most recent one
    if (!content) {
      content = await HomepageContent.findOne().sort({ createdAt: -1 });
    }

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'No homepage content found. Please run seed script or create initial content.',
      });
    }

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching homepage content',
    });
  }
};

// @desc    Update Specific Homepage Section (Admin)
// @route   PUT /api/admin/homepage/section/:sectionName
// @access  Private (Admin)
exports.updateHomepageSection = async (req, res) => {
  try {
    const { sectionName } = req.params;
    const validSections = [
      'hero',
      'about',
      'services',
      'operationalSystems',
      'process',
      'faq',
      'values',
      'truckContactCTA',
    ];

    if (!validSections.includes(sectionName)) {
      return res.status(400).json({
        success: false,
        message: `Invalid section name '${sectionName}'. Must be one of: ${validSections.join(', ')}`,
      });
    }

    let content = await HomepageContent.findOne({ isActive: true });
    if (!content) {
      content = await HomepageContent.findOne().sort({ createdAt: -1 });
    }

    if (!content) {
      content = new HomepageContent({ isActive: true });
    }

    content[sectionName] = req.body;
    await content.save();

    res.status(200).json({
      success: true,
      message: `Section '${sectionName}' updated successfully`,
      data: content[sectionName],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || `Error updating section ${req.params.sectionName}`,
    });
  }
};

// @desc    Update Full Homepage Content (Admin)
// @route   PUT /api/admin/homepage
// @access  Private (Admin)
exports.updateFullHomepage = async (req, res) => {
  try {
    let content = await HomepageContent.findOne({ isActive: true });
    if (!content) {
      content = new HomepageContent({ isActive: true });
    }

    Object.assign(content, req.body);
    await content.save();

    res.status(200).json({
      success: true,
      message: 'Full homepage content updated successfully',
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating homepage content',
    });
  }
};

