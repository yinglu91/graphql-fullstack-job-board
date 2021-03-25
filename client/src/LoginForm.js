import { useState } from 'react'
import { login } from './auth'
import { useHistory } from 'react-router-dom'

export const LoginForm = (props) => {
  const [state, setState] = useState({ email: '', password: '', error: false })
  const history = useHistory()
  
  const handleChange = (event) => {
    const { name, value } = event.target

    setState((preState) => ({...preState, [name]: value}))   // Dynamic Property
  }

  const handleClick = (event) => {
    event.preventDefault()

    const { email, password } = state
    login(email, password).then((ok) => {
      if (ok) {
        props.onLogin();
        history.push('/')
      } else {
        setState({error: true})
      }
    })
  }

  const { email, password, error } = state
  return (
    <form>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="text" name="email" value={email}
            onChange={handleChange} />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className="input" type="password" name="password" value={password}
            onChange={handleChange} />
        </div>
      </div>
      <div className="field">
        <p className="help is-danger">{error && 'Invalid credentials'}</p>
        <div className="control">
          <button className="button is-link" onClick={handleClick}>Login</button>
        </div>
      </div>
    </form>
  )
}
