import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import HistoryIcon from '@material-ui/icons/History'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import DateRangeIcon from '@material-ui/icons/DateRange'

import { showSearchOnGeoDenial } from '../../../../store/showSearch/action'

const MainListItems = props => {
  const { setDisplayedPage, setAppBarTitle, closeDrawer } = props

  return (
    <div>
      <ListItem
        button
        onClick={() => {
          if (props.noWeatherData) {
            closeDrawer()
            setDisplayedPage('search')
            props.showSearchOnGeoDenial()
          } else {
            closeDrawer()
            setDisplayedPage('home')
            setAppBarTitle('React Weather Dashboard')
          }
        }}>
        <ListItemIcon>
          <LocationOnIcon />
        </ListItemIcon>
        <ListItemText primary='Home' />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          if (props.noWeatherData) {
            closeDrawer()
            setDisplayedPage('search')
            props.showSearchOnGeoDenial()
          } else {
            closeDrawer()
            setDisplayedPage('hourly')
            setAppBarTitle('Hourly')
          }
        }}>
        <ListItemIcon>
          <QueryBuilderIcon />
        </ListItemIcon>
        <ListItemText primary='Hourly' />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          if (props.noWeatherData) {
            closeDrawer()
            setDisplayedPage('search')
            props.showSearchOnGeoDenial()
          } else {
            closeDrawer()
            setDisplayedPage('daily')
            setAppBarTitle('Daily')
          }
        }}>
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText primary='Daily' />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          if (props.noWeatherData) {
            closeDrawer()
            setDisplayedPage('search')
            props.showSearchOnGeoDenial()
          } else {
            closeDrawer()
            setDisplayedPage('history')
            setAppBarTitle('History')
          }
        }}>
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary='Search History' />
      </ListItem>
    </div>
  )
}

function mapStateToProps({ weather }) {
  const { noWeatherData } = weather
  return { noWeatherData }
}

const mapDispatchToProps = dispatch => {
  return {
    showSearchOnGeoDenial: bindActionCreators(showSearchOnGeoDenial, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainListItems)
