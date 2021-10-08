import { Alert } from "@material-ui/lab"

const MUIAlert = (props) => {
  return <Alert severity={props.severity}>{props.message}</Alert>
}

export default MUIAlert;