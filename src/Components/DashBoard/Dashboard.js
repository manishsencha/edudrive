import React from "react"
import { useAuth } from "../../Contexts/AuthContext"

function Dashboard() {
  const { currentUser, admin } = useAuth()
  console.log(currentUser)
  console.log(admin)
  return <div></div>
}

export default Dashboard
