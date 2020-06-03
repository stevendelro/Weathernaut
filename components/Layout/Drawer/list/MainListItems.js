import { connect } from 'react-redux'
import Router from 'next/router'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import HistoryIcon from '@material-ui/icons/History'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import DateRangeIcon from '@material-ui/icons/DateRange'
import getShortName from '../../../../util/getShortName'
import capitalizeFirstLetter from '../../../../util/capitalizeFirstLetter'

const MainListItems = props => {
  // From parent
  const { setAppBarTitle, closeDrawer } = props

  // From connect
  const { noWeatherData, placeName } = props

  const closeDrawerAndShowSearch = event => {
    event.preventDefault()
    closeDrawer()
    Router.push('/search')
  }

  const closeDrawerAndShowPage = (page, place) => event => {
    event.preventDefault()
    closeDrawer()
    place
      ? Router.push(`/${page}/[location]`, `/${page}/${getShortName(place)}`)
      : Router.push(`/${page}`)
    setAppBarTitle(capitalizeFirstLetter(page))
  }

  return (
    <>
      {/* Home */}
      <ListItem
        button
        component='a'
        onClick={event => {
          if (noWeatherData) {
            closeDrawerAndShowSearch()
          } else {
            closeDrawerAndShowPage('home', placeName)(event)
          }
        }}>
        <ListItemIcon>
          <LocationOnIcon />
        </ListItemIcon>
        <ListItemText primary='Home' />
      </ListItem>

      {/* Hourly */}
      <ListItem
        button
        component='a'
        onClick={event => {
          if (noWeatherData) {
            closeDrawerAndShowSearch()
          } else {
            closeDrawerAndShowPage('hourly', placeName)(event)
          }
        }}>
        <ListItemIcon>
          <QueryBuilderIcon />
        </ListItemIcon>
        <ListItemText primary='Hourly' />
      </ListItem>

      {/* Daily */}
      <ListItem
        button
        component='a'
        onClick={event => {
          if (noWeatherData) {
            closeDrawerAndShowSearch()
          } else {
            closeDrawerAndShowPage('daily', placeName)(event)
          }
        }}>
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText primary='Daily' />
      </ListItem>

      {/* History */}
      <ListItem
        button
        component='a'
        onClick={() => {
          if (noWeatherData) {
            closeDrawerAndShowSearch()
          } else {
            closeDrawer()
            closeDrawerAndShowPage('history', null)(event)
          }
        }}>
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary='Search History' />
      </ListItem>
    </>
  )
}

function mapStateToProps({ weather, location }) {
  const { noWeatherData } = weather
  const { placeName } = location
  return { noWeatherData, placeName }
}

export default connect(mapStateToProps, null)(MainListItems)
