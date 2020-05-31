import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'

import MainListItems from './list/MainListItems'
import SecondaryListItems from './list/SecondaryListItems'
import TertiaryListItems from './list/TertiaryListItems'

import useStyles from './useStyles'

function MyDrawer({
  setDisplayedPage,
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
      variant='permanent'
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
          setDisplayedPage={setDisplayedPage}
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
