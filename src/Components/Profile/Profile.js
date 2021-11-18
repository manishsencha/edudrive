import React, { useState } from "react"
import { useAuth } from "../../Contexts/AuthContext"
import { Box, Stack, Button, TextField } from "@mui/material"
export default function Profile() {
  const { currentUser } = useAuth()
  const [editName, setEditName] = useState(false)
  const [name, setName] = useState(currentUser.displayName)
  console.log(currentUser)
  const handleNameUpdate = (e) => {
    e.preventDefault()
    setEditName(false)
  }
  return (
    <Box sx={{ p: 2, pt: 10 }}>
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
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              name
            )}
          </Box>
          <Box>
            {editName ? (
              <Button variant="outlined" onClick={handleNameUpdate}>
                Update
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setEditName(true)}>
                Edit
              </Button>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
