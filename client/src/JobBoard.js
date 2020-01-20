import React, { useState, useEffect } from 'react';
import { JobList } from './JobList';
// const { jobs } = require('./fake-data');
import { loadJobs } from './requests';

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const jobs = await loadJobs();
    setJobs(jobs);
  };

  return (
    <div>
      <h1 className='title'>Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
};

export { JobBoard };
