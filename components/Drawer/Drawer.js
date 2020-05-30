import clsx from 'clsx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import { setLocationByPlaceName } from '../../store/location/action'
import { setWeather } from '../../store/weather/action'

import { MainListItems, SecondaryListItems, TertiaryListItems } from './listItems'
import useStyles from './useStyles'

function MyDrawer(props) {
  const { setDisplayedPage, setAppBarTitle, openDrawer, setOpenDrawer } = props
  const classes = useStyles()

  const onClickHandler = async location => {
    const { latitude, longitude } = await props.setLocationByPlaceName(location)
    const coords = [latitude, longitude]
    setWeather(coords)
    setDisplayedPage('home')
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  return (
    <Drawer
      variant='permanent'
      style={{height: '100vh'}}
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !openDrawer && classes.drawerPaperClose
        ),
      }}
      open={openDrawer}>
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <MainListItems
          setDisplayedPage={setDisplayedPage}
          setAppBarTitle={setAppBarTitle}
          closeDrawer={handleDrawerClose}
          noWeatherData={props.weather.noWeatherData}
        />
      </List>
      <Divider />
      <List>
        <SecondaryListItems
          onClickHandler={onClickHandler}
          setAppBarTitle={setAppBarTitle}
          closeDrawer={handleDrawerClose}
        />
      </List>
      <Divider />
      <List>
        <TertiaryListItems />
      </List>
    </Drawer>
  )
}

function mapStateToProps({ weather }) {
  return { weather }
}

const mapDispatchToProps = dispatch => {
  return {
    setLocationByPlaceName: bindActionCreators(
      setLocationByPlaceName,
      dispatch
    ),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyDrawer)
