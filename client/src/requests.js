import { getAccessToken, isLoggedIn } from './auth';

const endpointUrl = 'http://localhost:9000/graphql';

const grqphqlRequest = async (query, variables = {}) => {
  const request = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  };

  if (isLoggedIn()) {
    request.headers['authorization'] = 'Bearer ' + getAccessToken();
  }

  console.log(request.headers);

  const response = await fetch(endpointUrl, request);

  const responseBody = await response.json();
  if (responseBody.errors) {
    const message = responseBody.errors.map(error => error.message).join('\n');
    throw new Error(message);
  }
  return responseBody.data;
};

export const createJob = async input => {
  const mutation = `
    mutation createJob($input: CreateJobInput) {
      job: createJob(input: $input) {
        id
        title
        company {
          id
          name
        }
      }
    }
  `;

  const { job } = await grqphqlRequest(mutation, { input });
  return job;
};

export const loadJobs = async () => {
  const query = `
  {
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }`;

  const { jobs } = await grqphqlRequest(query);
  return jobs;
};

export const loadJob = async id => {
  const query = `
  query jobQuery($id: ID!) {
    job(id: $id) {
      id
      title
      company {
        id
        name
      }
      description
    }
  }`;

  const { job } = await grqphqlRequest(query, { id });
  return job;
};

export const loadCompany = async id => {
  const query = `
  query companyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }
  `;

  const { company } = await grqphqlRequest(query, { id });
  return company;
};
