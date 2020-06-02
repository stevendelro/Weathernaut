import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import DailyTable from '../../components/daily/DailyTable'
import DailyTemps from '../../components/daily/DailyTemps'
import DailyHumidity from '../../components/daily/DailyHumidity'
import DailyClouds from '../../components/daily/DailyClouds'
import DailyRain from '../../components/daily/DailyRain'
import DailyUV from '../../components/daily/DailyUV'
import DailyBarometer from '../../components/daily/DailyBarometer'

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

function DailyPage() {
  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DailyTable />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <DailyTemps />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <DailyHumidity />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <DailyClouds />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <DailyRain />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <DailyUV />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <DailyBarometer />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DailyPage
