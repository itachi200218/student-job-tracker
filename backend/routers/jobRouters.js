const express = require('express');
const Job = require('../models/job');
const router = express.Router();

// Create (Single Job)
router.post('/', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const saved = await newJob.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create (Bulk Jobs)
router.post('/bulk', async (req, res) => {
  try {
    const jobs = req.body.jobs; // Array of jobs
    if (!Array.isArray(jobs)) {
      return res.status(400).json({ error: 'Jobs must be an array' });
    }

    // Insert multiple jobs at once
    const savedJobs = await Job.insertMany(jobs);
    res.status(200).json({ message: 'Jobs added successfully', data: savedJobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ appliedDate: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
