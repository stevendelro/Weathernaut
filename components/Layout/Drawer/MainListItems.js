import Router from 'next/router'
import { connect } from 'react-redux'
import moment from 'moment'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import HistoryIcon from '@material-ui/icons/History'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import DateRangeIcon from '@material-ui/icons/DateRange'
import getShortName from '../../../util/getShortName'

const MainListItems = props => {
  const dateToday = moment().format('dddd, MMMM Do')
  const startOfWeek = moment().add(1, 'days').format('MMMM Do')
  const endOfWeek = moment().add(7, 'days').format('MMMM Do')
  const {
    // From parent
    setAppBarTitle,
    closeDrawer,
    // State
    noWeatherData,
    placeName,
  } = props

  const closeDrawerAndShowSearch = event => {
    event.preventDefault()
    closeDrawer()
    Router.push('/')
  }

  const closeDrawerAndShowPage = (page, place) => event => {
    event.preventDefault()
    closeDrawer()
    let lowerCasePlace
    if (place) {
      lowerCasePlace = place.toLowerCase()
    }

    lowerCasePlace
      ? Router.push(
          `/[location]/${page}`,
          `/${getShortName(lowerCasePlace)}/${page}`
        )
      : Router.push(`/${page}`)

      switch (page) {
        case 'hourly':
          setAppBarTitle(`${dateToday} - By The Hour`)
          break;
        case 'daily':
          setAppBarTitle(`${startOfWeek} → ${endOfWeek}`)
          break;
        case 'home':
          setAppBarTitle(dateToday)
          break;

        default:
          break;
      }
  }

  return (
    <>
      {/* Home */}
      <ListItem
        button
        component='a'
        onClick={event => {
          if (noWeatherData) {
            closeDrawerAndShowSearch(event)
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
            closeDrawerAndShowSearch(event)
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
            closeDrawerAndShowSearch(event)
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
            closeDrawerAndShowSearch(event)
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
