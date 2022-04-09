import './register.css'

const Register = () => {
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
            <input placeholder="Username" className="loginInput" />
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <input placeholder="Confirm Password" className="loginInput" />
            <button className="loginButton">Sign Up</button>
            <span className="loginForgot">Already have an account?</span>
            <button className="loginRegisterButton">Log In</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
