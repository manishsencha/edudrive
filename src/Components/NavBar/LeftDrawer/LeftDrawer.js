import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import MailIcon from "@mui/icons-material/Mail"

export default function LeftDrawer(props) {
  return (
    <Drawer anchor="left" open={props.status} onClose={props.toggle}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={props.toggle}
        onKeyDown={props.toggle}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}
