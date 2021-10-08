import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../Contexts/AuthContext"
import Alert from "../Alert/Alert"
import "./ForgotPassword.css"
function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [severity, setSeverity] = useState("")
  const [message, setMessage] = useState("")
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSeverity("")
    setMessage("")
    try {
      await resetPassword(emailRef.current.value)
      setSeverity("success")
      setMessage(
        "Password reset email sent. Check your email for further instructions"
      )
    } catch (err) {
      setSeverity("error")
      if (err.code === "auth/invalid-email") {
        setMessage("Please enter a valid email")
      } else if (err.code === "auth/user-not-found") {
        setMessage("User does not exist")
      } else {
        setMessage("Something went wrong")
      }
    }
    setLoading(false)
  }
  return (
    <div className="central-container">
      <div id="forgotpassword">
        <div id="form">
          <h1>Forgot Password</h1>
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
            <div className="form-submit-container">
              <button className="form-button" type="submit" disabled={loading}>
                {loading ? "Sending Link.." : "Send link"}
              </button>
            </div>
          </form>
          <Link to="/login">
            <button className="form-button">Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
