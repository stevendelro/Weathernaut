import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
import { getWeather } from '../../../../store/weather/action'

function SecondaryListItems(props) {
  const { closeDrawer } = props

  function handleClick(event) {
    closeDrawer()
    props.getWeather(event.currentTarget.attributes.value.value)
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
    getWeather: bindActionCreators(getWeather, dispatch),
  }
}
export default connect(null, mapDispatchToProps)(SecondaryListItems)
