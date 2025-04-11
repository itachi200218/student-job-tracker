const express = require('express');
const Job = require('../models/job');
const router = express.Router();

// Create (Single Job)
router.post('/', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const saved = await newJob.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating job:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// Read all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ appliedDate: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update job by ID
router.put('/:id', async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty" });
    }

    console.log(`Updating job ${req.params.id} with data:`, req.body);

    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating job:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete job by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error("Error deleting job:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

