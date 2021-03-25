import { Link, useHistory } from 'react-router-dom'

export const NavBar = (props) => {
  const { loggedIn, onLogout } = props
  const history = useHistory()

  const handleClick = (event) => {
    event.preventDefault()

    onLogout()
    history.push('/')
  }

  if (loggedIn) {
    return (
      <nav className="navbar">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">Home</Link>
          <Link className="navbar-item" to="/jobs/new">Post Job</Link>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="navbar-item" onClick={handleClick}>Logout</a>
        </div>
      </nav>
    )
  } else {
    return (
      <nav className="navbar">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">Home</Link>
          <Link className="navbar-item" to="/login">Login</Link>
        </div>
      </nav>
    )
  }
}
