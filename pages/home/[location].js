import { connect } from 'react-redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import MyMap from '../../components/home/MyMap'
import CurrentTemp from '../../components/home/CurrentTemp'
import UpcomingWeek from '../../components/home/UpcomingWeek'
import RightNowTable from '../../components/home/RightNowTable'
import Next24Chart from '../../components/home/Next24Chart'

const useStyles = makeStyles(theme => ({
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

function Home({ noWeatherData, noLocationData }) {
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

function mapStateToProps({ weather, location }) {
  const { noWeatherData } = weather
  const { noLocationData } = location
  return { noWeatherData, noLocationData }
}
export default connect(mapStateToProps, null)(Home)
