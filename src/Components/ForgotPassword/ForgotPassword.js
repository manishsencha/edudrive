import React, { useRef, useState } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import "./ForgotPassword.css"
import { useAuth } from "../../Contexts/AuthContext"
import { Alert } from "@mui/material"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="#">
        EduDrive
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

export default function ForgotPassword() {
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
      console.log(err)
      if (err.code === "auth/invalid-email") {
        setMessage("Please enter a valid email")
      }
      if (err.code === "auth/missing-email") {
        setMessage("Please enter email")
      }
       else if (err.code === "auth/user-not-found") {
        setMessage("User does not exist")
      } else {
        setMessage("Something went wrong")
      }
    }
    setLoading(false)
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          {message && <Alert severity={severity}>{message}</Alert>}
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
              inputRef={emailRef}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              sx={{ mt: 2, mb: 2 }}>
              {loading ? "Sending Link..." : "Send Reset Link"}
            </Button>
            <Grid container>
              <Grid item sx={{ width: "100%" }}>
                <Link href="/signin" underline="none" variant="body2">
                  <Button fullWidth variant="contained" disabled={loading}>
                    SignIn
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
