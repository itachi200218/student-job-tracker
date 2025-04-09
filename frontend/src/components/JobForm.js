import React, { useState } from 'react';
import axios from 'axios';
import './JobForm.css';

export default function JobForm({ refresh, setSearchTerm, setSearchDate }) {
  const [form, setForm] = useState({
    name: '',       // Candidate Name
    company: '',
    role: '',
    appliedDate: '',
    link: '',
    status: 'Applied',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatLink = (url) => {
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!form.name || !form.company || !form.role || !form.appliedDate) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    
    setErrorMessage(''); // Reset error message if validation passes
    setIsLoading(true);

    const formattedData = {
      ...form,
      link: formatLink(form.link.trim()),
    };

    try {
      await axios.post('http://localhost:5000/api/jobs', formattedData);
      setSuccessMessage('Job added successfully!');
      setForm({
        name: '',
        company: '',
        role: '',
        appliedDate: '',
        link: '',
        status: 'Applied',
      });
      refresh();
      // Reset or update search terms after adding a new job
      setSearchTerm('');
      setSearchDate('');
    } catch (error) {
      setErrorMessage('An error occurred while adding the job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 📝 Job Add Form */}
      <form className="job-form" onSubmit={handleSubmit}>
        <h2 className="form-title">📋 Add a New Job</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="form-group">
          <label>Candidate Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="e.g. Google"
            required
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label>Applied Date</label>
          <input
            type="date"
            name="appliedDate"
            value={form.appliedDate}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div className="form-group">
          <label>Job Link <span style={{ fontWeight: 'normal', color: 'gray' }}>(optional)</span></label>
          <input
            type="url"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isLoading}  // Disable button while loading
        >
          {isLoading ? 'Adding...' : '➕ Add Job'}
        </button>
      </form>
    </>
  );
}
