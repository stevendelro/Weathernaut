import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import Link from 'next/link'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import HistoryIcon from '@material-ui/icons/History'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import DateRangeIcon from '@material-ui/icons/DateRange'

import getShortName from '../../../../util/getShortName'
import { capitalizeFirstLetter } from '../../../../util/capitalizeFirstLetter'
import { showSearchOnGeoDenial } from '../../../../store/showSearch/action'

const MainListItems = props => {
  // From parent
  const { setDisplayedPage, setAppBarTitle, closeDrawer } = props

  // From connect
  const { noWeatherData, placeName } = props

  const closeDrawerAndShowSearch = event => {
    event.preventDefault()
    console.log('clicked')
    closeDrawer()
    Router.push('/search')
    props.showSearchOnGeoDenial()
  }

  const closeDrawerAndShowPage = (page, place) => event => {
    event.preventDefault()
    console.log('page', page)
    console.log('place', place)
    closeDrawer()
    Router.push(`/${page}/[location]`, `/${page}/${getShortName(place)}`)
    setAppBarTitle(capitalizeFirstLetter(page))
  }

  return (
    <>
      {/* Home */}
      <Link href='/'>
        <ListItem
          button
          component='a'
          onClick={() => {
            if (noWeatherData) {
              closeDrawerAndShowSearch()
            } else {
              closeDrawer()
              setAppBarTitle('React Weather Dashboard')
            }
          }}>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
      </Link>

      {/* Hourly */}
      <ListItem
        button
        component='a'
        onClick={e => {
          if (noWeatherData) {
            closeDrawerAndShowSearch()
          } else {
            closeDrawerAndShowPage('hourly', placeName)(e)
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
        onClick={e => {
          if (noWeatherData) {
            closeDrawerAndShowSearch()
          } else {
            closeDrawerAndShowPage('daily', placeName)(e)
          }
        }}>
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText primary='Daily' />
      </ListItem>

      {/* History */}
      <Link href='/history'>
        <ListItem
          button
          component='a'
          onClick={() => {
            if (noWeatherData) {
              closeDrawerAndShowSearch()
            } else {
              closeDrawer()
              setAppBarTitle('History')
            }
          }}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary='Search History' />
        </ListItem>
      </Link>
    </>
  )
}

function mapStateToProps({ weather, location }) {
  const { noWeatherData } = weather
  const { placeName } = location
  return { noWeatherData, placeName }
}

const mapDispatchToProps = dispatch => {
  return {
    showSearchOnGeoDenial: bindActionCreators(showSearchOnGeoDenial, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainListItems)
