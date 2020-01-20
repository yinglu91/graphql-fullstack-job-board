const db = require('./db');

const Query = {
  jobs: () => {
    return db.jobs.list();
  },
  job: (root, { id }) => {
    return db.jobs.get(id);
  },
  company: (root, { id }) => {
    return db.companies.get(id);
  }
};

const Mutation = {
  createJob: (root, { input }, { user }) => {
    // check user auth
    if (!user) {
      throw new Error('Unauthorized');
    }

    const id = db.jobs.create({ ...input, companyId: user.companyId });
    return db.jobs.get(id);
  }
};

const Company = {
  jobs: company => db.jobs.list().filter(job => job.companyId === company.id)
};
const Job = {
  company: job => {
    return db.companies.get(job.companyId);
  }
};

module.exports = { Query, Mutation, Company, Job };

/*
context
{ user:
   { id: 'BJrp-DudG',
     email: 'alice@facegle.io',
     password: 'alice123',
     companyId: 'HJRa-DOuG' },
  _extensionStack:
   GraphQLExtensionStack { extensions: [ [CacheControlExtension] ] } }
   */
