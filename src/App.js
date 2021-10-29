import React from "react"
import Signup from "./Components/Signup/Signup"
import { AuthProvider } from "./Contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Components/DashBoard/Dashboard"
import PrivateRoute from "./Utils/PrivateRoute"
import Profile from "./Components/Profile/Profile"
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword"
import Home from "./Components/Home/Home"
import Signin from "./Components/Signin/Signin"
import NavBar from "./Components/NavBar/NavBar"
function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/profile" component={Profile} />
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
