import { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getLocationByPlaceName } from '../../../../store/location/action'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import MovieFilterIcon from '@material-ui/icons/MovieFilter'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle'
import EuroIcon from '@material-ui/icons/Euro'
import TranslateIcon from '@material-ui/icons/Translate'
import AcUnitIcon from '@material-ui/icons/AcUnit'

function SecondaryListItems(props) {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [placeName, setPlaceName] = useState('')
  const { closeDrawer } = props

  function handleClick(event) {
    closeDrawer()
    setPlaceName(event.currentTarget.attributes.value.value)
    setShouldFetch(true)
  }

  return (
    <div>
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
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getLocationByPlaceName: bindActionCreators(
      getLocationByPlaceName,
      dispatch
    ),
  }
}
export default connect(null, mapDispatchToProps)(SecondaryListItems)

// const quickLinksHandler = async location => {
//   // const poop = await props.getLocationByPlaceName(location)
//   console.log('poop', await props.getLocationByPlaceName(location))
//   // const coords = [latitude, longitude]
//   // props.setWeather(coords)
//   // props.setDisplayedPage('home')
// }
