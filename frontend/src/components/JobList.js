import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobItem from './JobItem';

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await axios.get('http://localhost:5000/api/jobs');
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      {jobs.map(job => <JobItem key={job._id} job={job} refresh={fetchJobs} />)}
    </div>
  );
}
