const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jobRoutes = require('./routers/jobRouters');
const Job = require('./models/job');

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

// CORS configuration to allow both local and production origins
const corsOptions = {
  origin: ['http://localhost:3000', 'https://student-job-tracker.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));


// Use CORS with the above configuration
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// API routes for jobs
app.use('/api/jobs', jobRoutes);

// Test route to verify backend is running
app.get('/test', (req, res) => {
  res.send('✅ Backend is working!');
});

// 👇 Root route for Render deployment check
app.get('/', (req, res) => {
  res.send('🎯 Student Job Tracker Backend is Live!');
});

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB connected');
    // Start server after successful MongoDB connection
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
