import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { teal, orange } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[800],
    },
    secondary: {
      main: orange[800],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
