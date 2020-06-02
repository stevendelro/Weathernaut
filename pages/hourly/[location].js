import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import HourTemp from '../../components/hourly/HourTemp'
import HourHumidity from '../../components/hourly/HourHumidity'
import HourUV from '../../components/hourly/HourUV'
import HourBarometer from '../../components/hourly/HourBarometer'
import HourCloud from '../../components/hourly/HourCloud'
import HourRain from '../../components/hourly/HourRain'
import HourlyTable from '../../components/hourly/HourlyTable'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

function Hourly() {
  const classes = useStyles()
  return (
    <Container maxWidth='lg' className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HourlyTable />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <HourTemp />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <HourHumidity />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <HourCloud />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <HourRain />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <HourUV />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <HourBarometer />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Hourly
