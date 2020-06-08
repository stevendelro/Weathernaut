import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

function toast(
  onOpen,
  onClose,
  message,
  severity = 'error' || 'warning' || 'info' || 'success',
  autoHideDuration = 5000
) {
  return (
    <Snackbar
      open={onOpen}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={onClose}>
      <Alert onClose={onClose} variant='standard' severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default toast
