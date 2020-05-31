// TODO:
// 4. Fix issues listed in drawer
// 5. Import all the other main pages.
// 6. Fix SearchPage. Make sure it receives what it needs to do what it does.

import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setWeather } from '../store/weather/action'
import { setLocationByCoords } from '../store/location/action'
import { deniedGeo } from '../store/geolocation/action'
import { showSearchOnGeoDenial } from '../store/showSearch/action'
import { logLastCity } from '../store/history/action'
import { makeStyles } from '@material-ui/core/styles'

// import LinearProgress from '@material-ui/core/LinearProgress'
const useStyles = makeStyles(theme => ({
  linearProgressBar: {
    width: '100%',
    marginTop: '65px',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

const Index = props => {
  const [initialCoords, setInitialCoords] = useState([])
  const classes = useStyles()

  // Action creators
  const {
    setWeather,
    setLocationByCoords,
    logLastCity,
    showSearchOnGeoDenial,
    deniedGeo,
  } = props

  // State
  const {
    weather,
    history,
    location,
    geolocation,
    showSearch,
  } = props

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
        setInitialCoords([coords.latitude, coords.longitude])
      })
      .catch(() => {
        setDisplayedPage('search')
        showSearchOnGeoDenial()
      })
  }, [])

  if (initialCoords) {
    setWeather(initialCoords)
    setLocationByCoords(initialCoords)
  }


  useEffect(() => {
    if (location.placeName) {
      logLastCity(location.placeName)
    }
  }, [location.placeName])


  return (
    <>
      {/*{(weather.noWeatherData && showSearch.needsSearchPage) ||
      weather.weather.loading ? (
        <LinearProgress
          className={classes.linearProgressBar}
          color='secondary'
        />
      ) : (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth='l' className={classes.container}>
            {servePage(displayedPage, location, setLocation)}
            <Box pt={4}>
              <Copyleft />
            </Box>
          </Container>
        </main>
      )} */}
    </>
  )
}

function mapStateToProps({
  weather,
  location,
  history,
  error,
  geolocation,
  showSearch,
}) {
  return { weather, location, history, error, geolocation, showSearch }
}

const mapDispatchToProps = dispatch => {
  return {
    setWeather: bindActionCreators(setWeather, dispatch),
    setLocationByCoords: bindActionCreators(setLocationByCoords, dispatch),
    logLastCity: bindActionCreators(logLastCity, dispatch),
    deniedGeo: bindActionCreators(deniedGeo, dispatch),
    showSearchOnGeoDenial: bindActionCreators(showSearchOnGeoDenial, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)
