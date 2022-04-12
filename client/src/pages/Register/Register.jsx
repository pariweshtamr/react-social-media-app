import axios from 'axios'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './register.css'

const Register = () => {
  const email = useRef()
  const username = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const navigate = useNavigate()

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity('The passwords do not match!')
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }

      try {
        await axios.post('/users/register', user)
        navigate('/login')
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
