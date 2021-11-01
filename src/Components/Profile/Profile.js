import React, { useState } from "react"
import { useAuth } from "../../Contexts/AuthContext"
import { Box } from "@mui/material"
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
    <Box sx={{ p: 2, pt: 8 }}>
      <center>
        <h1>Profile</h1>
      </center>
      <div style={{ display: "flex" }}>
        <div>Name :</div>
        {editName ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div>{name}</div>
        )}
        {editName ? (
          <div onClick={handleNameUpdate}>Update</div>
        ) : (
          <div onClick={() => setEditName(true)}>Edit</div>
        )}
      </div>
      <div style={{ display: "flex" }}>
        <div> Email : </div>
        <div>{currentUser.email}</div>
      </div>
    </Box>
  )
}
