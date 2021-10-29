import React from "react"
import { useAuth } from "../../Contexts/AuthContext"

function Dashboard() {
  const { admin } = useAuth()
  console.log(admin)
  return <div></div>
}

export default Dashboard
