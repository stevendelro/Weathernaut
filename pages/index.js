import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { logLastCity } from '../store/history/action'
import { getWeatherByCoords } from '../store/weather/action'
import { getLocationByCoords, denyGeo } from '../store/location/action'
import getShortName from '../util/getShortName'
import Search from '../components/today/Search'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

const Index = props => {
  const classes = useStyles()
  const [renderedComponent, setRenderedComponent] = useState(<></>)

  const spinner = (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      spacing={3}>
      <Grid item>
        <CircularProgress
          color='secondary'
          style={{ height: '100px', width: '100px' }}
          justify='center'
        />
      </Grid>
    </Grid>
  )

  const {
    // Action creators
    getWeatherByCoords,
    getLocationByCoords,
    logLastCity,
    denyGeo,

    //State
    placeName,
  } = props

  // Get permission to use browser's geolocation API
  const getPosition = async () => {
    try {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    } catch (error) {
      console.log(error)
    }
  }
  // Receive coordinates from geolocation. If denied, display simple search page.
  useEffect(() => {
    getPosition()
      .then(async ({ coords }) => {
        setRenderedComponent(spinner)
        await getWeatherByCoords([coords.latitude, coords.longitude])
        const { placeName } = await getLocationByCoords([
          coords.latitude,
          coords.longitude,
        ])
        Router.push('/[location]/today', `/${getShortName(placeName)}/today`)
      })
      .catch(() => {
        denyGeo()
        setRenderedComponent(<Search />)
      })
  }, [])

  // Log the location if geolocation coords are used to fetch weather
  useEffect(() => {
    placeName ? logLastCity(placeName) : null
  }, [placeName])

  return (
    <Container maxWidth='lg' className={classes.container}>
      {renderedComponent}
    </Container>
  )
}

function mapStateToProps({ location }) {
  const { placeName } = location
  return { placeName }
}

const mapDispatchToProps = dispatch => {
  return {
    getWeatherByCoords: bindActionCreators(getWeatherByCoords, dispatch),
    getLocationByCoords: bindActionCreators(getLocationByCoords, dispatch),
    logLastCity: bindActionCreators(logLastCity, dispatch),
    denyGeo: bindActionCreators(denyGeo, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)
