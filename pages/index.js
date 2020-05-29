// TODO:
// 2. Fix all useEffects
// 3. handle dispatch issues
// 4. Fix issues listed in drawer
// 5. Import all the other main pages.
// 6. Fix SearchPage. Make sure it receives what it needs to do what it does.

import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '../components/AppBar'
import Drawer from '../components/Drawer'

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
  const [location, setLocation] = useState('')
  const [openDrawer, setOpenDrawer] = useState(false)
  const [displayedPage, setDisplayedPage] = useState('home')
  const [appBarTitle, setAppBarTitle] = useState('React Weather Dashboard')
  const classes = useStyles()

  const {
    weather,
    setWeather,
    setLocationByCoords,
    logLastCity,
    showSearch,
    deniedGeo
  } = props

  // Get permission to use browser's geolocation API
  const getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    }).catch( error => {
      deniedGeo(error)
    })
  }

  // Use geolocation coords to get weather and location info on initial load.
  useEffect(() => {
    getPosition().then(({ coords }) => {
      setInitialCoords([coords.latitude, coords.longitude])
    })
  }, [])
  setWeather(initialCoords)
  setLocationByCoords(initialCoords)

  // Add the location of the current weather fetch to search history.
  useEffect(() => {
    if (location.location.placeName) {
      logLastCity(location.location.placeName)
    }
  }, [location.location.placeName])

  // Handle rejected permission for geolocation positioning
  if (state.deniedGeolocation && state.needsSearchPage) {
    setDisplayedPage('search')
    dispatch({
      type: 'SEARCH_PAGE_DISPLAYED',
    })
  }

  return (
    <>
      <AppBar
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        location={location}
        setLocation={setLocation}
        appBarTitle={appBarTitle}
      />
      <Drawer
        setDisplayedPage={setDisplayedPage}
        setAppBarTitle={setAppBarTitle}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      {(weather.noWeatherData && showSearch.needsSearchPage) ||
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
      )}
    </>
  )
}

function mapStateToProps({
  weather,
  location,
  history,
  error,
  deniedGeo,
  showSearch,
}) {
  return { weather, location, history, error, deniedGeo, showSearch }
}

const mapDispatchToProps = dispatch => {
  return {
    setWeather: bindActionCreators(setWeather, dispatch),
    setLocationByCoords: bindActionCreators(setLocationByCoords, dispatch),
    logLastCity: bindActionCreators(logLastCity, dispatch),
    deniedGeo: bindActionCreators(deniedGeo, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)
