import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import useStyles from './useStyles'
import {
  startLocationFetchByPlaceName,
  getLocationByPlaceName,
} from '../../../store/location/action'
import {
  startWeatherFetch,
  getWeatherByCoords,
} from '../../../store/weather/action'


function MyAppBar(props) {
  const [userInput, setUserInput] = useState('')
  const classes = useStyles()

  const {
    // Action Creators
    startLocationFetchByPlaceName,
    getLocationByPlaceName,
    startWeatherFetch,
    getWeatherByCoords,
    // State
    urlSlug,
    latitude,
    longitude,
    noWeatherData,
    deniedGeolocation,
    // From parent
    openDrawer,
    setOpenDrawer,
    appBarTitle,
  } = props

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }


  const submitHandler = async event => {
    event.preventDefault()
    startLocationFetchByPlaceName()
    await getLocationByPlaceName(userInput)
    setUserInput('')
  }

  useEffect(() => {
    if (latitude && longitude) {
      startWeatherFetch()
      getWeatherByCoords([latitude, longitude])
    }
  }, [latitude, longitude])

  useEffect(() => {
    if (!noWeatherData) {
      Router.push('/home/[location]', `/home/${urlSlug}`)
    }
  }, [noWeatherData])

  return (
    <AppBar
      position='absolute'
      className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          className={clsx(
            classes.menuButton,
            openDrawer && classes.menuButtonHidden
          )}>
          <MenuIcon />
        </IconButton>
        <Typography
          component='h1'
          variant='h6'
          color='inherit'
          noWrap
          className={classes.title}>
          {appBarTitle}
        </Typography>

        {/* Remove search input from AppBar if <Search /> is rendered. */}
        {noWeatherData && deniedGeolocation ? null : (
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={submitHandler}>
              <InputBase
                placeholder='Search..'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={userInput}
                onChange={event => setUserInput(event.target.value)}
              />
            </form>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    startLocationFetchByPlaceName: bindActionCreators(
      startLocationFetchByPlaceName,
      dispatch
    ),
    getLocationByPlaceName: bindActionCreators(
      getLocationByPlaceName,
      dispatch
    ),
    startWeatherFetch: bindActionCreators(startWeatherFetch, dispatch),
    getWeatherByCoords: bindActionCreators(getWeatherByCoords, dispatch),
  }
}
function mapStateToProps({ location, weather }) {
  const { urlSlug, latitude, longitude, deniedGeolocation } = location
  const { noWeatherData } = weather
  return { urlSlug, latitude, longitude, noWeatherData, deniedGeolocation }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAppBar)

