import React, { useState, useRef } from "react"
import "./Login.css"
import { useAuth } from "../../Contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Alert from "../Alert/Alert"
function Login() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("")
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setSeverity("")
    await login(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        setSeverity("success")
        setMessage("Loggedin Successfully")
        history.push("/")
      })
      .catch((err) => {
        setSeverity("error")
        console.log(err)
        if (err.code === "auth/user-not-found") {
          setMessage(
            "You are not registered with us. Please Sign Up and Log in again."
          )
        } else if (err.code === "auth/wrong-password") {
          setMessage("Incorrect Password")
        } else if (err.code === "auth/network-request-failed") {
          setMessage("Failed to connect to internet")
        } else if (err.code === "auth/timeout") {
          setMessage("Connection Timeout")
        }
        setLoading(false)
      })
  }

  return (
    <div className="central-container">
      <div id="login">
        <div id="form">
          <h1>Log In</h1>
          <div style={{ marginTop: "1rem" }}>
            {message && <Alert severity={severity} message={message} />}
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-field-container">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                placeholder="Enter Email"
                ref={emailRef}
                required
              />
            </div>
            <div className="form-field-container">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                placeholder="Enter password"
                ref={passwordRef}
                required
              />
            </div>
            <div className="form-submit-container">
              <button className="form-button" type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Log In"}
              </button>
            </div>
          </form>
          <h3>
            Need an account? <Link to="/signup">Sign Up</Link>
          </h3>
          <button className="form-button" style={{ marginTop: "1rem"}}>
            <Link
              to="/forgotpassword"
              style={{ color: "inherit", textDecoration: "none" }}>
              Forgot Password?
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
