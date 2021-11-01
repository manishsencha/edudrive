import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../Contexts/AuthContext"
function AdminRoute({ component: Component, ...rest }) {
  const { admin } = useAuth()
  return (
    <Route
      {...rest}
      render={(props) => {
        return admin ? <Component {...props} /> : <Redirect to="/home" />
      }}
    />
  )
}

export default AdminRoute
