import clsx from 'clsx'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import MyMap from '../../components/today/MyMap'
import Next24Chart from '../../components/today/Next24Chart'
import CurrentTemp from '../../components/today/CurrentTemp'
import UpcomingWeek from '../../components/today/UpcomingWeek'
import RightNowTable from '../../components/today/RightNowTable'

const useStyles = makeStyles(theme => ({
  content: {
    width: '100%',
    marginTop: '65px',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 330,
  },
}))

function Today() {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MyMap />
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper className={fixedHeightPaper}>
          <CurrentTemp />
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper className={fixedHeightPaper}>
          <UpcomingWeek />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <RightNowTable />
        </Paper>
      </Grid>

      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Next24Chart />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Today
