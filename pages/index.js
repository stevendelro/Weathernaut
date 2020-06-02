import { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Container from '@material-ui/core/Container'
import MyMap from '../components/home/MyMap'
import CurrentTemp from '../components/home/CurrentTemp'
import UpcomingWeek from '../components/home/UpcomingWeek'
import RightNowTable from '../components/home/RightNowTable'
import Next24Chart from '../components/home/Next24Chart'
import deniedGeo from '../store/geolocation/action'
import showSearchOnGeoDenial from '../store/showSearch/action'
import logLastCity from '../store/history/action'
import { getWeatherByCoords } from '../store/weather/action'
import { getLocationByCoords } from '../store/location/action'

const useStyles = makeStyles(theme => ({
  content: {
    width: '100%',
    marginTop: '65px',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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

const Index = props => {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  // Action creators
  const {
    getWeatherByCoords,
    getLocationByCoords,
    setDisplayedPage,
    logLastCity,
    showSearchOnGeoDenial,
    deniedGeo,
  } = props

  // State
  const { location, weather, showSearch } = props

  // Get permission to use browser's geolocation API
  const getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    }).catch(error => {
      deniedGeo(error)
    })
  }
  // Receive coordinates from geolocation. If denied, display simple search page.
  useEffect(() => {
    getPosition()
      .then(({ coords }) => {
        getWeatherByCoords([coords.latitude, coords.longitude])
        getLocationByCoords([coords.latitude, coords.longitude])
      })
      .catch(() => {
        setDisplayedPage('search')
        showSearchOnGeoDenial()
      })
  }, [])

  useEffect(() => {
    if (location.placeName) {
      logLastCity(location.placeName)
    }
  }, [location.placeName])

  return (
    <div>
      {(weather.noWeatherData && showSearch.needsSearchPage) ||
      weather.loading ? (
        <LinearProgress color='secondary' />
      ) : (
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MyMap key={props.key} />
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
        </Container>
      )}
    </div>
  )
}

function mapStateToProps({ location, weather, showSearch }) {
  return { location, weather, showSearch }
}

const mapDispatchToProps = dispatch => {
  return {
    getWeatherByCoords: bindActionCreators(getWeatherByCoords, dispatch),
    getLocationByCoords: bindActionCreators(getLocationByCoords, dispatch),
    logLastCity: bindActionCreators(logLastCity, dispatch),
    deniedGeo: bindActionCreators(deniedGeo, dispatch),
    showSearchOnGeoDenial: bindActionCreators(showSearchOnGeoDenial, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)
