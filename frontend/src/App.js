import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobItem from './components/JobItem';
import JobForm from './components/JobForm';  // Assuming you have this form component

function App() {
  const [jobs, setJobs] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchMonthYear, setSearchMonthYear] = useState('');

  // Function to get jobs from the backend
  const getJobs = async () => {
    const res = await axios.get('http://localhost:5000/api/jobs');
    setJobs(res.data);
  };

  useEffect(() => {
    getJobs(); // Fetch jobs on component mount
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

  return (
    <div className="App">
      {/* Add job form */}
      <JobForm refresh={getJobs} setFilterStatus={setFilterStatus} setSearchTerm={() => {}} setSearchDate={() => {}} />

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

      {/* Group and display jobs */}
      {Object.keys(groupedJobs).map((letter) => (
        <div key={letter}>
          <h3>{letter}</h3>
          {groupedJobs[letter].map((job) => (
            <JobItem key={job._id} job={job} refresh={getJobs} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
