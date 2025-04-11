import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './JobItem.css';

export default function JobItem({ job, refresh, showNotification }) {
  const [status, setStatus] = useState(job.status);
  const [appliedDate, setAppliedDate] = useState(new Date(job.appliedDate));

  // ✅ Update status + notify
  const updateStatus = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      await axios.put(`https://student-job-tracker-1-q8rh.onrender.com/api/jobs/${job._id}`, {
        status: newStatus,
        appliedDate: appliedDate.toISOString().split('T')[0],
      });

      if (typeof refresh === 'function') refresh();
      if (typeof showNotification === 'function') {
        showNotification('success', `Status updated to ${newStatus}`);
      }
    } catch (error) {
      if (typeof showNotification === 'function') {
        showNotification('error', 'Error updating status.');
      }
    }
  };

  // ✅ Update applied date + notify
  const updateAppliedDate = async (date) => {
    setAppliedDate(date);

    try {
      await axios.put(`https://student-job-tracker-1-q8rh.onrender.com/api/jobs/${job._id}`, {
        status: status,
        appliedDate: date.toISOString().split('T')[0],
      });

      if (typeof refresh === 'function') refresh();
      if (typeof showNotification === 'function') {
        showNotification('info', `Applied date updated to ${date.toISOString().split('T')[0]}`);
      }
    } catch (error) {
      if (typeof showNotification === 'function') {
        showNotification('error', 'Error updating applied date.');
      }
    }
  };

  const deleteJob = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://student-job-tracker-1-q8rh.onrender.com/api/jobs/${job._id}`);
        if (typeof refresh === 'function') refresh();
        if (typeof showNotification === 'function') {
          showNotification('warning', 'Job deleted successfully.');
        }
      } catch (error) {
        if (typeof showNotification === 'function') {
          showNotification('error', 'Error deleting job.');
        }
      }
    }
  };

  return (
    <div className="job-card">
      <h3 className="job-heading">
        {job.company} <span className="job-role">({job.role})</span>
      </h3>

      <div className="job-field">
        <strong>Status:</strong>
        <select value={status} onChange={updateStatus} className="job-select">
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="job-field">
        <strong>Applied Date:</strong>
        <DatePicker
          selected={appliedDate}
          onChange={updateAppliedDate}
          dateFormat="yyyy-MM-dd"
          className="job-date-input"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>

      {job.link && (
        <div className="job-field">
          <a href={job.link} target="_blank" rel="noreferrer" className="job-link">
            View Job Posting
          </a>
        </div>
      )}

      <button onClick={deleteJob} className="job-delete-button">
        Delete
      </button>
    </div>
  );
}
