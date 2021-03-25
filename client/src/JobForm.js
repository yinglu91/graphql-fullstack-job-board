import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { createJob } from './requests';

export const JobForm = props => {
  const history = useHistory()
  const [job, setJob] = useState({
    title: '',
    description: ''
  })

  const handleChange = event => {
    const { name, value } = event.target;
    setJob(prevJob => {
      return { ...prevJob, [name]: value };
    });
  };

  const handleSubmit = event => {
    event.preventDefault()

    createJob(job).then(job => {
      history.push(`/jobs/${job.id}`)
    })
  };

  const { title, description } = job;

  return (
    <div>
      <h1 className='title'>New Job</h1>
      <div className='box'>
        <form>
          <div className='field'>
            <label className='label'>Title</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='title'
                value={title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Description</label>
            <div className='control'>
              <textarea
                className='input'
                style={{ height: '10em' }}
                name='description'
                value={description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <button className='button is-link' onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
