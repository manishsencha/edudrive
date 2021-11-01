import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { useAuth } from "../../Contexts/AuthContext"
import LeftDrawer from "./LeftDrawer/LeftDrawer"
import { Link } from "@mui/material"
function NavBar() {
  const { currentUser } = useAuth()
  const [open, setOpen] = React.useState(false)
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setOpen(!open)
  }
  return (
    <Box sx={{zIndex:1000, flexGrow: 1, position:"fixed", width : "100%" }}>
      <LeftDrawer status={open} toggle={toggleDrawer} />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EduDrive
          </Typography>
          {currentUser ? (
            currentUser.displayName && currentUser.displayName
          ) : (
            <Button color="inherit">
              <Link href="/signin" style={{ color: "inherit" }}>
                Signin
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
