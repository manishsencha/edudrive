import React, { useState } from "react"
import { Alert, Box, Button, CircularProgress } from "@mui/material"
import { useAuth } from "../../Contexts/AuthContext"
import { sendEmailVerification } from "firebase/auth"
function VerifyAccount() {
  const [loading, setLoading] = useState(false)
  const [severity, setSeverity] = useState("")
  const [message, setMessage] = useState(null)
  const { currentUser } = useAuth()
  async function handleSubmit() {
    setLoading(true)
    setMessage(null)
    setSeverity("")
    await sendEmailVerification(currentUser)
      .then(() => {
        setSeverity("success")
        setMessage("Verification Email Sent!!")
        setLoading(false)
      })
      .catch((err) => {
        setSeverity("error")
        setMessage("Something went wrong. Please try again..")
        setLoading(false)
      })
  }
  return (
    <Box sx={{ pt: 10, display: "flex", justifyContent: "center" }}>
      <Box sx={{ maxWidth: "800px" }}>
        {message && <Alert severity={severity}>{message}</Alert>}
        <h1>Please verify your account to continue</h1>
        <Button variant="contained" disabled={loading} onClick={handleSubmit}>
          {loading ? <CircularProgress /> : "Send Email"}
        </Button>
      </Box>
    </Box>
  )
}

export default VerifyAccount
