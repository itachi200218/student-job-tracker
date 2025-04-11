import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobItem from './components/JobItem';
import JobForm from './components/JobForm';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchMonthYear, setSearchMonthYear] = useState('');
  const [notifications, setNotifications] = useState([]);

  const getJobs = async () => {
    try {
      const baseURL = 'https://student-job-tracker-1-q8rh.onrender.com';
      const res = await axios.get(`${baseURL}/api/jobs`);
      setJobs(res.data);
    } catch (error) {
      showNotification('error', 'Error fetching jobs.');
    }
  };

  useEffect(() => {
    getJobs(); // Fetch jobs on mount
  }, []);

  const formatMonthYear = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${year}`;
  };

  const monthYearOptions = [...new Set(jobs.map(job => formatMonthYear(job.appliedDate)))];

  const filteredJobs = jobs
    .filter(job => {
      const jobMonthYear = formatMonthYear(job.appliedDate);
      const isStatusMatch = filterStatus ? job.status === filterStatus : true;
      const isMonthYearMatch = searchMonthYear ? jobMonthYear === searchMonthYear : true;
      return isStatusMatch && isMonthYearMatch;
    })
    .sort((a, b) => a.company.localeCompare(b.company));

  const groupedJobs = filteredJobs.reduce((acc, job) => {
    const firstLetter = job.company[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(job);
    return acc;
  }, {});

  // ✅ Notification function
  const showNotification = (type, message) => {
    const id = new Date().getTime();
    setNotifications((prev) => [...prev, { type, message, id }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this job?');
    if (confirmDelete) {
      try {
        const baseURL = 'https://student-job-tracker-1-q8rh.onrender.com';
        await axios.delete(`${baseURL}/api/jobs/${jobId}`);
        setJobs(jobs.filter((job) => job._id !== jobId));
        showNotification('warning', 'Job deleted successfully.');
      } catch (error) {
        showNotification('error', 'Error deleting job.');
      }
    }
  };

  return (
    <div className="App">
      {/* Job Form */}
      <JobForm
        refresh={getJobs}
        setFilterStatus={setFilterStatus}
        setSearchTerm={() => {}}
        setSearchDate={() => {}}
        showNotification={showNotification}
      />

      {/* Filter by Status */}
      <div className="filter-container">
        <label className="filter-label">Filter by Status: </label>
        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Filter by Month-Year */}
      <div className="filter-container">
        <label className="filter-label">Filter by Month-Year: </label>
        <select
          className="filter-select"
          value={searchMonthYear}
          onChange={(e) => setSearchMonthYear(e.target.value)}
        >
          <option value="">All</option>
          {monthYearOptions.map((monthYear) => (
            <option key={monthYear} value={monthYear}>
              {monthYear}
            </option>
          ))}
        </select>
      </div>

      {/* Notifications */}
      <div className="notifications-container">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification ${notification.type}`}
          >
            {notification.message}
          </div>
        ))}
      </div>

      {/* Grouped Jobs */}
      {Object.keys(groupedJobs).map((letter) => (
        <div key={letter}>
          <h3>{letter}</h3>
          {groupedJobs[letter].map((job) => (
            <JobItem
              key={job._id}
              job={job}
              handleDeleteJob={handleDeleteJob}
              showNotification={showNotification}  
              refresh={getJobs}                    
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
