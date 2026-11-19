const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const contactRoutes = require('./routes/contactRoutes');
const blogRoutes = require('./routes/blogRoutes');
const { uploadMiddleware, uploadImage } = require('./controllers/uploadController');
const { protectAdmin } = require('./middleware/authMiddleware');

const app = express();

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allows Next.js frontend to load uploaded images
  })
);

// Enable CORS for frontend (:3000) and admin (:3001)
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Serve uploaded assets statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/homepage', contentRoutes);
app.use('/api/content', contentRoutes); // Backwards-compatible alias
app.use('/api/about', aboutRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);

// Direct Cloudinary image upload endpoint
app.post('/api/upload', protectAdmin, uploadMiddleware, uploadImage);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use(errorHandler);

module.exports = app;

