import React from 'react';
import axios from 'axios';
import './JobItem.css';

export default function JobItem({ job, refresh }) {
  const updateStatus = async (e) => {
    await axios.put(`http://localhost:5000/api/jobs/${job._id}`, {
      ...job,
      status: e.target.value,
    });
    refresh();
  };

  const deleteJob = async () => {
    await axios.delete(`http://localhost:5000/api/jobs/${job._id}`);
    refresh();
  };

  return (
    <div className="job-card">
      <h3 className="job-heading">
        {job.company} <span className="job-role">({job.role})</span>
      </h3>

      <p>
        <strong>Status:</strong>
        <select value={job.status} onChange={updateStatus} className="job-select">
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </p>

      <p>
        <strong>Applied Date:</strong> {job.appliedDate.substring(0, 10)}
      </p>

      {job.link && (
        <p>
          <a href={job.link} target="_blank" rel="noreferrer" className="job-link">
            View Job Posting
          </a>
        </p>
      )}

      <button onClick={deleteJob} className="job-delete-button">
        Delete
      </button>
    </div>
  );
}
