const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const inquiryRoutes = require('./routes/inquiryRoutes');

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();

// Middleware: Enable Cross-Origin Resource Sharing (CORS)
// This permits the Python server (on port 8000) to fetch endpoints from our Express server (on port 5000)
app.use(cors());

// Middleware: Parse incoming JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount inquiry API routes
app.use('/api/inquiries', inquiryRoutes);

// Middleware: Serve static files (CSS, JS, Images) from the assets folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Route: Serve main index.html file for root requests
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all route for other request mappings (redirects to home/index)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Global Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled Promise rejections safely
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  // Gracefully close server & exit process
  server.close(() => process.exit(1));
});
