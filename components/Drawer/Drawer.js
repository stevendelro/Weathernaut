// TODO:
// 1. handle API call issues
// 2. handle dispatch issues

import { useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'

import { MainListItems, SecondaryListItems } from './listItems'
import useStyles from './useStyles'

function Drawer({ setDisplayedPage, setAppBarTitle, openDrawer, setOpenDrawer }) {
  const classes = useStyles()

  const onClickHandler = async location => {
    const { latitude, longitude, placeName } = await getLocationData(
      location,
      null,
      null
    )
    dispatch({
      type: 'SET_LOCATION',
      payload: {
        placeName,
        latitude,
        longitude,
        searchedTerm: capitalizeFirstLetter(location),
      },
    })
    const weatherData = await getWeather(latitude, longitude)
    dispatch({
      type: 'SET_WEATHER',
      payload: weatherData,
    })
    setDisplayedPage('home')
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
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
          noWeatherData={state.noWeatherData}
          dispatch={dispatch}
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
    </Drawer>
  )
}

export default Drawer
