import React, { useState, useRef } from "react"
import { useAuth } from "../../Contexts/AuthContext"
import { Box, Stack, Button, TextField, Alert, Typography } from "@mui/material"
import { updateProfile } from "@firebase/auth"
export default function Profile() {
  const { currentUser } = useAuth()
  const [globalDisable, setGlobalDisable] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("")
  const [editName, setEditName] = useState(false)
  const [name, setName] = useState(currentUser.displayName)
  const formRef = useRef()
  console.log(currentUser)
  const handleNameUpdate = async (e) => {
    e.preventDefault()
    setGlobalDisable(true)
    if (!name) {
    }
    try {
      await updateProfile(currentUser, { displayName: name })
      setSeverity("success")
      setMessage("Name updated successfully!!")
    } catch (e) {
      setSeverity("error")
      setMessage("Failed to change the name!! Please try again!!")
    }
    setGlobalDisable(false)
    setEditName(false)
  }
  const handlePasswordChange = (e) => {
    e.preventDefault()
    setGlobalDisable(true)
    setGlobalDisable(false)
  }
  return (
    <Box sx={{ p: 2, pt: 10 }}>
      {message && (
        <Alert
          onClose={() => {
            setMessage("")
            setSeverity("")
          }}
          sx={{ position: "fixed", bottom: 1, margin: 1 }}
          severity={severity}>
          {message}
        </Alert>
      )}
      <center>
        <h1>Profile</h1>
      </center>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 20,
        }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box sx={{ fontWeight: "bold" }}>Name :</Box>
          <Box>
            {editName ? (
              <TextField
                value={name}
                required
                size="small"
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              name
            )}
          </Box>
          <Box>
            {editName ? (
              <Button
                variant="outlined"
                disabled={globalDisable}
                onClick={handleNameUpdate}>
                Update
              </Button>
            ) : (
              <Button
                variant="outlined"
                disabled={globalDisable}
                onClick={() => setEditName(true)}>
                Edit
              </Button>
            )}
          </Box>
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "700px",
            mt: 2,
          }}
          component="form"
          ref={formRef}
          onSubmit={handlePasswordChange}>
          <Typography sx={{ my: 1 }} variant="h5" component="h5">
            Update Password
          </Typography>
          <TextField sx={{ my: 1 }} label="New Password" required />
          <TextField sx={{ my: 1 }} label="Retype new password" required />
          <Button type="submit" variant="contained" size="large">
            Change
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
