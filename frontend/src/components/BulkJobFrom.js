import React, { useState } from 'react';
import axios from 'axios';

export default function BulkJobForm() {
  const [jobs, setJobs] = useState([
    { company: 'Google', role: 'Frontend Developer', status: 'Applied', appliedDate: '2024-04-09', link: 'https://example.com' },
    { company: 'Amazon', role: 'Backend Developer', status: 'Interview', appliedDate: '2024-04-10', link: 'https://example.com' },
    // Add 20 job objects here
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send multiple jobs to the backend
      await axios.post('http://localhost:5000/api/jobs/bulk', { jobs });
      alert('Jobs added successfully!');
    } catch (error) {
      console.error('Error adding jobs:', error);
      alert('Failed to add jobs');
    }
  };

  return (
    <div>
      <h2>Add Multiple Jobs</h2>
      <form onSubmit={handleSubmit}>
        {/* Render fields for each job */}
        {jobs.map((job, index) => (
          <div key={index}>
            <h3>Job {index + 1}</h3>
            <input
              type="text"
              value={job.company}
              placeholder="Company"
              onChange={(e) => {
                const updatedJobs = [...jobs];
                updatedJobs[index].company = e.target.value;
                setJobs(updatedJobs);
              }}
            />
            <input
              type="text"
              value={job.role}
              placeholder="Role"
              onChange={(e) => {
                const updatedJobs = [...jobs];
                updatedJobs[index].role = e.target.value;
                setJobs(updatedJobs);
              }}
            />
            <input
              type="date"
              value={job.appliedDate}
              onChange={(e) => {
                const updatedJobs = [...jobs];
                updatedJobs[index].appliedDate = e.target.value;
                setJobs(updatedJobs);
              }}
            />
            <input
              type="text"
              value={job.link}
              placeholder="Job Link"
              onChange={(e) => {
                const updatedJobs = [...jobs];
                updatedJobs[index].link = e.target.value;
                setJobs(updatedJobs);
              }}
            />
          </div>
        ))}
        <button type="submit">Add Jobs</button>
      </form>
    </div>
  );
}
