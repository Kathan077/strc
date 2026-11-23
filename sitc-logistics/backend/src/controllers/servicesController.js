const ServicesPageContent = require('../models/ServicesPageContent');

/**
 * @desc    Fetch entire Services Page Content
 * @route   GET /api/services
 * @access  Public
 */
const getServicesContent = async (req, res, next) => {
  try {
    let content = await ServicesPageContent.findOne();
    if (!content) {
      content = await ServicesPageContent.create({});
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
 * @desc    Update a specific section of the Services Page
 * @route   PUT /api/services/section/:sectionName
 * @access  Private (Admin Only)
 */
const updateServicesSection = async (req, res, next) => {
  try {
    const { sectionName } = req.params;
    const allowedSections = ['hero', 'core', 'industries', 'workflow', 'trustClients', 'truckContactCTA'];

    if (!allowedSections.includes(sectionName)) {
      return res.status(400).json({
        success: false,
        message: `Invalid section name '${sectionName}'. Allowed: ${allowedSections.join(', ')}`,
      });
    }

    let content = await ServicesPageContent.findOne();
    if (!content) {
      content = new ServicesPageContent({});
    }

    content[sectionName] = req.body;
    content.markModified(sectionName);
    await content.save();

    res.status(200).json({
      success: true,
      message: `Services page section '${sectionName}' updated successfully`,
      data: content[sectionName],
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update complete Services Page Content
 * @route   PUT /api/services
 * @access  Private (Admin Only)
 */
const updateFullServices = async (req, res, next) => {
  try {
    let content = await ServicesPageContent.findOne();
    if (!content) {
      content = await ServicesPageContent.create(req.body);
    } else {
      Object.assign(content, req.body);
      ['hero', 'core', 'industries', 'workflow', 'trustClients', 'truckContactCTA'].forEach((s) => {
        if (req.body[s]) content.markModified(s);
      });
      await content.save();
    }

    res.status(200).json({
      success: true,
      message: 'Full Services page content updated successfully',
      data: content,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServicesContent,
  updateServicesSection,
  updateFullServices,
};

