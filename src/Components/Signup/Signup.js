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
import { useAuth } from "../../Contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { Alert } from "@mui/material"
import "./Signup.css"
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

export default function SignUp() {
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
    setLoading(true)
    if (
      !(
        emailRef.current.reportValidity() &&
        passwordRef.current.reportValidity() &&
        passwordConfirmRef.current.reportValidity()
      )
    ) {
      setLoading(false)
      return
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setSeverity("error")
      setLoading(false)
      return setMessage("Passwords do not match")
    }
    try {
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
    <div id="signup">
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
              Sign up
            </Typography>
            {message && <Alert severity={severity}>{message}</Alert>}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    inputRef={emailRef}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    inputRef={passwordRef}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    inputRef={passwordConfirmRef}
                    name="confirm-password"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}>
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  )
}
