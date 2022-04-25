import './login.css'
import { useEffect, useRef } from 'react'
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  autoLogin,
  fetchUserDetails,
  userLogin,
} from '../../redux/User/UserAction'

const Login = () => {
  const email = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoggedIn, isLoading, error } = useSelector(
    (state) => state.user,
  )

  const handleOnSubmit = (e) => {
    e.preventDefault()

    dispatch(
      userLogin({
        email: email.current.value,
        password: password.current.value,
      }),
    )
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
          <div className="loginBox">
            <form className="form" onSubmit={handleOnSubmit}>
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
              <button type="submit" className="loginButton">
                {isLoading ? (
                  <CircularProgress color="inherit" size="20px" />
                ) : (
                  'Log In'
                )}
              </button>
            </form>
            <span className="loginForgot">Forgot Password?</span>

            <button className="loginRegisterButton" onClick={handleOnRegister}>
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
