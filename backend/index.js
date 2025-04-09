const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jobRoutes = require('./routers/jobRouters');  // Ensure this file exists
const Job = require('./models/job');  // Ensure this model exists

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Enable CORS for the frontend URL (Vercel or wherever your frontend is hosted)
app.use(cors({
  origin: 'https://student-job-tracker.vercel.app',  // Corrected URL: No trailing slash
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Middleware to parse JSON bodies
app.use(express.json());

// API routes for jobs
app.use('/api/jobs', jobRoutes);

// Test route to verify backend is running
app.get('/test', (req, res) => {
  res.send('✅ Backend is working!');
});

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    // Start server after successful MongoDB connection
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);  // Exit process if MongoDB connection fails
  });
