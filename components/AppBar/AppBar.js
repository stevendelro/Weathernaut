import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import useStyles from './useStyles'

function AppBar({
  openDrawer,
  setOpenDrawer,
  location,
  setLocation,
  weather,
  deniedGeo,
  appBarTitle
}) {
  const classes = useStyles()
  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }
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
            open && classes.menuButtonHidden
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

        {/* Search will appear in Welcome page if geolocation position is initially denied. */}
        {weather.noWeatherData && deniedGeo.deniedGeolocation ? null : (
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
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </form>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default connect(state => state)(AppBar)
