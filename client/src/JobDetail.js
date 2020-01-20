import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { jobs } from './fake-data';
import { loadJob } from './requests';

export const JobDetail = props => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    const { jobId } = props.match.params;
    const job = await loadJob(jobId);
    setJob(job);
  };

  if (!job) {
    return null; // display nothing
  }

  return (
    <div>
      <h1 className='title'>{job.title}</h1>
      <h2 className='subtitle'>
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className='box'>{job.description}</div>
    </div>
  );
};
