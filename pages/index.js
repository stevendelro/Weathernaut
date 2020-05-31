// TODO:
// 4. Fix issues listed in drawer
// 5. Import all the other main pages.
// 6. Fix SearchPage. Make sure it receives what it needs to do what it does.

import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getWeatherByCoords } from '../store/weather/action'
import { getLocationByCoords } from '../store/location/action'
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
  const classes = useStyles()

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
  const { location } = props

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

function mapStateToProps({ location }) {
  return { location }
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
