import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../Contexts/AuthContext"
function VerifiedRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser && !currentUser.emailVerified ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }}
    />
  )
}

export default VerifiedRoute
