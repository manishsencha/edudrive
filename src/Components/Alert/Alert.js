import { Alert } from "@mui/material"

const MUIAlert = (props) => {
  return <Alert severity={props.severity}>{props.message}</Alert>
}

export default MUIAlert;