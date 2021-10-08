import React, { useState, useRef } from "react"
import { useAuth } from "../../Contexts/AuthContext"
import { Link } from "react-router-dom"
import Alert from "../Alert/Alert"
import "./EditProfile.css"
function EditProfile() {
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("")
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const nameRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { passwordUpdate, emailUpdate, currentUser, profileUpdate } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSeverity("")
    setMessage("")
    try {
      if (nameRef.current.value) {
        await profileUpdate(nameRef.current.value)
      }
    } catch (err) {
      setSeverity("error")
      setMessage("Failed to update name")
      return setLoading(false)
    }
    try {
      if (emailRef.current.value) {
        await emailUpdate(emailRef.current.value)
      }
    } catch (err) {
      setSeverity("error")
      if (err.code === "auth/invalid-email") {
        setMessage("Invalid Email Address")
        return setLoading(false)
      } else if (err.code === "auth/email-already-in-use") {
        setMessage("Email already in use by other user")
        return setLoading(false)
      } else if (err.code === "auth/requires-recent-login") {
        setMessage(
          "Something went wrong.. Please login again to change the email."
        )
        return setLoading(false)
      } else {
        setMessage("Failed to update email")
        return setLoading(false)
      }
    }

    try {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        setSeverity("error")
        setMessage("Password do not match")
        return setLoading(false)
      }
      if (passwordRef.current.value) {
        await passwordUpdate(passwordRef.current.value)
      }
    } catch (err) {
      setSeverity("error")
      if (err.code === "auth/weak-password") {
        setMessage("Weak password.. Please enter a strong password")
        return setLoading(false)
      } else if (err.code === "auth/requires-recent-login") {
        setMessage(
          "Something went wrong.. Please login again to change the password."
        )
        return setLoading(false)
      } else {
        setMessage("Failed to update email")
        return setLoading(false)
      }
    }
    setLoading(false)
    setSeverity("success")
    setMessage("Updated successfully")
  }

  return (
    <div className="central-container">
      <div id="editprofile">
        <div id="form">
          <h1>Edit Profile</h1>
          <div style={{ marginTop: "1rem" }}>
            {message && (
              <Alert key={message} severity={severity} message={message} />
            )}
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-field-container">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-input"
                type="text"
                placeholder="Enter your name"
                ref={nameRef}
                defaultValue={
                  currentUser.displayName ? currentUser.displayName : ""
                }
              />
            </div>
            <div className="form-field-container">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                placeholder="Enter Email"
                ref={emailRef}
                defaultValue={currentUser.email}
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
              />
            </div>
            <div className="form-submit-container">
              <button className="form-button" type="submit" disabled={loading}>
                {loading ? "Updating details..." : "Submit"}
              </button>
            </div>
          </form>

          <Link to="/">
            <button className="form-button">Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
