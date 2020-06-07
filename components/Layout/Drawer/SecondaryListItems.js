import { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import EuroIcon from '@material-ui/icons/Euro'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import TranslateIcon from '@material-ui/icons/Translate'
import MovieFilterIcon from '@material-ui/icons/MovieFilter'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle'
import {
  startLocationFetchByPlaceName,
  getLocationByPlaceName,
} from '../../../store/location/action'
import {
  startWeatherFetch,
  getWeatherByCoords,
} from '../../../store/weather/action'

function SecondaryListItems(props) {
  const {
    // Action creators
    startLocationFetchByPlaceName,
    getLocationByPlaceName,
    startWeatherFetch,
    getWeatherByCoords,
    // State
    urlSlug,
    latitude,
    longitude,
    // From parent
    closeDrawer,
  } = props

  const handleClick = async event => {
    event.preventDefault()
    closeDrawer()
    startLocationFetchByPlaceName()
    await getLocationByPlaceName(event.currentTarget.attributes.value.value)
  }

  useEffect(() => {
    if (latitude && longitude) {
      startWeatherFetch()
      getWeatherByCoords([latitude, longitude])
      goHome()
    }
  }, [latitude, longitude])

  const goHome = () => {
    Router.push('/home/[location]', `/home/${urlSlug}`)
  }

  return (
    <>
      <ListSubheader inset>Quick Links</ListSubheader>
      <ListItem button onClick={handleClick} value='los angeles'>
        <ListItemIcon>
          <MovieFilterIcon />
        </ListItemIcon>
        <ListItemText primary='Los Angeles' />
      </ListItem>
      <ListItem button onClick={handleClick} value='new york'>
        <ListItemIcon>
          <LocationCityIcon />
        </ListItemIcon>
        <ListItemText primary='New York' />
      </ListItem>
      <ListItem button onClick={handleClick} value='tokyo'>
        <ListItemIcon>
          <AirportShuttleIcon />
        </ListItemIcon>
        <ListItemText primary='Tokyo' />
      </ListItem>
      <ListItem button onClick={handleClick} value='london'>
        <ListItemIcon>
          <EuroIcon />
        </ListItemIcon>
        <ListItemText primary='London' />
      </ListItem>
      <ListItem button onClick={handleClick} value='moscow'>
        <ListItemIcon>
          <AcUnitIcon />
        </ListItemIcon>
        <ListItemText primary='Moscow' />
      </ListItem>
      <ListItem button onClick={handleClick} value='beijing'>
        <ListItemIcon>
          <TranslateIcon />
        </ListItemIcon>
        <ListItemText primary='Beijing' />
      </ListItem>
    </>
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
function mapStateToProps({ location }) {
  const { urlSlug, latitude, longitude } = location
  return { urlSlug, latitude, longitude }
}
export default connect(mapStateToProps, mapDispatchToProps)(SecondaryListItems)
