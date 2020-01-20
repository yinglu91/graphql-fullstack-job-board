import React, { useState, useEffect } from 'react';
import { JobList } from './JobList';
// import { companies } from './fake-data';
import { loadCompany } from './requests';

export const CompanyDetail = props => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    const { companyId } = props.match.params;
    const company = await loadCompany(companyId);
    setCompany(company);
  };

  if (!company) {
    return null;
  }

  return (
    <div>
      <h1 className='title'>{company.name}</h1>
      <div className='box'>{company.description}</div>
      <h5 className='title is-5'>Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
};
