import React, { useState, useRef } from "react"
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
import { useHistory } from "react-router-dom"
import { useAuth } from "../../Contexts/AuthContext"
import { Alert } from "@mui/material"
import "./Signin.css"
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

export default function Signin() {
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
    if (
      !(
        emailRef.current.reportValidity() &&
        passwordRef.current.reportValidity()
      )
    ) {
      setLoading(false)
      return
    }
    await login(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        setSeverity("success")
        setMessage("Loggedin Successfully")
        history.push("/")
      })
      .catch((err) => {
        setSeverity("error")
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
        } else {
          setMessage("Sorry. It didn't work.")
        }
        setLoading(false)
      })
  }

  return (
    <div id="signin">
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
              Sign in
            </Typography>
            {message && <Alert severity={severity}>{message}</Alert>}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}>
              <TextField
                required
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                inputRef={emailRef}
                autoComplete="email"
                autoFocus
              />
              <TextField
                required
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputRef={passwordRef}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  )
}
