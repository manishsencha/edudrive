import React, { useState } from "react"
import { useAuth } from "../../Contexts/AuthContext"
import "./Dashboard.css"
import Alert from "../Alert/Alert"
import { useHistory, Link } from "react-router-dom"
function Dashboard() {
  const { currentUser, logout } = useAuth()
  console.log(currentUser)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("")
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setSeverity("")
    try {
      await logout().then(() => {
        setSeverity("success")
        setMessage("Logout Successful")
        setLoading(false)
        history.push("/signin")
      })
    } catch (err) {
      setSeverity("error")
      setMessage("Failed to Log Out")
      setLoading(false)
    }
  }
  return (
    <div className="central-container">
      <div id="dashboard">
        <div className="dashboard-title">Profile</div>
        <div>{message && <Alert severity={severity} message={message} />}</div>
        <div className="dashboard-data">
          <strong>Email : </strong>
          {currentUser && <>{currentUser.email}</>}
        </div>
        <div className="dashboard-data">
          <strong>Name : </strong>
          {currentUser.displayName ? (
            <>{currentUser.displayName}</>
          ) : (
            "Name Not Set."
          )}
        </div>
        <Link to="/editprofile" style={{ marginBottom: "1rem" }}>
          <button className="form-button">Edit Profile</button>
        </Link>
        <button
          className="form-button"
          disabled={loading}
          onClick={handleSubmit}>
          Log Out
        </button>
      </div>
    </div>
  )
}

export default Dashboard
