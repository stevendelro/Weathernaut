import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import toast from '../../toast'
import useStyles from './useStyles'
import {
  startLocationFetchByPlaceName,
  getLocationByPlaceName,
} from '../../../store/location/action'
import {
  startWeatherFetch,
  getWeatherByCoords,
} from '../../../store/weather/action'
import { logLastCity } from '../../../store/history/action'
import getShortName from '../../../util/getShortName'
import { clearMapBoxError } from '../../../store/error/action'

function MyAppBar(props) {
  const [userInput, setUserInput] = useState('')
  const [displayToast, setDisplayToast] = useState(false)
  const [err, setErr] = useState('')
  const classes = useStyles()

  const {
    // Action Creators
    startLocationFetchByPlaceName,
    getLocationByPlaceName,
    startWeatherFetch,
    getWeatherByCoords,
    clearMapBoxError,
    logLastCity,
    // State
    noWeatherData,
    deniedGeolocation,
    error,
    // From parent
    openDrawer,
    setOpenDrawer,
    appBarTitle,
  } = props

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const submitHandler = async event => {
    let slug
    event.preventDefault()
    startLocationFetchByPlaceName()
    await getLocationByPlaceName(userInput)
      .then(locationData => {
        setUserInput('')
        if (locationData.type !== 'ERROR_MAPBOX') {
          logLastCity(locationData.placeName)
          slug = getShortName(locationData.placeName.toLowerCase())
          startWeatherFetch()
          getWeatherByCoords([locationData.latitude, locationData.longitude])
        }
      })
      .then(() => {
        slug ? Router.push('/[location]/today', `/${slug}/today`) : null
      })
      .catch(error => console.log('Invalid Search Term: ', error))
  }

  useEffect(() => {
    if (error.mapBoxError) {
      setErr(error.message.casual)
      setDisplayToast(true)
    }
  }, [error])

  const handleToastClose = () => {
    setDisplayToast(false)
    clearMapBoxError()
  }

  return (
    <AppBar position='absolute' className='classes.appBar'>
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
        <Hidden only='xs'>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}>
            {appBarTitle}
          </Typography>
        </Hidden>

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
      {toast(displayToast, handleToastClose, err, 'error')}
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
    logLastCity: bindActionCreators(logLastCity, dispatch),
    clearMapBoxError: bindActionCreators(clearMapBoxError, dispatch),
  }
}
function mapStateToProps({ location, weather, error }) {
  const { deniedGeolocation } = location
  const { noWeatherData } = weather
  return { noWeatherData, deniedGeolocation, error }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAppBar)
