const AboutPageContent = require('../models/AboutPageContent');

/**
 * @desc    Fetch entire About Page Content
 * @route   GET /api/about
 * @access  Public
 */
const getAboutContent = async (req, res, next) => {
  try {
    let content = await AboutPageContent.findOne();
    if (!content) {
      // If none exists, create default empty document
      content = await AboutPageContent.create({});
    }
    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a specific section of the About Page
 * @route   PUT /api/about/section/:sectionName
 * @access  Private (Admin Only)
 */
const updateAboutSection = async (req, res, next) => {
  try {
    const { sectionName } = req.params;
    const allowedSections = ['hero', 'stats', 'company', 'visionMission', 'process', 'truckContactCTA'];

    if (!allowedSections.includes(sectionName)) {
      return res.status(400).json({
        success: false,
        message: `Invalid section name '${sectionName}'. Allowed: ${allowedSections.join(', ')}`,
      });
    }

    let content = await AboutPageContent.findOne();
    if (!content) {
      content = new AboutPageContent({});
    }

    // Assign payload directly to the section
    content[sectionName] = req.body;
    content.markModified(sectionName);
    await content.save();

    res.status(200).json({
      success: true,
      message: `About page section '${sectionName}' updated successfully`,
      data: content[sectionName],
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update complete About Page Content
 * @route   PUT /api/about
 * @access  Private (Admin Only)
 */
const updateFullAbout = async (req, res, next) => {
  try {
    let content = await AboutPageContent.findOne();
    if (!content) {
      content = await AboutPageContent.create(req.body);
    } else {
      Object.assign(content, req.body);
      await content.save();
    }

    res.status(200).json({
      success: true,
      message: 'Full About page content updated successfully',
      data: content,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAboutContent,
  updateAboutSection,
  updateFullAbout,
};

