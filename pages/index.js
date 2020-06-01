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
import LinearProgress from '@material-ui/core/LinearProgress'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import CopyLeft from '../components/CopyLeft'
import servePage from '../util/servePage'

import daily from '../pages/daily'

const useStyles = makeStyles(theme => ({
  content: {
    width: '100%',
    marginTop: '65px',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  }
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
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
    <div className={classes.content}>
      {(weather.noWeatherData && showSearch.needsSearchPage) ||
      weather.loading ? (
        <LinearProgress color='secondary' />
      ) : (
        <Container maxWidth='lg' className={classes.container}>
          {servePage('daily')}
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
