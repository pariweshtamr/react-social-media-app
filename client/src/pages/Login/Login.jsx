import './login.css'
import { useRef } from 'react'
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const email = useRef()
  const password = useRef()
  const navigate = useNavigate()

  const handleOnSubmit = (e) => {
    e.preventDefault()
  }

  const handleOnRegister = () => {
    navigate('/register')
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social</h3>
          <span className="loginDesc">
            Connect with your friends and family on Social.
          </span>
        </div>

        <div className="loginRight">
          <form className="loginBox" onSubmit={handleOnSubmit}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="7"
              className="loginInput"
              ref={password}
            />
            <button type="submit" className="loginButton"></button>
            <span className="loginForgot">Forgot Password</span>
            <button
              className="loginRegisterButton"
              onClick={handleOnRegister}
            ></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
