const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Readable } = require('stream');
const cloudinary = require('../config/cloudinary');

// Use memory storage for direct Cloudinary upload (no local disk dependency)
const memoryStorage = multer.memoryStorage();

// File filter (images only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|svg|gif|avif/;
  const mimeMatch = allowedTypes.test(file.mimetype);
  const extMatch = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeMatch && extMatch) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, webp, svg, gif, avif) are allowed!'));
  }
};

const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter,
});

exports.uploadMiddleware = upload.single('image');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded or file rejected',
      });
    }

    const targetFolder = req.body.folder || 'srtc_logistics';

    // Stream the in-memory buffer directly to Cloudinary CDN
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: targetFolder,
        resource_type: 'image',
        // Cloudinary automatic quality and format optimization
        fetch_format: 'auto',
        quality: 'auto',
      },
      (error, result) => {
        if (error) {
          console.error('[Cloudinary Upload Error]:', error);
          return res.status(500).json({
            success: false,
            message: 'Cloudinary upload failed: ' + error.message,
          });
        }

        // Return secure Cloudinary CDN URL as both 'url' and 'path' for drop-in compatibility
        res.status(200).json({
          success: true,
          message: 'Image uploaded to Cloudinary successfully',
          url: result.secure_url,
          path: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
        });
      }
    );

    Readable.from(req.file.buffer).pipe(uploadStream);
  } catch (err) {
    console.error('[Upload Handler Error]:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during upload: ' + err.message,
    });
  }
};
