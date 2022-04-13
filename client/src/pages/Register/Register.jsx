import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { userRegister } from '../../redux/User/UserAction'
import { useDispatch, useSelector } from 'react-redux'
import './register.css'
import { CircularProgress } from '@mui/material'
import MessageBox from '../../components/MessageBox/MessageBox'

const Register = () => {
  const email = useRef()
  const username = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, userRegisterResponse } = useSelector((state) => state.user)

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity('The passwords do not match!')
    } else {
      const newUser = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }

      try {
        dispatch(userRegister(newUser))

        setTimeout(() => {
          navigate('/login')
        }, 5000)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Social</h3>
          <span className="registerDesc">
            Connect with your friends and family on Social.
          </span>
        </div>

        <div className="registerRight">
          {isLoading && <CircularProgress />}
          {userRegisterResponse?.message && (
            <MessageBox
              variant={
                userRegisterResponse.status === 'success' ? 'success' : 'danger'
              }
            >
              {userRegisterResponse.message}
            </MessageBox>
          )}
          <form className="registerBox" onSubmit={handleOnSubmit}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="registerInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              type="email"
              className="registerInput"
            />
            <input
              placeholder="Password"
              required
              type="password"
              ref={password}
              className="registerInput"
            />
            <input
              placeholder="Confirm Password"
              required
              type="password"
              ref={confirmPassword}
              className="registerInput"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <span className="registerForgot">Already have an account?</span>
            <button className="registerRegisterButton">Log In</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
