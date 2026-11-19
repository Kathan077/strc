const ContactPageContent = require('../models/ContactPageContent');

/**
 * @desc    Fetch entire Contact Page Content
 * @route   GET /api/contact
 * @access  Public
 */
const getContactContent = async (req, res, next) => {
  try {
    let content = await ContactPageContent.findOne();
    if (!content) {
      content = await ContactPageContent.create({});
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
 * @desc    Update a specific section of the Contact Page
 * @route   PUT /api/contact/section/:sectionName
 * @access  Private (Admin Only)
 */
const updateContactSection = async (req, res, next) => {
  try {
    const { sectionName } = req.params;
    const allowedSections = [
      'hero',
      'vaultPhone',
      'vaultWhatsApp',
      'vaultEmail',
      'vaultHubs',
      'bookingFormConfig',
    ];

    if (!allowedSections.includes(sectionName)) {
      return res.status(400).json({
        success: false,
        message: `Invalid section name '${sectionName}'. Allowed: ${allowedSections.join(', ')}`,
      });
    }

    let content = await ContactPageContent.findOne();
    if (!content) {
      content = new ContactPageContent({});
    }

    content[sectionName] = req.body;
    content.markModified(sectionName);
    await content.save();

    res.status(200).json({
      success: true,
      message: `Contact page section '${sectionName}' updated successfully`,
      data: content[sectionName],
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update complete Contact Page Content
 * @route   PUT /api/contact
 * @access  Private (Admin Only)
 */
const updateFullContact = async (req, res, next) => {
  try {
    let content = await ContactPageContent.findOne();
    if (!content) {
      content = await ContactPageContent.create(req.body);
    } else {
      Object.assign(content, req.body);
      await content.save();
    }

    res.status(200).json({
      success: true,
      message: 'Full Contact page content updated successfully',
      data: content,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactContent,
  updateContactSection,
  updateFullContact,
};

