import React, { useState, useRef } from "react"
import "./Signup.css"
import { useAuth } from "../../Contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Alert from "../Alert/Alert"
function Signup() {
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("")
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setSeverity("error")
      return setMessage("Passwords do not match")
    }
    try {
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      setSeverity("success")
      setMessage("Signed Up Successfully")
      setLoading(false)
      history.push("/login")
    } catch (e) {
      if (e.code === "auth/weak-password") {
        setMessage("The password is too weak.")
        setSeverity("error")
      } else if (e.code === "auth/email-already-in-use") {
        setSeverity("error")
        setMessage("Email already exists.")
      } else if (e.code === "auth/invalid-email") {
        setSeverity("error")
        setMessage("Please Enter a valid email address.")
      } else if (e.code === "auth/operation-not-allowed") {
        setSeverity("error")
        setMessage("The feature is disabled by the Admin.")
      } else {
        setSeverity("error")
        setMessage("Something unexpected happened!")
      }
    }
    setLoading(false)
  }

  return (
    <div className="central-container">
      <div id="signup">
        <div id="form">
          <h1>Create an Account</h1>
          <div style={{ marginTop: "1rem" }}>
            {message && (
              <Alert key={message} severity={severity} message={message} />
            )}
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
            <div className="form-field-container">
              <label className="form-label" htmlFor="password">
                Confirm Password
              </label>
              <input
                className="form-input"
                type="password"
                placeholder="Re-enter password"
                ref={passwordConfirmRef}
                required
              />
            </div>
            <div className="form-submit-container">
              <button className="form-button" type="submit" disabled={loading}>
                {loading ? "Signing up..." : "Signup"}
              </button>
            </div>
          </form>
          <h3>
            Already have an account? <Link to="/login">Log In</Link>{" "}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Signup
