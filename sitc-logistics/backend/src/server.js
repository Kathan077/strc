const path = require('path');
// Robust .env loading regardless of current working directory
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('dotenv').config(); // Fallback to current working directory

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas and start listening
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`[Express API] Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`[Express API] Endpoints available at http://localhost:${PORT}/api`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`\n[Server Error] Port ${PORT} is already in use by another process.`);
        console.error(`To fix this, please close the other process running on port ${PORT} or restart your terminal.\n`);
      } else {
        console.error('[Server Error]', err);
      }
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error('[Startup Error] Failed to connect to database or start server:', err);
    process.exit(1);
  });

