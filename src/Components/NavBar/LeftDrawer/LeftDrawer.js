import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Link from "@mui/material/Link"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import BookIcon from "@mui/icons-material/Book"
import { useAuth } from "../../../Contexts/AuthContext"
import { useHistory } from "react-router-dom"
export default function LeftDrawer(props) {
  const history = useHistory()
  const { currentUser, logout } = useAuth()
  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await logout().then(history.pushState("/signin"))
    } catch {}
  }
  return (
    <Drawer anchor="left" open={props.status} onClose={props.toggle}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={props.toggle}
        onKeyDown={props.toggle}>
        {currentUser ? (
          <List>
            <ListItem button>
              <Link
                style={{ width: "100%", display: "flex" }}
                underline="none"
                href="/courses">
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary="Courses" />
              </Link>
            </ListItem>
            <ListItem onClick={handleLogout} button>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem button>
              <Link
                style={{ width: "100%", display: "flex" }}
                underline="none"
                href="/signin">
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Signin" />
              </Link>
            </ListItem>
          </List>
        )}
      </Box>
    </Drawer>
  )
}
