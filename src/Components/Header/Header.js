import { AccountCircle } from "@material-ui/icons"
import React from "react"
import {useAuth} from "../../Contexts/AuthContext"
import './Header.css'
function Header() {
  const {currentUser} = useAuth()
  return (
    <nav id="header">
      <div className="header-logo">
        <h1>EduDrive</h1>
      </div>
      <div className="header-current-user">{currentUser ? <a href="/">{currentUser.displayName}</a> : <AccountCircle/>}</div>
    </nav>
  )
}

export default Header
