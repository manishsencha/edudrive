import React from "react"
import Signup from "./Components/Signup/Signup"
import { AuthProvider } from "./Contexts/AuthContext"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import PrivateRoute from "./Utils/PrivateRoute"
import AdminRoute from "./Utils/AdminRoute"
import FreeRoute from "./Utils/FreeRoute"
import Dashboard from "./Components/DashBoard/Dashboard"
import Profile from "./Components/Profile/Profile"
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword"
import Home from "./Components/Home/Home"
import Signin from "./Components/Signin/Signin"
import NavBar from "./Components/NavBar/NavBar"
import PendingReviews from "./Components/PendingReviews/PendingReviews"
import Upload from "./Components/Upload/Upload"
import VerifyRoute from "./Utils/VerifyRoute"
import VerifyAccount from "./Components/VerfiyAccount/VerifyAccount"
function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/profile" component={Profile} />
          <AdminRoute path="/pendingreviews" component={PendingReviews} />
          <FreeRoute path="/home" component={Home} />
          <FreeRoute path="/signup" component={Signup} />
          <FreeRoute path="/signin" component={Signin} />
          <FreeRoute path="/forgotpassword" component={ForgotPassword} />
          <PrivateRoute path="/upload" component={Upload} />
          <VerifyRoute path="/verifyaccount" component={VerifyAccount} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
