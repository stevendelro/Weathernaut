import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import MainListItems from './MainListItems'
import SecondaryListItems from './SecondaryListItems'
import TertiaryListItems from './TertiaryListItems'
import useStyles from './useStyles'

function MyDrawer({
  setAppBarTitle,
  openDrawer,
  setOpenDrawer,
}) {
  const classes = useStyles()

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  return (
    <Drawer
      variant='temporary'
      style={{ height: '100vh' }}
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
          setAppBarTitle={setAppBarTitle}
          closeDrawer={handleDrawerClose}
        />
      </List>
      <Divider />
      <List>
        <SecondaryListItems
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

export default MyDrawer
