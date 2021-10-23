import React from "react"
import Signup from "./Components/Signup/Signup"
import { AuthProvider } from "./Contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Components/DashBoard/Dashboard"
import PrivateRoute from "./Utils/PrivateRoute"
import EditProfile from "./Components/EditProfile/EditProfile"
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword"
import Home from "./Components/Home/Home"
import Signin from "./Components/Signin/Signin"
function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/editprofile" component={EditProfile} />
          <Route path="/home" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/forgotpassword" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
