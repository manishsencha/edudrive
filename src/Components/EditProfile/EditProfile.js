import React, { useState, useRef } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useAuth } from "../../Contexts/AuthContext"
const theme = createTheme()

export default function SignIn() {
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("")
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const nameRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { passwordUpdate, emailUpdate, currentUser, profileUpdate } = useAuth()
  console.log(currentUser)
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
       
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
               
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
