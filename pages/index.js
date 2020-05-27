// TODO:
// 1. handle API call issues
//    -try with the counter template first to test serverless function shit
//    -try again, but use https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side
//    - hide the API keys broooooo
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

const Index = ({ weather, showSearch }) => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [location, setLocation] = useState('')
  const [appBarTitle, setAppBarTitle] = useState('React Weather Dashboard')
  const [displayedPage, setDisplayedPage] = useState('home')
  const classes = useStyles()

    // Retrieve browser geolocation on initial load.
    useEffect(() => {
      getPosition()
        .then(({ coords }) =>
          getWeather(coords.latitude, coords.longitude, dispatch)
        )
        .then(initialWeather => {
          dispatch({
            type: 'SET_WEATHER',
            payload: initialWeather,
          })
        })
        .catch(rejected =>
          dispatch({
            type: 'USER_DENIED_GEOLOCATION',
            payload: rejected,
          })
        )
    }, [])

    // Auto fetch the location name of the browser's Geolocation coordinates.
    useEffect(() => {
      getPosition()
        .then(({ coords }) =>
          getLocationData(null, coords.latitude, coords.longitude, dispatch)
        )
        .then(locationData => {
          dispatch({
            type: 'SET_LOCATION',
            payload: locationData,
          })
        })
        .catch(error => {
          console.log(
            "You denied auto-fetching the weather based on your browser's geolocation. Check your browser settings to reset and allow this feature."
          )
        })
    }, [])

    // Add the location of the current weather fetch to search history.
    useEffect(() => {
      if (state.location.placeName) {
        dispatch({
          type: 'LOG_LAST_CITY',
          payload: {
            location: state.location.placeName,
          },
        })
      }
    }, [state.location.placeName])

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

export default connect(state => state)(Index)
